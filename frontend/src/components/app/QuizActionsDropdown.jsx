import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState, useEffect } from "react";

export default function QuizActionsDropdown({
  quiz,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
      </button>

      <div
        className={`absolute right-0 z-30 w-44 mt-2 origin-top-right rounded-md border shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out
        bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700
        ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <DropdownItem
          icon={
            quiz.isActive ? (
              <XCircleIcon className="w-4 h-4 mr-2 text-orange-500" />
            ) : (
              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
            )
          }
          label={quiz.isActive ? "Finish" : "Activate"}
          onClick={() => {
            onToggleStatus?.(quiz);
            setOpen(false);
          }}
        />

        <DropdownItem
          icon={<PencilSquareIcon className="w-4 h-4 mr-2 text-blue-500" />}
          label="Edit"
          onClick={() => {
            onEdit?.(quiz);
            setOpen(false);
          }}
        />

        <DropdownItem
          icon={<TrashIcon className="w-4 h-4 mr-2 text-red-500" />}
          label="Delete"
          onClick={() => {
            onDelete?.(quiz);
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2 text-sm text-left text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      {icon}
      {label}
    </button>
  );
}
