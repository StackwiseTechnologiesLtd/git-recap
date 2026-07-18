import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { releases } from "@/data/releases";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Releases · git-recap",
  description:
    "Version history for git-recap — CLI and website release notes.",
};

export default function ReleasesPage() {
  return (
    <div className="bg-atmosphere relative min-h-screen overflow-x-hidden">
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <SiteHeader />

      <main className="relative mx-auto max-w-3xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
          Changelog
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Releases
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Public version history for the CLI and marketing site. Newest first.
        </p>

        <ol className="mt-14 space-y-12">
          {releases.map((release) => (
            <li key={release.version} className="relative pl-6">
              <span
                className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-accent"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-fg">
                  {release.version}
                </h2>
                <time
                  dateTime={release.date}
                  className="font-mono text-xs tracking-wide text-faint"
                >
                  {release.date}
                </time>
              </div>
              <p className="mt-2 text-base text-muted">{release.title}</p>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
                {release.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {release.github ? (
                <a
                  href={release.github}
                  className="mt-5 inline-block text-sm text-accent transition hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub →
                </a>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-16 text-sm text-muted">
          Prefer GitHub releases?{" "}
          <a
            href="https://github.com/StackwiseTechnologiesLtd/git-recap/releases"
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            github.com/.../releases
          </a>
          . Docs live on the{" "}
          <Link href="/docs" className="text-accent hover:underline">
            docs page
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
