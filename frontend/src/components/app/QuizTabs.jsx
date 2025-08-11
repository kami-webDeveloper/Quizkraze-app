import { useNavigate, useLocation } from "react-router-dom";

export default function QuizTabs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isCreated = pathname.includes("created-quizzes");
  const isAttempted = pathname.includes("attempted-quizzes");

  return (
    <div className="inline-flex p-1 space-x-2 bg-gray-100 rounded-lg dark:bg-slate-800">
      <button
        onClick={() => navigate("/app/my-quizzes/created-quizzes")}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
          isCreated
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-700"
        }`}
      >
        Created Quizzes
      </button>
      <button
        onClick={() => navigate("/app/my-quizzes/attempted-quizzes")}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
          isAttempted
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-700"
        }`}
      >
        Attempted Quizzes
      </button>
    </div>
  );
}
