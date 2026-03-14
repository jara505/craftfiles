import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AGENTS_FILE = 'AGENTS.md';
const SKILLS_DIR = 'skills';
const GIT_WORKFLOW_FILE = join(SKILLS_DIR, 'git-workflow.md');

async function agentsCommand() {
  const agentsTemplatePath = join(__dirname, '../templates/agents/AGENTS.md');
  const skillTemplatePath = join(__dirname, '../templates/agents/skills/git-workflow.md');

  if (!existsSync(agentsTemplatePath) || !existsSync(skillTemplatePath)) {
    console.error('❌ Agent templates not found.');
    process.exit(1);
  }

  const agentsExists = existsSync(AGENTS_FILE);
  const skillExists = existsSync(GIT_WORKFLOW_FILE);

  if (agentsExists && skillExists) {
    console.log(`⚠️  ${AGENTS_FILE} and ${SKILLS_DIR}/ already exist. Skipping.`);
    return;
  }

  if (!agentsExists) {
    const agentsContent = readFileSync(agentsTemplatePath, 'utf-8');
    writeFileSync(AGENTS_FILE, agentsContent, 'utf-8');
    console.log(`🤖 ${AGENTS_FILE} generated successfully!`);
  }

  if (!skillExists) {
    mkdirSync(SKILLS_DIR, { recursive: true });
    const skillContent = readFileSync(skillTemplatePath, 'utf-8');
    writeFileSync(GIT_WORKFLOW_FILE, skillContent, 'utf-8');
    console.log(`📋 ${GIT_WORKFLOW_FILE} generated successfully!`);
  }
}

export { agentsCommand };
