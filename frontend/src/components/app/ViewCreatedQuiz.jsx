import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import QuizMetaCard from "./QuizMetaCard";
import QuizAnalyticsCard from "./QuizAnalyticsCard";
import QuestionAnalyticsCard from "./QuestionAnalyticsCard";
import { useGetQuiz } from "../../hooks/useQuiz";
import Spinner from "../../ui/Spinner";
import computeScoreDistribution from "../../utils/computeScoreDistribution";
import { useGetQuizSubmissions } from "../../hooks/useSubmission";

export default function ViewCreatedQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const {
    data: quizData,
    isLoading,
    isError,
    error: quizError,
  } = useGetQuiz(quizId, true);

  const { data, isPending, error } = useGetQuizSubmissions(quizId);

  const submissions = data?.data?.submissions || [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );

  if (!quizData || isError)
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        Quiz not found for ID: <span className="font-mono">{quizId}</span>
      </div>
    );

  if (quizError)
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <span className="font-mono">{quizError.message}</span>
      </div>
    );

  const quiz = quizData?.data?.quiz ?? {};

  const { participants = [], questions = [] } = quiz;

  const scoreDistribution = computeScoreDistribution(submissions);

  return (
    <div className="max-w-6xl p-4 mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 underline hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </button>

      <QuizMetaCard quiz={quiz} />

      <QuizAnalyticsCard
        quizId={quiz._id}
        participants={participants}
        scoreData={scoreDistribution}
        submissions={submissions}
        isPending={isPending}
        error={error}
      />

      <div className="space-y-4">
        {questions.map((q, index) => (
          <QuestionAnalyticsCard
            key={q._id}
            question={q}
            index={index}
            submissions={submissions}
          />
        ))}
      </div>
    </div>
  );
}
