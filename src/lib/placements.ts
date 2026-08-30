import { getCollection, isDbConfigured } from "./mongodb";

export const PLACEMENTS_COLLECTION = "placements";

/** An appreciation note from a mentor, peer or employer. */
export type Appreciation = {
  from: string;
  role?: string;
  text: string;
};

export type PlacementDoc = {
  /** The placed candidate. */
  name: string;
  /** Headshot under /public, e.g. "/placements/priya-s.jpg". Optional. */
  photo?: string;
  /** Programme they completed — should match a course title. */
  program: string;
  /** Role they were hired into. */
  role: string;
  /** Hiring company. */
  company: string;
  /** Optional CTC, e.g. "₹18 LPA". Publish only with explicit permission. */
  package?: string;
  /** Month/year of the offer, e.g. "August 2026". */
  placedOn?: string;
  /** The congratulations line written by FutureMinds. */
  congratsText: string;
  /** The candidate's own words about the programme. Optional. */
  quote?: string;
  /** Appreciation from mentors, peers or the employer. */
  appreciations?: Appreciation[];
  /** Nothing renders publicly until this is true. */
  approved: boolean;
  /** Pinned to the top of the placements wall. */
  featured: boolean;
  /** The candidate agreed we may publish their name, photo and details. */
  consent: boolean;
  createdAt: Date;
};

/** Serialisable shape handed to the page. */
export type PublicPlacement = {
  id: string;
  name: string;
  photo?: string;
  program: string;
  role: string;
  company: string;
  package?: string;
  placedOn?: string;
  congratsText: string;
  quote?: string;
  appreciations: Appreciation[];
};

/**
 * Approved placement stories, featured first then newest.
 *
 * Never throws — an unreachable database yields an empty list so the page
 * still renders, just without the success wall.
 */
export async function getApprovedPlacements(
  limit = 24,
): Promise<PublicPlacement[]> {
  if (!isDbConfigured) return [];

  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    const docs = await col
      .find({ approved: true })
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .toArray();

    return docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      photo: d.photo,
      program: d.program,
      role: d.role,
      company: d.company,
      package: d.package,
      placedOn: d.placedOn,
      congratsText: d.congratsText,
      quote: d.quote,
      appreciations: d.appreciations ?? [],
    }));
  } catch (err) {
    console.error("[placements] read failed, rendering without stories", err);
    return [];
  }
}

/** Count of approved placements — used for the summary strip. */
export async function countApprovedPlacements(): Promise<number> {
  if (!isDbConfigured) return 0;
  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    return await col.countDocuments({ approved: true });
  } catch {
    return 0;
  }
}

/**
 * Sample stories used ONLY to preview the design while the real wall is
 * still empty. The placements page renders these when NODE_ENV is not
 * "production" and no approved records exist, behind a loud banner.
 *
 * A production build never reaches this array, so invented graduates can
 * never appear on the live site.
 */
export const previewPlacements: PublicPlacement[] = [
  {
    id: "preview-1",
    name: "Ananya Rao",
    program: "Data Science & AI Engineer",
    role: "AI Engineer",
    company: "Zenlytic Labs",
    package: "₹24 LPA",
    placedOn: "August 2026",
    congratsText:
      "Congratulations Ananya! From a support analyst role to shipping a production retrieval system in twenty weeks — thoroughly earned.",
    quote:
      "The capstone defence was harder than either of my real interviews. By the time I sat in front of the panel at Zenlytic I had already answered every one of those questions.",
    appreciations: [
      {
        from: "Nagendra G",
        role: "Data Scientist Architect",
        text: "Ananya rewrote her evaluation harness three times until it actually caught regressions. That instinct is what got her hired.",
      },
      {
        from: "Rahul M",
        role: "Cohort peer",
        text: "Answered everyone's questions in the group at midnight and still shipped her own module on time.",
      },
    ],
  },
  {
    id: "preview-2",
    name: "Vikram Shetty",
    program: "Forward Deployed Engineer (FDE)",
    role: "Forward Deployed Engineer",
    company: "Northwind AI",
    package: "₹31 LPA",
    placedOn: "July 2026",
    congratsText:
      "Congratulations Vikram on joining Northwind AI as a Forward Deployed Engineer — the first from our FDE cohort into a customer-facing AI role.",
    quote:
      "I came in as a backend engineer who avoided customer calls. The discovery-call simulations were uncomfortable, and they are the reason I got the offer.",
    appreciations: [
      {
        from: "Naresh G",
        role: "Full Stack AI Architect",
        text: "Debugged a deliberately broken deployment under time pressure and wrote the cleanest incident report I have read from a learner.",
      },
    ],
  },
  {
    id: "preview-3",
    name: "Priya Krishnan",
    program: "Full Stack Development with AI",
    role: "Full Stack Engineer",
    company: "Corvid Systems",
    package: "₹14 LPA",
    placedOn: "August 2026",
    congratsText:
      "Congratulations Priya! A career switch from mechanical engineering to shipping a full SaaS product with an AI assistant built in.",
    quote:
      "Six months ago I had never written a line of JavaScript. The portfolio project is what the interviewer spent the entire second round on.",
    appreciations: [
      {
        from: "Thanuja P",
        role: "QA Architect",
        text: "The only learner in the cohort who wrote tests before being asked to. Her capstone shipped with genuine end-to-end coverage.",
      },
      {
        from: "Satish Jagatha",
        role: "Data Engineer & DevOps Engineer",
        text: "Set up her own CI pipeline over a weekend because she wanted deploys to stop being scary.",
      },
    ],
  },
];
