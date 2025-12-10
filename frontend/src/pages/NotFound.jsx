import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="mb-4 text-5xl font-bold">404</h1>
                <p className="mb-6 text-lg text-gray-500">Oops! Page not found</p>
                <Link
                    to="/"
                    className="text-blue-600 underline hover:text-blue-800 transition"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
