const messageFormatter = require("../configureMessage");
const { sendMail } = require("../mailer");
const config = require("config");

const sendMailAfterTest = (name, email) => {
  const message = messageFormatter({
    email,
    subject:
      "Thank you for giving Advanced Data Science Aptitude Test (A-DSAT).",
    text: `Dear ${name},

    Thank you giving Advanced Data Science Aptitude Test (A-DSAT).
    
    Your results will be shared with you over this registered email very soon.
    
    All the best for the results.!!
    
    Regards 
    IIT Ropar`,
    html: `Dear ${name},

    Thank you giving Advanced Data Science Aptitude Test (A-DSAT).
    
    Your results will be shared with you over this registered email very soon.
    
    All the best for the results.!!
    
    Regards 
    IIT Ropar`,
  });
  sendMail(message);
};

module.exports = sendMailAfterTest;
