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

      if (!arr1.includes(key) && arr2.includes(key)) {
        if (isObject(second)) {
          acc.push({
            level, key, type: 'added', valueAfter: second,  valueAfterObj: true,
          });
        } else {
          acc.push({
            level, key, type: 'added', valueAfter: second, valueAfterObj: false,
          })
        }
      } else if (arr1.includes(key) && !arr2.includes(key)) {
        if (isObject(first)) {
          acc.push({
            level, key, type: 'deleted', valueBefore: first,  valueBeforeObj: true,
          });
        } else {
          acc.push({
            level, key, type: 'deleted', valueBefore: first, valueBeforeObj: false,
          })
        }
      } else if (arr1.includes(key) && arr2.includes(key) && isObject(first) && isObject(second)) {
        acc.push({ level, key, type: 'modifiedChild'});
        analytheTree(first, second, acc, level);
      } else if (arr1.includes(key) && arr2.includes(key) && first !== second && isObject(first)) {
        acc.push({
          level, key, type: 'modified', valueBefore: first, valueAfter: second, valueBeforeObj: true, valueAfterObj: false,
        });
      } else if (arr1.includes(key) && arr2.includes(key) && first !== second && isObject(second)) {
        acc.push({
          level, key, type: 'modified', valueBefore: first, valueAfter: second, valueBeforeObj: false, valueAfterObj: true,
        });
      } else if (arr1.includes(key) && arr2.includes(key) && first !== second) {
        acc.push({
          level, key, type: 'modified', valueBefore: first, valueAfter: second, valueBeforeObj: false, valueAfterObj: false,
        });
      } else {
        acc.push({
          level, key, type: 'unchanged', valueBefore: first, valueAfter: second,
        });
      }

      // if (!arr1.includes(key) && arr2.includes(key)) {
      //   acc.push({
      //     level, key, type: 'added', valueAfter: second,
      //   });
      // } else if (arr1.includes(key) && !arr2.includes(key)) {
      //   acc.push({
      //     level, key, type: 'deleted', valueBefore: first,
      //   });
      // } else if (arr1.includes(key) && arr2.includes(key) && isObject(first) && isObject(second)) {
      //   acc.push({ level, key, type: 'modifiedChild'});
      //   analytheTree(first, second, acc, level);
      // } else if (arr1.includes(key) && arr2.includes(key) && first !== second) {
      //   acc.push({
      //     level, key, type: 'modified', valueBefore: first, valueAfter: second,
      //   });
      // } else {
      //   acc.push({
      //     level, key, type: 'unchanged', valueBefore: first, valueAfter: second,
      //   });
      // }
    });

    level -= 1;
    return acc;
  };

  const acc = [];
  const level = -1;

  analytheTree(file1, file2, acc, level);
  // console.log(acc);
  const result = formatter(acc);
  return result;
};

export default buildTree;
