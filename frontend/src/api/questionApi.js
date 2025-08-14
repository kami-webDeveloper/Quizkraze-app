import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:5000" : "";

export const batchCreateQuestions = (questions) =>
  request(
    `${API_BASE_URL}/api/v1/questions/batch-create`,
    buildPostOptions(questions),
    "Failed to batch questions!"
  );
