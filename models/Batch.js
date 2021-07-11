const mongoose = require('mongoose');

const BatchSchema = mongoose.Schema({
  totalNumberOfStudents: {
    type: Number,
    default: 0,
  },
  maxNumberOfStudent: {
    type: Number,
    default: 250,
  },
  courseOutline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'outline',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('batch', BatchSchema);
