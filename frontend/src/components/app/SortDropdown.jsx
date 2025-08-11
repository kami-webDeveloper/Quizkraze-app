import { ChartBarIcon } from "@heroicons/react/24/outline";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
];

export default function SortDropdown({ selected, onChange }) {
  return (
    <div className="relative w-full sm:w-auto">
      <ChartBarIcon className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none dark:text-gray-400 left-3 top-1/2" />
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-full px-3 py-2 pl-8 text-sm text-gray-900 bg-white border rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
      >
        {sortOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
