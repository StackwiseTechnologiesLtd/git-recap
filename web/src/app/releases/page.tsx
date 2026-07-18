import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { releases } from "@/data/releases";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Releases",
  path: "/releases",
  description:
    "git-recap release history — CLI and website changelog for every public version.",
  keywords: [
    "git-recap releases",
    "git-recap changelog",
    "git-recap versions",
    "standup CLI releases",
  ],
});

export default function ReleasesPage() {
  return (
    <div className="bg-atmosphere relative min-h-screen overflow-x-hidden">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Releases", path: "/releases" },
        ])}
      />
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
            <li key={release.version} id={release.version} className="scroll-mt-28">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <a href={`#${release.version}`} className="hover:text-accent">
                    {release.version}
                  </a>
                </h2>
                <time
                  dateTime={release.date}
                  className="font-mono text-sm text-muted"
                >
                  {release.date}
                </time>
              </div>
              <p className="mt-3 text-muted">{release.title}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg">
                {release.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {release.github ? (
                <p className="mt-4 text-sm">
                  <a
                    href={release.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    View on GitHub →
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-16 text-sm text-muted">
          Looking for install steps? See the{" "}
          <Link href="/docs#install" className="text-accent hover:underline">
            docs
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
