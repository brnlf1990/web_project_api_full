const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const logsDirectory = path.join('logs')

const requestLogger = expressWinston.logger({
  transports:[
    new winston.transports.File({filename:path.join(logsDirectory, 'request.log')})
  ],
  format:winston.format.json()
});


const errorLog = expressWinston.errorLogger({
  transports:[
    new winston.transports.File({filename:path.join(logsDirectory, 'error.log')})
  ],
  format:winston.format.json()
})

module.exports = {requestLogger, errorLog}