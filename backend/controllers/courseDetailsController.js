import CourseDetails from "../models/CourseDetails.js";

export const uploadCourseDetails = async (req, res) => {
  try {
    const data = JSON.parse(req.body.courseDetails);
    data.moduleId = req.body.moduleId;

    // ⭐ Ensure instructor object exists
    if (!data.instructor) data.instructor = {};

    // ⭐ Map ALL frontend fields → backend schema fields
    data.instructor.name = data.instructor.name || "";
    data.instructor.role = data.instructor.title || data.instructor.role || "";
    data.instructor.about = data.instructor.expertise
      ? data.instructor.expertise.join(", ")
      : data.instructor.about || "";

    // ⭐ Photo
    const instructorPhoto = req.files.find(
      (f) => f.fieldname === "instructorPhoto"
    );

    if (instructorPhoto) {
      data.instructor.photoPath = instructorPhoto.filename;
    }

    // ⭐ Downloads
    data.downloads = data.downloads.map((d, idx) => {
      const file = req.files.find((f) => f.fieldname === `download_${idx}`);
      return {
        name: d.name,
        filePath: file ? file.filename : null,
      };
    });

    // ⭐ Save
    const saved = await CourseDetails.create(data);

    res.json({
      success: true,
      message: "Course details uploaded successfully!",
      saved,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getCourseDetails = async (req, res) => {
  try {
    const details = await CourseDetails.findById(req.params.id);
    if (!details) return res.status(404).json({ message: "Not Found" });

    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCourseDetailsByCourseId = async (req, res) => {
  try {
    const details = await CourseDetails.findOne({
      moduleId: req.params.courseId,
    });

    if (!details) {
      return res.status(404).json({ message: "No details found" });
    }

    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};