import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { decodeProductBadge, encodeProductBadge, normalizeProductCondition } from "@/lib/product-meta";
import {
  deleteStoredProduct,
  getProductStore,
  StoredProduct,
  updateStoredProduct,
} from "@/lib/product-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = { params: { id: string } };

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

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const data = await getProductStore();
    const product = data.products.find((item) => item.id === params.id);
    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ product: productResponse(product) });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
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
    const normalizedCondition = normalizeProductCondition(condition);
    const normalizedUnit = String(unit || "unidade").trim() || "unidade";

    const updates: Partial<StoredProduct> = {};
    if (name !== undefined) updates.name = String(name);
    if (description !== undefined) updates.description = String(description);
    if (price !== undefined) {
      const parsedPrice = Number.parseFloat(String(price));
      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
      }
      updates.price = parsedPrice;
    }
    if (originalPrice !== undefined) {
      if (originalPrice === null || originalPrice === "") {
        updates.originalPrice = null;
      } else {
        const parsedOriginalPrice = Number.parseFloat(String(originalPrice));
        if (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0) {
          return NextResponse.json({ error: "Preço anterior inválido" }, { status: 400 });
        }
        updates.originalPrice = parsedOriginalPrice;
      }
    }
    if (category !== undefined) updates.category = String(category);
    if (subcategory !== undefined) {
      updates.subcategory = subcategory ? String(subcategory) : null;
    }
    if (images !== undefined) {
      updates.images = Array.isArray(images) ? images.filter(Boolean).map(String) : [];
    }
    updates.badge = encodeProductBadge(badge, normalizedCondition, normalizedUnit);
    if (stock !== undefined) {
      const parsedStock = Number.parseInt(String(stock), 10);
      if (!Number.isInteger(parsedStock) || parsedStock < 0) {
        return NextResponse.json({ error: "Estoque inválido" }, { status: 400 });
      }
      updates.stock = parsedStock;
    }
    if (featured !== undefined) updates.featured = Boolean(featured);
    if (active !== undefined) updates.active = Boolean(active);

    const product = await updateStoredProduct(params.id, updates);
    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ product: productResponse(product) });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const deleted = await deleteStoredProduct(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}
