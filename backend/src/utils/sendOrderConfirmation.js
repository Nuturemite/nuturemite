import { Resend } from "resend";
import { User, Order } from "../models/model.js";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderConfirmation(userId, orderId) {
  try {
    const user = await User.findById(userId).select("email").exec();
    if (!user) {
      throw new Error("User not found");
    }

    const subOrder = await Order.findById(orderId).populate("shippingAddress").exec();
    if (!subOrder) {
      throw new Error("Order not found");
    }
    const emailBody = `
      <p>Dear ${user.email},</p>
      <p>Thank you for your order!</p>
      <p>Your order ID is <strong>${subOrder._id}</strong>.</p>
      <p>Here are the details of your order:</p>
      <p><strong>Total: ₹${Math.round(subOrder.total)}</strong></p>
      <p>Shipping Address: ${subOrder.shippingAddress.address}, ${
      subOrder.shippingAddress.city
    }, ${subOrder.shippingAddress.zipcode}</p>
      <p>We will notify you once your order is shipped. If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>Nuturemite</p>
    `;

    console.log(emailBody);

    const res = await resend.emails.send({
      from: "Nuturemite <onboarding@resend.dev>",
      to: [user.email],
      subject: "Your Order Confirmation",
      html: emailBody,
    });
    console.log(res);

    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}

export default sendOrderConfirmation;


