const tasksRepo = require('./task.db.repository');

const findById = boardId => tasksRepo.findById(boardId);

const findByBoardIdAndId = (boardId, TaskId) =>
  tasksRepo.findByBoardIdAndId(boardId, TaskId);

const create = (task, boardId) => tasksRepo.create(task, boardId);

const updateOne = (boardId, taskId, data) =>
  tasksRepo.updateOne(boardId, taskId, data);

const deleteOne = async (boardId, taskId) =>
  await tasksRepo.deleteOne(boardId, taskId);

const updateMany = userId => tasksRepo.updateMany(userId);

const deleteMany = boardId => tasksRepo.deleteMany(boardId);

module.exports = {
  findById,
  findByBoardIdAndId,
  create,
  updateOne,
  deleteOne,
  updateMany,
  deleteMany
};
