const mongoose = require('mongoose');
const uuid = require('uuid');

const { getHash } = require('../../shared/crypt');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    email: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = ({ id, name, login, email }) => ({
  id,
  name,
  login,
  email
});

userSchema.pre('save', async function cryptSave(next) {
  this.password = await getHash(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function cryptUpdate(next) {
  this._update.password = await getHash(this._update.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
