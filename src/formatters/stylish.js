// import isObject from '../buildTree.js';

// const stringifyValueBefore = (node) => {
//   if (isObject(node.valueBefore)) {
//     return node.valueBefore = (`${JSON.stringify(node.valueBefore, null, 10)}`).replace(/\"/g, '').replace(/[{()}]/g, '');
//   } else {
//     return node.valueBefore;
//   }
// }

// const stringifyValueAfter = (node) => {
//   if (isObject(node.valueAfter)) {
//     return node.valueAfter = (`${JSON.stringify(node.valueAfter, null, 10)}`).replace(/\"/g, '').replace(/[{()}]/g, '');
//   } else {
//     return node.valueAfter;
//   }
// }

const formatter = (tree) => {
  console.log(tree);
  const result = tree.map((node) => {
    const indent = '    '.repeat(node.level);
    const valueBefore = (`${JSON.stringify(node.valueBefore, null, 10)}`).replace(/\"/g, '').replace(/[{()}]/g, '');
    const valueAfter = (`${JSON.stringify(node.valueAfter, null, 10)}`).replace(/\"/g, '').replace(/[{()}]/g, '');
    switch (node.type) {
      case 'modifiedChild': {
        return `  ${indent}${node.key}: {`;
      }
      case 'unchanged': {
        return `  ${indent}${node.key}: ${node.valueBefore}`;
      }
      case 'modified': {
        return `${indent}- ${node.key}: ${valueBefore}\n${indent}+ ${node.key}: ${valueAfter}`;
      }
      case 'added': {
        return `${indent}+ ${node.key}: ${valueAfter}`;
      }
      case 'deleted': {
        return `${indent}- ${node.key}: ${valueBefore}`;
      }
      default: {
        throw Error('There is no such type');
      }
    }
  });
  // console.log(result);
  const answer = result.join('\n');
  return `{\n${answer}}`;
};

export default formatter;

// '{common: {\n  + follow: false\n    setting1: Value 1\n  - setting2: 200\n  - setting3: true\n  + setting3: null\n  + setting4: blah blah\n  + setting5: {\n        key5: value5\n    }\n    setting6: {\n        doge: {\n          - wow: \n          + wow: so much\n        }\n        key: value\n      + ops: vops\n    }\n}\ngroup1: {\n  - baz: bas\n  + baz: bars\n    foo: bar\n  - nest: {\n        key: value\n    }\n}  + nest: str\n}\n- group2: {\n    abc: 12345\n    deep: {\n        id: 45\n    }\n}\n+ group3: {\n    deep: {\n        id: {\n            number: 45\n        }\n    }\n    fee: 100500\n}}'

// {
//   common: {                 2
//     + follow: false
//       setting1: Value 1
//     - setting2: 200
//     - setting3: true
//     + setting3: null
//     + setting4: blah blah
//     + setting5: {
//           key5: value5
//       }
//       setting6: {
//           doge: {
//             - wow:
//             + wow: so much
//           }
//           key: value
//         + ops: vops
//       }
//   }
//   group1: {
//     - baz: bas
//     + baz: bars
//       foo: bar
//     - nest: {
//           key: value
//       }
//     + nest: str
//   }
// - group2: {
//       abc: 12345
//       deep: {
//           id: 45
//       }
//   }
// + group3: {
//       deep: {
//           id: {
//               number: 45
//           }
//       }
//       fee: 100500
//   }
// }
