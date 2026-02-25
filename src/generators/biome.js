import fs from 'fs-extra';
import { readTemplate } from './template-reader.js';

function getBiomeContent() {
  return { filename: 'biome.json', content: readTemplate('biome.json') };
}

async function generateBiome() {
  await fs.writeFile('biome.json', readTemplate('biome.json'));
  console.log('⚙️ biome.json generated with best practices for JS/TS!');
}

export { generateBiome, getBiomeContent };
