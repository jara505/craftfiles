import fs from 'fs-extra';
import path from 'path';

async function generateBiome() {
  const biomeConfig = {
    "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
    "organizeImports": {
      "enabled": true
    },
    "linter": {
      "enabled": true,
      "rules": {
        "recommended": true,
        "correctness": "error",
        "style": {
          "noNonNullAssertion": "off",
          "useTemplate": "error"
        },
        "suspicious": {
          "noExplicitAny": "warn"
        }
      }
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2,
      "lineEnding": "lf",
      "lineWidth": 80,
      "bracketSpacing": true,
      "semicolons": "asNeeded",
      "trailingCommas": "es5"
    }
  };

  await fs.writeJson('biome.json', biomeConfig, { spaces: 2 });
  console.log('⚙️ biome.json generated with best practices for JS/TS!');
}

export { generateBiome };