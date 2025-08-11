import { useState } from "react";
import StepIndicator from "./StepIndicator";
import QuizInfoForm from "./QuizInfoForm";
import QuestionsBuilder from "./QuestionBuilder";
import ReviewSubmit from "./ReviewSubmit";
import { useCreateQuiz } from "../../hooks/useQuiz";

const CreateQuiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "None",
    difficulty: "",
    timelimit: 0,
    questions: [],
  });

  const { mutate: createQuiz, isPending } = useCreateQuiz();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateQuizData = (newData) => {
    setQuizData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
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
          isPending={isPending}
          onSubmit={createQuiz}
        />
      )}
    </div>
  );
};

export default CreateQuiz;
