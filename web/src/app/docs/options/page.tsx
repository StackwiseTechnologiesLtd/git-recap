import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Options",
  description: "Learn to pass options, flags, and arguments to git-recap.",
};

const options = [
  {
    flag: "-s, --since <when>",
    desc: 'Commits since this date (default: "1 day ago" or $GIT_RECAP_SINCE)',
  },
  {
    flag: "-u, --until <when>",
    desc: "Commits until this date (optional; or $GIT_RECAP_UNTIL)",
  },
  { flag: "--today", desc: 'Shortcut for --since "midnight"' },
  {
    flag: "--yesterday",
    desc: "Yesterday 00:00 to today 00:00",
  },
  { flag: "--week", desc: 'Shortcut for --since "1 week ago"' },
  { flag: "--max-length <n>", desc: "Max summary bullet length (default: 88)" },
  {
    flag: "-a, --author <who>",
    desc: "Override author match (default: git user.email / user.name)",
  },
  {
    flag: "-A, --all-authors",
    desc: "Include commits from every author",
  },
  { flag: "-p, --plain", desc: "Paste-friendly output (no colors, no hashes)" },
  {
    flag: "--color <when>",
    desc: "Colorize output: auto (default), always, or never",
  },
  { flag: "--summary-only", desc: "Only print the final standup summary block" },
  { flag: "--flat", desc: "Skip smart grouping; print a flat commit list" },
  {
    flag: "-r, --recursive",
    desc: "Deep-scan folders for Git repos (skips vendor/build trees)",
  },
  {
    flag: "--include-merges",
    desc: "Include merge commits (omitted by default)",
  },
  {
    flag: "--reviews",
    desc: "Include your GitHub PR reviews via authenticated gh (optional network)",
  },
  { flag: "--json", desc: "Machine-readable JSON summary" },
  { flag: "-V, --version", desc: "Print version and exit" },
  { flag: "-h, --help", desc: "Show help" },
];

export default function OptionsPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Options
        </h1>
        <ul className="mt-8 space-y-4">
          {options.map((opt) => (
            <li key={opt.flag} className="panel-hover p-4 rounded-2xl border border-transparent hover:border-line hover:bg-bg-elevated/40 transition-all">
              <code className="font-mono text-sm text-fg bg-bg-elevated border border-line/50 px-2 py-1 rounded-md">{opt.flag}</code>
              <p className="mt-2 text-sm leading-relaxed text-muted">{opt.desc}</p>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  );
}
