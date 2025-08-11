import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/commentApi";
import { showError, showSuccess } from "../ui/toasts";

export function useCreateComment(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.createComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });

      showSuccess("Comment posted successfully!");
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to post comment!");
    },
  });
}

export function useGetQuestionComments(id) {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => api.getQuestionComments(id),
    enabled: !!id,
  });
}

export function useToggleCommentLike(questionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => api.likeComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments", questionId],
      }),
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to like/unlike comment.");
    },
  });
}
