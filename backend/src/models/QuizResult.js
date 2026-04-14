
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      enum: ['JavaScript', 'React', 'DBMS', 'Node.js', 'MongoDB', 'System Design']
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    timeTaken: {
      type: Number,
      required: false // Time in seconds
    },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedAnswer: Number,
        isCorrect: Boolean
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
quizResultSchema.index({ userId: 1, createdAt: -1 });
quizResultSchema.index({ userId: 1, topic: 1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
