import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Email inválido" },
      { status: 400 }
    );
  }

  // In production, save to database
  // await prisma.newsletterSubscription.create({ data: { email } });

  return NextResponse.json(
    { message: "Inscrito com sucesso!" },
    { status: 201 }
  );
}
