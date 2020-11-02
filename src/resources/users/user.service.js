const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const find = () => usersRepo.find();

const findById = id => usersRepo.findById(id);

const findOne = login => usersRepo.findOne(login);

const create = data => usersRepo.create(data);

const updateOne = (id, data) => usersRepo.updateOne(id, data);

const deleteOne = async id => {
  await tasksService.updateMany(id);
  await usersRepo.deleteOne(id);
};

module.exports = { find, findById, create, updateOne, deleteOne, findOne };
