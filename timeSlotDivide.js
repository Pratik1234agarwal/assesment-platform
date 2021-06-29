const User = require("./models/User");
const TimeSlot = require("./models/timeSlot");
require("./config/db")();

const DATE = [6, 7];
const slotFrom = 9;
const slotTo = 21;

async function slotDivider() {
  let count = 0;
  for (let k = 0; k < DATE.length; k++) {
    let date = DATE[k];
    for (let i = slotFrom; i < slotTo; i++) {
      try {
        console.log(`Adding slots ${i}`);
        const slot1 = new TimeSlot({
          startTime: new Date(2021, 6, date, i, 0),
          endTime: new Date(2021, 6, date, i, 30),
          students: [],
          slotNumber: count,
        });
        count++;
        await slot1.save();
        const slot2 = new TimeSlot({
          startTime: new Date(2021, 6, date, i, 30),
          endTime: new Date(2021, 6, date, i + 1, 0),
          students: [],
          slotNumber: count,
        });
        count++;
        await slot2.save();
      } catch (err) {
        console.log(err);
        console.log("Error creating slots");
      }
    }
  }
}

async function checkSlot() {
  try {
    const timeSlot = await TimeSlot.findOne();
    console.log(timeSlot);
    const startTime = timeSlot.startTime;
    const endTime = timeSlot.endTime;
    console.log(startTime.getHours());
    console.log(startTime.getMinutes());
    console.log(endTime.getHours());
    console.log(endTime.getMinutes());
    console.log(startTime.getDate());
    console.log(startTime.getMonth());
  } catch (err) {
    console.log(err);
  }
}

setTimeout(checkSlot, 1000);
