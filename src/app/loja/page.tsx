"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Star,
  Grid3X3,
  List,
} from "lucide-react";

const categories = [
  "Todos",
  "Periféricos",
  "Teclados",
  "Mouse",
  "Mouse Pads",
  "Acessórios",
  "Adaptadores",
];

const products = [
  {
    id: "1",
    name: "Mouse Gamer Pro X1",
    category: "Mouse",
    price: 149.9,
    originalPrice: 199.9,
    rating: 4.8,
    reviews: 342,
    badge: "-25%",
    description: "Mouse gamer com sensor óptico de 8000 DPI, 6 botões programáveis e RGB.",
    image: "",
  },
  {
    id: "2",
    name: "Teclado Mecânico RGB K7",
    category: "Teclados",
    price: 249.9,
    originalPrice: 349.9,
    rating: 4.9,
    reviews: 521,
    badge: "Mais Vendido",
    description: "Teclado mecânico com switches blue, iluminação RGB e layout compacto.",
  },
  {
    id: "3",
    name: "Mouse Pad XL Gamer 900x400",
    category: "Mouse Pads",
    price: 79.9,
    rating: 4.7,
    reviews: 189,
    description: "Mouse pad XL com superfície controlada e base antiderrapante.",
  },
  {
    id: "4",
    name: "Hub USB-C 7 em 1",
    category: "Adaptadores",
    price: 89.9,
    rating: 4.6,
    reviews: 98,
    badge: "Novo",
    description: "Hub USB-C com 3 USB-A, HDMI, PD 100W, SD e Micro SD.",
  },
  {
    id: "5",
    name: "Mouse Gamer Wireless G305",
    category: "Mouse",
    price: 199.9,
    originalPrice: 249.9,
    rating: 4.8,
    reviews: 256,
    description: "Mouse wireless com sensor HERO 25K e 250 horas de bateria.",
  },
  {
    id: "6",
    name: "Teclado Redragon Kumara",
    category: "Teclados",
    price: 179.9,
    rating: 4.7,
    reviews: 412,
    description: "Teclado mecânico TKL com switches Brown e build quality premium.",
  },
  {
    id: "7",
    name: "Suporte Celular Universal",
    category: "Acessórios",
    price: 49.9,
    rating: 4.5,
    reviews: 167,
    description: "Suporte ajustável para celular com clamp seguro e rotação 360°.",
  },
  {
    id: "8",
    name: "Cabos USB-C Premium 2m",
    category: "Acessórios",
    price: 39.9,
    rating: 4.6,
    reviews: 89,
    description: "Cabos reforçados com nylon e transferência de dados rápida.",
  },
  {
    id: "9",
    name: "Webcam EMEET PIXY 2K AI Tracking",
    category: "Periféricos",
    price: 349.9,
    originalPrice: 799.9,
    rating: 4.9,
    reviews: 156,
    badge: "-56%",
    description: "Webcam 2K com sensor Sony, controle por gestos, AI tracking, autofocus e PTZ com tripé integrado. 1080P 60fps para streaming.",
    image: "/images/webcam-emeet.png",
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products
    .filter(
      (p) =>
        (selectedCategory === "Todos" || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const buyProduct = (product: typeof products[0]) => {
    const msg = encodeURIComponent(
      `Olá! Vim pelo site Mobilador. Quero comprar: ${product.name} - R$ ${product.price.toFixed(2)}`
    );
    window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient mb-4">
            LOJA GAMER
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Periféricos gamer selecionados para a melhor experiência de
            mobilador. Qualidade garantida!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="glass-card p-6 sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>

              <h3 className="font-orbitron text-sm font-semibold mb-4 text-gray-300">
                CATEGORIAS
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="font-orbitron text-sm font-semibold mb-4 text-gray-300">
                  ORDENAR POR
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">
                {filteredProducts.length} produtos encontrados
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/5521973199886?text=Ol%C3%A1%2C%20vim%20pelo%20site%20Mobilador!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon text-xs py-2 px-4 inline-flex items-center gap-2"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={
                    viewMode === "grid"
                      ? "glass-card overflow-hidden group"
                      : "glass-card p-4 flex gap-4 items-center"
                  }
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative aspect-square bg-dark-700 p-6 flex items-center justify-center">
                        {product.badge && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neon-blue text-dark-900 text-xs font-bold z-10">
                            {product.badge}
                          </div>
                        )}
                        {product.image ? (
                          <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain" unoptimized />
                        ) : (
                          <ShoppingBag className="w-16 h-16 text-neon-blue/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <button
                            onClick={() => buyProduct(product)}
                            className="btn-neon text-xs py-2 px-6"
                          >
                            Comprar Agora
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-neon-blue uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                        <h3 className="font-rajdhani font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-orbitron font-bold text-xl text-gradient">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-500 text-sm line-through">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 rounded-xl bg-dark-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} width={96} height={96} className="object-contain" unoptimized />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-neon-blue/30" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-neon-blue uppercase tracking-wider mb-1">
                              {product.category}
                            </p>
                            <h3 className="font-rajdhani font-bold text-lg">
                              {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-orbitron font-bold text-xl text-gradient">
                              R$ {product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="block text-gray-500 text-sm line-through">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                          <button
                            onClick={() => buyProduct(product)}
                            className="btn-neon text-xs py-2 px-4"
                          >
                            Comprar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
