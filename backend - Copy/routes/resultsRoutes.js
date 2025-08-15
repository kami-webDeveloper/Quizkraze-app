const express = require("express");
const authController = require("../controllers/authController");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.use(authController.protect);

router.get("/user-submissions/:id", submissionController.getUserSubmissions);

router.post("/submit-quiz/:id", submissionController.submitQuiz);

router.get("/submission/:id", submissionController.getSubmissionById);

router.get("/quiz-submissions/:id", submissionController.getQuizSubmissions);

router.delete("/delete-submission/:id", submissionController.deleteSubmission);

module.exports = router;
