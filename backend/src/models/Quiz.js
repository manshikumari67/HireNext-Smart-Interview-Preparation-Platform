
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide a question'],
      trim: true
    },
    options: {
      type: [String],
      required: [true, 'Please provide options'],
      validate: {
        validator: function(v) {
          return v.length === 4;
        },
        message: 'Quiz must have exactly 4 options'
      }
    },
    correctAnswer: {
      type: Number,
      required: [true, 'Please provide correct answer index'],
      min: 0,
      max: 3
    },
    explanation: {
      type: String,
      required: false
    },
    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      enum: ['JavaScript', 'React', 'DBMS', 'Node.js', 'MongoDB', 'System Design'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
quizSchema.index({ topic: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
