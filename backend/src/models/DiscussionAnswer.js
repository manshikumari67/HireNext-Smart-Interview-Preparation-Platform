const mongoose = require('mongoose');

const discussionAnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    trim: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscussionQuestion',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('DiscussionAnswer', discussionAnswerSchema);