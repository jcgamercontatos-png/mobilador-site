import { NextRequest, NextResponse } from "next/server";

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mobilador-site.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const { title, price, quantity, description } = await req.json();

    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Token do Mercado Pago não configurado" },
        { status: 500 }
      );
    }

    const preference = {
      items: [
        {
          id: "apk-jcgamerfps",
          title: title || "APK JCGAMERFPS",
          quantity: quantity || 1,
          unit_price: price || 49.9,
          currency_id: "BRL",
        },
      ],
      payment_methods: {
        installments: 1,
        excluded_payment_types: [],
      },
      back_urls: {
        success: `${SITE_URL}/apk/sucesso`,
        failure: `${SITE_URL}/apk/erro`,
        pending: `${SITE_URL}/apk/pendente`,
      },
      auto_return: "approved",
      notification_url: `${SITE_URL}/api/webhook-mp`,
      external_reference: `apk-${Date.now()}`,
      description: description || "APK exclusivo JCGAMERFPS com configurações profissionais.",
    };

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(preference),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Mercado Pago:", data);
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({
      init_point: data.init_point,
      id: data.id,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar pagamento" },
      { status: 500 }
    );
  }
}
