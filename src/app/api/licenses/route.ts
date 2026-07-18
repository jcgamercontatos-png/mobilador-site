import { NextRequest, NextResponse } from "next/server";
import { getAllLicenses, createLicense, deleteLicense, findByUsername } from "@/lib/store";

function checkAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const pass = process.env.ADMIN_SECRET || "admin123";
  return auth === `Bearer ${pass}`;
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  return NextResponse.json(await getAllLicenses());
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const { username, password, displayName, licenseType, licenseDays } = await req.json();
    if (!username || !password) return NextResponse.json({ error: "Username e senha obrigatórios" }, { status: 400 });
    if (await findByUsername(username)) return NextResponse.json({ error: "Username já existe" }, { status: 400 });
    const lic = await createLicense({ username, password, displayName, licenseType, licenseDays });
    return NextResponse.json(lic, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  await deleteLicense(id);
  return NextResponse.json({ ok: true });
}
