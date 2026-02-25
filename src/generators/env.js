import fs from 'fs-extra';

const envProfiles = {
  backend: `NODE_ENV=development
PORT=3000
DATABASE_URL=
JWT_SECRET=
`,
  frontend: `API_URL=
APP_ENV=development
`,
};

async function generateEnv(profile) {
  const envContent = envProfiles[profile] || envProfiles.backend;

  await fs.writeFile('.env', envContent);
  console.log('🔐 .env generated with basic variables!');
}

export { generateEnv };