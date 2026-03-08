# CraftFiles

CraftFiles is not a project generator. It's a post-setup config injector for JavaScript and TypeScript projects.

You already have your project. CraftFiles gives you opinionated, ready-to-use configuration files in a single command — no more copying from StackOverflow or running multiple CLIs.

## Installation

```bash
npm install -g @jara505/craftfiles
```

## Usage

```bash
craftfiles init
```

Detects your project type and prompts you to select which config files to generate.

### Commands

| Command | Description |
|---|---|
| `craftfiles init` | Generate config files interactively |
| `craftfiles init --env <profile>` | Set .env profile (`backend` or `frontend`) |
| `craftfiles agents` | Generate AGENTS.md (language-agnostic, no manifest) |
| `craftfiles clean` | Remove generated config files |
| `craftfiles --creator` | Display creator info |
| `craftfiles --version` | Show version |

### Example

```bash
$ craftfiles init
Welcome to CraftFiles! 🔨
? Choose your code quality tool (Biome: linter + formatter in one, Prettier: formatter only): Biome
? Generate a tsconfig.json file with best practices? Yes
? Enable path aliases (e.g., @/* for src/*)? Yes
? Create .env file with basic environment variables? Yes
? What type of project is this? backend
? Generate a .gitignore file for JS/TS projects? Yes
? Create AGENTS.md with instructions for AI tools? Yes
⚙️ biome.json generated with best practices for JS/TS!
📄 tsconfig.json generated with best practices!
🔐 .env generated with basic variables!
🚫 .gitignore generated for JS/TS projects!
🤖 AGENTS.md generated with AI guidelines!
Done! Files generated. 🎉
```

## Features

- **Not a scaffolder** — works on existing projects, injects config only
- **Opinionated defaults** — every generated file comes with production-ready settings
- **Profile system** — `.env` adapts to backend or frontend contexts
- **Conflict detection** — detects existing Biome/Prettier configs and warns before overwriting
- **TypeScript aware** — detects TS projects and offers `tsconfig.json` with optional path aliases
- **Manifest tracking** — tracks generated files in `.craftfiles.json` for clean removal via `craftfiles clean`

## Supported Config Files

| File | Description |
|---|---|
| `biome.json` | Linter + formatter with best practices |
| `.prettierrc` | Formatter configuration |
| `tsconfig.json` | TypeScript compiler options (with optional aliases) |
| `.env` | Environment variables by profile |
| `.gitignore` | Ignore rules for JS/TS projects |
| `AGENTS.md` | AI assistant operational guidelines |

## License

© 2025 Juan Ignacio Jara Caceres. All rights reserved.

This project is proprietary software. You may not distribute, modify, or create derivative works without explicit written permission from the author.
