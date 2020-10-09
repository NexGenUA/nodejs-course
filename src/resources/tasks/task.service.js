const tasksRepo = require('./task.memory.repository');

const getAllById = boardId => tasksRepo.getAllById(boardId);

const getOneById = (boardId, TaskId) => tasksRepo.getOneById(boardId, TaskId);

const create = (task, boardId) => tasksRepo.create(task, boardId);

const updateOneById = (boardId, taskId, data) =>
  tasksRepo.updateOneById(boardId, taskId, data);

const deleteOne = (boardId, taskId) => tasksRepo.deleteOne(boardId, taskId);

// const deleteUser = id => tasksRepo.deleteUser(id);

const deleteManyById = id => tasksRepo.deleteManyById(id);

module.exports = {
  getAllById,
  getOneById,
  create,
  updateOneById,
  deleteOne,
  // deleteUser,
  deleteManyById
};
