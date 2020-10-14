const { NOT_FOUND, FORBIDDEN } = require('http-status');

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
  throw new ResponseError(FORBIDDEN);
};

const create = async data => {
  return User.create(data);
};

const updateOne = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const deleteOne = async id => {
  await User.deleteOne({ _id: id });
};

module.exports = { find, findById, create, updateOne, deleteOne, findOne };
