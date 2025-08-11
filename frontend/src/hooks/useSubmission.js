import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/submissionApi";
import { showError, showSuccess } from "../ui/toasts";
import { useNavigate } from "react-router-dom";

export function useGetUserSubmissions(id) {
  return useQuery({
    queryKey: ["current-user-submissions", id],
    queryFn: () => api.getUserSubmissions(id),
    enabled: !!id,
  });
}

export function useSubmitQuiz(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerData) => api.submitQuiz(id, answerData),
    onSuccess: (data) => {
      const submissionId = data?.data?.submission._id;

      queryClient.invalidateQueries(["current-user-submissions", id]);
      queryClient.invalidateQueries(["quiz", { id, includeAnswers: true }]);
      queryClient.invalidateQueries(["quiz", { id, includeAnswers: false }]);
      queryClient.invalidateQueries(["quizzes"]);

      navigate(`/app/my-quizzes/attempted-quizzes/${submissionId}`);

      showSuccess("Quiz submitted successfully!");
    },
    onError(err) {
      console.error(err);

      showError(err.message || "Failed to submit the quiz!");
    },
  });
}

export function useGetSubmission(id) {
  return useQuery({
    queryKey: ["get-submission", id],
    queryFn: () => api.getSubmission(id),
    enabled: !!id,
  });
}

export function useGetQuizSubmissions(id) {
  return useQuery({
    queryKey: ["quiz-submissions", id],
    queryFn: () => api.getQuizSubmissions(id),
    enabled: !!id,
  });
}

export function useDeleteSubmission(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.deleteSubmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["quiz-submissions", id]);

      showSuccess("Submission deleted successfully.");
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to delete submission!");
    },
  });
}
