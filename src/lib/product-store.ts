import { get, put } from "@vercel/blob";

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
};

const BLOB_PATH = "jcgamer-products.json";
const EMPTY_STORE: ProductStoreData = { products: [], movements: [] };

function normalizeStore(value: Partial<ProductStoreData> | null): ProductStoreData {
  return {
    products: Array.isArray(value?.products) ? value.products : [],
    movements: Array.isArray(value?.movements) ? value.movements : [],
  };
}

export async function getProductStore(): Promise<ProductStoreData> {
  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return structuredClone(EMPTY_STORE);
    }

    return normalizeStore(await new Response(result.stream).json());
  } catch {
    return structuredClone(EMPTY_STORE);
  }
}

async function saveProductStore(data: ProductStoreData) {
  const normalized = normalizeStore(data);
  await put(BLOB_PATH, JSON.stringify(normalized), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return normalized;
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
  data.movements = data.movements.filter((movement) => movement.productId !== id);
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
