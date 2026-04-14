
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const generateQuiz = require('../services/aiQuizGenerator');

// ==================== GET QUIZ BY TOPIC ====================
exports.getQuizByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    let quiz = await Quiz.find({ topic });

    // 🔥 STEP 1: अगर कम questions हैं → AI से लाओ
    if (quiz.length < limit) {
      const needed = limit - quiz.length;

      console.log(`Need ${needed} more questions from AI`);

      const aiQuestions = await generateQuiz(topic, needed);

      if (aiQuestions.length > 0) {
        const formatted = aiQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          topic
        }));

        await Quiz.insertMany(formatted);

        // DB update होने के बाद फिर fetch
        quiz = await Quiz.find({ topic });
      }
    }

    // 🔥 STEP 2: shuffle + limit
    const shuffled = quiz.sort(() => 0.5 - Math.random());
    const finalQuestions = shuffled.slice(0, limit);

    // 🔥 STEP 3: correctAnswer hide करो
    const safeQuestions = finalQuestions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      topic: q.topic
    }));

    res.status(200).json({
      success: true,
      data: safeQuestions
    });

  } catch (error) {
    console.error("Quiz Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching quiz"
    });
  }
};

// ==================== SUBMIT QUIZ ====================
exports.submitQuiz = async (req, res) => {
  try {
    const { topic, answers, timeTaken } = req.body;
    const userId = req.user.userId;

    // Validate topic
    const validTopics = ['JavaScript', 'React', 'DBMS', 'Node.js', 'MongoDB', 'System Design'];
    if (!validTopics.includes(topic)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid topic' 
      });
    }

    // Fetch quiz questions
    const quizzes = await Quiz.find({ topic });
    if (quizzes.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Quiz not found for this topic' 
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const answerDetails = [];

   // 🔥 Create map (ID based matching)
const quizMap = {};
quizzes.forEach(q => {
  quizMap[q._id.toString()] = q;
});

// 🔥 Correct evaluation
answers.forEach(answer => {
  const quiz = quizMap[answer.questionId];

  if (!quiz) return;

  const isCorrect = quiz.correctAnswer === answer.selectedAnswer;

  if (isCorrect) {
    correctAnswers += 1;
  }

  answerDetails.push({
    questionId: quiz._id,
    selectedAnswer: answer.selectedAnswer,
    isCorrect
  });
});
    const totalQuestions = answers.length;
    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Save result
    const result = new QuizResult({
      userId, 
      topic,
      totalQuestions,
      correctAnswers,
      score,
      percentage,
      timeTaken,
      answers: answerDetails
    });

    await result.save();

    // Update user stats
    const user = await User.findById(userId);
    user.totalQuizzesTaken += 1;
    user.score += score;
    user.averageScore = Math.round(user.score / user.totalQuizzesTaken);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully',
      result: {
        id: result._id,
        topic,
        totalQuestions,
        correctAnswers,
        score,
        percentage,
        timeTaken
      },
      userStats: {
        totalQuizzesTaken: user.totalQuizzesTaken,
        totalScore: user.score,
        averageScore: user.averageScore
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error submitting quiz',
      error: error.message
    });
  }
};

// ==================== GET USER QUIZ RESULTS ====================
exports.getUserResults = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const results = await QuizResult.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await QuizResult.countDocuments({ userId });

    res.status(200).json({
      success: true,
      message: 'Results fetched successfully',
      data: results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching results',
      error: error.message
    });
  }
};

// ==================== GET QUIZ RESULT DETAILS ====================
exports.getResultDetail = async (req, res) => {
  try {
    const { resultId } = req.params;
    const userId = req.user.userId;

    const result = await QuizResult.findById(resultId).populate('userId', 'name email');

    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: 'Result not found' 
      });
    }

    // Check if result belongs to user
    if (result.userId._id.toString() !== userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to view this result' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Result details fetched',
      data: result
    });
  } catch (error) {
    console.error('Get result detail error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching result',
      error: error.message
    });
  }
};
