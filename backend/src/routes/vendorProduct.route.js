import express from "express";
import {
  createVendorProduct,
  getAllVendorProducts,
  getVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
} from "../controllers/vendorProduct.controller.js";
import isAuth from "../middlewares/auth.js";
const router = express.Router();

router.post("/", isAuth, createVendorProduct);
router.get("/", getAllVendorProducts);
router.get("/:id", getVendorProduct);
router.put("/:id", isAuth, updateVendorProduct);
router.delete("/:id", isAuth, deleteVendorProduct);

export default router;
