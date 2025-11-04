const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Tough'],
  },
  youtubeLink: {
    type: String,
    trim: true,
  },
  practiceLink: {
    type: String,
    trim: true,
  },
  articleLink: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Problem', ProblemSchema);