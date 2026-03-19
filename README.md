# CraftFiles

[![npm](https://img.shields.io/npm/v/@jara505/craftfiles)](https://www.npmjs.com/package/@jara505/craftfiles)

CraftFiles is not a project generator. It's a post-setup config injector for JavaScript and TypeScript projects.

You already have your project. CraftFiles gives you opinionated, ready-to-use configuration files in a single command — no more copying from StackOverflow or running multiple CLIs.

## Features

- **Not a scaffolder** — works on existing projects, injects config only
- **Opinionated defaults** — every generated file comes with production-ready settings
- **Profile system** — `.env` adapts to backend or frontend contexts
- **Conflict detection** — detects existing Biome/Prettier configs and warns before overwriting
- **ESLint companion** — automatically generates `eslint.config.js` when Prettier is selected as linting companion
- **TypeScript aware** — detects TS projects and offers `tsconfig.json` with optional path aliases
- **Skills system** — generates `skills/git-workflow.md` alongside AGENTS.md for structured AI workflow guidelines
- **Manifest tracking** — tracks generated files in `.craftfiles.json` for clean removal via `craftfiles clean`

## Installation

> Requires Node.js >= 18

```bash
npm install -g @jara505/craftfiles
```

## Commands

| Command | Description |
|---|---|
| `craftfiles init` | Generate config files interactively |
| `craftfiles init --env <profile>` | Set .env profile (`backend` or `frontend`) |
| `craftfiles agents` | Generate AGENTS.md and skills/ (language-agnostic, no manifest) |
| `craftfiles clean` | Remove generated config files |
| `craftfiles --creator` | Display creator info |
| `craftfiles --version` | Show version |

## Example

```bash
$ craftfiles init
Welcome to CraftFiles! 🔨
? Choose your code quality tool (Biome: linter + formatter in one, Prettier: formatter only): Biome
? Generate a tsconfig.json file with best practices? Yes
? Create .env file with basic environment variables? Yes
? What type of project is this? backend
? Generate a .gitignore file for JS/TS projects? Yes
? Create AGENTS.md with instructions for AI tools? Yes
⚙️ biome.json generated with best practices for JS/TS!
📄 tsconfig.json generated with best practices!
🔐 .env generated with basic variables!
🚫 .gitignore generated for JS/TS projects!
🤖 AGENTS.md generated with AI guidelines!
📋 skills/git-workflow.md generated with git workflow guidelines!
Done! Files generated. 🎉
```

## License

© 2025-2026 Juan Ignacio Jara Caceres. All rights reserved.

This project is proprietary software. You may not distribute, modify, or create derivative works without explicit written permission from the author.
