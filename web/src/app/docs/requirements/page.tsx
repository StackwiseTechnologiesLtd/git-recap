import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requirements",
  description: "System requirements and source code details for git-recap.",
};

export default function RequirementsPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Requirements
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed mb-12">
          git-recap is built to be as lightweight and dependency-free as possible. It relies heavily on standard tools already present in most developer environments.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">System Prerequisites</h2>
        <div className="bg-bg-panel border border-line rounded-2xl p-6 shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent/10 text-accent rounded-full mr-4 mt-0.5">1</span>
              <div>
                <strong className="block text-fg mb-1">Bash</strong>
                <p className="text-sm text-muted">The core CLI logic expects a standard UNIX-like shell environment (macOS, Linux, or WSL).</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent/10 text-accent rounded-full mr-4 mt-0.5">2</span>
              <div>
                <strong className="block text-fg mb-1">Git</strong>
                <p className="text-sm text-muted">A local installation of Git. Specifically, git-recap relies heavily on <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">git log</code> and internal Git config parsing.</p>
              </div>
            </li>
          </ul>
        </div>
      </ScrollReveal>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Troubleshooting Author Matching</h2>
          <p className="text-muted leading-relaxed mb-6">
            The most common issue users face is running git-recap and seeing an empty summary. 99% of the time, this happens because git-recap doesn't know who "you" are.
          </p>
          <p className="text-muted leading-relaxed mb-6">
            By default, git-recap automatically filters commits matching the author email or name configured in your global Git settings. Ensure these are set correctly:
          </p>
          
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-term-border bg-term-bg px-5 py-4 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm panel-hover shadow-sm">
            <span className="text-term-muted"># Verify your current config</span>{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.email{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.name{"\n\n"}
            <span className="text-term-muted"># Set them if they are missing</span>{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.email &quot;you@example.com&quot;{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git config --global user.name &quot;Your Name&quot;
          </pre>

          <p className="mt-8 text-muted leading-relaxed">
            If you commit under multiple emails across different repositories (e.g., a personal email and a work email), git-recap might miss some commits. You can easily override the author check by passing your name directly:
          </p>
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-term-border bg-term-bg px-5 py-4 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm panel-hover shadow-sm">
            <span className="text-term-muted"># Match any commit where the author contains "Jane"</span>{"\n"}
            <span className="text-term-prompt select-none">$ </span>
            git-recap --author &quot;Jane&quot;
          </pre>
        </ScrollReveal>
      </div>

      <div className="mt-16 pt-8 border-t border-line">
        <ScrollReveal>
          <p className="text-sm text-muted">
            Prefer reading on GitHub? Source code and contributing notes live in the{" "}
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap"
              className="text-accent hover:underline font-medium transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              repository
            </a>
            .
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
