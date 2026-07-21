import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  "/login",
  "/api",
  "/_next",
  "/favicon",
  "/images",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  if (isPublic) return NextResponse.next();

  const jcgamerToken = request.cookies.get("jcgamer_token")?.value;
  if (jcgamerToken) return NextResponse.next();

  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "jcgamer_nextauth_secret_2024",
  });
  if (nextAuthToken) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
