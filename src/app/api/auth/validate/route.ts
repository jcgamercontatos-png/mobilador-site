import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "M0b1l4d0rS3cr3tK3y!2024";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ valid: false }, { status: 401 });
    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET) as { id: string; username: string };
    const user = await prisma.license.findUnique({ where: { id: decoded.id } });
    if (!user) return NextResponse.json({ valid: false }, { status: 401 });
    return NextResponse.json({
      valid: true,
      user_id: user.id,
      username: user.username,
      display_name: user.displayName || user.username,
      license_valid: user.isValid,
      license_until: null,
      license_type: user.licenseType,
      license_days_remaining: null,
      is_admin: user.isAdmin,
    });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
