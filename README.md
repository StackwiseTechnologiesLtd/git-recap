<h1 align="center">
  <img
    src="docs/logo.svg"
    alt=""
    width="56"
    height="54"
    align="absmiddle"
    style="vertical-align: middle; margin-right: 0.4rem;"
  />
  <span style="vertical-align: middle;">git-recap</span>
</h1>

<p align="center">
  A lightweight, zero-dependency CLI that aggregates your local Git commit messages over a timeframe so you can prepare for daily standups in seconds.
</p>

<p align="center">
  It reads only from local <code>.git</code> state on disk. No SSH keys, no network, no remote APIs.
</p>

<p align="center">
  <a href="#installation">Install</a> ·
  <a href="#usage">Usage</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#development">Development</a> ·
  <a href="CONTRIBUTING.md">Contributing</a> ·
  <a href="https://github.com/StackwiseTechnologiesLtd/homebrew-tools">Homebrew tap</a>
</p>

---

## Features

* **Smart summaries** — groups commits into Features, Fixes, Docs, Refactors, Tests, Performance, Chores, and Other
* **Standup-ready** — short, readable bullets with a final copy-friendly summary
* **Contextual** — run inside a repo to recap just that project
* **Multi-scan** — run in a parent folder (e.g. `~/Projects`) to scan immediate subdirectories
* **Targeted** — pass specific paths or repo names as arguments
* **Reliable author matching** — prefers `git config user.email`, then falls back to `user.name`
* **Zero dependencies** — pure Bash + `git` plumbing
* **Private** — entirely offline; nothing leaves your machine

---

## Installation

### Homebrew

```bash
brew tap StackwiseTechnologiesLtd/tools
brew trust StackwiseTechnologiesLtd/tools   # required by modern Homebrew
brew install git-recap
```

### From source

```bash
git clone https://github.com/StackwiseTechnologiesLtd/git-recap.git
cd git-recap
chmod +x bin/git-recap
# optional: link onto your PATH
ln -s "$(pwd)/bin/git-recap" /usr/local/bin/git-recap
```

---

## Usage

```bash
git-recap                          # smart summary for current repo, or scan cwd subdirs
git-recap project-a ~/code/app     # specific targets
git-recap --today                  # commits since midnight
git-recap --yesterday              # yesterday's commits
git-recap --week                   # commits from the last week
git-recap --since "2 days ago"     # custom timeframe
git-recap --since "3 days ago" --until yesterday
git-recap --author "Jane Doe"      # override author match
git-recap --all-authors --today    # every author in the window
git-recap --max-length 72          # shorter standup bullets
git-recap --plain                  # paste into Slack / notes
git-recap --color never            # force no ANSI colors
git-recap --summary-only           # only the standup summary block
git-recap --flat                   # raw commit list
git-recap --include-merges         # keep merge commits
git-recap -r --today               # deep-scan folders for repos
git-recap --json --today           # machine-readable summary
GIT_RECAP_SINCE="1 week ago" git-recap
git-recap -V                       # version
git-recap -h                       # help
```

### Timeframe

| Method | Example |
|--------|---------|
| Default | last 24 hours (`1 day ago`) |
| Today | `git-recap --today` |
| Yesterday | `git-recap --yesterday` |
| Week | `git-recap --week` |
| Flag | `git-recap --since "3 days ago"` or `-s "yesterday"` |
| Until | `git-recap --until yesterday` or `-u "2026-07-01"` |
| Env | `GIT_RECAP_SINCE="1 week ago" git-recap` |

Values are passed through to `git log --since` / `--until`, so any Git date expression works. `--yesterday` uses `--since "yesterday 00:00" --until "today 00:00"`.

### Routing logic

| Situation | Behavior |
|-----------|----------|
| Paths/names passed as args | Process only those targets (skip if no `.git`) |
| No args, inside a Git repo | Recap this repository only |
| No args, not inside a repo | Scan immediate subdirectories for `.git` |

### Sample output

```text
my-app · 3 commits · since 1 day ago
────────────────────────────────────────
  Features (2)
    • Add dashboard filters (a1b2c3d)
    • Improve onboarding checklist (b2c3d4e)
  Fixes (1)
    • Handle expired auth tokens (c3d4e5f)

api-gateway · 1 commit · since 1 day ago
────────────────────────────────────────
  Performance (1)
    • Cache account lookup responses (d4e5f6a)

Standup summary · 4 commits · since 1 day ago
────────────────────────────────────────
  Features (2)
    • my-app: Add dashboard filters
    • my-app: Improve onboarding checklist
  Fixes (1)
    • my-app: Handle expired auth tokens
  Performance (1)
    • api-gateway: Cache account lookup responses
```

Repositories with no commits by you in the timeframe are omitted. Single-repo runs skip the duplicate standup block. Use `--plain` for paste-ready output, and `--summary-only` when you want just the final summary. Commit subjects are cleaned for standup readability: conventional prefixes like `feat:` are stripped in smart mode, and long subjects are shortened at word boundaries.

---

## Requirements

* Bash
* Git (with `user.email` or `user.name` configured)

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

---

## Project structure

```text
git-recap/
├── bin/git-recap          # CLI executable (Bash)
├── tests/cli-smoke.sh     # CLI smoke tests
├── docs/logo.svg          # Brand asset (canonical)
├── git-recap.rb           # Homebrew formula reference copy
├── web/                   # Landing site (Next.js + Tailwind)
├── .github/workflows/ci.yml
├── CONTRIBUTING.md
└── README.md
```

---

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for a full local workflow. Quick start:

### CLI

```bash
chmod +x bin/git-recap tests/cli-smoke.sh
bash -n bin/git-recap
./tests/cli-smoke.sh
./bin/git-recap --help
```

### Landing site

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test
npm run build
```

### Continuous integration

GitHub Actions (`.github/workflows/ci.yml`) runs on pushes and pull requests to `main`:

* CLI: `bash -n`, ShellCheck, smoke tests
* Web: `npm ci` → lint → tests → build

---

## Website

The marketing site lives in [`web/`](web/). Brand colors:

* Background: white
* Text: black
* Primary: `#541111` (matches the logo)

Canonical logo: [`docs/logo.svg`](docs/logo.svg) (mirrored to `web/public/logo.svg`).

Release notes: [`CHANGELOG.md`](CHANGELOG.md).

---

## Maintaining the Homebrew formula

The install formula lives in [`homebrew-tools`](https://github.com/StackwiseTechnologiesLtd/homebrew-tools) as `Formula/git-recap.rb`. A copy is also kept in this repo as `git-recap.rb` for reference.

### Publishing a new version

1. Merge to `main` and tag: `git tag vX.Y.Z && git push origin vX.Y.Z`
2. Create a GitHub release (or `gh release create vX.Y.Z`)
3. Compute the archive checksum:

```bash
curl -sL https://github.com/StackwiseTechnologiesLtd/git-recap/archive/refs/tags/vX.Y.Z.tar.gz | shasum -a 256
```

4. Update `url` + `sha256` in the tap formula and push `homebrew-tools`
5. Users upgrade with `brew upgrade git-recap`

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## License

MIT — see [LICENSE](LICENSE).
