// import { useState } from "react";
// import CourseCard from "../components/course/CourseCard";
// import { courses } from "../lib/dummyData";

// const Courses = () => {
//     const [categoryFilter, setCategoryFilter] = useState("All");
//     const [typeFilter, setTypeFilter] = useState("All");
//     const [levelFilter, setLevelFilter] = useState("All");

//     const categories = ["All", "Autism & ADHD", "Behaviour & Emotions", "Parent Mindset", "Teen Mental Health", "Chronic Conditions & Stress"];
//     const types = ["All", "Free", "Premium"];
//     const levels = ["All", "Intro", "Deep-dive", "Protocols"];

//     const filteredCourses = courses.filter((course) => {
//         const matchesCategory = categoryFilter === "All" || course.category === categoryFilter;
//         const matchesType =
//             typeFilter === "All" ||
//             (typeFilter === "Free" && course.isFree) ||
//             (typeFilter === "Premium" && course.isPremium);
//         const matchesLevel = levelFilter === "All" || course.level === levelFilter;

//         return matchesCategory && matchesType && matchesLevel;
//     });

//     const clearFilters = () => {
//         setCategoryFilter("All");
//         setTypeFilter("All");
//         setLevelFilter("All");
//     };

//     return (
//         <div className="min-h-screen flex flex-col">
//             <main className="flex-1">
//                 {/* Header */}
//                 <section className="bg-gray-100 py-16">
//                     <div className="container mx-auto px-4 text-center max-w-3xl">
//                         <h1 className="text-5xl font-bold mb-4">Courses for Parents</h1>
//                         <p className="text-xl text-gray-600">
//                             Learn at your own pace with structured guidance
//                         </p>
//                     </div>
//                 </section>

//                 {/* Filters */}
//                 <section className="py-8 border-b sticky top-16 bg-white z-40 ">
//                     <div className="w-[90%] mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">

//                         <div className="flex flex-col sm:flex-row gap-4 w-full">
//                             {/* Category */}
//                             <select
//                                 value={categoryFilter}
//                                 onChange={(e) => setCategoryFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[200px]"
//                             >
//                                 {categories.map((c) => (
//                                     <option key={c} value={c}>{c}</option>
//                                 ))}
//                             </select>

//                             {/* Type */}
//                             <select
//                                 value={typeFilter}
//                                 onChange={(e) => setTypeFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
//                             >
//                                 {types.map((t) => (
//                                     <option key={t} value={t}>{t}</option>
//                                 ))}
//                             </select>

//                             {/* Level */}
//                             <select
//                                 value={levelFilter}
//                                 onChange={(e) => setLevelFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
//                             >
//                                 {levels.map((l) => (
//                                     <option key={l} value={l}>{l}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {(categoryFilter !== "All" || typeFilter !== "All" || levelFilter !== "All") && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-gray-600 underline"
//                             >
//                                 Clear Filters
//                             </button>
//                         )}
//                     </div>
//                 </section>

//                 {/* Course Grid */}
//                 <section className="py-12">
//                     <div className="w-[90%] mx-auto px-4">

//                         {filteredCourses.length > 0 ? (
//                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {filteredCourses.map((course, index) => (
//                                     <div key={course.id} style={{ animationDelay: `${index * 0.05}s` }}>
//                                         <CourseCard {...course} />
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-20">
//                                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
//                                     <span className="text-4xl">📚</span>
//                                 </div>
//                                 <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
//                                 <p className="text-gray-500 mb-6">
//                                     Try adjusting your filters to see more courses
//                                 </p>
//                                 <button
//                                     onClick={clearFilters}
//                                     className="px-6 py-3 border rounded-lg hover:bg-gray-100"
//                                 >
//                                     Clear Filters
//                                 </button>
//                             </div>
//                         )}

//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Courses;
import { useEffect, useState } from "react";
import CourseCard from "../components/course/CourseCard";
import axiosInstance from "../utils/axiosInstance";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [levelFilter, setLevelFilter] = useState("All");

    // STATIC filter options except Category
    const types = ["All", "Free", "Paid", "Locked" ];
    const levels = ["All", "Intro", "Deep-dive", "Protocols"];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axiosInstance.get("/courses");
                setCourses(res.data);
            } catch (err) {
                console.error("COURSE FETCH ERROR", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // 🔥 Dynamic Category Filter from DB
    const categories = ["All", ...new Set(courses.map(c => c.disease))];

    // Apply Filters
    const filteredCourses = courses.filter((course) => {
        const matchesCategory =
            categoryFilter === "All" || course.disease === categoryFilter;

        const matchesType =
            typeFilter === "All" || course.access === typeFilter;

        const matchesLevel =
            levelFilter === "All" || course.type === levelFilter;

        return matchesCategory && matchesType && matchesLevel;
    });

    const clearFilters = () => {
        setCategoryFilter("All");
        setTypeFilter("All");
        setLevelFilter("All");
    };

    if (loading) return <p className="p-10 text-center">Loading courses...</p>;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">

                {/* 🔵 Hero Section */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h1 className="text-5xl font-bold mb-4">Courses for Parents</h1>
                        <p className="text-xl text-gray-600">
                            Learn at your own pace with structured guidance
                        </p>
                    </div>
                </section>

                {/* 🔵 Filters Section */}
                <section className="py-8 border-b sticky top-16 bg-white z-40">
                    <div className="w-[90%] mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">

                        <div className="flex flex-col sm:flex-row gap-4 w-full">

                            {/* Category Filter (Dynamic) */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="border rounded-lg px-4 py-2 w-full sm:w-[200px]"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            {/* Type Filter */}
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
                            >
                                {types.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>

                            {/* Level Filter */}
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
                            >
                                {levels.map((l) => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>

                        </div>

                        {/* Clear Filters Button */}
                        {(categoryFilter !== "All" ||
                          typeFilter !== "All" ||
                          levelFilter !== "All") && (
                            <button
                                onClick={clearFilters}
                                className="text-gray-600 underline"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </section>

                {/* 🔵 Course Grid */}
                <section className="py-12">
                    <div className="w-[90%] mx-auto px-4">

                        {filteredCourses.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCourses.map((course, index) => (
                                    <div key={course._id}>
                                        <CourseCard
                                            slug={course._id}
                                            title={course.courseTitle}
                                            shortDescription={course.courseDescription}
                                            category={course.disease}
                                            level={course.type}
                                            isFree={course.access === "Free"}
                                            duration={course.totalTime}
                                            moduleCount={course.totalModules}
                                            thumbnail={course.thumbnail}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl">📚</span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
                                <p className="text-gray-500 mb-6">
                                    Try adjusting your filters to see more courses
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                    </div>
                </section>
            </main>
        </div>
    );
};

export default Courses;
