const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// ==================== SIGNUP ====================
router.post('/signup', authController.signup);

// ==================== SEND OTP ====================
router.post('/send-otp', authController.sendOTP);

// ==================== VERIFY OTP ====================
router.post('/verify-otp', authController.verifyOTP);

// ==================== LOGIN ====================
router.post('/login', authController.login);

// ==================== FORGOT PASSWORD ====================
router.post('/forgot-password', authController.forgotPassword);

// ==================== RESET PASSWORD ====================
router.post('/reset-password', authController.resetPassword);

module.exports = router;