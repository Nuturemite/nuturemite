import {
  getCart,
  validateCart,
  checkProductQuantities,
  calculateTotals,
  createOrder,
  groupVendorOrders,
  saveSubOrders,
  updateProductQuantitiesForPayment,
} from "../services/order.service.js";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import axios from "axios";
import { User, Settings } from "../models/model.js";

import {
  sendOrderConfirmation,
  sendVendorOrderConfirmation,
} from "../emails/sendOrderConfirmation.js";
import sha256 from "sha256";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_TEST,
  key_secret: process.env.RAZORPAY_API_SECRET_TEST,
});

const generateTransactionId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 100000);
  const merchantPrefix = "MT";
  const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
  return transactionID;
};

export const createPayment = async (req, res) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();
  try {
    const shippingAddressId = req.body.shippingAddressId;
    const userId = req.user.id;
    const paymentMethod = req.body.paymentMethod;
    const settings = await Settings.findOne();
    const FREE_SHIPPING_THRESHOLD = settings.freeShippingThreshold;
    const SHIPPING_CHARGE = settings.shippingCharges;

    const user = await User.findById(userId);

    const cart = await getCart(userId);
    validateCart(cart);

    let amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    amount += amount < FREE_SHIPPING_THRESHOLD ? SHIPPING_CHARGE : 0;
    console.log("amount", amount);

    if (paymentMethod === "razorpay") {
      // *****razorpay payment*****
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(16).toString("hex"),
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send("Some error occured");
      await mongoSession.commitTransaction();
      res.json({ success: true, data: { ...order, shippingAddressId } });
    } else if (paymentMethod === "phonepe") {
      // *****phonepe payment*****
      const merchantTransactionId = generateTransactionId();
      const salt_key = process.env.PHONEPE_MERCHANT_API_KEY;
      const merchantId = process.env.PHONEPE_MERCHANT_ID;
      const merchantUserId = req.user.id;

      console.log(merchantId, merchantTransactionId, merchantUserId, amount, salt_key);
      const data = {
        merchantId,
        merchantTransactionId,
        merchantUserId,
        amount: amount * 100,
        // redirectUrl: `${process.env.CLIENT_URL}/payment/success`,
        redirectUrl: `${process.env.SERVER_URL}/api/payment/verify-phonepe-order?merchantTransactionId=${merchantTransactionId}&userId=${merchantUserId}&shippingAddressId=${shippingAddressId}`,
        callbackUrl: `${process.env.SERVER_URL}/api/payment/verify-phonepe-order?merchantTransactionId=${merchantTransactionId}&userId=${merchantUserId}&shippingAddressId=${shippingAddressId}`,
        redirectMode: "POST",
        mobileNumber: user.mobile,
        email: user.email,
        currency: "INR",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };
      let bufferObj = Buffer.from(JSON.stringify(data), "utf8");
      let base64EncodedPayload = bufferObj.toString("base64");
      let string = base64EncodedPayload + "/pg/v1/pay" + salt_key;
      let sha256_val = sha256(string);
      let xVerifyChecksum = sha256_val + "###" + 1;

      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
      };

      const response = await axios.post(
        process.env.PHONEPE_PROD_URL,
        {
          request: base64EncodedPayload,
        },
        { headers }
      );
      console.log(response.data);
      const resData = {
        msg: "payment done",
        status: "success",
        data: response.data,
        phonePeTransactionId: response.data.transactionId,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
      };
      res.json({ success: true, data: resData });
    }
  } catch (error) {
    console.log(error);
    await mongoSession.abortTransaction();
    res.status(500).send(error);
  }
};

export const verifyPhonepeOrder = async (req, res) => {
  try {
    console.log("querbdoy", req.query);
    const { merchantTransactionId, userId, shippingAddressId } = req.query;
    const orderDto = {
      paymentMode: "online",
      shippingAddressId: shippingAddressId,
      paymentId: merchantTransactionId,
    };
    await placeOrder(userId, orderDto);
    console.log("Order placed success");
    res.redirect(`${process.env.CLIENT_URL}/orders`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const verifyRazorpayOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddressId } =
      req.body;
    const userId = req.user.id;

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

    const vendorOrders = groupVendorOrders({
      cart,
      newOrder,
      shippingAddressId,
      userId,
      paymentMode,
      paymentStatus,
    });

    await saveSubOrders(vendorOrders, session);
    const quantityUpdates = await checkProductQuantities(cart, session);
    await updateProductQuantitiesForPayment(quantityUpdates, userId, session);

    await session.commitTransaction();
    // sendOrderConfirmation(userId, newOrder._id);
  } catch (error) {
    await session.abortTransaction();
    console.error("Error placing order:", error);
  } finally {
    session.endSession();
  }
};
