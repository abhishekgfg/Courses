import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiUpload, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";

const CourseDetailsForm = () => {
  const [loading, setLoading] = useState(false);

  const [modulesList, setModulesList] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    whoThisIsFor: { perfectFor: [""], notFor: [""] },

    instructor: {
      name: "",
      title: "",
      expertise: [""],
      photo: null,
    },

    keyPoints: [""],
    actionSteps: [""],
    downloads: [{ name: "", file: null }],
  });

  // ------------------------------------------------------------
  // FETCH MODULES
  // ------------------------------------------------------------
useEffect(() => {
  const fetchModules = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses"); 
      setModulesList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchModules();
}, []);

  // ------------------------------------------------------------
  // ARRAY HELPERS
  // ------------------------------------------------------------
  const handleArrayChange = (section, index, value) => {
    setCourseDetails((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addToArray = (section, emptyValue) => {
    setCourseDetails((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyValue],
    }));
  };

  const removeFromArray = (section, index) => {
    setCourseDetails((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleInstructorExpertise = (index, value) => {
    setCourseDetails((prev) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        expertise: prev.instructor.expertise.map((e, i) =>
          i === index ? value : e
        ),
      },
    }));
  };

  const addInstructorExpertise = () =>
    setCourseDetails((prev) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        expertise: [...prev.instructor.expertise, ""],
      },
    }));

  const removeInstructorExpertise = (index) => {
    setCourseDetails((prev) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        expertise: prev.instructor.expertise.filter((_, i) => i !== index),
      },
    }));
  };

  // ------------------------------------------------------------
  // DOWNLOAD FILE CHANGE
  // ------------------------------------------------------------
  const handleDownloadChange = (index, key, value) => {
    setCourseDetails((prev) => ({
      ...prev,
      downloads: prev.downloads.map((d, i) =>
        i === index ? { ...d, [key]: value } : d
      ),
    }));
  };

  // ------------------------------------------------------------
  // SUBMIT
  // ------------------------------------------------------------
  const handleSubmit = async () => {
    if (!selectedModule) {
      alert("Please select a module!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("moduleId", selectedModule);
      formData.append("courseDetails", JSON.stringify(courseDetails));

      if (courseDetails.instructor.photo) {
        formData.append("instructorPhoto", courseDetails.instructor.photo);
      }

      courseDetails.downloads.forEach((file, idx) => {
        if (file.file) {
          formData.append(`download_${idx}`, file.file);
        }
      });

      await axiosInstance.post("/admin/courses/details", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Course Details Saved Successfully!");
    } catch (err) {
      console.log(err);
      alert("Upload Failed!");
    }

    setLoading(false);
  };

  // ------------------------------------------------------------
  // UI RENDER
  // ------------------------------------------------------------
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Course Details</h1>

      {/* MODULE DROPDOWN */}
      <div className="mb-6">
        <label className="font-semibold">Select Module</label>
    <select
  className="w-full p-2 border rounded mt-2"
  value={selectedModule}
  onChange={(e) => setSelectedModule(e.target.value)}
>
  <option value="">-- Select Module --</option>

  {modulesList.map((course) => (
    <option key={course._id} value={course._id}>
      {course.courseTitle}   {/* Shows Course Title */}
    </option>
  ))}
</select>

      </div>

      {/* Course Title */}
      <div className="mb-6">
        <label className="font-semibold">Course Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-2"
          value={courseDetails.title}
          onChange={(e) =>
            setCourseDetails({ ...courseDetails, title: e.target.value })
          }
        />
      </div>

      {/* Who This Is For */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Who This Course Is For</h2>

        {/* Perfect For */}
        <h3 className="font-medium mt-4">Perfect For</h3>
        {courseDetails.whoThisIsFor.perfectFor.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={item}
              className="p-2 border w-full rounded"
              onChange={(e) =>
                setCourseDetails((prev) => ({
                  ...prev,
                  whoThisIsFor: {
                    ...prev.whoThisIsFor,
                    perfectFor: prev.whoThisIsFor.perfectFor.map((p, i) =>
                      i === index ? e.target.value : p
                    ),
                  },
                }))
              }
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() =>
                setCourseDetails((prev) => ({
                  ...prev,
                  whoThisIsFor: {
                    ...prev.whoThisIsFor,
                    perfectFor: prev.whoThisIsFor.perfectFor.filter(
                      (_, i) => i !== index
                    ),
                  },
                }))
              }
            />
          </div>
        ))}

        <button
          onClick={() =>
            setCourseDetails((prev) => ({
              ...prev,
              whoThisIsFor: {
                ...prev.whoThisIsFor,
                perfectFor: [...prev.whoThisIsFor.perfectFor, ""],
              },
            }))
          }
          className="mt-2 flex items-center gap-2 text-blue-600"
        >
          <FiPlus /> Add More
        </button>

        {/* NOT For */}
        <h3 className="font-medium mt-6">Not For</h3>

        {courseDetails.whoThisIsFor.notFor.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={item}
              className="p-2 border w-full rounded"
              onChange={(e) =>
                setCourseDetails((prev) => ({
                  ...prev,
                  whoThisIsFor: {
                    ...prev.whoThisIsFor,
                    notFor: prev.whoThisIsFor.notFor.map((p, i) =>
                      i === index ? e.target.value : p
                    ),
                  },
                }))
              }
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() =>
                setCourseDetails((prev) => ({
                  ...prev,
                  whoThisIsFor: {
                    ...prev.whoThisIsFor,
                    notFor: prev.whoThisIsFor.notFor.filter(
                      (_, i) => i !== index
                    ),
                  },
                }))
              }
            />
          </div>
        ))}

        <button
          onClick={() =>
            setCourseDetails((prev) => ({
              ...prev,
              whoThisIsFor: {
                ...prev.whoThisIsFor,
                notFor: [...prev.whoThisIsFor.notFor, ""],
              },
            }))
          }
          className="mt-2 flex items-center gap-2 text-blue-600"
        >
          <FiPlus /> Add More
        </button>
      </div>

      {/* Instructor Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Instructor</h2>

        <input
          type="text"
          placeholder="Instructor Name"
          className="w-full p-2 border rounded mt-2"
          value={courseDetails.instructor.name}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              instructor: {
                ...courseDetails.instructor,
                name: e.target.value,
              },
            })
          }
        />

        <input
          type="text"
          placeholder="Instructor Title"
          className="w-full p-2 border rounded mt-2"
          value={courseDetails.instructor.title}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              instructor: {
                ...courseDetails.instructor,
                title: e.target.value,
              },
            })
          }
        />

        <h3 className="font-medium mt-4">Expertise</h3>

        {courseDetails.instructor.expertise.map((exp, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={exp}
              onChange={(e) =>
                handleInstructorExpertise(index, e.target.value)
              }
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() => removeInstructorExpertise(index)}
            />
          </div>
        ))}

        <button
          onClick={addInstructorExpertise}
          className="flex items-center gap-2 text-blue-600 mt-2"
        >
          <FiPlus /> Add Expertise
        </button>

        <div className="mt-4">
          <label className="font-semibold">Instructor Photo</label>
          <input
            type="file"
            className="block mt-2"
            onChange={(e) =>
              setCourseDetails((prev) => ({
                ...prev,
                instructor: {
                  ...prev.instructor,
                  photo: e.target.files[0],
                },
              }))
            }
          />
        </div>
      </div>

      {/* Key Points */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Key Points</h2>

        {courseDetails.keyPoints.map((kp, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={kp}
              onChange={(e) =>
                handleArrayChange("keyPoints", index, e.target.value)
              }
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() => removeFromArray("keyPoints", index)}
            />
          </div>
        ))}

        <button
          onClick={() => addToArray("keyPoints", "")}
          className="mt-2 flex items-center gap-2 text-blue-600"
        >
          <FiPlus /> Add Key Point
        </button>
      </div>

      {/* Action Steps */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Action Steps</h2>

        {courseDetails.actionSteps.map((as, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={as}
              onChange={(e) =>
                handleArrayChange("actionSteps", index, e.target.value)
              }
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() => removeFromArray("actionSteps", index)}
            />
          </div>
        ))}

        <button
          onClick={() => addToArray("actionSteps", "")}
          className="mt-2 flex items-center gap-2 text-blue-600"
        >
          <FiPlus /> Add Action Step
        </button>
      </div>

      {/* Downloads */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Downloadable Files</h2>

        {courseDetails.downloads.map((dl, index) => (
          <div key={index} className="flex gap-4 mt-3 items-center">
            <input
              type="text"
              placeholder="File Name"
              className="p-2 border rounded w-1/3"
              value={dl.name}
              onChange={(e) =>
                handleDownloadChange(index, "name", e.target.value)
              }
            />

            <input
              type="file"
              onChange={(e) =>
                handleDownloadChange(index, "file", e.target.files[0])
              }
            />

            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={() => removeFromArray("downloads", index)}
            />
          </div>
        ))}

        <button
          onClick={() =>
            addToArray("downloads", { name: "", file: null })
          }
          className="flex items-center gap-2 mt-3 text-blue-600"
        >
          <FiPlus /> Add File
        </button>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2 shadow"
      >
        <FiSave /> {loading ? "Saving..." : "Save Course Details"}
      </button>
    </div>
  );
};

export default CourseDetailsForm;
