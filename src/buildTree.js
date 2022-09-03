import formatter from './formatters/stylish.js';

export function isObject(item) {
  return (typeof item === 'object' && !Array.isArray(item) && item !== null);
}

const buildTree = (file1, file2) => {
  const analytheTree = (file1, file2, acc, level) => {
    const arr1 = Object.keys(file1);
    const arr2 = Object.keys(file2);
    const commonKeys = Array.from(new Set([...arr1, ...arr2])).sort();
    // const commonKeys = Object.keys({ ...file1, ...file2 });

    level += 1;

    commonKeys.map((key) => {
      const first = file1[key];
      const second = file2[key];

      if (arr1.includes(key) && arr2.includes(key) && isObject(first) && isObject(second)) {
        acc.push({ level, key, type: 'modifiedChild'});
        analytheTree(first, second, acc, level);
      } else if (arr1.includes(key) && arr2.includes(key) && first === second) {
        acc.push({
          level, key, type: 'unchanged', valueBefore: first, valueAfter: second,
        });
      } else if (arr1.includes(key) && arr2.includes(key) && first !== second) {
        acc.push({
          level, key, type: 'modified', valueBefore: first, valueAfter: second,
        });
      } else if (!arr1.includes(key) && arr2.includes(key)) {
        acc.push({
          level, key, type: 'added', valueAfter: second,
        });
      } else if (arr1.includes(key) && !arr2.includes(key)) {
        acc.push({
          level, key, type: 'deleted', valueBefore: first,
        });
      }
    });

    level -= 1;
    // console.log(acc);
    // const result = formatter(acc);
    // return result;
    return acc;
  };

  const acc = [];
  const level = -1;

  analytheTree(file1, file2, acc, level);
  // console.log(acc);
  const result = formatter(acc);
  return result;

  // const result = answer.join('\n');
  // console.log(answer);
};

export default buildTree;
