# FutureMinds AI Academy — website

Marketing and admissions site for **FutureMinds AI Academy & Careers Pvt. Ltd**,
Marathahalli, Bengaluru. Built with Next.js 16 (App Router), React 19,
TypeScript and Tailwind CSS v4.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

---

## ⚠️ Before you go live

There are a few placeholders you must replace. All of them live in one file:
**`src/lib/site.ts`**.

| Field | Current value | Action |
| --- | --- | --- |
| `phone` / `phoneHref` / `whatsapp` | `+91 96066 36714` | ✅ Set. Change here if the number ever changes — it feeds the header, footer, contact page, every course page and the schema.org markup. |
| `email` | `info@futuremindsaiacademy.com` | Confirm this mailbox exists on your domain. |
| `social.*` | Guessed profile URLs | Replace with your real LinkedIn / YouTube / Instagram / X URLs, or delete the entries you do not have. |
| `geo` | Approximate Marathahalli coordinates | Optional: set exact lat/long from Google Maps for better local SEO. |

Everything else — address, legal name, domain, opening hours — is already set
from the details you provided.

### Things this site deliberately does not claim

There are no student testimonials, no "500+ students placed" counters and no
logo wall of hiring partners, because inventing those on a live business site
would be dishonest and is a real legal risk under advertising rules. The
homepage statistics are computed from the actual published curriculum, so they
are true by construction. Add real testimonials and partner logos once you have
them, with permission.

Salary figures are labelled throughout as *indicative market ranges, not
guarantees*, and the FAQ explicitly says placement is not guaranteed. Keep that
framing.

---

## Editing content

### Courses

All programme content lives in **`src/lib/courses.ts`** as a typed array. To add
a programme, append an object to `courses` — TypeScript will tell you if you
miss a field. Everything else updates automatically:

- the homepage grid and footer links
- `/programs` listing and comparison table
- its own page at `/programs/<slug>`
- its Open Graph share card
- `sitemap.xml`
- the programme dropdown in every enquiry form
- the homepage statistics

Pick an `accent` from `cyan | violet | emerald | sky | amber | rose`; the colour
threads through the card, page headings and share image.

### Institute-wide details and navigation

`src/lib/site.ts` — contact details, address, social links, and the `nav` array
that drives the header and footer.

### Design tokens

`src/app/globals.css` — colours, fonts and the reusable `.card`, `.aurora`,
`.grid-lines`, `.eyebrow` and `.text-gradient` classes.

---

## Database (MongoDB Atlas)

Two collections in the `futureminds` database, created automatically on first
write:

| Collection | Holds |
| --- | --- |
| `enquiries` | Contact-form submissions. Fields: name, email, phone, program, experience, message, `status` (`new`/`contacted`/`enrolled`/`closed`), createdAt. |
| `reviews` | Feedback from students and mentors. Fields: name, role, program, rating, quote, photo, `approved`, `featured`, `consent`, createdAt. |
| `placements` | Success stories. Fields: name, photo, program, role, company, package, placedOn, congratsText, quote, appreciations[], `approved`, `featured`, `consent`, createdAt. |

Connection settings live in `.env.local` (gitignored). Set the same variables
in your host's dashboard for production — see `.env.example`.

The client is cached on `globalThis` (`src/lib/mongodb.ts`) so serverless
invocations reuse one connection pool instead of exhausting Atlas's limit.

### If you see `querySrv ECONNREFUSED`

Some networks refuse DNS SRV lookups, which breaks `mongodb+srv://` strings.
`.env.local` ships with the equivalent **non-SRV** connection string for that
reason. The SRV version is included commented out — swap it in if you prefer.

---

## Enquiry form

Posts to `POST /api/enquiry`, which validates the input, blocks bots with a
honeypot, and writes to the `enquiries` collection.

Read your leads in the MongoDB Atlas UI: **Browse Collections -> futureminds ->
enquiries**. Update the `status` field there as you work through them.

Optionally set `LEAD_WEBHOOK_URL` to *also* push each enquiry as JSON to Slack,
Zapier, Make or a CRM for instant notification. The database write happens
first, so a webhook failure never loses a lead.

---

## Reviews and testimonials

Anyone can submit feedback at `/feedback`. **Nothing appears on the site until
you approve it.** Submissions are stored with `approved: false`, and the
consent checkbox is mandatory — the API rejects a submission without it.

Approved reviews appear on the homepage and on `/feedback`. Both pages use ISR
(`revalidate = 300`), so a newly approved review shows up within five minutes
without a redeploy. If no reviews are approved, the section is omitted
entirely rather than rendering an empty shell.

### Approving a review — the simple way

In MongoDB Atlas: **Browse Collections -> reviews**, find the document, and
edit `approved` to `true`. Set `featured: true` to pin it first. No code, no
deploy.

### Approving via the API

The moderation endpoints need the `ADMIN_TOKEN` from your environment:

```bash
# List everything awaiting approval
curl "https://futuremindsaiacademy.com/api/reviews?status=pending"   -H "Authorization: Bearer $ADMIN_TOKEN"

# Approve one (and pin it)
curl -X PATCH https://futuremindsaiacademy.com/api/reviews   -H "Authorization: Bearer $ADMIN_TOKEN"   -H "Content-Type: application/json"   -d '{"id":"<document _id>","approved":true,"featured":true}'

# Remove one permanently
curl -X DELETE "https://futuremindsaiacademy.com/api/reviews?id=<_id>"   -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Placements wall

`/placements` is the single home for social proof. It renders, in order:

1. **Success stories** from the `placements` collection — photo, the offer
   (role, company, optional package), a congratulations line, the candidate's
   own words, and appreciation notes from mentors, peers or the employer.
2. **Reviews** from the `reviews` collection.

Neither appears anywhere else on the site. The homepage stays static and fast;
`/feedback` is purely the submission form and links here.

Both sections are hidden until something is approved, and while both are empty
the page shows an honest "our first cohorts are in progress" panel instead of
an empty shell.

### Seeing the design before you have graduates

While no approved placement exists, `npm run dev` renders three **sample**
stories behind a loud amber "Design preview — sample data" banner, so you can
judge the layout.

This is gated on `NODE_ENV !== "production"`. A production build strips the
sample array entirely — it does not appear in the HTML or in the JavaScript
bundle — so invented graduates can never reach the live site. In production
with an empty wall, visitors see an honest "our first cohorts are in progress"
panel instead.

Add one real approved record and the samples vanish everywhere.

### Adding a success story

Placement records are **admin-only** — they contain a real person's name,
photo and employer, so there is no public submission route. The API refuses
any record without `consent: true`.

```bash
curl -X POST https://futuremindsaiacademy.com/api/placements   -H "Authorization: Bearer $ADMIN_TOKEN"   -H "Content-Type: application/json"   -d '{
    "name": "Priya S",
    "photo": "/placements/priya-s.jpg",
    "program": "Data Science & AI Engineer",
    "role": "AI Engineer",
    "company": "Acme",
    "package": "₹22 LPA",
    "placedOn": "August 2026",
    "congratsText": "Congratulations to Priya on joining Acme as an AI Engineer.",
    "quote": "The capstone was what got me through the final round.",
    "appreciations": [
      { "from": "Naresh G", "role": "Full Stack AI Architect",
        "text": "Shipped working code every single module." }
    ],
    "approved": true,
    "featured": true,
    "consent": true
  }'
```

`GET`, `PATCH` and `DELETE` on `/api/placements` work the same way as the
reviews endpoints (list with `?status=pending`, approve/feature with `PATCH`,
remove with `DELETE ?id=`). You can equally create and edit these documents by
hand in the Atlas UI.

### Before you publish someone

Get explicit permission for their name, photo, employer and — especially — any
salary figure. `consent` exists to record that you have it. Remove a story
immediately if the person later asks you to.

---

## Mentors and photos

Faculty are listed in **`src/lib/mentors.ts`** and shown at `/mentors`.

`years`, `bio`, `photo` and `linkedin` are all optional and simply do not
render when absent — so add them as they are confirmed rather than filling
them with guesses.

To add a headshot, drop a square image into `public/mentors/` and set
`photo: "/mentors/naresh-g.jpg"`. Candidate photos go in `public/placements/`
and are referenced from the placement document's `photo` field. Until then the site shows a gradient
monogram of the person's initials. That is deliberate: a stand-in face is
never generated for a real named person. The same `photo` field works on a
review document.

---

## Deploying

The site is a standard Next.js app with one dynamic route (the enquiry API), so
it needs a Node runtime — not plain static hosting.

**Vercel** is the path of least resistance:

1. Push this folder to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected automatically, no build configuration needed.
3. Add `LEAD_WEBHOOK_URL` under Settings → Environment Variables.
4. Add `futuremindsaiacademy.com` under Settings → Domains and point your
   registrar's nameservers or A/CNAME records as Vercel instructs.

Netlify, Render, Railway or any Node host works too (`npm run build`, then
`npm start`).

If you ever want a purely static export, remove `src/app/api/enquiry/` and set
`output: "export"` in `next.config.ts`, then point the form at a third-party
form service instead.

---

## SEO built in

- Per-page titles, descriptions and canonical URLs
- `sitemap.xml` and `robots.txt` generated from the course data
- schema.org `ItemList` of `Person` entries on the mentors page
- schema.org JSON-LD: `EducationalOrganization` + `LocalBusiness` sitewide,
  `Course` on each programme page, `FAQPage` on the homepage
- Generated Open Graph share cards — a site-wide one plus a distinct card per
  programme
- Semantic headings, one `<h1>` per page, skip-to-content link, keyboard-
  accessible nav and accordions, and `prefers-reduced-motion` support

### After launch

1. Verify the domain in [Google Search Console](https://search.google.com/search-console)
   and submit `https://futuremindsaiacademy.com/sitemap.xml`.
2. Create a **Google Business Profile** for the Marathahalli address — for
   "AI training institute in Bangalore" style searches this matters more than
   anything on the site itself.
3. Keep the name, address and phone number identical across the site, Google
   Business Profile and every directory listing.
