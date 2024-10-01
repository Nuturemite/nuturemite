import express from "express";
import { createBanner, updateBanner, deleteBanner, getBanners } from "../controllers/banner.controller.js";

const router = express.Router();

router.post("/", createBanner);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);
router.get("/", getBanners);

export default router;