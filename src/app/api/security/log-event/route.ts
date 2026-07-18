import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { event_type, device_id, details } = await req.json();
    console.log(`[SECURITY] ${event_type} | device: ${device_id} | ${details || ""}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
