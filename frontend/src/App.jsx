import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CoursePlayer from "./pages/CoursePlayer";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import MyJourney from "./pages/MyJourney";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";

import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ResetPassword from "./auth/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import LessonSectionUI from "./pages/LessonSectionUI";


const App = () => (
  <AuthProvider>
    <BrowserRouter>
    <ScrollToTop />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login/Signup pages should redirect if already logged-in */}
        <Route path="/auth" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/Forget-Password" element={<ForgotPassword />} />

        {/* Protected pages */}
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:slug" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/courses/:slug/lesson/:lessonId?" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/my-journey" element={<ProtectedRoute><MyJourney /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* <Route path="" element={<ResetPassword />} /> */}
       <Route path="/reset-password" element={<ResetPassword />} />
 <Route path="/about-doctor" element={<ProtectedRoute><About /></ProtectedRoute>} />
 <Route path="/courses/:courseId/lesson/:lessonId" element={<LessonSectionUI />} />


      </Routes>

      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
