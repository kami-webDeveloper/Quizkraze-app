const Submission = require("../models/submissionModel");
const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a submission
exports.submitQuiz = catchAsync(async (req, res, next) => {
  const { answers: userAnswers, startTime } = req.body;

  // 1. Validate answers array
  if (!userAnswers || !Array.isArray(userAnswers) || userAnswers.length === 0)
    return next(new AppError("Missing or invalid answers array!", 400));

  // 2. Validate startTime
  if (!startTime) return next(new AppError("Missing startTime!", 400));
  const parsedStartTime = new Date(startTime);
  if (isNaN(parsedStartTime.getTime()))
    return next(new AppError("Invalid startTime format", 400));
  if (parsedStartTime > new Date())
    return next(new AppError("Start time cannot be in the future", 400));

  // 3. Validate each answer's format
  for (const ans of userAnswers) {
    if (
      typeof ans.questionIndex !== "number" ||
      ans.questionIndex < 0 ||
      (ans.selectedOption !== null &&
        (typeof ans.selectedOption !== "number" ||
          ans.selectedOption < 0 ||
          ans.selectedOption > 3))
    )
      return next(
        new AppError(
          "Each answer must have valid questionIndex and selectedOption (0–3).",
          400
        )
      );
  }

  // 4. Find the quiz
  const quiz = await Quiz.findById(req.params.id).select(
    "questions createdBy participants timelimit"
  );
  if (!quiz) return next(new AppError("Quiz not found", 404));

  // 5. Prevent quiz author from submitting
  if (String(quiz.createdBy) === String(req.user._id))
    return next(new AppError("Authors cannot submit their own quiz", 403));

  // 6. Get questions ordered exactly as in quiz
  const questions = await Question.find({ _id: { $in: quiz.questions } })
    .select("_id correctAnswer")
    .lean();

  const orderedQuestions = quiz.questions.map((id) =>
    questions.find((q) => String(q._id) === String(id))
  );
  if (orderedQuestions.includes(undefined))
    return next(new AppError("Some questions are missing from the quiz", 500));

  // 7. Calculate time taken
  const submittedAt = new Date();
  const timeTaken = Math.floor((submittedAt - parsedStartTime) / 1000);

  // 8. Check time limit and set exceededTime flag
  let exceededTime = false;

  if (quiz.timelimit && !isNaN(Number(quiz.timelimit))) {
    const limitMinutes = Number(quiz.timelimit);

    if (limitMinutes > 0) {
      const limitSeconds = limitMinutes * 60;

      if (timeTaken > limitSeconds) exceededTime = true;
    }
  }

  // 9. Calculate score (only if within time limit)
  let score = 0;
  if (!exceededTime) {
    orderedQuestions.forEach((question, index) => {
      const userAnswer = userAnswers.find((ans) => ans.questionIndex === index);
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        score++;
      }
    });

    // Calculate percentage score out of 100
    score = Math.round((score / orderedQuestions.length) * 100);
  }

  // 10. Map userAnswers to match schema: replace questionIndex with question ObjectId
  const mappedAnswers = userAnswers.map(
    ({ questionIndex, selectedOption }) => ({
      question: orderedQuestions[questionIndex]._id,
      selectedOption,
    })
  );

  // Prevent duplicate submissions
  const existingSubmission = await Submission.findOne({
    user: req.user._id,
    quiz: req.params.id,
  });

  if (existingSubmission)
    return next(new AppError("You have already submitted this quiz", 409));

  // 11. Save the submission
  let newSubmission;
  try {
    newSubmission = await Submission.create({
      user: req.user._id,
      quiz: req.params.id,
      answers: mappedAnswers,
      score,
      timeTaken,
      startTime: parsedStartTime,
      endTime: submittedAt,
    });
  } catch (err) {
    throw err;
  }

  // 12. Add user to participants if not present
  if (!quiz.participants.some((p) => String(p) === String(req.user._id))) {
    quiz.participants.push(req.user._id);
    await quiz.save();
  }

  // 13. Return response
  res.status(201).json({
    status: "success",
    data: {
      submission: newSubmission,
      exceededTime,
    },
  });
});

// Get user submissions
exports.getUserSubmissions = catchAsync(async (req, res, next) => {
  if (req.params.id !== String(req.user._id))
    return next(
      new AppError("You are not allowed to access this content!", 403)
    );

  const submissions = await Submission.find({ user: req.params.id }).populate(
    "quiz",
    "title category difficulty"
  );

  res.status(200).json({ status: "success", data: { submissions } });
});

// Get submission by submission id
exports.getSubmissionById = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id)
    .populate("quiz", "title category difficulty createdBy")
    .populate("user", "username email")
    .populate({
      path: "answers.question",
      select: "questionText options correctAnswer explanation averageTime",
    });

  if (!submission) return next(new AppError("Submission not found", 404));

  // check only submit owner can get the submission
  if (String(submission.user._id) !== String(req.user._id))
    return next(new AppError("You are not allowed to take this action", 403));

  res.status(200).json({ status: "success", data: { submission } });
});

// Get submissions of a quiz
exports.getQuizSubmissions = catchAsync(async (req, res, next) => {
  const targetQuiz = await Quiz.findById(req.params.id);

  if (!targetQuiz) return next(new AppError("Quiz not found!", 404));

  // Check only quiz author can view submissions
  if (String(targetQuiz.createdBy) !== String(req.user._id))
    return next(new AppError("Only quiz author can see the submissions", 403));

  const submissions = await Submission.find({
    quiz: req.params.id,
  }).populate("user", "username email");

  res.status(200).json({ status: "success", data: { submissions } });
});

// Delete submission (allowed for author)
exports.deleteSubmission = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id)
    .populate("quiz", "title createdBy participants")
    .populate("user", "_id username");

  if (!submission) return next(new AppError("Submission not found!", 404));

  // Checking if user is author of the quiz
  if (String(req.user._id) !== String(submission.quiz.createdBy))
    return next(
      new AppError("Only quiz auhtor is allowed to delete a submission!", 403)
    );

  // Remove user from participants
  submission.quiz.participants = submission.quiz.participants.filter(
    (participant) => String(participant) !== submission.user._id
  );

  await submission.quiz.save();

  await submission.deleteOne();

  res.status(200).json({
    status: "success",
    message: `Submission of user:<${submission.user.username}> deleted from Quiz:${submission.quiz.title}`,
  });
});
