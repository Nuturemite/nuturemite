import express from "express";
import {
  addItemToCart,
  removeItemFromCart,
  getCart,
  // getUserCart,
} from "../controllers/cart.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/:vendorProductId", isAuth, addItemToCart);
router.delete("/:vendorProductId", isAuth, removeItemFromCart);
router.get("/", isAuth, getCart);
// router.get('/:userId', getUserCart);

export default router;
