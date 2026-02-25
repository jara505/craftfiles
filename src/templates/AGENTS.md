# AGENTS.md - Instructions for AI Tools

This document outlines guidelines for AI tools interacting with this project. Always prioritize user consent and best practices.

## 1. Permissions Before Changes
The AI must always request authorization and user consent before any manipulation of files, code, or project structure. Never assume permission; explicit confirmation is required.

## 2. Git Usage
This section covers Git manipulation, rules, commit structures, and pull requests.

### Branch Naming Rules
#### Format
- feat — new feature
- fix — bug fix
- hotfix — critical production fix
- refactor — internal code change
- chore — maintenance/config
- docs — documentation
- test — tests
- perf — performance
- ci — CI/CD
- build — build/dependencies

#### Rules
- Prefix is mandatory
- Use kebab-case
- One purpose per branch
- No uppercase, spaces, or underscores

### Git Commit Guidelines
1. **Subject Line**: Provide a concise summary (50-70 characters) of the change.
2. **Body (Optional)**: Include details on *why* the change was made, important decisions, and edge cases.
3. **Voice**: Use active and imperative voice (e.g., "Fix bug," "Add feature").
4. **Atomicity**: Each commit should be atomic, focusing on a single logical change (e.g., do not mix refactors, fixes, and features).
5. **Language**: Always write commit messages in English.

### Pull Request Structure
1. **Overview**: Provide a high-level summary of the changes, avoiding repetition of individual commit messages.
2. **Content**: Include what was done, why it was done, and its impact on other modules.
3. **Size**: Keep PRs small and focused; avoid "mega PRs."
4. **Language**: Always write pull request descriptions in English.
5. **Format**: The pr must be submitted in markdown format
### Verification Before Git Manipulation
Before manipulating Git (e.g., committing, pushing, creating branches), the AI must verify there are no issues such as uncommitted changes, merge conflicts, or failing tests. Only proceed with explicit user permission.

## 3. Coding Standards
This section outlines good programming practices and principles to follow as best practices in development.

- Use strict mode if available in your language (e.g., TypeScript or JavaScript).
- Prefer functional programming over classes where possible.
- Follow SOLID principles.
- Use the configured code quality tool (Prettier, Biome, or others) for linting and formatting.
- Always add comments to complex logic.
- Use descriptive variable names.
- Avoid global state.
- Keep functions and modules small and focused; single responsibility principle.
- Handle errors explicitly; avoid silent failures.
- Maintain consistent indentation and naming conventions.
- Avoid hardcoding values; use configuration or constants.
- Write tests for critical logic and edge cases.
- Review code for readability and maintainability before committing.
- Ensure dependencies are necessary and up-to-date.
- Test your changes before committing.

Happy coding! 🤖
