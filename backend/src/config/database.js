const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;

    if (!uri) {
      logger.error('MongoDB connection string not found. Set MONGODB_URL in environment.');
      process.exit(1);
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('DB connected successfully');
    return conn;
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
