import buildGetOptions from "../utils/buildGetOption";
import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

const API_BASE_URL = import.meta.env.VITE_API_TARGET;

export const getUserSubmissions = (id) =>
  request(
    `${API_BASE_URL}/api/v1/results/user-submissions/${id}`,
    buildGetOptions,
    "Failed to fetch user submissions"
  );

export const submitQuiz = (id, answerData) =>
  request(
    `${API_BASE_URL}/api/v1/results/submit-quiz/${id}`,
    buildPostOptions(answerData),
    "Failed to submit quiz!"
  );

export const getSubmission = (id) =>
  request(
    `${API_BASE_URL}/api/v1/results/submission/${id}`,
    buildGetOptions,
    "Failed to get submission!"
  );

export const getQuizSubmissions = (id) =>
  request(
    `${API_BASE_URL}/api/v1/results/quiz-submissions/${id}`,
    buildGetOptions,
    "Failed to get quiz submissions!"
  );

export const deleteSubmission = (id) =>
  request(
    `${API_BASE_URL}/api/v1/results/delete-submission/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    "Failed to delete submission!"
  );
