import fs from 'fs-extra';
import { getBiomeContent } from './biome.js';
import { getPrettierContent } from './prettier.js';
import { getTsconfigContent } from './tsconfig.js';
import { getEnvContent } from './env.js';
import { getAgentsContent } from './agents.js';
import { getMemoryContent } from './memory.js';
import { getGitignoreContent } from './gitignore.js';
import { getEslintContent } from './eslint.js';

const LOG_MESSAGES = {
  'biome.json': '⚙️ biome.json generated with best practices for JS/TS!',
  '.prettierrc': '✅ .prettierrc generated with best practices for JS/TS!',
  'eslint.config.js': '🔍 eslint.config.js generated as linting companion for Prettier!',
  'tsconfig.json': '📄 tsconfig.json generated with best practices!',
  '.env': '🔐 .env generated with basic variables!',
  'skills/git-workflow/SKILL.md': '📋 skills/git-workflow/SKILL.md generated!',
  'skills/staff-engineer-protocol/SKILL.md':
    '📋 skills/staff-engineer-protocol/SKILL.md generated!',
  'skills/design-ui-ux/SKILL.md': '📋 skills/design-ui-ux/SKILL.md generated!',
  '.gitignore': '🚫 .gitignore generated for JS/TS projects!',
};

const registry = [
  { name: 'Biome', group: 'linter', getContent: () => getBiomeContent() },
  { name: 'Prettier', group: 'linter', getContent: () => getPrettierContent() },
  { name: 'ESLint', group: 'eslint-companion', getContent: () => getEslintContent() },
  {
    name: 'tsconfig',
    group: 'tsconfig',
    getContent: (opts) => getTsconfigContent(opts.enableAlias),
  },
  { name: 'env', group: 'env', getContent: (opts) => getEnvContent(opts.profile) },
  { name: 'agents', group: 'agents', getContent: (opts) => getAgentsContent(opts.agentsMode) },
  { name: 'gitignore', group: 'gitignore', getContent: () => getGitignoreContent() },
];

function resolveFiles(answers, profile) {
  const opts = { enableAlias: answers.enableAlias, profile, agentsMode: answers.agentsMode };
  const selected = [];

  for (const entry of registry) {
    if (entry.group === 'linter' && entry.name !== answers.linter) continue;
    if (entry.group === 'linter' && answers.linter === 'None') continue;
    if (entry.group === 'eslint-companion' && answers.linter !== 'Prettier') continue;
    if (entry.group === 'tsconfig' && !answers.tsconfig) continue;
    if (entry.group === 'env' && !answers.env) continue;
    if (entry.group === 'agents' && answers.agentsMode === 'none') continue;
    if (entry.group === 'gitignore' && !answers.gitignore) continue;

    const result = entry.getContent(opts);
    const contents = Array.isArray(result) ? result : [result];

    for (const content of contents) {
      selected.push({
        ...content,
        generate: async () => {
          if (content.dir) {
            await fs.ensureDir(content.dir);
          }
          await fs.writeFile(content.filename, content.content);
          const logMsg = LOG_MESSAGES[content.filename] || `✅ ${content.filename} generated!`;
          console.log(logMsg);
        },
      });
    }
  }

  return selected;
}

export { resolveFiles };
