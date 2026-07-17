import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");

test("landing page includes install and brand", () => {
  const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
  assert.match(page, /git-recap/);
  assert.match(page, /brew tap StackwiseTechnologiesLtd\/tools/);
  assert.match(page, /id="install"/);
  assert.match(page, /id="features"/);
  assert.match(page, /\/docs/);
});

test("docs page covers usage and install", () => {
  const page = readFileSync(join(root, "src/app/docs/page.tsx"), "utf8");
  assert.match(page, /git-recap docs/);
  assert.match(page, /id="install"/);
  assert.match(page, /id="usage"/);
  assert.match(page, /--summary-only/);
});

test("package scripts expose lint and build", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(typeof pkg.scripts.lint, "string");
  assert.equal(typeof pkg.scripts.build, "string");
  assert.equal(typeof pkg.scripts.test, "string");
});
