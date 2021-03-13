const mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
  users: [{
    login: String,
    score: {
      type: Number,
      default: 0,
    },
  }],
  themes: [String],
  isFinished: {
    type: Boolean,
    default: false,
  },
  answeredQuestions: [String],
  question: { type: mongoose.Types.ObjectId, ref: 'Question' },
  questions: [{
    question: {
      type: mongoose.Types.ObjectId,
      ref: 'Question',
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
  }],
});
