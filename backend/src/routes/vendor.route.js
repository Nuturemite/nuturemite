import express from "express";
import isAuth from "../middlewares/auth.js";
import {
  registerVendor,
  getVendorDetails,
  getAllVendors,
  updateVendorDetails,
} from "../controllers/vendor.controller.js";

const router = express.Router();

router.post("/register", isAuth, registerVendor);
router.get("/:id", isAuth, getVendorDetails);
router.get("/", isAuth, getAllVendors);
router.put("/:id", isAuth, updateVendorDetails);

export default router;
