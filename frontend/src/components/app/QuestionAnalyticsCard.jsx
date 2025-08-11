import { useState } from "react";
import CommentModal from "./CommentModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../../context/DarkModeContext";

export default function QuestionAnalyticsCard({
  question,
  index,
  submissions,
}) {
  const [showComments, setShowComments] = useState(false);
  const hasComments = question.comments && question.comments.length > 0;
  const { isDark } = useDarkMode();

  const handleToggleModal = () => setShowComments(true);

  function getAnswerDistribution(question, submissions) {
    const counts = new Array(question.options.length).fill(0);

    submissions.forEach((submission) => {
      const answer = submission.answers?.find(
        (a) => a.question === question._id
      );
      if (answer && answer.selectedOption !== undefined) {
        counts[answer.selectedOption] += 1;
      }
    });

    const totalAnswers = counts.reduce((a, b) => a + b, 0) || 1;

    return counts.map((count, i) => ({
      option: String.fromCharCode(65 + i),
      count: Math.round((count / totalAnswers) * 100),
    }));
  }

  const distributionData = getAnswerDistribution(question, submissions);

  return (
    <div className="p-4 space-y-4 bg-white border shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-700 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
        {/* Left Side - Question Text & Options */}
        <div className="flex-1 space-y-3">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100 sm:text-lg">
            Q{index + 1}: {question.questionText}
          </h3>

          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.correctAnswer;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isCorrect
                      ? "text-green-600"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                      isCorrect
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400 dark:border-gray-500"
                    }`}
                  />
                  <span>
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Avg Time */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon className="w-4 h-4 mr-1.5" />
            Avg. time to answer: {question.averageTime}s
          </div>

          {/* Comments Button */}
          <button
            onClick={handleToggleModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-sm font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
          >
            <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
            {hasComments
              ? `${question.comments.length} Comments`
              : "Add Comment"}
          </button>
        </div>

        {/* Right Side - Chart */}
        <div className="flex justify-center w-full h-48 sm:w-64 sm:h-40 sm:justify-end">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#E5E7EB"} // gray-700 or gray-200
              />
              <XAxis
                dataKey="option"
                stroke={isDark ? "#9CA3AF" : "#4B5563"} // gray-400 or gray-700
                tick={{ fill: isDark ? "#D1D5DB" : "#374151", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                stroke={isDark ? "#9CA3AF" : "#4B5563"}
                tick={{ fill: isDark ? "#D1D5DB" : "#374151", fontSize: 12 }}
                unit="%"
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1F2937" : "#ffffff",
                  border: "none",
                  borderRadius: 6,
                  color: isDark ? "#F9FAFB" : "#111827",
                  fontSize: 13,
                }}
                labelStyle={{
                  color: isDark ? "#93C5FD" : "#1D4ED8",
                  fontWeight: 500,
                }}
                cursor={{ fill: isDark ? "#37415133" : "#93C5FD33" }}
                formatter={(value) => `${value}%`}
              />
              <Bar
                dataKey="count"
                fill={isDark ? "#3B82F6" : "#60A5FA"} // blue-500 or blue-400
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comment Modal */}
      {showComments && (
        <CommentModal
          comments={question.comments}
          onClose={() => setShowComments(false)}
          questionId={question._id}
        />
      )}
    </div>
  );
}
