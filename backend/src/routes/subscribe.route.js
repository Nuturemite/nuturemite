import { Router } from "express";
import {
  createSubscribe,
  getSubscribes,
  unsubscribe,
} from "../controllers/subscribe.controller.js";

const router = Router();

router.post("/subscribe", createSubscribe);
router.get("/subscribers", getSubscribes);
router.post("/unsubscribe", unsubscribe);

export default router;
