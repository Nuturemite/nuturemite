import express from "express";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUserId,
} from "../controllers/wishlist.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/:productId", isAuth, addItemToWishlist);
router.delete("/:productId", isAuth, removeItemFromWishlist);
router.get("/", isAuth, getWishlistByUserId);

export default router;
