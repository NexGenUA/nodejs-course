const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const find = async () => await usersRepo.find();

const findById = async id => await usersRepo.findById(id);

const create = async data => await usersRepo.create(data);

const updateOne = async (id, data) => await usersRepo.updateOne(id, data);

const deleteOne = async id => {
  await tasksService.updateMany(id);
  await usersRepo.deleteOne(id);
};

module.exports = { find, findById, create, updateOne, deleteOne };
