import { useState } from "react";
import { communityPosts } from "../lib/dummyData";
import { Link } from "react-router-dom";
import {
    FiMessageSquare,
    FiPlus,
    FiStar,
} from "react-icons/fi";

const Community = () => {
    const [topicFilter, setTopicFilter] = useState("All");
    const [sortFilter, setSortFilter] = useState("recent");

    const topics = [
        "All",
        "Autism & Behaviour",
        "ADHD & Focus",
        "School & Academics",
        "Diet & Lifestyle",
        "Parent Emotions & Burnout",
        "Wins & Success Stories",
    ];

    const filteredPosts = communityPosts.filter(
        (post) => topicFilter === "All" || post.topic === topicFilter
    );

    const getPostTypeColor = (type) => {
        switch (type) {
            case "Question":
                return "bg-indigo-600 text-white";
            case "Win":
                return "bg-green-600 text-white";
            case "Doubt":
                return "bg-purple-600 text-white";
            case "Resource":
                return "bg-gray-200 text-gray-700";
            default:
                return "bg-gray-300";
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                {/* Header */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4 max-w-4xl space-y-6">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-4">Parent Community</h1>
                            <p className="text-xl text-gray-600">
                                Ask questions, share wins, and learn from real parents
                            </p>
                        </div>

                        {/* Guidelines Card */}
                        <div className="p-6 rounded-xl border bg-white shadow">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FiStar className="w-5 h-5 text-indigo-600" />
                                Community Guidelines
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="font-medium text-green-600 mb-1">✓ Do's</p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Be respectful and supportive</li>
                                        <li>• Share your experiences</li>
                                        <li>• Ask questions freely</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-medium text-red-600 mb-1">⨉ Don'ts</p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Share medical info</li>
                                        <li>• Give medical advice</li>
                                        <li>• Criticize anyone</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg inline-flex items-center gap-2">
                                <FiPlus className="w-5 h-5" />
                                Create New Post
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <div className="w-[90%] mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Topics */}
                    <aside className="lg:w-64">
                        <div className="p-4 bg-white rounded-xl border shadow space-y-2">
                            <h3 className="font-semibold mb-2">Topics</h3>
                            {topics.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => setTopicFilter(topic)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${topicFilter === topic
                                        ? "bg-indigo-600 text-white"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <div className="flex-1 space-y-6">

                        {/* Count */}
                        <p className="text-sm text-gray-500">
                            {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
                        </p>

                        {/* Posts */}
                        <div className="space-y-4">
                            {filteredPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="p-6 bg-white rounded-xl border shadow hover:shadow-md cursor-pointer"
                                >
                                    {/* Header */}
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPostTypeColor(
                                                post.type
                                            )}`}
                                        >
                                            {post.type}
                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                                            {post.topic}
                                        </span>

                                        {post.hasExpertReply && (
                                            <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">
                                                Expert Reply
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-2 hover:text-indigo-600 transition">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600">{post.preview}</p>

                                    {/* Meta */}
                                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                                        <span>
                                            {post.author} • {post.timeAgo}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiMessageSquare className="w-4 h-4" />
                                            {post.replies} replies
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center">
                            <button className="px-5 py-3 border rounded-lg hover:bg-gray-100">
                                Load More Posts
                            </button>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Community;
