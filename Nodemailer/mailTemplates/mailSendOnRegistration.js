const messageFormatter = require("../configureMessage");
const sendMail = require("../mailer");
const config = require("config");

const sendMailAfterRegistration = async (email) => {
  console.log(email);

  const message = messageFormatter({
    email,
    subject: "Registration for A-DSAT Ikigai",
    text: "Thanks for registering",
    html: `<h1> The Ikigai Lab </h1>
          <div>
              Thanks for registering with Ikigai Lab, 
              We will send you your timeslot for A-DSAT soon. Login at your timeslot to attempt the test
              For any quries contact The Ikigai Lab
          </div>`,
  });
  console.log("message", message);
  await sendMail(message);
};

module.exports = sendMailAfterRegistration;
