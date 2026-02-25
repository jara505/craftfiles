import fs from 'fs-extra';
import { readTemplate } from './template-reader.js';

function getEnvContent(profile) {
  const templateName = `.env.${profile || 'backend'}`;
  return { filename: '.env', content: readTemplate(templateName) };
}

async function generateEnv(profile) {
  await fs.writeFile('.env', getEnvContent(profile).content);
  console.log('🔐 .env generated with basic variables!');
}

export { generateEnv, getEnvContent };
