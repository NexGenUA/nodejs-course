const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const admin = new User({ name: 'Admin', login: 'admin', password: 'admin' });

const mongoConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', () => reject());

    db.once('open', async () => {
      console.log('mongoDB connected!');
      await db.dropDatabase();
      await admin.save();
      resolve();
    });
  });
};

module.exports = mongoConnect;
