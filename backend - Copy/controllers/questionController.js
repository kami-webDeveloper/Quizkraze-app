const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.batchCreateQuestions = catchAsync(async (req, res, next) => {
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return next(new AppError("Please provide a list of questions", 400));
  }

  const createdQuestions = await Question.insertMany(questions);

  res.status(201).json({
    status: "success",
    data: {
      questionIds: createdQuestions.map((q) => q._id),
    },
  });
});
