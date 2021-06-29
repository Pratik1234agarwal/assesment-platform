const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  students: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
      attempted: {
        type: Boolean,
        default: false,
        required: true,
      },
      requestedTimeChange: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
  slotNumber: {
    type: Number,
    required: true,
  },
  totalAttempted: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("timeSlot", timeSlotSchema);
