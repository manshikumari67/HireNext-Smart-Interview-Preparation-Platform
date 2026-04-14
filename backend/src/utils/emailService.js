

const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'NextHire - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; margin: 20px;">
          <h2>Welcome to NextHire! 🎉</h2>
          <p>Your OTP for email verification is:</p>
          <h3 style="background: #f0f0f0; padding: 10px; text-align: center; letter-spacing: 2px; color: #333;">
            ${otp}
          </h3>
          <p style="color: #666;">This OTP will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Best regards, NextHire Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, message: 'Failed to send OTP' };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail
};
