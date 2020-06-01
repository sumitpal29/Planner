const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mailer(config) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user, // generated ethereal user
        pass: process.env.pass, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(config);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    return err;
  }
}

const sendWelcomeMail = async (name, to) => {
  if (!to || !name) {
    throw new Error("Unable to send Email: Provide a valid email id");
  }
  const conf = {
    from: "Team Planner <no-reply>", // sender address
    to, // list of receivers
    subject: "Welcome to the team Planner", // Subject line
    html: `<h1>Welcome on board</h1><p>Dear ${name}, thanks for choosing our planner.</p>`, // html body
  };

  await mailer(conf);
};

const sendCancelationMail = async (name, to) => {
  if (!to || !name) {
    throw new Error("Unable to send Email: Provide a valid email id");
  }
  const conf = {
    from: "Team Planner", // sender address
    to, // list of receivers
    subject: `Good bye ${name}`, // Subject line
    html: `<h1>Adios</h1><p>Dear ${name}, We had a great joury so far. We will definitely want to see you again soon.</p>`, // html body
  };

  await mailer(conf);
};

module.exports = { mailer, sendWelcomeMail, sendCancelationMail };
