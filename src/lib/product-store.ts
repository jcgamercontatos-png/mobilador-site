import type {
  Product as DatabaseProduct,
  StockMovement as DatabaseStockMovement,
} from "@prisma/client";
import { encodeProductBadge } from "@/lib/product-meta";
import { prisma } from "@/lib/prisma";

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

const DEFAULT_PRODUCTS = [
  {
    name: "Headset Gamer FIFINE H9",
    slug: "headset-gamer-fifine-h9",
    description: "Áudio limpo e conforto para jogar por horas.",
    price: 299.9,
    originalPrice: null,
    category: "Periféricos",
    subcategory: "Headset",
    images: ["/images/headset-fifine-h9.jpg"],
    badge: "Destaque",
    stock: 10,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 48,
  },
  {
    name: "Webcam EMEET",
    slug: "webcam-emeet",
    description: "Imagem nítida para conteúdo, live e chamadas.",
    price: 249.9,
    originalPrice: null,
    category: "Periféricos",
    subcategory: "Webcam",
    images: ["/images/webcam-emeet.png"],
    badge: "Setup",
    stock: 10,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 31,
  },
  {
    name: "Pack de Setas JCGAMER",
    slug: "pack-de-setas-jcgamer",
    description: "Conteúdo para Free Fire pronto para completar sua configuração.",
    price: 19.9,
    originalPrice: null,
    category: "Free Fire",
    subcategory: "Download",
    images: ["/images/download_pack_setas_800x800.png"],
    badge: "Digital",
    stock: 999,
    featured: true,
    active: true,
    rating: 5,
    reviewCount: 76,
  },
] as const;

function serializeProduct(product: DatabaseProduct): StoredProduct {
  return {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

function serializeMovement(movement: DatabaseStockMovement): StockMovement {
  return {
    ...movement,
    createdAt: movement.createdAt.toISOString(),
    user: null,
    order: null,
  };
}

async function ensureDefaultProducts() {
  const slugs = DEFAULT_PRODUCTS.map((product) => product.slug);
  const existing = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true },
  });
  const existingSlugs = new Set(existing.map((product) => product.slug));
  const missing = DEFAULT_PRODUCTS.filter(
    (product) => !existingSlugs.has(product.slug),
  );

  if (!missing.length) return;

  await prisma.product.createMany({
    data: missing.map((product) => ({
      ...product,
      images: [...product.images],
      badge: encodeProductBadge(product.badge, "NEW", "unidade"),
    })),
    skipDuplicates: true,
  });
}

export async function getProductStore(): Promise<ProductStoreData> {
  await ensureDefaultProducts();
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return {
    products: products.map(serializeProduct),
    movements: [],
  };
}

export async function createStoredProduct(
  input: Omit<StoredProduct, "id" | "createdAt" | "updatedAt">,
) {
  const product = await prisma.product.create({
    data: {
      ...input,
      stockMovements:
        input.stock > 0
          ? {
              create: {
                quantidadeAnterior: 0,
                quantidadeAlterada: input.stock,
                quantidadeFinal: input.stock,
                motivo: "Cadastro inicial do produto",
              },
            }
          : undefined,
    },
  });
  return serializeProduct(product);
}

export async function updateStoredProduct(
  id: string,
  updates: Partial<Omit<StoredProduct, "id" | "createdAt">>,
) {
  const exists = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!exists) return null;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...updates,
      updatedAt: new Date(),
    },
  });
  return serializeProduct(product);
}

export async function deleteStoredProduct(id: string) {
  const result = await prisma.product.deleteMany({ where: { id } });
  return result.count > 0;
}

export async function adjustStoredProductStock(
  id: string,
  newStock: number,
  reason: string,
  orderId?: string | null,
) {
  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) return null;

  const product = await prisma.$transaction(async (transaction) => {
    const updated = await transaction.product.update({
      where: { id },
      data: { stock: newStock },
    });
    await transaction.stockMovement.create({
      data: {
        productId: id,
        quantidadeAnterior: current.stock,
        quantidadeAlterada: newStock - current.stock,
        quantidadeFinal: newStock,
        motivo: reason || "Ajuste manual",
        pedidoId: orderId || null,
      },
    });
    return updated;
  });

  return serializeProduct(product);
}

export async function getStoredProductMovements(productId: string) {
  const movements = await prisma.stockMovement.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
  });
  return movements.map(serializeMovement);
}
