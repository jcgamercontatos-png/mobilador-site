import { NextRequest, NextResponse } from "next/server";

const ALLOWED_VALUES = [100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,520,540,550,560,580,600,620,640,650,660,680,700,720,740,750,760,780,800,820,840,850,860,880,900,920,940,950,960,980,1000];

function roundToAllowed(v: number): number {
  if (v <= 0) return ALLOWED_VALUES[0];
  const r = Math.round(v);
  if (ALLOWED_VALUES.includes(r)) return r;
  return ALLOWED_VALUES.reduce((a, b) => Math.abs(b - v) < Math.abs(a - v) ? b : a);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mDpi = Math.max(body.mouse_dpi, 1);
    const gDpi = Math.max(body.mobilador_dpi, 1);
    const w = Math.max(body.resolution_width, 1);
    const h = Math.max(body.resolution_height, 1);
    const size = Math.max(body.screen_size_inches, 3);
    const sDpi = Math.max(body.screen_dpi, 160);
    const fps = Math.max(body.fps_value, 1);

    const base = (mDpi * gDpi) / 1400;
    const fpsFactor = Math.pow(60 / fps, 0.25);
    const pixelFactor = Math.sqrt((w * h) / (1920 * 1080));
    const diagonalPx = Math.sqrt(w * w + h * h);
    const ppi = diagonalPx / size;
    const ppiFactor = Math.sqrt(339 / ppi);
    const densityFactor = Math.pow(sDpi / 480, 0.05);
    const sensBase = base * fpsFactor * pixelFactor * ppiFactor * densityFactor;

    const aspectRatio = Math.max(w, h) / Math.min(w, h);
    const aspectLabel = aspectRatio > 2 ? "21:9" : aspectRatio > 1.9 ? "20:9" : aspectRatio > 1.85 ? "19.5:9" : aspectRatio > 1.7 ? "18:9" : aspectRatio > 1.5 ? "16:9" : aspectRatio > 1.4 ? "16:10" : aspectRatio > 1.3 ? "4:3" : `${aspectRatio.toFixed(1)}:1`;
    const logAspect = Math.log10(aspectRatio);
    const xyRatio = Math.max(Math.min(logAspect * 0.12, 0.05), 0.015);

    let rawX: number, rawY: number;
    if (body.balanced_calibration) {
      rawX = sensBase;
      rawY = sensBase;
    } else if (aspectRatio >= 1) {
      rawX = sensBase * (1 + xyRatio);
      rawY = sensBase * (1 - xyRatio);
    } else {
      rawX = sensBase * (1 - xyRatio);
      rawY = sensBase * (1 + xyRatio);
    }

    const styleFactors: Record<string, [number, number]> = { rush: [1.15, 1.1], preciso: [0.9, 0.9], balanceado: [1, 1] };
    const [sx, sy] = styleFactors[body.play_style?.toLowerCase()] || [1, 1];
    const finalX = Math.max(100, Math.min(1000, rawX * sx));
    const finalY = Math.max(100, Math.min(1000, rawY * sy));
    const normalX = roundToAllowed(finalX);
    const normalY = roundToAllowed(finalY);
    const swX = body.use_switch_sensitivity ? roundToAllowed(normalX * 0.55) : 0;
    const swY = body.use_switch_sensitivity ? roundToAllowed(normalY * 0.70) : 0;

    const desc: string[] = [`Proporcao ${aspectLabel}`, `PPI ${Math.round(ppi)}`];
    const st = body.play_style?.toLowerCase();
    if (st === "rush") desc.push("Rush", "+15% X +10% Y");
    else if (st === "preciso") desc.push("Precisao", "-10% X -10% Y");
    else desc.push("Balanceado");
    if (body.balanced_calibration) desc.push("Calibracao balanceada ativa");

    return NextResponse.json({
      sensitivity_x: normalX,
      sensitivity_y: normalY,
      raw_x: finalX,
      raw_y: finalY,
      switch_sensitivity_x: swX,
      switch_sensitivity_y: swY,
      switch_raw_x: swX,
      switch_raw_y: swY,
      description: desc.join(" | "),
      aspect_ratio: aspectRatio,
      aspect_label: aspectLabel,
      ppi,
      debug_dpi_factor: mDpi / 1200,
      debug_gg_factor: gDpi / 300,
      debug_fps_factor: fpsFactor,
      debug_pixel_factor: pixelFactor,
      debug_ppi_factor: ppiFactor,
      debug_base_sensitivity: sensBase,
      balanced: body.balanced_calibration || false,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
