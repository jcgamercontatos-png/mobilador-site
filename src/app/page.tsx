"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Download,
  Gamepad2,
  Play,
  ShoppingBag,
  Star,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ManagedAd } from "@/components/ManagedAd";

const PRODUCTS_API = "/api/products?featured=true&limit=3";

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
  image?: string;
  stock?: number;
  condition?: "NEW" | "USED";
  unit?: string;
};

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
};

const fallbackProducts: Product[] = [
  {
    id: "headset",
    name: "Headset Gamer FIFINE H9",
    category: "Headset",
    price: 299.9,
    rating: 5,
    reviews: 48,
    badge: "Destaque",
    short_desc: "Áudio limpo e conforto para jogar por horas.",
    image: "/images/headset-fifine-h9.jpg",
  },
  {
    id: "webcam",
    name: "Webcam EMEET",
    category: "Webcam",
    price: 249.9,
    rating: 5,
    reviews: 31,
    badge: "Setup",
    short_desc: "Imagem nítida para conteúdo, live e chamadas.",
    image: "/images/webcam-emeet.png",
  },
  {
    id: "pack",
    name: "Pack de Setas JCGAMER",
    category: "Pack",
    price: 19.9,
    rating: 5,
    reviews: 76,
    badge: "Digital",
    short_desc: "Visual pronto para deixar sua configuração completa.",
    image: "/images/download_pack_setas_800x800.png",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function Home() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [videos, setVideos] = useState<Video[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    siteName: "JCGAMER",
    profileImage: "",
    heroTitle: "Bem-vindo à JCGAMER",
    heroDescription:
      "Produtos digitais, periféricos e conteúdo direto para elevar seu gameplay no Free Fire.",
  });

  useEffect(() => {
    fetch(PRODUCTS_API)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products;
        if (Array.isArray(list) && list.length) setProducts(list.slice(0, 3));
      })
      .catch(() => {});

    fetch("/api/site/settings")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (data.settings) {
          setSiteSettings((current) => ({ ...current, ...data.settings }));
        }
      })
      .catch(() => {});

    fetch("/api/youtube")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setVideos(Array.isArray(data?.videos) ? data.videos.slice(0, 4) : []))
      .catch(() => {});
  }, []);

  return (
    <div className="site-page">
      <div className="page-shell">
        <section className="panel grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.45fr_0.85fr] lg:items-stretch lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-w-0 flex-col justify-center py-2 lg:py-6"
          >
            <span className="eyebrow">@Jcgamerofc</span>
            <h1 className="display-title mt-4">{siteSettings.heroTitle}</h1>
            <p className="body-copy mt-4 max-w-2xl">
              {siteSettings.heroDescription}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 min-[430px]:flex-row">
              <Link href="/loja" className="primary-button">
                <ShoppingBag className="h-3.5 w-3.5" />
                Ver loja
              </Link>
              <a
                href="https://www.youtube.com/@Jcgamerofc"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                <Youtube className="h-3.5 w-3.5" />
                Canal no YouTube
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 }}
            className="compact-panel flex min-h-64 flex-col items-center justify-center p-5 text-center lg:min-h-[360px]"
          >
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#118cff]/[0.55] bg-[radial-gradient(circle,#071f5c_0%,#050b1d_65%)] shadow-[0_0_34px_rgba(17,140,255,0.18)] sm:h-28 sm:w-28">
              <img
                src={siteSettings.profileImage || "/images/jcgamer-profile.png"}
                alt={`Foto de perfil ${siteSettings.siteName}`}
                className="h-full w-full object-cover"
              />
            </div>
            <strong className="mt-4 font-['Oxanium'] text-lg font-extrabold tracking-[0.1em]">
              {siteSettings.siteName}
            </strong>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#a0a0a5]">
              Free Fire, configurações, downloads e periféricos em um portal gamer mais limpo.
            </p>
          </motion.div>
        </section>

        <ManagedAd placement="HOME_TOP" />

        <section className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3" aria-label="Números da JCGAMER">
          {[
            { value: "3", label: "Produtos digitais" },
            { value: "Loja", label: "Periféricos selecionados" },
            { value: "10K+", label: "Inscritos no canal" },
            { value: "100+", label: "Vídeos publicados" },
          ].map((stat) => (
            <article key={stat.label} className="compact-panel border-l-2 border-l-[#118cff] p-3.5 sm:p-4">
              <strong className="font-['Oxanium'] text-lg font-extrabold sm:text-xl">{stat.value}</strong>
              <p className="mt-1 text-xs leading-snug text-[#96969b] sm:text-sm">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Periféricos</span>
              <h2 className="section-title mt-2">Periféricos em destaque</h2>
              <p className="mt-1 text-sm text-[#96969b]">
                Fotos reais, preços visíveis e cards mais compactos em qualquer tela.
              </p>
            </div>
            <Link href="/loja" className="inline-flex items-center gap-1 text-sm font-bold text-[#d2d2d5] hover:text-white">
              Ver todos <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <ManagedAd placement="HOME_PRODUCTS" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={320}
                      height={240}
                      className="h-full w-full object-contain"
                      unoptimized
                    />
                  ) : (
                    <ShoppingBag className="h-10 w-10 text-[#35b8ff]/[0.35]" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3ec2ff]">
                    {product.category}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[9px] font-extrabold uppercase text-[#c7c7cb]">
                      {product.condition === "USED" ? "Usado" : "Novo"}
                    </span>
                    {typeof product.stock === "number" && (
                      <span className="rounded-full bg-[#d4ff62]/10 px-2 py-1 text-[9px] font-extrabold uppercase text-[#d4ff62]">
                        {product.stock} {product.unit || "unidade"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-lg font-bold leading-tight text-white">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-[#85858b]">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating || 5}</span>
                    <span>({product.reviews || 0} avaliações)</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#9d9da2]">
                    {product.short_desc || "Periférico selecionado para completar seu setup gamer."}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <div>
                      <strong className="text-xl font-extrabold text-white">{formatPrice(product.price)}</strong>
                      {!!product.original_price && (
                        <span className="ml-2 text-xs text-[#77777c] line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                    <Link href="/loja" className="secondary-button min-h-10 px-3.5">
                      Ver
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Canal</span>
              <h2 className="section-title mt-2">Últimos vídeos</h2>
              <p className="mt-1 text-sm text-[#96969b]">Conteúdo recente do canal @Jcgamerofc.</p>
            </div>
            <Link href="/canal" className="inline-flex items-center gap-1 text-sm font-bold text-[#d2d2d5] hover:text-white">
              Abrir canal <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compact-panel group overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#111]">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/40">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#118cff]">
                        <Play className="h-3.5 w-3.5 fill-white text-white" />
                      </span>
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{video.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="compact-panel flex flex-col items-center justify-center px-4 py-8 text-center">
              <Youtube className="h-6 w-6 text-[#35b8ff]" />
              <p className="mt-2 text-sm text-[#9d9da2]">Veja os vídeos mais recentes diretamente no canal.</p>
              <a
                href="https://www.youtube.com/@Jcgamerofc/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button mt-3"
              >
                Ver vídeos
              </a>
            </div>
          )}
        </section>

        <section className="panel section-block flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <span className="eyebrow">Download</span>
            <h2 className="section-title mt-2">Central de downloads</h2>
            <p className="mt-2 text-sm text-[#9d9da2]">
              Aplicativos e ferramentas JCGAMER reunidos em uma página limpa.
            </p>
          </div>
          <Link href="/download" className="primary-button shrink-0">
            <Download className="h-3.5 w-3.5" />
            Abrir downloads
          </Link>
        </section>
      </div>
    </div>
  );
}
