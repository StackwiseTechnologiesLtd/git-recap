type Line =
  | { kind: "dim"; text: string }
  | { kind: "title"; text: string }
  | { kind: "cat"; text: string; tone?: "green" | "yellow" | "magenta" | "cyan" }
  | { kind: "bullet"; text: string; hash?: string };

type TerminalWindowProps = {
  title?: string;
  lines: Line[];
  caption?: string;
  className?: string;
};

const toneClass = {
  green: "text-green",
  yellow: "text-yellow",
  magenta: "text-magenta",
  cyan: "text-cyan",
} as const;

export function TerminalWindow({
  title = "git-recap",
  lines,
  caption,
  className = "",
}: TerminalWindowProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-xs text-faint">{title}</span>
        </div>
        <pre className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 text-fg sm:min-h-[260px] sm:px-5 sm:text-[13px]">
          {lines.map((line, index) => {
            if (line.kind === "dim") {
              return (
                <div key={index} className="text-faint">
                  {line.text}
                </div>
              );
            }
            if (line.kind === "title") {
              return (
                <div key={index} className="font-medium text-cyan">
                  {line.text}
                </div>
              );
            }
            if (line.kind === "cat") {
              return (
                <div
                  key={index}
                  className={`mt-2 font-medium ${toneClass[line.tone ?? "green"]}`}
                >
                  {line.text}
                </div>
              );
            }
            return (
              <div key={index} className="pl-3 text-fg/90">
                <span className="text-muted">• </span>
                {line.text}
                {line.hash ? (
                  <span className="text-faint"> ({line.hash})</span>
                ) : null}
              </div>
            );
          })}
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-center font-mono text-xs text-faint sm:text-[13px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
