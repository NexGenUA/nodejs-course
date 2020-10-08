const boardsRepo = require('./board.memory.repository');

const getAll = async () => await boardsRepo.getAll();
const getOneById = async id => await boardsRepo.getOneById(id);
const create = async data => await boardsRepo.create(data);
const updateOneById = async (id, data) =>
  await boardsRepo.updateOneById(id, data);
const deleteOneById = async id => await boardsRepo.deleteOneById(id);

module.exports = { getAll, getOneById, create, updateOneById, deleteOneById };
