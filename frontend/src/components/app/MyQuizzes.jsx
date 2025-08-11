// src/components/app/MyQuizzes.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DifficultyFilter from "./DifficultyFilter";
import CreatedQuizCard from "./CreatedQuizCard";
import AttemptedQuizCard from "./AttemptedQuizCard";
import QuizTabs from "./QuizTabs";
import { useGetUserQuizzes } from "../../hooks/useQuiz";

// 🧪 Mock data for created quizzes
// const createdQuizzes = new Array(4).fill(0).map((_, idx) => ({
//   _id: `quiz${idx + 1}`,
//   title: `Created Quiz ${idx + 1}`,
//   description: "A quiz you've created.",
//   difficulty: ["easy", "medium", "hard", "expert"][idx % 4],
//   category: ["Science", "History", "Math", "Literature"][idx % 4],
//   isActive: idx % 2 === 0,
//   createdAt: new Date(Date.now() - idx * 1000 * 60 * 60 * 24 * 3),
// }));

// 🧪 Mock data for attempted quizzes
const attemptedQuizzes = new Array(3).fill(0).map((_, idx) => ({
  _id: `attempt${idx + 1}`,
  quiz: {
    title: `Attempted Quiz ${idx + 1}`,
    description: "A quiz you attempted recently.",
    difficulty: ["regular", "medium", "intermediate"][idx % 3],
    category: ["Fun Facts", "Psychology", "Astronomy"][idx % 3],
  },
  score: Math.floor(Math.random() * 100),
  timeTaken: 45 + idx * 10,
  submittedAt: new Date(Date.now() - idx * 1000 * 60 * 60 * 24),
}));

export default function MyQuizzes() {
  const [activeTab, setActiveTab] = useState("created");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isFetched, error } = useGetUserQuizzes();
  const userQuizzes = data?.data?.quizzes;

  if (isLoading || !isFetched)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );

  if (error) {
    console.log(error);
    return <div className="mx-auto">{error.message}</div>;
  }

  const filteredCreated = userQuizzes.filter(
    (q) =>
      (!category || q.category === category) &&
      (!difficulty || q.difficulty === difficulty)
  );

  const filteredAttempted = attemptedQuizzes.filter(
    (s) =>
      (!category || s.quiz.category === category) &&
      (!difficulty || s.quiz.difficulty === difficulty)
  );

  return (
    <div className="space-y-6">
      {/* Toggle Tabs */}
      <QuizTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <CategoryFilter selected={category} onChange={setCategory} />
        <DifficultyFilter selected={difficulty} onChange={setDifficulty} />
      </div>

      {/* Content */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {activeTab === "created"
          ? filteredCreated.map((quiz) => (
              <CreatedQuizCard
                key={quiz._id}
                quiz={quiz}
                onEdit={(q) => console.log("Edit", q)}
                onDelete={(q) => console.log("Delete", q)}
                onDetails={(q) =>
                  navigate(`/app/my-quizzes/created-quizzes/${q._id}`)
                }
                onToggleStatus={(q) => console.log("Toggle Active", q)}
              />
            ))
          : filteredAttempted.map((submission) => (
              <AttemptedQuizCard
                key={submission._id}
                submission={submission}
                onClick={() =>
                  navigate(
                    `/app/my-quizzes/attempted-quizzes/${submission._id}`
                  )
                }
              />
            ))}
      </div>
    </div>
  );
}
