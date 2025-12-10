import { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            if (email && password) {
                window.location.href = "/my-courses";
            } else {
                setError("Please enter both email and password");
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            if (email && password && name) {
                window.location.href = "/my-courses";
            } else {
                setError("Please fill all fields");
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500" />
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-xl leading-none">Manovaidya</span>
                            <span className="text-xs text-gray-600">Parent Academy</span>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Join our supportive parent community</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">

                    <div className="flex mb-6 border-b">
                        <button
                            className={`flex-1 py-2 text-center ${tab === "login" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"
                                }`}
                            onClick={() => setTab("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-2 text-center ${tab === "signup" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"
                                }`}
                            onClick={() => setTab("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="p-3 mb-4 rounded-lg bg-red-100 border border-red-300 flex items-center gap-2 text-sm text-red-600">
                            <FiAlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {tab === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded-lg mt-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button className="text-sm text-indigo-600 hover:underline float-right">
                                Forgot password?
                            </button>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </button>
                        </form>
                    )}

                    {tab === "signup" && (
                        <form onSubmit={handleSignup} className="space-y-4">

                            <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg mt-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded-lg mt-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <p className="text-xs text-gray-600">
                                By continuing you agree to our{" "}
                                <span className="text-indigo-600 underline cursor-pointer">
                                    Terms & Privacy Policy
                                </span>.
                            </p>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Create Account"}
                            </button>

                        </form>
                    )}

                    <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center">
                        <p className="text-sm text-gray-700">
                            ✨ Start with our <span className="font-semibold">Free Parent Clarity Course</span>
                        </p>
                    </div>

                </div>

                <div className="text-center mt-6">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Auth;
