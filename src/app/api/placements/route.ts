import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection, isDbConfigured } from "@/lib/mongodb";
import {
  PLACEMENTS_COLLECTION,
  type Appreciation,
  type PlacementDoc,
} from "@/lib/placements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function unauthorised() {
  return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
}

function dbUnavailable() {
  return NextResponse.json(
    { ok: false, error: "Database unavailable." },
    { status: 503 },
  );
}

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

function parseAppreciations(v: unknown): Appreciation[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((a) => {
      const item = a as Record<string, unknown>;
      return {
        from: str(item.from).slice(0, 120),
        role: str(item.role).slice(0, 160) || undefined,
        text: str(item.text).slice(0, 800),
      };
    })
    .filter((a) => a.from && a.text)
    .slice(0, 8);
}

/**
 * POST — add a placement story. Admin only: these are institute records
 * containing a real person's name, photo and employer, so they are not
 * open to public submission.
 */
export async function POST(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = str(body.name);
  const role = str(body.role);
  const company = str(body.company);

  if (!name || !role || !company) {
    return NextResponse.json(
      { ok: false, error: "name, role and company are required." },
      { status: 422 },
    );
  }

  // Publishing someone's name, photo and employer requires their permission.
  if (body.consent !== true) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Set consent:true — only publish a candidate who has agreed to it.",
      },
      { status: 422 },
    );
  }

  const doc: PlacementDoc = {
    name: name.slice(0, 120),
    photo: str(body.photo).slice(0, 300) || undefined,
    program: str(body.program).slice(0, 160) || "Not specified",
    role: role.slice(0, 160),
    company: company.slice(0, 160),
    package: str(body.package).slice(0, 40) || undefined,
    placedOn: str(body.placedOn).slice(0, 40) || undefined,
    congratsText:
      str(body.congratsText).slice(0, 600) ||
      `Congratulations to ${name} on joining ${company} as ${role}.`,
    quote: str(body.quote).slice(0, 1200) || undefined,
    appreciations: parseAppreciations(body.appreciations),
    approved: body.approved === true,
    featured: body.featured === true,
    consent: true,
    createdAt: new Date(),
  };

  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    const res = await col.insertOne(doc);
    return NextResponse.json({ ok: true, id: String(res.insertedId) });
  } catch (err) {
    console.error("[placements] insert failed", err);
    return dbUnavailable();
  }
}

/** GET — list placement records for moderation. */
export async function GET(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  const status = new URL(request.url).searchParams.get("status");
  const filter =
    status === "approved"
      ? { approved: true }
      : status === "pending"
        ? { approved: false }
        : {};

  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    const docs = await col.find(filter).sort({ createdAt: -1 }).limit(200).toArray();
    return NextResponse.json({
      ok: true,
      count: docs.length,
      placements: docs.map((d) => ({ ...d, _id: String(d._id) })),
    });
  } catch (err) {
    console.error("[placements] list failed", err);
    return dbUnavailable();
  }
}

/** PATCH — approve, feature or edit fields on a placement record. */
export async function PATCH(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const id = str(body.id);
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 422 });
  }

  const update: Partial<PlacementDoc> = {};
  if (typeof body.approved === "boolean") update.approved = body.approved;
  if (typeof body.featured === "boolean") update.featured = body.featured;
  if (typeof body.photo === "string") update.photo = str(body.photo) || undefined;
  if (typeof body.quote === "string") update.quote = str(body.quote) || undefined;
  if (typeof body.congratsText === "string") {
    update.congratsText = str(body.congratsText).slice(0, 600);
  }
  if (body.appreciations !== undefined) {
    update.appreciations = parseAppreciations(body.appreciations);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nothing to update." },
      { status: 422 },
    );
  }

  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (res.matchedCount === 0) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[placements] update failed", err);
    return dbUnavailable();
  }
}

/** DELETE — remove a placement record permanently. */
export async function DELETE(request: Request) {
  if (!isAdmin(request)) return unauthorised();
  if (!isDbConfigured) return dbUnavailable();

  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 422 });
  }

  try {
    const col = await getCollection<PlacementDoc>(PLACEMENTS_COLLECTION);
    const res = await col.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[placements] delete failed", err);
    return dbUnavailable();
  }
}
