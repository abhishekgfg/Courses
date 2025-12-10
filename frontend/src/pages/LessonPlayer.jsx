import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiFileText, FiPlay, FiLock } from "react-icons/fi";
import { courses } from "../lib/dummyData";

const LessonPlayer = () => {
    const { slug, lessonId } = useParams();
    const course = courses.find((c) => c.slug === slug);

    const [completedLessons, setCompletedLessons] = useState(["l1", "l2"]);
    const [comment, setComment] = useState("");
    const [tab, setTab] = useState("notes");

    if (!course) return <div>Course not found</div>;

    let currentLesson = null;
    let currentModuleIndex = 0;
    let currentLessonIndex = 0;

    for (let i = 0; i < course.modules.length; i++) {
        for (let j = 0; j < course.modules[i].lessons.length; j++) {
            if (course.modules[i].lessons[j].id === lessonId) {
                currentLesson = course.modules[i].lessons[j];
                currentModuleIndex = i;
                currentLessonIndex = j;
            }
        }
    }

    const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
    const progress = Math.round((completedLessons.length / totalLessons) * 100);
    const isCompleted = completedLessons.includes(lessonId);

    const handleMarkComplete = () => {
        if (!isCompleted) setCompletedLessons([...completedLessons, lessonId]);
    };

    const handlePostQuestion = () => {
        if (!comment.trim()) return;
        alert("Your question has been posted!");
        setComment("");
    };

    let prevLesson = null;
    let nextLesson = null;

    if (currentLessonIndex > 0) {
        prevLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex - 1];
    } else if (currentModuleIndex > 0) {
        const prevMod = course.modules[currentModuleIndex - 1];
        prevLesson = prevMod.lessons[prevMod.lessons.length - 1];
    }

    if (currentLessonIndex < course.modules[currentModuleIndex].lessons.length - 1) {
        nextLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex + 1];
    } else if (currentModuleIndex < course.modules.length - 1) {
        nextLesson = course.modules[currentModuleIndex + 1].lessons[0];
    }

    return (
        <div className="min-h-screen bg-white">

            <div className="flex">
                {/* sidebar */}
                <aside className="w-80 border-r bg-gray-100 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
                    <div className="p-6 border-b">
                        <Link to={`/courses/${slug}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4">
                            <FiChevronLeft />
                            Back to course
                        </Link>

                        <h2 className="font-semibold mb-2">{course.title}</h2>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div className="bg-green-500 h-full rounded" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        {course.modules.map((module, mi) => (
                            <div key={module.id} className="mb-6">
                                <h3 className="font-semibold text-sm mb-2">
                                    Module {mi + 1}: {module.title}
                                </h3>

                                {module.lessons.map((lesson) => (
                                    <Link
                                        key={lesson.id}
                                        to={`/courses/${slug}/lesson/${lesson.id}`}
                                        className={`flex items-center gap-3 p-3 rounded-lg text-sm 
                      ${lesson.id === lessonId ? "bg-indigo-600 text-white" : "hover:bg-white"}`}
                                    >
                                        {completedLessons.includes(lesson.id) ? (
                                            <FiCheckCircle className="text-green-500" />
                                        ) : lesson.type === "video" ? (
                                            <FiPlay />
                                        ) : (
                                            <FiFileText />
                                        )}
                                        {lesson.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* content */}
                <main className="flex-1 p-6 max-w-5xl mx-auto space-y-6">
                    <div className="bg-black aspect-video flex items-center justify-center text-white rounded-lg">
                        <div className="text-center opacity-70">
                            <FiPlay className="w-16 h-16 mx-auto mb-4" />
                            <p>Video player will appear here</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                            <p className="text-sm text-gray-500">{currentLesson.duration}</p>
                        </div>

                        <button
                            onClick={handleMarkComplete}
                            className={`px-4 py-2 rounded-lg border 
                ${isCompleted ? "border-green-500 text-green-600" : "bg-indigo-600 text-white"}`}
                        >
                            {isCompleted ? (
                                <span className="flex items-center gap-2">
                                    <FiCheckCircle /> Completed
                                </span>
                            ) : (
                                "Mark as Complete"
                            )}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex gap-4 border-b pb-2">
                            <button onClick={() => setTab("notes")} className={tab === "notes" ? "font-semibold" : ""}>Key Points</button>
                            <button onClick={() => setTab("downloads")} className={tab === "downloads" ? "font-semibold" : ""}>Downloads</button>
                            <button onClick={() => setTab("homework")} className={tab === "homework" ? "font-semibold" : ""}>Homework</button>
                        </div>

                        {tab === "notes" && (
                            <div className="p-6 bg-gray-50 rounded-xl mt-4">
                                <h3 className="font-semibold mb-4">Key Takeaways</h3>

                                <ul className="space-y-3">
                                    <li>• Understand sensory patterns behind behaviours</li>
                                    <li>• Learn observation techniques</li>
                                    <li>• Small steps create big impact</li>
                                </ul>
                            </div>
                        )}

                        {tab === "downloads" && (
                            <div className="p-6 bg-gray-50 rounded-xl mt-4 space-y-3">
                                <button className="w-full flex items-center gap-2 border px-4 py-2 rounded-lg">
                                    <FiFileText /> Lesson Summary (PDF)
                                </button>
                                <button className="w-full flex items-center gap-2 border px-4 py-2 rounded-lg">
                                    <FiFileText /> Behaviour Tracking Worksheet
                                </button>
                            </div>
                        )}

                        {tab === "homework" && (
                            <div className="p-6 bg-gray-50 rounded-xl mt-4">
                                <ul className="space-y-2">
                                    <li>1. Observe sensory patterns</li>
                                    <li>2. Try calming technique</li>
                                    <li>3. Share your observations</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        {prevLesson ? (
                            <Link to={`/courses/${slug}/lesson/${prevLesson.id}`}>
                                <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                                    <FiChevronLeft /> Previous
                                </button>
                            </Link>
                        ) : <div />}

                        {nextLesson ? (
                            <Link to={`/courses/${slug}/lesson/${nextLesson.id}`}>
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2">
                                    Next <FiChevronRight />
                                </button>
                            </Link>
                        ) : (
                            <Link to="/my-courses">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                                    Complete Course <FiCheckCircle />
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Discussion */}
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-semibold mb-4">Lesson Discussion</h3>

                        <div className="p-4 bg-gray-200 rounded-lg mb-4">
                            This helped me understand my child better!
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg p-3"
                            placeholder="Ask a question..."
                        />

                        <div className="flex justify-end mt-3">
                            <button
                                onClick={handlePostQuestion}
                                disabled={!comment.trim()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Post Question
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default LessonPlayer;
