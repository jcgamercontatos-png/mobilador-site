"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Shield, Gamepad2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";

const API = "https://mobilador-api.vercel.app/api/site/downloads";

type DownloadItem = {
  id: number;
  title: string;
  description: string;
  url: string;
  version: string;
  file_size: string;
  icon: string;
  image: string;
  is_active: boolean;
};

export default function DownloadPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        setDownloads(data.filter((d: DownloadItem) => d.is_active));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const hero = downloads[0];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-4">
            Central de <span className="text-[#e50914]">Downloads</span>
          </h1>
          <p className="text-[#a0a0a0] text-base md:text-lg max-w-2xl mx-auto">
            Baixe todos os APKs, mods e ferramentas do JCGAMER.
          </p>
        </motion.div>

        {hero && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {[
              { icon: Smartphone, title: "Fácil de usar", desc: "Instalação rápida e interface intuitiva." },
              { icon: Shield, title: "100% Seguro", desc: "APK testado, leve e sem vírus." },
              { icon: Gamepad2, title: "Precisão Máxima", desc: "Jogue Free Fire com teclado e mouse." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#0d0d0d] border border-[#222] rounded-lg p-4 md:p-6 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#e50914]/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#e50914]" />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2">{item.title}</h3>
                <p className="text-[#a0a0a0] text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center text-[#a0a0a0] py-12">Carregando...</div>
        ) : downloads.length > 0 ? (
          <>
            <section className="max-w-7xl mx-auto mb-8">
              <AdBanner layout="responsive" />
            </section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {downloads.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden group hover:border-[#e50914]/50 transition-all"
              >
                <div className="relative aspect-square bg-[#111] p-4 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      unoptimized
                    />
                  ) : (
                    <Download className="w-12 h-12 text-[#e50914]/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#e50914] text-white text-xs py-1.5 px-4 rounded font-semibold hover:bg-[#f40612] transition-colors"
                    >
                      Baixar APK
                    </a>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-xs text-[#e50914] uppercase tracking-wider mb-1">
                    Download
                  </p>
                  <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-[#e50914] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#a0a0a0] text-xs mb-3 line-clamp-2 flex-1">
                    {item.description}
                  </p>
                  {(item.version || item.file_size) && (
                    <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[#777]">
                      {item.version && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#e50914]" /> {item.version}
                        </span>
                      )}
                      {item.file_size && <span>{item.file_size}</span>}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            </div>
          </>
        ) : (
          <div className="text-center text-[#a0a0a0] py-12">
            <p>Nenhum download disponível no momento.</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-8 md:mt-12">
          <Link href="/" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">← Voltar para o início</Link>
        </motion.div>
      </div>
    </div>
  );
}
