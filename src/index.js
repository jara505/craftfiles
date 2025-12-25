import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { detectProjectType } from './detectors.js';
import { generateBiome, generatePrettier, generateEnv, generateAgents } from './generators/index.js';

async function initCommand() {
  console.log('Welcome to CraftFiles! 🔨');

  const projectType = detectProjectType();

  // Check for existing files
  const existingFiles = [];
  if (fs.existsSync('biome.json')) existingFiles.push('biome.json');
  if (fs.existsSync('.prettierrc')) existingFiles.push('.prettierrc');
  if (fs.existsSync('.env')) existingFiles.push('.env');
  if (fs.existsSync('AGENTS.md')) existingFiles.push('AGENTS.md');

  let overwrite = false;
  if (existingFiles.length > 0) {
    if (process.stdout.isTTY) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `Some files already exist: ${existingFiles.join(', ')}. Overwrite them?`,
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

  let answers = { linter: 'Biome', env: true, agents: true }; // Defaults for testing

  // For interactive, check if TTY
  if (process.stdout.isTTY) {
    let questions = [];

    if (projectType === 'js/ts') {
      questions.push({
        type: 'list',
        name: 'linter',
        message: 'Choose your code quality tool (Biome: linter + formatter in one, Prettier: formatter only):',
        choices: ['Biome', 'Prettier', 'None'],
        default: 'Biome'
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
  }

  // Generate files based on answers
  if (answers.linter === 'Biome') {
    await generateBiome();
  } else if (answers.linter === 'Prettier') {
    await generatePrettier();
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