import buildGetOptions from "../utils/buildGetOption";
import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

export const createComment = (id, commentData) =>
  request(
    `/api/v1/questions/${id}/comments`,
    buildPostOptions(commentData),
    "Failed to post comment!"
  );

export const getQuestionComments = (id) =>
  request(
    `/api/v1/questions/${id}/comments`,
    buildGetOptions,
    "Failed to get comments!"
  );

export const likeComment = (id) =>
  request(
    `/api/v1/questions/comments/${id}/like`,
    { method: "POST", credentials: "include" },
    "Failed to Like/Unlike comment!"
  );
