// src/pages/AdminCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiBookOpen,
  FiEye,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axiosInstance.delete(`/admin/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete course");
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.courseTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FiBookOpen className="text-blue-600" />
          Courses Management
        </h1>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2"
          onClick={() => navigate("/admin/courses")}
        >
          <FiPlus className="text-xl" /> Add New Course
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl"
        />
      </div>

      {/* Loading */}
      {loading && <div className="text-center py-10">Loading...</div>}

      {/* Table */}
      {!loading && filteredCourses.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Disease</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Access</th>
                <th className="p-4 text-left">Modules</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="p-4 font-medium">{course.courseTitle}</td>
                  <td className="p-4">{course.disease}</td>
                  <td className="p-4">{course.type}</td>
                  <td className="p-4">
                    {course.access === "Paid" ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Free
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                    >
                      <FiEye /> {course.modules.length} Modules
                    </button>
                  </td>

                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiEdit2 /> Edit
                    </button>

                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ----------------------------- */}
      {/* COURSE DETAILS MODAL IN SAME FILE */}
      {/* ----------------------------- */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedCourse.courseTitle}
              </h2>
              <button onClick={() => setSelectedCourse(null)}>
                <FiX className="text-2xl text-gray-500 hover:text-black" />
              </button>
            </div>

            {/* Thumbnail */}
            {selectedCourse.thumbnail && (
              <img
                src={`http://localhost:5000/uploads/${selectedCourse.thumbnail}`}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold">Disease:</p>
                <p>{selectedCourse.disease}</p>
              </div>

              <div>
                <p className="font-semibold">Type:</p>
                <p>{selectedCourse.type}</p>
              </div>

              <div>
                <p className="font-semibold">Access:</p>
                <p>{selectedCourse.access}</p>
              </div>

              <div>
                <p className="font-semibold">Total Modules:</p>
                <p>{selectedCourse.modules.length}</p>
              </div>
            </div>

            {/* Description */}
            {selectedCourse.courseDescription && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Description</h3>
                <p>{selectedCourse.courseDescription}</p>
              </div>
            )}

            {/* You Will Learn */}
            {selectedCourse.youWillLearn?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">You Will Learn</h3>
                <ul className="list-disc ml-6">
                  {selectedCourse.youWillLearn.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modules */}
            <div>
              <h3 className="text-lg font-bold mb-3">Modules</h3>

              {selectedCourse.modules.map((m, i) => (
                <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
                  <h4 className="text-lg font-semibold mb-2">
                    {i + 1}. {m.title}
                  </h4>

                  {m.lessons?.map((lesson, idx) => (
                    <div key={idx} className="ml-4 mb-3">
                      <p className="font-semibold">
                        {lesson.name} ({lesson.type})
                      </p>

                      {lesson.youtubeUrl && (
                        <p className="text-blue-600 text-sm">
                          Video URL: {lesson.youtubeUrl}
                        </p>
                      )}

                      {lesson.points?.length > 0 && (
                        <ul className="list-disc ml-6 text-sm">
                          {lesson.points.map((p, pi) => (
                            <li key={pi}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
