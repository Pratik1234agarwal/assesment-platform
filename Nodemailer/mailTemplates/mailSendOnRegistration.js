const messageFormatter = require("../configureMessage");
const sendMail = require("../mailer");
const config = require("config");

const sendMailAfterRegistration = async (email, name) => {
  await sendMail(email, name);
};

module.exports = sendMailAfterRegistration;
