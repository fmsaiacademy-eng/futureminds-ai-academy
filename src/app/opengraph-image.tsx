import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — AI training institute in Bengaluru`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070f",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,211,238,0.30), rgba(5,7,15,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.30), rgba(5,7,15,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              border: "2px solid rgba(129,140,248,0.6)",
              background: "rgba(129,140,248,0.14)",
            }}
          />
          <div
            style={{
              color: "#e9eefb",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            FutureMinds AI Academy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e9eefb",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Train for the AI jobs that actually exist.
          </div>
          <div
            style={{
              marginTop: 26,
              color: "#9aa8c7",
              fontSize: 27,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Forward Deployed Engineering · Data Science &amp; AI · Generative
            &amp; Agentic AI · Full Stack with AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(148,163,184,0.2)",
            paddingTop: 26,
            color: "#6b7999",
            fontSize: 22,
          }}
        >
          <div>Marathahalli, Bengaluru</div>
          <div style={{ color: "#67e8f9" }}>futuremindsaiacademy.com</div>
        </div>
      </div>
    ),
    size,
  );
}
