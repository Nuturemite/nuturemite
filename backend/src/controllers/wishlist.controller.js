// controllers/wishlistController.js
import { Wishlist } from "../models/model.js";

// Add item to wishlist
export const addItemToWishlist = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }
    console.log(wishlist);
    const existingItem = wishlist.items.find(item => item.product.toString() === productId);

    if (!existingItem) {
      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    res.status(200).json({ data: wishlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding item to wishlist", error });
  }
};

// Get wishlist by user ID
export const getWishlistByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("items.product");

    if (!wishlist) {
      return res.status(200).json({ data: [] });
    }

    res.status(200).json({ data: wishlist.items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting wishlist", error });
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing item from wishlist", error });
  }
};
