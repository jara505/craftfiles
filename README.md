# CraftFiles

<p align="center">
  <strong>Opinionated configuration files for JavaScript & TypeScript projects.</strong>
</p>

<p align="center">
  Configure existing projects in minutes—not hours.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@jara505/craftfiles">
    <img src="https://img.shields.io/npm/v/@jara505/craftfiles" alt="npm version">
  </a>
  <img src="https://img.shields.io/node/v/@jara505/craftfiles" alt="Node.js">
  <img src="https://img.shields.io/npm/dm/@jara505/craftfiles" alt="Downloads">
</p>

---

## What is CraftFiles?

CraftFiles is a CLI that injects production-ready configuration files into existing JavaScript and TypeScript projects.

It **does not scaffold applications**, generate boilerplate, or create project templates.

Instead, it helps you standardize your projects by generating the configuration files you actually need—all through a single interactive command.

```bash
craftfiles init
```

---

## Why CraftFiles?

Setting up a project often means repeating the same work:

- Searching for a good `tsconfig.json`
- Copying `.gitignore` from an old repository
- Choosing between Biome, ESLint, or Prettier
- Creating `.env` examples
- Configuring AI assistants
- Making everything work together

CraftFiles replaces that repetitive setup with one guided workflow while letting you decide exactly what gets generated.

---

## What can CraftFiles generate?

- ⚡ Biome configuration
- 🎨 Prettier configuration
- 📏 ESLint configuration
- 🟦 TypeScript configuration
- 🌱 Environment variable templates
- 🚫 `.gitignore`
- 🤖 AI agent configuration
- 🧹 Manifest tracking for safe cleanup

Every configuration is independent—you generate only what your project needs.

---

## Installation

> Requires **Node.js 18+**

```bash
npm install -g @jara505/craftfiles
```

---

## Quick Start

```bash
craftfiles init
```

Example:

```text
Welcome to CraftFiles 🔨

✔ Code quality tool · Biome
✔ Generate tsconfig.json · Yes
✔ Create .env file · Yes
✔ Project profile · Backend
✔ Generate .gitignore · Yes
✔ Configure AI agents · File Skills

✔ biome.json created
✔ tsconfig.json created
✔ .env created
✔ .gitignore created
✔ skills/git-workflow/SKILL.md created
✔ skills/staff-engineer-protocol/SKILL.md created
✔ skills/design-ui-ux/SKILL.md created

Done.
```

---

# Commands

| Command | Description |
|----------|-------------|
| `craftfiles init` | Interactive configuration wizard |
| `craftfiles init --env <profile>` | Select an environment profile |
| `craftfiles agents --mode <mode>` | Generate AI agent configuration |
| `craftfiles clean` | Remove generated files created by CraftFiles |
| `craftfiles --version` | Show version |
| `craftfiles --creator` | Show author information |

---

# AI Integration

CraftFiles supports two approaches for AI agent configuration.

The generated prompts are identical—the difference is **where they live**.

## File Mode

Generate repository-local skills.

```
skills/
├── git-workflow/
│   └── SKILL.md
├── staff-engineer-protocol/
│   └── SKILL.md
└── design-ui-ux/
    └── SKILL.md
```

### Best for

- Open source repositories
- Team collaboration
- Version-controlled prompts
- Projects that should be self-contained

Compatible with AI agents that support repository-based skill files.

```bash
craftfiles agents --mode file
```

---

## Memory Mode (MCP)

Generate a shared memory file outside your repository.

```
~/.ai_brain/shared_memory.json
```

CraftFiles also prints the MCP configuration snippet required by your AI agent.

### Best for

- Working across multiple projects
- Maintaining a single source of truth for AI instructions
- Avoiding duplicated prompt files in every repository
- Updating shared knowledge once instead of per project

```bash
craftfiles agents --mode memory
```

---

## Which mode should I choose?

Choose **File Mode** when AI instructions belong to the project and should be committed alongside the source code.

Choose **Memory Mode** when the same knowledge should be shared across multiple repositories through MCP Memory.

Both approaches are fully supported by CraftFiles—you decide which workflow fits your projects.

---

# Design Principles

CraftFiles is built around a few simple ideas.

- Configure existing projects—not scaffold new ones.
- Opinionated defaults over endless configuration.
- Generate only what you need.
- Keep configurations easy to maintain.
- Track generated files for safe cleanup.

---

# License

Copyright © 2025–2026 Juan Ignacio Jara Caceres.

This project is proprietary software.

You may not redistribute, modify, or create derivative works without explicit written permission from the author.
