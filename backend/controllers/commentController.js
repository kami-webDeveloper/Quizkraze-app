const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Creating comment on a question by getting question id from params
exports.createComment = catchAsync(async (req, res, next) => {
  const question = req.params.id;
  const user = req.user;
  const { text, parentComment } = req.body;

  if (!text)
    return next(new AppError("Please provide a text for comment", 400));

  //   Checking if replying
  if (parentComment) {
    const parentExist = await Comment.findById(parentComment);

    if (!parentExist)
      return next(new AppError("Parent comment not found", 404));
  }

  const comment = await Comment.create({
    question,
    user,
    text,
    parentComment: parentComment || null,
  });

  res.status(201).json({ status: "success", data: { comment } });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ question: req.params.id })
    .populate("parentComment")
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  const commentsWithLikedFlag = comments.map((comment) => {
    const likedByUser = req.user
      ? comment.likes.some((id) => String(id) === String(req.user._id))
      : false;
    return {
      ...comment.toObject(),
      likedByUser,
    };
  });

  res.status(200).json({
    status: "success",
    data: { comments: commentsWithLikedFlag },
  });
});

exports.likeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return next(new AppError("Comment not found", 404));

  // Checking if user already liked comment
  const hasLiked = comment.likes.some(
    (id) => String(id) === String(req.user._id)
  );

  // Like/Unlike toggle
  if (hasLiked)
    comment.likes = comment.likes.filter(
      (id) => String(id) !== String(req.user._id)
    );
  else comment.likes.push(req.user._id);

  await comment.save();

  res.status(201).json({
    status: "success",
    message: hasLiked ? "Comment unliked" : "Comment liked",
    data: { likes: comment.likes.length },
  });
});
