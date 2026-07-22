import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Options & API Reference",
  description: "Learn to pass options, flags, and arguments to git-recap.",
};

const outputOptions = [
  { flag: "-p, --plain", desc: "Paste-friendly output (no colors, no hashes)" },
  { flag: "--color <when>", desc: "Colorize output: auto (default), always, or never" },
  { flag: "--summary-only", desc: "Only print the final standup summary block" },
  { flag: "--flat", desc: "Skip smart grouping; print a flat commit list" },
  { flag: "--json", desc: "Machine-readable JSON summary for custom integrations" },
  { flag: "--max-length <n>", desc: "Max summary bullet length (default: 88)" },
];

const filterOptions = [
  { flag: "-s, --since <when>", desc: 'Commits since this date (default: "1 day ago" or $GIT_RECAP_SINCE)' },
  { flag: "-u, --until <when>", desc: "Commits until this date (optional; or $GIT_RECAP_UNTIL)" },
  { flag: "--today", desc: 'Shortcut for --since "midnight"' },
  { flag: "--yesterday", desc: "Yesterday 00:00 to today 00:00" },
  { flag: "--week", desc: 'Shortcut for --since "1 week ago"' },
  { flag: "-a, --author <who>", desc: "Override author match (default: git user.email / user.name)" },
  { flag: "-A, --all-authors", desc: "Include commits from every author" },
  { flag: "--include-merges", desc: "Include merge commits (omitted by default)" },
];

const integrationOptions = [
  { flag: "-r, --recursive", desc: "Deep-scan folders for Git repos (skips vendor/build trees)" },
  { flag: "--reviews", desc: "Include your GitHub PR reviews via authenticated gh (optional network)" },
  { flag: "-V, --version", desc: "Print version and exit" },
  { flag: "-h, --help", desc: "Show help" },
];

function OptionList({ options, title }: { options: any[], title: string }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium text-fg mb-4">{title}</h3>
      <ul className="space-y-4">
        {options.map((opt) => (
          <li key={opt.flag} className="panel-hover p-4 rounded-2xl border border-transparent hover:border-line hover:bg-bg-elevated/40 transition-all">
            <code className="font-mono text-sm text-fg bg-bg-elevated border border-line/50 px-2 py-1 rounded-md">{opt.flag}</code>
            <p className="mt-2 text-sm leading-relaxed text-muted">{opt.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OptionsPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Options & API Reference
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed mb-12">
          Every available flag for git-recap, typed out and documented. Grouped by their purpose to help you find what you need.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <OptionList title="Time & Author Filtering" options={filterOptions} />
      </ScrollReveal>

      <ScrollReveal>
        <OptionList title="Output Formatting" options={outputOptions} />
      </ScrollReveal>

      <ScrollReveal>
        <OptionList title="Integrations & System" options={integrationOptions} />
      </ScrollReveal>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Integration Use-Cases</h2>
          
          <div className="space-y-8">
            <div className="p-5 rounded-2xl border border-line bg-bg-panel shadow-sm">
              <h3 className="text-lg font-medium text-fg mb-2">Automating with JSON</h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                If you want to build a custom Slack bot, Notion integration, or just pipe your standup into another script, the <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--json</code> flag is your best friend. It outputs the fully grouped, structured summary as a JSON object, bypassing all human-readable ANSI formatting.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-line bg-bg-panel shadow-sm">
              <h3 className="text-lg font-medium text-fg mb-2">GitHub PR Reviews</h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                If you spend a lot of time reviewing code rather than writing it, you can use the <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--reviews</code> flag. This uses your authenticated <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">gh</code> CLI (GitHub's official CLI tool) to fetch PRs you have reviewed in the specified timeframe, placing them neatly in a "Code Review" section of your summary.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
