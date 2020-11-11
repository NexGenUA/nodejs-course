const status = require('http-status');

const { uncaughtLogger, unhandledLogger } = require('./logger');
const { getProps } = require('../tools/pretty-print');

class ResponseError extends Error {
  constructor(statusCode, ...rest) {
    super(...rest);
    this.statusCode = statusCode;
    this.text = rest[0] || status[statusCode];
  }
}

const catchError = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    res.status(err.statusCode).send(err.text);
  } else if (err) {
    req.stack = err;
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(status[status.INTERNAL_SERVER_ERROR]);
  }
  next();
};

process.on('uncaughtException', err => {
  uncaughtLogger(
    {
      type: 'uncaughtException',
      msg: 'OMG! Something went wrong... Server crashed. Call to admin.',
      stack: err
    },
    err.message
  );
});

process.on('unhandledRejection', reason => {
  unhandledLogger(
    {
      message: {
        type: 'unhandledRejection',
        msg: reason.message,
        stack: getProps(reason)
      },
      level: 'error',
      timestamp: new Date().toISOString()
    },
    reason.message
  );
});

module.exports = { catchError, ResponseError };
