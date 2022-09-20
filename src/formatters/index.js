import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
  }
}

export default formatter;
