const { pipeline } = require('stream');

const { exit } = process;

const checks = require('./checks');

checks()
  .then(() => {
    process.on('SIGINT', () => {
      process.stdout.write('\n\nBye! Bye!\n\n');
      exit(0);
    });

    const { transformStream } = require('./streams');
    const inputStream = require('./streams').inputStream();
    const outputStream = require('./streams').outputStream();

    pipeline(inputStream, transformStream, outputStream, err => {
      if (err) {
        process.stderr.write(err);
        exit(1);
      }
    });
  })
  .catch(err => {
    process.stderr.write(`\n${err.message}\n\n`);
    exit(1);
  });
