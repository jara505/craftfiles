const fs = require('fs-extra');

async function generateAgents() {
  const agentsContent = `# AGENTS.md - Instructions for AI Tools

## Project Overview
This project uses Clean Architecture and TypeScript. Follow these guidelines for AI-assisted development.

## Coding Standards
- Use TypeScript strict mode.
- Prefer functional programming over classes where possible.
- Follow SOLID principles.
- Use Biome for linting and formatting.

## File Structure
- src/: Source code
- tests/: Unit tests
- docs/: Documentation

## AI Guidelines
- Always add comments to complex logic.
- Use descriptive variable names.
- Avoid global state.
- Test your changes before committing.

Happy coding! 🤖
`;

  await fs.writeFile('AGENTS.md', agentsContent);
  console.log('AGENTS.md generated!');
}

module.exports = { generateAgents };