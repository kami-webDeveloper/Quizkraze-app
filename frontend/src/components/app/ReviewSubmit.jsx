import {
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function ReviewSubmit({
  quizData,
  prevStep,
  isEditForm = false,
  onSubmit,
  isPending = false,
}) {
  const handleSubmit = () => {
    const isValid =
      quizData?.title?.trim() &&
      Array.isArray(quizData.questions) &&
      quizData.questions.length > 0 &&
      quizData.questions.every(
        (q) =>
          q.questionText &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctAnswer === "number"
      );

    if (!isValid) {
      alert(
        "Make sure you’ve filled all required fields and each question has valid data."
      );
      return;
    }

    const cleanedData = {
      ...quizData,
      questions: quizData.questions.map((q) => ({
        questionText: q.questionText.trim(),
        options: q.options.map((opt) => opt.trim()),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation?.trim() || "",
      })),
    };

    onSubmit?.(cleanedData); // Pass cleaned data to update/create
  };

  const hours = Math.floor(quizData.timelimit / 60);
  const minutes = quizData.timelimit % 60;
  const timeLimitDisplay =
    quizData.timelimit === 0
      ? "No time limit"
      : `${hours > 0 ? `${hours} hr ` : ""}${minutes} min`;

  return (
    <div className="space-y-6 dark:text-gray-200">
      <h2 className="text-xl font-bold">Review Quiz</h2>

      <div className="p-4 space-y-4 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700">
        {/* Title */}
        <InfoRow icon={PencilSquareIcon} label="Title" value={quizData.title} />

        {/* Description */}
        <InfoRow
          icon={DocumentTextIcon}
          label="Description"
          value={quizData.description || "—"}
        />

        {/* Category */}
        <InfoRow icon={TagIcon} label="Category" value={quizData.category} />

        {/* Time Limit */}
        <InfoRow icon={ClockIcon} label="Time Limit" value={timeLimitDisplay} />

        {/* Difficulty */}
        <InfoRow
          icon={AdjustmentsHorizontalIcon}
          label="Difficulty"
          value={quizData.difficulty || "None"}
        />

        {/* Questions Count */}
        <InfoRow
          icon={QuestionMarkCircleIcon}
          label="Questions"
          value={quizData.questions.length}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-600 transition hover:underline dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <ClipboardDocumentCheckIcon className="w-5 h-5" />
          {isPending
            ? "Submitting..."
            : isEditForm
            ? "Update Quiz"
            : "Create Quiz"}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
      <Icon className="w-5 h-5 mt-1 shrink-0" />
      <p>
        <strong>{label}:</strong> {value}
      </p>
    </div>
  );
}
