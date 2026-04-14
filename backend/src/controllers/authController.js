const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateToken } = require('../utils/jwt');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');

// ==================== SIGNUP ====================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate and send OTP
    const otp = generateOTP();
    const otpDoc = new OTP({
      email,
      otp
    });
    await otpDoc.save();

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. OTP sent to email.',
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during signup',
      error: error.message
    });
  }
};

// ==================== SEND OTP ====================
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpDoc = new OTP({
      email,
      otp
    });
    await otpDoc.save();

    // Send OTP email
    const result = await sendOTPEmail(email, otp);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'OTP sent to your email',
        email
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP'
      });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error sending OTP',
      error: error.message
    });
  }
};

// ==================== VERIFY OTP ====================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpDoc = await OTP.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired OTP' 
      });
    }

    // Check if OTP is expired
    if (new Date() > otpDoc.expiresAt) {
      return res.status(400).json({ 
        success: false,
        message: 'OTP has expired' 
      });
    }

    // Update user verification status
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    user.isEmailVerified = true;
    await user.save();

    // Delete OTP
    await OTP.deleteOne({ _id: otpDoc._id });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error verifying OTP',
      error: error.message
    });
  }
};

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        success: false,
        message: 'Please verify your email first' 
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        score: user.score,
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};


// ---------------------Forgot Password--------------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const otp = generateOTP();

    await OTP.create({ email, otp });

    await sendOTPEmail(email, otp);

    res.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP"
    });
  }
};


// ---------------------Reset Password--------------------------

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const otpDoc = await OTP.findOne({ email, otp });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const user = await User.findOne({ email });

    user.password = password;
    await user.save();

    await OTP.deleteOne({ _id: otpDoc._id });

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password"
    });
  }
};