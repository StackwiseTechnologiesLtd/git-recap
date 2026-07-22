import { ScrollReveal } from "@/components/ScrollReveal";
import { DocTable } from "@/components/DocTable";
import { CopyCommand } from "@/components/CopyCommand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Routing & Monorepos",
  description: "Learn how git-recap processes repositories, directories, and paths.",
};

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

export default function RoutingPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Routing & Monorepos
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          git-recap is designed to be smart about where it runs. Whether you are inside a single repository, at the root of a monorepo, or in a directory containing dozens of separate projects, git-recap will automatically find and process the relevant Git histories.
        </p>
      </ScrollReveal>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Directory Scanning Behavior</h2>
          <p className="text-muted leading-relaxed mb-6">
            The CLI uses the current working directory to determine what to scan. Repositories with no commits by you in the timeframe are completely omitted from the final output, keeping your summary clean and noise-free. Single-repo runs will skip the duplicate summary block since the data is identical.
          </p>
          <DocTable
            headers={["Situation", "Behavior"]}
            rows={routing.map((r) => [r.situation, r.behavior])}
          />
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Deep Scanning (-r)</h2>
          <p className="text-muted leading-relaxed mb-6">
            If you have a complex folder structure with nested repositories, you can use the recursive flag <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">-r</code> or <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--recursive</code>. To maintain performance, git-recap automatically ignores common dependency and build directories like <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">node_modules</code>, <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">vendor</code>, and <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">.next</code>.
          </p>
          <div className="bg-term-bg rounded-lg border border-term-border">
            <CopyCommand command="git-recap -r --today" className="border-0 shadow-none hover:translate-y-0" />
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Targeted Runs</h2>
          <p className="text-muted leading-relaxed mb-6">
            If you only want to summarize a specific set of projects, you can pass their paths directly as arguments. This bypasses the directory scanning and strictly evaluates the provided paths.
          </p>
          <div className="bg-term-bg rounded-lg border border-term-border">
            <CopyCommand command="git-recap ~/code/project-a ~/code/project-b" className="border-0 shadow-none hover:translate-y-0" />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
