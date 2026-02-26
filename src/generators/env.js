import { readTemplate } from './template-reader.js';

function getEnvContent(profile) {
  const templateName = `envs/.env.${profile || 'backend'}`;
  return { filename: '.env', content: readTemplate(templateName) };
}

export { getEnvContent };
