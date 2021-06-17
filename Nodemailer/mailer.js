const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

// let transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "9263d1380e3424",
//     pass: "9963175b71b6f3",
//   },
// });
//Testing Amazon SES
let transport = nodemailer.createTransport({
  host: "email-smtp.us-east-2.amazonaws.com",
  port: 465,
  auth: {
    user: "AKIAUZNK2DJGN6H546EJ",
    pass: "BCrbR+KyWU8nKU7StmNk9SwcRfvjBh0DBD2HpJMbbI3D",
  },
});

const message = {
  from: "ai-course-datascience@iitrpr.ac.in", // Sender address
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
const location = path.join(
  __dirname,
  "..",
  "template/Registration/registration.html"
);

const locationAttachment = path.join(
  __dirname,
  "..",
  "template/Registration/enrolment.html"
);
console.log(location);

const mailSendForRegistration = (email, name) => {
  return new Promise((resolve, reject) => {
    readHTMLFile(location, function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        name,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "ai-course-datascience@iitrpr.ac.in",
        to: email,
        subject:
          "Registration Successful- Advance Data Science Aptitude Test (PSDM- IIT Ropar)",
        html: htmlToSend,
        attachments: [
          {
            filename: "enrolment.png",
            path: locationAttachment,
            cid: "banner",
          },
        ],
      };
      transport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(response);
          resolve();
        }
      });
    });
  });
};

module.exports = mailSendForRegistration;
