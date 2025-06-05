const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmailAlert = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"FireLog Alerts" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
