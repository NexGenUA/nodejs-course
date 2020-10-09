const { NOT_FOUND } = require('http-status');

const Task = require('./task.model');
const { ResponseError } = require('../../shared/catch-error');

let tasks = [];

const getAllById = async boardId =>
  tasks.filter(task => task.boardId === boardId);

const getOneById = async (boardId, id) => {
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

const updateOneById = async (boardId, taskId, data) => {
  const res = await getOneById(boardId, taskId);
  const newData = { ...res, ...data };
  tasks = tasks.map(task =>
    task.id === taskId && task.boardId === boardId ? newData : task
  );
  return newData;
};

const deleteOne = async (boardId, taskId) => {
  await getOneById(boardId, taskId);
  tasks = tasks.filter(task => task.id === taskId);
  return true;
};

// // const deleteUser = id => tasksRepo.deleteUser(id);

// const deleteManyById = id => tasksRepo.deleteManyById(id);

module.exports = {
  getAllById,
  getOneById,
  create,
  updateOneById,
  deleteOne
  // deleteUser,
  // deleteManyById
};
