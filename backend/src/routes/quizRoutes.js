const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quizController');
const authenticate = require('../middleware/authenticate');

// ==================== PUBLIC ROUTE ====================

// Get quiz by topic
router.get('/:topic', quizController.getQuizByTopic);


// ==================== PROTECTED ROUTES ====================

// Submit quiz
router.post('/submit', authenticate, quizController.submitQuiz);

// Get all user quiz results
router.get('/results/list', authenticate, quizController.getUserResults);

// Get single result detail
router.get('/result/:resultId', authenticate, quizController.getResultDetail);


module.exports = router;