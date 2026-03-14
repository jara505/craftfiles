import { readTemplate } from './template-reader.js';

function getAgentsContent() {
  return [
    { filename: 'AGENTS.md', content: readTemplate('agents/AGENTS.md') },
    { filename: 'skills/git-workflow.md', content: readTemplate('agents/skills/git-workflow.md'), dir: 'skills' }
  ];
}

export { getAgentsContent };
