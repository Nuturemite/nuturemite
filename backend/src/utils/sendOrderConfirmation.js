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
      <p>Your order ID is <strong>${subOrder.orderId}</strong>.</p>
      <p>Here are the details of your order:</p>
      <p><strong>Total: $${subOrder.total.toFixed(2)}</strong></p>
      <p>Shipping Address: ${subOrder.shippingAddress.addressLine1}, ${
      subOrder.shippingAddress.city
    }, ${subOrder.shippingAddress.zipCode}</p>
      <p>We will notify you once your order is shipped. If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>Acme Team</p>
    `;

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["anoop102910@gmail.com"],
      subject: "Your Order Confirmation",
      html: emailBody,
    });

    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}

export default sendOrderConfirmation;
    
    
