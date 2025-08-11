import { NavLink } from "react-router-dom";
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
];

export default function Sidebar() {
  return (
    <aside className="flex-col hidden w-64 p-4 space-y-6 bg-white border-r dark:bg-gray-800 dark:border-gray-700 md:flex">
      <NavLink to="/app" className="text-3xl font-bold text-blue-600 uppercase">
        QUIZKRAZE
      </NavLink>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-lg transition-all text-base font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold dark:bg-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300"
              }`
            }
          >
            <Icon className="w-6 h-6" />
            {label}
          </NavLink>
        ))}

        {/* Profile with User Icon */}
        <NavLink
          to="/app/profile"
          className={({ isActive }) => {
            const base =
              "flex items-center gap-4 px-5 py-3 mt-4 rounded-lg transition-all text-base font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900";
            const active =
              "bg-blue-100 text-blue-700 font-semibold dark:bg-blue-700 dark:text-blue-300";
            const inactive = "text-gray-600 dark:text-gray-300";

            return `${base} ${isActive ? active : inactive}`;
          }}
        >
          {({ isActive }) => (
            <>
              <UserIcon
                className={`w-7 h-7 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              />
              Profile
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}
