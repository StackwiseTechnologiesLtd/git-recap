import { CopyCommand } from "@/components/CopyCommand";

import { DocsLayout } from "@/components/DocsLayout";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = buildMetadata({
  title: "Docs",
  path: "/docs",
  description:
    "Install git-recap with Homebrew, learn timeframes, routing, --reviews, JSON output, and every CLI option for offline standup summaries.",
  keywords: [
    "git-recap docs",
    "git-recap install",
    "homebrew git-recap",
    "git standup CLI usage",
    "git-recap --today",
    "git-recap --reviews",
  ],
});

const BREW_INSTALL =
  "brew tap StackwiseTechnologiesLtd/tools && brew trust StackwiseTechnologiesLtd/tools && brew install git-recap";

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

const timeframes = [
  { method: "Default", example: 'last 24 hours ("1 day ago")' },
  { method: "Today", example: "git-recap --today" },
  { method: "Yesterday", example: "git-recap --yesterday" },
  { method: "Week", example: "git-recap --week" },
  { method: "Flag", example: 'git-recap --since "3 days ago"' },
  { method: "Until", example: 'git-recap --until yesterday' },
  { method: "Env", example: 'GIT_RECAP_SINCE="1 week ago" git-recap' },
];

const routing = [
  {
    situation: "Paths/names passed as args",
    behavior: "Process only those targets (skip if no .git)",
  },
  {
    situation: "No args, inside a Git repo",
    behavior: "Recap this repository only",
  },
  {
    situation: "No args, not inside a repo",
    behavior: "Scan immediate subdirectories for .git (use -r for deep scan)",
  },
];

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

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
}
function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}
function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
}
function CommandIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10 9-3 3 3 3"/><path d="M14 15h4"/></svg>
}

export default function DocsPage() {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-bg text-fg overflow-hidden selection:bg-accent selection:text-fg">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />

      <DocsLayout>
        <div className="max-w-4xl mx-auto px-6 py-6 md:px-12 md:py-8">
            <ScrollReveal>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Documentation
              </h1>
              <p className="mt-4 text-lg text-muted">
                Everything you need to use git-recap and build clean standup summaries.
              </p>
            </ScrollReveal>

            {/* Cards Grid */}
            <ScrollReveal delay={100}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#install" className="md:col-span-3 panel-hover p-6 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
                  <BookIcon className="h-6 w-6 text-muted group-hover:text-fg transition-colors" />
                  <h3 className="text-lg font-medium text-fg">Getting Started</h3>
                  <p className="text-sm text-muted">Download, install, and set up git-recap on your machine in two minutes.</p>
                </a>
                
                <a href="#usage" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
                  <GridIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
                  <h3 className="text-md font-medium text-fg">Built-in Modules</h3>
                  <p className="text-sm text-muted">See how commits are categorized automatically.</p>
                </a>

                <a href="#options" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
                  <CodeIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
                  <h3 className="text-md font-medium text-fg">Configuration</h3>
                  <p className="text-sm text-muted">Learn to pass options, flags, and arguments.</p>
                </a>

                <a href="#requirements" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
                  <CommandIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
                  <h3 className="text-md font-medium text-fg">API Reference</h3>
                  <p className="text-sm text-muted">Every available flag typed out and documented.</p>
                </a>
              </div>
            </ScrollReveal>

            {/* Documentation Sections */}
            <div className="mt-20 space-y-24 pb-20">
              <section id="install" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                  <p className="mt-3 text-muted">Homebrew (recommended):</p>
                  <div className="mt-5 panel-hover">
                    <CopyCommand command={BREW_INSTALL} />
                  </div>
                  <p className="mt-8 text-sm text-muted">
                    Modern Homebrew requires{" "}
                    <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">brew trust</code> for
                    third-party taps. Or install from source — see the{" "}
                    <a
                      href="https://github.com/StackwiseTechnologiesLtd/git-recap#from-source"
                      className="text-accent hover:underline font-medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub README
                    </a>
                    .
                  </p>
                </ScrollReveal>
              </section>

              <section id="usage" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
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
              </section>

              <section id="timeframe" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Timeframe</h2>
                  <p className="mt-3 text-muted">
                    Values pass through to{" "}
                    <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">git log --since</code>
                    , so any Git date expression works.{" "}
                    <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--yesterday</code> uses{" "}
                    <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">
                      --since &quot;yesterday 00:00&quot; --until &quot;today 00:00&quot;
                    </code>
                    .
                  </p>
                  <DocTable
                    headers={["Method", "Example"]}
                    rows={timeframes.map((r) => [r.method, r.example])}
                  />
                </ScrollReveal>
              </section>

              <section id="routing" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Routing</h2>
                  <p className="mt-3 text-muted">
                    Repositories with no commits by you in the timeframe are omitted.
                    Single-repo runs skip the duplicate standup summary block.
                  </p>
                  <DocTable
                    headers={["Situation", "Behavior"]}
                    rows={routing.map((r) => [r.situation, r.behavior])}
                  />
                </ScrollReveal>
              </section>

              <section id="options" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Options</h2>
                  <ul className="mt-8 space-y-4">
                    {options.map((opt) => (
                      <li key={opt.flag} className="panel-hover p-4 rounded-2xl border border-transparent hover:border-line hover:bg-bg-elevated/40 transition-all">
                        <code className="font-mono text-sm text-fg bg-bg-elevated border border-line/50 px-2 py-1 rounded-md">{opt.flag}</code>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{opt.desc}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </section>

              <section id="requirements" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold tracking-tight">Requirements</h2>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-muted">
                    <li>Bash</li>
                    <li>
                      Git with{" "}
                      <code className="font-mono text-xs text-fg/80 bg-bg-elevated border border-line/50 px-1 py-0.5 rounded">user.email</code> or{" "}
                      <code className="font-mono text-xs text-fg/80 bg-bg-elevated border border-line/50 px-1 py-0.5 rounded">user.name</code>{" "}
                      configured
                    </li>
                  </ul>
                  <pre className="mt-6 overflow-x-auto rounded-2xl border border-term-border bg-term-bg px-4 py-4 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm panel-hover shadow-sm">
                    <span className="text-term-prompt select-none">$ </span>
                    git config --global user.email &quot;you@example.com&quot;{"\n"}
                    <span className="text-term-prompt select-none">$ </span>
                    git config --global user.name &quot;Your Name&quot;
                  </pre>
                  <p className="mt-8 text-sm text-muted">
                    Prefer reading on GitHub? Source and contributing notes live in the{" "}
                    <a
                      href="https://github.com/StackwiseTechnologiesLtd/git-recap"
                      className="text-accent hover:underline font-medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      repository
                    </a>
                    .
                  </p>
                </ScrollReveal>
              </section>
            </div>
          </div>
      </DocsLayout>
    </div>
  );
}

function DocTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-bg-panel/50">
            <th className="px-4 py-3 font-medium text-fg">{headers[0]}</th>
            <th className="px-4 py-3 font-medium text-fg">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-line last:border-0 hover:bg-bg-elevated/40 transition-colors group">
              <td className="px-4 py-3 align-top font-medium text-fg group-hover:text-accent transition-colors">{a}</td>
              <td className="px-4 py-3 align-top font-mono text-[13px] text-muted group-hover:text-fg transition-colors">
                {b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
