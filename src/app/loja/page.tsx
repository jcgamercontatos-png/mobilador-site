"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Star,
  X,
  Truck,
  ShieldCheck,
  Headphones,
  PackageCheck,
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
    name: "Webcam EMEET PIXY 2K AI Tracking",
    category: "Periféricos",
    price: 349.9,
    originalPrice: 799.9,
    rating: 4.9,
    reviews: 156,
    badge: "-56%",
    shortDesc: "Webcam 2K com AI tracking e controle por gestos.",
    description: "Webcam EMEET PIXY 2K com sensor Sony, controle por gestos, AI tracking inteligente, autofocus automático e PTZ com tripé integrado. Resolução 1080P 60fps para streaming profissional.",
    specs: [
      "Resolução: 2K / 1080P 60fps",
      "Sensor: Sony CMOS",
      "Campo de visão: 73°",
      "AI Tracking com controle por gestos",
      "Conexão: USB-A / USB-C",
      "Microfone integrado omnidirecional",
      "Compatível com PC, Notebook e Console",
    ],
    image: "/images/webcam-emeet.png",
  },
  {
    id: "2",
    name: "Headset Gamer Fifine H9 Surround 7.1",
    category: "Periféricos",
    price: 119.9,
    rating: 4.7,
    reviews: 230,
    badge: "Novo",
    shortDesc: "Surround 7.1 com cancelamento de ruído.",
    description: "Headset Gamer Fifine H9 com som surround 7.1 por USB, cancelamento de ruído passivo, microfone omnidirecional com sensibilidade de -40±3dB e almofadas over-ear confortáveis para longas sessões. Formato ergonômico e compatível com PC e console.",
    specs: [
      "Som: Surround 7.1 Virtual",
      "Driver: 50mm",
      "Resposta de frequência: 20Hz - 20KHz",
      "Sensibilidade: 95±3dB",
      "Microfone: Omnidirecional -40±3dB",
      "Conexão: USB 5V / 3.5mm",
      "Compatível com PC e Console",
      "Almofadas: Over-ear com espuma viscoelástica",
    ],
    image: "/images/headset-fifine-h9.jpg",
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

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
      `Olá! Vim pelo site JC Gamer FPS. Quero comprar: ${product.name} - R$ ${product.price.toFixed(2)}`
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
                      <div
                        className="relative aspect-square bg-dark-700 p-6 flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
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
                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                            className="btn-neon text-xs py-2 px-6"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <p className="text-xs text-neon-blue uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                        <h3 className="font-rajdhani font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                          {product.shortDesc}
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
                      <div
                        className="w-24 h-24 rounded-xl bg-dark-700 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.image ? (
                          <Image src={product.image} alt={product.name} width={96} height={96} className="object-contain" unoptimized />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-neon-blue/30" />
                        )}
                      </div>
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-neon-blue uppercase tracking-wider mb-1">
                              {product.category}
                            </p>
                            <h3 className="font-rajdhani font-bold text-lg">
                              {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {product.shortDesc}
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

      {/* Modal de Detalhes do Produto */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <p className="text-xs text-neon-blue uppercase tracking-wider mb-1">
                    {selectedProduct.category}
                  </p>
                  <h2 className="font-orbitron font-bold text-2xl text-white">
                    {selectedProduct.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagem */}
                <div className="bg-dark-700 p-8 flex items-center justify-center relative min-h-[300px]">
                  {selectedProduct.badge && (
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-neon-blue text-dark-900 text-sm font-bold">
                      {selectedProduct.badge}
                    </div>
                  )}
                  {selectedProduct.image ? (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      width={300}
                      height={300}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <ShoppingBag className="w-24 h-24 text-neon-blue/20" />
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col">
                  {/* Avaliação */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {selectedProduct.rating} ({selectedProduct.reviews} avaliações)
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-orbitron font-bold text-3xl text-gradient">
                      R$ {selectedProduct.price.toFixed(2)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-gray-500 text-lg line-through">
                        R$ {selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Especificações */}
                  <div className="mb-6">
                    <h4 className="font-orbitron text-xs font-semibold mb-3 text-gray-300 uppercase tracking-wider">
                      Especificações
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-neon-blue mt-0.5">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vantagens */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Truck className="w-4 h-4 text-neon-blue" />
                      Entrega rápida
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-neon-blue" />
                      Garantia inclusa
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Headphones className="w-4 h-4 text-neon-blue" />
                      Suporte via WhatsApp
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <PackageCheck className="w-4 h-4 text-neon-blue" />
                      Pagamento seguro
                    </div>
                  </div>

                  {/* Botão Comprar */}
                  <button
                    onClick={() => buyProduct(selectedProduct)}
                    className="btn-neon w-full py-3 text-base flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Comprar via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
