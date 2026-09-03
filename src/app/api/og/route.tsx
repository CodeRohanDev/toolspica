import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? SITE.name).slice(0, 90);
  const eyebrow = (searchParams.get("eyebrow") ?? "").slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0b0e14",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(99,102,241,0.55), rgba(11,14,20,0) 55%), radial-gradient(circle at 8% 92%, rgba(79,70,229,0.35), rgba(11,14,20,0) 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.08)",
              fontSize: 28,
            }}
          >
            🛠️
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
            Toolspica
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <span
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#a5b4fc",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {eyebrow}
            </span>
          )}
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.65)" }}>
            Free · Browser-based · Privacy-first — toolspica.cloud
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
