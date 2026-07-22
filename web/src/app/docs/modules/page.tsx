import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built-in Modules",
  description: "See how commits are categorized automatically by git-recap.",
};

const moduleExamples = [
  { 
    name: "Features", 
    description: "New functionality or additions to the codebase.", 
    examples: ["feat: add user authentication", "Add new dashboard widget"] 
  },
  { 
    name: "Fixes", 
    description: "Bug fixes and error resolutions.", 
    examples: ["fix: resolve null pointer in login", "Patch memory leak"] 
  },
  { 
    name: "Docs", 
    description: "Documentation updates.", 
    examples: ["docs: update readme with setup instructions", "Add docstrings to API router"] 
  },
  { 
    name: "Refactors", 
    description: "Code structure changes without behavior change.", 
    examples: ["refactor: extract authentication service", "Cleanup dead code"] 
  },
  { 
    name: "Tests", 
    description: "Adding or updating tests.", 
    examples: ["test: add coverage for utils", "Update snapshot tests"] 
  },
  { 
    name: "Performance", 
    description: "Performance optimizations.", 
    examples: ["perf: lazy load images on homepage", "Optimize database query"] 
  },
  { 
    name: "Chores", 
    description: "Maintenance, dependencies, and build tasks.", 
    examples: ["chore: bump react to 18.2.0", "Update github actions workflow"] 
  },
];

export default function ModulesPage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Built-in Modules
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          git-recap doesn't just list your commits—it intelligently categorizes them into logical modules. This allows your team to quickly understand the *type* of work you accomplished during your standup.
        </p>
      </ScrollReveal>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight">The Grouping Algorithm</h2>
          <p className="mt-4 text-muted leading-relaxed">
            When git-recap scans your repository, it analyzes the commit subject line. It first checks for standard <strong>Conventional Commit</strong> prefixes (like <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">feat:</code> or <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">fix:</code>). If found, it instantly categorizes the commit and gracefully strips the prefix from the output to keep your standup clean.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            If no conventional prefix is found, it falls back to a smart keyword-matching system, searching for words like "add", "resolve", or "update" to place the commit in the best possible bucket.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Categories Overview</h2>
          <div className="space-y-6">
            {moduleExamples.map((mod) => (
              <div key={mod.name} className="p-5 rounded-2xl border border-line bg-bg-panel shadow-sm">
                <h3 className="text-lg font-medium text-fg mb-2">{mod.name}</h3>
                <p className="text-sm text-muted mb-4">{mod.description}</p>
                <div className="bg-term-bg rounded-lg p-3 border border-term-border">
                  <p className="text-xs text-term-muted mb-2 uppercase tracking-wider font-semibold">Example Commits:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {mod.examples.map((ex, i) => (
                      <li key={i} className="text-[13px] font-mono text-term-fg">{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight">The &quot;Other&quot; Bucket</h2>
          <p className="mt-4 text-muted leading-relaxed">
            What happens when a commit defies categorization? If git-recap cannot confidently place a commit into one of the primary modules, it is safely stored in the <strong>Other</strong> category at the bottom of your summary. Nothing is ever lost or hidden.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
