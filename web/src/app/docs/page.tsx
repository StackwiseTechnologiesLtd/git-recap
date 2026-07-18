import { CopyCommand } from "@/components/CopyCommand";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

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

export default function DocsPage() {
  return (
    <div className="bg-atmosphere relative min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <SiteHeader />

      <main className="relative pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-5 pt-28 sm:px-8 sm:pt-32">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            Documentation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            git-recap docs
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Aggregate your local Git commit messages into standup-ready summaries.
            Private by default — offline from local Git, with optional{" "}
            <code className="font-mono text-sm text-fg">--reviews</code> via{" "}
            <code className="font-mono text-sm text-fg">gh</code>.
          </p>
        </div>

        <nav
          aria-label="Docs sections"
          className="sticky top-[4.5rem] z-40 mt-8 border-y border-line bg-bg sm:top-[5rem]"
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="flex gap-x-5 overflow-x-auto py-3.5 text-sm text-muted [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <a
                href="#install"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Install
              </a>
              <a
                href="#usage"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Usage
              </a>
              <a
                href="#timeframe"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Timeframe
              </a>
              <a
                href="#routing"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Routing
              </a>
              <a
                href="#options"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Options
              </a>
              <a
                href="#requirements"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-accent"
              >
                Requirements
              </a>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <section id="install" className="scroll-mt-40 border-b border-line py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <p className="mt-3 text-muted">Homebrew (recommended):</p>
          <div className="mt-5">
            <CopyCommand command={BREW_INSTALL} />
          </div>
          <p className="mt-8 text-sm text-muted">
            Modern Homebrew requires{" "}
            <code className="font-mono text-xs text-fg/80">brew trust</code> for
            third-party taps. Or install from source — see the{" "}
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap#from-source"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub README
            </a>
            .
          </p>
        </section>

        <section id="usage" className="scroll-mt-40 border-b border-line py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
          <p className="mt-3 text-muted">
            Groups commits into Features, Fixes, Docs, Refactors, Tests,
            Performance, Chores, and Other. Conventional prefixes like{" "}
            <code className="font-mono text-xs text-fg/80">feat:</code> are
            stripped; long subjects shorten at word boundaries.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-term-border bg-term-bg">
            {commands.map((item, i) => (
              <div
                key={item.cmd}
                className={`flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                  i < commands.length - 1 ? "border-b border-term-border" : ""
                }`}
              >
                <code className="font-mono text-[13px] text-term-fg sm:text-sm">
                  <span className="text-term-prompt select-none">$ </span>
                  {item.cmd}
                </code>
                <span className="shrink-0 text-sm text-term-muted">{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="timeframe" className="scroll-mt-40 border-b border-line py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Timeframe</h2>
          <p className="mt-3 text-muted">
            Values pass through to{" "}
            <code className="font-mono text-xs text-fg/80">git log --since</code>
            , so any Git date expression works.{" "}
            <code className="font-mono text-xs text-fg/80">--yesterday</code> uses{" "}
            <code className="font-mono text-xs text-fg/80">
              --since &quot;yesterday 00:00&quot; --until &quot;today 00:00&quot;
            </code>
            .
          </p>
          <DocTable
            headers={["Method", "Example"]}
            rows={timeframes.map((r) => [r.method, r.example])}
          />
        </section>

        <section id="routing" className="scroll-mt-40 border-b border-line py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Routing</h2>
          <p className="mt-3 text-muted">
            Repositories with no commits by you in the timeframe are omitted.
            Single-repo runs skip the duplicate standup summary block.
          </p>
          <DocTable
            headers={["Situation", "Behavior"]}
            rows={routing.map((r) => [r.situation, r.behavior])}
          />
        </section>

        <section id="options" className="scroll-mt-40 border-b border-line py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Options</h2>
          <ul className="mt-8 space-y-5">
            {options.map((opt) => (
              <li key={opt.flag}>
                <code className="font-mono text-sm text-accent">{opt.flag}</code>
                <p className="mt-1 text-sm leading-relaxed text-muted">{opt.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="requirements" className="scroll-mt-40 py-14 sm:scroll-mt-44">
          <h2 className="text-2xl font-semibold tracking-tight">Requirements</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted">
            <li>Bash</li>
            <li>
              Git with{" "}
              <code className="font-mono text-xs text-fg/80">user.email</code> or{" "}
              <code className="font-mono text-xs text-fg/80">user.name</code>{" "}
              configured
            </li>
          </ul>
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-term-border bg-term-bg px-4 py-4 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm">
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.email &quot;you@example.com&quot;{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.name &quot;Your Name&quot;
          </pre>
          <p className="mt-8 text-sm text-muted">
            Prefer reading on GitHub? Source and contributing notes live in the{" "}
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              repository
            </a>
            .
          </p>
        </section>
        </div>
      </main>

      <SiteFooter />
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
    <div className="mt-8 overflow-hidden rounded-2xl border border-line-strong">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line-strong bg-bg-panel">
            <th className="px-4 py-3 font-medium text-fg">{headers[0]}</th>
            <th className="px-4 py-3 font-medium text-fg">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-line last:border-0">
              <td className="px-4 py-3 align-top font-medium text-fg">{a}</td>
              <td className="px-4 py-3 align-top font-mono text-[13px] text-muted">
                {b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
