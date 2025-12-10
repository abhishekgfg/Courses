import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ReactPlayer from "react-player";
import { FiCheckCircle, FiMenu, FiX } from "react-icons/fi";
import LessonSectionUI from "./LessonSectionUI";

const CoursePlayer = () => {
  const { slug, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLessonId, setOpenLessonId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  const playerRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        const found = res.data.find((c) => c._id === slug || c.slug === slug);
        setCourse(found);

     if (found?.modules?.length > 0) {
  const allLessons = found.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m._id })) // ✅ Add moduleId
  );

  const lesson = lessonId
    ? allLessons.find((l, i) => `l${i + 1}` === lessonId)
    : allLessons[0];

  setCurrentLesson(lesson);
}

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug, lessonId]);

  useEffect(() => {
    setShowThumbnail(true);
    if (!currentLesson) return;

    const saved = localStorage.getItem(`progress_${currentLesson.youtubeUrl}`);
    setProgress(saved ? parseFloat(saved) : 0);
  }, [currentLesson]);

  const handleProgress = (state) => {
    if (!playerRef.current) return;
    const { played } = state;
    setProgress(played);
    if (currentLesson) {
      localStorage.setItem(`progress_${currentLesson.youtubeUrl}`, played);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/courses">
            <button className="px-5 py-3 bg-indigo-600 text-white rounded-lg">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    );

  const handleLessonClick = (lesson, id) => {
    setCurrentLesson(lesson);
    setOpenLessonId((prev) => (prev === id ? null : id));
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* 📱 MOBILE TOP BAR */}
{/* MOBILE TOP BAR */}
<div className="md:hidden fixed top-16 left-0 w-full bg-white shadow z-30 flex items-center justify-between px-4 py-3">
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 rounded-md border border-gray-300 active:scale-95"
  >
    {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
  </button>

  <h2 className="text-[8px] md:text-sm font-medium truncate w-full text-center">
  {course?.courseTitle || "Lessons"}
</h2>


  <div className="w-8" /> {/* placeholder to balance flex */}
</div>

{/* LEFT SIDEBAR */}
<div
  className={`
    w-80 bg-white border-r flex flex-col z-10
    fixed top-20 md:top-0 left-0
    md:relative md:translate-x-0
    h-screen overflow-y-auto
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
>

  {/* Close button (mobile) */}
  <div className="md:hidden p-4 flex justify-end">
    <button onClick={() => setSidebarOpen(false)}>
      <FiX size={26} />
    </button>
  </div>

  {/* Desktop header */}
  <div className="p-6 border-b hidden md:block">
    <Link to="/courses" className="text-sm text-gray-500 hover:underline">
      ← Back to course
    </Link>
    <h2 className="text-2xl font-bold mt-4">{course?.courseTitle}</h2>
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-600 mb-1">
        Progress {Math.round(progress * 100)}%
      </p>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-400"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  </div>

  {/* Modules */}
  <div className="flex-1 p-6 space-y-6 pt-6 md:pt-0">
    {course?.modules.map((mod, i) => (
      <div key={i}>
        <h3 className="font-bold mb-2">{mod.title}</h3>
        <ul className="space-y-2">
          {mod.lessons.map((lesson, j) => {
            const id = `${i}-${j}`;
            const isActive = currentLesson === lesson;
            const isOpen = openLessonId === id;

            return (
              <li key={j}>
                <div
                  onClick={() => {
                    handleLessonClick(lesson, id);
                    setSidebarOpen(false); // close sidebar on mobile after click
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    isActive ? "bg-purple-300 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    {lesson.thumbnail ? (
                      <img
                        src={`http://localhost:5000/uploads/${lesson.thumbnail}`}
                        className="w-14 h-10 object-cover rounded-md shadow-sm flex-shrink-0"
                        alt=""
                      />
                    ) : (
                      <div className="w-14 h-10 bg-gray-200 rounded-md flex-shrink-0" />
                    )}

                    <div className="flex flex-col justify-center leading-tight w-full">
                      <span
                        className={`text-[15px] font-semibold ${
                          isActive ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {lesson.name}
                      </span>

                      {lesson.duration && (
                        <p
                          className={`text-xs mt-0.5 ${
                            isActive ? "text-purple-100" : "text-gray-500"
                          }`}
                        >
                          {lesson.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {lesson.points?.length > 0 && (
                  <div
                    className={`transition-all duration-300 overflow-hidden pl-7 ${
                      isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1">
                      {lesson.points.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <FiCheckCircle className="text-green-600 mt-1" />
                          <span className="text-sm">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
</div>


      {/* RIGHT CONTENT */}
      <div className="flex-1 p-4 md:p-6 md:ml-0 mt-14 md:mt-0">
        {currentLesson ? (
          <>
            {/* VIDEO WRAPPER */}
            <div
              className="relative rounded-lg overflow-hidden shadow mb-4 md:h-[70vh] h-[35vh]"
              style={{ width: "100%" }}
            >
              {showThumbnail && currentLesson.thumbnail && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setShowThumbnail(false)}
                >
                  <img
                    src={`http://localhost:5000/uploads/${currentLesson.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt="Thumbnail"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white/80 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-purple-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {!showThumbnail && (
                <>
                  {currentLesson.youtubeUrl?.includes("<iframe") ? (
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{
                        __html: currentLesson.youtubeUrl.replace(
                          /<iframe/,
                          `<iframe width="100%" height="100%" style="width:100%;height:100%;border:0;"`
                        ),
                      }}
                    />
                  ) : (
                    <ReactPlayer
                      ref={playerRef}
                      url={currentLesson.youtubeUrl}
                      playing
                      controls
                      width="100%"
                      height="100%"
                      onProgress={handleProgress}
                      progressInterval={400}
                    />
                  )}
                </>
              )}
            </div>

            <div className="w-full h-2 bg-gray-300 rounded overflow-hidden mb-4">
              <div
                className="h-full bg-green-600"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <h2 className="text-2xl font-bold mb-2">{currentLesson.name}</h2>

            {currentLesson.duration && (
              <p className="text-gray-500 mb-4">
                Duration: {currentLesson.duration}
              </p>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">Select a lesson to start</div>
        )}

<LessonSectionUI moduleId={currentLesson?.moduleId} />

      </div>
    </div>
  );
};

export default CoursePlayer;
