import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useGetQuiz } from "../../hooks/useQuiz";
import { useSubmitQuiz } from "../../hooks/useSubmission";
import Spinner from "../../ui/Spinner";

export default function StartQuiz() {
  const { quizId } = useParams();
  const { data, isLoading, isError, error } = useGetQuiz(quizId);
  const {
    mutate: submitQuiz,
    isPending: isSubmitting,
    isError: isSubmitError,
    error: submitError,
  } = useSubmitQuiz(quizId);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime] = useState(() => new Date().toISOString());

  const hasSubmitted = useRef(false); // ✅ track if already submitted

  const handleSubmit = useCallback(() => {
    if (hasSubmitted.current || isSubmitting || !data?.data?.quiz) return;

    hasSubmitted.current = true; // mark as submitted immediately
    const quiz = data.data.quiz;
    const payloadAnswers = quiz.questions.map((q, i) => ({
      questionIndex: i,
      selectedOption: answers[q?._id] ?? null,
    }));

    submitQuiz({ quizId, answers: payloadAnswers, startTime });
  }, [answers, quizId, startTime, submitQuiz, isSubmitting, data]);

  // Initialize timer when quiz data arrives
  useEffect(() => {
    if (!data?.data?.quiz) return;
    const quiz = data.data.quiz;

    // Only set countdown if timelimit > 0
    if (quiz.timelimit && !isNaN(Number(quiz.timelimit))) {
      const limitMinutes = Number(quiz.timelimit);
      if (limitMinutes > 0) {
        setTimeLeft(limitMinutes * 60);
      }
    }
  }, [data]);

  // Countdown & auto-submit
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  // Submit on tab close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      handleSubmit();
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleSubmit]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error?.message || "Failed to load quiz."}
      </div>
    );
  }

  const quiz = data.data.quiz;
  const question = quiz.questions[current];

  const handleOptionSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [question._id]: optionIndex,
    }));
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-sky-50 via-white to-sky-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-4xl p-6 mx-auto space-y-10 bg-white shadow-2xl rounded-xl dark:bg-gray-800 animate-fade-in">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
            {quiz.title}
          </h1>
          {timeLeft !== null && (
            <div className="flex items-center gap-2 px-3 py-1 font-semibold text-red-600 bg-red-100 rounded-md dark:text-red-300 dark:bg-red-900/30">
              <ClockIcon className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Question {current + 1} of {quiz.questions.length}
          </div>
          <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-700">
            <div
              className="h-3 transition-all duration-300 rounded bg-gradient-to-r from-blue-500 to-green-400"
              style={{
                width: `${((current + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-white animate-slide-in">
            {question.questionText}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {question.options.map((option, idx) => {
              const isSelected = answers[question._id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isSubmitting}
                  className={`p-4 border-2 rounded-xl text-left shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200"
                      : "border-slate-300 bg-white hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-blue-500 dark:text-gray-100"
                  }`}
                >
                  <span className="mr-2 font-bold text-blue-600 dark:text-blue-300">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {isSubmitError && (
          <div className="text-sm text-red-600 dark:text-red-400">
            {submitError?.message || "Failed to submit quiz."}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrent((prev) => prev - 1)}
            disabled={current === 0 || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 border rounded-md hover:bg-gray-200 disabled:opacity-30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <ArrowLeftIcon className="w-5 h-5" /> Previous
          </button>

          {current < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrent((prev) => prev + 1)}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Next <ArrowRightIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
