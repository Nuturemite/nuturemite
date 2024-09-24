import { Address, Cart, Order, Product, Shipping, SubOrder } from "../models/model.js";
import mongoose from "mongoose";
import {
  // placeOrder,
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
import axios from "axios";
import sendOrderConfirmation from "../utils/sendOrderConfirmation.js";

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { paymentMode, shippingAddressId } = req.body;
    console.log(req.body);

    const cart = await getCart(userId);
    validateCart(cart);

    const quantityUpdates = await checkProductQuantities(cart, session);

    const totals = calculateTotals(cart);
    const shippingAddress = await Address.findById(shippingAddressId);
    const newOrder = await createOrder(userId, totals, paymentMode, shippingAddress, session);

    const vendorOrders = groupVendorOrders(cart, newOrder, shippingAddressId, userId);
    await saveSubOrders(vendorOrders, session);

    await updateProductQuantities(quantityUpdates, userId, session);

    await session.commitTransaction();

    sendOrderConfirmation(userId, newOrder._id);
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  } finally {
    session.endSession();
  }
};

export const confirmOrder = async (req, res) => {
  const id = req.params.orderId;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const subOrder = await SubOrder.findById(id)
      .populate("shippingAddress")
      .populate("orderItems.product", "name");
    const venShipping = await createShipment(subOrder);
    console.log(venShipping);

    const shipping = new Shipping({
      order: subOrder._id,
      vendor: subOrder.vendor,
      status: venShipping.status,
      shipmentId: venShipping.shipment_id,
      orderId: venShipping.order_id,
      trackingId: venShipping.awb_number,
      carrier: venShipping.courier_name,
      label: venShipping.label,
      trackingUrl: venShipping.tracking_url,
      shippingAddress: subOrder.shippingAddress,
    });
    subOrder.orderId = venShipping.order_id;
    subOrder.status = "confirmed";
    subOrder.confirmedAt = new Date();
    subOrder.shipment = venShipping.order_id;
    subOrder.shipInvoice = venShipping.label;
    await subOrder.save({ session });
    await shipping.save({ session });
    await session.commitTransaction();

    res.json({ sucesss: true, message: "Order confirmed successfully" });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const createShipment = async order => {
  try {
    const data = createShipmentData(order);
    console.log(data);
    const logRes = await axios.post("https://shipment.xpressbees.com/api/users/login", {
      email: process.env.XPRESS_EMAIL,
      password: process.env.XPRESS_PASSWORD,
    });
    const XPRESS_TOKEN = logRes.data.data;
    // console.log(XPRESS_TOKEN);
    const response = await axios.post("https://shipment.xpressbees.com/api/shipments2", data, {
      headers: {
        Authorization: `Bearer ${XPRESS_TOKEN}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createShipmentData = order => {
  return {
    order_number: order._id,
    unique_order_number: "yes",
    shipping_charges: 0,
    discount: order.discount,
    cod_charges: 0,
    payment_type: order.paymentMode == "cod" ? "cod" : "prepaid",
    order_amount: order.total + order.discount,
    package_weight: 1000,
    // package_length: 10,
    // package_breadth: 10,
    // package_height: 10,
    request_auto_pickup: "yes",
    consignee: {
      name: order.shippingAddress.fname + " " + order.shippingAddress.lname,
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      pincode: order.shippingAddress.zipcode,
      phone: order.shippingAddress.phone,
    },
    pickup: {
      warehouse_name: "warehouse 1",
      name: "Nitish Kumar (Xpressbees Private Limited)",
      address: "140, MG Road",
      address_2: "Near metro station",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "251001",
      phone: "9999999999",
      // ...order.vendor.address,
    },
    order_items: [
      ...order.orderItems.map(o => ({
        name: o.product.name,
        qty: o.quantity,
        price: o.unitPrice,
        sku: o.sku,
      })),
    ],
    // order_items: [
    //   {
    //     name: "product 1",
    //     qty: "18",
    //     price: "100",
    //     sku: "sku001",
    //   },
    // ],
    // courier_id: "",
    collectable_amount: order.paymentMode == "cod" ? Math.round(order.total) : 0,
  };
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    console.log(req.user.vendorId);
    const subOrders = await SubOrder.find({})
      .select("-orderItems")
      .populate("user", "name email")
      .populate("shippingAddress")
      .populate("vendor", "name ");
    const count = await SubOrder.countDocuments();
    res.status(200).json({ data: subOrders, totalItems: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sub-orders by current authenticated vendor
export const getMyOrdersAsVendor = async (req, res) => {
  try {
    const subOrders = await SubOrder.find({ vendor: req.user.vendorId })
      .select("-orderItems")
      .populate("user", "name email")
      .populate("shippingAddress");
    console.log(subOrders);
    const count = await SubOrder.countDocuments({ vendor: req.user.vendorId });
    res.status(200).json({ data: subOrders, totalItems: count });
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
        select: "_id vendor name price mrp images",
      })
      .populate("shippingAddress")
      .populate({ path: "vendor", select: "_id name businessName contactNumber address" });

    res.status(200).json({ data: suborders });
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
      shippingDetails.order = order._id;
      shippingDetails.shippingAddress = order.shippingAddress;
      shippingDetails.vendor = req.user.vendorId;
      const shippingDetailsModel = new Shipping(shippingDetails);
      await shippingDetailsModel.save({ session });
    } else {
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

const xpressCancelOrder = async (awb, XPRESS_TOKEN) => {
  try {
    const response = await axios.post(
      `https://shipment.xpressbees.com/api/shipments2/cancel`,
      {
        awb: awb,
      },
      {
        headers: {
          Authorization: `Bearer ${XPRESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getXpressToken = async () => {
  const logRes = await axios.post("https://shipment.xpressbees.com/api/users/login", {
    email: process.env.XPRESS_EMAIL,
    password: process.env.XPRESS_PASSWORD,
  });
  return logRes.data.data;
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await SubOrder.findById(id);
    if (order.status == "pending") {
      await SubOrder.findByIdAndUpdate(id, { status: "cancelled" }, { session });
    } else {
      const XPRESS_TOKEN = await getXpressToken();

      const shipping = await Shipping.findOne({ order: id });
      const cancelRes = await xpressCancelOrder(shipping.trackingId, XPRESS_TOKEN);
      console.log(cancelRes);
      shipping.status = "cancelled";
      await shipping.save({ session });
      await SubOrder.findByIdAndUpdate(id, { status: "cancelled" }, { session });
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
