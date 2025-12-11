import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Loader

  if (user) return <Navigate to="/courses" replace />; // Already logged-in → redirect

  return children;
};

export default PublicRoute;
