# Changelog

All notable changes to git-recap are documented here, mirrored on [GitHub Releases](https://github.com/StackwiseTechnologiesLtd/git-recap/releases) and the site `/releases` page (`web/src/data/releases.ts`).

How to bump versions: [docs/VERSIONING.md](docs/VERSIONING.md).

## [v0.1.2] — 2026-07-18

CLI quality pass: richer flags, safer matching, recursive scan, and JSON output.

### Added

* `--version` / `-V`
* `--author` / `-a` and `GIT_RECAP_AUTHOR`
* `--color auto|always|never` with `NO_COLOR` support
* `--recursive` / `-r` deep repo discovery (skips common vendor/build trees)
* `--json` machine-readable summary
* Expanded Homebrew formula (head, livecheck, caveats, functional tests)
* Expanded `tests/cli-smoke.sh` (37 checks)

### Changed

* Safer `git log --author` matching (regex-escaped emails/names)
* Tighter commit classification heuristics
* Scroll-driven / looping terminal demos on the marketing site
* README brand header (horizontal logo + title)

### Notes

* Homebrew users should upgrade after the tap formula is updated for v0.1.2
* CLI version: `0.1.2` · site package: `0.1.2`

## [v0.1.1] — 2026-07-18

Landing site, docs, and dark mode.

### Added

* Next.js marketing site (`web/`) with install CTA, feature showcases, and terminal demos
* In-app docs at `/docs` (install, usage, timeframes, routing, options)
* Dark mode with theme toggle (system preference + localStorage)
* Floating header and footer chrome; brand favicon (`favicon.svg`)
* Public `/releases` page backed by `web/src/data/releases.ts`
* CONTRIBUTING.md and expanded development docs

### Notes

* CLI behavior is unchanged from v0.1.0. Homebrew users do not need to upgrade for this release.
* Site version: `web/package.json` → `0.1.1`

## [v0.1.0] — 2026-07-17

Initial CLI release.

### Added

* Zero-dependency Bash CLI for offline standup summaries from local Git
* Smart grouping: Features, Fixes, Docs, Refactors, Tests, Performance, Chores, Other
* Multi-repo scanning, timeframe presets (`--today`, `--yesterday`, `--week`, `--since`)
* Output modes: `--plain`, `--summary-only`, `--flat`
* Homebrew tap install via [StackwiseTechnologiesLtd/tools](https://github.com/StackwiseTechnologiesLtd/homebrew-tools)

[v0.1.2]: https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.2
[v0.1.1]: https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.1
[v0.1.0]: https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.0
