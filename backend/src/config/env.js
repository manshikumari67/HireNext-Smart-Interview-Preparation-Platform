const logger = require('../utils/logger');

const requiredVars = [
    'MONGODB_URL',
    'JWT_SECRET',
    'JWT_EXPIRE',
    'SENDGRID_API_KEY',
    'SENDGRID_EMAIL',
    'NODE_ENV',
    'OTP_EXPIRY',
    'MISTRAL_API_KEY'
];

const validateEnv = () => {
    const missingVars = requiredVars.filter(
        (name) => !String(process.env[name] || '').trim()
    );

    if (missingVars.length > 0) {
        const message = `Missing required environment variables: ${missingVars.join(', ')}`;
        logger.error(message);
        throw new Error(message);
    }

    // FRONTEND_URL optional during initial backend deployment
    if (process.env.FRONTEND_URL) {
        try {
            new URL(process.env.FRONTEND_URL);
        } catch {
            const message = 'FRONTEND_URL must be a valid URL';
            logger.error(message);
            throw new Error(message);
        }
    }

    const otpExpiry = Number(process.env.OTP_EXPIRY);

    if (!Number.isFinite(otpExpiry) || otpExpiry <= 0) {
        const message = 'OTP_EXPIRY must be a positive number';
        logger.error(message);
        throw new Error(message);
    }

    if (!/^SG\./.test(process.env.SENDGRID_API_KEY)) {
        const message = 'SENDGRID_API_KEY must start with SG.';
        logger.error(message);
        throw new Error(message);
    }

    logger.info('✅ Environment variables validated successfully');

    return true;
};

module.exports = validateEnv;