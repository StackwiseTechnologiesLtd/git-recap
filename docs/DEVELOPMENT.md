# Development guide

This document covers local development for the **CLI** and the **landing site**.

## Prerequisites

| Area | Need |
|------|------|
| CLI | Bash, Git |
| Web | Node.js 22+ (CI uses 22), npm |
| Optional | ShellCheck |

Configure Git identity for realistic CLI tests:

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## Repository layout

| Path | Purpose |
|------|---------|
| `bin/git-recap` | Main CLI script |
| `tests/cli-smoke.sh` | CLI smoke tests |
| `web/` | Next.js + Tailwind landing page |
| `docs/logo.svg` | Canonical brand logo |
| `git-recap.rb` | Homebrew formula reference copy |
| `.github/workflows/ci.yml` | Lint + test + build |

## CLI workflow

```bash
chmod +x bin/git-recap tests/cli-smoke.sh

# Syntax
bash -n bin/git-recap

# Smoke tests
./tests/cli-smoke.sh

# Manual try
./bin/git-recap --help
./bin/git-recap --today
./bin/git-recap --plain ~/path/to/repo
```

### Useful flags while developing

* `--flat` — skip smart grouping
* `--plain` — no colors / hashes
* `--summary-only` — standup block only
* `--max-length N` — control truncation
* `--since "…"` / `--today` / `--yesterday` / `--week`

### Author matching

The CLI prefers `git config user.email`, then `user.name`. When testing, set both in the target repo or globally so commits are attributed correctly.

## Landing site workflow

```bash
cd web
npm install
npm run dev       # http://localhost:3000
npm run lint
npm test
npm run build     # static export → web/out/
npm start         # serve out/ locally
```

Deploy on Render as a static site: root `web`, build `npm install && npm run build`, publish directory `out`.

### Design tokens

* Background: `#ffffff`
* Text: `#0a0a0a`
* Primary: `#541111`
* Terminal panels: dark (`#0d0d0d`) for code / showcase blocks

Logo source of truth: `docs/logo.svg` → copy into `web/public/logo.svg` when the asset changes.

```bash
cp docs/logo.svg web/public/logo.svg
```

## Continuous integration

Workflow: `.github/workflows/ci.yml`

Triggers: `push` and `pull_request` to `main`.

Jobs:

1. **CLI** — `bash -n`, ShellCheck, `./tests/cli-smoke.sh`
2. **Web** — `npm ci`, `npm run lint`, `npm test`, `npm run build`

Always run the local equivalents before pushing.

## Releases (maintainers)

See **[VERSIONING.md](VERSIONING.md)** for the full checklist: which files to bump, CLI vs site-only releases, tagging, GitHub Releases, and Homebrew.

Short path:

1. Manually bump versions / changelog / `/releases` data (see VERSIONING.md).
2. Land on `main`, then `git tag vX.Y.Z && git push origin vX.Y.Z`.
3. Create a GitHub Release.
4. Refresh Homebrew `url` + `sha256` (CLI releases only).
5. Confirm `brew upgrade git-recap` and the live site `/releases` page.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| “No commits by …” | Author email/name mismatch; widen `--since` |
| Empty parent scan | Only immediate children with `.git` are scanned |
| Homebrew trust error | `brew trust StackwiseTechnologiesLtd/tools` |
| Web OG image warning | Set `metadataBase` in `web/src/app/layout.tsx` for production domain |

## Further reading

* [VERSIONING.md](VERSIONING.md) — version bumps and releases
* [CONTRIBUTING.md](../CONTRIBUTING.md)
* [README.md](../README.md)
* [web/README.md](../web/README.md)
