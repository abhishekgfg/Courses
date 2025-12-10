// src/routes/courseRoutes.js

import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

/**
 * ----------------------------------------
 * CREATE COURSE
 * POST /api/courses
 * ----------------------------------------
 */
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonThumbnails", maxCount: 50 },
  ]),
  createCourse
);

/**
 * ----------------------------------------
 * GET ALL COURSES
 * GET /api/courses
 * ----------------------------------------
 */
router.get("/", getCourses);

/**
 * ----------------------------------------
 * GET SINGLE COURSE
 * GET /api/courses/:id
 * ----------------------------------------
 */
router.get("/:id", getCourseById);

/**
 * ----------------------------------------
 * UPDATE COURSE
 * PUT /api/courses/:id
 * ----------------------------------------
 */
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonThumbnails", maxCount: 50 },
  ]),
  updateCourse
);

/**
 * ----------------------------------------
 * DELETE COURSE
 * DELETE /api/courses/:id
 * ----------------------------------------
 */
router.delete("/:id", deleteCourse);

export default router;
