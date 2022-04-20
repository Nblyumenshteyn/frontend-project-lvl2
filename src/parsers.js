import yaml from 'js-yaml';

export default function parse(data, fileExtension) {
  let file;
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    file = yaml.load(data);
  } else if (fileExtension === '.json') {
    file = JSON.parse(data);
  } else if (fileExtension === '') {
    file = JSON.parse(data);
  }

  return file;
}
