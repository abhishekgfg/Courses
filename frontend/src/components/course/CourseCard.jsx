// import { Link } from "react-router-dom";
// import { FiClock, FiBookOpen } from "react-icons/fi";
// import TubnailImg from "../../assets/dr-ankush.jpg";

// const CourseCard = ({
//     slug,
//     title,
//     shortDescription,
//     category,
//     level,
//     isFree,
//     duration,
//     moduleCount,
//     thumbnail,
//     enrolled = false,
//     progress = 0,
// }) => {
//     return (
//         <div className=" group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition border border-gray-200">

//             {/* Thumbnail */}
//             <div className="relative h-[300px] overflow-hidden bg-gray-100">
//                 <img
//                     src={TubnailImg}
//                     alt={title}
//                     className="w-full h-full object-bottom group-hover:scale-105 transition"
//                 />

//                 {/* Badges */}
//                 <div className="absolute top-4 left-4 flex gap-2">

//                     {/* FREE / PREMIUM */}
//                     <span
//                         className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${isFree ? "bg-green-500" : "bg-purple-600"
//                             }`}
//                     >
//                         {isFree ? "FREE" : "PREMIUM"}
//                     </span>

//                     {/* Category badge */}
//                     <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
//                         {category}
//                     </span>
//                 </div>
//             </div>

//             {/* CONTENT */}
//             <div className="p-6 space-y-4">

//                 {/* Level Badge */}
//                 <div>
//                     <span className="inline-block px-3 py-1 rounded-full border border-gray-300 text-xs text-gray-600">
//                         {level}
//                     </span>
//                 </div>

//                 {/* Title + Description */}
//                 <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition">
//                     {title}
//                 </h3>

//                 <p className="text-sm text-gray-600 line-clamp-2">
//                     {shortDescription}
//                 </p>

//                 {/* Meta Info */}
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">

//                     <div className="flex items-center gap-1">
//                         <FiBookOpen className="w-4 h-4" />
//                         <span>{moduleCount} modules</span>
//                     </div>

//                     <div className="flex items-center gap-1">
//                         <FiClock className="w-4 h-4" />
//                         <span>{duration}</span>
//                     </div>
//                 </div>

//                 {/* Progress bar */}
//                 {enrolled && (
//                     <div className="mt-4 space-y-2">
//                         <div className="flex justify-between text-sm">
//                             <span className="text-gray-500">Progress</span>
//                             <span className="font-medium">{progress}%</span>
//                         </div>

//                         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                                 className="h-full bg-indigo-600 transition-all"
//                                 style={{ width: `${progress}%` }}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* CTA Button */}
//                 <Link to={`/courses/${slug}`}>
//                     <button
//                         className={`w-full mt-4 py-3 rounded-lg font-medium transition ${enrolled
//                             ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                             : "border border-gray-300 text-gray-700 hover:bg-gray-100"
//                             }`}
//                     >
//                         {enrolled ? "Continue Course" : "View Details"}
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default CourseCard;


import { Link } from "react-router-dom";
import { FiClock, FiBookOpen } from "react-icons/fi";
import DefaultThumb from "../../assets/dr-ankush.jpg";

const CourseCard = ({
    slug,
    title,
    shortDescription,
    category,
    level,
    isFree,
    duration,
    moduleCount,
    thumbnail,
    enrolled = false,
    progress = 0,
}) => {
    return (
       <div className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition border border-gray-200">

    {/* Thumbnail */}
    <div className="relative h-[200px] overflow-hidden bg-gray-100">
        <img
            src={thumbnail ? `http://localhost:5000/uploads/${thumbnail}` : DefaultThumb}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
            <span
                className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${isFree ? "bg-green-500" : "bg-purple-600"}`}
            >
                {isFree ? "FREE" : "Locked"}
            </span>

            {category && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                    {category}
                </span>
            )}
        </div>
    </div>

    {/* Content */}
    <div className="p-4 space-y-3"> {/* reduced padding */}
        {level && (
            <span className="inline-block px-3 py-1 rounded-full border border-gray-300 text-xs text-gray-600">
                {level}
            </span>
        )}

        <h3 className="text-xl font-semibold mb-1 group-hover:text-indigo-600 transition">
            {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
            {shortDescription}
        </p>

        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
                <FiBookOpen className="w-4 h-4" />
                <span>{moduleCount} modules</span>
            </div>

            <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                <span>{duration}</span>
            </div>
        </div>

        {enrolled && (
            <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{progress}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        )}

        {/* CTA Button */}
        <Link to={`/courses/${slug}`}>
            <button
                className={`w-full mt-3 py-2.5 rounded-lg font-medium transition ${
                    enrolled
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
                {enrolled ? "Continue Course" : "View Details"}
            </button>
        </Link>
    </div>
</div>

    );
};

export default CourseCard;
