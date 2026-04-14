const Question = require('../models/DiscussionQuestion');
const Answer = require('../models/DiscussionAnswer');

// CREATE QUESTION
exports.createQuestion = async (req, res) => {
  try {
    const q = await Question.create({
      question: req.body.question,
      author: req.user.userId
    });

    await q.populate('author', 'name');

    res.status(201).json({ success: true, data: q });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL QUESTIONS (WITH ANSWERS)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('author', 'name _id')
      .sort({ createdAt: -1 });

    for (let q of questions) {
      const answers = await Answer.find({ questionId: q._id })
        .populate('author', 'name');

      q._doc.answers = answers;
    }

    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteQuestion = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);

    if (q.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Question.findByIdAndDelete(req.params.id);
    await Answer.deleteMany({ questionId: req.params.id });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateQuestion = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);

    if (q.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    q.question = req.body.question;
    await q.save();

    res.json({ success: true, data: q });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD ANSWER
exports.addAnswer = async (req, res) => {
  try {
    const ans = await Answer.create({
      answer: req.body.answer,
      questionId: req.body.questionId,
      author: req.user.userId
    });

    await ans.populate('author', 'name');

    res.json({ success: true, data: ans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};