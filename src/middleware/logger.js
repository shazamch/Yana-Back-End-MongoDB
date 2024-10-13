// middleware/logger.js
const morgan = require('morgan');

const logger = morgan('combined'); // Use the 'combined' log format

module.exports = logger;
