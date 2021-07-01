const { timeSlotMail } = require("./Nodemailer/mailer");

async function sendMail(name, email) {
  await timeSlotMail(name, email, "6th of July", "9:00 - 9:30");
}

sendMail("Pratik", "pratik1234agarwal@gmail.com");
sendMail("Abhay", "abhay.pandey@theikigailab.com");
