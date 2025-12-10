
import { Link } from "react-router-dom";
import {
    FiTarget,
    FiBookOpen,
    FiTrendingUp,
    FiAward,
    FiCalendar,
} from "react-icons/fi";
import { weeklyTasks } from "../lib/dummyData";

const MyJourney = () => {
    const completedTasks = weeklyTasks.filter((t) => t.completed).length;
    const weeklyProgress = Math.round(
        (completedTasks / weeklyTasks.length) * 100
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">

            <main className="flex-1">
                {/* Header */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl font-bold mb-4">My Journey</h1>
                            <p className="text-xl text-gray-500">
                                Track your progress and celebrate your wins
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-5xl mx-auto space-y-10">

                        {/* Current Phase */}
                        <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <FiTarget className="w-8 h-8 text-white" />
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div>
                                        <span className="px-3 py-1 bg-white/20 rounded text-sm">
                                            Current Phase
                                        </span>
                                        <h2 className="text-3xl font-bold mt-3 mb-2">
                                            Phase 1 – Awareness & Assessment
                                        </h2>
                                        <p className="opacity-90">
                                            You're building foundational understanding of your child's needs and learning how to observe patterns effectively.
                                        </p>
                                    </div>

                                    <button className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300">
                                        See What to Do This Week
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress Cards */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* Course Progress */}
                            <div className="p-6 border rounded-xl bg-white shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <FiBookOpen className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <FiTrendingUp className="w-5 h-5 text-green-500" />
                                </div>

                                <p className="text-sm text-gray-500 mb-1">Courses Progress</p>
                                <p className="text-3xl font-bold">3 / 6</p>
                                <p className="text-xs text-gray-400 mt-2">Courses started</p>
                            </div>

                            {/* Lessons Completed */}
                            <div className="p-6 border rounded-xl bg-white shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                        <FiAward className="w-6 h-6 text-green-600" />
                                    </div>
                                    <FiTrendingUp className="w-5 h-5 text-green-500" />
                                </div>

                                <p className="text-sm text-gray-500 mb-1">Lessons Completed</p>
                                <p className="text-3xl font-bold">24</p>
                                <p className="text-xs text-gray-400 mt-2">Total lessons watched</p>
                            </div>

                            {/* Badges */}
                            <div className="p-6 border rounded-xl bg-white shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                                        <FiAward className="w-6 h-6 text-pink-600" />
                                    </div>

                                    <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded">
                                        New!
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mb-1">Badges Earned</p>
                                <p className="text-3xl font-bold">2</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Consistency Star, Quick Starter
                                </p>
                            </div>
                        </div>

                        {/* Weekly Tasks */}
                        <div className="p-8 border rounded-xl bg-white shadow-sm">
                            <div className="space-y-6">

                                {/* Progress bar */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-2xl font-bold">Weekly Tasks Checklist</h2>
                                        <span className="text-sm font-medium">
                                            {completedTasks} / {weeklyTasks.length} completed
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-gray-200 rounded">
                                        <div
                                            className="h-2 bg-indigo-600 rounded"
                                            style={{ width: `${weeklyProgress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Tasks */}
                                <div className="space-y-4">
                                    {weeklyTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                className="mt-1 w-4 h-4"
                                                readOnly
                                            />
                                            <span
                                                className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""
                                                    }`}
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Events */}
                        <div className="p-8 border rounded-xl bg-white shadow-sm space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <FiCalendar className="w-6 h-6 text-indigo-600" />
                                Upcoming Events & Sessions
                            </h2>

                            <div className="space-y-4">
                                {/* Event 1 */}
                                <div className="flex gap-4 p-4 rounded-lg bg-gray-100">
                                    <div className="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-lg p-3 min-w-[60px]">
                                        <span className="text-2xl font-bold">15</span>
                                        <span className="text-xs">DEC</span>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">
                                            Live Q&A: Understanding ADHD
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            With Dr. Pragya Goel • 7:00 PM IST
                                        </p>
                                        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
                                            Add to Calendar
                                        </button>
                                    </div>
                                </div>

                                {/* Event 2 */}
                                <div className="flex gap-4 p-4 rounded-lg bg-gray-100">
                                    <div className="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-lg p-3 min-w-[60px]">
                                        <span className="text-2xl font-bold">22</span>
                                        <span className="text-xs">DEC</span>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">Parent Support Circle</h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Monthly community meetup • 6:00 PM IST
                                        </p>
                                        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
                                            Add to Calendar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="p-8 bg-gray-100 rounded-xl text-center shadow-sm">
                            <h3 className="text-2xl font-bold mb-3">
                                Keep Going! You're Making Progress
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Every small step counts. Check out your next recommended course.
                            </p>
                            <Link to="/courses">
                                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                    Browse More Courses
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyJourney;
