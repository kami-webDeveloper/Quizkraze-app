import QuizCard from "./QuizCard";
import { useNavigate } from "react-router-dom";

const topQuizzes = [
  {
    id: "1",
    title: "Leadership Skills Quiz",
    description:
      "Evaluate your leadership qualities and decision-making style.",
    difficulty: "intermediate",
    time: "8 min",
  },
  {
    id: "2",
    title: "World History Challenge",
    description:
      "Test your knowledge on major events and ancient civilizations.",
    difficulty: "advanced",
    time: "10 min",
  },
  {
    id: "3",
    title: "SAT Math Practice",
    description: "Sharpen your algebra, geometry, and problem-solving skills.",
    difficulty: "medium",
    time: "7 min",
  },
];

export default function TopQuizzes() {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-20 transition-colors duration-300 bg-slate-50 dark:bg-gray-950 md:px-12">
      <div className="mx-auto mb-12 text-center max-w-7xl">
        <h2 className="flex items-center justify-center gap-2 mb-4 text-3xl font-bold md:text-4xl text-slate-800 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 stroke-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
          <span className="text-orange-600">Top</span> Quizzes This Week
        </h2>
        <p className="max-w-xl mx-auto text-base text-slate-600 dark:text-slate-300">
          Dive into our most popular quizzes curated by educators and experts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-3 max-w-7xl">
        {topQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            title={quiz.title}
            description={quiz.description}
            difficulty={quiz.difficulty}
            time={quiz.time}
            onClick={() => navigate(`/auth/login`)}
          />
        ))}
      </div>
    </section>
  );
}
