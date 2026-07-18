import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f5",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#541111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
            }}
            >
            {/* replace with actual logo and colors white keep the parent burgandy */}
            g
          </div>
          <span>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Your commits, ready for standup
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(245,245,245,0.72)",
              maxWidth: 860,
              lineHeight: 1.35,
            }}
          >
            Offline · private · zero-dependency CLI for daily standups
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(245,245,245,0.55)",
          }}
        >
          <span style={{ color: "#c45c5c" }}>brew install git-recap</span>
          <span>Stackwise Technologies</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
