const tasksRepo = require('./task.memory.repository');

const findById = boardId => tasksRepo.findById(boardId);

const findByBoardIdAndId = async (boardId, TaskId) =>
  await tasksRepo.findByBoardIdAndId(boardId, TaskId);

const create = async (task, boardId) => await tasksRepo.create(task, boardId);

const updateOne = async (boardId, taskId, data) =>
  await tasksRepo.updateOne(boardId, taskId, data);

const deleteOne = async (boardId, taskId) =>
  await tasksRepo.deleteOne(boardId, taskId);

const updateMany = async userId => await tasksRepo.updateMany(userId);

const deleteMany = async boardId => await tasksRepo.deleteMany(boardId);

module.exports = {
  findById,
  findByBoardIdAndId,
  create,
  updateOne,
  deleteOne,
  updateMany,
  deleteMany
};
