import { ImageResponse } from "next/og";
import { courses, getCourse } from "@/lib/courses";
import { site } from "@/lib/site";

export const alt = "Programme at FutureMinds AI Academy, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

/** Accent hexes mirroring the palette in globals.css. */
const accentHex: Record<string, string> = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  emerald: "#34d399",
  sky: "#38bdf8",
  amber: "#fbbf24",
  rose: "#fb7185",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  const accent = course ? accentHex[course.accent] : "#22d3ee";

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
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -160,
            width: 660,
            height: 660,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent}44, rgba(5,7,15,0))`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#e9eefb", fontSize: 27, fontWeight: 700 }}>
            FutureMinds AI Academy
          </div>
          <div style={{ color: accent, fontSize: 23, letterSpacing: 2 }}>
            {course?.code ?? "PROGRAMME"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e9eefb",
              fontSize: course && course.title.length > 34 ? 60 : 70,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {course?.title ?? "Programmes"}
          </div>
          <div
            style={{
              marginTop: 24,
              color: accent,
              fontSize: 29,
              lineHeight: 1.35,
              maxWidth: 950,
            }}
          >
            {course?.tagline ?? "Applied AI training in Bengaluru"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(148,163,184,0.2)",
            paddingTop: 26,
            color: "#9aa8c7",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>{course?.duration ?? ""}</span>
            <span>{course?.level ?? ""}</span>
            <span>Marathahalli, Bengaluru</span>
          </div>
          <div style={{ color: "#67e8f9" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
