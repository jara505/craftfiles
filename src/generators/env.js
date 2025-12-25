const fs = require('fs-extra');

async function generateEnv() {
  const envContent = `# Environment Variables
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your_api_key_here
DEBUG=true
`;

  await fs.writeFile('.env', envContent);
  console.log('.env generated!');
}

module.exports = { generateEnv };