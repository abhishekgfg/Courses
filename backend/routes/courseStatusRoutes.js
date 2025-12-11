// routes/courseStatusRoutes.js
import express from "express";
import { getCourseStatuses, updateCourseStatus } from "../controllers/courseStatusController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCourseStatuses);
router.post("/update", protect, updateCourseStatus);

export default router;
