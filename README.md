# CraftFiles

CraftFiles is a CLI tool designed to initialize and generate configuration files for JavaScript and TypeScript projects. It helps developers quickly set up linters, formatters, environment variables, and AI instructions for their projects.

## Installation

```bash
npm install -g craftfiles
```

## Usage

Run the following command to start the interactive setup:

```bash
craftfiles init
```

This command detects if your project is JavaScript/TypeScript based and prompts you to choose which configuration files to generate, such as Biome (linter/formatter), Prettier (formatter), .env (environment variables), and AGENTS.md (instructions for AI tools).

### Example

```bash
$ craftfiles init
Welcome to CraftFiles! 🚀
? Choose a linter/formatter (Biome includes both, Prettier is formatter only): Biome
? Generate .env file? Yes
? Generate AGENTS.md file? Yes
biome.json generated!
.env generated!
AGENTS.md generated!
Done! Files generated. 🎉
```

## Features

- Automatically detects JavaScript/TypeScript projects
- Generates Biome, Prettier, .env, and AGENTS.md files
- Interactive prompts for easy customization

## Copyright

© 2025 Juan Ignacio Jara Caceres. All rights reserved.

This project is proprietary software. You may not distribute, modify, or create derivative works without explicit written permission from the author. No contributions, pull requests, or issues are accepted.

## License

This project is proprietary. All rights reserved. No contributions accepted.