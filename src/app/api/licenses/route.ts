import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "M0b1l4d0rS3cr3tK3y!2024";

function checkAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const pass = process.env.ADMIN_SECRET || "admin123";
  return auth === `Bearer ${pass}`;
}

function getTokenUser(token: string) {
  try { return jwt.verify(token, SECRET) as { id: string; username: string }; }
  catch { return null; }
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const licenses = await prisma.license.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(licenses);
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const body = await req.json();
    const { username, password, displayName, licenseType, licenseDays } = body;
    if (!username || !password) return NextResponse.json({ error: "Username e senha obrigatórios" }, { status: 400 });
    if (await prisma.license.findUnique({ where: { username } })) return NextResponse.json({ error: "Username já existe" }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const lic = await prisma.license.create({
      data: {
        username,
        password: hashed,
        displayName: displayName || username,
        licenseType: licenseType || "permanent",
        licenseDays: licenseType === "temporary" ? (licenseDays || 30) : 0,
        licenseStart: licenseType === "temporary" ? new Date() : null,
      },
    });
    return NextResponse.json({ id: lic.id, username: lic.username, password, displayName: lic.displayName, licenseType: lic.licenseType, licenseDays: lic.licenseDays }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  await prisma.license.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
