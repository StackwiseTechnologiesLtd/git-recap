# git-recap

`git-recap` is a lightweight, zero-dependency CLI that aggregates your local Git commit messages over a timeframe so you can prepare for daily standups in seconds.

It reads only from local `.git` state on disk. No SSH keys, no network, no remote APIs.

---

## Features

* **Contextual** — run inside a repo to recap just that project
* **Multi-scan** — run in a parent folder (e.g. `~/Projects`) to scan immediate subdirectories
* **Targeted** — pass specific paths or repo names as arguments
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
git-recap                          # current repo, or scan cwd subdirs
git-recap project-a ~/code/app     # specific targets
git-recap --since "2 days ago"     # custom timeframe
GIT_RECAP_SINCE="1 week ago" git-recap
git-recap -h                       # help
```

### Timeframe

| Method | Example |
|--------|---------|
| Default | last 24 hours (`1 day ago`) |
| Flag | `git-recap --since "3 days ago"` or `-s "yesterday"` |
| Env | `GIT_RECAP_SINCE="1 week ago" git-recap` |

Values are passed through to `git log --since`, so any Git date expression works.

### Routing logic

| Situation | Behavior |
|-----------|----------|
| Paths/names passed as args | Process only those targets (skip if no `.git`) |
| No args, inside a Git repo | Recap this repository only |
| No args, not inside a repo | Scan immediate subdirectories for `.git` |

### Sample output

```text
my-app
────────────────────────────────────────
  • Fixed auth bug (a1b2c3d)
  • Bump API client timeout (e4f5a6b)

api-gateway
────────────────────────────────────────
  • Harden rate limiter (9c8d7e6)
```

Repositories with no commits by you in the timeframe are omitted.

---

## Requirements

* Bash
* Git (with `user.name` configured)

```bash
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
