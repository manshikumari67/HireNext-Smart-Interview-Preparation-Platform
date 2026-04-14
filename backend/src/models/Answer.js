
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, 'Please provide an answer'],
      trim: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
    isAccepted: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
answerSchema.index({ questionId: 1, likes: -1 });

module.exports = mongoose.model('Answer', answerSchema);
