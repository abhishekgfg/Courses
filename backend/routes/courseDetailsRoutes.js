import express from "express";
import { upload } from "../middleware/upload.js";
import {
  uploadCourseDetails,
  getCourseDetailsByCourseId,
} from "../controllers/courseDetailsController.js";

const router = express.Router();

router.post("/details", upload.any(), uploadCourseDetails);

// ⭐ NEW ROUTE — Fetch by courseId (moduleId)
router.get("/details/by-course/:courseId", getCourseDetailsByCourseId);

export default router;
