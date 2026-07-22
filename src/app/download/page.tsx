"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Shield, Gamepad2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Central de <span className="text-[#e50914]">Downloads</span>
          </h1>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
            Baixe todos os APKs, mods e ferramentas do JCGAMER.
          </p>
        </motion.div>

        {hero && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Smartphone, title: "Fácil de usar", desc: "Instalação rápida e interface intuitiva." },
              { icon: Shield, title: "100% Seguro", desc: "APK testado, leve e sem vírus." },
              { icon: Gamepad2, title: "Precisão Máxima", desc: "Jogue Free Fire com teclado e mouse." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#0d0d0d] border border-[#222] rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-[#e50914]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#e50914]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#a0a0a0] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center text-[#a0a0a0] py-12">Carregando...</div>
        ) : downloads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden hover:border-[#e50914]/50 transition-colors flex flex-col"
              >
                {item.image && (
                  <div className="relative w-full h-48 bg-[#1a1a1a]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#e50914]/10 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-[#e50914]" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                  <p className="text-[#a0a0a0] text-sm mb-5 flex-1">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#e50914] text-white px-6 py-3 rounded font-semibold hover:bg-[#f40612] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Baixar APK
                  </a>
                  {(item.version || item.file_size) && (
                    <div className="flex items-center justify-center gap-3 mt-4 text-xs text-[#777]">
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
        ) : (
          <div className="text-center text-[#a0a0a0] py-12">
            <p>Nenhum download disponível no momento.</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <Link href="/" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">← Voltar para o início</Link>
        </motion.div>
      </div>
    </div>
  );
}
