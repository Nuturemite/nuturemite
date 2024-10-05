import express from "express";
const router = express.Router();
import isAuth from "../middlewares/auth.js";
import { createPayment, verifyRazorpayOrder, verifyPhonepeOrder } from "../controllers/payment.controller.js";
    
router.post("/create-payment", isAuth, createPayment);
router.post("/verify-razorpay-order", isAuth, verifyRazorpayOrder);
router.post("/verify-phonepe-order", verifyPhonepeOrder);
export default router;
