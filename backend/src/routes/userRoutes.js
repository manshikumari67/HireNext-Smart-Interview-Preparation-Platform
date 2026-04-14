const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

// ==================== PROTECTED ROUTES ====================

// Get user profile
router.get('/profile', authenticate, userController.getUserProfile);

// Update user profile
router.put('/update', authenticate, userController.updateUserProfile);

// Update user stats
router.put('/stats/update', authenticate, userController.updateUserStats);

module.exports = router;