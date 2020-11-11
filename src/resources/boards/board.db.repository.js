const { NOT_FOUND } = require('http-status');

const Board = require('./board.model');
const { ResponseError } = require('../../shared/catch-error');

const find = async () => await Board.find({});

const findById = async id => {
  const response = await Board.findById(id);
  if (response) {
    return response;
  }
  throw new ResponseError(NOT_FOUND);
};

const create = async data => {
  return Board.create(data);
};

const updateOne = async (id, data) => {
  return await Board.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async id => {
  await Board.deleteOne({ _id: id });
};

module.exports = { find, findById, create, updateOne, deleteOne };
