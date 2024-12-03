import {
  Address,
  Cart,
  Order,
  Product,
  Shipping,
  SubOrder,
} from "../models/model.js";
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
import {
  sendOrderConfirmation,
  sendVendorOrderConfirmation,
} from "../emails/sendOrderConfirmation.js";
import { getSettings } from "./settings.cache.js";
export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { paymentMode, shippingAddressId } = req.body;
    const settings = await getSettings();
    const FREE_SHIPPING_THRESHOLD = settings.freeShippingThreshold;
    const SHIPPING_CHARGES = settings.shippingCharges;

    const cart = await getCart(userId);
    validateCart(cart);

    const quantityUpdates = await checkProductQuantities(cart, session);

    const totals = calculateTotals(cart);
    const shippingAddress = await Address.findById(shippingAddressId);
    const newOrder = await createOrder(
      userId,
      totals,
      paymentMode,
      shippingAddress,
      session
    );

    console.log(newOrder);
    console.log(FREE_SHIPPING_THRESHOLD);
    const vendorOrders = groupVendorOrders({
      cart,
      newOrder,
      shippingAddressId,
      userId,
      SHIPPING_CHARGES,
      FREE_SHIPPING_THRESHOLD,
    });
    await saveSubOrders(vendorOrders, session);

    await updateProductQuantities(quantityUpdates, userId, session);
    await session.commitTransaction();
    sendOrderConfirmation(userId, newOrder._id);
    sendVendorOrderConfirmation(vendorOrders);
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
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
      .populate("orderItems.product", "name")
      .populate("vendor", "address");
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

const createShipment = async (order) => {
  try {
    const data = createShipmentData(order);
    console.log(data);
    const logRes = await axios.post(
      "https://shipment.xpressbees.com/api/users/login",
      {
        email: process.env.XPRESS_EMAIL,
        password: process.env.XPRESS_PASSWORD,
      }
    );
    const XPRESS_TOKEN = logRes.data.data;
    // console.log(XPRESS_TOKEN);
    const response = await axios.post(
      "https://shipment.xpressbees.com/api/shipments2",
      data,
      {
        headers: {
          Authorization: `Bearer ${XPRESS_TOKEN}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createShipmentData = (order) => {
  return {
    order_number: order._id,
    unique_order_number: "yes",
    shipping_charges: 0,
    discount: order.discount,
    cod_charges: 0,
    payment_type: order.paymentMode == "cod" ? "cod" : "prepaid",
    order_amount: order.total + order.discount + order.delCharges,
    package_weight: 1000,
    package_type: 100,
    package_breadth: 100,
    package_height: 100,
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
      warehouse_name: order.vendor.address.warehouseName,
      name: order.vendor.address.contactName,
      address: order.vendor.address.warehouseAddress,
      city: order.vendor.address.city,
      state: order.vendor.address.state,
      pincode: order.vendor.address.postalCode,
      phone: order.vendor.address.contactPhone,
    },
    order_items: [
      ...order.orderItems.map((o) => ({
        name: o.product.name,
        qty: o.quantity,
        price: o.unitPrice,
        sku: o.sku,
      })),
    ],
    collectable_amount: order.paymentMode == "cod" ? order.total : 0,
  };
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
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
    const { search } = req.query;
    const subOrders = await SubOrder.find({
      vendor: req.user.vendorId,
      ...(search
        ? {
            $or: [{ name: { $regex: search, $options: "i" } }],
          }
        : {}),
    })
      .select("-orderItems")
      .populate("user", "name email")
      .populate("shippingAddress");
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
      .populate({
        path: "vendor",
        select: "_id name businessName contactNumber address",
      });

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
      await Shipping.findOneAndUpdate(
        { _id: shippingDetailsModel._id },
        { status },
        { session }
      );
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
  const logRes = await axios.post(
    "https://shipment.xpressbees.com/api/users/login",
    {
      email: process.env.XPRESS_EMAIL,
      password: process.env.XPRESS_PASSWORD,
    }
  );
  return logRes.data.data;
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await SubOrder.findById(id);
    if (order.status == "pending") {
      await SubOrder.findByIdAndUpdate(
        id,
        { status: "cancelled" },
        { session }
      );
    } else {
      const XPRESS_TOKEN = await getXpressToken();

      const shipping = await Shipping.findOne({ order: id });
      const cancelRes = await xpressCancelOrder(
        shipping.trackingId,
        XPRESS_TOKEN
      );
      console.log(cancelRes);
      shipping.status = "cancelled";
      await shipping.save({ session });
      await SubOrder.findByIdAndUpdate(
        id,
        { status: "cancelled" },
        { session }
      );
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

export const updateOrderStatus = async (req, res) => {
  const { awb_number, status } = req.body;
  try {
    const shipping = await Shipping.findOne({ trackingId: awb_number });
    const order = await SubOrder.findOne({ _id: shipping.order });
    order.status = status;
    await order.save();
    shipping.status = status;
    await shipping.save();
    res.json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
