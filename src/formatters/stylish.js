const stylish = (tree) => {
  const closeBrackets = (node, indent, tempNodeList) => {
    if (node.isLast) {
      let str = `\n${indent.substring(0, indent.length - 2)}}`;

      let uplevel = 1;

      if (tempNodeList.length > 0) {
        for (let i = tempNodeList.length - 1; i >= 0; i -= 1) {
          if (tempNodeList[i].level === node.level - uplevel && tempNodeList[i].isLast) {
            str = `${str}\n${indent.substring(0, indent.length - 2 - (4 * uplevel))}}`;
            uplevel += 1;
          }
        }
      }

      return str;
    }
    return '';
  };

  const tempNodeList = [];

  const result = tree.map((node) => {
    tempNodeList.push(node);

    const indent = '    '.repeat(node.level);
    const valueBefore = (`${JSON.stringify(node.valueBefore, null, 4)}`).replace(/\"/g, '').replace(/\n/g, `\n  ${indent}`).replace(/,/g, '');
    const valueAfter = (`${JSON.stringify(node.valueAfter, null, 4)}`).replace(/\"/g, '').replace(/\n/g, `\n  ${indent}`).replace(/,/g, '');

    switch (node.type) {
      case 'modifiedChild': {
        return `  ${indent}${node.key}: {`;
      }
      case 'unchanged': {
        return `  ${indent}${node.key}: ${node.valueBefore}${closeBrackets(node, indent, tempNodeList)}`;
      }
      case 'updated': {
        if (node.valueBeforeObj === true) {
          return `${indent}- ${node.key}: ${valueBefore}\n${indent}+ ${node.key}: ${node.valueAfter}${closeBrackets(node, indent, tempNodeList)}`;
        } if (node.valueAfterObj === true) {
          return `${indent}- ${node.key}: ${node.valueBefore}\n${indent}+ ${node.key}: ${valueAfter}${closeBrackets(node, indent, tempNodeList)}`;
        }
        return `${indent}- ${node.key}: ${node.valueBefore}\n${indent}+ ${node.key}: ${node.valueAfter}${closeBrackets(node, indent, tempNodeList)}`;
      }
      case 'added': {
        if (node.valueAfterObj === true) {
          return `${indent}+ ${node.key}: ${valueAfter}${closeBrackets(node, indent, tempNodeList)}`;
        }
        return `${indent}+ ${node.key}: ${node.valueAfter}${closeBrackets(node, indent, tempNodeList)}`;
      }
      case 'removed': {
        if (node.valueBeforeObj === true) {
          return `${indent}- ${node.key}: ${valueBefore}${closeBrackets(node, indent, tempNodeList)}`;
        }
        return `${indent}- ${node.key}: ${node.valueBefore}${closeBrackets(node, indent, tempNodeList)}`;
      }
      default: {
        throw Error('There is no such type');
      }
    }
  });

  const answer = result.join('\n');
  return `{\n${answer}\n}`;
};

export default stylish;
