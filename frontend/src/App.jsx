import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import MyJourney from "./pages/MyJourney";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import CoursePlayer from "./pages/CoursePlayer";
import CourseDetailsForm from "../../admin/src/pages/CourseDetailsForm ";



const App = () => (

  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetail />} />
      {/* <Route path="/courses/:slug/lesson/:lessonId" element={<LessonPlayer />} /> */}
      <Route path="/resources" element={<Resources />} />
      <Route path="/community" element={<Community />} />
      <Route path="/my-journey" element={<MyJourney />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/courses/:slug/lesson/:lessonId?" element={<CoursePlayer />} />
      <Route path="/courses-details" element={<CourseDetailsForm />} />

    </Routes>
    <Footer />
  </BrowserRouter>


);

export default App;
