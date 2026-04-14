
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// ==================== CREATE ANSWER ====================
exports.createAnswer = async (req, res) => {
  try {
    const { answer, questionId } = req.body;
    const userId = req.user.userId;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ 
        success: false,
        message: 'Question not found' 
      });
    }

    // Create answer
    const newAnswer = new Answer({
      answer,
      questionId,
      author: userId
    });

    await newAnswer.save();
    await newAnswer.populate('author', 'name');

    // Increment answer count
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answersCount: 1 } }
    );

    res.status(201).json({
      success: true,
      message: 'Answer posted successfully',
      data: newAnswer
    });
  } catch (error) {
    console.error('Create answer error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error creating answer',
      error: error.message
    });
  }
};

// ==================== GET ANSWERS FOR QUESTION ====================
exports.getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ questionId })
      .populate('author', 'name')
      .sort({ isAccepted: -1, likes: -1 });

    res.status(200).json({
      success: true,
      message: 'Answers fetched successfully',
      data: answers
    });
  } catch (error) {
    console.error('Get answers error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching answers',
      error: error.message
    });
  }
};

// ==================== LIKE/UNLIKE ANSWER ====================
exports.likeAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ 
        success: false,
        message: 'Answer not found' 
      });
    }

    // Check if user already liked
    const alreadyLiked = answer.likedBy.includes(userId);

    if (alreadyLiked) {
      // Unlike
      answer.likes -= 1;
      answer.likedBy = answer.likedBy.filter(id => id.toString() !== userId);
    } else {
      // Like
      answer.likes += 1;
      answer.likedBy.push(userId);
    }

    await answer.save();
    await answer.populate('author', 'name');

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Answer unliked' : 'Answer liked',
      data: answer
    });
  } catch (error) {
    console.error('Like answer error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error liking answer',
      error: error.message
    });
  }
};

// ==================== DELETE ANSWER ====================
exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ 
        success: false,
        message: 'Answer not found' 
      });
    }

    if (answer.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this answer' 
      });
    }

    // Get question ID for updating
    const questionId = answer.questionId;

    // Delete answer
    await Answer.findByIdAndDelete(id);

    // Decrement answer count
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answersCount: -1 } }
    );

    res.status(200).json({
      success: true,
      message: 'Answer deleted successfully'
    });
  } catch (error) {
    console.error('Delete answer error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error deleting answer',
      error: error.message
    });
  }
};

// ==================== MARK ANSWER AS ACCEPTED ====================
exports.markAsAccepted = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ 
        success: false,
        message: 'Answer not found' 
      });
    }

    // Verify user is question author
    const question = await Question.findById(answer.questionId);
    if (question.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Only question author can mark answer as accepted' 
      });
    }

    answer.isAccepted = !answer.isAccepted;
    await answer.save();
    await answer.populate('author', 'name');

    res.status(200).json({
      success: true,
      message: answer.isAccepted ? 'Answer marked as accepted' : 'Answer unmarked',
      data: answer
    });
  } catch (error) {
    console.error('Mark accepted error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error marking answer',
      error: error.message
    });
  }
};
