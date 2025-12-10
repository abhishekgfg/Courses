import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminAuth = localStorage.getItem("adminAuth");
  
  if (!adminAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
