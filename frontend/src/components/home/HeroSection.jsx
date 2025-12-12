import heroImage from "../../assets/Home.png";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import HowItWorksSection from "./HowItWorksSection";
import CourseCard from "../course/CourseCard";
import { courses } from "../../lib/dummyData";


const HeroSection = () => {
    return (
        <>
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 gradient-primary opacity-5" />

                <div className="w-[90%] mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-6 animate-fade-in">

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full text-sm bg-yellow-200 text-gray-700">
                                    Ayurveda + Psychology
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm bg-yellow-200 text-gray-700">
                                    7+ Years Experience
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Structured Support for Your Child's{" "}
                                <span className="text-indigo-600">Brain & Behaviour</span>
                            </h1>

                            <p className="text-xl text-gray-600">
                                Courses and community for parents of children with Autism, ADHD, learning and emotional difficulties.
                            </p>

                            {/* Points */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Zero-judgment zone for worried parents</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Expert-led courses you can trust</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Safe community & ongoing support</span>
                                </div>
                            </div>

                            {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
  <Link to="/courses" className="w-full sm:w-auto">
    <button
      className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg flex items-center justify-center hover:bg-purple-700 transition"
      type="button"
    >
      Start Free Parent Clarity Course
      <FiArrowRight className="ml-2 w-5 h-5" />
    </button>
  </Link>

  <Link to="/courses" className="w-full sm:w-auto">
    <button
      className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
      type="button"
    >
      Explore All Courses
    </button>
  </Link>
</div>

                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
                            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                                <img
                                    src={heroImage}
                                    alt="Doctor talking to parents in a supportive clinical setting"
                                    className="w-full h-[400px] md:h-[500px] object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                            </div>

                            {/* Trust badge */}
                            <div className="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-card border">
                                <p className="text-sm font-medium text-center">
                                    Trusted by <span className="text-indigo-600 font-semibold">500+</span> Indian parents
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
