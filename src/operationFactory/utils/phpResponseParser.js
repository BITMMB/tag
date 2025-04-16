export const phpResponseParser = (input) => {
  input = input.replace(/<[^>]+>/g, '').trim();

  if (input.startsWith('//')) {
    return {
      hasSettings: false,
      message: input,
    };
  }

  if (!input.length) {
    return {
      hasSettings: false,
      message: 'blocked',
    };
  }

  const arrayIndex = input.indexOf('Array');
  if (arrayIndex !== -1) {
    input = input.slice(arrayIndex);
  }

  const lines = input.split('\n');
  let index = 0;

  function parseBlock() {
    const result = {};
    while (index < lines.length) {
      let line = lines[index].trim();
      index++;

      if (!line) continue;
      if (line === '(') continue;
      if (line === ')') break;

      const match = line.match(/^\[(.+?)\]\s*=>\s*(.*)$/);
      if (match) {
        const key = match[1];
        let value = match[2];
        if (value === 'Array') {
          if (lines[index] && lines[index].trim() === '(') {
            index++;
            value = parseBlock();
          } else {
            value = {};
          }
        }
        result[key] = value;
      }
    }
    return result;
  }

  let parsed;
  if (lines[0].startsWith('Array')) {
    index = 1;
    if (lines[index] && lines[index].trim() === '(') {
      index++;
    }
    parsed = parseBlock();
  } else {
    parsed = {};
  }

  parsed.targeting = true;
  return parsed;
};
