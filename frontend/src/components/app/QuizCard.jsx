import { EyeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import CategoryBadge from "./CategoryBadge";
import DifficultyBadge from "./DifficultyBadge";

export default function QuizCard({
  title,
  description,
  difficulty,
  category,
  createdBy,
  participants,
  onClick,
  buttonText = "View Quiz",
}) {
  return (
    <div className="flex flex-col justify-between p-5 transition-all duration-200 bg-white border shadow rounded-xl border-slate-200 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-2 text-xs">
          <CategoryBadge category={category} />
          <DifficultyBadge difficulty={difficulty} />
        </div>

        <p className="mb-3 text-sm text-slate-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        <div className="flex justify-between mt-1 text-xs text-slate-400 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{participants} Participants</span>
          </div>
          <p className="italic">
            by <span className="font-semibold">{createdBy}</span>
          </p>
        </div>
      </div>

      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 px-4 py-2 mt-5 text-sm font-medium text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
      >
        <EyeIcon className="w-4 h-4" /> {buttonText}
      </button>
    </div>
  );
}
