const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

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
      resolve();
    });
  });
};

module.exports = mongoConnect;
