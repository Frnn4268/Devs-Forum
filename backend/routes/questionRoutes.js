import express from "express";
import {
  askQuestion,
  answerQuestion,
  getQuestions,
  upvoteQuestion,
  downvoteQuestion,
  getUserQuestions,
  findQuestionsByTopic,
} from "../controllers/questionController.js";

const router = express.Router();

// Routes for questionController.js
router.post("/ask-question", askQuestion);
router.post("/answer/:id", answerQuestion);
router.get("/questions", getQuestions);
router.post("/upvote/:id", upvoteQuestion);
router.post("/downvote/:id", downvoteQuestion);
router.get("/my-questions/:id", getUserQuestions);
router.get("/find/:topic", findQuestionsByTopic);

export default router;
