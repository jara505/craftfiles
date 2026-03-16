# Git Operations & Workflow
The AI must request explicit user authorization before any `git` command execution.

## 1. Branching Strategy
- **Format:** `<prefix>/<kebab-case-description>` (e.g., `feat/auth-middleware`).
- **Allowed Prefixes:** `feat`, `fix`, `hotfix`, `refactor`, `chore`, `docs`, `test`, `perf`, `ci`, `build`.
- **Constraint:** No uppercase, no spaces, no underscores.

## 2. Commit Guidelines (Conventional Commits)
- **Format:** `<type>: <imperative summary>` (50-70 chars).
- **Allowed Types:** `feat`, `fix`, `hotfix`, `refactor`, `chore`, `docs`, `test`, `perf`, `ci`, `build`.
- **Language:** English only.
- **Voice:** Use active, imperative mood (e.g., `feat: add validation` instead of `feat: added validation`).
- **Atomicity:** Each commit must represent a single logical change. Do not mix refactors with new features.
- **Body:** Use for "why" and "breaking changes" if necessary.
- **Examples:**
  - `feat: add JWT authentication middleware`
  - `fix: resolve null reference in user service`
  - `docs: update API usage examples`

## 3. Pull Request Structure
PRs must be submitted in Markdown with:
- **Overview:** High-level summary of the goal.
- **Key Changes:** Bullet points of technical implementations.
- **Impact:** List of modules affected.
- **Size:** Keep PRs focused; avoid "mega-PRs."
- **Format**: The pr must be submitted in markdown format

## 4. Forbidden Git Operations

The AI must never execute the following commands without explicit user approval:

- `git push --force`
- `git reset --hard`
- `git rebase -i` on shared branches

## 5. PR Preconditions

Before opening a Pull Request, the AI must ensure:

- Code compiles successfully
- Tests pass
- Linter passes
- No debug logs remain

## 6. Sensitive Files

The AI must request explicit confirmation before modifying:

- Dependency manifests (e.g., `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`)
- Lockfiles (e.g., `package-lock.json`, `poetry.lock`, `Cargo.lock`, `go.sum`)
- CI/CD configuration
- Database migrations
