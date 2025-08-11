import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AuthFormLayout({
  title,
  description,
  children,
  onSubmit,
}) {
  useEffect(() => {
    const firstInput = document.querySelector("input");
    if (firstInput) firstInput.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 flex items-center justify-center px-4 relative">
      <Link
        to="/"
        className="absolute text-2xl font-bold tracking-wide text-blue-600 uppercase top-6 left-6 sm:text-3xl"
      >
        QUIZKRAZE
      </Link>

      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl dark:bg-gray-800">
        <h2 className="mb-3 text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className="mb-8 text-center text-gray-500 dark:text-gray-300 text-md">
            {description}
          </p>
        )}
        <form className="space-y-5" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
