// server.js
import Stripe from "stripe";
import { findCartByUserId } from "./cart.controller.js";
import { Order, PaymentDetails } from "../models/model.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const DELIVERY_CHARGE = 200;
const MIN_PRICE_FOR_FREE_DELIVERY = 2000;

export const createCheckoutSession = async (req, res) => {
  try {
    const cart = await findCartByUserId(req.user.id);

    if (!cart || cart[0].items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const cartItems = cart[0].items;

    const itemData = cartItems.map(cartItem => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: cartItem.product.name,
            vendorId: cartItem.vendorProduct.vendorId,
          },
          unit_amount: cartItem.vendorProduct.price * 100,
        },
        quantity: cartItem.quantity,
      };
    });

    const totalPrice = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.vendorProduct.price;
    }, 0);

    if (totalPrice < MIN_PRICE_FOR_FREE_DELIVERY) {
      itemData.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: DELIVERY_CHARGE * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: itemData,
      mode: "payment",
      metadata: {
        userId: req.user.id,
      },
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripePaymentListener = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    console.log("asdf");
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
        const paymentIntentSucceeded = event.data;
        console.log(paymentIntentSucceeded);
        const amount = paymentIntentSucceeded.amount;
        const order = Order.findOne({ orderId: paymentIntentSucceeded.metadata.orderId });
        order.amount = amount;
        order.paymentStatus = paymentIntentSucceeded.payment_status;
        order.save();
        const paymentDetials = new PaymentDetails({
          orderId: paymentIntentSucceeded.metadata.orderId,
          amount: amount,
          provider: paymentIntentSucceeded.payment_method_types[0],
          status: paymentIntentSucceeded.payment_status,
        });
        paymentDetials.save();
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json();
  } catch (error) {
    console.log(error);
  }
};
