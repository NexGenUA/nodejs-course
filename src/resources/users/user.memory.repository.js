const { NOT_FOUND } = require('http-status');

const User = require('./user.model');
const { ResponseError } = require('../../shared/catch-error');

let users = [];

const find = async () => users;

const findById = async id => {
  const response = users.find(user => user.id === id);
  if (response) {
    return response;
  }
  throw new ResponseError(NOT_FOUND);
};

const create = async data => {
  const newData = new User(data);
  users.push(newData);
  return newData;
};

const updateOne = async (id, data) => {
  const res = await findById(id);
  const newData = { ...res, ...data };
  users = users.map(user => (user.id === id ? newData : user));
  return newData;
};

const deleteOne = async id => {
  await findById(id);
  users = users.filter(user => user.id !== id);
};

module.exports = { find, findById, create, updateOne, deleteOne };
