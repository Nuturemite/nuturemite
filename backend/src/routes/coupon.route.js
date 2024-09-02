import express from "express";
const couponRoutes = express.Router();

import {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getMyVendorCoupons,
} from "../controllers/coupon.controller.js";
import isAuth from "../middlewares/auth.js";

couponRoutes.post("/coupons/", isAuth, createCoupon);
couponRoutes.get("/coupons/", isAuth, getAllCoupons);
couponRoutes.get("/coupons/:code", isAuth, getCoupon);
couponRoutes.get("/my-vendor-coupons", isAuth, getMyVendorCoupons);
couponRoutes.put("/coupons/:id", isAuth, updateCoupon);
couponRoutes.delete("/coupons/:id", isAuth, deleteCoupon);

export default couponRoutes;
