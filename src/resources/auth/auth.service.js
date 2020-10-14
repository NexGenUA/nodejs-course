const jwt = require('jsonwebtoken');
const { FORBIDDEN, UNAUTHORIZED } = require('http-status');

const usersService = require('../users/user.service');
const { ResponseError } = require('../../shared/catch-error');
const { JWT_SECRET_KEY } = require('../../common/config');
const { compare } = require('../../shared/crypt');

const getToken = async (login, password) => {
  const entity = await usersService.findOne(login);
  const isCorrectPassword = await compare(password, entity.password);

  if (isCorrectPassword) {
    const token = jwt.sign(
      { name: entity._id, login: entity.login },
      JWT_SECRET_KEY,
      { expiresIn: '1m' }
    );
    return token;
  }

  throw new ResponseError(FORBIDDEN);
};

const verify = (url, permittedPaths, authorization) => {
  const isAccessiblePath = permittedPaths.some(path => path === url);

  if (!isAccessiblePath) {
    if (!authorization) {
      throw new ResponseError(UNAUTHORIZED);
    }

    try {
      const token = authorization.slice(7);
      jwt.verify(token, JWT_SECRET_KEY);
    } catch {
      throw new ResponseError(UNAUTHORIZED);
    }
  }
};

module.exports = { getToken, compare, verify };
