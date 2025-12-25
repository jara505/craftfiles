#!/usr/bin/env node

const { program } = require('commander');
const { initCommand } = require('../src/index');

program
  .name('craftfiles')
  .description('CLI to initialize and generate config files for JS/TS projects')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize project with config files interactively')
  .action(initCommand);

program.parse();