const { program } = require('commander');
const { exit } = process;

program
  .storeOptionsAsProperties(true)
  .requiredOption('-s, --shift <type>', 'miss shift param')
  .requiredOption('-a, --action <type>', 'miss action param')
  .option('-i, --input [mode]')
  .option('-o, --output [mode]');

program.parse(process.argv);

const inputFile = program.input;
const outputFile = program.output;

const isBoolean = value => typeof value === 'boolean';

const requiredParams = str => {
  process.stderr.write(
    `Error: Please provide a file name for '${str}' parameter\n`
  );
  exit(1);
};

if (isBoolean(inputFile)) {
  requiredParams('-i, --input');
}

if (isBoolean(outputFile)) {
  requiredParams('-o, --output');
}

if (
  (inputFile && inputFile.endsWith('/')) ||
  (outputFile && outputFile.endsWith('/'))
) {
  process.stderr.write(
    '\nError: There must be a path to the file, not to the directory\n\n'
  );
  exit(1);
}

module.exports = program;
