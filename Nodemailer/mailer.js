const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "492221e4272881",
    pass: "e35ef0ee7ca7ec",
  },
});
// Testing Amazon SES
// let transport = nodemailer.createTransport({
//   host: "email-smtp.us-east-2.amazonaws.com",
//   port: 465,
//   auth: {
//     user: "AKIAUZNK2DJGN6H546EJ",
//     pass: "BCrbR+KyWU8nKU7StmNk9SwcRfvjBh0DBD2HpJMbbI3D",
//   },
// });
//

const message = {
  from: "ikigailab@adsatiitropar.com", // Sender address
  to: "pratik1234agarwal@gmail.com,pratik12aga@gmail.com", // List of recipients
  subject: "Welcome to Ikigai Lab", // Subject line
  text: "Hello There Welcome to Ikigai Lab", // Plain text body
};

const sendMail = (message) => {
  //console.log(message);
  return new Promise((resolve, reject) => {
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

//sendMail(message);

module.exports = sendMail;
