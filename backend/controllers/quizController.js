const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const notFoundError = (req) =>
  new AppError(`Quiz not found with id: ${req.params.id}`, 404);

// Create quiz
exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, description, category, difficulty, timelimit, questions } =
    req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return next(new AppError("Quiz must include at least one question!", 400));
  }
  if (!title) {
    return next(new AppError("Quiz must have a title"));
  }

  // Validate questions
  for (const question of questions) {
    const { questionText, options, correctAnswer } = question;
    if (
      !questionText ||
      !Array.isArray(options) ||
      options.length !== 4 ||
      typeof correctAnswer !== "number" ||
      correctAnswer < 0 ||
      correctAnswer > 3
    ) {
      return next(
        new AppError(
          "Each question must include valid text, 4 options, and correctAnswer (0–3).",
          400
        )
      );
    }
  }

  // Create all questions at once for performance
  const createdQuestions = await Question.insertMany(questions);

  // Create quiz
  const newQuiz = await Quiz.create({
    title,
    description,
    category,
    difficulty,
    timelimit,
    questions: createdQuestions.map((q) => q._id),
    createdBy: req.user._id,
  });

  res.status(201).json({ status: "success", data: { quiz: newQuiz } });
});

// Get single quiz by id
exports.getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate("createdBy", "username email")
    .populate("participants", "username email")
    .lean();

  if (!quiz) return next(notFoundError(req));

  const isOwner =
    req.user && quiz.createdBy._id.toString() === req.user._id.toString();
  const includeAnswers = req.query.includeAnswers === "true" && isOwner;

  const questionFields = includeAnswers ? "" : "-correctAnswer -explanation";
  const populatedQuestions = await Question.find({
    _id: { $in: quiz.questions },
  })
    .select(questionFields)
    .lean();

  quiz.questions = populatedQuestions;

  res.status(200).json({ status: "success", data: { quiz } });
});

// Get all quizes
exports.getAllQuizzes = async (req, res) => {
  const features = new APIFeatures(
    Quiz.find({ createdBy: { $ne: req.user._id } }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .search(["title", "description"]);

  // Clone the query to count results before pagination
  const countQuery = features.query.clone();
  const totalResults = await countQuery.countDocuments();

  // pagination
  features.paginate();
  const quizzes = await features.query
    .populate("createdBy", "username")
    .populate("participants", "_id");

  const limit = Number(req.query.limit) || 9;
  const totalPages = Math.ceil(totalResults / limit);
  const currentPage = Number(req.query.page) || 1;

  res.status(200).json({
    status: "success",
    results: quizzes.length,
    totalResults,
    totalPages,
    currentPage,
    data: quizzes,
  });
};

// Get current user's created quizzes
exports.getUserCreatedQuizzes = catchAsync(async (req, res, next) => {
  if (req.params.id !== String(req.user._id))
    return next(
      new AppError("You are not allowed to get other users created quizzes")
    );

  const quizzes = await Quiz.find({ createdBy: req.params.id });

  res
    .status(200)
    .json({ status: "success", results: quizzes.length, data: { quizzes } });
});

// Updating a with id
exports.updateQuiz = catchAsync(async (req, res, next) => {
  const allowedProperties = [
    "title",
    "description",
    "category",
    "difficulty",
    "timelimit",
    "isActive",
    "questions",
  ];

  const updates = {};

  for (const property of allowedProperties) {
    if (req.body[property] !== undefined)
      updates[property] = req.body[property];
  }

  const updatedQuiz = await Quiz.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id,
    },
    updates,
    { new: true, runValidators: true }
  ).populate("questions");

  if (!updatedQuiz) return next(notFoundError(req));

  res.status(200).json({ status: "success", data: { quiz: updatedQuiz } });
});

// Deleting quiz by id
exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!quiz) return next(notFoundError(req));

  res.status(200).json({
    status: "success",
    message: "Quiz deleted successfully",
  });
});
