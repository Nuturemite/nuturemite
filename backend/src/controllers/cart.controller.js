// controllers/cartController.js
import { Cart } from "../models/model.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Get cart by user ID
export const getCartByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "_id name price images basePrice vendor quantity",
    });
    if (!cart) {
      return res.status(200).json({ data: [] });
    }
    res.status(200).json({ data: cart.items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting cart", error });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

export const findCartByUserId = async userId => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return null;
    }
    return cart;
  } catch (error) {
    console.log(error);
    return null;
  }
};
