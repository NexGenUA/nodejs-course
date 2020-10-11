const { NOT_FOUND } = require('http-status');

const Task = require('./task.model');
const { ResponseError } = require('../../shared/catch-error');

let tasks = [];

const findById = async boardId =>
  tasks.filter(task => task.boardId === boardId);

const findByBoardIdAndId = async (boardId, id) => {
  const res = tasks.find(task => task.id === id && task.boardId === boardId);
  if (res) {
    return res;
  }
  throw new ResponseError(NOT_FOUND);
};

const create = async (data, boardId) => {
  const newData = new Task({ ...data, boardId });
  tasks.push(newData);
  return newData;
};

const updateOne = async (boardId, taskId, data) => {
  const res = await findByBoardIdAndId(boardId, taskId);
  const newData = { ...res, ...data };
  tasks = tasks.map(task =>
    task.id === taskId && task.boardId === boardId ? newData : task
  );
  return newData;
};

const deleteOne = async (boardId, id) => {
  await findByBoardIdAndId(boardId, id, true);
  tasks = tasks.filter(task => task.id !== id);
};

const updateMany = async userId => {
  tasks = tasks.map(task =>
    task.userId === userId ? { ...task, userId: null } : task
  );
};

const deleteMany = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
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
