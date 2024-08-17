import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  getVendorOrders,
  getMyOrders,
  getMyOrdersAsVendor,
  updateOrder,
  confirmOrder,
} from "../controllers/order.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

// Admin
router.get("/orders", isAuth, getAllOrders); // Get all orders
router.get("/users/:userId/orders", isAuth, getUserOrders); // Get orders by user ID
router.get("/vendors/:vendorId/orders", isAuth, getVendorOrders); // Get orders by vendor ID

// Vendor
router.get("/vendor/my/orders", isAuth, getMyOrdersAsVendor); // Get logged-in vendor's orders
router.post("/orders/:orderId/confirm", isAuth, confirmOrder);
// User
router.get("/my/orders", isAuth, getMyOrders); // Get logged-in user's orders
router.get("/orders/:id", isAuth, getOrderById); // Get order by order ID
router.post("/orders/place-order", isAuth, placeOrder); // Place a new order

router.put("/orders/:id", isAuth, updateOrder);

export default router;
