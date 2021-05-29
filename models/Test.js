const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  questionBank: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
      marks: {
        type: Number,
        required: false,
      },
      negativeMarks: {
        type: Number,
        required: false,
      },
    },
  ],
  marksPerQuestions: {
    type: Number,
    required: true,
    default: 1.0,
  },
  negativeMarksPerQuestion: {
    type: Number,
    required: true,
    default: 0.0,
  },
  testDifficultyLevel: {
    type: Number,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
    required: false,
  },
  displayable: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Test", TestSchema);
