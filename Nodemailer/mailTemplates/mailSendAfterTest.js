const messageFormatter = require("../configureMessage");
const { sendMail } = require("../mailer");
const config = require("config");

const sendMailAfterTest = (name, email) => {
  const message = messageFormatter({
    email,
    subject:
      "Thank you for giving Advanced Data Science Aptitude Test (A-DSAT).",
    text: `Dear ${name},\n

    Thank you giving Advanced Data Science Aptitude Test (A-DSAT).\n
    
    Your results will be shared with you over this registered email very soon.\n
    
    All the best for the results.!!\n\n
    
    Regards \n
    IIT Ropar`,
    html: `Dear ${name},<br />

    Thank you giving Advanced Data Science Aptitude Test (A-DSAT).<br />
    
    Your results will be shared with you over this registered email very soon.<br />
    
    All the best for the results.!!<br />
    <br/>
    Regards <br/>
    IIT Ropar`,
  });
  sendMail(message);
};

module.exports = sendMailAfterTest;
