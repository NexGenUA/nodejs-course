const Board = require('./board.model');

let boards = [];

const getAll = async () => boards;

const getBoard = async id => boards.find(board => board.id === id);

const createBoard = async data => {
  const newBoard = new Board(data);
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const findBoard = getBoard(id);
  let updatedBoard = null;
  if (findBoard) {
    boards = boards.map(user => {
      if (user.id === id) {
        updatedBoard = { ...findBoard, ...data };
        return updatedBoard;
      }
      return user;
    });
  }
  return updatedBoard;
};

const deleteBoard = async id => {
  const deletedBoard = getBoard(id);
  if (deletedBoard) {
    boards = boards.filter(user => user.id !== id);
  }
  return deleteBoard;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
