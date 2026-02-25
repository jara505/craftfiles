import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { detectProjectType } from './detectors.js';
import {
  generateBiome, getBiomeContent,
  generatePrettier, getPrettierContent,
  generateTsconfig, getTsconfigContent,
  generateEnv, getEnvContent,
  generateAgents, getAgentsContent
} from './generators/index.js';

function isTypeScriptProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  try {
    const packageJson = fs.readJsonSync(packageJsonPath);
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    return 'typescript' in deps || 'typescript' in devDeps;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    return false;
  }
}

const validProfiles = ['backend', 'frontend'];

async function initCommand(profile) {
  console.log('Welcome to CraftFiles! 🔨');

  if (profile && !validProfiles.includes(profile)) {
    console.log(`Unknown profile: "${profile}". Valid profiles: ${validProfiles.join(', ')}`);
    return;
  }

  const projectType = detectProjectType();
  const isTs = isTypeScriptProject();

  let answers = { linter: 'Biome', env: true, agents: true, tsconfig: false, enableAlias: false };

  if (process.stdout.isTTY) {
    let questions = [];

    if (projectType === 'js/ts') {
      questions.push({
        type: 'list',
        name: 'linter',
        message: 'Choose your code quality tool (Biome: linter + formatter, Prettier: formatter only):',
        choices: ['Biome', 'Prettier', 'None'],
        default: 'Biome'
      });
    }

    if (isTs) {
      questions.push({
        type: 'confirm',
        name: 'tsconfig',
        message: 'Generate a tsconfig.json file with best practices?',
        default: true
      });
      questions.push({
        type: 'confirm',
        name: 'enableAlias',
        message: 'Enable path aliases (e.g., @/* for src/*)?',
        default: true,
        when: (answers) => answers.tsconfig
      });
    }

    questions.push({
      type: 'confirm',
      name: 'env',
      message: 'Create .env file with basic environment variables?',
      default: true
    });

    if (!profile) {
      questions.push({
        type: 'list',
        name: 'profile',
        message: 'What type of project is this?',
        choices: ['backend', 'frontend'],
        default: 'backend',
        when: (answers) => answers.env
      });
    }

    questions.push({
      type: 'confirm',
      name: 'agents',
      message: 'Create AGENTS.md with instructions for AI tools?',
      default: true
    });

    answers = await inquirer.prompt(questions);
  } else {
    console.log('Non-interactive mode: Using defaults.');
    if (isTs) {
      answers.tsconfig = true;
      answers.enableAlias = true;
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

  console.log('Done! Files generated. 🎉');
}

export { initCommand };
