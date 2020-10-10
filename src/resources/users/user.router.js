const router = require('express').Router();
const status = require('http-status');

const User = require('./user.model');
const middlewareFn = require('../../shared/middleware-fn');
const usersService = require('./user.service');

router.route('/').get(
  middlewareFn(async (req, res, next) => {
    const users = await usersService.find();
    await res.json(users.map(User.toResponse));
    next();
  })
);

router.route('/:id').get(
  middlewareFn(async (req, res, next) => {
    const user = await usersService.findById(req.params.id);
    await res.json(User.toResponse(user));
    next();
  })
);

router.route('/').post(
  middlewareFn(async (req, res, next) => {
    const user = await usersService.create(req.body);
    await res.status(status.OK).json(User.toResponse(user));
    next();
  })
);

router.route('/:id').put(
  middlewareFn(async (req, res, next) => {
    const user = await usersService.updateOne(req.params.id, req.body);
    await res.json(User.toResponse(user));
    next();
  })
);

router.route('/:id').delete(
  middlewareFn(async (req, res, next) => {
    await usersService.deleteOne(req.params.id);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
