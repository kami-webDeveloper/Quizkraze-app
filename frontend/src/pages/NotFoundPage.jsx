import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>

        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Page Not Found
        </p>

        <p className="text-gray-500 dark:text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go Back
        </button>

        {/* Home Button */}
        <div>
          <Link
            to="/"
            className="inline-block px-6 py-2 mt-4 font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
