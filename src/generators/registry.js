import fs from 'fs-extra';
import { getBiomeContent } from './biome.js';
import { getPrettierContent } from './prettier.js';
import { getTsconfigContent } from './tsconfig.js';
import { getEnvContent } from './env.js';
import { getAgentsContent } from './agents.js';
import { getGitignoreContent } from './gitignore.js';
import { getEslintContent } from './eslint.js';

const LOG_MESSAGES = {
  'biome.json': '⚙️ biome.json generated with best practices for JS/TS!',
  '.prettierrc': '✅ .prettierrc generated with best practices for JS/TS!',
  'eslint.config.js': '🔍 eslint.config.js generated as linting companion for Prettier!',
  'tsconfig.json': '📄 tsconfig.json generated with best practices!',
  '.env': '🔐 .env generated with basic variables!',
  'AGENTS.md': '🤖 AGENTS.md generated with AI guidelines!',
  '.gitignore': '🚫 .gitignore generated for JS/TS projects!'
};

const registry = [
  { name: 'Biome', group: 'linter', getContent: () => getBiomeContent() },
  { name: 'Prettier', group: 'linter', getContent: () => getPrettierContent() },
  { name: 'ESLint', group: 'eslint-companion', getContent: () => getEslintContent() },
  { name: 'tsconfig', group: 'tsconfig', getContent: (opts) => getTsconfigContent(opts.enableAlias) },
  { name: 'env', group: 'env', getContent: (opts) => getEnvContent(opts.profile) },
  { name: 'agents', group: 'agents', getContent: () => getAgentsContent() },
  { name: 'gitignore', group: 'gitignore', getContent: () => getGitignoreContent() }
];

function resolveFiles(answers, profile) {
  const opts = { enableAlias: answers.enableAlias, profile };
  const selected = [];

  for (const entry of registry) {
    if (entry.group === 'linter' && entry.name !== answers.linter) continue;
    if (entry.group === 'linter' && answers.linter === 'None') continue;
    if (entry.group === 'eslint-companion' && answers.linter !== 'Prettier') continue;
    if (entry.group === 'tsconfig' && !answers.tsconfig) continue;
    if (entry.group === 'env' && !answers.env) continue;
    if (entry.group === 'agents' && !answers.agents) continue;
    if (entry.group === 'gitignore' && !answers.gitignore) continue;

    const content = entry.getContent(opts);
    selected.push({
      ...content,
      generate: async () => {
        await fs.writeFile(content.filename, content.content);
        console.log(LOG_MESSAGES[content.filename]);
      }
    });
  }

  return selected;
}

export { resolveFiles };
