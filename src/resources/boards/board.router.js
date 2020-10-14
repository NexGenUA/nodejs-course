const router = require('express').Router();
const status = require('http-status');

const Board = require('./board.model');
const middlewareFn = require('../../shared/middleware-fn');
const boardsService = require('./board.service');

router.route('/').get(
  middlewareFn(async (req, res, next) => {
    const boards = await boardsService.find();
    res.json(boards.map(Board.toResponse));
    next();
  })
);

router.route('/:id').get(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.findById(req.params.id);
    res.json(Board.toResponse(board));
    next();
  })
);

router.route('/').post(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.create(req.body);
    res.status(status.OK).json(Board.toResponse(board));
    next();
  })
);

router.route('/:id').put(
  middlewareFn(async (req, res, next) => {
    const board = await boardsService.updateOne(req.params.id, req.body);
    res.json(Board.toResponse(board));
    next();
  })
);

router.route('/:id').delete(
  middlewareFn(async (req, res, next) => {
    await boardsService.deleteOne(req.params.id);
    res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
