import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "M0b1l4d0rS3cr3tK3y!2024";

export async function POST(req: NextRequest) {
  try {
    const { username, password, device_id } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ detail: "Usuario ou senha invalidos" }, { status: 401 });
    }
    const user = await prisma.license.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ detail: "Usuario ou senha invalidos" }, { status: 401 });
    }
    if (!user.isValid) {
      return NextResponse.json({ detail: "Licenca expirada" }, { status: 403 });
    }
    if (device_id && user.deviceId && user.deviceId !== device_id) {
      return NextResponse.json({ detail: "Conta ja vinculada a outro dispositivo" }, { status: 403 });
    }
    if (!user.deviceId && device_id) {
      await prisma.license.update({ where: { id: user.id }, data: { deviceId: device_id } });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "30d" });
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    return NextResponse.json({
      token,
      expires_at: expiresAt,
      user_id: user.id,
      username: user.username,
      display_name: user.displayName || user.username,
      license_valid: user.isValid,
      license_until: null,
      license_type: user.licenseType,
      license_days_remaining: null,
      is_admin: user.isAdmin,
      device_locked: !!user.deviceId,
    });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message }, { status: 500 });
  }
}
