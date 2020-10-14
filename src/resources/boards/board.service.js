const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const find = () => boardsRepo.find();

const findById = id => boardsRepo.findById(id);

const create = data => boardsRepo.create(data);

const updateOne = (id, data) => boardsRepo.updateOne(id, data);

const deleteOne = async id => {
  await boardsRepo.deleteOne(id);
  await tasksService.deleteMany(id);
};

module.exports = { find, findById, create, updateOne, deleteOne };
