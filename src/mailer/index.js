require("dotenv").config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export default async function mailer(config) {
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
}

//   {
//     from: "Sumit Pal", // sender address
//     to: "sumit@charts.com", // list of receivers
//     subject: "Hello Sumit ✔", // Subject line
//     text: "Another test", // plain text body
//     html: "<b>Testing</b>", // html body
//   }