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
    subject: "A-DSAT Password Reset",
    text: "Link to reset you password is " + url,
    html: `<h1> A-DSAT IIT Ropar password reset </h1>
          <div>
              Click <a href="${url}">here</a> to reset you password
          </div>`,
  });
  console.log("message", message);
  sendMail(message);
};

module.exports = sendMailForPasswordReset;
