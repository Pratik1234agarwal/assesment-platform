const Users = require("./models/User");
require("./config/db")();
const sendMail = require("./Nodemailer/mailer");

async function mail() {
  try {
    const users = await Users.find();
    //console.log(users);
    for (let i = 0; i < users.length; i++) {
      if (!users[i].registrationMailSent) {
        console.log("Sending Mail to user : ", users[i].email);
        await sendMail(users[i].email, users[i].name);
        users[i].registrationMailSent = true;
        await users[i].save();
        console.log("Sent Mail to user : ", users[i].email);
      }
    }

    console.log("Completing mail sending");
  } catch (err) {
    console.log(err);
  }
}

setTimeout(mail, 2000);
