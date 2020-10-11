const path = require('path');
const fs = require('fs');

const { exit } = process;

const { createLogger, format, transports } = require('winston');

const infoLogs = path.join(__dirname, '../logs/info.log');
const errorLogs = path.join(__dirname, '../logs/error.log');
const { prettyPrint } = require('../tools/pretty-print');

const errMessage = text =>
  `${text || 'Error'}: See "logs/error.log" for more details`;

const filter = format(i => (i.level === 'info' ? i : false));

const winston = createLogger({
  transports: [
    new transports.File({
      filename: errorLogs,
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint())
    }),
    new transports.File({
      filename: infoLogs,
      level: 'info',
      format: format.combine(filter(), format.timestamp(), format.prettyPrint())
    })
  ]
});

const logger = (req, res) => {
  const { statusCode: status } = res;
  const { query, body, originalUrl: url, method, stack } = req;
  const message = { query, body, url, method, status };

  if (status < 400) {
    winston.info(message);
  } else {
    stack && (message.stack = stack);
    winston.error(message);
  }
};

const uncaughtLogger = (message, text) => {
  process.stderr.write(errMessage(text));
  winston.error(message);
  winston.on('finish', () => exit(1));
};

const unhandledLogger = (message, text) => {
  process.stderr.write(errMessage(text));
  fs.writeFileSync(errorLogs, prettyPrint(message), {
    flag: 'a'
  });
  exit(1);
};

module.exports = {
  logger,
  winston,
  errorLogs,
  uncaughtLogger,
  unhandledLogger
};
