import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");
    const active = searchParams.get("active") !== "false";
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const where: any = { active };
    
    if (category && category !== "Todos") {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (featured === "true") {
      where.featured = true;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-low") orderBy = { price: "asc" };
    else if (sort === "price-high") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "stock-low") orderBy = { stock: "asc" };

    const take = limit ? parseInt(limit) : undefined;
    const skip = page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take,
        skip,
        include: {
          _count: {
            select: { reviews: true, orderItems: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ 
      products, 
      total,
      page: page ? parseInt(page) : 1,
      totalPages: take ? Math.ceil(total / take) : 1,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
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
    } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 });
    }

    if (stock !== undefined && (isNaN(parseInt(stock)) || parseInt(stock) < 0)) {
      return NextResponse.json({ error: "Estoque deve ser um número inteiro >= 0" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category,
        subcategory,
        images: images || [],
        badge,
        stock: parseInt(stock) || 0,
        featured: featured || false,
      },
    });

    if (stock && parseInt(stock) > 0) {
      const session = await getServerSession(authOptions);
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          quantityChanged: parseInt(stock),
          previousStock: 0,
          newStock: parseInt(stock),
          type: "ADD",
          reason: "Cadastro inicial do produto",
          userId: (session?.user as any)?.id,
        },
      });
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}