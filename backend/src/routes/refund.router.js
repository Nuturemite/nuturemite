import express from "express"
const router = express.Router();

import { createRefund } from "../controllers/refund.controller.js"


router.post("/order/:orderId/refu", createRefund);

export default router