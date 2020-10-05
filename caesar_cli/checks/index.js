const fs = require('fs');
const util = require('util');

const access = util.promisify(fs.access);
const open = util.promisify(fs.open);

const params = require('../params');

const { input, output } = params;

const checks = async () => {
  try {
    if (output) {
      await access(output, fs.constants.W_OK);
      await open(output, 'a');
    }

    if (input) {
      await access(input, fs.constants.R_OK);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Error: File "${err.path}" doesn't exist`);
    }
    throw new Error(`Error: Access denied to file "${err.path}"`);
  }
};

module.exports = checks;
