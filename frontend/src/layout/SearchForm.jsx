import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchForm({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex w-full"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for Users, Quizzes..."
          className="w-full px-4 py-2 text-sm border border-gray-300 shadow-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute text-gray-400 -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center justify-center px-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-r-md"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  );
}
