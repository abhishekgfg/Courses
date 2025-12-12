// import { useParams, Link } from "react-router-dom";
// import {
//     FiCheckCircle,
//     FiClock,
//     FiBookOpen,
//     FiPlay,
//     FiFileText,
//     FiLock,
// } from "react-icons/fi";
// import { courses, experts } from "../lib/dummyData";
// import DR from "../assets/dr-pragya.jpg"

// const CourseDetail = () => {
//     const { slug } = useParams();
//     const course = courses.find((c) => c.slug === slug);
//     const instructor = experts.find((e) => e.name === course?.instructor);

//     if (!course) {
//         return (
//             <div className="min-h-screen flex flex-col">

//                 <div className="flex-1 flex items-center justify-center text-center">
//                     <h1 className="text-2xl font-bold mb-4">Course not found</h1>
//                     <Link to="/courses">
//                         <button className="px-5 py-3 bg-indigo-600 text-white rounded-lg">
//                             Browse Courses
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const enrolled = false;

//     return (
//         <div className="min-h-screen flex flex-col">


//             <main className="flex-1">

//                 {/* Hero */}
//                 <section className="bg-gray-100 py-12">
//                     <div className="w-[90%] mx-auto px-4 grid md:grid-cols-2 gap-12">

//                         {/* Left */}
//                         <div className="space-y-6">
//                             <div className="flex gap-2 flex-wrap">
//                                 <span className={`px-3 py-1 rounded-full text-white text-xs ${course.isFree ? "bg-green-600" : "bg-purple-600"
//                                     }`}>
//                                     {course.isFree ? "FREE" : "PREMIUM"}
//                                 </span>

//                                 <span className="px-3 py-1 rounded-full bg-gray-200 text-xs">
//                                     {course.category}
//                                 </span>

//                                 <span className="px-3 py-1 rounded-full border text-xs">{course.level}</span>
//                             </div>

//                             <h1 className="text-4xl font-bold">{course.title}</h1>

//                             <p className="text-lg text-gray-600">{course.shortDescription}</p>

//                             <div className="space-y-3">
//                                 <h3 className="font-semibold">You will learn:</h3>

//                                 {course.outcomes.map((item, index) => (
//                                     <div key={index} className="flex gap-2 items-start">
//                                         <FiCheckCircle className="w-5 h-5 text-green-600 mt-1" />
//                                         <span>{item}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="flex gap-4 flex-col sm:flex-row">
//                                 {course.isFree ? (
//                                     <Link to={`/courses/${course.slug}/lesson/l1`}>
//                                         <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg">
//                                             Start Free Course
//                                         </button>
//                                     </Link>
//                                 ) : (
//                                     <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
//                                         Enroll Now — ₹{course.price}
//                                     </button>
//                                 )}

//                                 {course.modules.length > 0 && (
//                                     <Link to={`/courses/${course.slug}/lesson/l1`}>
//                                         <button className="px-6 py-3 border rounded-lg flex items-center gap-2">
//                                             <FiPlay />
//                                             Watch Intro Lesson
//                                         </button>
//                                     </Link>
//                                 )}
//                             </div>

//                             <div className="flex gap-4 text-sm text-gray-500">
//                                 <span className="flex items-center gap-1">
//                                     <FiBookOpen />
//                                     {course.moduleCount} modules
//                                 </span>
//                                 <span className="flex items-center gap-1">
//                                     <FiClock />
//                                     {course.duration}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Right */}
//                         <div className="bg-white shadow rounded-xl overflow-hidden">
//                             <img
//                                 src={DR}
//                                 className="w-full h-64 object-cover"
//                             />

//                             <div className="p-6 flex gap-3 items-center">
//                                 <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
//                                     <img src={instructor?.image} className="w-full h-full object-cover" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-500">Instructor</p>
//                                     <p className="font-semibold">{instructor?.name}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Who This Is For */}
//                 <section className="py-16">
//                     <div className="container mx-auto px-4 max-w-4xl">

//                         <h2 className="text-3xl font-bold mb-6 text-center">Who This Is For</h2>

//                         <div className="grid md:grid-cols-2 gap-6">

//                             <div className="p-6 border bg-green-50 rounded-xl">
//                                 <h3 className="font-semibold text-green-600 text-lg mb-3">✓ Perfect for you if…</h3>
//                                 <ul className="text-sm space-y-2">
//                                     <li>• You're a parent dealing with {course.category}</li>
//                                     <li>• You need structured guidance</li>
//                                     <li>• You want real strategies</li>
//                                     <li>• You can give 15–20 mins daily</li>
//                                 </ul>
//                             </div>

//                             <div className="p-6 border bg-gray-100 rounded-xl">
//                                 <h3 className="font-semibold text-lg mb-3">⨉ Not for you if…</h3>
//                                 <ul className="text-sm text-gray-600 space-y-2">
//                                     <li>• You want instant solutions</li>
//                                     <li>• You want to replace therapy</li>
//                                     <li>• You aren’t ready to follow steps</li>
//                                 </ul>
//                             </div>

//                         </div>
//                     </div>
//                 </section>

//                 {/* Curriculum */}
//                 {course.modules.length > 0 && (
//                     <section className="py-16 bg-gray-100">
//                         <div className="container mx-auto px-4 max-w-4xl">

//                             <h2 className="text-3xl font-bold mb-6 text-center">What's Inside</h2>

//                             <div className="space-y-4">
//                                 {course.modules.map((module, mIndex) => (
//                                     <div key={module.id} className="p-5 bg-white border rounded-xl">

//                                         <h3 className="font-bold mb-3">
//                                             Module {mIndex + 1}: {module.title}
//                                         </h3>

//                                         <div className="space-y-3">
//                                             {module.lessons.map((lesson) => (
//                                                 <div
//                                                     key={lesson.id}
//                                                     className="flex justify-between p-3 rounded-lg hover:bg-gray-50"
//                                                 >
//                                                     <div className="flex gap-3 items-center">
//                                                         {lesson.type === "video" ? (
//                                                             <FiPlay className="text-indigo-600" />
//                                                         ) : (
//                                                             <FiFileText className="text-indigo-600" />
//                                                         )}

//                                                         <span>{lesson.title}</span>
//                                                     </div>

//                                                     <div className="flex gap-3 items-center">
//                                                         <span className="text-xs text-gray-500">{lesson.duration}</span>
//                                                         {!enrolled && (
//                                                             <FiLock className="text-gray-400" />
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                     </div>
//                                 ))}
//                             </div>

//                         </div>
//                     </section>
//                 )}

//                 {/* Instructor */}
//                 {instructor && (
//                     <section className="py-16">
//                         <div className="container mx-auto px-4 max-w-4xl">

//                             <h2 className="text-3xl font-bold mb-6 text-center">Your Instructor</h2>

//                             <div className="p-8 bg-white border rounded-xl shadow">

//                                 <div className="flex gap-8 flex-col md:flex-row">

//                                     <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
//                                         <img src={instructor.image} className="w-full h-full object-cover" />
//                                     </div>

//                                     <div className="space-y-4">
//                                         <div>
//                                             <h3 className="text-2xl font-bold">{instructor.name}</h3>
//                                             <p className="text-gray-600">{instructor.designation}</p>
//                                         </div>

//                                         <ul className="space-y-2">
//                                             {instructor.expertise.map((item, i) => (
//                                                 <li key={i} className="flex gap-2 items-start">
//                                                     <FiCheckCircle className="text-indigo-600 mt-1" />
//                                                     {item}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                 </div>

//                             </div>

//                         </div>
//                     </section>
//                 )}

//                 {/* Sticky CTA */}
//                 <div className="sticky bottom-0 bg-white border-t py-4">
//                     <div className="container mx-auto px-4 flex justify-between items-center max-w-4xl">

//                         <div>
//                             <p className="font-semibold">{course.title}</p>
//                             <p className="text-sm text-gray-600">
//                                 {course.isFree ? "Free Course" : `₹${course.price}`}
//                             </p>
//                         </div>

//                         {course.isFree ? (
//                             <Link to={`/courses/${course.slug}/lesson/l1`}>
//                                 <button className="px-6 py-3 bg-green-600 text-white rounded-lg">
//                                     Start Free Course
//                                 </button>
//                             </Link>
//                         ) : (
//                             <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
//                                 Enroll Now
//                             </button>
//                         )}

//                     </div>
//                 </div>

//             </main>

//         </div>
//     );
// };

// export default CourseDetail;




import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  FiCheckCircle,
  FiClock,
  FiBookOpen,
  FiPlay,
  FiFileText,
} from "react-icons/fi";
import DR from "../assets/dr-pragya.jpg";

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLessons, setOpenLessons] = useState({}); // Top-level state for lesson dropdowns
  const [courseDetails, setCourseDetails] = useState(null);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        console.log(res)
        const found = res.data.find((c) => c._id === slug || c.slug === slug);
        setCourse(found || null);
      } catch (err) {
        console.error("COURSE DETAIL ERROR", err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);



  useEffect(() => {
    if (!course?._id) return;

    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `/courses/details/by-course/${course._id}`
        );

        setCourseDetails(res.data);
      } catch (error) {
        console.log("DETAIL FETCH ERROR:", error);
        setCourseDetails(null);
      }
    };

    fetchDetails();
  }, [course]);


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

  // const instructor = {
  //   name: course.instructorName || "Dr. Pragya",
  //   image: DR,
  //   designation: "Clinical Psychologist",
  //   expertise: ["Child Psychology", "Behavior Therapy", "Parent Guidance"],
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 py-12">
          <div className="w-[90%] mx-auto px-4 grid md:grid-cols-2 gap-12">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${course.access === "Free" || "Locked" ? "bg-green-600" : "bg-purple-600"
                    }`}
                >
                  {course.access}
                </span>
                {course.disease && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                    {course.disease}
                  </span>
                )}
                {course.type && (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                    {course.type}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold">{course.courseTitle}</h1>
              <p className="text-lg text-gray-600">{course.courseDescription}</p>

              <div className="space-y-3">
                <h3 className="font-semibold">You will learn:</h3>
                {course.youWillLearn?.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <FiCheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                {course.access === "Free" || "Locked" ? (
                  <Link to={`/courses/${course.slug || course._id}/lesson/l1`}>
                    <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg">
                      Start Free Course
                    </button>
                  </Link>
                ) : (
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
                    Enroll Now — ₹{course.price || "N/A"}
                  </button>
                )}
              </div>

              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FiBookOpen /> {course.totalModules}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock /> {course.totalTime}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-xl overflow-hidden">
              <div className="aspect-video">
                <img
                  src={`http://localhost:5000/uploads/${course.thumbnail}`}
                  alt={course.title || "Course Thumbnail"}
                  className="w-full h-full object-fit"
                />
              </div>
              {course.bottomFieldText && (
                <div className="p-4 border-t">
                  <p className="text-gray-700 text-sm font-medium">
                    <span className="font-semibold">Lead By:</span> {course.bottomFieldText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        {/* Who This Is For */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Who This Is For</h2>

            {!courseDetails ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">

                {/* Perfect For */}
                <div className="p-6 border bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-green-600 text-lg mb-3">✓ Perfect for you if…</h3>
                  <ul className="text-sm space-y-2">
                    {courseDetails.whoThisIsFor?.perfectFor?.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Not For */}
                <div className="p-6 border bg-gray-100 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3">⨉ Not for you if…</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {courseDetails.whoThisIsFor?.notFor?.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
          </div>
        </section>


        {/* Curriculum / Modules */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">What's Inside</h2>
            <div className="space-y-4">
              {course.modules?.map((module, i) => (
                <div key={i} className="p-5 bg-white border rounded-xl">
                  <h3 className="font-bold mb-3">
                    Module {i + 1}: {module.title}
                  </h3>

                  <div className="space-y-3">
                    {module.lessons.map((lesson, l) => {
                      const key = `${i}-${l}`;
                      const isOpen = openLessons[key] || false;

                      return (
                        <div key={l} className="border rounded-lg overflow-hidden">
                          <div
                            className="flex justify-between p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 items-center"
                            onClick={() =>
                              setOpenLessons((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                          >
                            <div className="flex gap-3 items-center">
                              {lesson.type === "Video" ? (
                                <FiPlay className="text-indigo-600" />
                              ) : (
                                <FiFileText className="text-indigo-600" />
                              )}
                              <span className="font-medium">{lesson.name}</span>
                            </div>
                            <span className="text-gray-500">{lesson.duration}</span>
                          </div>

                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 p-3" : "max-h-0"
                              }`}
                          >
                            {lesson.points?.length > 0 ? (
                              <ul className="space-y-2">
                                {lesson.points.map((point, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-2 items-start text-gray-700"
                                  >
                                    <FiCheckCircle className="text-green-600 mt-1" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">No points added</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Instructor</h2>

            {!courseDetails?.instructor ? (
              <p className="text-center text-gray-500">Instructor details not available</p>
            ) : (
              <div className="p-8 bg-white border rounded-xl shadow">
                <div className="flex gap-8 flex-col md:flex-row">

                  {/* Photo */}
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    {courseDetails.instructor.photoPath ? (
                      <img
                        src={`http://localhost:5000/uploads/${courseDetails?.instructor?.photoPath}`}

                        className="w-full h-full object-cover"
                        alt="Instructor"
                      />
                    ) : (
                      <img src={DR} className="w-full h-full object-cover" alt="Default" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      {courseDetails.instructor.name}
                    </h3>

                    <p className="text-gray-600">
                      {courseDetails.instructor.role}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      {courseDetails.instructor.about}
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>
        </section>


      </main>
    </div>
  );
};

export default CourseDetail;
