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

function getEnvContent(profile) {
  return { filename: '.env', content: envProfiles[profile] || envProfiles.backend };
}

async function generateEnv(profile) {
  await fs.writeFile('.env', getEnvContent(profile).content);
  console.log('🔐 .env generated with basic variables!');
}

export { generateEnv, getEnvContent };