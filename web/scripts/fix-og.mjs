import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/** Static hosts (e.g. Render) need a .png extension for image/png MIME — WhatsApp requires it. */
const src = join(process.cwd(), "out", "opengraph-image");
const dest = join(process.cwd(), "out", "opengraph-image.png");

if (!existsSync(src)) {
  console.error("fix-og: missing out/opengraph-image (did next build succeed?)");
  process.exit(1);
}

copyFileSync(src, dest);
console.log("fix-og: wrote out/opengraph-image.png");
