import { Cart, SubOrder, Product, Order, Settings } from "../models/model.js";
import {
  sendOrderConfirmation,
  sendVendorOrderConfirmation,
} from "../emails/sendOrderConfirmation.js";
import mongoose from "mongoose";

export const createUserOrder = async (req, res) => {
  const { shippingAddressId, paymentMode } = req.body;
  const userId = req.user.id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    validateCart(cart);

    const order = await createOrder({ cart, shippingAddressId, paymentMode, userId, session });
    await createSubOrders({ cart, order, shippingAddressId, paymentMode, userId, session });
    await updateProductQuantities({ cart, session });
    await emptyCart({ cart, session });

    await session.commitTransaction();

    res.status(201).json({ message: "Order placed successfully", order });
    sendOrderConfirmation(userId, order._id);
    sendVendorOrderConfirmation(vendorOrders);
  } catch (error) {
    await session.abortTransaction();
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  } finally {
    session.endSession();
  }
};

const validateCart = cart => {
  if (!cart) {
    throw new Error("Cart not found");
  }
  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  if (!cart.items.every(item => item.product.quantity >= item.quantity)) {
    throw new Error("Invalid cart items");
  }
};

const createOrder = async ({ cart, shippingAddressId, paymentMode, userId, session }) => {
  const order = new Order({
    user: userId,
    shippingAddress: shippingAddressId,
    paymentMode,
    status: "pending",
    createdAt: new Date(),
  });
  await order.save({ session });
  return order;
};

const createSubOrders = async ({ cart, order, shippingAddressId, paymentMode, userId, session }) => {
  const settings = await Settings.findOne();
  const FREE_SHIPPING_THRESHOLD = settings.freeShippingThreshold;
  const SHIPPING_CHARGES = settings.shippingCharges;

  const subOrders = {};
  for (const item of cart.items) {
    const vendor = item.product.vendor;
    const product = item.product;

    if (!subOrders[vendor]) {
      subOrders[vendor] = {
        order: order._id,
        user: userId,
        vendor,
        orderItems: [],
        totalMrp: 0,
        totalPrice: 0,
        totalDiscount: 0,
        shippingAddress: shippingAddressId,
        delCharges: 0, 
        total: 0, 
      };
    }

    subOrders[vendor].orderItems.push({
      product: product._id,
      quantity: item.quantity,
      sku: product.sku,
      mrp: product.mrp,
      price: product.price,
      totalPrice: product.price * item.quantity,
    });

    subOrders[vendor].totalMrp += product.mrp * item.quantity;
    subOrders[vendor].totalPrice += product.price * item.quantity;
  }

  for (const subOrder of Object.values(subOrders)) {
    subOrder.totalDiscount = subOrder.totalMrp - subOrder.totalPrice;
    subOrder.delCharges = subOrder.totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGES;
    subOrder.total = subOrder.totalPrice + subOrder.delCharges; 
    console.log("subOrder", subOrder);
    await SubOrder.create(subOrder, { session });
  }

  console.log("after", subOrders);

  return subOrders;
};

const updateProductQuantities = async ({ cart, session }) => {
  await Promise.all(
    cart.items.map(async item => {
      const product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      await product.save({ session });
    })
  );

  console.log("updated");
};

const emptyCart = async ({ cart, session }) => {
  await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }, { session });
  console.log("emptied");
};
