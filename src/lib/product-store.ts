import { get, put } from "@vercel/blob";
import { encodeProductBadge } from "@/lib/product-meta";

export type StoredProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  subcategory: string | null;
  images: string[];
  badge: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  quantidadeAnterior: number;
  quantidadeAlterada: number;
  quantidadeFinal: number;
  motivo: string;
  pedidoId: string | null;
  usuarioAdminId: string | null;
  createdAt: string;
  user: null;
  order: null;
};

type ProductStoreData = {
  products: StoredProduct[];
  movements: StockMovement[];
  seedVersion: number;
};

const BLOB_PATH = "jcgamer-products.json";
const CURRENT_SEED_VERSION = 1;
const EMPTY_STORE: ProductStoreData = {
  products: [],
  movements: [],
  seedVersion: 0,
};

const DEFAULT_PRODUCTS: StoredProduct[] = [
  {
    id: "jcgamer-headset-fifine-h9",
    name: "Headset Gamer FIFINE H9",
    slug: "headset-gamer-fifine-h9",
    description: "Áudio limpo e conforto para jogar por horas.",
    price: 299.9,
    originalPrice: null,
    category: "Periféricos",
    subcategory: "Headset",
    images: ["/images/headset-fifine-h9.jpg"],
    badge: encodeProductBadge("Destaque", "NEW", "unidade"),
    stock: 10,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 48,
    createdAt: "2026-07-18T12:00:00.000Z",
    updatedAt: "2026-07-18T12:00:00.000Z",
  },
  {
    id: "jcgamer-webcam-emeet",
    name: "Webcam EMEET",
    slug: "webcam-emeet",
    description: "Imagem nítida para conteúdo, live e chamadas.",
    price: 249.9,
    originalPrice: null,
    category: "Periféricos",
    subcategory: "Webcam",
    images: ["/images/webcam-emeet.png"],
    badge: encodeProductBadge("Setup", "NEW", "unidade"),
    stock: 10,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 31,
    createdAt: "2026-07-18T11:00:00.000Z",
    updatedAt: "2026-07-18T11:00:00.000Z",
  },
  {
    id: "jcgamer-pack-de-setas",
    name: "Pack de Setas JCGAMER",
    slug: "pack-de-setas-jcgamer",
    description: "Conteúdo para Free Fire pronto para completar sua configuração.",
    price: 19.9,
    originalPrice: null,
    category: "Free Fire",
    subcategory: "Download",
    images: ["/images/download_pack_setas_800x800.png"],
    badge: encodeProductBadge("Digital", "NEW", "unidade"),
    stock: 999,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 76,
    createdAt: "2026-07-18T10:00:00.000Z",
    updatedAt: "2026-07-18T10:00:00.000Z",
  },
];

function normalizeStore(value: Partial<ProductStoreData> | null): ProductStoreData {
  return {
    products: Array.isArray(value?.products) ? value.products : [],
    movements: Array.isArray(value?.movements) ? value.movements : [],
    seedVersion:
      typeof value?.seedVersion === "number" ? value.seedVersion : 0,
  };
}

async function saveProductStore(data: ProductStoreData) {
  const normalized = normalizeStore(data);
  await put(BLOB_PATH, JSON.stringify(normalized), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return normalized;
}

async function addInitialProducts(data: ProductStoreData) {
  if (data.seedVersion >= CURRENT_SEED_VERSION) return data;

  const existingSlugs = new Set(data.products.map((product) => product.slug));
  const missingProducts = DEFAULT_PRODUCTS.filter(
    (product) => !existingSlugs.has(product.slug),
  );

  const seeded = {
    ...data,
    products: [...data.products, ...missingProducts],
    seedVersion: CURRENT_SEED_VERSION,
  };
  await saveProductStore(seeded);
  return seeded;
}

export async function getProductStore(): Promise<ProductStoreData> {
  let data = structuredClone(EMPTY_STORE);

  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (result?.statusCode === 200 && result.stream) {
      data = normalizeStore(await new Response(result.stream).json());
    }
  } catch (error) {
    console.warn("Não foi possível ler o catálogo salvo:", error);
  }

  return addInitialProducts(data);
}

export async function createStoredProduct(
  input: Omit<StoredProduct, "id" | "createdAt" | "updatedAt">,
) {
  const data = await getProductStore();
  const now = new Date().toISOString();
  const product: StoredProduct = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  data.products.unshift(product);
  if (product.stock > 0) {
    data.movements.unshift({
      id: crypto.randomUUID(),
      productId: product.id,
      quantidadeAnterior: 0,
      quantidadeAlterada: product.stock,
      quantidadeFinal: product.stock,
      motivo: "Cadastro inicial do produto",
      pedidoId: null,
      usuarioAdminId: null,
      createdAt: now,
      user: null,
      order: null,
    });
  }

  await saveProductStore(data);
  return product;
}

export async function updateStoredProduct(
  id: string,
  updates: Partial<Omit<StoredProduct, "id" | "createdAt">>,
) {
  const data = await getProductStore();
  const index = data.products.findIndex((product) => product.id === id);
  if (index < 0) return null;

  data.products[index] = {
    ...data.products[index],
    ...updates,
    id,
    createdAt: data.products[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  await saveProductStore(data);
  return data.products[index];
}

export async function deleteStoredProduct(id: string) {
  const data = await getProductStore();
  const exists = data.products.some((product) => product.id === id);
  if (!exists) return false;

  data.products = data.products.filter((product) => product.id !== id);
  data.movements = data.movements.filter(
    (movement) => movement.productId !== id,
  );
  await saveProductStore(data);
  return true;
}

export async function adjustStoredProductStock(
  id: string,
  newStock: number,
  reason: string,
  orderId?: string | null,
) {
  const data = await getProductStore();
  const index = data.products.findIndex((product) => product.id === id);
  if (index < 0) return null;

  const previousStock = data.products[index].stock;
  const now = new Date().toISOString();
  data.products[index] = {
    ...data.products[index],
    stock: newStock,
    updatedAt: now,
  };
  data.movements.unshift({
    id: crypto.randomUUID(),
    productId: id,
    quantidadeAnterior: previousStock,
    quantidadeAlterada: newStock - previousStock,
    quantidadeFinal: newStock,
    motivo: reason || "Ajuste manual",
    pedidoId: orderId || null,
    usuarioAdminId: null,
    createdAt: now,
    user: null,
    order: null,
  });

  await saveProductStore(data);
  return data.products[index];
}

export async function getStoredProductMovements(productId: string) {
  const data = await getProductStore();
  return data.movements
    .filter((movement) => movement.productId === productId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}
