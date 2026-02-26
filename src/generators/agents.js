import { readTemplate } from './template-reader.js';

function getAgentsContent() {
  return { filename: 'AGENTS.md', content: readTemplate('agents/AGENTS.md') };
}

export { getAgentsContent };
