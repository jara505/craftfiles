const fs = require('fs-extra');
const path = require('path');

async function generateBiome() {
  const biomeConfig = {
    "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
    "organizeImports": {
      "enabled": true
    },
    "linter": {
      "enabled": true,
      "rules": {
        "recommended": true
      }
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2
    }
  };

  await fs.writeJson('biome.json', biomeConfig, { spaces: 2 });
  console.log('biome.json generated!');
}

module.exports = { generateBiome };