import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { COLLECTIONS, getCollection, isDbConfigured } from "@/lib/mongodb";
import type { ReviewDoc } from "@/lib/reviews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function unauthorised() {
  return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
}

/** Constant-time-ish check of the admin bearer token. */
function isAdmin(request: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || expected === "change-me-to-a-long-random-string") return false;

  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (supplied.length !== expected.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  }
  return diff === 0;
}

function dbUnavailable() {
  return NextResponse.json(
    { ok: false, error: "Feedback is temporarily unavailable. Please try later." },
    { status: 503 },
  );
}

/**
 * POST — submit a review. Always stored unapproved; nothing reaches the
 * public site until someone approves it.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot.
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const quote = str(body.quote);
  const program = str(body.program);
  const rating = Number(body.rating);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 422 },
    );
  }
  if (quote.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Please write at least a sentence or two." },
      { status: 422 },
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { ok: false, error: "Please choose a rating from 1 to 5." },
      { status: 422 },
    );
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "We need your permission to publish this." },
      { status: 422 },
    );
  }

  if (!isDbConfigured) return dbUnavailable();

  const doc: ReviewDoc = {
    name: name.slice(0, 120),
    role: str(body.role).slice(0, 160) || undefined,
    program: program.slice(0, 160) || "Not specified",
    rating,
    quote: quote.slice(0, 1200),
    approved: false,
    featured: false,
    consent: true,
    createdAt: new Date(),
  };

  try {
    const col = await getCollection<ReviewDoc>(COLLECTIONS.reviews);
    await col.insertOne(doc);
  } catch (err) {
    console.error("[reviews] write failed", err, doc);
    return dbUnavailable();
  }

  return NextResponse.json({ ok: true });
}

/** GET — list reviews for moderation. Requires the admin token. */
export async function GET(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  const { searchParams } = new URL(request.url);
  const filter =
    searchParams.get("status") === "approved"
      ? { approved: true }
      : searchParams.get("status") === "pending"
        ? { approved: false }
        : {};

  try {
    const col = await getCollection<ReviewDoc>(COLLECTIONS.reviews);
    const docs = await col.find(filter).sort({ createdAt: -1 }).limit(200).toArray();
    return NextResponse.json({
      ok: true,
      count: docs.length,
      reviews: docs.map((d) => ({ ...d, _id: String(d._id) })),
    });
  } catch (err) {
    console.error("[reviews] list failed", err);
    return dbUnavailable();
  }
}

/** PATCH — approve, unapprove or feature a review. Requires the admin token. */
export async function PATCH(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const id = str(body.id);
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 422 });
  }

  const update: Partial<Pick<ReviewDoc, "approved" | "featured">> = {};
  if (typeof body.approved === "boolean") update.approved = body.approved;
  if (typeof body.featured === "boolean") update.featured = body.featured;

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nothing to update. Send `approved` and/or `featured`." },
      { status: 422 },
    );
  }

  try {
    const col = await getCollection<ReviewDoc>(COLLECTIONS.reviews);
    const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (res.matchedCount === 0) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
  } catch (err) {
    console.error("[reviews] update failed", err);
    return dbUnavailable();
  }

  return NextResponse.json({ ok: true });
}

/** DELETE — remove a review permanently. Requires the admin token. */
export async function DELETE(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 422 });
  }

  try {
    const col = await getCollection<ReviewDoc>(COLLECTIONS.reviews);
    const res = await col.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
  } catch (err) {
    console.error("[reviews] delete failed", err);
    return dbUnavailable();
  }

  return NextResponse.json({ ok: true });
}
