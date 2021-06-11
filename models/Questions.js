const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  A: {
    type: String,
    required: true,
  },
  B: {
    type: String,
    required: true,
  },
  C: {
    type: String,
    required: true,
  },
  D: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questionImage: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("questions", QuestionSchema);
