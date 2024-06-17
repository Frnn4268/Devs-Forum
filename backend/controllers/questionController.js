import Question from "../model/question.js";
import Reply from "../model/reply.js";

const askQuestion = async (req, res) => {
  const { question, description, userId, tags } = req.body;
  try {
    const newQuestion = await Question.create({
      question,
      description,
      author: userId,
      tags,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const answerQuestion = async (req, res) => {
  const { answer, userId } = req.body;
  const { id: questionId } = req.params;
  try {
    const reply = await Reply.create({ reply: answer, author: userId });
    const findQuestion = await Question.findById(questionId);
    const addReply = await findQuestion.updateOne({
      $push: { replies: reply._id },
    });
    return res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const upvoteQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.upvote.includes(userId)) {
      return res.status(400).json({ message: "You have already upvoted" });
    }

    if (findQuestion.downvote.includes(userId)) {
      await findQuestion.updateOne({
        $pull: { downvote: userId },
      });
    }

    await findQuestion.updateOne({
      $push: { upvote: userId },
    });
    return res.status(200).json({ message: "Upvoted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const downvoteQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.downvote.includes(userId)) {
      return res.status(400).json({ message: "You have already downvoted" });
    }

    if (findQuestion.upvote.includes(userId)) {
      await findQuestion.updateOne({
        $pull: { upvote: userId },
      });
    }

    await findQuestion.updateOne({
      $push: { downvote: userId },
    });
    return res.status(200).json({ message: "Downvoted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserQuestions = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const questions = await Question.find({ author: userId })
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const findQuestionsByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const questions = await Question.find({
      tags: {
        $in: [topic],
      },
    })
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  askQuestion,
  answerQuestion,
  getQuestions,
  upvoteQuestion,
  downvoteQuestion,
  getUserQuestions,
  findQuestionsByTopic,
};
