import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import CourseCard from "../components/course/CourseCard";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

const FeaturedCoursesSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const res = await axiosInstance.get("/courses?featured=true");
        setFeaturedCourses(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCourses();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Featured Courses...</div>;
  }

  return (
    <section className="py-20">
      <div className="w-[90%] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our most loved parent courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredCourses.map((course, index) => (
            <div key={course._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard
                slug={course._id} // ✅ pass slug here
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

        <div className="text-center">
          <Link to="/courses">
            <button className="px-6 py-3 border rounded-lg hover:bg-gray-100 inline-flex items-center gap-2">
              View All Courses
              <FiArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
