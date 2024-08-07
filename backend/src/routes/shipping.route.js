import express from "express";
import { createShipment, getAllMyShipmentsAsVendor, getShipmentById, updateShipment } from "../controllers/shipping.controller.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.get("/vendor/my/shipments", isAuth, getAllMyShipmentsAsVendor);
router.get('/shipments/:id', isAuth, getShipmentById);
router.post('/shipments', isAuth,createShipment);
router.put('/shipments/:id', isAuth,updateShipment);


export default router;
