import fs from 'fs-extra';
import { readTemplate } from './template-reader.js';

function getPrettierContent() {
  return { filename: '.prettierrc', content: readTemplate('.prettierrc') };
}

async function generatePrettier() {
  await fs.writeFile('.prettierrc', readTemplate('.prettierrc'));
  console.log('✅ .prettierrc generated with best practices for JS/TS!');
}

export { generatePrettier, getPrettierContent };
