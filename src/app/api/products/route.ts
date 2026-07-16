import { NextRequest, NextResponse } from "next/server";

const products = [
  {
    id: "1",
    name: "Mouse Gamer Pro X1",
    slug: "mouse-gamer-pro-x1",
    description: "Mouse gamer com sensor óptico de 8000 DPI, 6 botões programáveis e RGB.",
    price: 149.9,
    originalPrice: 199.9,
    category: "Mouse",
    badge: "-25%",
    stock: 50,
    featured: true,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: "2",
    name: "Teclado Mecânico RGB K7",
    slug: "teclado-mecanico-rgb-k7",
    description: "Teclado mecânico com switches blue, iluminação RGB e layout compacto.",
    price: 249.9,
    originalPrice: 349.9,
    category: "Teclados",
    badge: "Mais Vendido",
    stock: 30,
    featured: true,
    rating: 4.9,
    reviewCount: 521,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  let filtered = [...products];

  if (category && category !== "Todos") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({ products: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newProduct = {
    id: String(products.length + 1),
    ...body,
    slug: body.name.toLowerCase().replace(/\s+/g, "-"),
    rating: 0,
    reviewCount: 0,
  };

  return NextResponse.json({ product: newProduct }, { status: 201 });
}
