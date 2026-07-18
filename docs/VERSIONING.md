# Versioning and releases

git-recap uses **semver** (`MAJOR.MINOR.PATCH`) with Git tags prefixed by `v` (e.g. `v0.1.2`). There is no automated bump script — maintainers update files by hand, then tag and publish.

## When to bump

| Release type | Bump when… | Homebrew? |
|--------------|------------|-----------|
| **CLI** | Behavior, flags, or installable script changes | Yes — update formula after the tag |
| **Site-only** | Marketing site / docs content only; CLI unchanged | No — note that in `CHANGELOG.md` |
| **Joint** | Both CLI and site ship together | Yes |

Keep CLI and site package versions aligned on joint releases. For a site-only release you may bump `web/package.json` without changing `bin/git-recap` `VERSION` (see `v0.1.1`).

## Files to update (checklist)

Replace `X.Y.Z` with the new version (no `v` prefix unless noted).

### Always (any public release)

| File | What to change |
|------|----------------|
| [`CHANGELOG.md`](../CHANGELOG.md) | New `## [vX.Y.Z] — YYYY-MM-DD` section + footer link |
| [`web/src/data/releases.ts`](../web/src/data/releases.ts) | Prepend a release object (`version: "vX.Y.Z"`, date, title, highlights, GitHub URL) |

### CLI release (or joint)

| File | What to change |
|------|----------------|
| [`bin/git-recap`](../bin/git-recap) | `VERSION="X.Y.Z"` — **source of truth** for `git-recap --version` and JSON `"version"` |
| [`web/package.json`](../web/package.json) | `"version": "X.Y.Z"` (keep in sync on joint releases) |
| [`web/package-lock.json`](../web/package-lock.json) | Root `"version"` fields — run `npm version X.Y.Z --no-git-tag-version` from `web/` or edit to match |
| [`web/src/lib/seo.tsx`](../web/src/lib/seo.tsx) | `softwareVersion: "X.Y.Z"` in JSON-LD |

### Site-only release

| File | What to change |
|------|----------------|
| [`web/package.json`](../web/package.json) (+ lockfile) | `"version": "X.Y.Z"` |
| [`web/src/lib/seo.tsx`](../web/src/lib/seo.tsx) | Optional: bump `softwareVersion` if you treat the site package as the public version |

Leave `bin/git-recap` `VERSION` unchanged when the CLI binary is unchanged.

### After the Git tag exists (CLI / joint only)

| File / place | What to change |
|--------------|----------------|
| [`git-recap.rb`](../git-recap.rb) (this repo, reference copy) | `url` → `…/tags/vX.Y.Z.tar.gz` and new `sha256` |
| [homebrew-tools](https://github.com/StackwiseTechnologiesLtd/homebrew-tools) `Formula/git-recap.rb` | Same `url` + `sha256` (canonical install source) |

### Usually do **not** need a version edit

* [`tests/cli-smoke.sh`](../tests/cli-smoke.sh) — only asserts a `0.1.` prefix; tighten only if you leave the `0.1` line.
* Root [`README.md`](../README.md) — update only if install/usage text changes with the release.

## Manual bump steps

### 1. Choose the next version

```text
PATCH  — fixes, small flags, docs-only CLI tweaks
MINOR  — new features, backward-compatible
MAJOR  — breaking CLI / output changes
```

### 2. Edit version files on a branch

Example joint bump to `0.1.3`:

```bash
# CLI
# edit bin/git-recap → VERSION="0.1.3"

# Site package + lockfile
cd web
npm version 0.1.3 --no-git-tag-version
cd ..

# edit web/src/lib/seo.tsx → softwareVersion: "0.1.3"
# edit CHANGELOG.md (new section + [v0.1.3] link)
# edit web/src/data/releases.ts (prepend entry)
```

### 3. Verify before merge

```bash
./bin/git-recap --version          # → git-recap 0.1.3
./tests/cli-smoke.sh
cd web && npm test && npm run build
```

### 4. Merge to `main`, then tag

Version bumps that go out as a release should already be on `main` before tagging.

```bash
git checkout main
git pull origin main

git tag vX.Y.Z
git push origin vX.Y.Z
```

### 5. GitHub Release

```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes-file - <<'EOF'
Summary of the release.

See CHANGELOG.md for details.
EOF
```

Or create the release in the GitHub UI from the new tag. Body should match the changelog highlights.

### 6. Homebrew (CLI / joint only)

Wait until the tag is on GitHub, then:

```bash
VERSION=X.Y.Z
curl -sL "https://github.com/StackwiseTechnologiesLtd/git-recap/archive/refs/tags/v${VERSION}.tar.gz" | shasum -a 256
```

1. Update `url` and `sha256` in this repo’s `git-recap.rb`.
2. Update the same fields in `homebrew-tools` → `Formula/git-recap.rb` and push that repo.
3. Confirm:

```bash
brew update
brew upgrade git-recap
git-recap --version
```

### 7. Site deploy

Pushing `main` (or the release commit) should rebuild the Render static site. Confirm [https://git-recap.onrender.com/releases/](https://git-recap.onrender.com/releases/) shows the new entry.

## Quick reference — source of truth

| Concern | Source |
|---------|--------|
| CLI reported version | `VERSION` in `bin/git-recap` |
| npm / site package version | `web/package.json` |
| Public release notes (repo) | `CHANGELOG.md` |
| Public release notes (site) | `web/src/data/releases.ts` |
| Structured data version | `softwareVersion` in `web/src/lib/seo.tsx` |
| Homebrew install tarball | Tag `vX.Y.Z` + formula `url` / `sha256` |

## Related docs

* [DEVELOPMENT.md](DEVELOPMENT.md) — local CLI/web workflow
* [README.md](../README.md#maintaining-the-homebrew-formula) — Homebrew publishing summary
* [CHANGELOG.md](../CHANGELOG.md) — historical notes
