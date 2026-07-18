export type Release = {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  github?: string;
};

export const releases: Release[] = [
  {
    version: "v0.1.3",
    date: "2026-07-18",
    title: "Brand refresh: ASCII help logo and compact site mark",
    github:
      "https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.3",
    highlights: [
      "Updated CLI --help ASCII wordmark with stable terminal rendering",
      "Compact SVG brand mark on the marketing site",
      "Logo generation helpers for ASCII / SVG assets",
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-07-18",
    title: "CLI quality: recursive scan, JSON, author & color controls",
    github:
      "https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.2",
    highlights: [
      "New flags: --version, --author, --color, --recursive, --json",
      "Safer author matching and tighter commit classification",
      "Expanded CLI smoke tests and Homebrew formula coverage",
      "Marketing site polish: scroll-scrubbed terminals, dark mode primary #541111",
    ],
  },
  {
    version: "v0.1.1",
    date: "2026-07-18",
    title: "Landing site, docs, and dark mode",
    github:
      "https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.1",
    highlights: [
      "Marketing site with install CTA, feature showcases, and animated terminal demos",
      "In-app /docs covering install, usage, timeframes, routing, and options",
      "Dark mode with a theme toggle that respects system preference",
      "Floating header and footer chrome; brand favicon",
      "Public /releases page for version history",
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-07-17",
    title: "Initial CLI release",
    github:
      "https://github.com/StackwiseTechnologiesLtd/git-recap/releases/tag/v0.1.0",
    highlights: [
      "Zero-dependency Bash CLI for offline standup summaries from local Git",
      "Smart grouping into Features, Fixes, Docs, Refactors, Tests, Performance, Chores, Other",
      "Multi-repo scanning, timeframe presets, --plain / --summary-only / --flat",
      "Homebrew tap install via StackwiseTechnologiesLtd/tools",
    ],
  },
];
