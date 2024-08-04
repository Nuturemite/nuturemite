import { Cart, Order, Product, SubOrder, Vendor } from "../models/model.js";
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
      return res.status(400).json({ message: "Cart not found " });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check quantity levels and prepare quantity updates
    const quantityUpdates = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(session);

      if (product.quantity < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient quantity" });
      }

      // Prepare the quantity update
      quantityUpdates.push({
        product,
        newQuantity: product.quantity - item.quantity,
      });
    }

    // Create Order
    const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    let total;
    if (subtotal <= 2000) {
      total = subtotal + 200;
    } else {
      total = subtotal;
    }
    const newOrder = new Order({
      total,
      subtotal,
      paymentMode,
      shippingDetails,
      user: userId,
      createdAt: new Date(),
    });

    await newOrder.save({ session });

    // Create SubOrders for each vendor
    const vendorOrders = {};

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(session);
      const vendor = product.vendor;

      if (!vendorOrders[vendor]) {
        vendorOrders[vendor] = {
          order: newOrder._id,
          vendor,
          orderItems: [],
          totalAmount: 0,
          createdAt: new Date(),
        };
      }

      vendorOrders[vendor].orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        basePrice: item.product.price,
        price: item.product.price * item.quantity,
      });
      vendorOrders[vendor].totalAmount += item.product.price * item.quantity;
    }

    for (const [vendor, subOrderData] of Object.entries(vendorOrders)) {
      const subOrder = new SubOrder(subOrderData);
      await subOrder.save({ session });
    }

    // Apply the quantity updates
    for (const { product, newQuantity } of quantityUpdates) {
      product.quantity = newQuantity;
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

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by user
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    const suborders = await SubOrder.find({ order: order._id })
      .populate({
        path: "orderItems.product",
        select: "_id vendor name price basePrice images",
      })
      .populate({ path: "vendor" });
    const orderWithSuborders = {
      ...order.toObject(),
      suborders,
    };

    if (order) {
      res.status(200).json({ data: orderWithSuborders });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by current authenticated user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).select("-shippingDetails -orderItems");
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sub-orders by vendor
export const getVendorOrders = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const subOrders = await SubOrder.find({ vendor: vendorId });
    res.status(200).json({ data: subOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sub-orders by current authenticated vendor
export const getMyOrdersAsVendor = async (req, res) => {
  try {
    console.log(req.user.id);
    const vendor = await Vendor.findOne({ user: req.user.id });
    console.log(vendor._id);
    const subOrders = await SubOrder.find({ vendor: vendor._id });

    res.status(200).json({ data: subOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update order by ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (order) {
      res.status(200).json({ data: order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
