import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  // Keep it compact (max 5 buttons visible)
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-2 px-2 mt-6 sm:gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 text-blue-600 transition bg-white border border-blue-200 rounded-full disabled:opacity-50 dark:text-blue-400 dark:bg-gray-800 dark:border-gray-700"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-1 text-sm font-medium transition-all border-b-2 ${
            currentPage === pageNum
              ? "border-gray-900 text-gray-900 dark:border-white dark:text-white"
              : "border-transparent text-blue-600 hover:border-blue-400 dark:text-blue-400 dark:hover:border-blue-300"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 text-blue-600 transition bg-white border border-blue-200 rounded-full disabled:opacity-50 dark:text-blue-400 dark:bg-gray-800 dark:border-gray-700"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
