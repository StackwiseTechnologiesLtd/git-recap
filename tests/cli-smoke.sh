#!/usr/bin/env bash
# Minimal smoke tests for bin/git-recap
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/bin/git-recap"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

[[ -x "$SCRIPT" ]] || chmod +x "$SCRIPT"

bash -n "$SCRIPT" || fail "bash -n reported syntax errors"

help_out="$("$SCRIPT" --help)"
echo "$help_out" | grep -q "Usage: git-recap" || fail "--help missing Usage line"
echo "$help_out" | grep -q -- "--today" || fail "--help missing --today"
echo "$help_out" | grep -q -- "--plain" || fail "--help missing --plain"

# Unknown flag should fail
if "$SCRIPT" --not-a-real-flag >/dev/null 2>&1; then
  fail "unknown flag should exit non-zero"
fi

echo "OK: cli smoke tests passed"
