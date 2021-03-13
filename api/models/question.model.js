const mongoose = require('mongoose');

module.exports = mongoose.model('Question', {
  theme: String,
  title: String,
  question: String,
  answer: String,
  value: Number,
});
