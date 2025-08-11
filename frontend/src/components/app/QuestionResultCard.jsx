// src/components/app/QuestionResultCard.jsx
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function QuestionResultCard({ question, index }) {
  return (
    <div className="p-4 space-y-3 bg-white border shadow-sm rounded-xl">
      <h3 className="text-base font-semibold text-slate-800">
        {index + 1}. {question.questionText}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctAnswer;
          const isSelected = i === question.selectedAnswer;

          const base =
            "flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border";
          let classes = "text-gray-800 border-gray-300 bg-white";
          let icon = null;

          if (isCorrect && isSelected) {
            classes = "text-green-700 bg-green-50 border-green-500";
            icon = <CheckCircleIcon className="w-4 h-4 text-green-600" />;
          } else if (isSelected && !isCorrect) {
            classes = "text-red-700 bg-red-50 border-red-400";
            icon = <XCircleIcon className="w-4 h-4 text-red-500" />;
          } else if (isCorrect) {
            classes = "text-green-700 border-green-500 bg-green-50";
            icon = <CheckCircleIcon className="w-4 h-4 text-green-600" />;
          }

          return (
            <div key={i} className={`${base} ${classes}`}>
              {icon}
              <span>
                {String.fromCharCode(65 + i)}. {opt}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
