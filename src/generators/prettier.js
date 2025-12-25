const fs = require('fs-extra');

async function generatePrettier() {
  const prettierConfig = {
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false
  };

  await fs.writeJson('.prettierrc', prettierConfig, { spaces: 2 });
  console.log('.prettierrc generated!');
}

module.exports = { generatePrettier };