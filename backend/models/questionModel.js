const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: [true, "Question must have a text"] },
  options: {
    type: [String],
    required: [true, "Please provide answer options"],
    validate: [
      (arr) => arr.length === 4,
      "Each question must exactly have 4 options",
    ],
  },
  correctAnswer: {
    type: Number,
    min: 0,
    max: 3,
    required: [true, "Please provide the correct answer of the question"],
  },
  explanation: { type: String },
});

module.exports = mongoose.model("Question", questionSchema);
