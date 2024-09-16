import express from "express";
const router = express.Router();
import isAuth from "../middlewares/auth.js";
import { createRazorpayOrder, verifyRazorpayOrder } from "../controllers/payment.controller.js";
    
router.post("/create-razorpay-order", isAuth, createRazorpayOrder);
router.post("/verify-razorpay-order", isAuth, verifyRazorpayOrder);

export default router;
