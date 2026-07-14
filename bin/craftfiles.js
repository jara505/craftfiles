#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { initCommand } from '../src/core/index.js';
import { cleanCommand } from '../src/cli/clean.js';
import { agentsCommand } from '../src/cli/agents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json')));
const version = packageJson.version;

program
  .name('craftfiles')
  .description('CLI to initialize and generate config files for JS/TS projects')
  .version(version)
  .option('--creator', 'Show creator info')
  .action((options) => {
    if (options.creator) {
      console.log('Created by Juan Ignacio Jara Caceres 🇳🇮');
    }
  });

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
  .action(() => cleanCommand());

program
  .command('agents')
  .description('Generate AI agent config (file mode: skills/, memory mode: ~/.ai_brain/shared_memory.json)')
  .option('--mode <mode>', 'Generation mode: file or memory (required)')
  .action((options) => agentsCommand(options));

program.parse();
