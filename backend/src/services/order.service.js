import { Address, Cart, Order, Product, Shipping, SubOrder } from "../models/model.js";
import mongoose from "mongoose";

export const getCart = async userId => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const validateCart = cart => {
  if (!cart || cart.items.length === 0) {
    throw new Error(cart ? "Cart is empty" : "Cart not found");
  }
};

export const checkProductQuantities = async (cart, session) => {
  const quantityUpdates = [];
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id).session(session);
    if (product.quantity < item.quantity) {
      throw new Error("Insufficient quantity");
    }
    quantityUpdates.push({ product, newQuantity: product.quantity - item.quantity });
  }
  return quantityUpdates;
};

export const saveShippingAddress = async (shippingAddress, userId, session) => {
  shippingAddress.user = userId;
  const address = new Address(shippingAddress);
  return await address.save({ session });
};

export const calculateTotals = cart => {
  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal <= 2000 ? subtotal + 200 : subtotal;
  return { subtotal, total };
};

export const createOrder = async (
  userId,
  totals,
  paymentMode,
  shippingAddressId,
  session,
  paymentId = "",
  paymentStatus = "pending"
) => {
  const { total, subtotal } = totals;
  const newOrder = new Order({
    total,
    subtotal,
    paymentMode,
    shippingAddress: shippingAddressId,
    paymentStatus,
    user: userId,
    createdAt: new Date(),
  });
  return await newOrder.save({ session });
};

export const groupVendorOrders = (
  cart,
  newOrder,
  shippingAddressId,
  userId,
  paymentMode = "cod",
  paymentStatus = "pending"
) => {
  const vendorOrders = {};
  for (const item of cart.items) {
    const product = item.product;
    const vendor = product.vendor;

    if (!vendorOrders[vendor]) {
      vendorOrders[vendor] = {
        order: newOrder._id,
        user: userId,
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

    const itemTotal = product.price * item.quantity;
    vendorOrders[vendor].orderItems.push({
      product: product._id,
      quantity: item.quantity,
      unitPrice: product.price,
      sku: product.sku || "",
      totalPrice: itemTotal,
    });
    vendorOrders[vendor].subTotal += product.mrp * item.quantity;
    vendorOrders[vendor].disTotal += itemTotal;
    vendorOrders[vendor].discount = vendorOrders[vendor].subTotal - vendorOrders[vendor].disTotal;
    vendorOrders[vendor].total = vendorOrders[vendor].disTotal;
    vendorOrders[vendor].paymentMode = paymentMode;
    vendorOrders[vendor].paymentStatus = paymentStatus;
  }
  return vendorOrders;
};

export const saveSubOrders = async (vendorOrders, session) => {
  const subOrderPromises = Object.values(vendorOrders).map(subOrderData => {
    const subOrder = new SubOrder(subOrderData);
    return subOrder.save({ session });
  });
  await Promise.all(subOrderPromises);
};

export const updateProductQuantities = async (quantityUpdates, userId, session) => {
  const updatePromises = quantityUpdates.map(({ product, newQuantity }) => {
    product.quantity = newQuantity;
    return product.save({ session });
  });
  await Promise.all([
    ...updatePromises,
    Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }, { session }),
  ]);
};

export const updateProductQuantitiesForPayment = async (quantityUpdates, userId, session) => {
  const updatePromises = quantityUpdates.map(({ product, newQuantity }) => {
    product.quantity = newQuantity;
    return product.save({ session });
  });
  await Promise.all([
    ...updatePromises,
  ]);
};

// const placeOrder = async (userId, orderDto, session) => {
//   try {
//     const { paymentMode, shippingAddress } = orderDto;

//     const cart = await getCart(userId);
//     validateCart(cart);

//     const quantityUpdates = await checkProductQuantities(cart, session);
//     const shippingAddressId = await saveShippingAddress(shippingAddress, userId, session);

//     const totals = calculateTotals(cart);
//     const newOrder = await createOrder(userId, totals, paymentMode, shippingAddressId, session);

//     const vendorOrders = groupVendorOrders(cart, newOrder, shippingAddressId, userId);
//     await saveSubOrders(vendorOrders, session);

//     await updateProductQuantities(quantityUpdates, userId, session);

//     return newOrder;
//   } catch (error) {
//     throw error;
//   }
// };
