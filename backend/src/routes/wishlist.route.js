import express from "express";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/:vendorProductId", isAuth, addItemToWishlist);
router.delete("/:vendorProductId", isAuth, removeItemFromWishlist);
router.get("/", isAuth, getWishlist);

export default router;
