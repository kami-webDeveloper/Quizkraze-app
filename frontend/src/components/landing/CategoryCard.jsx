import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const icons = {
  "Professional & Educational": (
    <BriefcaseIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
  ),
  "General Knowledge": (
    <GlobeAltIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
  ),
  "Academic & Knowledge-Based": (
    <AcademicCapIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
  ),
};

export default function CategoryCard({ name, description }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start justify-between p-6 transition-colors duration-300 bg-white border shadow cursor-pointer dark:bg-gray-900 border-slate-200 dark:border-gray-700 hover:shadow-md rounded-2xl"
      onClick={() => navigate(`/quizzes?category=${encodeURIComponent(name)}`)}
    >
      <div className="mb-4">{icons[name]}</div>
      <h3 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
