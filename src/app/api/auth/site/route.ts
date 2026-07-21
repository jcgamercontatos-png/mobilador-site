import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "jcgamer_site_secret_2024";

export async function POST(req: NextRequest) {
  try {
    const { action, name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório." }, { status: 400 });
    }

    if (action === "register" && !name) {
      return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
    }

    const token = jwt.sign(
      { id: email, email, name: name || email.split("@")[0] },
      SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json({
      success: true,
      user: { id: email, name: name || email.split("@")[0], email },
    });

    response.cookies.set("jcgamer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
