import { Router } from "express";
import { getAIAnalyticsQuery } from "../controllers/query.controller.js";

const router = Router();

router.post("/", getAIAnalyticsQuery);

export default router;