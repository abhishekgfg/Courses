// controllers/courseStatusController.js
import CourseStatus from "../models/CourseStatusModel.js";
import Course from "../models/Course.js";
// Get all statuses
export const getCourseStatuses = async (req, res) => {
  try {
    const statuses = await CourseStatus.find().populate(
      "userId",
      "name email phone createdAt"
    );
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update status

export const updateCourseStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Check if the status is "Purchased"
    if (status === "Purchased") {
      // Update the modules to set isLocked to false if the course is purchased
      const updatedCourse = await Course.updateMany(
        { "modules.userId": userId }, // Match the course where the user is enrolled
        { $set: { "modules.$[].isLocked": false } }, // Update isLocked to false for all modules
        { new: true, upsert: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.json(updatedCourse); // Return updated course
    }

    // If status is not "Purchased", simply update the CourseStatus
    const updatedStatus = await CourseStatus.findOneAndUpdate(
      { userId },
      { status },
      { new: true, upsert: true }
    );

    res.json(updatedStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
