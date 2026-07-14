import { readTemplate } from './template-reader.js';
import { getMemoryContent } from './memory.js';

const SKILLS = ['git-workflow', 'staff-engineer-protocol', 'design-ui-ux'];

function getAgentsContent(agentsMode = 'file') {
  if (agentsMode === 'none') {
    return [];
  }

  if (agentsMode === 'memory') {
    const memory = getMemoryContent();
    return [
      {
        filename: memory.filename,
        content: memory.content,
        dir: memory.dir,
      },
    ];
  }

  // File mode: generate 3 skill directories
  return SKILLS.map((skillName) => ({
    filename: `skills/${skillName}/SKILL.md`,
    content: readTemplate(`agents/skills/${skillName}/SKILL.md`),
    dir: `skills/${skillName}`,
  }));
}

export { getAgentsContent };
