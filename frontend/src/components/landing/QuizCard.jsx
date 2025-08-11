import { ClockIcon } from "@heroicons/react/24/outline";

export default function QuizCard({
  title,
  description,
  difficulty,
  time,
  onClick,
}) {
  const difficultyColors = {
    regular:
      "bg-green-100 text-green-800 dark:bg-green-200/20 dark:text-green-400",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-200/20 dark:text-yellow-400",
    intermediate:
      "bg-blue-100 text-blue-800 dark:bg-blue-200/20 dark:text-blue-400",
    advanced: "bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-400",
  };

  const badgeStyle =
    difficultyColors[difficulty] ||
    "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";

  return (
    <div className="flex flex-col justify-between p-6 transition bg-white border shadow-sm dark:bg-gray-900 border-slate-200 dark:border-gray-700 hover:shadow-md rounded-2xl">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
          {title}
        </h3>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-md font-medium capitalize ${badgeStyle}`}
          >
            {difficulty}
          </span>
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <ClockIcon className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onClick}
        className="px-4 py-2 mt-6 text-sm font-medium text-white transition bg-sky-600 hover:bg-sky-700 rounded-xl"
      >
        Start Quiz
      </button>
    </div>
  );
}
