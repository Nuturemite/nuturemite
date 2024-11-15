import express from "express";
import isAuth from "../middlewares/auth.js";
import {
  getCurrentUser,
  login,
  register,
  registerVendor,
  verifyEmail,
  updatePassword,
  sendResetPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/register/vendor", registerVendor);
router.post("/login", login);
router.get("/me", isAuth, getCurrentUser);
router.route("/verify-email").post(verifyEmail).get(verifyEmail);
router.put("/update-password/:id", updatePassword);
router.post("/forgot-password", sendResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
