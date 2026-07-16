import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Campos obrigatórios não preenchidos" },
      { status: 400 }
    );
  }

  // In production, save to database
  // await prisma.contactMessage.create({ data: { name, email, subject, message } });

  return NextResponse.json(
    { message: "Mensagem enviada com sucesso!" },
    { status: 201 }
  );
}
