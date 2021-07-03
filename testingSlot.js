const User = require("./models/User");
const TimeSlot = require("./models/timeSlot");
require("./config/db")();

async function newSlot() {
  try {
    const timeSlot = new TimeSlot({
      startTime: new Date(2021, 6, 3, 14, 0),
      endTime: new Date(2021, 6, 3, 14, 30),
      slotNumber: 48,
    });
    await timeSlot.save();
    //const user = await User.findOne({ email: "testing@test.com" });
    await User.updateOne(
      { email: "testing@test.com" },
      { slotAlloted: true, timeSlot: timeSlot._id }
    );
  } catch (err) {
    console.log(err);
  }
}

async function run() {
  await newSlot();
}

setTimeout(run, 1000);
