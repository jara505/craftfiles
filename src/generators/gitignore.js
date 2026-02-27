import { readTemplate } from './template-reader.js';

function getGitignoreContent() {
  return { filename: '.gitignore', content: readTemplate('git/.gitignore') };
}

export { getGitignoreContent };
