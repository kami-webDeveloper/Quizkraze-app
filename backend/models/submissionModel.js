const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "Submission must belong to a quiz"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Submission must belong to a user"],
  },
  score: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: Date,
    required: [true, "Submission must have a start time"],
  },
  endTime: {
    type: Date,
    required: true,
  },
  timeTaken: {
    type: Number, // in seconds
    default: 0,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOption: {
        type: Number,
        min: 0,
        max: 3,
        required: false,
      },
    },
  ],
});

submissionSchema.index({ user: 1, quiz: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
