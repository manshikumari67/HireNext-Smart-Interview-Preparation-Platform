

const sgMail = require('@sendgrid/mail');
const logger = require('./logger');

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  logger.warn('SendGrid API key is not set. Emails will fail until SENDGRID_API_KEY is provided.');
}

// Generate random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via SendGrid
const sendOTPEmail = async (toEmail, otp) => {
  if (!SENDGRID_API_KEY) {
    logger.error('SENDGRID_API_KEY missing - cannot send email');
    return { success: false, message: 'SendGrid not configured' };
  }

  if (!SENDGRID_EMAIL) {
    logger.error('SENDGRID_EMAIL missing - cannot send email');
    return { success: false, message: 'SendGrid sender not configured' };
  }

  const msg = {
    to: toEmail,
    from: SENDGRID_EMAIL,
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

  try {
    await sgMail.send(msg);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    logger.error('SendGrid send error:', error?.response?.body || error.message || error);
    return { success: false, message: 'Failed to send OTP' };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail
};
