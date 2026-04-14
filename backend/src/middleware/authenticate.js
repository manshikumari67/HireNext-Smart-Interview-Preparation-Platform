const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No authorized token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Token is not valid',
      error: error.message
    });
  }
};

module.exports = authenticate;
