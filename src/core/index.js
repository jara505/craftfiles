import { VALID_PROFILES } from './constants.js';
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

    await updateManifest(filesToWrite, selectedProfile);

    console.log('Done! Files generated. 🎉');
  } catch (error) {
    console.error(`❌ An error occurred: ${error.message}`);
    process.exit(1);
  }
}

export { initCommand };
