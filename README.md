# git-recap

`git-recap` is a lightweight, zero-dependency CLI that aggregates your local Git commit messages over a timeframe so you can prepare for daily standups in seconds.

It reads only from local `.git` state on disk. No SSH keys, no network, no remote APIs.

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
brew tap YOUR_GITHUB_USERNAME/tools
brew install git-recap
```

### From source

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/git-recap.git
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
git-recap --max-length 72          # shorter standup bullets
git-recap --plain                  # paste into Slack / notes
git-recap --summary-only           # only the standup summary block
git-recap --flat                   # raw commit list
GIT_RECAP_SINCE="1 week ago" git-recap
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
| Env | `GIT_RECAP_SINCE="1 week ago" git-recap` |

Values are passed through to `git log --since`, so any Git date expression works. `--yesterday` uses `--since "yesterday 00:00" --until "today 00:00"`.

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

## Homebrew formula notes

`git-recap.rb` is the formula boilerplate. Before publishing a release:

1. Tag and push a release (e.g. `v0.1.0`)
2. Compute the tarball SHA256 (see below)
3. Replace `YOUR_GITHUB_USERNAME` and `PASTE_THE_SHA256_OF_YOUR_TAR_GZ_HERE` in the formula
4. Copy the formula into your tap as `Formula/git-recap.rb`

---

## License

MIT
