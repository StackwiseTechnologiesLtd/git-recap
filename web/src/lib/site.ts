export const siteConfig = {
  name: "git-recap",
  tagline: "Standup summaries from your local commits",
  description:
    "A lightweight, zero-dependency CLI that aggregates your local Git commit messages into standup-ready summaries. Offline, private, and one brew install away.",
  shortDescription:
    "Turn local Git commits into standup-ready summaries — offline, private, and zero-dependency.",
  keywords: [
    "git-recap",
    "git standup",
    "standup summary",
    "daily standup CLI",
    "git commit summary",
    "offline git tool",
    "homebrew git",
    "conventional commits",
    "developer productivity",
    "local git history",
    "Slack standup",
    "bash git CLI",
  ],
  authors: [{ name: "Stackwise Technologies", url: "https://stackwisetechnologies.com/" }],
  creator: "Stackwise Technologies",
  publisher: "Stackwise Technologies Ltd",
  github: "https://github.com/StackwiseTechnologiesLtd/git-recap",
  homebrewTap: "https://github.com/StackwiseTechnologiesLtd/homebrew-tools",
  orgUrl: "https://stackwisetechnologies.com/",
  locale: "en_US",
} as const;

/** Absolute site origin for canonical URLs, OG, and sitemap. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const render = process.env.RENDER_EXTERNAL_URL?.trim();
  if (render) return render.replace(/\/$/, "");

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercel) {
    return vercel.startsWith("http") ? vercel.replace(/\/$/, "") : `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
