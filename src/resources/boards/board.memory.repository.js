const { NOT_FOUND } = require('http-status');

const Board = require('./board.model');
const { ResponseError } = require('../../shared/catch-error');

let boards = [];

const getAll = async () => await boards;

const getOneById = async id => {
  const response = boards.find(board => board.id === id);
  if (response) {
    return response;
  }
  throw new ResponseError(NOT_FOUND);
};

const create = async data => {
  const newData = new Board(data);
  boards.push(newData);
  return newData;
};

const updateOneById = async (id, data) => {
  const res = await getOneById(id);
  boards = boards.map(board => (board.id === id ? { ...res, ...data } : board));
  return true;
};

const deleteOneById = async id => {
  await getOneById(id);
  boards = boards.filter(board => board.id !== id);
  return true;
};

module.exports = { getAll, getOneById, create, updateOneById, deleteOneById };
