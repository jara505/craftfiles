import fs from 'fs-extra';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { MANIFEST_PATH, MEMORY_FILE, VALID_AGENTS_MODES } from '../core/constants.js';

const SKILLS = ['git-workflow', 'staff-engineer-protocol', 'design-ui-ux'];

function getSkillDirs() {
  return SKILLS.map((s) => `skills/${s}`);
}

async function cleanCommand(options = {}) {
  const mode = options.mode;

  if (!mode || !VALID_AGENTS_MODES.includes(mode)) {
    console.error('❌ You must specify a mode: --mode file | --mode memory');
    console.log('   Example: craftfiles clean --mode file');
    console.log('   Example: craftfiles clean --mode memory');
    process.exit(1);
  }

  console.log('🧹 CraftFiles Clean Mode');

  if (mode === 'file') {
    await cleanFileMode();
  } else if (mode === 'memory') {
    await cleanMemoryMode();
  }
}

async function cleanFileMode() {
  const skillDirs = getSkillDirs();
  const existingDirs = skillDirs.filter((dir) => fs.existsSync(dir));

  if (existingDirs.length === 0) {
    console.log('No skills/ directories found. Nothing to clean.');
    return;
  }

  console.log(`Found: ${existingDirs.join(', ')}`);

  let confirm = true;
  if (process.stdout.isTTY) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Remove these directories?',
      default: false,
    });
    confirm = answer.confirm;
  }

  if (confirm) {
    for (const dir of existingDirs) {
      await fs.remove(dir);
      console.log(`🗑️  Removed ${dir}/`);
    }
    console.log('Clean completed! 🧽');
  } else {
    console.log('Clean cancelled.');
  }
}

async function cleanMemoryMode() {
  if (!fs.existsSync(MEMORY_FILE)) {
    console.log(`Memory file not found: ${MEMORY_FILE}. Nothing to clean.`);
    return;
  }

  console.log(`Found: ${MEMORY_FILE}`);

  let confirm = true;
  if (process.stdout.isTTY) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Remove memory file?',
      default: false,
    });
    confirm = answer.confirm;
  }

  if (confirm) {
    await fs.remove(MEMORY_FILE);
    console.log(`🗑️  Removed ${MEMORY_FILE}`);

    // Remove .ai_brain dir if empty
    const memoryDir = dirname(MEMORY_FILE);
    if (fs.existsSync(memoryDir) && fs.readdirSync(memoryDir).length === 0) {
      await fs.remove(memoryDir);
      console.log(`🗑️  Removed ${memoryDir}/`);
    }

    console.log('Clean completed! 🧽');
  } else {
    console.log('Clean cancelled.');
  }
}

export { cleanCommand };
