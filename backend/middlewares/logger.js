// import the required modules
const winston = require('winston');
const expressWinston = require('express-winston');

// create a query logger
const requestLogger = expressWinston.logger({
  // where to write the log
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  // logging format
  format: winston.format.json(),
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    // new winston.transports.Console(),
  ],
  format: winston.format.json(),
});

// after creating the loggers, they need to be exported, then imported into app.js:
module.exports = {
  requestLogger,
  errorLogger,
};
