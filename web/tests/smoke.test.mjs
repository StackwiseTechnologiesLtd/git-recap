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
  const seo = readFileSync(join(root, "src/lib/seo.tsx"), "utf8");
  assert.match(seo, /favicon\.svg/);
  assert.ok(
    readFileSync(join(root, "public/favicon.svg"), "utf8").includes("#541111"),
  );
});

test("SEO routes and structured data are present", () => {
  const seo = readFileSync(join(root, "src/lib/seo.tsx"), "utf8");
  const site = readFileSync(join(root, "src/lib/site.ts"), "utf8");
  const home = readFileSync(join(root, "src/app/page.tsx"), "utf8");
  assert.match(site, /getSiteUrl/);
  assert.match(seo, /metadataBase|openGraph|twitter|SoftwareApplication/);
  assert.match(home, /faqJsonLd|softwareApplicationJsonLd/);
  assert.ok(readFileSync(join(root, "src/app/sitemap.ts"), "utf8").includes("sitemap"));
  assert.ok(readFileSync(join(root, "src/app/robots.ts"), "utf8").includes("robots"));
  assert.ok(
    readFileSync(join(root, "src/app/opengraph-image.tsx"), "utf8").includes(
      "favicon.svg",
    ),
  );
  assert.match(seo, /opengraph-image\.png/);
  assert.ok(
    readFileSync(join(root, "src/app/manifest.ts"), "utf8").includes("manifest"),
  );
});

test("package scripts expose lint and build", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(typeof pkg.scripts.lint, "string");
  assert.equal(typeof pkg.scripts.build, "string");
  assert.equal(typeof pkg.scripts.test, "string");
});

test("Next.js is configured for static export", () => {
  const config = readFileSync(join(root, "next.config.ts"), "utf8");
  assert.match(config, /output:\s*["']export["']/);
  assert.match(config, /unoptimized:\s*true/);
});
