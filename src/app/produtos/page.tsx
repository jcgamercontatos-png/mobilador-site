"use client";

import { motion } from "framer-motion";
import { Download, Smartphone, Star, Zap, Shield, Gamepad2, ChevronRight } from "lucide-react";
import Link from "next/link";

const digitalProducts = [
  {
    id: "1",
    name: "GG Mouse Pro",
    category: "App",
    price: "Grátis",
    description: "Aplicativo para configurar sensibilidade, mapear teclas e jogar Free Fire com teclado e mouse no celular.",
    features: [
      "Sensibilidade profissional",
      "Mapeamento de teclas",
      "Compatível com emuladores",
      "Interface intuitiva",
    ],
    icon: Smartphone,
    href: "https://play.google.com/store/apps/details?id=com.zjx.ztezscreenshot&pcampaignid=web_share",
  },
  {
    id: "2",
    name: "Sensibilidade PRO",
    category: "Configuração",
    price: "R$ 19,90",
    description: "Configuração de sensibilidade calibrada para Free Fire com DPI, mirra e grip otimizados para seu estilo de jogo.",
    features: [
      "DPI customizado",
      "Mirra e grip otimizados",
      "Suporte vitalício",
      "Atualizações gratuitas",
    ],
    icon: Zap,
    href: "https://wa.me/5521973199886?text=Ol%C3%A1!%20Quero%20comprar%20a%20Sensibilidade%20PRO",
  },
  {
    id: "3",
    name: "Pack de Configurações",
    category: "Pacote",
    price: "R$ 34,90",
    description: "Pacote completo com múltiplas configurações de sensibilidade para diferentes estilos de gameplay e dispositivos.",
    features: [
      "5 configurações diferentes",
      "Para todos os dispositivos",
      "Suporte VIP",
      "Atualizações mensais",
    ],
    icon: Gamepad2,
    href: "https://wa.me/5521973199886?text=Ol%C3%A1!%20Quero%20comprar%20o%20Pack%20de%20Configura%C3%A7%C3%B5es",
  },
];

export default function ProdutosPage() {
  return (
    <div className="min-h-screen pt-8 lg:pt-12 pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-3">
            <Star className="w-4 h-4 text-[#e50914]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#e50914]">
              Produtos Digitais
            </span>
          </div>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-white mb-2">
            Nossos <span className="text-[#e50914]">Produtos</span>
          </h1>
          <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl mx-auto">
            Apps, configurações e pacotes criados pela JCGAMER para elevar seu
            desempenho no Free Fire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {digitalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-[#0d0d0d] border border-[#222] rounded-lg overflow-hidden group hover:border-[#e50914]/50 transition-all"
            >
              <div className="p-3 flex flex-col items-center text-center border-b border-[#222]">
                <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center mb-3 border border-[#e50914]/30">
                  <product.icon className="w-5 h-5 text-[#e50914]" />
                </div>
                <span className="text-xs text-[#e50914] uppercase tracking-wider font-semibold mb-2">
                  {product.category}
                </span>
                <h3 className="font-bold text-sm mb-2">
                  {product.name}
                </h3>
                <p className="text-[#a0a0a0] text-xs leading-relaxed mb-3">
                  {product.description}
                </p>
              </div>

              <div className="p-3">
                <div className="space-y-1.5 mb-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#a0a0a0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white">
                    {product.price}
                  </span>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e50914] text-white px-3 py-1.5 rounded font-semibold text-xs hover:bg-[#f40612] transition-colors flex items-center gap-1"
                  >
                    {product.id === "1" ? "Baixar" : "Comprar"}
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 lg:mt-10"
        >
          <Link
            href="/loja"
            className="text-[#a0a0a0] hover:text-white transition-colors text-sm inline-flex items-center gap-1"
          >
            Ver periféricos na loja <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
