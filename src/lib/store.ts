import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type LicenseData = {
  id: number;
  username: string;
  password: string;
  displayName: string;
  licenseType: string;
  licenseDays: number;
  licenseStart: string | null;
  deviceId: string | null;
  isValid: boolean;
  isAdmin: boolean;
  createdAt: string;
};

function getStorePath(): string {
  const dir = process.env.STORE_DIR || "/tmp/mobilador-data";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "licenses.json");
}

function readAll(): LicenseData[] {
  try {
    const p = getStorePath();
    if (!fs.existsSync(p)) return [];
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch { return []; }
}

function writeAll(data: LicenseData[]) {
  fs.writeFileSync(getStorePath(), JSON.stringify(data, null, 2));
}

function nextId(all: LicenseData[]): number {
  if (all.length === 0) return 1;
  return Math.max(...all.map((l) => l.id)) + 1;
}

export function getAllLicenses(): LicenseData[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function findByUsername(username: string): LicenseData | undefined {
  return readAll().find((l) => l.username === username);
}

export function findById(id: number): LicenseData | undefined {
  return readAll().find((l) => l.id === id);
}

export async function createLicense(data: { username: string; password: string; displayName?: string; licenseType?: string; licenseDays?: number }): Promise<LicenseData> {
  const all = readAll();
  const hashed = await bcrypt.hash(data.password, 10);
  const license: LicenseData = {
    id: nextId(all),
    username: data.username,
    password: hashed,
    displayName: data.displayName || data.username,
    licenseType: data.licenseType || "permanent",
    licenseDays: data.licenseType === "temporary" ? (data.licenseDays || 30) : 0,
    licenseStart: data.licenseType === "temporary" ? new Date().toISOString() : null,
    deviceId: null,
    isValid: true,
    isAdmin: false,
    createdAt: new Date().toISOString(),
  };
  all.push(license);
  writeAll(all);
  return { ...license, password: data.password };
}

export function deleteLicense(id: number): boolean {
  const all = readAll().filter((l) => l.id !== id);
  writeAll(all);
  return true;
}

export function updateLicense(id: number, updates: Partial<LicenseData>): LicenseData | undefined {
  const all = readAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...updates };
  writeAll(all);
  return all[idx];
}
