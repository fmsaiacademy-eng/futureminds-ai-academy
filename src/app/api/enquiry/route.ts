import { NextResponse } from "next/server";
import { COLLECTIONS, getCollection, isDbConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export type EnquiryDoc = {
  name: string;
  email: string;
  phone: string;
  program: string;
  experience: string;
  message: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  createdAt: Date;
};

/**
 * Receives enquiries from the lead form and stores them in MongoDB.
 *
 * If LEAD_WEBHOOK_URL is also set, the enquiry is forwarded there as well
 * (Slack, Zapier, a Google Sheet) — useful for instant notification. A
 * webhook failure never loses the lead, because the database write has
 * already succeeded by then.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (str(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 422 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 422 },
    );
  }

  const enquiry: EnquiryDoc = {
    name: name.slice(0, 120),
    email: email.slice(0, 200),
    phone: phone.slice(0, 30),
    program: str(body.program).slice(0, 160) || "Not specified",
    experience: str(body.experience).slice(0, 60) || "Not specified",
    message: str(body.message).slice(0, 2000),
    status: "new",
    createdAt: new Date(),
  };

  if (!isDbConfigured) {
    console.error("[enquiry] MONGODB_URI is not set — enquiry NOT saved:", enquiry);
    return NextResponse.json(
      {
        ok: false,
        error: "We could not submit that right now. Please call or WhatsApp us.",
      },
      { status: 503 },
    );
  }

  try {
    const col = await getCollection<EnquiryDoc>(COLLECTIONS.enquiries);
    await col.insertOne(enquiry);
  } catch (err) {
    // Logged in full so a lead is recoverable from server logs even if the
    // database is unreachable.
    console.error("[enquiry] database write failed", err, enquiry);
    return NextResponse.json(
      {
        ok: false,
        error: "We could not submit that right now. Please call or WhatsApp us.",
      },
      { status: 503 },
    );
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
    } catch (err) {
      // Non-fatal: the enquiry is already stored.
      console.error("[enquiry] webhook notification failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
