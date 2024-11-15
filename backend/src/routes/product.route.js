import express from "express";
import isAuth from "../middlewares/auth.js";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getAllMyVendorProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", isAuth, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/slug/:slug", getProductBySlug);
router.put("/:id", isAuth, updateProduct);
router.delete("/:id", isAuth, deleteProduct);
router.get("/me/vendor-products", isAuth, getAllMyVendorProducts);
export default router;
