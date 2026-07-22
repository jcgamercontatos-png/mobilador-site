import { NextRequest, NextResponse } from "next/server";
import { put, get } from "@vercel/blob";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const BLOB_PATH = "mobilador-visits.json";

type VisitState = {
  total: number;
  visitors: Record<string, number>;
};

function hashClient(ip: string, ua: string): string {
  return crypto.createHash("sha256").update(`${ip}::${ua}`).digest("hex");
}

function clientIdFrom(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";
  const ua = req.headers.get("user-agent") || "unknown";
  return hashClient(ip, ua);
}

async function readState(): Promise<VisitState> {
  try {
    const result = await get(BLOB_PATH, { access: "public" });
    if (!result) return { total: 0, visitors: {} };
    const downloadUrl = result.url || (result as any).blob?.downloadUrl;
    if (!downloadUrl) return { total: 0, visitors: {} };
    const res = await fetch(downloadUrl, { cache: "no-store" });
    if (!res.ok) return { total: 0, visitors: {} };
    const text = await res.text();
    const parsed = JSON.parse(text) as VisitState;
    if (typeof parsed.total !== "number") parsed.total = 0;
    if (!parsed.visitors || typeof parsed.visitors !== "object") parsed.visitors = {};
    return parsed;
  } catch {
    return { total: 0, visitors: {} };
  }
}

async function writeState(state: VisitState): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(state), {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });
}

export async function GET() {
  const state = await readState();
  return NextResponse.json({ total: state.total }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const clientId = clientIdFrom(req);
    const now = Date.now();
    const state = await readState();

    const lastSeen = state.visitors[clientId] ?? 0;
    const sixHours = 6 * 60 * 60 * 1000;
    const counted = now - lastSeen >= sixHours;

    if (counted) {
      state.visitors[clientId] = now;
      state.total += 1;
      await writeState(state);
    }

    return NextResponse.json(
      { total: state.total, counted },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { total: 0, counted: false, error: String(error) },
      { status: 200 }
    );
  }
}
