import { useEffect, useRef } from "react";
import { QUIZ_CATEGORIES } from "../../utils/quizCategories";
import { DIFFICULTY_LEVELS } from "../../utils/quizDifficulties";
import { ClockIcon } from "@heroicons/react/24/outline";

const QuizInfoForm = ({ quizData, updateQuizData, nextStep }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateQuizData({ [name]: value });

    if (name === "description" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }}
    >
      {/* Quiz Title */}
      <div>
        <label className="block mb-1 font-normal text-gray-600 dark:text-gray-300 text-md">
          Quiz Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={quizData.title}
          onChange={handleChange}
          required
          placeholder="Enter quiz title"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-gray-100 dark:focus:ring-blue-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-normal text-gray-600 dark:text-gray-300 text-md">
          Description
        </label>
        <textarea
          name="description"
          ref={textareaRef}
          value={quizData.description}
          onChange={handleChange}
          placeholder="Brief description (optional)"
          className="w-full p-2 overflow-hidden border border-gray-300 rounded-md resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-gray-100 dark:focus:ring-blue-400"
          rows={2}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-normal text-gray-600 dark:text-gray-300 text-md">
          Category
        </label>
        <select
          name="category"
          value={quizData.category}
          onChange={handleChange}
          className="w-full p-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
        >
          {QUIZ_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block mb-1 font-normal text-gray-600 dark:text-gray-300 text-md">
          Difficulty
        </label>
        <select
          name="difficulty"
          value={quizData.difficulty}
          onChange={handleChange}
          className="w-full p-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
        >
          <option value="">Select difficulty</option>
          {DIFFICULTY_LEVELS.map((diff) => (
            <option key={diff} value={diff.toLowerCase()}>
              {diff}
            </option>
          ))}
        </select>
      </div>

      {/* Time Limit */}
      <div className="relative">
        <label className="block mb-1 font-normal text-gray-600 dark:text-gray-300 text-md">
          Time Limit (optional)
        </label>

        {/* Toggle - No time limit */}
        <div className="absolute top-0 right-0">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none dark:text-gray-400">
            <input
              type="checkbox"
              checked={quizData.timelimit === 0}
              onChange={(e) =>
                updateQuizData({ timelimit: e.target.checked ? 0 : 10 })
              }
              className="accent-blue-500"
            />
            No time limit
          </label>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {/* Hours */}
          <select
            name="hours"
            value={Math.floor(quizData.timelimit / 60)}
            onChange={(e) => {
              const hours = parseInt(e.target.value, 10);
              const minutes = quizData.timelimit % 60;
              const total = hours * 60 + minutes;
              if (total <= 300) {
                updateQuizData({ timelimit: total });
              }
            }}
            disabled={quizData.timelimit === 0}
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i} value={i}>
                {i} hr
              </option>
            ))}
          </select>

          {/* Minutes */}
          <select
            name="minutes"
            value={quizData.timelimit % 60}
            onChange={(e) => {
              const minutes = parseInt(e.target.value, 10);
              const hours = Math.floor(quizData.timelimit / 60);
              const total = hours * 60 + minutes;
              if (total <= 300) {
                updateQuizData({ timelimit: total });
              }
            }}
            disabled={quizData.timelimit === 0}
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
          >
            {Array.from({ length: 12 }, (_, i) => i * 5).map((min) => (
              <option key={min} value={min}>
                {min} min
              </option>
            ))}
          </select>
        </div>

        {/* Total Time Preview */}
        <p className="flex items-center gap-1 mt-3 text-sm text-gray-600 dark:text-gray-400">
          <ClockIcon className="w-5 h-5" />
          {quizData.timelimit === 0 ? (
            <span>No time limit</span>
          ) : (
            <>
              {Math.floor(quizData.timelimit / 60) > 0 && (
                <span>{Math.floor(quizData.timelimit / 60)} hr</span>
              )}
              {quizData.timelimit % 60 > 0 && (
                <span>{quizData.timelimit % 60} min</span>
              )}
            </>
          )}
        </p>

        {/* Validation Message */}
        {quizData.timelimit > 300 && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            Max allowed time is 5 hours (300 minutes).
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2.5 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Next
      </button>
    </form>
  );
};

export default QuizInfoForm;
