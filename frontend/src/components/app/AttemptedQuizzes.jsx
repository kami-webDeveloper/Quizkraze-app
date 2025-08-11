import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttemptedQuizCard from "./AttemptedQuizCard";
import CategoryFilter from "./CategoryFilter";
import DifficultyFilter from "./DifficultyFilter";
import QuizTabs from "./QuizTabs";
import { useGetUserSubmissions } from "../../hooks/useSubmission";
import { useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function AttemptedQuizzes() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const { data, isLoading, isFetched, error } = useGetUserSubmissions(userId);

  const userSubmissions = data?.data?.submissions || [];

  if (!userId || isLoading || !isFetched)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );

  if (error) {
    console.error(error);
    return <div className="mx-auto">{error.message}</div>;
  }

  const filtered = userSubmissions.filter(
    (submission) =>
      (!category || submission.quiz.category === category) &&
      (!difficulty || submission.quiz.difficulty === difficulty)
  );

  return (
    <div className="space-y-6">
      {/* Quiz type tabs */}
      <QuizTabs
        activeTab="attempted"
        onTabChange={(tab) => navigate(`/app/my-quizzes/${tab}-quizzes`)}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <CategoryFilter selected={category} onChange={setCategory} />
        <DifficultyFilter selected={difficulty} onChange={setDifficulty} />
      </div>

      {/* Quiz cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-20 text-center rounded-lg shadow-sm bg-slate-100 dark:bg-slate-800">
          <ArrowPathRoundedSquareIcon className="w-16 h-16 mb-4 text-indigo-500 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            No quiz submissions yet
          </h2>
          <p className="max-w-md mt-2 text-sm text-slate-600 dark:text-slate-400">
            You haven’t taken any quizzes yet. Start exploring and take a quiz
            to see your results here.
          </p>
          <button
            onClick={() => navigate("/app/feed")}
            className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-medium text-white transition rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
          >
            <ArrowRightIcon className="w-5 h-5 mr-2" />
            Take a Quiz
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {filtered.map((submission) => (
            <AttemptedQuizCard
              key={submission._id}
              submission={submission}
              onClick={() =>
                navigate(`/app/my-quizzes/attempted-quizzes/${submission._id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
