const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf, colorize, errors } = format;

const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        errors({ stack: true }),
        timestamp(),
        process.env.NODE_ENV === 'production' ? format.json() : combine(colorize(), devFormat)
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
