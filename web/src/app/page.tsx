import { AnimatedLogo } from "@/components/AnimatedLogo";
import { CopyCommand } from "@/components/CopyCommand";
import { InstallHelpTerminal } from "@/components/InstallHelpTerminal";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TerminalWindow } from "@/components/TerminalWindow";
import Link from "next/link";

const BREW_INSTALL =
  "brew tap StackwiseTechnologiesLtd/tools && brew trust StackwiseTechnologiesLtd/tools && brew install git-recap";

const heroLines = [
  { kind: "title" as const, text: "my-app · 8 commits · since 1 day ago" },
  { kind: "dim" as const, text: "────────────────────────────────────────" },
  { kind: "cat" as const, text: "Features (4)", tone: "green" as const },
  {
    kind: "bullet" as const,
    text: "Add 'Being supplied' indicator to product cards…",
    hash: "321c610",
  },
  {
    kind: "bullet" as const,
    text: "Enhance search functionality and recent searches…",
    hash: "302b845",
  },
  { kind: "cat" as const, text: "Refactors (4)", tone: "magenta" as const },
  {
    kind: "bullet" as const,
    text: "Streamline search components and localization…",
    hash: "d2c32d5",
  },
  {
    kind: "bullet" as const,
    text: "Remove temporary translation migration scripts",
    hash: "cf85669",
  },
];

const featureRows = [
  {
    eyebrow: "Smart grouping",
    title: "Grouped when you need it",
    body: "Conventional commits and keyword heuristics sort your work into Features, Fixes, Docs, Refactors, and more — so standup answers are already categorized.",
    caption: "grouped when you need it",
    command: "git-recap --today",
    reverse: false,
    lines: [
      { kind: "title" as const, text: "api-gateway · 3 commits · since midnight" },
      { kind: "dim" as const, text: "────────────────────────────────────────" },
      { kind: "cat" as const, text: "Features (1)", tone: "green" as const },
      { kind: "bullet" as const, text: "Add rate-limit dashboard filters", hash: "a1b2c3d" },
      { kind: "cat" as const, text: "Fixes (2)", tone: "yellow" as const },
      { kind: "bullet" as const, text: "Handle expired auth tokens", hash: "b2c3d4e" },
      { kind: "bullet" as const, text: "Repair webhook retry backoff", hash: "c3d4e5f" },
    ],
  },
  {
    eyebrow: "Multi-repo",
    title: "Scanned across projects",
    body: "Run from a parent folder or pass multiple paths. git-recap aggregates only the repositories where you actually shipped commits in the timeframe.",
    caption: "scanned across projects",
    command: "git-recap",
    reverse: true,
    lines: [
      { kind: "title" as const, text: "Standup summary · 5 commits · since 1 day ago" },
      { kind: "dim" as const, text: "────────────────────────────────────────" },
      { kind: "cat" as const, text: "Features (2)", tone: "green" as const },
      { kind: "bullet" as const, text: "my-app: Add dashboard filters" },
      { kind: "bullet" as const, text: "docs-site: Ship changelog page" },
      { kind: "cat" as const, text: "Chores (1)", tone: "cyan" as const },
      { kind: "bullet" as const, text: "infra: Bump CI Node version" },
    ],
  },
  {
    eyebrow: "Paste-ready",
    title: "Clean output for Slack and notes",
    body: "Use --plain for no colors and no hashes, or --summary-only when you want just the standup block. Copy once, paste into the call.",
    caption: "paste-ready for Slack",
    command: "git-recap --plain",
    reverse: false,
    lines: [
      { kind: "title" as const, text: "my-app · 2 commits · since 1 day ago" },
      { kind: "dim" as const, text: "────────────────────────────────────────" },
      { kind: "cat" as const, text: "Features (1)", tone: "green" as const },
      { kind: "bullet" as const, text: "Improve onboarding checklist" },
      { kind: "cat" as const, text: "Docs (1)", tone: "cyan" as const },
      { kind: "bullet" as const, text: "Clarify API auth examples" },
    ],
  },
];

const summaryLines = [
  { kind: "title" as const, text: "Standup summary · 8 commits · since 1 day ago" },
  { kind: "dim" as const, text: "────────────────────────────────────────" },
  { kind: "cat" as const, text: "Features (4)", tone: "green" as const },
  { kind: "bullet" as const, text: "Enhance order management UI with search" },
  { kind: "bullet" as const, text: "Update localization and profile UX" },
  { kind: "cat" as const, text: "Refactors (4)", tone: "magenta" as const },
  { kind: "bullet" as const, text: "Update ProductCard layout support" },
  { kind: "bullet" as const, text: "Clean CheckoutWebView imports" },
];

const helpRows = [
  { cmd: "git-recap", note: "summarize current repo / scan cwd" },
  { cmd: "git-recap [path]", note: "summarize a specific repo" },
  { cmd: "git-recap --today", note: "commits since midnight" },
  { cmd: "git-recap --yesterday", note: "yesterday only" },
  { cmd: "git-recap --week", note: "last seven days" },
  { cmd: "git-recap --plain", note: "paste into Slack / notes" },
  { cmd: "git-recap --summary-only", note: "standup block only" },
  { cmd: "git-recap -h", note: "show help" },
];

export default function Home() {
  return (
    <div className="bg-atmosphere relative min-h-screen overflow-x-hidden">
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <SiteHeader />

      <main className="relative pb-28 sm:pb-32">
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-rise flex flex-col items-center gap-4">
              <AnimatedLogo size={80} className="sm:scale-110" />
              <p className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                git-recap
              </p>
            </div>
            <p className="animate-rise-delay-1 mt-5 font-mono text-[11px] font-medium tracking-[0.22em] text-accent uppercase sm:text-xs">
              Standups without the scramble
            </p>
            <h1 className="animate-rise-delay-1 mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl md:leading-[1.05]">
              Your commits,{" "}
              <span className="accent-underline text-accent">ready for standup</span>
            </h1>
            <p className="animate-rise-delay-2 mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              git-recap reads local Git history and turns yesterday&apos;s work into a
              grouped, paste-ready summary — offline, private, and zero-dependency.
            </p>

            <div className="animate-rise-delay-2 mx-auto mt-8 max-w-2xl">
              <CopyCommand command={BREW_INSTALL} />
            </div>

            <div className="animate-rise-delay-2 mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#install"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-accent-fill px-6 text-sm font-semibold text-white transition hover:bg-accent-fill-hover active:scale-[0.98]"
              >
                Install with Homebrew
              </a>
              <a
                href="https://github.com/StackwiseTechnologiesLtd/git-recap"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-line-strong bg-transparent px-6 text-sm font-medium text-fg transition hover:border-accent/35 hover:text-accent active:scale-[0.98]"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="animate-terminal mx-auto mt-14 max-w-2xl sm:mt-16">
            <TerminalWindow
              command="git-recap"
              lines={heroLines}
              caption="one command · smart categories · copy into standup notes"
              loop
            />
          </div>
        </section>

        <section id="features" className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Features
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                From raw log to standup answer
              </h2>
              <p className="mt-4 text-muted">
                Group commits, scan multiple repos, and ship a clean summary before the
                call starts.
              </p>
            </Reveal>

            <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
              {featureRows.map((item) => (
                <Reveal key={item.title}>
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                      item.reverse ? "" : ""
                    }`}
                  >
                    <div className={item.reverse ? "lg:order-2" : ""}>
                      <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                    <div className={item.reverse ? "lg:order-1" : ""}>
                      <TerminalWindow
                        command={item.command}
                        lines={item.lines}
                        caption={item.caption}
                        className="mx-auto w-full max-w-xl lg:max-w-none"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Smart summaries
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Features, fixes, chores — already sorted
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Conventional commits and keyword heuristics classify your work so you
                talk about outcomes, not hash soup.
              </p>
              <ul className="mt-8 space-y-5">
                <FeaturePoint
                  title="Category grouping"
                  body="Features, Fixes, Docs, Refactors, Tests, Performance, Chores, Other."
                />
                <FeaturePoint
                  title="Readable bullets"
                  body="Prefixes stripped, long subjects shortened at word boundaries."
                />
                <FeaturePoint
                  title="Time presets"
                  body="--today, --yesterday, --week, or any git --since expression."
                  href="#help"
                  linkLabel="See usage →"
                />
              </ul>
            </Reveal>
            <Reveal delay={2}>
              <TerminalWindow
                command="git-recap --summary-only"
                lines={summaryLines}
              />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1" delay={1}>
              <div className="panel-hover rounded-2xl border border-line-strong bg-bg-panel p-6 sm:p-8">
                <div className="font-mono text-xs tracking-wide text-accent uppercase">
                  Routing
                </div>
                <dl className="mt-6 space-y-5">
                  <RouteRow
                    label="Inside a repo"
                    body="Recaps the current project only."
                  />
                  <RouteRow
                    label="Parent folder"
                    body="Scans immediate subdirectories for .git."
                  />
                  <RouteRow
                    label="Explicit paths"
                    body="Pass the repos you care about by name or path."
                  />
                </dl>
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Local & private
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Entirely offline. Nothing leaves your machine.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Pure Bash + git plumbing. No Node runtime, no API keys, no telemetry —
                just your local author history for the window you choose.
              </p>
              <ul className="mt-8 space-y-5">
                <FeaturePoint
                  title="Author-aware"
                  body="Matches git config user.email, then falls back to user.name."
                />
                <FeaturePoint
                  title="--plain for Slack"
                  body="No colors, no hashes — paste straight into standup notes."
                />
                <FeaturePoint
                  title="Zero dependencies"
                  body="A single executable script you can brew install or symlink."
                />
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="install" className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Install
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                One brew away
              </h2>
              <p className="mt-4 text-muted">
                Commands first — then the install line types itself out. Copy the brew
                command when you&apos;re ready.
              </p>
            </Reveal>

            <Reveal className="mx-auto mt-12 max-w-3xl" delay={1}>
              <InstallHelpTerminal
                rows={helpRows}
                installLabel="install"
                installCommand={BREW_INSTALL}
                tagline="Your commits, ready for standup"
              />
            </Reveal>

            <Reveal className="mx-auto mt-6 max-w-3xl" delay={2}>
              <CopyCommand command={BREW_INSTALL} />
              <p className="mt-5 text-center text-sm text-muted">
                Prefer source? See{" "}
                <Link href="/docs#install" className="text-accent hover:underline">
                  docs
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        <section id="help" className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Help
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Everyday commands
              </h2>
              <p className="mt-4 text-muted">
                The install panel above doubles as a quick reference. Full docs —
                timeframes, routing, and options — live on the{" "}
                <Link href="/docs" className="text-accent transition hover:underline">
                  docs page
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FeaturePoint({
  title,
  body,
  href,
  linkLabel,
}: {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <li>
      <h3 className="font-medium text-fg">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      {href && linkLabel ? (
        <a
          href={href}
          className="mt-2 inline-block text-sm text-accent transition hover:underline"
        >
          {linkLabel}
        </a>
      ) : null}
    </li>
  );
}

function RouteRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-line pt-5 first:border-0 first:pt-0">
      <dt className="font-medium text-fg">{label}</dt>
      <dd className="mt-1 text-sm text-muted">{body}</dd>
    </div>
  );
}
