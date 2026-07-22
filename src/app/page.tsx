"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  ChevronRight,
  Youtube,
  Download,
  Gamepad2,
  Play,
} from "lucide-react";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";

type Produto = {
  id: number; name: string; category: string; price: number;
  original_price: number; rating: number; reviews: number;
  badge: string; short_desc: string; description: string;
  specs: string[]; image: string; is_active: boolean;
};

export default function Home() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadTitle, setDownloadTitle] = useState("GG Mouse Pro");
  const [featuredProducts, setFeaturedProducts] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("https://mobilador-api.vercel.app/api/site/settings")
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
    fetch("https://mobilador-api.vercel.app/api/site/downloads")
      .then(r => r.json())
      .then(data => {
        const active = data?.find((d: any) => d.is_active);
        if (active) { setDownloadUrl(active.url); setDownloadTitle(active.title); }
      })
      .catch(() => {});
    fetch("https://mobilador-api.vercel.app/api/site/products")
      .then(r => r.json())
      .then(data => setFeaturedProducts(data?.slice(0, 4) || []))
      .catch(() => {});
  }, []);

  const buyProduct = (
    name: string,
    price: number
  ) => {
    const msg = encodeURIComponent(
      `Olá! Vim pelo site JCGAMER e quero comprar um periférico: ${name} - R$ ${price.toFixed(2)}`
    );
    window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a0306_0%,#000000_55%)] z-0" />

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-6">
              <Youtube className="w-4 h-4 text-[#e50914]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#e50914]">
                @Jcgamerofc
              </span>
            </div>

            <h1 className="text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-5">
              Bem-vindo à{" "}
              <span className="bg-gradient-to-r from-[#e50914] to-[#ff4444] bg-clip-text text-transparent font-bold">
                JCGAMER
              </span>
            </h1>

            <p className="text-lg text-[#a0a0a0] max-w-2xl mb-8">
              Produtos digitais e periféricos gamer para elevar seu gameplay.
              Confira apps, configurações de sensibilidade e muito mais!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/produtos"
                className="bg-[#e50914] text-white px-6 py-3 rounded font-semibold hover:bg-[#f40612] transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Ver Produtos
              </Link>
              <a
                href="https://www.youtube.com/@Jcgamerofc"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/50 text-white px-6 py-3 rounded font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                Canal no YouTube
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
          >
            {[
              { label: "Produtos", value: "3", icon: Star },
              { label: "Periféricos", value: "2", icon: ShoppingBag },
              { label: "Clientes", value: "500+", icon: Star },
              { label: "Canal YouTube", value: "@Jcgamerofc", icon: Youtube },
            ].map((s) => (
              <div
                key={s.label}
                className="relative bg-[#0d0d0d] border border-[#222] rounded-md p-5 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[#e50914]" />
                <s.icon className="w-5 h-5 text-[#e50914] mb-3" />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-[#777] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e50914]/30 to-transparent" />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-4">
                <ShoppingBag className="w-4 h-4 text-[#e50914]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#e50914]">
                  Periféricos
                </span>
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white">
                Periféricos em Destaque
              </h2>
              <p className="text-[#a0a0a0] text-sm mt-1">
                Mouse, teclado, fone e mais para seu setup gamer
              </p>
            </div>
            <Link
              href="/loja"
              className="mt-4 md:mt-0 text-sm text-[#a0a0a0] hover:text-white transition-colors flex items-center gap-1"
            >
              Ver todos os periféricos <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden group hover:border-[#e50914]/50 transition-all"
              >
                <div className="relative aspect-square bg-[#111] p-8 flex items-center justify-center">
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#e50914] text-white text-xs font-bold">
                      {product.badge}
                    </div>
                  )}
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      unoptimized
                    />
                  ) : (
                    <ShoppingBag className="w-12 h-12 text-[#e50914]/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <button
                      onClick={() => buyProduct(product.name, product.price)}
                      className="bg-[#e50914] text-white text-xs py-2 px-6 rounded font-semibold hover:bg-[#f40612] transition-colors"
                    >
                      Comprar
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-[#e50914] uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-[#e50914] transition-colors">
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
                    <span className="text-xl font-bold text-white">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.original_price > 0 && (
                      <span className="text-gray-500 text-sm line-through">
                        R$ {product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 border border-[#e50914]/50 text-[#e50914] px-6 py-2.5 rounded font-semibold hover:bg-[#e50914]/10 transition-colors text-sm"
            >
              Ver Loja Completa
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e50914]/30 to-transparent" />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner layout="responsive" />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-4">
              <Youtube className="w-4 h-4 text-[#e50914]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#e50914]">
                Canal
              </span>
            </div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white">
              Últimos Vídeos
            </h2>
            <p className="text-[#a0a0a0] text-sm mt-1">
              Confira os conteúdos mais recentes do <strong>@Jcgamerofc</strong>
            </p>
          </motion.div>

          <LatestVideos />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a
              href="https://www.youtube.com/@Jcgamerofc/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#e50914]/50 text-[#e50914] px-6 py-2.5 rounded font-semibold hover:bg-[#e50914]/10 transition-colors text-sm"
            >
              <Youtube className="w-4 h-4" />
              Ver Todos os Vídeos
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e50914]/30 to-transparent" />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-4">
              <Download className="w-4 h-4 text-[#e50914]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#e50914]">
                App
              </span>
            </div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white mb-3">
              Baixe o {downloadTitle}
            </h2>
            <p className="text-[#a0a0a0] text-sm max-w-xl mx-auto mb-8">
              Baixe o app e transforme seu celular em uma máquina de precisão.
            </p>
            <a
              href={downloadUrl || "https://play.google.com/store/apps/details?id=com.zjx.ztezscreenshot&pcampaignid=web_share"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#e50914] text-white px-8 py-3 rounded font-semibold hover:bg-[#f40612] transition-colors"
            >
              <Download className="w-5 h-5" />
              Baixar {downloadTitle}
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

function LatestVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-[#1a1a1a]" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-[#1a1a1a] rounded w-3/4" />
              <div className="h-3 bg-[#1a1a1a] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.slice(0, 4).map((video: any, index: number) => (
        <motion.a
          key={video.id}
          href={`https://youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden group hover:border-[#e50914]/50 transition-all"
        >
          <div className="relative aspect-video bg-[#111] overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#e50914]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:text-[#e50914] transition-colors">
              {video.title}
            </h3>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
