const router = require('express').Router();
const { UNAUTHORIZED } = require('http-status');

const middlewareFn = require('../../shared/middleware-fn');
const authService = require('./auth.service');
const { ResponseError } = require('../../shared/catch-error');

router
  .route('/*')
  .post(
    middlewareFn(async (req, res, next) => {
      const { login, password } = req.body;
      const token = await authService.getToken(login, password);
      res.json({ token });
      next();
    })
  )
  .get(
    middlewareFn(async () => {
      throw new ResponseError(UNAUTHORIZED);
    })
  );

module.exports = router;
