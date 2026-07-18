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
assert_match "$help_out" "--since" "--help documents --since"

h_out="$("$SCRIPT" -h)"
assert_match "$h_out" "Usage: git-recap" "-h shows Usage"

assert_exit 1 "$SCRIPT" --not-a-real-flag
assert_exit 1 "$SCRIPT" --since
assert_exit 1 "$SCRIPT" --max-length
assert_exit 1 "$SCRIPT" --flat --summary-only

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

# Single-repo run (inside alpha)
cd "$REPO_A"
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

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo
echo "Passed: $PASS  Failed: $FAIL"
if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
echo "OK: cli smoke tests passed"
