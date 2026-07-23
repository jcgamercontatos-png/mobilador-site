import { get, put } from "@vercel/blob";

export type ProductCondition = "NEW" | "USED";
export type AdPlacement = "HOME_TOP" | "HOME_PRODUCTS" | "STORE_TOP";

export type SiteSettings = {
  siteName: string;
  profileImage: string;
  heroTitle: string;
  heroDescription: string;
  youtubeUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
};

export type ManagedAdvertisement = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  placement: AdPlacement;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductMeta = {
  condition: ProductCondition;
  unit: string;
};

export type AdminCredentials = {
  username: string;
  passwordHash: string;
  updatedAt: string;
};

export type SiteControlData = {
  settings: SiteSettings;
  ads: ManagedAdvertisement[];
  productMeta: Record<string, ProductMeta>;
  admin: AdminCredentials;
};

const BLOB_PATH = "jcgamer-site-control.json";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "JCGAMER",
  profileImage: "",
  heroTitle: "Bem-vindo à JCGAMER",
  heroDescription:
    "Produtos digitais, periféricos e conteúdo direto para elevar seu gameplay no Free Fire.",
  youtubeUrl: "https://www.youtube.com/@Jcgamerofc",
  instagramUrl: "https://www.instagram.com/jcgamerofc/",
  whatsappUrl: "https://wa.me/5521973199886",
};

const DEFAULT_DATA: SiteControlData = {
  settings: DEFAULT_SITE_SETTINGS,
  ads: [],
  productMeta: {},
  admin: {
    username: "jcgamer",
    passwordHash:
      "$2b$12$iiXCD6PTvcqhwj6nF7nEc.8DhO01jtYAkQSe5sUcrcdAeuoeu.6XS",
    updatedAt: new Date(0).toISOString(),
  },
};

function normalizeData(value: Partial<SiteControlData> | null): SiteControlData {
  return {
    settings: {
      ...DEFAULT_SITE_SETTINGS,
      ...(value?.settings || {}),
    },
    ads: Array.isArray(value?.ads) ? value.ads : [],
    productMeta: value?.productMeta || {},
    admin: {
      ...DEFAULT_DATA.admin,
      ...(value?.admin || {}),
    },
  };
}

export async function getSiteControl(): Promise<SiteControlData> {
  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return structuredClone(DEFAULT_DATA);
    }

    return normalizeData(await new Response(result.stream).json());
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export async function saveSiteControl(data: SiteControlData) {
  const normalized = normalizeData(data);
  await put(BLOB_PATH, JSON.stringify(normalized), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return normalized;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>) {
  const data = await getSiteControl();
  data.settings = {
    ...data.settings,
    ...settings,
  };
  return saveSiteControl(data);
}

export async function upsertAdvertisement(
  advertisement: Omit<ManagedAdvertisement, "createdAt" | "updatedAt"> &
    Partial<Pick<ManagedAdvertisement, "createdAt" | "updatedAt">>,
) {
  const data = await getSiteControl();
  const now = new Date().toISOString();
  const existingIndex = data.ads.findIndex((item) => item.id === advertisement.id);
  const existing = existingIndex >= 0 ? data.ads[existingIndex] : null;
  const next: ManagedAdvertisement = {
    ...advertisement,
    createdAt: existing?.createdAt || advertisement.createdAt || now,
    updatedAt: now,
  };

  if (existingIndex >= 0) data.ads[existingIndex] = next;
  else data.ads.unshift(next);

  await saveSiteControl(data);
  return next;
}

export async function deleteAdvertisement(id: string) {
  const data = await getSiteControl();
  data.ads = data.ads.filter((item) => item.id !== id);
  await saveSiteControl(data);
}

export async function setProductMeta(productId: string, meta: ProductMeta) {
  const data = await getSiteControl();
  data.productMeta[productId] = {
    condition: meta.condition === "USED" ? "USED" : "NEW",
    unit: meta.unit.trim() || "unidade",
  };
  await saveSiteControl(data);
}

export async function removeProductMeta(productId: string) {
  const data = await getSiteControl();
  delete data.productMeta[productId];
  await saveSiteControl(data);
}

export async function getAdminCredentials() {
  const data = await getSiteControl();
  return data.admin;
}

export async function updateAdminCredentials(
  username: string,
  passwordHash: string,
) {
  const data = await getSiteControl();
  data.admin = {
    username: username.trim().toLowerCase(),
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
  await saveSiteControl(data);
  return data.admin;
}
