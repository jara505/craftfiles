import fs from 'fs-extra';

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

function getPrettierContent() {
  return { filename: '.prettierrc', content: JSON.stringify(prettierConfig, null, 2) + '\n' };
}

async function generatePrettier() {
  await fs.writeJson('.prettierrc', prettierConfig, { spaces: 2 });
  console.log('✅ .prettierrc generated with best practices for JS/TS!');
}

export { generatePrettier, getPrettierContent };