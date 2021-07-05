const User = require("./models/User");
const TimeSlot = require("./models/timeSlot");
require("./config/db")();

const users = [
  "vikramtilokani10@gmail.com",
  "gunjan.aggarwal@theikigailab.com",
  "sauuuchavan49@gmail.com",
  "sahithipalla@gmail.com",
  "tilsusis2019@gmail.com",
  "abhay.pandey@algo8.ai",
  "1abhay234@gmail.com",
  "abhay2704@outlook.com",
  "pratik.agarwal@theikigailab.com",
  "munishchoudhary201@gmail.com",
  "munishchoudhary204@gmail.com",
];

async function newSlot() {
  try {
    const timeSlot = new TimeSlot({
      startTime: new Date(2021, 6, 5, 20, 0),
      endTime: new Date(2021, 6, 5, 20, 30),
      slotNumber: 100,
    });
    await timeSlot.save();
    //const user = await User.findOne({ email: "testing@test.com" });

    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({ email: users[i] });
      if (user) {
        console.log("User present adding to the slot");
        await User.updateOne(
          { email: users[i] },
          { slotAlloted: true, timeSlot: timeSlot._id }
        );
        console.log("User added to the database ", users[i]);
      } else {
        console.log(users[i], " Not present in database");
      }
    }

    // await User.updateOne(
    //   { email: "testing@test.com" },
    //   { slotAlloted: true, timeSlot: timeSlot._id }
    // );
    console.log("Testing slot divided");
  } catch (err) {
    console.log(err);
  }
}

async function run() {
  await newSlot();
}

setTimeout(run, 1000);
