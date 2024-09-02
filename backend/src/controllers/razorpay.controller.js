import Razorpay from "razorpay";
import Order from "../models/order.model.js";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayController = {
  createOrder: async (req, res) => {
    try {
      const options = {
        amount: req.body.amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      // Verify the payment signature
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        // Payment is successful, update your database here
        await Order.findOneAndUpdate(
          { razorpayOrderId: razorpay_order_id },
          { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id }
        );
        res.json({ success: true, message: "Payment has been verified" });
      } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default razorpayController;
