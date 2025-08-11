import {
  CalendarDaysIcon,
  UsersIcon,
  ArrowRightCircleIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

import CategoryBadge from "./CategoryBadge";
import DifficultyBadge from "./DifficultyBadge";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import QuizActionsDropdown from "./QuizActionsDropdown";

export default function CreatedQuizCard({
  quiz,
  onEdit,
  onDelete,
  onDetails,
  onToggleStatus,
  isDeleting = false,
  isToggling = false,
}) {
  return (
    <div className="relative flex flex-col p-6 space-y-4 transition-all bg-white border shadow-sm rounded-xl hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
      {/* Dropdown Menu */}
      <div className="absolute z-10 top-3 right-3">
        <QuizActionsDropdown
          quiz={quiz}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          disabled={isToggling || isDeleting}
        />
      </div>

      {/* Title */}
      <h3 className="pr-10 text-xl font-bold text-slate-800 dark:text-white">
        {quiz.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
        {quiz.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 text-xs">
        <CategoryBadge category={quiz.category} />
        <DifficultyBadge difficulty={quiz.difficulty} />
      </div>

      {/* Meta Info */}
      <div className="flex flex-col mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="w-4 h-4" />
          Created: {new Date(quiz.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <UsersIcon className="w-4 h-4" />
          Participants: {quiz.participants?.length || 0}
        </div>

        <div className="flex items-center gap-1">
          <SignalIcon
            className={`w-4 h-4 ${
              quiz.isActive ? "text-green-500 animate-pulse" : "text-yellow-500"
            }`}
          />
          <StatusBadge isActive={quiz.isActive} />
        </div>
      </div>

      {/* More Details Button */}
      <ActionButton
        onClick={onDetails}
        icon={ArrowRightCircleIcon}
        color="blue"
        variant="filled"
        className="w-full mt-4"
      >
        More details
      </ActionButton>
    </div>
  );
}
