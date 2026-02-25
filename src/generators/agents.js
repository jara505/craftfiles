import fs from 'fs-extra';
import { readTemplate } from './template-reader.js';

function getAgentsContent() {
  return { filename: 'AGENTS.md', content: readTemplate('AGENTS.md') };
}

async function generateAgents() {
  await fs.writeFile('AGENTS.md', readTemplate('AGENTS.md'));
  console.log('🤖 AGENTS.md generated with AI guidelines!');
}

export { generateAgents, getAgentsContent };
