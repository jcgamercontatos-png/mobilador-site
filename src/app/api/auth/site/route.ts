import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "jcgamer_site_secret_2024";

export async function POST(req: NextRequest) {
  try {
    const { action, name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 });
    }

    if (action === "register") {
      if (!name) {
        return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres." }, { status: 400 });
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "Este email já está cadastrado." }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: "30d" });

      const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      response.cookies.set("jcgamer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    if (action === "login") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        return NextResponse.json({ error: "Email ou senha incorretos." }, { status: 401 });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: "Email ou senha incorretos." }, { status: 401 });
      }

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: "30d" });

      const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      response.cookies.set("jcgamer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
