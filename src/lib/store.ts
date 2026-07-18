import { put, get, del } from "@vercel/blob";
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

const BLOB_PATH = "mobilador-licenses.json";

async function readAll(): Promise<LicenseData[]> {
  try {
    const blob = await get(BLOB_PATH);
    if (!blob) return [];
    const text = await blob.text();
    return JSON.parse(text);
  } catch { return []; }
}

async function writeAll(data: LicenseData[]) {
  await put(BLOB_PATH, JSON.stringify(data), { access: "private", addRandomSuffix: false });
}

async function nextId(all: LicenseData[]): Promise<number> {
  if (all.length === 0) return 1;
  return Math.max(...all.map((l) => l.id)) + 1;
}

export async function getAllLicenses(): Promise<LicenseData[]> {
  const all = await readAll();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findByUsername(username: string): Promise<LicenseData | undefined> {
  const all = await readAll();
  return all.find((l) => l.username === username);
}

export async function findById(id: number): Promise<LicenseData | undefined> {
  const all = await readAll();
  return all.find((l) => l.id === id);
}

export async function createLicense(data: { username: string; password: string; displayName?: string; licenseType?: string; licenseDays?: number }): Promise<LicenseData> {
  const all = await readAll();
  const hashed = await bcrypt.hash(data.password, 10);
  const license: LicenseData = {
    id: await nextId(all),
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
  await writeAll(all);
  return { ...license, password: data.password };
}

export async function deleteLicense(id: number): Promise<boolean> {
  const all = (await readAll()).filter((l) => l.id !== id);
  await writeAll(all);
  return true;
}

export async function updateLicense(id: number, updates: Partial<LicenseData>): Promise<LicenseData | undefined> {
  const all = await readAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...updates };
  await writeAll(all);
  return all[idx];
}
