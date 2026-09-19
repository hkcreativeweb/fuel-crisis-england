import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#111827",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#d62828",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>FCE</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#ef4444" }}>Fuel Crisis England</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, lineHeight: 1.15, maxWidth: 950 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#94a3b8", maxWidth: 900 }}>
          Fuel prices, savings and accountability.
        </div>
      </div>
    ),
    { ...size }
  );
}
