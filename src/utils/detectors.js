import fs from 'fs';
import path from 'path';

function isTypeScriptProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    return 'typescript' in deps || 'typescript' in devDeps;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    return false;
  }
}

function detectProjectType() {
  const cwd = process.cwd();

  // Check for JS/TS indicators
  const indicators = ['package.json', 'tsconfig.json', 'node_modules'];

  for (const file of indicators) {
    if (fs.existsSync(path.join(cwd, file))) {
      return 'js/ts';
    }
  }

  return 'universal';
}

function detectExistingQualityTool() {
  const cwd = process.cwd();

  const biomeFiles = ['biome.json', 'biome.jsonc'];
  const prettierFiles = [
    '.prettierrc', '.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml',
    '.prettierrc.js', '.prettierrc.cjs', '.prettierrc.mjs',
    'prettier.config.js', 'prettier.config.cjs', 'prettier.config.mjs'
  ];

  const hasBiome = biomeFiles.some(f => fs.existsSync(path.join(cwd, f)));
  const hasPrettier = prettierFiles.some(f => fs.existsSync(path.join(cwd, f)));

  if (hasBiome) return 'Biome';
  if (hasPrettier) return 'Prettier';
  return null;
}

export { detectProjectType, detectExistingQualityTool, isTypeScriptProject };