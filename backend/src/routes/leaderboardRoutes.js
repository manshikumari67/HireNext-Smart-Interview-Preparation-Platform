
const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// ==================== GET GLOBAL LEADERBOARD (NO AUTH) ====================
router.get('/', leaderboardController.getLeaderboard);

// Protected route - require authentication
router.use(authenticate);

// ==================== GET USER RANK ====================
router.get('/user/rank', leaderboardController.getUserRank);

module.exports = router;
