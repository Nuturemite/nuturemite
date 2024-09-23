import express from "express";
import isAuth from "../middlewares/auth.js";
import {
  getCurrentUser,
  login,
  register,
  registerVendor,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/register/vendor", registerVendor);
router.post("/login", login);
router.get("/me", isAuth, getCurrentUser);
router.route("/verify-email").post(verifyEmail).get(verifyEmail);
export default router;
