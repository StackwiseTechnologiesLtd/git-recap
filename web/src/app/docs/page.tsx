import { CopyCommand } from "@/components/CopyCommand";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install git-recap with Homebrew and start generating standup summaries.",
};

const BREW_INSTALL = "brew tap StackwiseTechnologiesLtd/tools && brew trust StackwiseTechnologiesLtd/tools && brew install git-recap";
const NATIVE_RUN = "git-recap --today";

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
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Getting Started
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Welcome to git-recap! This documentation covers everything you need to start generating clean, categorized standup summaries from your Git history in seconds.
        </p>
      </ScrollReveal>

      {/* Why git-recap */}
      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight">Why git-recap?</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Writing your daily standup shouldn't be a chore. Manually sifting through `git log`, trying to remember what you worked on, and formatting it for Slack or Notion is tedious.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            <strong className="text-fg font-medium">git-recap</strong> automates this process by instantly scanning your repositories, intelligently grouping your commits into categories (like Features, Fixes, or Docs), and outputting a perfectly formatted summary. 
          </p>
        </ScrollReveal>
      </div>

      {/* Installation */}
      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <p className="mt-3 text-muted">The easiest way to install git-recap on macOS or Linux is via Homebrew:</p>
          <div className="mt-5 panel-hover">
            <CopyCommand command={BREW_INSTALL} />
          </div>
          <p className="mt-6 text-sm text-muted">
            <strong className="text-fg">Note:</strong> Modern Homebrew requires{" "}
            <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">brew trust</code> for
            third-party taps. If you prefer to install from source using Rust's cargo, see the{" "}
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
      </div>

      {/* Quick Start */}
      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight">Quick Start</h2>
          <p className="mt-3 text-muted">
            Once installed, navigate to any Git repository on your machine and run:
          </p>
          <div className="mt-5 panel-hover">
            <CopyCommand command={NATIVE_RUN} />
          </div>
          <p className="mt-6 text-muted">
            This will scan your repository for commits made since midnight and output a categorized summary. 
            If you want to scan multiple repositories at once, you can run the command from a parent directory and it will automatically find all immediate sub-directories containing a `.git` folder!
          </p>
        </ScrollReveal>
      </div>

      {/* Next Steps Grid */}
      <ScrollReveal delay={100}>
        <h2 className="mt-16 text-2xl font-semibold tracking-tight">Explore the Docs</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs/modules" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <GridIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">Built-in Modules</h3>
            <p className="text-sm text-muted leading-relaxed">See how commits are categorized automatically and how conventional commits are stripped.</p>
          </Link>

          <Link href="/docs/timeframe" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <BookIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">Timeframe Handling</h3>
            <p className="text-sm text-muted leading-relaxed">Learn how to pass custom dates, use shortcuts like --yesterday, or use environment variables.</p>
          </Link>

          <Link href="/docs/options" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <CodeIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">API Reference</h3>
            <p className="text-sm text-muted leading-relaxed">Read about all available CLI options, flags, and arguments for complete configuration.</p>
          </Link>

          <Link href="/docs/requirements" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <CommandIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">Requirements</h3>
            <p className="text-sm text-muted leading-relaxed">Ensure your system is configured correctly to get the most accurate commit author matching.</p>
          </Link>
        </div>
      </ScrollReveal>

    </div>
  );
}
