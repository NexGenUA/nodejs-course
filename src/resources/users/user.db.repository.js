const { NOT_FOUND, FORBIDDEN, BAD_REQUEST } = require('http-status');

const User = require('./user.model');
const { ResponseError } = require('../../shared/catch-error');

const find = async () => await User.find({});

const findById = async id => {
  const response = await User.findById(id);
  if (response) {
    return response;
  }
  throw new ResponseError(NOT_FOUND);
};

const findOne = async login => {
  const response = await User.findOne({ login });
  if (response) {
    return response;
  }
  throw new ResponseError(FORBIDDEN, 'Login or password is wrong');
};

const create = async data => {
  const login = data.login || data.email;
  const response = await User.findOne({ login });
  if (response) {
    throw new ResponseError(
      BAD_REQUEST,
      `User with login: ${login} already exists`
    );
  }
  return User.create({ ...data, email: login });
};

const updateOne = async (id, data) => {
  return await User.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteOne = async id => {
  await User.deleteOne({ _id: id });
};

module.exports = { find, findById, create, updateOne, deleteOne, findOne };
