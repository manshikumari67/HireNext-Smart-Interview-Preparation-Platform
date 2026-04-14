/**
 * User Controller
 * Handles user profile operations
 */

const User = require('../models/User');

// ==================== GET USER PROFILE ====================
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        score: user.score,
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching profile',
      error: error.message
    });
  }
};

// ==================== UPDATE USER PROFILE ====================
exports.updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { name, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        score: user.score,
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error updating profile',
      error: error.message
    });
  }
};

// ==================== UPDATE USER STATS ====================
exports.updateUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { score, totalQuizzesTaken, averageScore } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        score,
        totalQuizzesTaken,
        averageScore,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stats updated successfully',
      user: {
        id: user._id,
        score: user.score,
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore
      }
    });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error updating stats',
      error: error.message
    });
  }
};
