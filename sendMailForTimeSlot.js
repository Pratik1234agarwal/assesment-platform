const { timeSlotMail } = require("./Nodemailer/mailer");
const User = require("./models/User");
const TimeSlot = require("./models/timeSlot");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const Mail = require("nodemailer/lib/mailer");
require("./config/db")();

async function sendMail(name, email) {
  await timeSlotMail(name, email, "6th of July", "9:00 AM - 9:30 AM");
}

function formatSlot(startTime, endTime) {
  let t1 = startTime.getHours();
  t1 =
    t1 > 12
      ? `${t1 - 12}:${startTime.getMinutes()} PM `
      : `${t1}:${startTime.getMinutes()} AM`;
  let t2 = endTime.getHours();
  t2 =
    t2 > 12
      ? `${t2 - 12}:${endTime.getMinutes()} PM `
      : `${t2}:${endTime.getMinutes()} AM`;
  return `${t1} - ${t2}`;
}

async function Mails() {
  try {
    const users = await User.find({ slotAlloted: true });
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(user);
      const slot = await TimeSlot.findById(user.timeSlot);
      console.log(slot);
      await timeSlotMail(
        user.name,
        user.email,
        `${slot.startTime.getDate()}th of July`,
        formatSlot(slot.startTime, slot.endTime)
      );
      break;
    }
  } catch (err) {
    console.log(err);
  }
}

setTimeout(Mails, 100);

//endMail("Pratik", "pratik1234agarwal@gmail.com");
//sendMail("Abhay", "abhay.pandey@theikigailab.com");
