const path = require('path');

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./resources/auth/auth.router');
const authVerification = require('./resources/auth/auth.verification');
const { logger } = require('./shared/logger');
const { catchError } = require('./shared/catch-error');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(authVerification);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/login', authRouter);
app.use('/signin', authRouter);
app.use(catchError, logger);

module.exports = app;
