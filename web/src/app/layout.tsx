import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "git-recap · standup summaries from your local commits",
  description:
    "A lightweight, zero-dependency CLI that aggregates your local Git commit messages into standup-ready summaries. Offline. Private. One brew away.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "git-recap",
    description:
      "Turn local Git commits into standup-ready summaries — offline, private, and zero-dependency.",
    type: "website",
    images: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">{children}</body>
    </html>
  );
}
