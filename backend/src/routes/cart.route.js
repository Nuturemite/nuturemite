import express from "express";
import {
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
  saveCart
} from "../controllers/cart.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuth, addItemToCart);
router.delete("/:productId", isAuth, removeItemFromCart);
router.get("/", isAuth, getCartByUserId);
router.post("/save", isAuth, saveCart);
export default router;
