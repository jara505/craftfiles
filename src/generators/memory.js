import fs from 'fs-extra';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { MEMORY_DIR, MEMORY_FILE } from '../core/constants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, '..', 'templates', 'agents', 'skills');

const SKILLS = ['git-workflow', 'staff-engineer-protocol', 'design-ui-ux'];

function getMemoryContent() {
  const entities = SKILLS.map((skillName) => {
    const skillPath = join(skillsDir, skillName, 'SKILL.md');
    const content = fs.readFileSync(skillPath, 'utf-8');
    return {
      name: skillName,
      entityType: 'skill',
      observations: [content],
    };
  });

  const memoryData = {
    entities,
    relations: [],
  };

  return {
    filename: MEMORY_FILE,
    dir: MEMORY_DIR,
    content: JSON.stringify(memoryData, null, 2),
  };
}

function getMcpSnippet() {
  return `\n📋 Copy this snippet and paste it into the "mcpServers" section of your AI agent config (opencode.json, claude_desktop_config.json, or equivalent).\n
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "${MEMORY_FILE}"
      }
    }
  }
}\n`;
}

export { getMemoryContent, getMcpSnippet };
