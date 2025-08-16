import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import StepIndicator from "./StepIndicator";
import QuizInfoForm from "./QuizInfoForm";
import QuestionsBuilder from "./QuestionBuilder";
import ReviewSubmit from "./ReviewSubmit";
import { useGetQuiz, useUpdateQuiz } from "../../hooks/useQuiz";
import { useBatchCreateQuestions } from "../../hooks/useQuestion";

export default function EditQuiz() {
  const { quizId } = useParams();
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState(null);

  const { data, isLoading, isFetched, error } = useGetQuiz(quizId, true);
  const { mutate: updateQuiz, isPending: isSubmitting } = useUpdateQuiz(quizId);
  const { mutateAsync: createQuestions, isPending: isCreatingQuestions } =
    useBatchCreateQuestions();

  console.log(data?.data?.quiz.timelimit);

  useEffect(() => {
    if (data?.data?.quiz) {
      const quiz = data.data.quiz;

      setQuizData({
        title: quiz.title || "",
        description: quiz.description || "",
        category: quiz.category || "",
        difficulty: quiz.difficulty || "",
        timelimit: quiz.timelimit || 0,
        questions:
          quiz.questions?.map((q) => ({
            questionText: q.questionText || "",
            options: q.options || ["", "", "", ""],
            correctAnswer: q.correctAnswer ?? 0,
            explanation: q.explanation || "",
          })) || [],
      });
    }
  }, [data]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateQuizData = (newData) =>
    setQuizData((prev) => ({ ...prev, ...newData }));

  const handleUpdate = async (cleanedData) => {
    if (!cleanedData) return;

    try {
      // Create questions and receive ObjectIds
      const {
        data: { questionIds },
      } = await createQuestions({
        questions: cleanedData.questions,
      });

      const updatedQuizData = {
        ...cleanedData,
        questions: questionIds,
      };

      // Update quiz with new questions
      updateQuiz(updatedQuizData);
    } catch (err) {
      alert("Failed to update quiz: " + err.message);
    }
  };

  if (isLoading || !isFetched) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-gray-500 dark:text-gray-400">
        Loading quiz data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Failed to load quiz: {error.message}
      </div>
    );
  }

  if (!quizData) return null;

  return (
    <div className="max-w-2xl p-4 mx-auto dark:text-gray-200">
      <StepIndicator step={step} />

      {step === 1 && (
        <QuizInfoForm
          quizData={quizData}
          updateQuizData={updateQuizData}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <QuestionsBuilder
          questions={quizData.questions}
          setQuestions={(questions) => updateQuizData({ questions })}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <ReviewSubmit
          quizData={quizData}
          prevStep={prevStep}
          isEditForm={true}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting || isCreatingQuestions}
        />
      )}
    </div>
  );
}
