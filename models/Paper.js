const mongoose = require("mongoose");

const PaperSchema = mongoose.Schema({
  questions: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      questionText: {
        type: String,
        required: true,
      },
      questionImage: {
        type: String,
        required: false,
      },
      category: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: true,
        default: "not answered",
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
        required: false,
      },
      correct: {
        type: Number,
        require: false,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  startedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("paper", PaperSchema);
