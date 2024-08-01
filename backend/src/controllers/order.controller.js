import { Cart, Order, Product, SubOrder } from "../models/model.js";
import mongoose from "mongoose";

export const addShippingAddress = async (req, res) => {
  try {
    const shippingDetials = req.body;
    const order = new Order({ userId: req.user._id, orderId: req.params.id });
    order.shippingDetails = shippingDetials;
    order.save();
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { paymentMode, shippingDetails } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      throw new Error("Cart not found or user not authorized");
    }

    // Check stock levels and prepare stock updates
    const stockUpdates = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(session);

      if (product.stock < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock or insufficient stock`);
      }

      // Prepare the stock update
      stockUpdates.push({
        product,
        newStock: product.stock - item.quantity,
      });
    }

    // Create Order
    const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    let total;
    if (subtotal > 2000) {
      total = subtotal + 2000;
    }
    const newOrder = new Order({
      total,
      subtotal,
      paymentMode,
      shippingDetails,
      createdAt: new Date(),
      orderItems: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        basePrice: item.product.basePrice,
        price: item.product.price,
      })),
    });
    await newOrder.save({ session });

    // Create SubOrders for each vendor
    const vendorOrders = {};

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(session);
      const vendor = product.vendor;

      if (!vendorOrders[vendor]) {
        vendorOrders[vendor] = {
          orderId: newOrder._id,
          vendor,
          subOrderItems: [],
          totalAmount: 0,
          createdAt: new Date(),
        };
      }

      vendorOrders[vendor].subOrderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
      });
      vendorOrders[vendor].totalAmount += item.product.price * item.quantity;
    }

    for (const [vendor, subOrderData] of Object.entries(vendorOrders)) {
      const subOrder = new SubOrder(subOrderData);
      await subOrder.save({ session });
    }

    // Apply the stock updates
    for (const { product, newStock } of stockUpdates) {
      product.stock = newStock;
      await product.save({ session });
    }

    // Clear the cart
    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("vendor")
      .populate("subOrders.vendorId")
      .populate("subOrders.subOrderItems.productId")
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Error getting orders", error: error.message });
  }
};

export const getOrdersByVendorId = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const orders = await Order.find({ "subOrders.vendorId": vendorId })
      .populate("user")
      .populate("subOrders.subOrderItems.productId")
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Error getting orders", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Error getting orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).exec();
    console.log("first");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ message: "Error getting order", error: error.message });
  }
};
