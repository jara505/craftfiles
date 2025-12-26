import fs from 'fs-extra';
import path from 'path';

async function generateBiome() {
  const biomeConfig = {
    "$schema": "https://biomejs.dev/schemas/2.3.10/schema.json",
    "organizeImports": {
      "enabled": true
    },
    "linter": {
      "enabled": true,
      "rules": {
        "recommended": true,
        "style": {
          "noNonNullAssertion": "off",
          "useTemplate": "error"
        }
      }
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2,
      "lineEnding": "lf",
      "lineWidth": 80
    },
    "javascript": {
      "parser": {
        "unsafeParameterDecoratorsEnabled": true
      },
      "formatter": {
        "enabled": true
      }
    },
    "assist": {
      "actions": {
        "source": {
          "organizeImports": "on"
        }
      }
    }
  };

  await fs.writeJson('biome.json', biomeConfig, { spaces: 2 });
  console.log('⚙️ biome.json generated with best practices for JS/TS!');
}

export { generateBiome };