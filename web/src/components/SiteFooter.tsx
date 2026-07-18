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
    label: "Homebrew",
    external: true,
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-4 pb-6 pt-2 sm:px-6 sm:pb-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border-t border-line-strong bg-bg px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="flex justify-center items-center gap-2">
              <Image
                src="/logo.svg"
                alt=""
                width={18}
                height={17}
                className="h-4 w-auto"
              />
              <span>© {new Date().getFullYear()} git-recap</span>
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 justify-between">
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
            <p className="flex justify-center items-center gap-2 text-faint">
              MIT
              <span>{" "} ·{" "}</span>
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
