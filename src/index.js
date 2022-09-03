import { readFileSync } from 'fs';
import path from 'path/posix';
import parse from './parsers.js';
import buildTree from './buildTree.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const absoluteFilePath1 = path.resolve(process.cwd(), filepath1);
  const absoluteFilePath2 = path.resolve(process.cwd(), filepath2);
  const readFile1 = readFileSync(absoluteFilePath1, 'utf-8');
  const readFile2 = readFileSync(absoluteFilePath2, 'utf-8');
  const file1 = parse(readFile1, path.extname(filepath1));
  const file2 = parse(readFile2, path.extname(filepath2));

  return buildTree(file1, file2);
}
