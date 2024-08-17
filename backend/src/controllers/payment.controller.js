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
} from "../services/order.service.js";
import mongoose from "mongoose";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const DELIVERY_CHARGE = 200;
const MIN_PRICE_FOR_FREE_DELIVERY = 2000;

export const createCheckoutSession = async (req, res) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const shippingAddress = req.body.shippingAddress;
    const userId = req.user.id;

    const cart = await getCart(userId);
    validateCart(cart);

    const quantityUpdates = await checkProductQuantities(cart, mongoSession);
    const { _id: shippingAddressId } = await saveShippingAddress(
      shippingAddress,
      userId,
      mongoSession
    );
    await updateProductQuantities(quantityUpdates, userId, mongoSession);
    // console.log("quantityUpdates", quantityUpdates);
    // console.log("shippingAddressId", shippingAddressId);
    // console.log("shippingAddressId", shippingAddressId.toString());
    const itemData = cart.items.map(item => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
            // vendorId: item.product.vendor,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });
    // console.log(itemData);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: itemData,
      mode: "payment",
      payment_intent_data: {
        metadata: {
          userId: req.user.id,
          shippingAddressId: shippingAddressId.toString(),
        },
      },
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });
    res.json({ url: session.url });
    await mongoSession.commitTransaction();
  } catch (error) {
    await mongoSession.abortTransaction();
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  } finally {
    mongoSession.endSession();
  }
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripePaymentListener = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log(event.type);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        const userId = paymentIntent.metadata.userId;
        const orderDto = {
          paymentMode: "online",
          shippingAddressId: paymentIntent.metadata.shippingAddressId,
          paymentId: paymentIntent.id,
        };
        await placeOrder(userId, orderDto);
        break;
      // case "payment_intent.payment_failed":
      //   const failedPaymentIntent = event.data.object;
      //   const failedUserId = failedPaymentIntent.metadata.userId;

      //   await handleFailedPayment(failedUserId, failedPaymentIntent);
      //   break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json();
  } catch (error) {
    console.log(error);
  }
};

// const rollbackProductQuantities = async (originalQuantities, userId) => {
//   for (const [productId, originalQuantity] of Object.entries(originalQuantities)) {
//     await updateProductQuantity(productId, originalQuantity, userId); // Implement this to set the product quantity back to original
//   }
// };

export const placeOrder = async (userId, orderDto) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const paymentStatus = "paid";
  const paymentMode = "online";

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
