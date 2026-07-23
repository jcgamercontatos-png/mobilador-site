import { NextRequest, NextResponse } from "next/server";
import { getSiteControl, type AdPlacement } from "@/lib/site-control";

export const dynamic = "force-dynamic";

const placements = new Set<AdPlacement>([
  "HOME_TOP",
  "HOME_PRODUCTS",
  "STORE_TOP",
]);

type RouteContext = { params: { resource: string } };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const data = await getSiteControl();

  if (params.resource === "settings") {
    return NextResponse.json({ settings: data.settings });
  }

  if (params.resource === "ads") {
    const placement = request.nextUrl.searchParams.get(
      "placement",
    ) as AdPlacement | null;
    const ads = data.ads.filter(
      (item) =>
        item.active &&
        (!placement ||
          (placements.has(placement) && item.placement === placement)),
    );
    return NextResponse.json({ ads });
  }

  return NextResponse.json({ error: "Rota não encontrada." }, { status: 404 });
}
