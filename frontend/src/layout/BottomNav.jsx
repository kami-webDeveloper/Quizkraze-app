import { NavLink, useLocation } from "react-router-dom";
import {
  HomeModernIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Quizzes", icon: HomeModernIcon, path: "/app/feed" },
  {
    label: "My Quizzes",
    icon: ClipboardDocumentListIcon,
    path: "/app/my-quizzes",
  },
  { label: "Create Quiz", icon: PlusCircleIcon, path: "/app/create" },
  { label: "Profile", isAvatar: true, path: "/app/profile" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white border-t shadow-inner md:hidden dark:bg-gray-900 dark:border-gray-700">
      {navItems.map(({ label, icon: Icon, path, isAvatar }) => {
        const isActive = location.pathname === path;

        return (
          <NavLink
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isAvatar ? (
              <div>
                <UserIcon className="text-gray-600 w-7 h-7 dark:text-gray-300" />
              </div>
            ) : (
              <Icon className="w-6 h-6 mb-1" />
            )}
            <p className="font-medium">{label}</p>
          </NavLink>
        );
      })}
    </nav>
  );
}
