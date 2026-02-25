import { generateBiome, getBiomeContent } from './biome.js';
import { generatePrettier, getPrettierContent } from './prettier.js';
import { generateTsconfig, getTsconfigContent } from './tsconfig.js';
import { generateEnv, getEnvContent } from './env.js';
import { generateAgents, getAgentsContent } from './agents.js';

const registry = [
  {
    name: 'Biome',
    group: 'linter',
    getContent: () => getBiomeContent(),
    generate: () => generateBiome()
  },
  {
    name: 'Prettier',
    group: 'linter',
    getContent: () => getPrettierContent(),
    generate: () => generatePrettier()
  },
  {
    name: 'tsconfig',
    group: 'tsconfig',
    getContent: (opts) => getTsconfigContent(opts.enableAlias),
    generate: (opts) => generateTsconfig(opts.enableAlias)
  },
  {
    name: 'env',
    group: 'env',
    getContent: (opts) => getEnvContent(opts.profile),
    generate: (opts) => generateEnv(opts.profile)
  },
  {
    name: 'agents',
    group: 'agents',
    getContent: () => getAgentsContent(),
    generate: () => generateAgents()
  }
];

function resolveFiles(answers, profile) {
  const opts = { enableAlias: answers.enableAlias, profile };
  const selected = [];

  for (const entry of registry) {
    if (entry.group === 'linter' && entry.name !== answers.linter) continue;
    if (entry.group === 'linter' && answers.linter === 'None') continue;
    if (entry.group === 'tsconfig' && !answers.tsconfig) continue;
    if (entry.group === 'env' && !answers.env) continue;
    if (entry.group === 'agents' && !answers.agents) continue;

    const content = entry.getContent(opts);
    selected.push({ ...content, generate: () => entry.generate(opts) });
  }

  return selected;
}

export { registry, resolveFiles };
