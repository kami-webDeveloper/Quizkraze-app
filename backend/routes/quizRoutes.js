const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  createQuiz,
  getUserCreatedQuizzes,
} = require("../controllers/quizController");

const router = express.Router();

router.get("/", protect, getAllQuizzes);

router.get("/user-created-quizzes/:id", protect, getUserCreatedQuizzes);

router
  .route("/:id")
  .get(protect, getQuiz)
  .patch(protect, updateQuiz)
  .delete(protect, deleteQuiz);

router.post("/create-quiz", protect, createQuiz);

module.exports = router;
