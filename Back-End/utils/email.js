const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //email option
  const mailOptions = {
    from: "vansang00bn@yahoo.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  await transporter.sendMail(mailOptions);
};
// sendEmail({
//   email: "tuantruong.a8k29@gmail.com",
//   subject: "cac",
//   text: "text cac",
// });

module.exports = sendEmail;
