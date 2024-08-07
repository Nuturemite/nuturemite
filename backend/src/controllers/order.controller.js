import { Address, Cart, Order, Product, Shipping, SubOrder, Vendor } from "../models/model.js";
import mongoose from "mongoose";
import { generateModelId } from "../utils/generateId.js";

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { paymentMode, shippingAddress } = req.body;

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

    // Save shipping address
    shippingAddress.user = req.user.id;
    const address = new Address(shippingAddress);
    const { _id: shippingAddressId } = await address.save({ session });

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
      shippingAddress: shippingAddressId,
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
          user: req.user.id,
          vendor,
          orderItems: [],
          subTotal: 0,
          discount: 0,
          disTotal: 0,
          total: 0,
          shippingAddress: shippingAddressId,
          createdAt: new Date(),
        };
      }

      vendorOrders[vendor].orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
      });
      vendorOrders[vendor].subTotal += item.product.basePrice * item.quantity;
      vendorOrders[vendor].disTotal += item.product.price * item.quantity;
      vendorOrders[vendor].discount = vendorOrders[vendor].subTotal - vendorOrders[vendor].disTotal;
      vendorOrders[vendor].total = vendorOrders[vendor].disTotal;
    }

    for (const [vendor, subOrderData] of Object.entries(vendorOrders)) {
      // subOrderData.orderId = "ORD" + (await generateModelId(SubOrder));
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
    const orders = await SubOrder.find({ user: userId });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const suborders = await SubOrder.findById(id)
      .populate({
        path: "orderItems.product",
        select: "_id vendor name price basePrice images",
      })
      .populate("shippingAddress")
      .populate({ path: "vendor", select: "_id name businessName contactNumber address" })

    res.status(200).json({ data: suborders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by current authenticated user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await SubOrder.find({ user: req.user.id }).select(
      "-shippingDetails -orderItems"
    );

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
    console.log(req.user.vendorId);
    const subOrders = await SubOrder.find({ vendor: req.user.vendorId })
      .select("-orderItems")
      .populate("user", "name email")
      .populate("shippingAddress")
    res.status(200).json({ data: subOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order by ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, shippingDetails } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await SubOrder.findByIdAndUpdate(id, { status }, { session });
    if (order.status === "pending") {
      // shippingDetails.shipId = "SHIP" + (await generateModelId(Shipping, session));
      shippingDetails.order = order._id;
      // shippingDetails.orderId = order.orderId;
      shippingDetails.shippingAddress = order.shippingAddress;
      shippingDetails.vendor = req.user.vendorId;
      const shippingDetailsModel = new Shipping(shippingDetails);
      await shippingDetailsModel.save({ session });
    }
    else {
      const shippingDetailsModel = await Shipping.findOne({ order: order._id });
      await Shipping.findOneAndUpdate({ _id: shippingDetailsModel._id }, { status }, { session });
    }
    await session.commitTransaction();
    res.json();
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

