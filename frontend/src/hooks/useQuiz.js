import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/quizApi";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../ui/toasts";

export function useGetAllQuizzes({
  category,
  difficulty,
  sortBy,
  page,
  onlyActive,
}) {
  return useQuery({
    queryKey: ["quizzes", category, difficulty, sortBy, page, onlyActive],
    queryFn: () =>
      api.getAllQuizzes({ category, difficulty, sortBy, page, onlyActive }),
    keepPreviousData: true,
  });
}

export function useGetUserCreatedQuizzes(id) {
  return useQuery({
    queryKey: ["user-quizzes", id],
    queryFn: () => api.getUserCreatedQuizzes(id),
    enabled: !!id,
  });
}

export function useGetQuiz(id, includeAnswers = false) {
  return useQuery({
    queryKey: ["quiz", { id, includeAnswers }],
    queryFn: () => api.getQuiz(id, includeAnswers),
    enabled: !!id,
  });
}

export function useUpdateQuiz(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => api.updateQuiz(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["quizzes"]);
      queryClient.invalidateQueries(["quiz", id]);

      showSuccess("Quiz updated successfully!");

      navigate(`/app/my-quizzes/created-quizzes/${id}`);
    },
    onError: (err) => {
      showError(err.message || "Failed to update quiz!");
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: (id) => api.deleteQuiz(id),
    onSuccess: (_, id) => {
      const isOnDetailsPage = matchPath(
        "/app/my-quizzes/created-quizzes/:quizId",
        location.pathname
      );

      if (isOnDetailsPage && location.pathname.includes(id)) {
        navigate("/app/my-quizzes/created-quizzes");
      }

      queryClient.invalidateQueries(["quizzes"]);
      showSuccess("Quiz successfully deleted!");
    },
    onError: (err) => {
      showError(err.message || "Failed to delete quiz!");
    },
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => api.createQuiz(data),
    onSuccess: (data) => {
      const quiz = data?.data?.quiz;

      queryClient.invalidateQueries(["quizzes"]);

      showSuccess("Quiz successfully created!");

      navigate(`/app/my-quizzes/created-quizzes/${quiz._id}`);
    },
    onError: (err) => {
      showError(err.message || "Failed to create quiz!");
    },
  });
}

export function useToggleQuizStatus(fixedQuizId = null, fixedUserId = null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input) => {
      const quizId = typeof input === "object" ? input.quizId : fixedQuizId;
      const isActive = typeof input === "object" ? input.isActive : input;

      if (!quizId) throw new Error("Quiz ID is required for toggling status");

      return api.updateQuiz(quizId, { isActive });
    },
    onSuccess: (_, input) => {
      const quizId = typeof input === "object" ? input.quizId : fixedQuizId;
      const userId = typeof input === "object" ? input.userId : fixedUserId;

      queryClient.invalidateQueries(["quiz", quizId]);
      if (userId) queryClient.invalidateQueries(["quizzes", userId]);
    },
    onError: (err) => {
      console.error(err.message || "Failed to toggle quiz status.");
      showError("Failed to Activate/Deactivate the quiz!");
    },
  });
}
