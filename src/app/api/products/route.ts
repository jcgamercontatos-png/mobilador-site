import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { getSiteControl } from "@/lib/site-control";
import {
  decodeProductBadge,
  encodeProductBadge,
  normalizeProductCondition,
} from "@/lib/product-meta";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");
    const includeInactive =
      searchParams.get("includeInactive") === "true" && isAdminAuthenticated();
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const where: any = includeInactive ? {} : { active: true };

    if (category && category !== "Todos") where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (featured === "true") where.featured = true;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-low") orderBy = { price: "asc" };
    else if (sort === "price-high") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "stock-low") orderBy = { stock: "asc" };

    const take = limit ? Number.parseInt(limit, 10) : undefined;
    const currentPage = page ? Math.max(1, Number.parseInt(page, 10)) : 1;
    const skip = take ? (currentPage - 1) * take : undefined;

    const [products, total, control] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take,
        skip,
        include: {
          skus: {
            where: { active: true },
            select: {
              id: true,
              sku: true,
              name: true,
              price: true,
              stock: true,
              attributes: true,
            },
          },
          _count: {
            select: { reviews: true, orderItems: true },
          },
        },
      }),
      prisma.product.count({ where }),
      getSiteControl(),
    ]);

    const enrichedProducts = products.map((product) => {
      const storedBadge = decodeProductBadge(product.badge);
      const metadata = storedBadge.metadata || control.productMeta[product.id] || {
        condition: "NEW",
        unit: "unidade",
      };
      return {
        ...product,
        badge: storedBadge.badge,
        ...metadata,
        image: product.images[0] || "",
        original_price: product.originalPrice,
        short_desc: product.description,
        reviews: product.reviewCount,
        is_active: product.active,
      };
    });

    return NextResponse.json({
      products: enrichedProducts,
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

    const parsedStock = Number.parseInt(String(stock || 0), 10);
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return NextResponse.json(
        { error: "Estoque deve ser um número inteiro igual ou maior que zero" },
        { status: 400 },
      );
    }

    const baseSlug =
      String(name)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `produto-${Date.now()}`;
    const existingSlug = await prisma.product.findUnique({ where: { slug: baseSlug } });
    const slug = existingSlug ? `${baseSlug}-${Date.now()}` : baseSlug;

    const normalizedCondition = normalizeProductCondition(condition);
    const normalizedUnit = String(unit || "unidade").trim() || "unidade";
    const product = await prisma.$transaction(async (database) => {
      const createdProduct = await database.product.create({
        data: {
          name: String(name),
          slug,
          description: String(description || ""),
          price: Number.parseFloat(String(price)),
          originalPrice:
            originalPrice === null || originalPrice === ""
              ? null
              : Number.parseFloat(String(originalPrice)),
          category: String(category),
          subcategory: subcategory ? String(subcategory) : null,
          images: Array.isArray(images) ? images.filter(Boolean) : [],
          badge: encodeProductBadge(
            badge,
            normalizedCondition,
            normalizedUnit,
          ),
          stock: parsedStock,
          featured: Boolean(featured),
          active: active !== false,
        },
      });

      if (parsedStock > 0) {
        await database.stockMovement.create({
          data: {
            productId: createdProduct.id,
            quantidadeAlterada: parsedStock,
            quantidadeAnterior: 0,
            quantidadeFinal: parsedStock,
            motivo: "Cadastro inicial do produto",
          },
        });
      }

      return createdProduct;
    });

    return NextResponse.json(
      {
        product: {
          ...product,
          badge: String(badge || "").trim() || null,
          condition: normalizedCondition,
          unit: normalizedUnit,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
