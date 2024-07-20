import express from "express";
import { createReview , getReviewsByProductId} from "../controllers/review.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuth, createReview);
router.get("/product/:productId", getReviewsByProductId);

export default router;
