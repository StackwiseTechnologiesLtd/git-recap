import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built-in Modules",
  description: "See how commits are categorized automatically by git-recap.",
};

const commands = [
  { cmd: "git-recap", note: "Smart summary for the current repo, or scan cwd subdirs" },
  { cmd: "git-recap project-a ~/code/app", note: "Specific targets" },
  { cmd: "git-recap --today", note: "Commits since midnight" },
  { cmd: "git-recap --yesterday", note: "Yesterday's commits only" },
  { cmd: "git-recap --week", note: "Commits from the last week" },
  { cmd: 'git-recap --since "2 days ago"', note: "Custom timeframe" },
  { cmd: 'git-recap --since "3 days ago" --until yesterday', note: "Bounded window" },
  { cmd: 'git-recap --author "Jane Doe"', note: "Override author match" },
  { cmd: "git-recap --all-authors --today", note: "Every author in the window" },
  { cmd: "git-recap --max-length 72", note: "Shorter standup bullets" },
  { cmd: "git-recap --plain", note: "Paste into Slack / notes" },
  { cmd: "git-recap --summary-only", note: "Only the standup summary block" },
  { cmd: "git-recap --flat", note: "Raw commit list (no grouping)" },
  { cmd: "git-recap --include-merges", note: "Keep merge commits" },
  { cmd: "git-recap --reviews --today", note: "Commits + your GitHub PR reviews (needs gh)" },
  { cmd: "git-recap -r --today", note: "Deep-scan folders for repos" },
  { cmd: "git-recap --json --today", note: "Machine-readable summary" },
  { cmd: 'GIT_RECAP_SINCE="1 week ago" git-recap', note: "Timeframe via env" },
  { cmd: "git-recap -V", note: "Version" },
  { cmd: "git-recap -h", note: "Help" },
];

export default function ModulesPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Built-in Modules
        </h1>
        <p className="mt-3 text-muted">
          Groups commits into Features, Fixes, Docs, Refactors, Tests,
          Performance, Chores, and Other. Conventional prefixes like{" "}
          <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">feat:</code> are
          stripped; long subjects shorten at word boundaries.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-term-border bg-term-bg shadow-sm">
          {commands.map((item, i) => (
            <div
              key={item.cmd}
              className={`flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 hover:bg-term-elevated/80 transition-colors ${i < commands.length - 1 ? "border-b border-term-border/50" : ""
                }`}
            >
              <code className="font-mono text-[13px] text-term-fg sm:text-sm">
                <span className="text-term-prompt select-none">$ </span>
                {item.cmd}
              </code>
              <span className="shrink-0 text-sm text-term-muted transition-colors">{item.note}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
