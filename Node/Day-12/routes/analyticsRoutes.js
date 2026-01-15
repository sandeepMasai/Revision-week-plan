import express from "express";
import { getOrderAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/orders", getOrderAnalytics);

export default router;
