import { useNavigate, useParams } from "react-router-dom";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import CircularScore from "../components/CircularScore";
import QuestionResultCard from "./QuestionResultCard";
import mockData from "../mock/mockData";

export default function ViewAttemptedQuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const submission = mockData[quizId]?.participants.find(
    (p) => p.name === "Frank"
  ); // Or current user
  const quiz = mockData[quizId]?.quiz;
  const answers = [0, 0, 0]; // Example: selected options by user
  const submittedAt = "2024-04-02T11:30:00Z";
  const score = 85;
  const timeTaken = "1m 50s";

  if (!quiz || !submission) {
    return <div className="p-4 text-center text-red-500">Quiz not found.</div>;
  }

  return (
    <div className="max-w-3xl px-4 py-6 mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 underline hover:text-blue-600"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-slate-800">{quiz.title}</h1>

      {/* Score Summary */}
      <div className="flex items-center justify-between p-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <CircularScore score={score} size={64} />
            <span className="text-sm text-gray-600">Score</span>
          </div>
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" /> {timeTaken}
            </p>
            <p className="flex items-center gap-1">
              <CalendarDaysIcon className="w-4 h-4" />
              Attempted at:{" "}
              {new Date(submittedAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {mockData[quizId].questions.map((q, idx) => (
          <QuestionResultCard
            key={q.id}
            question={q}
            index={idx}
            selectedAnswer={answers[idx]}
          />
        ))}
      </div>
    </div>
  );
}
