import { readTemplate } from './template-reader.js';

function getPrettierContent() {
  return { filename: '.prettierrc', content: readTemplate('formatters/.prettierrc') };
}

export { getPrettierContent };
