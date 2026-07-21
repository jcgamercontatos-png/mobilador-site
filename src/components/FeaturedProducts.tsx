"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  badge?: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Webcam EMEET PIXY 2K AI Tracking",
    category: "Webcam",
    price: 349.9,
    originalPrice: 799.9,
    rating: 4.9,
    reviews: 156,
    badge: "-56%",
    image: "/images/webcam-emeet.png",
  },
  {
    id: "2",
    name: "Headset Gamer Fifine H9 Surround 7.1",
    category: "Fone",
    price: 119.9,
    rating: 4.7,
    reviews: 230,
    badge: "Novo",
    image: "/images/headset-fifine-h9.jpg",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 relative gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <ShoppingBag className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-gray-300">Loja</span>
            </div>
            <h2 className="section-title text-left">
              PRODUTOS EM DESTAQUE
            </h2>
            <p className="text-gray-400 mt-2 max-w-lg">
              Periféricos gamer selecionados para a melhor experiência de
              mobilador.
            </p>
          </div>
          <Link
            href="/loja"
            className="btn-outline mt-6 md:mt-0 inline-flex items-center gap-2 text-sm"
          >
            Ver Todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative aspect-square bg-dark-700 p-8 flex items-center justify-center">
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neon-blue text-dark-900 text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                {product.image ? (
                  <Image src={product.image} alt={product.name} width={160} height={160} className="object-contain" unoptimized />
                ) : (
                  <ShoppingBag className="w-12 h-12 text-neon-blue/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Olá! Vim pelo site JCGAMER e quero comprar um periférico: ${product.name} - R$ ${product.price.toFixed(2)}`);
                      window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
                    }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
