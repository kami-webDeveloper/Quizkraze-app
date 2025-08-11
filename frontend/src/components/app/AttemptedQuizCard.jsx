import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import CategoryBadge from "./CategoryBadge";
import DifficultyBadge from "./DifficultyBadge";
import CircularScore from "./CircularScore";

export default function AttemptedQuizCard({ submission, onClick }) {
  const { quiz, score, timeTaken, endTime } = submission;

  return (
    <div
      onClick={onClick}
      className="relative p-6 overflow-hidden transition bg-white border shadow-md cursor-pointer group rounded-xl hover:shadow-lg dark:bg-slate-800 dark:border-slate-700"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-lg font-medium text-white transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none group-hover:opacity-100 backdrop-blur-sm bg-black/25 rounded-xl">
        View submission
      </div>

      <div className="relative z-0 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
              {quiz.title}
            </h3>
          </div>
          <div className="ml-4 shrink-0">
            <CircularScore score={score} size={64} />
          </div>
        </div>

        {/* Description */}
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {quiz.description}
        </p>

        {/* Badges */}
        <div className="flex gap-2 mt-2 text-xs">
          <CategoryBadge category={quiz.category} />
          <DifficultyBadge difficulty={quiz.difficulty} />
        </div>

        {/* Meta Info */}
        <div className="flex flex-col gap-1.5 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            Time Taken: {timeTaken} sec
          </p>
          <p className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
            <CalendarDaysIcon className="w-4 h-4" />
            Submitted: {new Date(endTime).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
