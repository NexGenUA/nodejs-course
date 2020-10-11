const { NOT_FOUND } = require('http-status');

const Board = require('./board.model');
const { ResponseError } = require('../../shared/catch-error');

let boards = [];

const find = async () => await boards;

const findById = async id => {
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

const updateOne = async (id, data) => {
  const res = await findById(id);
  const newData = { ...res, ...data };
  boards = boards.map(board => (board.id === id ? newData : board));
  return newData;
};

const deleteOne = async id => {
  await findById(id);
  boards = boards.filter(board => board.id !== id);
};

module.exports = { find, findById, create, updateOne, deleteOne };
