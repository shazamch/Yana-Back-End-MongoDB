const nodemailer = require('nodemailer');

const sendAdminCredentials = async (email, username, password) => {
  console.log('Attempting to send email to:', email); // Log the email address
  console.log('Username:', username); // Log the username
  console.log('Password:', password); // Log the password (be cautious with sensitive info)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Admin Credentials',
    text: `Username: ${username}\nPassword: ${password}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response); // Log the response if the email was sent successfully
  } catch (error) {
    console.error('Error sending email:', error); // Log the error if the email failed to send
    throw new Error('Failed to send email');
  }
};

module.exports = { sendAdminCredentials };
