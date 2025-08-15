import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

const API_URL = import.meta.env.VITE_API_TARGET;

export const batchCreateQuestions = (questions) =>
  request(
    `${API_URL}/api/v1/questions/batch-create`,
    buildPostOptions(questions),
    "Failed to batch questions!"
  );
