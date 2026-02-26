import fs from 'fs-extra';
import inquirer from 'inquirer';
import { MANIFEST_PATH } from '../core/constants.js';

async function cleanCommand() {
  console.log('🧹 CraftFiles Clean Mode');

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.log('No .craftfiles.json found. Nothing to clean.');
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
    await fs.remove(MANIFEST_PATH);
    console.log('🗑️ Removed .craftfiles.json');
    console.log('Clean completed! 🧽');
  } else {
    console.log('Clean cancelled.');
  }
}

export { cleanCommand };
