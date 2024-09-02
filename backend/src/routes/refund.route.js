import express from "express";
const refundRoutes = express.Router();

import { createRefund, getMyVendorRefunds, getRefunds } from "../controllers/refund.controller.js";
import isAuth from "../middlewares/auth.js";

refundRoutes.post("/orders/:orderId/refund", isAuth, createRefund);
refundRoutes.get("/refunds", isAuth, getRefunds);
refundRoutes.get('/my-vendor-refunds', isAuth, getMyVendorRefunds);

export default refundRoutes;
