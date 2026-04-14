const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide a question'], // ✅ MUST
      trim: true
    },

    // ✅ OPTIONAL (AI ke liye)
    answer: {
      type: String,
      trim: true
    },

    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      enum: ['JavaScript', 'React', 'DBMS', 'Node.js', 'MongoDB', 'System Design'],
      trim: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // ✅ NEW (AI vs User differentiate)
    isAI: {
      type: Boolean,
      default: false
    },

    likes: {
      type: Number,
      default: 0
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    views: {
      type: Number,
      default: 0
    },

    answersCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Index for faster queries
questionSchema.index({ topic: 1, createdAt: -1 });

module.exports = mongoose.model('Question', questionSchema);