const fs = require('fs');
const path = require('path');

function detectProjectType() {
  const cwd = process.cwd();

  // Check for JS/TS indicators
  const indicators = ['package.json', 'tsconfig.json', 'node_modules'];

  for (const file of indicators) {
    if (fs.existsSync(path.join(cwd, file))) {
      return 'js/ts';
    }
  }

  return 'universal';
}

module.exports = { detectProjectType };