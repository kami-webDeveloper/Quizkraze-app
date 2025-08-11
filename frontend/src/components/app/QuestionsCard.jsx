// src/components/quizView/QuestionsCard.jsx
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import QuestionCommentsModal from "./QuestionCommentsModal";

const mockQuestions = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "London"],
    correctAnswer: 1,
    averageTime: 15,
    comments: [
      { user: "Ali", text: "I thought it was Madrid!" },
      { user: "Sara", text: "Loved this question." },
    ],
  },
  {
    id: 2,
    questionText: "Which element has the atomic number 1?",
    options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
    correctAnswer: 1,
    averageTime: 10,
    comments: [],
  },
];

export default function QuestionsCard() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-700">Questions</h3>

      {mockQuestions.map((q, index) => (
        <div
          key={q.id}
          className="flex flex-col justify-between gap-4 p-5 bg-white border shadow-sm md:flex-row rounded-xl"
        >
          {/* Left: Question Content */}
          <div className="flex-1 space-y-2">
            <h4 className="text-base font-medium text-slate-800">
              Question {index + 1}: {q.questionText}
            </h4>

            <ul className="space-y-1 text-sm">
              {q.options.map((opt, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled
                    checked={q.correctAnswer === idx}
                    className="accent-blue-600"
                  />
                  {opt}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveQuestion(q)}
              className="flex items-center mt-2 text-sm text-blue-600 hover:underline"
            >
              <ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-1" /> View
              Comments
            </button>
          </div>

          {/* Right: Analytics Chart */}
          <div className="md:w-[300px]">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[{ name: "Avg Time", value: q.averageTime }]}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#10b981"
                  barSize={40}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-1 text-xs text-center text-gray-500">
              Avg. Time Taken: {q.averageTime} sec
            </p>
          </div>
        </div>
      ))}

      {activeQuestion && (
        <QuestionCommentsModal
          question={activeQuestion}
          onClose={() => setActiveQuestion(null)}
        />
      )}
    </div>
  );
}
