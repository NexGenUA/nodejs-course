const { PORT } = require('./common/config');
const app = require('./app');
const mongoConnect = require('./db/db-client');

mongoConnect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch(() => {
    console.error('mongoDB connection error');
  });
