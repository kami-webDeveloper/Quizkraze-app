import QuestionItem from "./QuestionItem";

const QuestionsBuilder = ({ questions, setQuestions, nextStep, prevStep }) => {
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
  };

  const updateQuestion = (index, updated) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updated;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  return (
    <div className="relative space-y-4 pb-28 dark:text-gray-200">
      {questions.map((q, i) => (
        <QuestionItem
          key={i}
          index={i}
          question={q}
          updateQuestion={(data) => updateQuestion(i, data)}
          removeQuestion={() => removeQuestion(i)}
        />
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
      >
        + Add Question
      </button>
      <div className="sticky bottom-0 left-0 z-10 w-full px-4 mt-8">
        <div className="flex items-center justify-between max-w-2xl px-4 py-4 mx-auto bg-white border border-gray-200 rounded-full shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 text-gray-600 transition bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 text-white transition bg-blue-600 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsBuilder;
