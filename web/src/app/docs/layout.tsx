import { DocsLayout } from "@/components/DocsLayout";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | git-recap Docs",
    default: "Documentation | git-recap",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-bg text-fg overflow-hidden selection:bg-accent selection:text-fg">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />
      <DocsLayout>
        <div className="max-w-4xl mx-auto px-6 py-6 md:px-12 md:py-8">
          {children}
        </div>
      </DocsLayout>
    </div>
  );
}
