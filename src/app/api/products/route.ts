import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { decodeProductBadge, encodeProductBadge, normalizeProductCondition } from "@/lib/product-meta";
import { createStoredProduct, getProductStore, StoredProduct } from "@/lib/product-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function productResponse(product: StoredProduct) {
  const storedBadge = decodeProductBadge(product.badge);
  return {
    ...product,
    badge: storedBadge.badge,
    condition: storedBadge.metadata?.condition || "NEW",
    unit: storedBadge.metadata?.unit || "unidade",
    image: product.images[0] || "",
    original_price: product.originalPrice,
    short_desc: product.description,
    reviews: product.reviewCount,
    is_active: product.active,
    skus: [],
    _count: { reviews: 0, orderItems: 0 },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.trim().toLowerCase();
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");
    const includeInactive =
      searchParams.get("includeInactive") === "true" && isAdminAuthenticated();
    const limitValue = Number.parseInt(searchParams.get("limit") || "", 10);
    const take = Number.isInteger(limitValue) && limitValue > 0 ? limitValue : null;
    const currentPage = Math.max(
      1,
      Number.parseInt(searchParams.get("page") || "1", 10) || 1,
    );

    const data = await getProductStore();
    let products = data.products.filter((product) => includeInactive || product.active);

    if (category && category !== "Todos") {
      products = products.filter((product) => product.category === category);
    }
    if (search) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search),
      );
    }
    if (featured === "true") {
      products = products.filter((product) => product.featured);
    }

    products.sort((left, right) => {
      if (sort === "price-low") return left.price - right.price;
      if (sort === "price-high") return right.price - left.price;
      if (sort === "rating") return right.rating - left.rating;
      if (sort === "stock-low") return left.stock - right.stock;
      return right.createdAt.localeCompare(left.createdAt);
    });

    const total = products.length;
    if (take) {
      const start = (currentPage - 1) * take;
      products = products.slice(start, start + take);
    }

    return NextResponse.json({
      products: products.map(productResponse),
      total,
      page: currentPage,
      totalPages: take ? Math.max(1, Math.ceil(total / take)) : 1,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      images,
      badge,
      stock,
      featured,
      active,
      condition,
      unit,
    } = body;

    if (!name || price === undefined || !category) {
      return NextResponse.json(
        { error: "Nome, preço e categoria são obrigatórios" },
        { status: 400 },
      );
    }

    const parsedPrice = Number.parseFloat(String(price));
    const parsedOriginalPrice =
      originalPrice === null || originalPrice === ""
        ? null
        : Number.parseFloat(String(originalPrice));
    const parsedStock = Number.parseInt(String(stock || 0), 10);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
    }
    if (
      parsedOriginalPrice !== null &&
      (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0)
    ) {
      return NextResponse.json({ error: "Preço anterior inválido" }, { status: 400 });
    }
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return NextResponse.json(
        { error: "Estoque deve ser um número inteiro igual ou maior que zero" },
        { status: 400 },
      );
    }

    const normalizedCondition = normalizeProductCondition(condition);
    const normalizedUnit = String(unit || "unidade").trim() || "unidade";
    const baseSlug =
      String(name)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `produto-${Date.now()}`;
    const store = await getProductStore();
    const slug = store.products.some((product) => product.slug === baseSlug)
      ? `${baseSlug}-${Date.now()}`
      : baseSlug;

    const product = await createStoredProduct({
      name: String(name),
      slug,
      description: String(description || ""),
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      category: String(category),
      subcategory: subcategory ? String(subcategory) : null,
      images: Array.isArray(images) ? images.filter(Boolean).map(String) : [],
      badge: encodeProductBadge(badge, normalizedCondition, normalizedUnit),
      stock: parsedStock,
      featured: Boolean(featured),
      active: active !== false,
      rating: 0,
      reviewCount: 0,
    });

    return NextResponse.json({ product: productResponse(product) }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
