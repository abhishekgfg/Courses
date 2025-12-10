import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import CourseCard from "../components/course/CourseCard";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMessageSquare } from "react-icons/fi";
import { TfiQuoteLeft } from "react-icons/tfi";
import { courses, experts, testimonials } from "../lib/dummyData";
import FeaturedCoursesSection from "./FeaturedCoursesSection";

const Home = () => {
    const featuredCourses = courses.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <HeroSection />
                <HowItWorksSection />
                {/* Featured Courses */}
              <FeaturedCoursesSection />


                {/* Community Highlight */}
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4 max-w-4xl">

                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-indigo-100 text-indigo-600">
                                Join the Community
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                You’re Not Alone in This Journey
                            </h2>
                            <p className="text-xl text-gray-600">
                                Connect with other parents who truly understand
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow space-y-6">

                            {/* Cards */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <FiMessageSquare className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="font-medium mb-1">How to handle meltdowns at school?</p>
                                        <p className="text-sm text-gray-500">12 replies including expert response</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <FiMessageSquare className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="font-medium mb-1">Anyone tried diet changes for ADHD?</p>
                                        <p className="text-sm text-gray-500">15 replies</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <FiMessageSquare className="w-6 h-6 text-green-600 mt-1" />
                                    <div>
                                        <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs mb-1">
                                            Win
                                        </span>
                                        <p className="font-medium mb-1">He completed homework without a fight!</p>
                                        <p className="text-sm text-gray-500">8 celebrating replies</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center pt-4">
                                <Link to="/auth">
                                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                                        Join the Parent Community (Free)
                                    </button>
                                </Link>
                            </div>

                        </div>

                    </div>
                </section>

                {/* About Experts */}
                <section className="py-20">
                    <div className="container mx-auto px-4">

                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Your Guides</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Doctors who truly understand your challenges
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {experts.map((expert, index) => (
                                <div key={expert.id} className="p-8 rounded-xl shadow bg-white">
                                    <div className="flex flex-col items-center text-center space-y-4">

                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                                            <img src={expert.image} className="w-full h-full object-cover" />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold">{expert.name}</h3>
                                            <p className="text-gray-500">{expert.designation}</p>
                                        </div>

                                        <ul className="space-y-2 text-sm text-left w-full">
                                            {expert.expertise.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-indigo-600 mt-1">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">

                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Stories From Parents Like You
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Real parents. Real progress.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((item, index) => (
                                <div key={item.id} className="p-6 bg-white rounded-xl shadow">
                                    <TfiQuoteLeft className="w-8 h-8 text-indigo-600 mb-4" />
                                    <p className="italic mb-4">"{item.text}"</p>

                                    <div className="border-t pt-3">
                                        <p className="font-medium">{item.author}</p>
                                        <p className="text-xs text-gray-500">{item.course}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20">
                    <div className="container mx-auto px-4">

                        <div className="p-10 rounded-xl bg-purple-600 text-white text-center max-w-7xl mx-auto space-y-6">

                            <h2 className="text-4xl md:text-5xl font-bold">
                                Ready to Start Your Journey?
                            </h2>

                            <p className="text-xl opacity-90">
                                Join hundreds of Indian parents finding clarity and confidence
                            </p>

                            <Link to="/auth">
                                <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium inline-flex items-center gap-2">
                                    Get Started Free Today
                                    <FiArrowRight />
                                </button>
                            </Link>

                            <p className="text-sm opacity-80 mt-2">
                                No credit card required • Learn in 2 minutes
                            </p>

                        </div>

                    </div>
                </section>

            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Home;
