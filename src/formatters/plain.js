const typeValueBefore = (valueBefore) => {
  if (valueBefore !== true && valueBefore !== false && valueBefore !== null && valueBefore !== undefined) {
    return `'${valueBefore}'`;
  }
  return `${valueBefore}`;
};

const typeValueAfter = (valueAfter) => {
  if (valueAfter !== true && valueAfter !== false && valueAfter !== null && valueAfter !== undefined) {
    return `'${valueAfter}'`;
  }
  return `${valueAfter}`;
};

const pathNode = (tree, index) => {
  let resultPath = [];
  if (tree[index].level === 0) {
    resultPath = [];
    resultPath.push(tree[index].key);
    Object.assign(tree[index], { path: resultPath });
  } else if (tree[index].level === tree[index - 1].level) {
    resultPath = tree[index - 1].path;
    resultPath = resultPath.slice(0, resultPath.length - 1);
    resultPath.push(tree[index].key);
    Object.assign(tree[index], { path: resultPath });
  } else if (tree[index].level < tree[index - 1].level) {
    resultPath = tree[index - 1].path;
    const differenceLevel = `${tree[index - 1].level}` - `${tree[index].level}`;
    resultPath.length = resultPath.length - differenceLevel - 1;
    resultPath.push(tree[index].key);
    Object.assign(tree[index], { path: resultPath });
  } else if (tree[index].level > tree[index - 1].level) {
    resultPath = tree[index - 1].path;
    resultPath.push(tree[index].key);
    Object.assign(tree[index], { path: resultPath });
  }
  return tree[index];
};

const plain = (tree) => {
  let pathTree = [];
  let newObj = {};
  const result = [];

  for (let i = 0; i < tree.length; i += 1) {
    newObj = pathNode(tree, i);

    if (newObj.type === 'updated') {
      pathTree = newObj.path.join('.');
      if (newObj.valueBeforeObj === true) {
        result.push(`Property '${pathTree}' was updated. From [complex value] to ${typeValueAfter(newObj.valueAfter)}`);
      } else if (newObj.valueAfterObj === true) {
        result.push(`Property '${pathTree}' was updated. From ${typeValueBefore(newObj.valueBefore)} to [complex value]`);
      } else {
        result.push(`Property '${pathTree}' was updated. From ${typeValueBefore(newObj.valueBefore)} to ${typeValueAfter(newObj.valueAfter)}`);
      }
    } else if (newObj.type === 'added') {
      pathTree = newObj.path.join('.');
      if (newObj.valueAfterObj === true) {
        result.push(`Property '${pathTree}' was added with value: [complex value]`);
      } else {
        result.push(`Property '${pathTree}' was added with value: ${typeValueAfter(newObj.valueAfter)}`);
      }
    } else if (newObj.type === 'removed') {
      pathTree = newObj.path.join('.');
      result.push(`Property '${pathTree}' was removed`);
    }
  }

  const answer = result.join('\n');
  return answer;
};

export default plain;
