const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const createBoard = data => boardsRepo.createBoard(data);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
