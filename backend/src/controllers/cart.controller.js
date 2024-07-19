import mongoose from "mongoose";
import { Cart, VendorProduct } from "../models/model.js";
import { productPipeline } from "./pipeline/vendorProduct.pipeline.js";
import { createProduct } from "./product.controller.js";
import { cartPipeline } from "./pipeline/cartProduct.pipeline.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  const userId = req.user.id;
  const { quantity = 1 } = req.body;
  const { vendorProductId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart
      ? cart.items.findIndex(item => item.vendorProduct.equals(vendorProductId))
      : -1;

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ vendorProduct: vendorProductId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get cart details
export const getCart = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    const cart = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "vendorproducts",
          localField: "items.vendorProduct",
          foreignField: "_id",
          as: "vendorProduct",
        },
      },
      {
        $unwind: "$vendorProduct",
      },
      {
        $lookup: {
          from: "products",
          localField: "vendorProduct.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: {
            $push: {
              vendorProduct: "$vendorProduct",
              product: { $arrayElemAt: ["$product", 0] },
              quantity: "$items.quantity",
              _id: "$items._id",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (cart.length == 0) return res.status(200).json({ data: [] });
    res.status(200).json({ data: cart[0].items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in cart
export const updateItemQuantity = async (req, res) => {
  const userId = req.user.id;
  const { vendorProductId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.product.equals(vendorProductId));

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const { vendorProductId } = req.params;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => !item.vendorProduct.equals(vendorProductId));

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findCartByUserId = async userId => {
  try {
    const cart = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "vendorproducts",
          localField: "items.vendorProduct",
          foreignField: "_id",
          as: "vendorProduct",
        },
      },
      {
        $unwind: "$vendorProduct",
      },
      {
        $lookup: {
          from: "products",
          localField: "vendorProduct.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: {
            $push: {
              vendorProduct: "$vendorProduct",
              product: { $arrayElemAt: ["$product", 0] },
              quantity: "$items.quantity",
              _id: "$items._id",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    return cart;
  } catch (error) {
    throw error;
  }
};
