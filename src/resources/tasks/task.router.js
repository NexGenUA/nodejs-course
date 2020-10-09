const router = require('express').Router({ mergeParams: true });
const status = require('http-status');

const middlewareFn = require('../../shared/middleware-fn');
const tasksService = require('./task.service');

router.route('/').get(
  middlewareFn(async (req, res, next) => {
    const tasks = await tasksService.getAllById(req.params.boardId);
    await res.json(tasks);
    next();
  })
);

router.route('/:taskId').get(
  middlewareFn(async (req, res, next) => {
    const task = await tasksService.getOneById(
      req.params.boardId,
      req.params.taskId
    );
    await res.json(task);
    next();
  })
);

router.route('/').post(
  middlewareFn(async (req, res, next) => {
    const task = await tasksService.create(req.body, req.params.boardId);
    await res.json(task);
    next();
  })
);

router.route('/:taskId').put(
  middlewareFn(async (req, res, next) => {
    const task = await tasksService.updateOneById(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    await res.json(task);
    next();
  })
);

router.route('/:taskId').delete(
  middlewareFn(async (req, res, next) => {
    await tasksService.deleteManyById(req.params.boardId, req.params.taskId);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
