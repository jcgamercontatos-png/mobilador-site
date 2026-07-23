"use client";
import { Smartphone, Star, Zap, Gamepad2, ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
  { id: "1", name: "GG Mouse Pro", category: "App", price: "Gratis", desc: "App para sensibilidade, teclas e jogar Free Fire com mouse e teclado no celular.", feats: ["Sensibilidade pro", "Mapeamento de teclas", "Compativel com emuladores", "Interface intuitiva"], icon: Smartphone, href: "https://play.google.com/store/apps/details?id=com.zjx.ztezscreenshot&pcampaignid=web_share", btn: "Baixar" },
  { id: "2", name: "Sensibilidade PRO", category: "Configuracao", price: "R$ 19,90", desc: "Configuracao calibrada para Free Fire com DPI, mira e grip otimizados.", feats: ["DPI customizado", "Mira e grip otimizados", "Suporte vitalicio", "Atualizacoes gratis"], icon: Zap, href: "https://wa.me/5521973199886?text=Ola", btn: "Comprar" },
  { id: "3", name: "Pack de Configuracoes", category: "Pacote", price: "R$ 34,90", desc: "Pacote completo com multiplas configuracoes para diferentes estilos.", feats: ["5 configuracoes diferentes", "Todos os dispositivos", "Suporte VIP", "Atualizacoes mensais"], icon: Gamepad2, href: "https://wa.me/5521973199886?text=Ola", btn: "Comprar" }
];

export default function Page() {
  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-12 lg:pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/40 bg-red-600/10 mb-5">
            <Star className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold tracking-wider uppercase text-red-600">Produtos Digitais</span>
         </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nossos <span className="text-red-600">Produtos</span>
         </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Apps, configuracoes e pacotes criados pela JCGAMER para elevar seu desempenho no Free Fire.
         </p>
       </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12 lg:mb-16">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-red-600/60 transition-all duration-300 flex flex-col">
                <div className="p-6 sm:p-7 flex-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center mb-4 border border-red-600/30">
                      <Icon className="w-8 h-8 text-red-600" />
                   </div>
                    <span className="text-xs text-red-600 uppercase tracking-widest font-bold mb-2">{p.category}</span>
                    <h2 className="font-bold text-xl sm:text-2xl mb-3 text-white">{p.name}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                 </div>
               </div>
                <div className="border-t border-[#222] p-6 sm:p-7">
                  <ul className="space-y-2.5 mb-6">
                    {p.feats.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-1.5" />
                        <span>{f}</span>
                     </li>
                    ))}
                 </ul>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-white">{p.price}</span>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors flex items-center gap-1">
                      {p.btn}
                      <ChevronRight className="w-4 h-4" />
                   </a>
                 </div>
               </div>
             </div>
            );
          })}
       </div>

        <div className="text-center">
          <Link href="/loja" className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg inline-flex items-center gap-2 font-medium">
            Ver perifericos na loja
            <ChevronRight className="w-5 h-5" />
         </Link>
       </div>
     </div>
   </div>
  );
}
