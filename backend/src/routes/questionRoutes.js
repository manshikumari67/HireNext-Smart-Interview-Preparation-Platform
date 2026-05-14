const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');
const authenticate = require('../middleware/authenticate');

// ==================== PUBLIC ROUTES ====================
router.get('/', questionController.getAllQuestions);

// Get single question
router.get('/detail/:id', questionController.getQuestion);

// Get questions by topic
router.get('/:topic', questionController.getQuestionsByTopic);


// ==================== PROTECTED ROUTES ====================

// Create question
router.post('/', authenticate, questionController.createQuestion);

// Update question
router.put('/:id', authenticate, questionController.updateQuestion);

// Delete question
router.delete('/:id', authenticate, questionController.deleteQuestion);


module.exports = router;