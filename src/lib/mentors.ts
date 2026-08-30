export type Mentor = {
  id: string;
  name: string;
  role: string;
  /** Years of industry experience. Omit rather than guess. */
  years?: number;
  /** Practice areas — a restatement of the role, used for the chips. */
  focus: string[];
  /** Optional longer bio. Renders only when present. */
  bio?: string;
  /**
   * Optional headshot. Drop a square image into /public/mentors/ and set the
   * path here, e.g. "/mentors/naresh-g.jpg". Until then a monogram is shown.
   */
  photo?: string;
  /** Optional LinkedIn profile URL. Renders only when present. */
  linkedin?: string;
  /** Accent colour for the monogram and chips. */
  accent: "cyan" | "violet" | "emerald" | "sky" | "amber" | "rose";
};

/**
 * The teaching faculty.
 *
 * Only details we have been given are recorded here. `years`, `bio`, `photo`
 * and `linkedin` are optional and simply do not render when absent — so add
 * them as they are confirmed rather than filling them with guesses.
 */
export const mentors: Mentor[] = [
  {
    id: "naresh-g",
    name: "Naresh G",
    role: "Full Stack AI Architect",
    years: 14,
    focus: ["Full stack engineering", "AI architecture"],
    accent: "cyan",
  },
  {
    id: "nagendra-g",
    name: "Nagendra G",
    role: "Data Scientist Architect",
    years: 10,
    focus: ["Data science", "Machine learning architecture"],
    accent: "emerald",
  },
  {
    id: "satish-jagatha",
    name: "Satish Jagatha",
    role: "Data Engineer & DevOps Engineer",
    years: 12,
    focus: ["Data engineering", "DevOps", "Platform reliability"],
    accent: "violet",
  },
  {
    id: "thanuja-p",
    name: "Thanuja P",
    role: "QA Architect",
    years: 10,
    focus: ["Quality engineering", "Test automation"],
    accent: "amber",
  },
];

/** Initials for the monogram fallback, e.g. "Satish Jagatha" -> "SJ". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
