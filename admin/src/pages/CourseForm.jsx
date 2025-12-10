import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import CourseDetailsForm from "./CourseDetailsForm ";

export default function CourseForm() {
  const [moduleName, setModuleName] = useState("");
  const [disease, setDisease] = useState("");
  const [courseType, setCourseType] = useState("");
  const [access, setAccess] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [totalModules, setTotalModules] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [bottomFieldText, setBottomFieldText] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [youWillLearn, setYouWillLearn] = useState([""]);
  const [modules, setModules] = useState([
    { title: "", lessons: [{ name: "", type: "Video", duration: "", thumbnail: null, youtubeUrl: "", points: [""] }] }
  ]);

  // ---------- Handlers ----------
  const handleAddModule = () => setModules([...modules, { title: "", lessons: [{ name: "", type: "Video", duration: "", thumbnail: null, youtubeUrl: "", points: [""] }] }]);
  const handleRemoveModule = (i) => setModules(modules.filter((_, idx) => idx !== i));
  const handleAddLesson = (mIdx) => {
    const newModules = [...modules];
    newModules[mIdx].lessons.push({ name: "", type: "Video", duration: "", thumbnail: null, youtubeUrl: "", points: [""] });
    setModules(newModules);
  };
  const handleRemoveLesson = (mIdx, lIdx) => {
    const newModules = [...modules];
    newModules[mIdx].lessons.splice(lIdx, 1);
    setModules(newModules);
  };
  const handleAddPoint = (mIdx, lIdx) => {
    const newModules = [...modules];
    newModules[mIdx].lessons[lIdx].points.push("");
    setModules(newModules);
  };
  const handleRemovePoint = (mIdx, lIdx, pIdx) => {
    const newModules = [...modules];
    newModules[mIdx].lessons[lIdx].points.splice(pIdx, 1);
    setModules(newModules);
  };
  const handleYouWillLearnChange = (val, idx) => {
    const copy = [...youWillLearn];
    copy[idx] = val;
    setYouWillLearn(copy);
  };
  const handleAddYouWillLearn = () => setYouWillLearn([...youWillLearn, ""]);
  const handleRemoveYouWillLearn = (idx) => setYouWillLearn(youWillLearn.filter((_, i) => i !== idx));

  // ---------- Submit ----------
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("moduleName", moduleName);
      formData.append("disease", disease);
      formData.append("type", courseType);
      formData.append("access", access);
      formData.append("courseTitle", courseTitle);
      formData.append("courseDescription", courseDescription);
      formData.append("totalModules", totalModules);
      formData.append("totalTime", totalTime);
      formData.append("bottomFieldText", bottomFieldText);
      if (courseThumbnail) formData.append("thumbnail", courseThumbnail);
      formData.append("youWillLearn", JSON.stringify(youWillLearn));
      formData.append("modules", JSON.stringify(modules));

      // Append all lesson thumbnails in order
      modules.forEach((mod) =>
        mod.lessons.forEach((lesson) => {
          if (lesson.thumbnail) formData.append("lessonThumbnails", lesson.thumbnail);
        })
      );

      const res = await axiosInstance.post("/admin/courses", formData);
      alert("Course created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error creating course!");
    }
  };

  return (
    <div className="p-6 space-y-6">
    
      <div className="border p-4 rounded space-y-4">
        
        <h2 className="font-semibold text-lg">Module Info</h2>
        <input placeholder="Module Name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="border p-2 w-full rounded" />
        <div className="flex gap-2">
          <input placeholder="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} className="border p-2 rounded w-1/2" />
          <select value={courseType} onChange={(e) => setCourseType(e.target.value)} className="border p-2 rounded w-1/2">
            <option value="">Select Type</option>
            <option value="Intro">Intro</option>
            <option value="Deep-dive">Deep-dive</option>
            <option value="Protocols">Protocols</option>
          </select>
        </div>
        <div className="flex gap-2">
          <select value={access} onChange={(e) => setAccess(e.target.value)} className="border p-2 rounded w-1/2">
            <option value="">Select Access</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          <input placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="border p-2 rounded w-1/2" />
        </div>
        <textarea placeholder="Course Description" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="border p-2 w-full rounded" />
        <div className="flex gap-2">
          <input placeholder="Total Modules" value={totalModules} onChange={(e) => setTotalModules(e.target.value)} className="border p-2 rounded w-1/2" />
          <input placeholder="Total Time" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} className="border p-2 rounded w-1/2" />
        </div>

        <div>
          <h3 className="font-semibold">You Will Learn</h3>
          {youWillLearn.map((point, idx) => (
            <div key={idx} className="flex gap-2 mt-2">
              <input value={point} onChange={(e) => handleYouWillLearnChange(e.target.value, idx)} placeholder="Point" className="border p-2 rounded flex-1" />
              <button onClick={() => handleRemoveYouWillLearn(idx)} className="bg-red-500 text-white px-2 rounded">x</button>
            </div>
          ))}
          <button onClick={handleAddYouWillLearn} className="bg-purple-600 text-white px-3 py-1 rounded mt-2">+ Add Point</button>
        </div>

        <input placeholder="Bottom Field Text" value={bottomFieldText} onChange={(e) => setBottomFieldText(e.target.value)} className="border p-2 w-full rounded" />
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-semibold text-lg">Course Thumbnail</h2>
        <input type="file" onChange={(e) => setCourseThumbnail(e.target.files[0])} className="mt-2" />
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Modules & Lessons</h2>
        {modules.map((mod, mIdx) => (
          <div key={mIdx} className="border p-4 rounded space-y-4">
            <div className="flex gap-2 items-center">
              <input value={mod.title} onChange={(e) => { const copy = [...modules]; copy[mIdx].title = e.target.value; setModules(copy); }} placeholder="Module Title" className="border p-2 w-full rounded" />
              <button onClick={() => handleRemoveModule(mIdx)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
            </div>

            {mod.lessons.map((lesson, lIdx) => (
              <div key={lIdx} className="border p-3 rounded space-y-2">
                <div className="flex gap-2">
                  <input value={lesson.name} onChange={(e) => { const copy = [...modules]; copy[mIdx].lessons[lIdx].name = e.target.value; setModules(copy); }} placeholder="Lesson Name" className="border p-2 rounded flex-1" />
                  <select value={lesson.type} onChange={(e) => { const copy = [...modules]; copy[mIdx].lessons[lIdx].type = e.target.value; setModules(copy); }} className="border p-2 rounded w-1/4">
                    <option>Video</option>
                    <option>Quiz</option>
                  </select>
                  <input value={lesson.duration} onChange={(e) => { const copy = [...modules]; copy[mIdx].lessons[lIdx].duration = e.target.value; setModules(copy); }} placeholder="Duration" className="border p-2 rounded w-1/4" />
                  <button onClick={() => handleRemoveLesson(mIdx, lIdx)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                </div>

                <input type="file" onChange={(e) => { const copy = [...modules]; copy[mIdx].lessons[lIdx].thumbnail = e.target.files[0]; setModules(copy); }} className="border p-2 w-full rounded" />
                <input
  placeholder="YouTube Iframe Embed Code"
  value={lesson.youtubeUrl}
  onChange={(e) => {
    const copy = [...modules];
    copy[mIdx].lessons[lIdx].youtubeUrl = e.target.value;
    setModules(copy);
  }}
  className="border p-2 w-full rounded"
/>


                {lesson.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex gap-2 mt-1">
                    <input value={point} onChange={(e) => { const copy = [...modules]; copy[mIdx].lessons[lIdx].points[pIdx] = e.target.value; setModules(copy); }} placeholder={`Point ${pIdx + 1}`} className="border p-2 w-full rounded" />
                    <button onClick={() => handleRemovePoint(mIdx, lIdx, pIdx)} className="bg-red-500 text-white px-2 rounded">x</button>
                  </div>
                ))}
                <button onClick={() => handleAddPoint(mIdx, lIdx)} className="bg-green-600 text-white px-3 py-1 rounded mt-2">+ Add Point</button>
              </div>
            ))}

            <button onClick={() => handleAddLesson(mIdx)} className="bg-purple-600 text-white px-3 py-1 rounded mt-2">+ Add Lesson</button>
          </div>
        ))}

        <button onClick={handleAddModule} className="bg-purple-700 text-white px-4 py-2 rounded">+ Add Module</button>
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded mt-4">Save Course</button>
      <CourseDetailsForm/>
    </div>
  );
}
