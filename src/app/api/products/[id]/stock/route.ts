import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { quantity, type, reason, orderId } = body;

    if (!quantity || quantity <= 0) {
      return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
    }

    if (!["ADD", "REMOVE", "SET"].includes(type)) {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    let newStock: number;
    let quantityChanged: number;

    if (type === "SET") {
      newStock = quantity;
      quantityChanged = quantity - product.stock;
    } else if (type === "ADD") {
      newStock = product.stock + quantity;
      quantityChanged = quantity;
    } else {
      if (product.stock < quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente. Disponível: ${product.stock}` },
          { status: 400 }
        );
      }
      newStock = product.stock - quantity;
      quantityChanged = -quantity;
    }

    const updatedProduct = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id },
        data: { stock: newStock },
      });

      await tx.stockMovement.create({
        data: {
          productId: id,
          previousStock: product.stock,
          newStock,
          quantityChanged,
          type: type as any,
          reason: reason || "Ajuste manual",
          orderId,
          userId: (session.user as any).id,
        },
      });

      return updated;
    });

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error adjusting stock:", error);
    return NextResponse.json({ error: "Erro ao ajustar estoque" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movements = await prisma.stockMovement.findMany({
      where: { productId: id },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        order: { select: { id: true, total: true, status: true } },
      },
    });

    return NextResponse.json({ movements });
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    return NextResponse.json({ error: "Erro ao buscar movimentações" }, { status: 500 });
  }
}