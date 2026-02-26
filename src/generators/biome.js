import { readTemplate } from './template-reader.js';

function getBiomeContent() {
  return { filename: 'biome.json', content: readTemplate('formatters/biome.json') };
}

export { getBiomeContent };
