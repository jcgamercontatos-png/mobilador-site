import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook Mercado Pago recebido:", body);

    if (body.type === "payment") {
      const paymentId = body.data?.id;
      if (paymentId) {
        console.log(`Pagamento ${paymentId} processado com sucesso`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ received: true });
  }
}
