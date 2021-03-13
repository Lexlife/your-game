const mongoose = require('mongoose');

module.exports = mongoose.model('Theme', {
  title: String,
});
