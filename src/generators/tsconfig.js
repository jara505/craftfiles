import { readTemplate } from './template-reader.js';

function getTsconfigContent(enableAlias = true) {
  const templateName = enableAlias ? 'tsconfig/tsconfig-alias.json' : 'tsconfig/tsconfig.json';
  return { filename: 'tsconfig.json', content: readTemplate(templateName) };
}

export { getTsconfigContent };
