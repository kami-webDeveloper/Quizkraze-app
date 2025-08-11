import { useState, useRef, useEffect } from "react";
import {
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const QuestionItem = ({ index, question, updateQuestion, removeQuestion }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("auto");

  const handleChange = (e) => {
    updateQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (i, value) => {
    const newOptions = [...question.options];
    newOptions[i] = value;
    updateQuestion({ ...question, options: newOptions });
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen, question]);

  return (
    <div className="p-4 transition-all bg-white border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Header: Label + Buttons */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
          Question {index + 1}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={removeQuestion}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-red-600 transition bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
          >
            <TrashIcon className="w-4 h-4 mr-1" />
            Remove
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden duration-300 ease-in-out transition-max-height"
      >
        <div className="pt-2 space-y-3">
          <input
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            placeholder="Question text *"
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            required
          />

          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${index}`}
                checked={question.correctAnswer === i}
                onChange={() =>
                  updateQuestion({ ...question, correctAnswer: i })
                }
              />
              <input
                value={question.options[i]}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + i)} *`}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
          ))}

          <textarea
            name="explanation"
            value={question.explanation}
            onChange={handleChange}
            placeholder="Explanation (optional)"
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
