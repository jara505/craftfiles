import fs from 'fs-extra';
import { readTemplate } from './template-reader.js';

function getTsconfigContent(enableAlias = true) {
  const templateName = enableAlias ? 'tsconfig-alias.json' : 'tsconfig.json';
  return { filename: 'tsconfig.json', content: readTemplate(templateName) };
}

async function generateTsconfig(enableAlias = true) {
  await fs.writeFile('tsconfig.json', getTsconfigContent(enableAlias).content);
  console.log('📄 tsconfig.json generated with best practices!');
}

export { generateTsconfig, getTsconfigContent };
