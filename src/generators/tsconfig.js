import fs from 'fs-extra';

async function generateTsconfig(enableAlias = true) {
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

  await fs.writeJson('tsconfig.json', tsconfig, { spaces: 2 });
  console.log('📄 tsconfig.json generated with alias support!');
}

export { generateTsconfig };