import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  getAllUsers
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✔ NEW: Fetch logged-in user information
router.get("/me", protect, getProfile);
router.get("/users", protect, getAllUsers);

export default router;
