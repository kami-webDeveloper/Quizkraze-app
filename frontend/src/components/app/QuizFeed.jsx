import { useSearchParams, useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";
import CategoryFilter from "./CategoryFilter";
import DifficultyFilter from "./DifficultyFilter";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import { useGetAllQuizzes } from "../../hooks/useQuiz";
import Spinner from "../../ui/Spinner";

export default function QuizFeed() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const sortBy = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useGetAllQuizzes({
    category,
    difficulty,
    sortBy,
    page,
    onlyActive: true,
  });

  const handleChange = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key); // Remove empty filters
    }
    updatedParams.set("page", 1); // Reset page on any filter/sort change
    setSearchParams(updatedParams);
  };

  const handlePageChange = (newPage) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", newPage);
    setSearchParams(updatedParams);
  };

  const handleViewQuiz = (quizId) => navigate(`/app/feed/${quizId}`);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );

  if (error) {
    console.log(error);
    return <div className="mx-auto">{error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
        <div className="flex flex-wrap w-full gap-4 sm:flex-row">
          <CategoryFilter
            selected={category}
            onChange={(val) => handleChange("category", val)}
          />
          <DifficultyFilter
            selected={difficulty}
            onChange={(val) => handleChange("difficulty", val)}
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <SortDropdown
            selected={sortBy}
            onChange={(val) => handleChange("sort", val)}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing {(page - 1) * 9 + 1}–
        {Math.min(page * 9, data?.totalResults || 0)} of {data?.totalResults}{" "}
        results
      </div>

      {/* Quiz Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data?.data?.map((quiz) => (
          <QuizCard
            key={quiz._id}
            title={quiz.title}
            description={quiz.description}
            difficulty={quiz.difficulty}
            category={quiz.category}
            createdBy={quiz.createdBy?.username}
            participants={quiz.participants.length}
            onClick={() => handleViewQuiz(quiz._id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
