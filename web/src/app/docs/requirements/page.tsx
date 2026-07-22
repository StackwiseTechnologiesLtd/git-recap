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
    </div>
  );
}
