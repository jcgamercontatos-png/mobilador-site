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

  return (
    <div className="min-h-screen pt-8 lg:pt-12 pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 lg:mb-8">
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
            Central de <span className="text-[#e50914]">Downloads</span>
          </h1>
          <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl mx-auto">
            Baixe todos os APKs, mods e ferramentas do JCGAMER.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-[#a0a0a0] py-6">Carregando...</div>
        ) : downloads.length > 0 ? (
          <>
            <section className="max-w-7xl mx-auto mb-4 lg:mb-6">
              <AdBanner layout="responsive" />
            </section>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {downloads.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden group hover:border-[#e50914]/50 transition-all"
              >
                <div className="relative aspect-square bg-[#111] p-2 lg:p-3 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      unoptimized
                    />
                  ) : (
                    <Download className="w-8 h-8 lg:w-10 lg:h-10 text-[#e50914]/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#e50914] text-white text-xs lg:text-sm py-1.5 px-3 lg:px-4 rounded font-semibold hover:bg-[#f40612] transition-colors"
                    >
                      Baixar
                    </a>
                  </div>
                </div>

                <div className="p-2 lg:p-3">
                  <p className="text-xs text-[#e50914] uppercase tracking-wider mb-1">
                    Download
                  </p>
                  <h3 className="font-semibold text-white text-sm lg:text-base mb-1 group-hover:text-[#e50914] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
            </div>
          </>
        ) : (
          <div className="text-center text-[#a0a0a0] py-6">
            <p>Nenhum download disponível no momento.</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mt-4 lg:mt-6">
          <Link href="/" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">← Voltar para o início</Link>
        </motion.div>
      </div>
    </div>
  );
}