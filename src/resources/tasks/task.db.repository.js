const { NOT_FOUND } = require('http-status');

const Task = require('./task.model');
const { ResponseError } = require('../../shared/catch-error');

const findById = async boardId => await Task.find({ boardId });

const findByBoardIdAndId = async (boardId, id) => {
  const response = await Task.findOne({ _id: id, boardId });
  if (response) {
    return response;
  }
  throw new ResponseError(NOT_FOUND);
};

const create = async (data, boardId) => {
  return Task.create({ ...data, boardId });
};

const updateOne = async (boardId, id, data) => {
  return Task.updateOne({ _id: id, boardId }, data);
};

const deleteOne = async (boardId, id) => {
  await Task.deleteOne({ _id: id, boardId });
};

const updateMany = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

const deleteMany = async boardId => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  findById,
  findByBoardIdAndId,
  create,
  updateOne,
  deleteOne,
  updateMany,
  deleteMany
};
