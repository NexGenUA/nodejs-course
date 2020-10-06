const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  if (user) {
    return res.json(User.toResponse(user));
  }
  res.status(404).send('User not found');
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    return res.json(User.toResponse(user));
  }
  res.status(404).send('Not Found');
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.id);
  if (user) {
    res.status(200).send('Succefull deleted');
  }
  res.status(404).send();
});

// * `GET /users/:id` - get the user by id (ex. “/users/123”) (remove password from response)
// * `POST /users` - create user
// * `PUT /users/:id` - update user
// * `DELETE /users/:id` - delete user

module.exports = router;
