import fs from 'fs-extra';

function buildTsconfig(enableAlias = true) {
  const tsconfig = {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "outDir": "dist",
      "baseUrl": "."
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
  };

  if (enableAlias) {
    tsconfig.compilerOptions.paths = {
      "@/*": ["src/*"]
    };
  }

  return tsconfig;
}

function getTsconfigContent(enableAlias = true) {
  return { filename: 'tsconfig.json', content: JSON.stringify(buildTsconfig(enableAlias), null, 2) + '\n' };
}

async function generateTsconfig(enableAlias = true) {
  await fs.writeJson('tsconfig.json', buildTsconfig(enableAlias), { spaces: 2 });
  console.log('📄 tsconfig.json generated with alias support!');
}

export { generateTsconfig, getTsconfigContent };