import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/programs", priority: 0.9 },
    { path: "/mentors", priority: 0.8 },
    { path: "/placements", priority: 0.8 },
    { path: "/feedback", priority: 0.5 },
    { path: "/corporate", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...courses.map((c) => ({
      url: `${site.url}/programs/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
