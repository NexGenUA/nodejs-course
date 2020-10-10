const router = require('express').Router();
const status = require('http-status');

const middlewareFn = require('../../shared/middleware-fn');
const boardsService = require('./board.service');

router.route('/').get(
  middlewareFn(async (req, res, next) => {
    const boards = await boardsService.find();
    await res.json(boards);
    next();
  })
);

router.route('/:id').get(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.findById(req.params.id);
    await res.json(board);
    next();
  })
);

router.route('/').post(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.create(req.body);
    await res.status(status.OK).json(board);
    next();
  })
);

router.route('/:id').put(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.updateOne(req.params.id, req.body);
    await res.json(board);
    next();
  })
);

router.route('/:id').delete(
  middlewareFn(async (req, res, next) => {
    await boardsService.deleteOne(req.params.id);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
