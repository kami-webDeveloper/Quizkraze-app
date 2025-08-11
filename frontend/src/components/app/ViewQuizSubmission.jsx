import { useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import CircularScore from "./CircularScore";
import { useState } from "react";
import CommentModal from "./CommentModal";
import CategoryBadge from "./CategoryBadge";
import DifficultyBadge from "./DifficultyBadge";
import TextExpander from "./TextExpander";
import { useGetSubmission } from "../../hooks/useSubmission";

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m ` : ""}${s}s`;
}

const OptionItem = ({ option, isCorrect, isSelected, index }) => (
  <div
    className={`flex items-center gap-2 text-sm font-medium rounded px-2 py-1
      ${
        isCorrect
          ? "text-green-700 dark:text-green-400"
          : isSelected
          ? "text-red-600 dark:text-red-400"
          : "text-gray-700 dark:text-gray-300"
      }`}
  >
    <div
      className={`w-4 h-4 rounded-full flex-shrink-0 border-2
        ${
          isCorrect
            ? "bg-green-500 border-green-500"
            : isSelected
            ? "bg-red-500 border-red-500"
            : "border-gray-400 dark:border-gray-600"
        }`}
    />
    <span>
      {String.fromCharCode(65 + index)}. {option}
    </span>
  </div>
);

function QuestionResultCard({
  question,
  index,
  onOpenComments,
  commentsCount,
}) {
  const hasComments = commentsCount > 0;

  return (
    <div className="p-5 space-y-4 bg-white border shadow-sm dark:bg-gray-800 dark:border-gray-700 rounded-xl">
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
        {index + 1}. {question.questionText}
      </h3>

      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {question.options.map((opt, i) => (
          <OptionItem
            key={i}
            option={opt}
            index={i}
            isCorrect={i === question.correctAnswer}
            isSelected={i === question.userAnswer}
          />
        ))}
      </div>

      {question.explanation && question.explanation.trim() !== "" && (
        <div className="flex items-start gap-2 p-3 border border-yellow-300 rounded-md dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30">
          <LightBulbIcon className="flex-shrink-0 w-5 h-5 mt-1 text-yellow-500" />
          <TextExpander text={question.explanation} collapsedLines={2} />
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <ClockIcon className="w-4 h-4 mr-1.5" />
        Avg. time to answer: {question.averageTime}s
      </div>

      <button
        onClick={onOpenComments}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-900 rounded"
      >
        <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
        {hasComments ? `${commentsCount} Comments` : "Add Comment"}
      </button>
    </div>
  );
}

export default function ViewQuizSubmission() {
  const { id } = useParams();

  const { data, isPending, error } = useGetSubmission(id);
  const submission = data?.data?.submission;

  const [openCommentQuestionId, setOpenCommentQuestionId] = useState(null);

  if (isPending) {
    return (
      <div className="p-4 text-center text-gray-700 dark:text-gray-300">
        Loading submission...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        Error loading submission: {error.message || error.toString()}
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        Submission not found for ID: <code>{id}</code>
      </div>
    );
  }

  const { quiz, score, timeTaken, startTime, answers } = submission;

  // Map answers to question objects with full question data
  const questions = answers.map((ans) => ({
    id: ans.question._id,
    questionText: ans.question.questionText,
    options: ans.question.options,
    correctAnswer: ans.question.correctAnswer,
    userAnswer: ans.selectedOption,
    explanation: ans.question.explanation || "",
    averageTime: ans.question.averageTime || 0,
    comments: ans.question.comments || [], // if you have comments in question schema
  }));

  return (
    <div className="max-w-3xl p-4 mx-auto space-y-6">
      <div className="flex flex-col items-start md:items-center md:space-x-5 md:flex-row">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {quiz.title}
        </h1>
        <div className="flex flex-col justify-start mt-3 space-y-2 md:space-x-4 md:flex-row md:mt-0">
          <div className="space-x-3">
            <CategoryBadge category={quiz.category} color="orange" />
            <DifficultyBadge difficulty={quiz.difficulty} />
          </div>
          <div>
            {quiz.author && (
              <p className="flex items-center text-sm italic text-gray-400 underline cursor-pointer dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="mr-1">
                  <BookOpenIcon className="w-4" />
                </span>
                Author: {quiz.author}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-between p-4 text-center bg-white border shadow-sm dark:bg-gray-800 dark:border-gray-700 rounded-xl sm:flex-row">
        <div className="flex flex-col items-center justify-center flex-1 p-3 border-b dark:border-gray-700 sm:border-b-0 sm:border-r">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Score
          </p>
          <CircularScore score={score} size={64} />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-3 border-b dark:border-gray-700 sm:border-b-0 sm:border-r">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Time taken
          </p>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {formatTime(timeTaken)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-3">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Attempted at
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
            <CalendarDaysIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <p className="font-medium">
              {new Date(startTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <QuestionResultCard
            key={q.id}
            question={q}
            index={idx}
            commentsCount={q.comments.length}
            onOpenComments={() => setOpenCommentQuestionId(q.id)}
          />
        ))}
      </div>

      {openCommentQuestionId !== null && (
        <CommentModal
          questionId={openCommentQuestionId}
          onClose={() => setOpenCommentQuestionId(null)}
          allowNewComment
        />
      )}
    </div>
  );
}
