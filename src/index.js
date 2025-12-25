const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const { detectProjectType } = require('./detectors');
const { generateBiome, generatePrettier, generateEnv, generateAgents } = require('./generators');

async function initCommand() {
  console.log('Welcome to CraftFiles! 🚀');

  const projectType = detectProjectType();

  let questions = [];

  if (projectType === 'js/ts') {
    questions.push({
      type: 'list',
      name: 'linter',
      message: 'Choose a linter/formatter (Biome includes both, Prettier is formatter only):',
      choices: ['Biome', 'Prettier', 'None'],
      default: 'Biome'
    });
  }

  questions.push({
    type: 'confirm',
    name: 'env',
    message: 'Generate .env file?',
    default: true
  });

  questions.push({
    type: 'confirm',
    name: 'agents',
    message: 'Generate AGENTS.md file?',
    default: true
  });

  const answers = await inquirer.prompt(questions);

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

module.exports = { initCommand };