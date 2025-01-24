const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSKEY,
  },
});

exports.sendEmailToAdmin = async (to, replyTo, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    replyTo,
    subject,
    html: htmlContent,
  };
  await transporter.sendMail(mailOptions);
};

exports.sendEmailToUser = async (to, replyTo, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    replyTo,
    subject,
    html: htmlContent,
  };
  await transporter.sendMail(mailOptions);
};