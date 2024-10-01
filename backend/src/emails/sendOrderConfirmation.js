import { Resend } from "resend";
import { User, Order, Vendor } from "../models/model.js";
import { sendEmail } from "./sendMail.js";

export const sendOrderConfirmation = async (userId, orderId) => {
  try {
    const user = await User.findById(userId).select("email").exec();
    if (!user) {
      throw new Error("User not found");
    }

    const subOrder = await Order.findById(orderId).populate("shippingAddress").exec();
    if (!subOrder) {
      throw new Error("Order not found");
    }

    const emailBody = getEmailBody(user, subOrder);

    await sendEmail({
      to: user.email,
      subject: "Your Order Confirmation",
      html: emailBody,
    });

    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};

export const sendVendorOrderConfirmation = async vendorOrders => {
  try {
    const subOrders = await Order.find({ _id: { $in: vendorOrders.map(order => order.order) } })
      .populate("shippingAddress")
      .exec();
    const vendors = await Vendor.find({ _id: { $in: vendorOrders.map(order => order.vendor) } })
      .populate("user")
      .exec();
    const emails = vendors.map(vendor => vendor.user.email);

    emails.forEach(async email => {
      const emailBody = getVendorEmailBody(email, subOrders);
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: emailBody,
      });
    });

    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};

const getEmailBody = (user, subOrder) => {
  return `
      <p>Dear ${user.email},</p>
      <p>Thank you for your order!</p>
      <p>Your order ID is <strong>${subOrder._id}</strong>.</p>
      <p>Here are the details of your order:</p>
      <p><strong>Total: ₹${Math.round(subOrder.total)}</strong></p>
      <p>Shipping Address: ${subOrder.shippingAddress.address}, ${subOrder.shippingAddress.city}, ${
    subOrder.shippingAddress.zipcode
  }</p>
      <p>We will notify you once your order is shipped. If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>Nuturemite</p>
    `;
};

const getVendorEmailBody = (email, subOrder) => {
  return `
      <p>Dear ${email},</p>
      <p>You have a new order!</p>
      <p>Order ID: ${subOrder._id}</p>
      <p>Order Details: ${subOrder.orderItems
        .map(item => `${item.name} - ${item.quantity}`)
        .join(", ")}</p>
      <p>Shipping Address: ${subOrder.shippingAddress.address}, ${subOrder.shippingAddress.city}, ${
    subOrder.shippingAddress.zipcode
  }</p>
      <p>Best regards,<br>Nuturemite</p>
    `;
};
