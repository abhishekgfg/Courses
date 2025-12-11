import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./assets/layouts/AdminLayout";
import AdminCourseEditor from "./pages/CourseForm";
import AdminCourses from "./pages/AdminCourses";
import EditCourse from "./pages/EditCourse";
import AdminUsers from "./pages/AdminUsers";


function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} /> <Route path="/login" element={<Login />} />

          {/* Protected Routes with AdminLayout */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout activeTab="dashboard"><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><AdminLayout activeTab="dashboard"><AdminCourseEditor /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/Course" element={<ProtectedRoute><AdminLayout activeTab="courses"><AdminCourses /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/edit-course/:id" element={<ProtectedRoute><AdminLayout activeTab="courses"><EditCourse /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><AdminLayout activeTab="courses"><AdminUsers /></AdminLayout></ProtectedRoute>} />
          
          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
