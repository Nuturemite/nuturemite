import express from "express";
const router = express.Router();
import isAuth from "../middlewares/auth.js";
import { createCheckoutSession, stripePaymentListener } from "../controllers/payment.controller.js";

router.post("/create-checkout-session", isAuth, createCheckoutSession);

export default router;
