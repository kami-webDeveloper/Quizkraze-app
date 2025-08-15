import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

export const batchCreateQuestions = (questions) =>
  request(
    `/api/v1/questions/batch-create`,
    buildPostOptions(questions),
    "Failed to batch questions!"
  );
