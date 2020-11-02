const router = require('express').Router();

const authService = require('./auth.service');
const { PERMITTED_PATHS } = require('../../common/config');
const middlewareFn = require('../../shared/middleware-fn');

router.route('*').all(
  middlewareFn(async (req, res, next) => {
    const paths = PERMITTED_PATHS.split(',');
    const url = req.url.split('/')[1];
    const { authorization } = req.headers;

    authService.verify(url, paths, authorization);
    next();
  })
);

module.exports = router;
