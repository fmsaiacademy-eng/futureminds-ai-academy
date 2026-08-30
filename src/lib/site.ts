/**
 * Single source of truth for institute-wide details.
 * Update contact info here and it propagates across every page,
 * the footer, the schema.org markup and the sitemap.
 */

export const site = {
  legalName: "FutureMinds AI Academy & Careers Pvt. Ltd",
  name: "FutureMinds AI Academy",
  shortName: "FutureMinds",
  tagline: "Bengaluru's career school for applied AI",
  description:
    "Industry-built training in Forward Deployed Engineering, Data Science & AI Engineering, Generative & Agentic AI, and Full Stack with AI. Live cohorts in Marathahalli, Bengaluru, with hands-on projects and placement support.",
  url: "https://futuremindsaiacademy.com",

  phone: "+91 96066 36714",
  phoneHref: "+919606636714",
  whatsapp: "919606636714",
  email: "info@futuremindsaiacademy.com",

  address: {
    line1: "3rd Floor, #111, CKB Layout",
    line2: "Marathahalli",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560037",
    country: "IN",
    countryName: "India",
  },

  geo: { latitude: 12.9569, longitude: 77.7011 },

  hours: "Mon–Sat, 9:00 AM – 8:00 PM IST",

  social: {
    linkedin: "https://www.linkedin.com/company/futureminds-ai-academy",
    youtube: "https://www.youtube.com/@futuremindsaiacademy",
    instagram: "https://www.instagram.com/futuremindsaiacademy",
    x: "https://x.com/futuremindsai",
  },
} as const;

export const addressOneLine = [
  site.address.line1,
  site.address.line2,
  `${site.address.city} ${site.address.postalCode}`,
].join(", ");

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.legalName}, ${addressOneLine}, ${site.address.state}`,
)}`;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi FutureMinds, I'd like to know more about your AI programs.",
)}`;

export const nav = [
  { label: "Programs", href: "/programs" },
  { label: "Mentors", href: "/mentors" },
  { label: "Placements", href: "/placements" },
  { label: "Corporate", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
