import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { detectProjectType } from './detectors.js';
import { generateBiome, generatePrettier, generateTsconfig, generateEnv, generateAgents } from './generators/index.js';

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

async function initCommand() {
  console.log('Welcome to CraftFiles! 🔨');

  const projectType = detectProjectType();
  const isTs = isTypeScriptProject();

  // Check for existing files that this tool manages
  const existingFiles = [];
  if (fs.existsSync('biome.json')) existingFiles.push('biome.json');
  if (fs.existsSync('.prettierrc')) existingFiles.push('.prettierrc');
  if (fs.existsSync('.env')) existingFiles.push('.env');
  if (fs.existsSync('AGENTS.md')) existingFiles.push('AGENTS.md');
  if (isTs && fs.existsSync('tsconfig.json')) existingFiles.push('tsconfig.json');


  let overwrite = false;
  if (existingFiles.length > 0) {
    if (process.stdout.isTTY) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `Some config files already exist: ${existingFiles.join(', ')}. Overwrite them?`,
        default: false
      });
      overwrite = answer.overwrite;
    } else {
      console.log(`Warning: Files already exist: ${existingFiles.join(', ')}. Skipping in non-interactive mode.`);
      overwrite = false;
    }
    if (!overwrite) {
      console.log('Operation cancelled or skipped.');
      return;
    }
  }

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

  // Generate files based on answers
  if (answers.linter === 'Biome') {
    await generateBiome();
  } else if (answers.linter === 'Prettier') {
    await generatePrettier();
  }

  if (answers.tsconfig) {
    await generateTsconfig(answers.enableAlias);
  }

  if (answers.env) {
    await generateEnv();
  }

  if (answers.agents) {
    await generateAgents();
  }

  console.log('Done! Files generated. 🎉');
}

export { initCommand };