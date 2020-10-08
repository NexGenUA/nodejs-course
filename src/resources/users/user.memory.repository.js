const { NOT_FOUND } = require('http-status');

const User = require('./user.model');
const { ResponseError } = require('../../shared/catch-error');

let users = [];

const getAll = async () => await users;

const getOneById = async id => {
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

const updateOneById = async (id, data) => {
  const res = await getOneById(id);
  users = users.map(user => (user.id === id ? { ...res, ...data } : user));
  return true;
};

const deleteOneById = async id => {
  await getOneById(id);
  users = users.filter(user => user.id !== id);
  return true;
};

module.exports = { getAll, getOneById, create, updateOneById, deleteOneById };
