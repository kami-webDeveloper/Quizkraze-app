// src/pages/AttemptedQuizDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CircularScore from "../components/app/CircularScore";
import QuestionResultCard from "../components/app/QuestionResultCard";

const mockData = {
  attempt123: {
    quiz: {
      title: "World Capitals Quiz",
    },
    score: 85,
    timeTaken: "1m 50s",
    submittedAt: "2024-04-02T11:30:00Z",
    questions: [
      {
        id: 1,
        questionText: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctAnswer: 0,
        selectedAnswer: 0,
      },
      {
        id: 2,
        questionText: "What is the capital of Iran?",
        options: ["Baghdad", "London", "Tehran", "Berlin"],
        correctAnswer: 2,
        selectedAnswer: 0,
      },
      {
        id: 3,
        questionText: "What is the capital of Spain?",
        options: ["Madrid", "Las Palmas", "Barcelona", "Valencia"],
        correctAnswer: 0,
        selectedAnswer: 0,
      },
    ],
  },
};

export default function AttemptedQuizDetails() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const submission = mockData[attemptId];

  if (!submission) {
    return <div className="p-6 text-red-600">Submission not found</div>;
  }

  const { quiz, score, timeTaken, submittedAt, questions } = submission;

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </button>

      <div className="p-4 space-y-2 bg-white border shadow-sm rounded-xl">
        <h1 className="text-2xl font-bold text-slate-800">{quiz.title}</h1>
        <div className="flex flex-wrap items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <CircularScore score={score} size={48} />
            <span className="text-sm text-gray-500">Score</span>
          </div>
          <p className="text-sm text-gray-600">
            Time taken: <strong>{timeTaken}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Attempted at:{" "}
            <strong>{new Date(submittedAt).toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <QuestionResultCard key={q.id} question={q} index={idx} />
        ))}
      </div>
    </div>
  );
}
