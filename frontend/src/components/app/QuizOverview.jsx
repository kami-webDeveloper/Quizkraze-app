import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowRightCircleIcon,
  InformationCircleIcon,
  BookmarkIcon,
  FireIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import CategoryBadge from "../app/CategoryBadge";
import DifficultyBadge from "../app/DifficultyBadge";
import { useGetQuiz } from "../../hooks/useQuiz";
import { useGetUserSubmissions } from "../../hooks/useSubmission";
import Spinner from "../../ui/Spinner";
import ConfirmModal from "../../ui/ConfirmModal";
import { showError } from "../../ui/toasts";
import { useSelector } from "react-redux";

export default function QuizOverview() {
  const { quizId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const { data, isLoading, error } = useGetQuiz(quizId);

  // Load submissions only if userId exists
  const { data: userSubmissionsData, isLoading: submissionsLoading } =
    useGetUserSubmissions(userId, {
      enabled: !!userId,
    });

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || submissionsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );
  }

  if (error) return <div className="mx-auto">{error.message}</div>;

  const quiz = data?.data?.quiz;
  const submissions = userSubmissionsData?.data?.submissions || [];

  if (!quiz) {
    return (
      <div className="py-10 text-center text-slate-500 dark:text-slate-400">
        Quiz not found.
      </div>
    );
  }

  // Check if user has already submitted this quiz
  const alreadySubmitted = submissions.some(
    (submission) => submission.quiz._id === quizId
  );

  const handleStartClick = () => {
    if (alreadySubmitted) {
      showError("You have already submitted this quiz before.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmStart = () => {
    setIsModalOpen(false);
    navigate(`/app/quiz/${quizId}`);
  };

  return (
    <>
      <div className="max-w-4xl px-4 py-8 mx-auto space-y-10 sm:px-6 lg:px-8 animate-fade-in">
        {/* Title Block */}
        <div className="relative space-y-3 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white sm:text-4xl">
            {quiz.title}
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-green-400"></div>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300 text-md">
            {quiz.description}
          </p>
        </div>

        {/* Metadata Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetaCard
            icon={<BookmarkIcon className="w-6 h-6 text-blue-500" />}
            label="Category"
            content={<CategoryBadge category={quiz.category} />}
          />
          <MetaCard
            icon={<FireIcon className="w-6 h-6 text-orange-500" />}
            label="Difficulty"
            content={<DifficultyBadge difficulty={quiz.difficulty} />}
          />
          <MetaCard
            icon={<ClockIcon className="w-6 h-6 text-purple-500" />}
            label="Time Limit"
            content={quiz.timelimit}
          />
          <MetaCard
            icon={<CalendarDaysIcon className="w-6 h-6 text-green-600" />}
            label="Created On"
            content={new Date(quiz.createdAt).toLocaleDateString()}
          />
          <MetaCard
            icon={<UserGroupIcon className="w-6 h-6 text-indigo-500" />}
            label="Participants"
            content={`${quiz.participants.length} users`}
          />
          <MetaCard
            icon={<InformationCircleIcon className="w-6 h-6 text-sky-500" />}
            label="Created By"
            content={
              <span className="italic font-medium">
                {quiz.createdBy.username}
              </span>
            }
          />
          <MetaCard
            icon={
              <QuestionMarkCircleIcon className="w-6 h-6 text-fuchsia-600" />
            }
            label="Questions"
            content={`${quiz.questions.length} total`}
          />
        </div>

        {/* Start Quiz CTA */}
        <div className="text-center">
          <button
            onClick={handleStartClick}
            disabled={alreadySubmitted}
            className={`inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-lg ${
              alreadySubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-green-500 hover:brightness-110"
            }`}
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Ready to start?"
        message={`Are you ready to start the quiz: ${quiz.title}?`}
        confirmText="Yes, Start"
        cancelText="Cancel"
        onConfirm={handleConfirmStart}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}

function MetaCard({ icon, label, content }) {
  return (
    <div className="flex items-start gap-3 p-4 transition duration-300 border shadow-sm rounded-xl border-slate-200 bg-white/70 backdrop-blur-sm hover:shadow-md dark:border-slate-700 dark:bg-slate-800/70">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-base text-slate-700 dark:text-slate-100">
          {content}
        </p>
      </div>
    </div>
  );
}
