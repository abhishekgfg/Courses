import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CheckCircle, FileText } from "lucide-react";

export default function LessonSectionUI() {
  const { slug } = useParams();

  const [courseDetails, setCourseDetails] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("key");

  // 1️⃣ Fetch Course ID based on slug
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/courses");

        const found = res.data.find(
          (c) => c.slug === slug || c._id === slug
        );

        if (found?._id) {
          setCourseId(found._id);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [slug]);

  // 2️⃣ Fetch Course Details (keyPoints, downloads, actionSteps)
  useEffect(() => {
    if (!courseId) return;

    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `/courses/details/by-course/${courseId}`
        );
        setCourseDetails(res.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [courseId]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  if (!courseDetails)
    return (
      <div className="p-5 text-center text-gray-500">
        No Lesson Details Found
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3">
        <button
          className={`pb-2 ${
            activeTab === "key" ? "border-b-2 border-blue-600 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("key")}
        >
          Key Points
        </button>

        <button
          className={`pb-2 ${
            activeTab === "downloads"
              ? "border-b-2 border-blue-600 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("downloads")}
        >
          Downloads
        </button>

        <button
          className={`pb-2 ${
            activeTab === "homework"
              ? "border-b-2 border-blue-600 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("homework")}
        >
          Homework
        </button>
      </div>

      {/* 1️⃣ KEY POINTS */}
      {activeTab === "key" && (
        <div className="mt-4 space-y-3">
          {courseDetails.keyPoints?.length > 0 ? (
            courseDetails.keyPoints.map((point, i) => (
              <div key={i} className="flex gap-2 items-start">
                <CheckCircle className="text-green-600 mt-1" />
                <span>{point}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No key points added.</p>
          )}
        </div>
      )}

      {/* 2️⃣ DOWNLOADS */}
      {activeTab === "downloads" && (
        <div className="mt-4 space-y-3">
          {courseDetails.downloads?.length > 0 ? (
            courseDetails.downloads.map((file, i) => (
              <a
                key={i}
                href={`http://localhost:5000/uploads/${file.filePath}`}
                download
                className="flex gap-2 items-center text-blue-600 underline"
              >
                <FileText />
                {file.name}
              </a>
            ))
          ) : (
            <p className="text-gray-500">No downloadable files.</p>
          )}
        </div>
      )}

      {/* 3️⃣ HOMEWORK (actionSteps) */}
      {activeTab === "homework" && (
        <div className="mt-4 space-y-3">
          {courseDetails.actionSteps?.length > 0 ? (
            courseDetails.actionSteps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start">
                <CheckCircle className="text-purple-600 mt-1" />
                <span>{step}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No homework/action steps provided.</p>
          )}
        </div>
      )}
    </div>
  );
}
