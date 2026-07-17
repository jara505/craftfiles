import inquirer from 'inquirer';
import { existsSync, readdirSync, rmSync } from 'fs';
import { VALID_PROFILES, MEMORY_FILE } from './constants.js';
import { collectAnswers, confirmOverwrite } from '../cli/prompts.js';
import { resolveFiles } from '../generators/registry.js';
import { classifyFiles } from '../utils/file-comparator.js';
import { updateManifest } from '../utils/manifest.js';

async function initCommand(options = {}) {
  try {
    console.log('Welcome to CraftFiles! 🔨');

    const profile = options.env || null;

    if (profile && !VALID_PROFILES.includes(profile)) {
      console.log(`Unknown profile: "${profile}". Valid profiles: ${VALID_PROFILES.join(', ')}`);
      return;
    }

    const answers = await collectAnswers(profile);
    const selectedProfile = profile || answers.profile || 'backend';

    // Cross-mode detection: if user selected memory but has file mode active
    if (answers.agentsMode === 'memory') {
      const hasSkillsDir = existsSync('skills') && readdirSync('skills').length > 0;

      if (hasSkillsDir) {
        const { migrate } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'migrate',
            message: '⚠️ Detected file mode (skills/). Switch to memory mode?',
            default: true,
          },
        ]);

        if (!migrate) {
          console.log('Init cancelled. Resolve conflicts manually.');
          return;
        }

        // Clean file mode artifacts
        rmSync('skills', { recursive: true, force: true });
        console.log('🧹 Removed skills/ directory.');
      }

      // Check if memory file already exists
      if (existsSync(MEMORY_FILE)) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `⚠️ Memory file already exists: ${MEMORY_FILE}. Overwrite?`,
            default: false,
          },
        ]);

        if (!overwrite) {
          console.log('Memory generation skipped.');
          answers.agentsMode = 'none';
        }
      }
    }

    const intendedFiles = resolveFiles(answers, selectedProfile);

    if (intendedFiles.length === 0) {
      console.log('No files selected for generation.');
      return;
    }

    const { toCreate, differing } = classifyFiles(intendedFiles);

    if (differing.length === 0 && toCreate.length === 0) {
      console.log('✅ All files are already up to date!');
      return;
    }

    let filesToWrite = [...toCreate];

    if (differing.length > 0) {
      const overwrite = await confirmOverwrite(differing);
      if (overwrite) {
        filesToWrite = [...filesToWrite, ...differing];
      }
    }

    if (filesToWrite.length === 0) {
      console.log('No files were written.');
      return;
    }

    for (const file of filesToWrite) {
      await file.generate();
    }

    await updateManifest(filesToWrite, selectedProfile, answers.agentsMode);

    console.log('Done! Files generated. 🎉');
  } catch (error) {
    console.error(`❌ An error occurred: ${error.message}`);
    process.exit(1);
  }
}

export { initCommand };
