# CraftFiles

CraftFiles is a CLI tool designed to initialize and generate configuration files for JavaScript and TypeScript projects. It helps developers quickly set up linters, formatters, environment variables, and AI instructions for their projects.

## Installation

```bash
npm install -g @jara505/craftfiles
```

## Usage

Run the following command to start the interactive setup:

```bash
@jara505/craftfiles init
```

This command detects if your project is JavaScript/TypeScript based and prompts you to choose which configuration files to generate, such as Biome (linter/formatter), Prettier (formatter), .env (environment variables), and AGENTS.md (instructions for AI tools).

### Commands

- `@jara505/craftfiles init`: Initialize project with config files interactively.
- `@jara505/craftfiles clean`: Remove generated config files.

### Options

- `--help`, `-h`: Display help.
- `--version`, `-V`: Show version.
- `--creator`: Display creator info.

### Example

```bash
$ @jara505/craftfiles init
Welcome to CraftFiles! 🔨
? Choose your code quality tool (Biome: linter + formatter in one, Prettier: formatter only): Biome
? Create .env file with basic environment variables? Yes
? Create AGENTS.md with instructions for AI tools? Yes
⚙️ biome.json generated with best practices for JS/TS!
🔐 .env generated with basic variables!
🤖 AGENTS.md generated with AI guidelines!
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