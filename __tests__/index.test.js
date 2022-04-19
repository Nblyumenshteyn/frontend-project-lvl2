import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = 'file1.json';
const file2 = 'file2.json';
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const answer = genDiff(getFixturePath(file1), getFixturePath(file2));

const result = '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true';

test('genDiff', () => {
  expect(answer).toEqual(result);
});
