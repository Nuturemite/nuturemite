import express from "express";
import {
  createVendorProduct,
  getAllVendorProducts,
  getVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
} from "../controllers/vendorProduct.controller.js";

const router = express.Router();

router.post("/", createVendorProduct);
router.get("/", getAllVendorProducts);
router.get("/:id", getVendorProduct);
router.put("/:id", updateVendorProduct);
router.delete("/:id", deleteVendorProduct);

export default router;
