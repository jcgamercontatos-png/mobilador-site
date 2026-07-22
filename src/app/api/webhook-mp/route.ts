import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook Mercado Pago recebido:", body);

    if (body.type === "payment") {
      const paymentId = body.data?.id;
      if (paymentId) {
        console.log(`Pagamento ${paymentId} processado`);

        const payment = await fetchPaymentFromMercadoPago(paymentId);
        
        if (payment && payment.status === "approved") {
          const externalReference = payment.external_reference;
          
          if (externalReference) {
            await handlePaymentApproved(externalReference, paymentId);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ received: true });
  }
}

async function fetchPaymentFromMercadoPago(paymentId: string) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar pagamento:", error);
    return null;
  }
}

async function handlePaymentApproved(externalReference: string, paymentId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { paymentId },
      include: { items: { include: { product: true, sku: true } } },
    });

    if (!order) {
      console.log(`Pedido não encontrado para paymentId: ${paymentId}`);
      return;
    }

    if (order.stockDeducted) {
      console.log(`Estoque já foi descontado para o pedido ${order.id}`);
      return;
    }

    await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        let product;
        let sku;
        let stockToUpdate;

        if (item.skuId) {
          sku = await tx.productSKU.findUnique({
            where: { id: item.skuId },
          });
          if (!sku) {
            throw new Error(`SKU ${item.skuId} não encontrado`);
          }
          if (sku.stock < item.quantity) {
            throw new Error(
              `Estoque insuficiente para ${sku.name}. Disponível: ${sku.stock}, Solicitado: ${item.quantity}`
            );
          }
          stockToUpdate = sku.stock;
        } else {
          product = await tx.product.findUnique({
            where: { id: item.productId },
          });
          if (!product) {
            throw new Error(`Produto ${item.productId} não encontrado`);
          }
          if (product.stock < item.quantity) {
            throw new Error(
              `Estoque insuficiente para ${product.name}. Disponível: ${product.stock}, Solicitado: ${item.quantity}`
            );
          }
          stockToUpdate = product.stock;
        }

        const newStock = stockToUpdate - item.quantity;
        const itemName = sku ? sku.name : product?.name || item.productId;

        if (item.skuId) {
          await tx.productSKU.update({
            where: { id: item.skuId },
            data: { stock: newStock },
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: newStock },
          });
        }

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            quantidadeAnterior: stockToUpdate,
            quantidadeAlterada: -item.quantity,
            quantidadeFinal: newStock,
            motivo: `Venda - Pedido ${order.id}`,
            pedidoId: order.id,
            usuarioAdminId: order.userId,
          },
        });
      }

      await tx.order.update({
        where: { id: order.id },
        data: { stockDeducted: true, status: "PAID" },
      });
    });

    console.log(`Estoque descontado com sucesso para pedido ${order.id}`);
  } catch (error) {
    console.error("Erro ao descontar estoque:", error);
    throw error;
  }
}