import fs from 'fs-extra';
import inquirer from 'inquirer';

async function cleanCommand() {
  console.log('🧹 CraftFiles Clean Mode');

  const filesToCheck = ['biome.json', '.prettierrc', '.env', 'AGENTS.md'];
  const existingFiles = filesToCheck.filter(file => fs.existsSync(file));

  if (existingFiles.length === 0) {
    console.log('No generated files found to clean.');
    return;
  }

  console.log(`Found files: ${existingFiles.join(', ')}`);

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
    console.log('Clean completed! 🧽');
  } else {
    console.log('Clean cancelled.');
  }
}

export { cleanCommand };