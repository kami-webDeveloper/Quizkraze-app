import { NavLink, useLocation } from "react-router-dom";
import DarkModeToggle from "../components/app/DarkModeToggle";

export default function Topbar() {
  const { pathname } = useLocation();

  // Determine title for non-search pages
  const getTitle = () => {
    if (pathname.startsWith("/app/my-quizzes")) return "My Quizzes";
    if (pathname.startsWith("/app/create")) return "Create Quiz";
    if (pathname.startsWith("/app/profile")) return "My Profile";
    if (pathname.startsWith("/app/quiz/")) return "Quiz";
    if (pathname.startsWith("/app/result/")) return "Results";
    if (pathname.startsWith("/app/feed")) return "Feed";

    return "Unknown";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-700">
      {/* Mobile title/logo */}
      <div className="md:hidden">
        <NavLink
          to="/app"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          QUIZKRAZE
        </NavLink>
      </div>

      {/* Title */}
      <div className="flex-1 hidden max-w-md px-4 sm:block">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {getTitle()}
        </h1>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 ml-auto">
        <DarkModeToggle />
        {/* Future icons (notifications, profile, search) can be added here */}
      </div>
    </header>
  );
}
