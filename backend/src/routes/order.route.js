import express from "express";
import {
  placeOrder,
  getOrdersByUserId,
  getAllOrders,
  getOrderById,
} from "../controllers/order.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", isAuth, getOrdersByUserId);
router.get("/", isAuth, getAllOrders);
router.get("/:id", isAuth, getOrderById);
router.post("/place-order", isAuth, placeOrder);

export default router;
