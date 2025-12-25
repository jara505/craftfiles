#!/usr/bin/env node

import { program } from 'commander';
import { initCommand } from '../src/index.js';

program
  .name('craftfiles')
  .description('CLI to initialize and generate config files for JS/TS projects')
  .version('1.0.0')
  .option('--creator', 'Show creator info');

program
  .command('init')
  .description('Initialize project with config files interactively')
  .action(initCommand);

program
  .command('clean')
  .description('Remove generated config files')
  .action(async () => {
    const { cleanCommand } = await import('../src/clean.js');
    cleanCommand();
  });

if (process.argv.includes('--creator')) {
  console.log('Created by Juan Ignacio Jara Caceres 🇳🇮');
  process.exit(0);
}

program.parse();