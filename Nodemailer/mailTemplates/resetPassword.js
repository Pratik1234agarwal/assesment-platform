const messageFormatter = require("../configureMessage");
const { sendMail } = require("../mailer");
const config = require("config");

const sendMailForPasswordReset = (email, token) => {
  console.log(email);
  const url = `${config.get(
    "hostUrl"
  )}/api/v1/auth/reset/resetPassword/${token}`;
  const message = messageFormatter({
    email,
    subject: "Ikigai Lab link to reset password",
    text: "Link to reset you password is " + url,
    html: `<h1> The Ikigai Lab </h1>
          <div>
              Click <a href="${url}">here</a> to reset you password
          </div>`,
  });
  console.log("message", message);
  sendMail(message);
};

module.exports = sendMailForPasswordReset;
