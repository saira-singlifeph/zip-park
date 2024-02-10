// eslint-disable-next-line import/no-extraneous-dependencies
const winston = require('winston');

const myFormat = winston.format.printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'Parking-System' }),
    winston.format.timestamp(),
    myFormat,
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
