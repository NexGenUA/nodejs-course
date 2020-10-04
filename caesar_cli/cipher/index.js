const Caesar = require('caesar-salad').Caesar;

const { exit } = process;

const caesar = (shift, type) => {
  if (isNaN(shift)) {
    process.stderr.write(
      "\nError: '-s, --shift' parameter should be type 'Number'\n\n"
    );
    exit(1);
  }

  switch (type) {
    case 'encode': {
      return Caesar.Cipher(parseInt(shift, 10));
    }
    case 'decode': {
      return Caesar.Decipher(parseInt(shift, 10));
    }
    default:
      process.stderr.write(
        "\nError: '-a, --action' parameter is required and should be 'encode' or 'decode'\n\n"
      );
      exit(1);
  }
};

module.exports = caesar;
