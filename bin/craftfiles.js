#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { initCommand } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json')));
const version = packageJson.version;

program
  .name('craftfiles')
  .description('CLI to initialize and generate config files for JS/TS projects')
  .version(version)
  .option('--creator', 'Show creator info');

program
  .command('init')
  .description('Initialize project with config files')
  .option('--env <profile>', 'Set .env profile (backend, frontend)')
  .allowExcessArguments(false)
  .configureOutput({
    outputError: () => {
      console.error('❌ Unknown arguments. Run "craftfiles init --help" for more information.');
      process.exit(1);
    }
  })
  .action((options) => initCommand(options));

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