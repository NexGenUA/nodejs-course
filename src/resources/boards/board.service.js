const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const find = async () => await boardsRepo.find();

const findById = async id => await boardsRepo.findById(id);

const create = async data => await boardsRepo.create(data);

const updateOne = async (id, data) => await boardsRepo.updateOne(id, data);

const deleteOne = async id => {
  await boardsRepo.deleteOne(id);
  await tasksService.deleteMany(id);
};

module.exports = { find, findById, create, updateOne, deleteOne };
