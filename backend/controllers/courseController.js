import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    let {
      moduleName, disease, type, access, courseTitle,
      courseDescription, totalModules, totalTime,
      youWillLearn, bottomFieldText, modules
    } = req.body;

    // Safe JSON parse
    try { if (typeof modules === "string") modules = JSON.parse(modules); } 
    catch { return res.status(400).json({ message: "Invalid modules JSON" }); }
    try { if (typeof youWillLearn === "string") youWillLearn = JSON.parse(youWillLearn); } 
    catch { return res.status(400).json({ message: "Invalid youWillLearn JSON" }); }

    totalModules = Number(totalModules) || 0;

    const thumbnail = req.files?.thumbnail?.[0]?.filename || "";
    const lessonThumbnails = req.files?.lessonThumbnails || [];

    let thumbIndex = 0;
    const modulesData = modules.map(mod => {
      const lessonsWithThumbs = mod.lessons.map(lesson => {
        const thumb = lessonThumbnails[thumbIndex]?.filename || "";
        thumbIndex++;
        return { ...lesson, thumbnail: thumb };
      });
      return { ...mod, lessons: lessonsWithThumbs };
    });

    const course = new Course({
      moduleName, disease, type, access,
      courseTitle, courseDescription, totalModules,
      totalTime, youWillLearn, bottomFieldText,
      thumbnail, modules: modulesData
    });

    await course.save();
    res.status(201).json(course);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET ONE COURSE (for edit page)
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    let {
      moduleName,
      disease,
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules,
      totalTime,
      youWillLearn,
      bottomFieldText,
      modules,
    } = req.body;

    // -----------------------------
    // SAFE JSON PARSE
    // -----------------------------
    const safeParse = (value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    };

    modules = safeParse(modules);
    youWillLearn = safeParse(youWillLearn);

    totalModules = Number(totalModules) || 0;

    // -----------------------------
    // FILES
    // -----------------------------
    const newThumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const lessonThumbnails = req.files?.lessonThumbnails || [];

    let idx = 0;

    // -----------------------------
    // UPDATE MODULES
    // -----------------------------
    const updatedModules = Array.isArray(modules)
      ? modules.map((mod) => ({
          ...mod,
          lessons: Array.isArray(mod.lessons)
            ? mod.lessons.map((lesson) => ({
                ...lesson,
                thumbnail:
                  lesson.thumbnail ||
                  lessonThumbnails[idx++]?.filename ||
                  "",
              }))
            : [],
        }))
      : [];

    // -----------------------------
    // BUILD UPDATE OBJECT
    // -----------------------------
    const updateData = {
      moduleName,
      disease,
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules,
      totalTime,
      youWillLearn,
      bottomFieldText,
      modules: updatedModules,
    };

    if (newThumbnail) updateData.thumbnail = newThumbnail;

    // -----------------------------
    // UPDATE IN DB
    // -----------------------------
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    return res.json(updatedCourse);
  } catch (err) {
    console.error("Update Course Error:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

