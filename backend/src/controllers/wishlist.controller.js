import mongoose from "mongoose";
import { Wishlist } from "../models/model.js";

// Add item to wishlist
export const addItemToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { vendorProductId } = req.params;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }
    const itemIndex = wishlist
      ? wishlist.items.findIndex(item => item.vendorProduct.equals(vendorProductId))
      : -1;

    if (itemIndex == -1) wishlist.items.push({ vendorProduct: vendorProductId });

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    const wishlist = await Wishlist.aggregate([
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

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
    const data = wishlist.length == 0 ? [] : wishlist[0].items;
    
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (req, res) => {
  const { vendorProductId } = req.params;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(item => !item.vendorProduct.equals(vendorProductId));

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
