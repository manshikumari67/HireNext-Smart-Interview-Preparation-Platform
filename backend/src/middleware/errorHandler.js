const logger = require('../utils/logger');
let Sentry;
try { Sentry = require('../config/sentry'); } catch { Sentry = null; }

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const isServer = status >= 500;

  // Log the error
  logger.error(err);

  // Send to Sentry if configured
  if (Sentry && typeof Sentry.captureException === 'function') {
    try { Sentry.captureException(err); } catch (e) { logger.warn('Sentry capture failed', e); }
  }

  const safeMessage = isServer ? 'Internal Server Error' : (err.message || 'Error');

  res.status(status).json({
    success: false,
    status,
    message: safeMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
