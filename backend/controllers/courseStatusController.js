// controllers/courseStatusController.js
import CourseStatus from "../models/CourseStatusModel.js";

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

    const updated = await CourseStatus.findOneAndUpdate(
      { userId },
      { status },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
