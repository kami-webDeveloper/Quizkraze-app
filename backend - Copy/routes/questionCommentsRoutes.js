const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/:id/comments")
  .post(commentController.createComment)
  .get(commentController.getComments);

router.post("/comments/:id/like", commentController.likeComment);

router.post("/batch-create", questionController.batchCreateQuestions);

module.exports = router;
