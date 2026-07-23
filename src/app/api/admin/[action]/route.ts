import { put } from "@vercel/blob";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  isAdminAuthenticated,
  isValidAdminCredentials,
} from "@/lib/admin-session";
import {
  deleteAdvertisement,
  getAdminCredentials,
  getSiteControl,
  updateAdminCredentials,
  updateSiteSettings,
  upsertAdvertisement,
} from "@/lib/site-control";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = { params: { action: string } };

function unauthorized() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  if (params.action === "session") {
    return NextResponse.json({ authenticated: isAdminAuthenticated() });
  }
  if (params.action === "control") {
    if (!isAdminAuthenticated()) return unauthorized();
    const data = await getSiteControl();
    return NextResponse.json({
      settings: data.settings,
      ads: data.ads,
      productMeta: data.productMeta,
      admin: {
        username: data.admin.username,
        updatedAt: data.admin.updatedAt,
      },
    });
  }
  return NextResponse.json({ error: "Rota não encontrada." }, { status: 404 });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  if (params.action === "session") {
    const { username, password } = await request.json();
    if (
      !(await isValidAdminCredentials(
        String(username || ""),
        String(password || ""),
      ))
    ) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos." },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken();
    if (!token) {
      return NextResponse.json(
        { error: "Configure ADMIN_SESSION_SECRET ou NEXTAUTH_SECRET." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ADMIN_SESSION_MAX_AGE,
      path: "/",
    });
    return response;
  }

  if (!isAdminAuthenticated()) return unauthorized();

  if (params.action === "control") {
    const body = await request.json();
    if (body.action !== "upsertAd" || !body.advertisement) {
      return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
    }
    const advertisement = await upsertAdvertisement(body.advertisement);
    return NextResponse.json({ advertisement });
  }

  if (params.action === "upload") {
    const formData = await request.formData();
    const file = formData.get("file");
    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ]);

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Selecione uma imagem." }, { status: 400 });
    }
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Use uma imagem JPG, PNG, WEBP ou GIF." },
        { status: 400 },
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "A imagem deve ter no máximo 5 MB." },
        { status: 400 },
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`site-images/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  }

  return NextResponse.json({ error: "Rota não encontrada." }, { status: 404 });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthenticated()) return unauthorized();

  if (params.action === "control") {
    const body = await request.json();
    const data = await updateSiteSettings(body.settings || {});
    return NextResponse.json({ settings: data.settings });
  }

  if (params.action === "credentials") {
    const { currentPassword, newUsername, newPassword } = await request.json();
    const current = await getAdminCredentials();
    if (
      !(await isValidAdminCredentials(
        current.username,
        String(currentPassword || ""),
      ))
    ) {
      return NextResponse.json(
        { error: "A senha atual está incorreta." },
        { status: 400 },
      );
    }

    const username = String(newUsername || "").trim().toLowerCase();
    const password = String(newPassword || "");
    if (username.length < 3) {
      return NextResponse.json(
        { error: "O usuário deve ter pelo menos 3 caracteres." },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres." },
        { status: 400 },
      );
    }

    const updated = await updateAdminCredentials(
      username,
      await bcrypt.hash(password, 12),
    );
    return NextResponse.json({
      username: updated.username,
      updatedAt: updated.updatedAt,
    });
  }

  return NextResponse.json({ error: "Rota não encontrada." }, { status: 404 });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (params.action === "session") {
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(ADMIN_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  if (!isAdminAuthenticated()) return unauthorized();
  if (params.action === "control") {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Anúncio não informado." },
        { status: 400 },
      );
    }
    await deleteAdvertisement(id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Rota não encontrada." }, { status: 404 });
}
