import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "M0b1l4d0rS3cr3tK3y!2024";
const EXPECTED_PACKAGE = "com.mobilador.sensitivity";
const EXPECTED_SIGNATURE = "c33cfce2ec1104a39f3485124418b67e37d4d83b3f543738c1daf240c6e6771b";

export async function POST(req: NextRequest) {
  try {
    const { token, signature_hash, package_name, device_id } = await req.json();
    const decoded = jwt.verify(token, SECRET) as any;

    const response: any = {
      allowed: false,
      integrity_ok: false,
      license_ok: false,
      device_ok: false,
      message: "Erro de seguranca. Esta versao nao e autorizada.",
    };

    if (!decoded) return NextResponse.json(response);

    response.license_ok = true;

    if (package_name !== EXPECTED_PACKAGE) return NextResponse.json(response);
    if (signature_hash !== EXPECTED_SIGNATURE) return NextResponse.json(response);

    response.integrity_ok = true;
    response.device_ok = true;
    response.allowed = true;
    response.message = "";
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      allowed: false, integrity_ok: false, license_ok: false, device_ok: false,
      message: "Erro de seguranca. Esta versao nao e autorizada.",
    });
  }
}
