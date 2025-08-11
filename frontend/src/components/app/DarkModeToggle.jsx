import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DarkModeToggle({ className = "" }) {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      title="Toggle theme"
      className={`p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${className}`}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
}
