import { CopyCommand } from "@/components/CopyCommand";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install git-recap with Homebrew and start generating standup summaries.",
};

const BREW_INSTALL = "brew tap StackwiseTechnologiesLtd/tools && brew trust StackwiseTechnologiesLtd/tools && brew install git-recap";

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
          Documentation
        </h1>
        <p className="mt-4 text-lg text-muted">
          Everything you need to use git-recap and build clean standup summaries.
        </p>
      </ScrollReveal>

      {/* Cards Grid */}
      <ScrollReveal delay={100}>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/docs" className="md:col-span-3 panel-hover p-6 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <BookIcon className="h-6 w-6 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-lg font-medium text-fg">Getting Started</h3>
            <p className="text-sm text-muted">Download, install, and set up git-recap on your machine in two minutes.</p>
          </Link>
          
          <Link href="/docs/modules" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <GridIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">Built-in Modules</h3>
            <p className="text-sm text-muted">See how commits are categorized automatically.</p>
          </Link>

          <Link href="/docs/options" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <CodeIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">Configuration</h3>
            <p className="text-sm text-muted">Learn to pass options, flags, and arguments.</p>
          </Link>

          <Link href="/docs/requirements" className="panel-hover p-5 rounded-2xl border border-line bg-bg-panel/40 flex flex-col gap-3 group transition-colors hover:border-line-strong hover:bg-bg-panel">
            <CommandIcon className="h-5 w-5 text-muted group-hover:text-fg transition-colors" />
            <h3 className="text-md font-medium text-fg">API Reference</h3>
            <p className="text-sm text-muted">Every available flag typed out and documented.</p>
          </Link>
        </div>
      </ScrollReveal>

      {/* Documentation Sections */}
      <div className="mt-20">
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
      </div>
    </div>
  );
}
