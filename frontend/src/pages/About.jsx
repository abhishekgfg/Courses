import { experts } from "../lib/dummyData";
import { FiCheckCircle, FiHeart, FiAward, FiUsers } from "react-icons/fi";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1">

                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-indigo-600 text-white rounded-full">
                                About Our Experts
                            </span>

                            <h1 className="text-5xl font-bold mb-4">Meet the Doctors Behind Manovaidya</h1>
                            <p className="text-xl text-gray-600">
                                Experienced professionals dedicated to supporting Indian families
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto p-10 md:p-14 text-center bg-indigo-500 rounded-2xl shadow-lg">
                            <FiHeart className="w-16 h-16 text-white mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                            <p className="text-xl text-indigo-100">
                                To empower Indian parents with evidence-based knowledge and a supportive community.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-12">

                            {experts.map((expert, index) => (
                                <div
                                    key={expert.id}
                                    className="p-8 md:p-12 bg-white rounded-xl shadow-lg border"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                                            <img
                                                src={expert.image}
                                                alt={expert.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <h2 className="text-3xl font-bold">{expert.name}</h2>
                                            <p className="text-lg text-gray-600">{expert.designation}</p>

                                            <ul className="space-y-3">
                                                {expert.expertise.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <FiCheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">

                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Our Approach</h2>
                            <p className="text-xl text-gray-600">
                                Integrating ancient wisdom with modern science
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">

                            <div className="p-6 bg-white rounded-xl shadow-lg text-center border">
                                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                                    <FiAward className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Evidence-Based</h3>
                                <p className="text-gray-600">
                                    All our courses are based on the latest research.
                                </p>
                            </div>

                            <div className="p-6 bg-white rounded-xl shadow-lg text-center border">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <FiHeart className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Compassionate</h3>
                                <p className="text-gray-600">
                                    We provide judgment-free support.
                                </p>
                            </div>

                            <div className="p-6 bg-white rounded-xl shadow-lg text-center border">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                                    <FiUsers className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Community-Focused</h3>
                                <p className="text-gray-600">
                                    Connect with parents who understand your journey.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">

                        <div className="p-10 md:p-14 bg-yellow-200 rounded-2xl text-center max-w-4xl mx-auto shadow-lg">
                            <h2 className="text-4xl font-bold">Have Questions?</h2>
                            <p className="text-xl text-gray-700 mt-3">
                                We're here to help you on your parenting journey
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                                <a href="mailto:support@manovaidya.com">
                                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                                        Email Us
                                    </button>
                                </a>

                                <a href="#" target="_blank">
                                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                                        WhatsApp Support
                                    </button>
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

        </div>
    );
};

export default About;
