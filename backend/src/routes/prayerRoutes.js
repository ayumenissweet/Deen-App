import express from "express";
import {
  completePrayer,
  getTodayPrayers,
  getPrayerHistory,
} from "../controllers/prayerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/complete", protect, completePrayer);
router.get("/today", protect, getTodayPrayers);
router.get("/history", protect, getPrayerHistory);

export default router;
