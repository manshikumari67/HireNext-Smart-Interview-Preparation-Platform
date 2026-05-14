let Sentry;
try {
    Sentry = require('@sentry/node');
} catch (e) {
    // Sentry not installed or available
    Sentry = null;
}

if (Sentry && process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.0'),
    });
}

module.exports = Sentry;
