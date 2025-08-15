import buildGetOptions from "../utils/buildGetOption";
import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

const API_URL = import.meta.env.VITE_API_TARGET;

export const getAllQuizzes = ({
  category,
  difficulty,
  sortBy,
  page,
  onlyActive,
}) => {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (difficulty) params.append("difficulty", difficulty);

  if (sortBy === "newest") params.append("sort", "-createdAt");
  else if (sortBy === "oldest") params.append("sort", "createdAt");
  else if (sortBy === "popular") params.append("sort", "-participants");

  if (page) params.append("page", page);

  params.append("limit", 9);

  // ✅ Add active filter for public feed only
  if (onlyActive) params.append("isActive", "true");

  return request(
    `${API_URL}/api/v1/quizzes?${params.toString()}`,
    buildGetOptions,
    "Failed to fetch quizzes!"
  );
};

export const getUserCreatedQuizzes = (id) =>
  request(
    `${API_URL}/api/v1/quizzes/user-created-quizzes/${id}`,
    buildGetOptions,
    "Failed to fetch user quizzes"
  );

export const getQuiz = (id, includeAnswers = false) =>
  request(
    `${API_URL}/api/v1/quizzes/${id}${
      includeAnswers ? "?includeAnswers=true" : ""
    }`,
    buildGetOptions,
    "Failed to fetch the quiz!"
  );

export const updateQuiz = (id, data) =>
  request(
    `${API_URL}/api/v1/quizzes/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    },
    "Failed to update the quiz!"
  );

export const deleteQuiz = (id) =>
  request(
    `${API_URL}/api/v1/quizzes/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    "Failed to delete the quiz!"
  );

export const createQuiz = (data) =>
  request(
    `${API_URL}/api/v1/quizzes/create-quiz`,
    buildPostOptions(data),
    "Failed to create quiz!"
  );
