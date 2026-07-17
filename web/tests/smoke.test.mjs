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

test("releases page lists version history", () => {
  const page = readFileSync(join(root, "src/app/releases/page.tsx"), "utf8");
  const data = readFileSync(join(root, "src/data/releases.ts"), "utf8");
  assert.match(page, /Releases/);
  assert.match(data, /v0\.1\.0/);
  assert.match(data, /v0\.1\.1/);
});

test("favicon is configured", () => {
  const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
  assert.match(layout, /favicon\.svg/);
  assert.ok(
    readFileSync(join(root, "public/favicon.svg"), "utf8").includes("#541111"),
  );
});

test("package scripts expose lint and build", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(typeof pkg.scripts.lint, "string");
  assert.equal(typeof pkg.scripts.build, "string");
  assert.equal(typeof pkg.scripts.test, "string");
});
