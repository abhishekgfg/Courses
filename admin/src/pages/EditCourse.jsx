  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axiosInstance from "../utils/axiosInstance";
  import {
    FiArrowLeft,
    FiSave,
    FiPlus,
    FiTrash2,
    FiImage,
    FiVideo,
  } from "react-icons/fi";

  const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [course, setCourse] = useState({
      moduleName: "",
      disease: "",
      type: "",
      access: "",
      courseTitle: "",
      courseDescription: "",
      totalModules: 0,
      totalTime: "",
      youWillLearn: [],
      bottomFieldText: "",
      thumbnail: "",
      modules: [],
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [lessonThumbnails, setLessonThumbnails] = useState({}); // KEY: "modIndex-lessonIndex"

    // -------------------------------
    // FETCH COURSE
    // -------------------------------
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/admin/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    };

    useEffect(() => { fetchCourse(); }, []);

    // Update field
    const updateField = (key, value) =>
      setCourse((prev) => ({ ...prev, [key]: value }));

    // Add module
    const addModule = () => {
      setCourse((prev) => ({
        ...prev,
        modules: [...prev.modules, { title: "", lessons: [] }],
      }));
    };

    // Remove module
    const deleteModule = (index) => {
      const updated = course.modules.filter((_, i) => i !== index);
      setCourse((prev) => ({ ...prev, modules: updated }));
    };

    // Add lesson
    const addLesson = (moduleIndex) => {
      const updated = [...course.modules];
      updated[moduleIndex].lessons.push({
        name: "",
        type: "Video",
        duration: "",
        youtubeUrl: "",
        thumbnail: "",
        points: [],
      });
      setCourse((prev) => ({ ...prev, modules: updated }));
    };

    // Delete lesson
    const deleteLesson = (moduleIndex, lessonIndex) => {
      const updated = [...course.modules];
      updated[moduleIndex].lessons.splice(lessonIndex, 1);
      setCourse((prev) => ({ ...prev, modules: updated }));
    };

    // Add learning point
    const addLearningPoint = () =>
      updateField("youWillLearn", [...course.youWillLearn, ""]);

    // -------------------------------
    // SAVE COURSE
    // -------------------------------
    const saveCourse = async () => {
      setSaving(true);

      const formData = new FormData();

      // TEXT FIELDS
      for (let key in course) {
        if (key === "modules" || key === "youWillLearn") continue;
        formData.append(key, course[key]);
      }

      formData.append("youWillLearn", JSON.stringify(course.youWillLearn));
      formData.append("modules", JSON.stringify(course.modules));

      // Thumbnail
      if (thumbnail) formData.append("thumbnail", thumbnail);

      // LESSON THUMBNAILS
      Object.keys(lessonThumbnails).forEach((key) => {
        formData.append("lessonThumbnails", lessonThumbnails[key]);
      });

      try {
        await axiosInstance.put(`/admin/courses/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Course updated successfully!");
        navigate("/admin/course");
      } catch (err) {
        console.error(err);
        alert("Failed to update course");
      }

      setSaving(false);
    };

    if (loading)
      return <div className="p-6 text-center text-gray-600">Loading course...</div>;

    return (
      <div className="p-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/admin/course")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft /> Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

        {/* ===========================================
            BASIC FIELDS
        ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div>
            <label className="block font-semibold">Course Title</label>
            <input
              value={course.courseTitle}
              onChange={(e) => updateField("courseTitle", e.target.value)}
              className="w-full mt-2 p-3 border rounded"
            />

            <label className="block font-semibold mt-4">Disease</label>
            <input
              value={course.disease}
              onChange={(e) => updateField("disease", e.target.value)}
              className="w-full mt-2 p-3 border rounded"
            />

            <label className="block font-semibold mt-4">Course Type</label>
            <select
              value={course.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option>Intro</option>
              <option>Deep-dive</option>
              <option>Protocols</option>
            </select>

            <label className="block font-semibold mt-4">Access Type</label>
            <select
              value={course.access}
              onChange={(e) => updateField("access", e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option>Free</option>
              <option>Paid</option>
            </select>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <label className="block font-semibold">Course Thumbnail</label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />

            {course.thumbnail && (
              <img
                src={`http://localhost:5000/uploads/${course.thumbnail}`}
                className="w-40 mt-3 rounded-xl shadow"
              />
            )}

            <label className="block font-semibold mt-4">Total Modules</label>
            <input
              value={course.totalModules}
              onChange={(e) => updateField("totalModules", e.target.value)}
              className="w-full mt-2 p-3 border rounded"
            />

            <label className="block font-semibold mt-4">Total Time</label>
            <input
              value={course.totalTime}
              onChange={(e) => updateField("totalTime", e.target.value)}
              className="w-full mt-2 p-3 border rounded"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <label className="block font-semibold mt-6">Course Description</label>
        <textarea
          value={course.courseDescription}
          onChange={(e) => updateField("courseDescription", e.target.value)}
          className="w-full p-3 border rounded"
          rows={4}
        />
  {/* BOTTOM FIELD TEXT */}
  <label className="block font-semibold mt-6">Bottom Field Text (Lead By)</label>
  <input
    value={course.bottomFieldText}
    onChange={(e) => updateField("bottomFieldText", e.target.value)}
    className="w-full p-3 border rounded"
  />

        {/* ===========================================
            YOU WILL LEARN
        ============================================ */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">You Will Learn</h2>

          {course.youWillLearn.map((point, i) => (
            <input
              key={i}
              value={point}
              onChange={(e) => {
                const updated = [...course.youWillLearn];
                updated[i] = e.target.value;
                updateField("youWillLearn", updated);
              }}
              className="w-full p-2 border rounded mb-2"
            />
          ))}

          <button
            onClick={addLearningPoint}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
          >
            <FiPlus /> Add Point
          </button>
        </div>

        {/* ===========================================
            MODULES
        ============================================ */}
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-semibold flex justify-between items-center">
            Modules
            <button
              onClick={addModule}
              className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
            >
              <FiPlus /> Add Module
            </button>
          </h2>

          {course.modules.map((mod, modIndex) => (
            <div key={modIndex} className="mt-6 p-5 bg-gray-50 border rounded-lg shadow">

              {/* MODULE TITLE */}
              <div className="flex justify-between items-center">
                <input
                  value={mod.title}
                  placeholder="Module Title"
                  onChange={(e) => {
                    const updated = [...course.modules];
                    updated[modIndex].title = e.target.value;
                    setCourse((prev) => ({ ...prev, modules: updated }));
                  }}
                  className="w-full p-3 border rounded"
                />

                <button
                  onClick={() => deleteModule(modIndex)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={22} />
                </button>
              </div>

              {/* ADD LESSON */}
              <button
                onClick={() => addLesson(modIndex)}
                className="mt-4 px-3 py-2 bg-green-600 text-white rounded flex items-center gap-2"
              >
                <FiPlus /> Add Lesson
              </button>

              {/* LESSONS LIST */}
              {mod.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="mt-3 p-4 bg-white border rounded shadow-sm">

                  {/* HEADER */}
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-700">Lesson {lessonIndex + 1}</h3>

                    <button
                      onClick={() => deleteLesson(modIndex, lessonIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  {/* LESSON INPUTS */}
                  <input
                    value={lesson.name}
                    placeholder="Lesson Name"
                    onChange={(e) => {
                      const updated = [...course.modules];
                      updated[modIndex].lessons[lessonIndex].name = e.target.value;
                      setCourse((prev) => ({ ...prev, modules: updated }));
                    }}
                    className="w-full p-2 mt-2 border rounded"
                  />

                  <input
                    value={lesson.youtubeUrl}
                    placeholder="YouTube URL"
                    onChange={(e) => {
                      const updated = [...course.modules];
                      updated[modIndex].lessons[lessonIndex].youtubeUrl = e.target.value;
                      setCourse((prev) => ({ ...prev, modules: updated }));
                    }}
                    className="w-full p-2 mt-2 border rounded"
                  />
  {/* LESSON POINTS */}
  <div className="mt-4">
    <label className="font-semibold">Lesson Points</label>

    {lesson.points?.map((point, pIndex) => (
      <div key={pIndex} className="flex items-center gap-2 mt-2">
        <input
          value={point}
          onChange={(e) => {
            const updated = [...course.modules];
            updated[modIndex].lessons[lessonIndex].points[pIndex] =
              e.target.value;
            setCourse((prev) => ({ ...prev, modules: updated }));
          }}
          className="w-full p-2 border rounded"
        />

        {/* DELETE POINT */}
        <button
          onClick={() => {
            const updated = [...course.modules];
            updated[modIndex].lessons[lessonIndex].points.splice(pIndex, 1);
            setCourse((prev) => ({ ...prev, modules: updated }));
          }}
          className="text-red-600 hover:text-red-800"
        >
          <FiTrash2 />
        </button>
      </div>
    ))}

    {/* ADD NEW POINT */}
    <button
      onClick={() => {
        const updated = [...course.modules];
        updated[modIndex].lessons[lessonIndex].points.push("");
        setCourse((prev) => ({ ...prev, modules: updated }));
      }}
      className="mt-3 px-3 py-2 bg-purple-600 text-white rounded flex items-center gap-2"
    >
      <FiPlus /> Add Learning Point
    </button>
  </div>

                  {/* LESSON THUMBNAIL */}
                  <label className="mt-3 flex items-center gap-2 font-medium text-gray-700">
                    <FiImage /> Lesson Thumbnail
                  </label>

                  <input
                    type="file"
                    className="mt-1"
                    onChange={(e) =>
                      setLessonThumbnails((prev) => ({
                        ...prev,
                        [`${modIndex}-${lessonIndex}`]: e.target.files[0],
                      }))
                    }
                  />

                  {lesson.thumbnail && (
                    <img
                      src={`http://localhost:5000/uploads/${lesson.thumbnail}`}
                      className="w-32 mt-2 rounded-xl border"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveCourse}
          disabled={saving}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-3 text-lg shadow"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    );
  };

  export default EditCourse;
