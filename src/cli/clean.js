import fs from 'fs-extra';
import inquirer from 'inquirer';
import { MANIFEST_PATH } from '../core/constants.js';

const AGENTS_FILE = 'AGENTS.md';
const SKILLS_DIR = 'skills';

async function cleanCommand() {
  console.log('🧹 CraftFiles Clean Mode');

  // Always check for AGENTS.md and skills/ (standalone mode)
  const agentsExists = fs.existsSync(AGENTS_FILE);
  const skillsExists = fs.existsSync(SKILLS_DIR);
  const manifestExists = fs.existsSync(MANIFEST_PATH);

  // Handle standalone AGENTS.md without manifest
  if (!manifestExists && !agentsExists && !skillsExists) {
    console.log('No .craftfiles.json, AGENTS.md, or skills/ found. Nothing to clean.');
    return;
  }

  if (!manifestExists && (agentsExists || skillsExists)) {
    // Only AGENTS.md and/or skills/ exist (standalone mode)
    const found = [agentsExists && AGENTS_FILE, skillsExists && `${SKILLS_DIR}/`].filter(Boolean);
    console.log(`Found: ${found.join(', ')}`);
    
    let confirm = true;
    if (process.stdout.isTTY) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: 'Remove these files?',
        default: false
      });
      confirm = answer.confirm;
    }

    if (confirm) {
      if (agentsExists) {
        await fs.remove(AGENTS_FILE);
        console.log(`🗑️ Removed ${AGENTS_FILE}`);
      }
      if (skillsExists) {
        await fs.remove(SKILLS_DIR);
        console.log(`🗑️ Removed ${SKILLS_DIR}/`);
      }
      console.log('Clean completed! 🧽');
    } else {
      console.log('Clean cancelled.');
    }
    return;
  }

  const manifest = fs.readJsonSync(MANIFEST_PATH, { throws: false });
  if (!manifest || !manifest.files || manifest.files.length === 0) {
    console.log('No tracked files found in .craftfiles.json.');
    return;
  }

  const existingFiles = manifest.files.filter(file => fs.existsSync(file));

  if (existingFiles.length === 0) {
    console.log('No generated files found on disk. Cleaning up manifest.');
    await fs.remove(MANIFEST_PATH);
    return;
  }

  console.log(`Found tracked files: ${existingFiles.join(', ')}`);

  let confirm = true;
  if (process.stdout.isTTY) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Remove these files?',
      default: false
    });
    confirm = answer.confirm;
  }

  if (confirm) {
    for (const file of existingFiles) {
      await fs.remove(file);
      console.log(`🗑️ Removed ${file}`);
    }
    
    // Remove AGENTS.md and skills/ only if not already handled by manifest
    if (agentsExists && !existingFiles.includes(AGENTS_FILE)) {
      await fs.remove(AGENTS_FILE);
      console.log(`🗑️ Removed ${AGENTS_FILE}`);
    }
    if (skillsExists && !fs.existsSync(SKILLS_DIR)) {
      // skills/ dir was already cleaned by manifest file removal
    } else if (skillsExists) {
      await fs.remove(SKILLS_DIR);
      console.log(`🗑️ Removed ${SKILLS_DIR}/`);
    }
    
    await fs.remove(MANIFEST_PATH);
    console.log('🗑️ Removed .craftfiles.json');
    console.log('Clean completed! 🧽');
  } else {
    console.log('Clean cancelled.');
  }
}

export { cleanCommand };
