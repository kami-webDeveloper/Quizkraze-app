import { useMutation } from "@tanstack/react-query";
import * as api from "../api/questionApi";
import { showError, showSuccess } from "../ui/toasts";

export function useBatchCreateQuestions() {
  return useMutation({
    mutationFn: (data) => api.batchCreateQuestions(data),
    onSuccess: () => {
      showSuccess("Questions created successfully");
    },
    onError: (err) => {
      showError(err.message || "Failed to edit the quiz!");
    },
  });
}
