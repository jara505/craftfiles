import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { VALID_AGENTS_MODES } from '../core/constants.js';
import { getMemoryContent, getMcpSnippet } from '../generators/memory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SKILLS = ['git-workflow', 'staff-engineer-protocol', 'design-ui-ux'];
const LEGACY_AGENTS_FILE = 'AGENTS.md';

function getLegacyFilesExist() {
  const legacyFiles = [LEGACY_AGENTS_FILE, ...SKILLS.map((s) => `skills/${s}/SKILL.md`)];
  return legacyFiles.filter((f) => existsSync(f));
}

function generateFileMode() {
  const skillsDir = join(__dirname, '..', 'templates', 'agents', 'skills');
  let created = 0;

  for (const skillName of SKILLS) {
    const targetDir = join('skills', skillName);
    const targetFile = join(targetDir, 'SKILL.md');

    if (existsSync(targetFile)) {
      console.log(`⏭️  ${targetFile} already exists, skipping.`);
      continue;
    }

    const templatePath = join(skillsDir, skillName, 'SKILL.md');
    if (!existsSync(templatePath)) {
      console.error(`❌ Template not found: ${templatePath}`);
      process.exit(1);
    }

    mkdirSync(targetDir, { recursive: true });
    const content = readFileSync(templatePath, 'utf-8');
    writeFileSync(targetFile, content, 'utf-8');
    console.log(`📋 ${targetFile} generated successfully!`);
    created++;
  }

  if (created === 0) {
    console.log('✅ All skills already up to date.');
  }
}

async function generateMemoryMode() {
  const legacyFiles = getLegacyFilesExist();
  if (legacyFiles.length > 0) {
    const { migrate } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'migrate',
        message: `⚠️ Detected legacy files: ${legacyFiles.join(', ')}. Migrate to memory mode?`,
        default: true,
      },
    ]);

    if (!migrate) {
      console.log('❌ Memory generation cancelled.');
      return;
    }
  }

  const memory = getMemoryContent();
  mkdirSync(memory.dir, { recursive: true });
  writeFileSync(memory.filename, memory.content, 'utf-8');
  console.log(`🧠 Memory file generated: ${memory.filename}`);
  console.log(getMcpSnippet());
}

async function agentsCommand(options = {}) {
  const mode = options.mode;

  if (!mode || !VALID_AGENTS_MODES.includes(mode)) {
    console.error('❌ You must specify a mode: --mode file | --mode memory');
    console.log('   Example: craftfiles agents --mode file');
    console.log('   Example: craftfiles agents --mode memory');
    process.exit(1);
  }

  if (mode === 'file') {
    generateFileMode();
  } else if (mode === 'memory') {
    await generateMemoryMode();
  }
}

export { agentsCommand };
