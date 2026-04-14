/**
 * Leaderboard Controller
 * Handles leaderboard operations
 */

const User = require('../models/User');

// ==================== GET LEADERBOARD ====================
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    // Get top users by score
    const leaderboard = await User.find({ isEmailVerified: true })
      .sort({ score: -1, averageScore: -1 })
      .limit(limit)
      .select('name email score totalQuizzesTaken averageScore createdAt');

    // Add rank
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      email: user.email,
      score: user.score,
      totalQuizzesTaken: user.totalQuizzesTaken,
      averageScore: user.averageScore,
      createdAt: user.createdAt
    }));

    res.status(200).json({
      success: true,
      message: 'Leaderboard fetched successfully',
      data: rankedLeaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching leaderboard',
      error: error.message
    });
  }
};

// ==================== GET USER RANK ====================
exports.getUserRank = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Calculate rank
    const usersAbove = await User.countDocuments({
      isEmailVerified: true,
      $or: [
        { score: { $gt: user.score } },
        { score: user.score, averageScore: { $gt: user.averageScore } }
      ]
    });

    const rank = usersAbove + 1;

    res.status(200).json({
      success: true,
      message: 'User rank fetched',
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        score: user.score,
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore,
        rank
      }
    });
  } catch (error) {
    console.error('Get user rank error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching user rank',
      error: error.message
    });
  }
};
