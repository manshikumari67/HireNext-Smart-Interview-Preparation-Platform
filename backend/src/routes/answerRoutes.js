const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController');
const authenticate = require('../middleware/authenticate');

// ==================== PUBLIC ROUTE ====================

// Get answers for a question (no login required)
router.get('/:questionId', answerController.getAnswers);


// ==================== PROTECTED ROUTES ====================

// Create answer
router.post('/', authenticate, answerController.createAnswer);

// Like / Unlike answer
router.put('/:id/like', authenticate, answerController.likeAnswer);

// Mark as accepted
router.put('/:id/accept', authenticate, answerController.markAsAccepted);

// Delete answer
router.delete('/:id', authenticate, answerController.deleteAnswer);


module.exports = router;