const router = require('express').Router();
const { UNAUTHORIZED } = require('http-status');

const middlewareFn = require('../../shared/middleware-fn');
const authService = require('./auth.service');
const { ResponseError } = require('../../shared/catch-error');

router
  .route('/*')
  .post(
    middlewareFn(async (req, res, next) => {
      const { login, password, email } = req.body;
      const { token, name, email: responseEmail } = await authService.getToken(
        login,
        password,
        email
      );
      res.json({ token, name, email: responseEmail });
      next();
    })
  )
  .get(
    middlewareFn(async () => {
      throw new ResponseError(UNAUTHORIZED);
    })
  );

module.exports = router;
