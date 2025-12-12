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

    let updatedCourse = null;

    // ---------- PURCHASED ----------
    if (status === "Purchased") {
      // Unlock all modules
      updatedCourse = await Course.updateMany(
        {},
        { $set: { "modules.$[].isLocked": false } }
      );
    }

    // ---------- PENDING ----------
    if (status === "Pending") {
      // Lock all modules
      updatedCourse = await Course.updateMany(
        {},
        { $set: { "modules.$[].isLocked": true } }
      );
    }

    // ---------- UPDATE USER COURSE STATUS ----------
    const updatedStatus = await CourseStatus.findOneAndUpdate(
      { userId },
      { status },
      { new: true, upsert: true }
    );

    return res.json({
      message: `Status updated to ${status}`,
      courseUpdate: updatedCourse,
      userStatus: updatedStatus,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


