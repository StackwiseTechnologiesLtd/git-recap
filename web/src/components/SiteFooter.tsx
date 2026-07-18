import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/releases", label: "Releases" },
  {
    href: "https://github.com/StackwiseTechnologiesLtd/git-recap",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://github.com/StackwiseTechnologiesLtd/homebrew-tools",
    label: "Homebrew tap",
    external: true,
  },
];

export function SiteFooter() {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-5">
      <div className="pointer-events-auto mx-auto max-w-5xl">
        <div className="rounded-2xl border border-line-strong bg-bg px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt=""
                width={18}
                height={17}
                className="h-4 w-auto"
              />
              <span>© {new Date().getFullYear()} git-recap</span>
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
            <p className="text-faint">
              MIT ·{" "}
              <a
                href="https://stackwisetechnologies.com/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                Stackwise Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
