import { useState } from "react";
import {
    FaFilePdf,
    FaVideo,
    FaCheckSquare,
    FaCalendarAlt,
    FaDownload,
    FaPlay,
} from "react-icons/fa";
import { freeResources } from "../lib/dummyData";
const getResourceLink = (resource) => {
    if (resource.type === "Behaviour") {
        return "https://manovaidya.in/patientsform.php";
    }
    return resource.url;
};

const Resources = () => {
    const [typeFilter, setTypeFilter] = useState("All");

    const resourceTypes = ["All", "Mini-course", "PDF", "Webinar"];

    const filteredResources = freeResources.filter(
        (r) => typeFilter === "All" || r.type === typeFilter
    );

    const getIcon = (type) => {
        switch (type) {
            case "Mini-course":
                return <FaVideo className="w-8 h-8 text-blue-600" />;
            case "PDF":
                return <FaFilePdf className="w-8 h-8 text-blue-600" />;
            case "Webinar":
                return <FaCalendarAlt className="w-8 h-8 text-blue-600" />;
            default:
                return <FaCheckSquare className="w-8 h-8 text-blue-600" />;
        }
    };

    const getButtonText = (type) => {
        switch (type) {
            case "Mini-course":
                return "Start Now";
            case "PDF":
                return "Download";
            case "Webinar":
                return "Watch Recording";
            default:
                return "View";
        }
    };

    const getButtonIcon = (type) => {
        switch (type) {
            case "Mini-course":
                return <FaPlay className="w-4 h-4" />;
            case "PDF":
                return <FaDownload className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1">

                {/* HEADER */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block px-4 py-1 bg-green-600 text-white rounded-full mb-4">
                                Free
                            </span>

                            <h1 className="text-5xl font-bold mb-4">
                                Free Resources for Parents
                            </h1>

                            <p className="text-xl text-gray-600">
                                Start here if you are new. These are quick, powerful tools to help you gain clarity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FILTER BAR */}
                <section className="py-8 border-b bg-white sticky top-16 z-40">
                    <div className="w-[90%] mx-auto px-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            {filteredResources.length} resource
                            {filteredResources.length !== 1 ? "s" : ""} available
                        </p>

                        <div className="relative">
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-2 border rounded-lg bg-white shadow-sm"
                            >
                                {resourceTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* RESOURCES GRID */}
                <section className="py-12">
                    <div className="w-[90%] mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredResources.map((resource, index) => (
                                <div
                                    key={resource.id}
                                    className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="space-y-4">

                                        {/* ICON + TYPE */}
                                        <div className="flex items-start justify-between">
                                            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center">
                                                {getIcon(resource.type)}
                                            </div>

                                            <span className="px-3 py-1 text-sm rounded-lg bg-gray-200 text-gray-700">
                                                {resource.type}
                                            </span>
                                        </div>

                                        {/* TITLE */}
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {resource.description}
                                            </p>
                                        </div>

                                        {/* CTA BUTTON → dynamic link */}
                                      <a
    href={getResourceLink(resource)}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
>
    {getButtonIcon(resource.type)}
    {getButtonText(resource.type)}
</a>


                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="p-8 md:p-12 bg-gradient-to-r from-purple-600 to-blue-600 text-center text-white rounded-2xl max-w-4xl mx-auto">
                            <h2 className="text-4xl font-bold mb-4">
                                Ready for Structured Learning?
                            </h2>

                            <p className="text-lg opacity-90 mb-6">
                                Join our comprehensive courses for deeper understanding and step-by-step guidance.
                            </p>

                            <a
                                href="/courses"
                                className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                Explore All Courses
                            </a>
                        </div>
                    </div>
                </section>

            </main>

        </div>
    );
};

export default Resources;
