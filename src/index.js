import inquirer from 'inquirer';
import fs from 'fs-extra';
import { detectProjectType, detectExistingQualityTool, isTypeScriptProject } from './detectors.js';
import { VALID_PROFILES } from './constants.js';
import {
  generateBiome, getBiomeContent,
  generatePrettier, getPrettierContent,
  generateTsconfig, getTsconfigContent,
  generateEnv, getEnvContent,
  generateAgents, getAgentsContent
} from './generators/index.js';

async function initCommand(options = {}) {
  console.log('Welcome to CraftFiles! 🔨');

  const profile = options.env || null;

  if (profile && !VALID_PROFILES.includes(profile)) {
    console.log(`Unknown profile: "${profile}". Valid profiles: ${VALID_PROFILES.join(', ')}`);
    return;
  }

  const projectType = detectProjectType();
  const isTs = isTypeScriptProject();

  let answers = { linter: 'Biome', env: true, agents: true, tsconfig: false, enableAlias: false };

  if (process.stdout.isTTY) {
    // Ask linter question first to detect conflicts immediately
    if (projectType === 'js/ts') {
      const linterAnswer = await inquirer.prompt({
        type: 'list',
        name: 'linter',
        message: 'Choose your code quality tool (Biome: linter + formatter, Prettier: formatter only):',
        choices: ['Biome', 'Prettier', 'None'],
        default: 'Biome'
      });

      answers.linter = linterAnswer.linter;

      // Detect conflict between quality tools right after selection
      if (answers.linter !== 'None') {
        const existingTool = detectExistingQualityTool();

        if (existingTool && existingTool !== answers.linter) {
          console.log(`\n⚠️  Detected existing quality tool: ${existingTool}`);

          const { replace } = await inquirer.prompt({
            type: 'confirm',
            name: 'replace',
            message: `Do you want to replace it with ${answers.linter}?`,
            default: false
          });

          if (!replace) {
            answers.linter = 'None';
          }
        }
      }
    }

    // Continue with remaining questions
    const remainingQuestions = [];

    if (isTs) {
      remainingQuestions.push({
        type: 'confirm',
        name: 'tsconfig',
        message: 'Generate a tsconfig.json file with best practices?',
        default: true
      });
      remainingQuestions.push({
        type: 'confirm',
        name: 'enableAlias',
        message: 'Enable path aliases (e.g., @/* for src/*)?',
        default: true,
        when: (a) => a.tsconfig
      });
    }

    remainingQuestions.push({
      type: 'confirm',
      name: 'env',
      message: 'Create .env file with basic environment variables?',
      default: true
    });

    if (!profile) {
      remainingQuestions.push({
        type: 'list',
        name: 'profile',
        message: 'What type of project is this?',
        choices: ['backend', 'frontend'],
        default: 'backend',
        when: (a) => a.env
      });
    }

    remainingQuestions.push({
      type: 'confirm',
      name: 'agents',
      message: 'Create AGENTS.md with instructions for AI tools?',
      default: true
    });

    const remainingAnswers = await inquirer.prompt(remainingQuestions);
    answers = { ...answers, ...remainingAnswers };
  } else {
    console.log('Non-interactive mode: Using defaults.');
    if (isTs) {
      answers.tsconfig = true;
      answers.enableAlias = true;
    }

    // Detect conflict in non-interactive mode
    if (answers.linter !== 'None') {
      const existingTool = detectExistingQualityTool();

      if (existingTool && existingTool !== answers.linter) {
        console.log(`⚠️  Detected existing quality tool: ${existingTool}`);
        console.log(`Skipping ${answers.linter} generation to avoid conflict.`);
        answers.linter = 'None';
      }
    }
  }

  const selectedProfile = profile || answers.profile || 'backend';

  // Build the list of intended files with their generators
  const intendedFiles = [];

  if (answers.linter === 'Biome') {
    intendedFiles.push({ ...getBiomeContent(), generate: () => generateBiome() });
  } else if (answers.linter === 'Prettier') {
    intendedFiles.push({ ...getPrettierContent(), generate: () => generatePrettier() });
  }

  if (answers.tsconfig) {
    intendedFiles.push({ ...getTsconfigContent(answers.enableAlias), generate: () => generateTsconfig(answers.enableAlias) });
  }

  if (answers.env) {
    intendedFiles.push({ ...getEnvContent(selectedProfile), generate: () => generateEnv(selectedProfile) });
  }

  if (answers.agents) {
    intendedFiles.push({ ...getAgentsContent(), generate: () => generateAgents() });
  }

  if (intendedFiles.length === 0) {
    console.log('No files selected for generation.');
    return;
  }

  // Compare intended files against what's on disk
  const toCreate = [];
  const differing = [];
  const upToDate = [];

  for (const file of intendedFiles) {
    if (fs.existsSync(file.filename)) {
      const existing = fs.readFileSync(file.filename, 'utf-8');
      if (existing === file.content) {
        upToDate.push(file);
      } else {
        differing.push(file);
      }
    } else {
      toCreate.push(file);
    }
  }

  // All files already match
  if (differing.length === 0 && toCreate.length === 0) {
    console.log('✅ All files are already up to date!');
    return;
  }

  // Handle differing files
  let filesToWrite = [...toCreate];

  if (differing.length > 0) {
    console.log('\n⚠️  The following files already exist and differ:');
    for (const f of differing) {
      console.log(`  - ${f.filename}`);
    }

    let overwrite = false;
    if (process.stdout.isTTY) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'overwrite',
        message: 'Do you want to overwrite them?',
        default: false
      });
      overwrite = answer.overwrite;
    } else {
      console.log('Skipping overwrite in non-interactive mode.');
    }

    if (overwrite) {
      filesToWrite = [...filesToWrite, ...differing];
    }
  }

  if (filesToWrite.length === 0) {
    console.log('No files were written.');
    return;
  }

  // Generate only the files that need writing
  for (const file of filesToWrite) {
    await file.generate();
  }

  // Persist metadata for clean and future upgrades
  const manifestPath = '.craftfiles.json';
  const existingManifest = fs.existsSync(manifestPath)
    ? fs.readJsonSync(manifestPath, { throws: false }) || {}
    : {};

  const writtenFilenames = filesToWrite.map(f => f.filename);
  const allTracked = [...new Set([...(existingManifest.files || []), ...writtenFilenames])];

  const manifest = {
    version: 1,
    profile: selectedProfile,
    files: allTracked,
    generatedAt: new Date().toISOString()
  };

  await fs.writeJson(manifestPath, manifest, { spaces: 2 });

  console.log('Done! Files generated. 🎉');
}

export { initCommand };
