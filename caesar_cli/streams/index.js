const fs = require('fs');
const path = require('path');

const { Transform } = require('stream');

const params = require('../params');
const caesar = require('../cipher');
const { exit } = process;

const cipher = caesar(params.shift, params.action);
const { input, output, action } = params;

const transformStream = new Transform({
  transform(chunk, _, cb) {
    cb(null, cipher.crypt(chunk.toString()));
  }
});

const inputStream = () => {
  if (input) {
    const rs = fs.createReadStream(input);

    if (input && !output) {
      process.stdout.write(`\nFile "${input}" successfully ${action}:\n\n`);
    }

    rs.on('end', () => {
      process.stdout.write('\n');
    });

    return rs;
  }
  process.stdout.write(
    "\n> For exit write ':q' or press 'ctrl + c'\n> Print some text for encode/decode:\n\n"
  );
  process.stdout.write('Input string > ');
  process.stdin.on('data', d => {
    if (d.toString().trim() === ':q') {
      process.stdout.write('\nBye! Bye!\n\n');
      exit(0);
    }
    if (output) {
      process.stdout.write(`> Successfully written to "${output}"\n`);
    } else {
      process.stdout.write('Output string > ', d);
    }
    setImmediate(() => {
      process.stdout.write('\nInput string > ');
    });
  });
  return process.stdin;
};

const outputStream = () => {
  if (output) {
    const ws = fs.createWriteStream(path.join(__dirname, '..', output), {
      flags: 'a'
    });

    ws.on('finish', () => {
      process.stdout.write(
        `> Successfully written from "${input}" to "${output}"\n\n`
      );
    });
    return ws;
  }
  return process.stdout;
};

module.exports = {
  transformStream,
  inputStream,
  outputStream
};
