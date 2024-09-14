import express from 'express';
const router = express.Router();
import { createAddress, getMyAddresses, getAddressById, updateAddress, deleteAddress } from '../controllers/address.controller.js';
import isAuth from "../middlewares/auth.js";

router.post("/addresses", isAuth, createAddress);
router.get("/my-addresses", isAuth, getMyAddresses);
router.get("/addresses/:id", isAuth, getAddressById);
router.put("/addresses/:id", isAuth, updateAddress);
router.delete("/addresses/:id", isAuth, deleteAddress);

export default router;
