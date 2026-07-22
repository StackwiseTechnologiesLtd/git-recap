import { ScrollReveal } from "@/components/ScrollReveal";
import { DocTable } from "@/components/DocTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Routing",
  description: "Learn how git-recap processes repositories and paths.",
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
          Routing
        </h1>
        <p className="mt-3 text-muted">
          Repositories with no commits by you in the timeframe are omitted.
          Single-repo runs skip the duplicate standup summary block.
        </p>
        <DocTable
          headers={["Situation", "Behavior"]}
          rows={routing.map((r) => [r.situation, r.behavior])}
        />
      </ScrollReveal>
    </div>
  );
}
