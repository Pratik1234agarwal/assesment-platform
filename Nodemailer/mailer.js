const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "492221e4272881",
    pass: "e35ef0ee7ca7ec",
  },
});

const message = {
  from: "no-reply@ikigailab.com", // Sender address
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
