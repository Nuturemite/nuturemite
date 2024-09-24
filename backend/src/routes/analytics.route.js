import { Router } from "express";
import { getOrderAnalytics, getRevenuePerUser } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", getOrderAnalytics);
router.get("/revenue-per-user", getRevenuePerUser);
export default router;