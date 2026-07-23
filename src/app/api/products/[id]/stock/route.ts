import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  adjustStoredProductStock,
  getProductStore,
  getStoredProductMovements,
} from "@/lib/product-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = { params: { id: string } };

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const quantity = Number.parseInt(String(body.quantity), 10);
    const { type, reason, orderId } = body;

    if (!quantity || quantity <= 0) {
      return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
    }
    if (!["ADD", "REMOVE", "SET"].includes(type)) {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const data = await getProductStore();
    const product = data.products.find((item) => item.id === params.id);
    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    let newStock = product.stock;
    if (type === "SET") newStock = quantity;
    else if (type === "ADD") newStock = product.stock + quantity;
    else {
      if (product.stock < quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente. Disponível: ${product.stock}` },
          { status: 400 },
        );
      }
      newStock = product.stock - quantity;
    }

    const updatedProduct = await adjustStoredProductStock(
      params.id,
      newStock,
      String(reason || "Ajuste manual"),
      orderId ? String(orderId) : null,
    );
    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error adjusting stock:", error);
    return NextResponse.json({ error: "Erro ao ajustar estoque" }, { status: 500 });
  }
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const movements = await getStoredProductMovements(params.id);
    return NextResponse.json({ movements });
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    return NextResponse.json(
      { error: "Erro ao buscar movimentações" },
      { status: 500 },
    );
  }
}
