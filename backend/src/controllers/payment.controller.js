// server.js
import Stripe from "stripe";
import {
  getCart,
  validateCart,
  checkProductQuantities,
  calculateTotals,
  createOrder,
  groupVendorOrders,
  saveSubOrders,
  updateProductQuantities,
  saveShippingAddress,
  updateProductQuantitiesForPayment,
} from "../services/order.service.js";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";

export const createRazorpayOrder = async (req, res) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY_TEST,
      key_secret: process.env.RAZORPAY_API_SECRET_TEST,
    });

    const shippingAddressId = req.body.shippingAddressId;
    const userId = req.user.id;

    const cart = await getCart(userId);
    validateCart(cart);

    const quantityUpdates = await checkProductQuantities(cart, mongoSession);
    await updateProductQuantitiesForPayment(quantityUpdates, userId, mongoSession);

    const amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(16).toString("hex"),
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    await mongoSession.commitTransaction();
    res.json({ success: true, data: { ...order, shippingAddressId } });
  } catch (error) {
    console.log(error);
    await mongoSession.abortTransaction();
    res.status(500).send(error);
  }
};

export const verifyRazorpayOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddressId } = req.body;
    const userId = req.user.id;

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET_TEST)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature === razorpay_signature) {
      const orderDto = {
        paymentMode: "online",
        shippingAddressId: shippingAddressId,
        paymentId: razorpay_payment_id,
      };
      await placeOrder(userId, orderDto);
      console.log("Payment is sucess");
      res.json({ success: true, message: "Payment successful" });
    } else {

      console.log("Payment verification failed");
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const placeOrder = async (userId, orderDto) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const paymentStatus = "paid";

  try {
    const { paymentMode, shippingAddressId, paymentId } = orderDto;

    const cart = await getCart(userId);
    validateCart(cart);

    const quantityUpdates = await checkProductQuantities(cart, session);

    const totals = calculateTotals(cart);
    const newOrder = await createOrder(
      userId,
      totals,
      paymentMode,
      shippingAddressId,
      session,
      paymentId,
      paymentStatus
    );

    const vendorOrders = groupVendorOrders(
      cart,
      newOrder,
      shippingAddressId,
      userId,
      paymentMode,
      paymentStatus
    );
    await saveSubOrders(vendorOrders, session);

    await updateProductQuantities(quantityUpdates, userId, session);

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error("Error placing order:", error);
  } finally {
    session.endSession();
  }
};
