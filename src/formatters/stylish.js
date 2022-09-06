import isObject from '../buildTree.js';

const formatter = (tree) => {
  // console.log(tree);
  const result = tree.map((node) => {
    const indent = '    '.repeat(node.level);
    const valueBefore = (`${JSON.stringify(node.valueBefore, null, 4)}`).replace(/\"/g, '').replace(/\n/g, `\n  ${indent}`).replace(/,/g, '');
    const valueAfter = (`${JSON.stringify(node.valueAfter, null, 4)}`).replace(/\"/g, '').replace(/\n/g, `\n  ${indent}`).replace(/,/g, '');

    switch (node.type) {
      case 'modifiedChild': {
        return `  ${indent}${node.key}: {`;
      }
      case 'unchanged': {
        return `  ${indent}${node.key}: ${node.valueBefore}`;
      }
      case 'modified': {
        if (node.valueBeforeObj === true) {
          return `${indent}- ${node.key}: ${valueBefore}\n${indent}+ ${node.key}: ${node.valueAfter}`;
        } else if (node.valueAfterObj === true) {
          return `${indent}- ${node.key}: ${node.valueBefore}\n${indent}+ ${node.key}: ${valueAfter}`;
        } else {
          return `${indent}- ${node.key}: ${node.valueBefore}\n${indent}+ ${node.key}: ${node.valueAfter}`;
        }
      }
      case 'added': {
        if (node.valueAfterObj === true) {
          return `${indent}+ ${node.key}: ${valueAfter}`;
        } else {
          return `${indent}+ ${node.key}: ${node.valueAfter}`;
        }
      }
      case 'deleted': {
        if (node.valueBeforeObj === true) {
          return `${indent}- ${node.key}: ${valueBefore}`;
        } else {
          return `${indent}- ${node.key}: ${node.valueBefore}`;
        }
      }
      default: {
        throw Error('There is no such type');
      }
    }
  });
  // console.log(result);
  const answer = result.join('\n');
  return `{\n${answer}\n}`;
};

export default formatter;
