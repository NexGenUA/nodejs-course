const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();
const getOneById = async id => await usersRepo.getOneById(id);
const create = async data => await usersRepo.create(data);
const updateOneById = async (id, data) =>
  await usersRepo.updateOneById(id, data);
const deleteOneById = async id => await usersRepo.deleteOneById(id);

module.exports = { getAll, getOneById, create, updateOneById, deleteOneById };
