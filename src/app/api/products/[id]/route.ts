import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import {
  getSiteControl,
  removeProductMeta,
} from "@/lib/site-control";
import {
  decodeProductBadge,
  encodeProductBadge,
  normalizeProductCondition,
} from "@/lib/product-meta";

export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { reviews: true, orderItems: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    const control = await getSiteControl();
    const storedBadge = decodeProductBadge(product.badge);
    const metadata = storedBadge.metadata || control.productMeta[product.id] || {
      condition: "NEW",
      unit: "unidade",
    };

    return NextResponse.json({
      product: {
        ...product,
        badge: storedBadge.badge,
        ...metadata,
        image: product.images[0] || "",
        original_price: product.originalPrice,
        short_desc: product.description,
        reviews: product.reviewCount,
        is_active: product.active,
      },
    });
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
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: price !== undefined ? Number.parseFloat(String(price)) : undefined,
        originalPrice:
          originalPrice === null || originalPrice === ""
            ? null
            : originalPrice !== undefined
              ? Number.parseFloat(String(originalPrice))
              : undefined,
        category,
        subcategory: subcategory || null,
        images,
        badge: encodeProductBadge(
          badge,
          normalizedCondition,
          normalizedUnit,
        ),
        stock: stock !== undefined ? Number.parseInt(String(stock), 10) : undefined,
        featured,
        active,
      },
    });

    return NextResponse.json({
      product: {
        ...product,
        badge: String(badge || "").trim() || null,
        condition: normalizedCondition,
        unit: normalizedUnit,
      },
    });
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

    await prisma.product.delete({ where: { id: params.id } });
    try {
      await removeProductMeta(params.id);
    } catch (metadataError) {
      console.warn("Product deleted; legacy metadata cleanup failed:", metadataError);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}
