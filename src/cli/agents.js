import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AGENTS_FILE = 'AGENTS.md';

async function agentsCommand() {
  const templatePath = join(__dirname, '../templates/agents/AGENTS.md');
  
  if (!existsSync(templatePath)) {
    console.error('❌ AGENTS.md template not found.');
    process.exit(1);
  }

  if (existsSync(AGENTS_FILE)) {
    console.log(`⚠️  ${AGENTS_FILE} already exists. Skipping.`);
    return;
  }

  const content = readFileSync(templatePath, 'utf-8');
  writeFileSync(AGENTS_FILE, content, 'utf-8');
  
  console.log(`🤖 ${AGENTS_FILE} generated successfully!`);
}

export { agentsCommand };
