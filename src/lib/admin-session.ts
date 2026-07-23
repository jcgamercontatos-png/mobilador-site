import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdminCredentials } from "@/lib/site-control";

export const ADMIN_COOKIE = "jcgamer_admin_session";
export const ADMIN_SESSION_MAX_AGE = 8 * 60 * 60;

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.JWT_SECRET ||
    ""
  );
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update("jcgamer-admin-v1").digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export async function isValidAdminCredentials(username: string, password: string) {
  if (!username || !password) return false;
  const credentials = await getAdminCredentials();
  return (
    safeEqual(username.trim().toLowerCase(), credentials.username) &&
    (await bcrypt.compare(password, credentials.passwordHash))
  );
}

export function isAdminAuthenticated() {
  const current = cookies().get(ADMIN_COOKIE)?.value || "";
  const expected = createAdminSessionToken();
  return Boolean(current && expected && safeEqual(current, expected));
}
