import fs from 'fs-extra';

async function generatePrettier() {
  const prettierConfig = {
    "semi": false,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "bracketSpacing": true,
    "arrowParens": "avoid",
    "endOfLine": "lf",
    "quoteProps": "as-needed",
    "jsxSingleQuote": true
  };

  await fs.writeJson('.prettierrc', prettierConfig, { spaces: 2 });
  console.log('✅ .prettierrc generated with best practices for JS/TS!');
}

export { generatePrettier };