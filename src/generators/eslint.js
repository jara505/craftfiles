import { readTemplate } from './template-reader.js';

function getEslintContent() {
  return { filename: 'eslint.config.js', content: readTemplate('formatters/eslint.config.js') };
}

export { getEslintContent };
