const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Comment must be related to a question"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must be published by a user"],
    },
    text: {
      type: String,
      required: [true, "Comment must provide text or content"],
      minlength: 1,
      maxlength: 1000,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
