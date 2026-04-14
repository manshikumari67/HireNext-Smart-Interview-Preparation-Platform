const Question = require('../models/Question');
const Answer = require('../models/Answer');
const generateQA = require('../services/generateQA');

// ==================== HELPER ====================
const normalizeTopic = (topic) => {
  const map = {
    javascript: "JavaScript",
    react: "React",
    dbms: "DBMS",
    "database management system": "DBMS",
    html: "HTML",
    "system design": "System Design",
    "computer networks": "Computer Networks",
    "computer-networks": "Computer Networks"
  };

  return map[topic?.toLowerCase()] || topic;
};

// ==================== GET QUESTIONS BY TOPIC ====================
exports.getQuestionsByTopic = async (req, res) => {
  try {
    let { topic } = req.params;

    // ✅ normalize
    topic = normalizeTopic(topic);
    console.log("🔥 FINAL TOPIC:", topic);

    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    const validTopics = [
      'JavaScript',
      'React',
      'DBMS',
      'System Design',
      'HTML',
      'Computer Networks'
    ];

    if (!validTopics.includes(topic)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid topic' 
      });
    }

    // ==================== DB QUESTIONS ====================
    const questions = await Question.find({ topic, isAI: false })
      .populate('author', 'name _id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    let finalQuestions = [...questions];

    // ==================== AI QUESTIONS ====================
    if (finalQuestions.length < limit) {
      console.log("🤖 Fetching AI questions for:", topic);

      const aiQuestions = await generateQA(
        topic,
        limit - finalQuestions.length
      );

      // console.log("🤖 AI COUNT:", aiQuestions.length);

      const formattedAI = aiQuestions.map((q, index) => ({
        _id: `ai-${index}`, // important for React key
        question: q.question,
        answer: q.answer,
        topic,
        isAI: true,
        author: { name: "AI" }
      }));

      finalQuestions = [...finalQuestions, ...formattedAI];
    }

    const total = await Question.countDocuments({ topic, isAI: false });

    res.status(200).json({
      success: true,
      message: 'Questions fetched successfully',
      data: finalQuestions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get questions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching questions',
      error: error.message
    });
  }
};

// ==================== GET SINGLE QUESTION ====================
exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name _id');

    if (!question) {
      return res.status(404).json({ 
        success: false,
        message: 'Question not found' 
      });
    }

    const answers = await Answer.find({ questionId: id })
      .populate('author', 'name _id')
      .sort({ likes: -1 });

    res.status(200).json({
      success: true,
      question,
      answers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== CREATE QUESTION ====================
exports.createQuestion = async (req, res) => {
  try {
    let { question, topic } = req.body;
    const userId = req.user.userId;

    topic = normalizeTopic(topic);

    const newQuestion = new Question({
      question,
      topic,
      author: userId,
      answer: "",
      isAI: false
    });

    await newQuestion.save();
    await newQuestion.populate('author', 'name _id');

    res.status(201).json({
      success: true,
      data: newQuestion,
      message: 'Question created'
    });

    // 🔥 AI background
    (async () => {
      try {
        const ai = await generateQA(topic, 1);

        if (ai.length > 0) {
          await Question.findByIdAndUpdate(newQuestion._id, {
            answer: ai[0].answer
          });
        }
      } catch (err) {
        console.error("AI error:", err.message);
      }
    })();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== UPDATE ====================
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const userId = req.user.userId;

    const existing = await Question.findById(id);

    if (!existing) return res.status(404).json({ message: "Not found" });

    if (existing.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Question.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== DELETE ====================
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const question = await Question.findById(id);

    if (!question) return res.status(404).json({ message: "Not found" });

    if (question.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Question.findByIdAndDelete(id);
    await Answer.deleteMany({ questionId: id });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== GET ALL ====================
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isAI: false })
      .populate('author', 'name _id')
      .sort({ createdAt: -1 });

    for (let q of questions) {
      const answers = await Answer.find({ questionId: q._id })
        .populate('author', 'name _id');

      q._doc.answers = answers;
    }

    res.json({ data: questions });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};