import { AnimatedLogo } from "@/components/AnimatedLogo";
import { CopyCommand } from "@/components/CopyCommand";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { TerminalWindow } from "@/components/TerminalWindow";
import Image from "next/image";

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

export default function Home() {
  return (
    <div className="bg-atmosphere relative min-h-screen overflow-x-hidden">
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <SiteHeader />

      <main className="relative">
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
                className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-6 text-sm font-semibold text-white transition hover:bg-[#6a1717] active:scale-[0.98]"
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
              lines={heroLines}
              caption="one command · smart categories · copy into standup notes"
              animateLines
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
                lines={[
                  { kind: "title", text: "Standup summary · 8 commits · since 1 day ago" },
                  { kind: "dim", text: "────────────────────────────────────────" },
                  { kind: "cat", text: "Features (4)", tone: "green" },
                  { kind: "bullet", text: "Enhance order management UI with search" },
                  { kind: "bullet", text: "Update localization and profile UX" },
                  { kind: "cat", text: "Refactors (4)", tone: "magenta" },
                  { kind: "bullet", text: "Update ProductCard layout support" },
                  { kind: "bullet", text: "Clean CheckoutWebView imports" },
                ]}
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
                Distributed via the Stackwise Homebrew tap. Update with the rest of your
                formulae.
              </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
              <Reveal delay={1}>
                <div className="panel-hover h-full rounded-2xl border border-line-strong bg-bg-panel p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">Homebrew</h3>
                  <div className="mt-5">
                    <CopyCommand command={BREW_INSTALL} />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    Modern Homebrew requires trusting third-party taps once. After that,{" "}
                    <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-fg">
                      brew upgrade git-recap
                    </code>{" "}
                    keeps you current.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="panel-hover h-full rounded-2xl border border-line-strong bg-bg-panel p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">From source</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    Clone the repo, make the script executable, and link it onto your{" "}
                    <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-fg">
                      PATH
                    </code>
                    .
                  </p>
                  <pre className="mt-5 overflow-x-auto rounded-xl border border-term-border bg-term-bg p-4 font-mono text-[12px] leading-6 text-term-fg">
{`git clone https://github.com/StackwiseTechnologiesLtd/git-recap.git
cd git-recap
chmod +x bin/git-recap
ln -s "$(pwd)/bin/git-recap" /usr/local/bin/git-recap`}
                  </pre>
                </div>
              </Reveal>
            </div>
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
            </Reveal>

            <Reveal className="mx-auto mt-12 max-w-3xl" delay={1}>
              <div className="overflow-hidden rounded-2xl border border-term-border bg-term-bg">
                <CommandRow cmd="git-recap" note="Current repo, or scan cwd subdirs" />
                <CommandRow cmd="git-recap --today" note="Commits since midnight" />
                <CommandRow cmd="git-recap --yesterday" note="Yesterday only" />
                <CommandRow cmd="git-recap --week" note="Last seven days" />
                <CommandRow cmd="git-recap --plain" note="Paste into Slack / notes" />
                <CommandRow
                  cmd="git-recap --summary-only"
                  note="Standup block only"
                  last
                />
              </div>
            </Reveal>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
              Full docs live in the{" "}
              <a
                href="https://github.com/StackwiseTechnologiesLtd/git-recap#readme"
                className="text-accent transition hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                GitHub README
              </a>
              . Requires Bash and Git with{" "}
              <code className="font-mono text-xs text-fg/80">user.email</code> or{" "}
              <code className="font-mono text-xs text-fg/80">user.name</code> set.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt=""
              width={18}
              height={17}
              className="h-4 w-auto"
            />
            <span>© {new Date().getFullYear()} git-recap</span>
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="transition-colors hover:text-accent">
              Home
            </a>
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap"
              className="transition-colors hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap/releases"
              className="transition-colors hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              Changelog
            </a>
            <a
              href="https://github.com/StackwiseTechnologiesLtd/homebrew-tools"
              className="transition-colors hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              Homebrew tap
            </a>
          </div>
          <p className="text-faint">MIT licensed · Stackwise Technologies</p>
        </div>
      </footer>
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

function CommandRow({
  cmd,
  note,
  last = false,
}: {
  cmd: string;
  note: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
        last ? "" : "border-b border-term-border"
      }`}
    >
      <code className="font-mono text-[13px] text-term-green">{cmd}</code>
      <span className="text-sm text-term-muted">{note}</span>
    </div>
  );
}
