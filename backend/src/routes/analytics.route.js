import { Router } from "express";
import {
  getOrderAnalytics,
  getRevenuePerUser,
  getSalesAnalytics,
  getOrdersAnalytics,
  getTodayReviews,
  getTopProducts,
  getTopUsers,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", getOrderAnalytics);
router.get("/revenue-per-user", getRevenuePerUser);
router.get("/sales-analytics", getSalesAnalytics);
router.get("/orders-analytics", getOrdersAnalytics);
router.get("/today-reviews", getTodayReviews);
router.get("/top-products", getTopProducts);
router.get("/top-users", getTopUsers);
export default router;
