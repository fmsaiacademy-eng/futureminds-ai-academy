import { COLLECTIONS, getCollection, isDbConfigured } from "./mongodb";

export type ReviewDoc = {
  name: string;
  /** Current role or company, e.g. "Data Engineer at Acme". Optional. */
  role?: string;
  program: string;
  rating: number;
  quote: string;
  /** Optional headshot path under /public. A monogram is shown otherwise. */
  photo?: string;
  /** Nothing renders publicly until this is true. */
  approved: boolean;
  /** Pinned to the top of the homepage strip. */
  featured: boolean;
  /** The person confirmed we may publish their words and name. */
  consent: boolean;
  createdAt: Date;
};

/** Shape handed to client components — no ObjectId, no Date objects. */
export type PublicReview = {
  id: string;
  name: string;
  role?: string;
  program: string;
  rating: number;
  quote: string;
  photo?: string;
};

/**
 * Approved reviews, newest first, featured ones pinned above the rest.
 *
 * Never throws. If the database is unreachable or unconfigured this returns
 * an empty list, so a build or a page render is never broken by the
 * testimonials section — the section simply does not appear.
 */
export async function getApprovedReviews(limit = 12): Promise<PublicReview[]> {
  if (!isDbConfigured) return [];

  try {
    const col = await getCollection<ReviewDoc>(COLLECTIONS.reviews);
    const docs = await col
      .find({ approved: true })
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .toArray();

    return docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      role: d.role,
      program: d.program,
      rating: d.rating,
      quote: d.quote,
      photo: d.photo,
    }));
  } catch (err) {
    console.error("[reviews] read failed, rendering without testimonials", err);
    return [];
  }
}

/**
 * Sample reviews used ONLY to preview the design while no approved review
 * exists yet. Mirrors `previewPlacements` in ./placements — rendered when
 * NODE_ENV is not "production" and the real list is empty.
 *
 * A production build never reaches this array, so invented reviews can
 * never appear on the live site.
 */
export const previewReviews: PublicReview[] = [
  {
    id: "preview-review-1",
    name: "Ananya Rao",
    role: "AI Engineer at Zenlytic Labs",
    program: "Data Science & AI Engineer",
    rating: 5,
    quote:
      "I expected lectures and got code review instead. Every week someone senior picked my work apart in a way that was uncomfortable and completely worth it.",
  },
  {
    id: "preview-review-2",
    name: "Vikram Shetty",
    role: "Forward Deployed Engineer at Northwind AI",
    program: "Forward Deployed Engineer (FDE)",
    rating: 5,
    quote:
      "The discovery-call simulations were the part I dreaded and the part that got me hired. No other programme I looked at made engineers practise talking to customers.",
  },
  {
    id: "preview-review-3",
    name: "Priya Krishnan",
    role: "Full Stack Engineer at Corvid Systems",
    program: "Full Stack Development with AI",
    rating: 5,
    quote:
      "Career switch from mechanical engineering with zero JavaScript. The mentors never once made me feel behind, and the capstone carried both my interviews.",
  },
  {
    id: "preview-review-4",
    name: "Karthik Menon",
    role: "Data Engineer",
    program: "Data Engineering",
    rating: 4,
    quote:
      "Genuinely strong on pipelines and orchestration. I would have liked more time on cost optimisation — I raised it, and they added a session for the next cohort.",
  },
];
