#!/usr/bin/env bash
# Smoke + functional tests for bin/git-recap (Bash 3.2+ / macOS-friendly).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/bin/git-recap"
PASS=0
FAIL=0
TMPDIR_ROOT=""

cleanup() {
  if [[ -n "${TMPDIR_ROOT}" && -d "${TMPDIR_ROOT}" ]]; then
    rm -rf "${TMPDIR_ROOT}"
  fi
  unset GIT_CONFIG_GLOBAL
}
trap cleanup EXIT

fail() {
  echo "FAIL: $*" >&2
  FAIL=$((FAIL + 1))
}

pass() {
  echo "OK: $*"
  PASS=$((PASS + 1))
}

assert_match() {
  local haystack="$1"
  local needle="$2"
  local label="$3"
  if printf '%s\n' "$haystack" | grep -Eq -- "$needle"; then
    pass "$label"
  else
    fail "$label (expected /$needle/)"
  fi
}

assert_no_match() {
  local haystack="$1"
  local needle="$2"
  local label="$3"
  if printf '%s\n' "$haystack" | grep -Eq -- "$needle"; then
    fail "$label (unexpected /$needle/)"
  else
    pass "$label"
  fi
}

assert_exit() {
  local expected="$1"
  shift
  set +e
  "$@" >/dev/null 2>&1
  local code=$?
  set -e
  if [[ "$code" -eq "$expected" ]]; then
    pass "exit $expected ← $*"
  else
    fail "exit $expected ← $* (got $code)"
  fi
}

# ---------------------------------------------------------------------------
# Preconditions
# ---------------------------------------------------------------------------
command -v git >/dev/null 2>&1 || {
  echo "FAIL: git is required for smoke tests" >&2
  exit 1
}

[[ -f "$SCRIPT" ]] || {
  echo "FAIL: missing $SCRIPT" >&2
  exit 1
}
[[ -x "$SCRIPT" ]] || chmod +x "$SCRIPT"

# ---------------------------------------------------------------------------
# Syntax + help surface
# ---------------------------------------------------------------------------
if bash -n "$SCRIPT"; then
  pass "bash -n bin/git-recap"
else
  fail "bash -n reported syntax errors"
fi

help_out="$("$SCRIPT" --help)"
assert_match "$help_out" "Usage: git-recap" "--help shows Usage"
assert_match "$help_out" "--today" "--help documents --today"
assert_match "$help_out" "--yesterday" "--help documents --yesterday"
assert_match "$help_out" "--week" "--help documents --week"
assert_match "$help_out" "--plain" "--help documents --plain"
assert_match "$help_out" "--summary-only" "--help documents --summary-only"
assert_match "$help_out" "--flat" "--help documents --flat"
assert_match "$help_out" "--max-length" "--help documents --max-length"
assert_match "$help_out" "--author" "--help documents --author"
assert_match "$help_out" "--all-authors" "--help documents --all-authors"
assert_match "$help_out" "--until" "--help documents --until"
assert_match "$help_out" "--include-merges" "--help documents --include-merges"
assert_match "$help_out" "--reviews" "--help documents --reviews"
assert_match "$help_out" "--color" "--help documents --color"
assert_match "$help_out" "--recursive" "--help documents --recursive"
assert_match "$help_out" "--json" "--help documents --json"

version_out="$("$SCRIPT" --version)"
assert_match "$version_out" "git-recap 0\\.1\\." "--version prints version"

assert_exit 1 "$SCRIPT" --color
assert_exit 1 "$SCRIPT" --color maybe
assert_exit 1 "$SCRIPT" --author
assert_exit 1 "$SCRIPT" --until
assert_exit 1 "$SCRIPT" --json --flat

# ---------------------------------------------------------------------------
# Functional fixtures (isolated git identity via temp global config)
# ---------------------------------------------------------------------------
TMPDIR_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/git-recap-smoke.XXXXXX")"
export GIT_CONFIG_GLOBAL="$TMPDIR_ROOT/gitconfig"
touch "$GIT_CONFIG_GLOBAL"
git config --global user.email "smoke@example.com"
git config --global user.name "Smoke Tester"

REPO_A="$TMPDIR_ROOT/alpha"
REPO_B="$TMPDIR_ROOT/beta"
mkdir -p "$REPO_A" "$REPO_B"

init_repo() {
  local dir="$1"
  local subject="$2"
  (
    cd "$dir"
    git init -q
    git config user.email "smoke@example.com"
    git config user.name "Smoke Tester"
    printf 'fixture\n' > README.md
    git add README.md
    git commit -q -m "$subject"
  )
}

init_repo "$REPO_A" "feat: add alpha dashboard"
init_repo "$REPO_B" "fix: repair beta auth tokens"

# Author override + NO_COLOR / --color
cd "$REPO_A"
author_out="$("$SCRIPT" --today --author "Smoke Tester")"
assert_match "$author_out" "Features|dashboard" "--author finds matching commits"

nocolor_out="$(NO_COLOR=1 "$SCRIPT" --today --color=auto)"
assert_no_match "$nocolor_out" $'\033\[' "NO_COLOR disables ANSI"

force_color_out="$(NO_COLOR=1 "$SCRIPT" --today --color=always)"
assert_match "$force_color_out" $'\033\[' "--color=always overrides NO_COLOR"

# Single-repo run (inside alpha)
today_out="$("$SCRIPT" --today)"
assert_match "$today_out" "Features|add alpha dashboard" "--today groups feature commit"
assert_match "$today_out" "alpha|dashboard" "--today mentions repo or subject"

plain_out="$("$SCRIPT" --today --plain)"
assert_match "$plain_out" "dashboard|Features" "--plain still shows content"
assert_no_match "$plain_out" $'\033\[' "--plain has no ANSI escapes"

summary_out="$("$SCRIPT" --today --summary-only)"
assert_match "$summary_out" "Standup summary|Features|dashboard" "--summary-only prints standup block"

flat_out="$("$SCRIPT" --today --flat)"
assert_match "$flat_out" "feat: add alpha dashboard|add alpha dashboard" "--flat includes commit subject"

since_out="$("$SCRIPT" --since "2 days ago")"
assert_match "$since_out" "Features|dashboard" "--since accepts git date expression"

week_out="$("$SCRIPT" --week)"
assert_match "$week_out" "Features|dashboard" "--week finds recent commit"

# Explicit path target from outside the repo
cd "$TMPDIR_ROOT"
path_out="$("$SCRIPT" --today "$REPO_A")"
assert_match "$path_out" "Features|dashboard" "path arg recaps target repo"

# Parent-folder multi-scan (no args, not inside a repo)
scan_out="$("$SCRIPT" --today)"
assert_match "$scan_out" "Features|dashboard|auth tokens|Standup" "cwd scan finds subdirectory repos"

# Missing path / non-repo should warn and exit 0
assert_exit 0 "$SCRIPT" --today "$TMPDIR_ROOT/does-not-exist"

# Nested repo + --recursive
NEST="$TMPDIR_ROOT/workspace/nested"
mkdir -p "$NEST"
init_repo "$NEST" "feat: add nested module"
cd "$TMPDIR_ROOT/workspace"
recur_out="$("$SCRIPT" --today --recursive)"
assert_match "$recur_out" "nested|module|Features" "--recursive finds nested repos"

# JSON output
cd "$REPO_A"
json_out="$("$SCRIPT" --today --json)"
assert_match "$json_out" '"total_commits"' "--json includes total_commits"
assert_match "$json_out" '"Features"' "--json includes Features category"
assert_match "$json_out" 'dashboard' "--json includes subject text"
assert_match "$json_out" '"all_authors": false' "--json reports all_authors false by default"
assert_match "$json_out" '"include_merges": false' "--json reports include_merges false by default"
assert_no_match "$json_out" $'\033\[' "--json has no ANSI"

# --until window that excludes today's commits
until_out="$("$SCRIPT" --since "7 days ago" --until "2 days ago" --plain || true)"
assert_no_match "$until_out" "dashboard" "--until can exclude recent commits"

# --all-authors: include a second author's commit
(
  cd "$REPO_A"
  git config user.email "other@example.com"
  git config user.name "Other Dev"
  printf 'other\n' >> README.md
  git add README.md
  git commit -q -m "feat: other author change"
)
# Default author filter (Smoke Tester via global) should miss Other Dev's commit
# when matching by smoke@example.com — restore local identity to smoke for default runs
(
  cd "$REPO_A"
  git config user.email "smoke@example.com"
  git config user.name "Smoke Tester"
)
default_author_out="$("$SCRIPT" --today --author "smoke@example.com" --plain)"
assert_no_match "$default_author_out" "other author change" "author filter excludes other author"
all_authors_out="$("$SCRIPT" --today --all-authors --plain)"
assert_match "$all_authors_out" "[Oo]ther author change" "--all-authors includes every author"
assert_match "$all_authors_out" "dashboard|alpha" "--all-authors still includes own commits"
all_json="$("$SCRIPT" --today --all-authors --json)"
assert_match "$all_json" '"all_authors": true' "--json reports all_authors true"

# Duplicate path args should not double-count
dedup_out="$("$SCRIPT" --today --json "$REPO_A" "$REPO_A")"
assert_match "$dedup_out" '"repos_with_commits": 1' "duplicate path args are deduplicated"

# --include-merges
(
  cd "$REPO_A"
  git checkout -q -b feature/merge-fixture
  printf 'merge-me\n' >> README.md
  git add README.md
  git commit -q -m "feat: branch work for merge"
  git checkout -q -
  git merge -q --no-ff feature/merge-fixture -m "Merge branch 'feature/merge-fixture'"
)
no_merge_out="$("$SCRIPT" --today --author "Smoke Tester" --flat --plain)"
assert_no_match "$no_merge_out" "Merge branch" "merge commits omitted by default"
merge_out="$("$SCRIPT" --today --author "Smoke Tester" --include-merges --flat --plain)"
assert_match "$merge_out" "Merge branch" "--include-merges shows merge commits"

# Offline Reviews category for review-style commits
(
  cd "$REPO_A"
  printf 'review-note\n' >> README.md
  git add README.md
  git commit -q -m "review: tighten auth edge cases"
)
review_commit_out="$("$SCRIPT" --today --author "Smoke Tester" --plain)"
assert_match "$review_commit_out" "Reviews" "review: commits classify under Reviews"

# --reviews without gh auth in PATH still exits cleanly (warns or fetches)
reviews_out="$("$SCRIPT" --today --reviews --json --author "Smoke Tester" 2>"$TMPDIR_ROOT/reviews.err")"
assert_match "$reviews_out" '"include_reviews": true' "--json reports include_reviews"
assert_match "$reviews_out" '"total_reviews"' "--json includes total_reviews"

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo
echo "Passed: $PASS  Failed: $FAIL"
if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
echo "OK: cli smoke tests passed"
