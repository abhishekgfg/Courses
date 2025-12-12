import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { FiLock, FiPlayCircle } from "react-icons/fi";

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [watchedCount, setWatchedCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    fetchCourseAndProgress();
  }, [courseId, lessonId]);

  const fetchCourseAndProgress = async () => {
    try {
      const res = await axiosInstance.get(`/courses/${courseId}`);
      const courseData = res.data;
      setCourse(courseData);

      // Get watched lessons count from localStorage
      const watched = JSON.parse(
        localStorage.getItem(`watched_${courseId}`) || "[]"
      );
      setWatchedCount(watched.length);

      // Find current lesson
      let found = null;
      for (let mod of courseData.modules) {
        found = mod.lessons.find(
          (l) => l._id === lessonId || l.name === lessonId
        );
        if (found) {
          setCurrentLesson({ ...found, moduleTitle: mod.title });
          break;
        }
      }

      // Check paywall
      const lessonIndex = watched.length;
      if (
        lessonIndex >= courseData.previewLessons &&
        courseData.access === "Paid"
      ) {
        setShowPaywall(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAsWatched = () => {
    const key = `watched_${courseId}`;
    const watched = JSON.parse(localStorage.getItem(key) || "[]");

    if (!watched.includes(lessonId)) {
      watched.push(lessonId);
      localStorage.setItem(key, JSON.stringify(watched));
      setWatchedCount(watched.length);

      if (
        watched.length >= course?.previewLessons &&
        course?.access === "Paid"
      ) {
        setShowPaywall(true);
      }
    }
  };

  if (!course || !currentLesson) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
        {showPaywall ? (
          // -----------------------------------
          // PAYWALL UI
          // -----------------------------------
          <div className="col-span-3 text-center py-20">
            <FiLock className="text-6xl text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              You've watched {course.previewLessons} free lessons!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock the full course to continue learning
            </p>

            <Link to={`/courses/${course._id}`}>
              <button className="px-8 py-4 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700">
                Enroll Now – Get Full Access
              </button>
            </Link>

            <p className="mt-6 text-gray-500">
              Already enrolled?{" "}
              <Link to="/login" className="text-indigo-600">
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <>
            {/* ----------------------------------- */}
            {/* VIDEO PLAYER SECTION */}
            {/* ----------------------------------- */}
            <div className="lg:col-span-2">
              {currentLesson.youtubeUrl ? (
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                  <iframe
                    src={currentLesson.youtubeUrl}
                    className="w-full h-full"
                    allowFullScreen
                    onLoad={markAsWatched}
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                  <FiPlayCircle className="text-6xl text-gray-400" />
                </div>
              )}

              <h1 className="text-2xl font-bold mt-6">
                {currentLesson.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {currentLesson.points?.join(" • ")}
              </p>

              {/* PROGRESS BOX */}
              <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm">
                  You've watched <strong>{watchedCount}</strong> of{" "}
                  <strong>{course.previewLessons}</strong> free lessons
                </p>

                {watchedCount >= course.previewLessons &&
                  course.access === "Paid" && (
                    <p className="text-orange-600 font-medium mt-2">
                      Next lessons are locked. Enroll to continue!
                    </p>
                  )}
              </div>
            </div>

            {/* ----------------------------------- */}
            {/* SIDEBAR - LESSONS LIST */}
            {/* ----------------------------------- */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg mb-4">Course Content</h3>

              {course.modules.map((mod, i) => (
                <div key={i} className="mb-6">
                  <h4 className="font-semibold text-gray-700">{mod.title}</h4>

                  {mod.lessons.map((les, idx) => {
                    const globalIndex =
                      course.modules
                        .slice(0, i)
                        .reduce(
                          (a, m) => a + m.lessons.length,
                          0
                        ) + idx;

                    const isLocked =
                      course.access === "Paid" &&
                      globalIndex >= course.previewLessons;

                    return (
                      <Link
                        key={les._id}
                        to={`/courses/${course._id}/lesson/${les._id}`}
                        className={`block py-2 px-3 rounded mt-2 flex items-center justify-between ${
                          isLocked
                            ? "text-gray-400"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {isLocked ? <FiLock /> : <FiPlayCircle />}
                          {les.name}
                        </span>

                        {isLocked && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Locked
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonPlayer;
