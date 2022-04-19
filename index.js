import { readFileSync } from 'fs';
import path from 'path/posix';

export default function genDiff(filepath1, filepath2) {
  const absoluteFilePath1 = path.resolve(process.cwd(), filepath1);
  const absoluteFilePath2 = path.resolve(process.cwd(), filepath2);
  const file1 = JSON.parse(readFileSync(absoluteFilePath1, 'utf-8'));
  const file2 = JSON.parse(readFileSync(absoluteFilePath2, 'utf-8'));

  const arr1 = Object.keys(file1);
  const arr2 = Object.keys(file2);

  const newKeys = Array.from(new Set([...arr1, ...arr2]));
  const differenceArr = newKeys.sort().map((key) => {
    if (file1[key] === file2[key]) {
      return `  ${key}: ${file1[key]}`;
    } if (file1[key] !== file2[key] && arr1.includes(key) && arr2.includes(key)) {
      return (`- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`);
    } if (arr1.includes(key)) {
      return `- ${key}: ${file1[key]}`;
    } if (arr2.includes(key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    return differenceArr;
  });

  const result = differenceArr.join('\n');
  return result;
}
