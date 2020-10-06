const User = require('./user.model');

let users = [];

const getAll = async () => users;

const getUser = id => users.find(user => user.id === id);

const createUser = data => {
  const newUser = new User(data);
  users.push(newUser);
  return newUser;
};

const updateUser = (id, data) => {
  const findUser = getUser(id);
  let updatedUser = null;
  if (findUser) {
    users = users.map(user => {
      if (user.id === id) {
        updatedUser = { ...findUser, ...data };
        return updatedUser;
      }
      return user;
    });
  }
  return updatedUser;
};

const deleteUser = id => {
  const deletedUser = getUser(id);
  if (deletedUser) {
    users = users.filter(user => user.id !== id);
  }
  return deleteUser;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
