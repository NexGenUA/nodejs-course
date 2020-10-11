const prettyPrint = message =>
  `${JSON.stringify(message, null, 2)
    .split('\n')
    .map(line => {
      if (line.includes(':')) {
        let split = line.split(/:\s/g);

        if (split.length > 2) {
          split = [split[0], `${split[1]}: ${split[2]}`];
        }

        split[0] = split[0].replace(/"/g, '');
        split[1] = split[1].replace(/\\n\s/g, '\n');
        split[1] = split[1].replace(/\sat/g, '      at');
        split[1] = split[1].replace(/\\\\/g, '\\');

        if (split[0].trim() === 'stack') {
          split[1] = split[1].replace(/"/g, '');
        }

        return split.join(': ');
      }
      line = line.replace(/"/g, "'");
      return line;
    })
    .join('\n')
    .replace(/"/g, "'")}\n`;

const getProps = obj =>
  JSON.parse(JSON.stringify(obj.stack, Object.getOwnPropertyNames(obj.stack)));

module.exports = { prettyPrint, getProps };
