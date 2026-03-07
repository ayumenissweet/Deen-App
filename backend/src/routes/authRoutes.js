import express from "express";

import {
  register,
  login,
  googleLogin,
  refreshToken,
  getMe,
  logout,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/refresh-token", refreshToken);

router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;
