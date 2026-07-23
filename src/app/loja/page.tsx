"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { ManagedAd } from "@/components/ManagedAd";

const API = "/api/products?limit=100";

type Product = {
  id: number | string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  short_desc?: string;
  description?: string;
  specs?: string[];
  image?: string;
  is_active?: boolean;
  stock?: number;
  condition?: "NEW" | "USED";
  unit?: string;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(API)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products;
        setProducts(Array.isArray(list) ? list.filter((item) => item?.is_active !== false) : []);
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProduct]);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    const visible = products.filter(
      (product) =>
        (category === "Todos" || product.category === category) &&
        (!normalizedQuery || product.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery)),
    );

    return [...visible].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    });
  }, [category, products, query, sortBy]);

  const addProduct = (product: Product) => {
    const available = typeof product.stock === "number" ? product.stock : 99;
    if (available <= 0) return;
    addToCart(
      {
        id: String(product.id),
        productId: String(product.id),
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        image: product.image,
        category: product.category,
        stock: available,
      },
      1,
    );
    setSelectedProduct(null);
  };

  return (
    <div className="site-page">
      <div className="page-shell">
        <section className="panel p-5 sm:p-6">
          <span className="eyebrow">Periféricos</span>
          <h1 className="route-title mt-3">
            Loja <span className="text-[#ff2530]">JCGAMER</span>
          </h1>
          <p className="body-copy mt-3 max-w-2xl">
            Encontre periféricos para seu setup, filtre rapidamente e compre com estoque visível.
          </p>
        </section>

        <ManagedAd placement="STORE_TOP" />

        <section className="mt-4 grid items-start gap-3 lg:grid-cols-[225px_minmax(0,1fr)]">
          <aside className="compact-panel p-3.5 lg:sticky lg:top-20">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#77777d]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar produto"
                className="input-dark pl-9 text-sm"
                aria-label="Buscar produto"
              />
            </div>

            <div className="mt-3">
              <p className="font-['Oxanium'] text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ff6a72]">
                Categorias
              </p>
              <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 lg:grid lg:overflow-visible">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-lg border px-3 py-2 text-left text-sm font-bold transition-colors ${
                      category === item
                        ? "border-[#ff2530]/[0.45] bg-[#ff2530]/[0.12] text-white"
                        : "border-white/[0.07] bg-white/[0.02] text-[#9f9fa5] hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-3 block">
              <span className="font-['Oxanium'] text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ff6a72]">
                Ordenar por
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="input-dark mt-2 text-sm"
              >
                <option value="featured">Destaques</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </label>
          </aside>

          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm text-[#9d9da2]">
                {loading ? "Carregando produtos..." : `${filteredProducts.length} produto(s) encontrado(s)`}
              </p>
              <a
                href="https://wa.me/5521973199886?text=Ol%C3%A1!%20Vim%20pelo%20site%20JCGAMER%20e%20quero%20comprar%20um%20perif%C3%A9rico"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm font-bold text-[#d0d0d3] hover:text-white sm:block"
              >
                Falar no WhatsApp
              </a>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="compact-panel overflow-hidden">
                    <div className="skeleton aspect-[4/3]" />
                    <div className="space-y-2 p-3.5">
                      <div className="skeleton h-3 w-1/3 rounded" />
                      <div className="skeleton h-5 w-4/5 rounded" />
                      <div className="skeleton h-9 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : loadError ? (
              <div className="compact-panel px-4 py-10 text-center">
                <ShoppingBag className="mx-auto h-6 w-6 text-[#ff5962]" />
                <h2 className="mt-3 font-bold text-white">Não foi possível carregar a loja</h2>
                <p className="mt-1 text-sm text-[#99999f]">Tente novamente em alguns instantes.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="compact-panel px-4 py-10 text-center">
                <Search className="mx-auto h-6 w-6 text-[#ff5962]" />
                <h2 className="mt-3 font-bold text-white">Nenhum produto encontrado</h2>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("Todos");
                    setQuery("");
                  }}
                  className="secondary-button mt-3"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const soldOut = product.stock === 0;
                  return (
                    <article key={product.id} className="product-card">
                      <button
                        type="button"
                        className="product-media w-full cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        {product.badge && <span className="product-badge">{product.badge}</span>}
                        <span className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white">
                          {product.condition === "USED" ? "Usado" : "Novo"}
                        </span>
                        {typeof product.stock === "number" && (
                          <span className="absolute bottom-2 right-2 rounded-full bg-black/80 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#d4ff62]">
                            {soldOut
                              ? "Esgotado"
                              : `${product.stock} ${product.unit || "unidade"}`}
                          </span>
                        )}
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={280}
                            height={210}
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        ) : (
                          <ShoppingBag className="h-8 w-8 text-[#ff5962]/40" />
                        )}
                      </button>

                      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#ff6870]">
                          {product.category}
                        </p>
                        <h2 className="mt-1 line-clamp-2 text-base font-bold leading-tight text-white sm:text-lg">
                          {product.name}
                        </h2>
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-[#838389]">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating || 0}</span>
                          <span>({product.reviews || 0})</span>
                        </div>
                        <p className="mt-2 hidden line-clamp-2 text-sm leading-relaxed text-[#96969c] sm:block">
                          {product.short_desc || product.description || "Periférico gamer selecionado pela JCGAMER."}
                        </p>
                        <div className="mt-auto pt-3">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <strong className="text-base font-extrabold text-white sm:text-lg">
                              {formatPrice(product.price)}
                            </strong>
                            {!!product.original_price && (
                              <span className="text-[11px] text-[#74747a] line-through">
                                {formatPrice(product.original_price)}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                            <button
                              type="button"
                              onClick={() => setSelectedProduct(product)}
                              className="secondary-button min-h-9 px-2.5"
                            >
                              Detalhes
                            </button>
                            <button
                              type="button"
                              onClick={() => addProduct(product)}
                              disabled={soldOut}
                              className="primary-button min-h-9 px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar detalhes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-[55] cursor-default bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-dialog-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="fixed inset-x-2.5 bottom-2.5 z-[56] max-h-[calc(100vh-1.25rem)] overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#0d0d0f] p-4 shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(760px,calc(100%-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-5"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"
                aria-label="Fechar detalhes"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-xl bg-[#151517] p-4">
                  {selectedProduct.image ? (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      width={360}
                      height={300}
                      className="max-h-72 w-full object-contain"
                      unoptimized
                    />
                  ) : (
                    <ShoppingBag className="h-10 w-10 text-[#ff5962]/40" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="eyebrow w-fit">{selectedProduct.category}</span>
                  <h2 id="product-dialog-title" className="mt-3 text-2xl font-extrabold leading-tight text-white">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#a4a4a9]">
                    {selectedProduct.description || selectedProduct.short_desc || "Periférico gamer selecionado pela JCGAMER."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-extrabold uppercase">
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1.5 text-[#d1d1d5]">
                      {selectedProduct.condition === "USED" ? "Produto usado" : "Produto novo"}
                    </span>
                    {typeof selectedProduct.stock === "number" && (
                      <span className="rounded-full bg-[#d4ff62]/10 px-2.5 py-1.5 text-[#d4ff62]">
                        {selectedProduct.stock} {selectedProduct.unit || "unidade"} disponível
                      </span>
                    )}
                  </div>
                  {!!selectedProduct.specs?.length && (
                    <ul className="mt-3 grid gap-1.5 text-sm text-[#b7b7bc] sm:grid-cols-2">
                      {selectedProduct.specs.slice(0, 6).map((spec) => (
                        <li key={spec} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff2530]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                    <strong className="font-['Oxanium'] text-xl font-extrabold text-white">
                      {formatPrice(selectedProduct.price)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => addProduct(selectedProduct)}
                      disabled={selectedProduct.stock === 0}
                      className="primary-button max-w-full px-4 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
