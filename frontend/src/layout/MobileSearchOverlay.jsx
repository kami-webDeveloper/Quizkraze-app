import { XMarkIcon } from "@heroicons/react/24/outline";
import { UseLayoutUI } from "../context/LayoutUIContext";

export default function MobileSearchOverlay() {
  const { searchTerm, setSearchTerm, setIsSearchOpen } = UseLayoutUI();

  const onClose = () => setIsSearchOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-6 bg-white shadow-md sm:hidden">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Perform search:", searchTerm);
          onClose();
        }}
        className="relative w-full max-w-md"
      >
        <input
          autoFocus
          type="text"
          placeholder="Search for Users, Quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute text-gray-400 -translate-y-1/2 right-10 top-1/2 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute text-gray-400 -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
