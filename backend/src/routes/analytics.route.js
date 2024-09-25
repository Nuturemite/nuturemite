import { Router } from "express";
import { getOrderAnalytics, getRevenuePerUser, getSalesAnalytics, getOrdersAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", getOrderAnalytics);
router.get("/revenue-per-user", getRevenuePerUser);
router.get("/sales-analytics", getSalesAnalytics);
router.get("/orders-analytics", getOrdersAnalytics);
export default router;