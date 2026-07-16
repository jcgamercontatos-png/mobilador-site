"use client";

import { motion } from "framer-motion";
import {
  Package,
  Check,
  Shield,
  Lock,
  Monitor,
  Zap,
  ArrowRight,
  MessageCircle,
  Target,
} from "lucide-react";

const packContents = [
  {
    icon: Target,
    title: "Macetinho XM8",
    description: "Configuração completa da XM8 para emulador",
  },
  {
    icon: Target,
    title: "Macetinho UMP",
    description: "Ajustes otimizados da UMP no emulador",
  },
  {
    icon: Target,
    title: "Macetinho VSS",
    description: "Macete da VSS para mira perfeita no emulador",
  },
  {
    icon: Target,
    title: "Macetinho MAC10",
    description: "Configuração da MAC10 para emulador",
  },
];

export default function PackEmuladorPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6">
              <Monitor className="w-5 h-5 text-neon-blue" />
              <span className="text-sm text-neon-blue font-medium">
                Pack Emulador
              </span>
            </div>

            <h1 className="font-orbitron font-bold text-3xl md:text-5xl mb-4">
              PACK{" "}
              <span className="text-gradient">EMULADOR</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Plano completo com todos os métodos que utilizo para jogar Free Fire
              no emulador (BlueStacks, LDPlayer, etc.). Tenha acesso a todos os
              macetes das armas e domine o jogo!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {packContents.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-orbitron font-bold text-lg mb-4">
                O QUE VOCÊ VAI RECEBER
              </h3>
              <div className="space-y-3">
                {[
                  "Macetinho XM8 completo",
                  "Macetinho UMP completo",
                  "Macetinho VSS completo",
                  "Macetinho MAC10 completo",
                  "Configuração personalizada para emulador",
                  "Suporte via WhatsApp",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neon-blue" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="glass-card p-8 neon-border">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-blue to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-orbitron font-bold text-2xl">
                  PACK EMULADOR
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Plano Completo - PC/Emulador
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="font-orbitron font-bold text-5xl text-gradient">
                  R$ 35,00
                </div>
                <span className="text-neon-green text-sm">
                  Pagamento único
                </span>
              </div>

              <button
                onClick={() => {
                  const msg = encodeURIComponent("Olá! Vim pelo site Mobilador. Quero comprar o PACK EMULADOR - R$ 35,00");
                  window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
                }}
                className="btn-neon w-full flex items-center justify-center gap-2 mb-4 text-lg py-4"
              >
                <Zap className="w-5 h-5" />
                Comprar Pack Agora
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  const msg = encodeURIComponent("Olá! Vim pelo site Mobilador. Tenho dúvidas sobre o PACK EMULADOR");
                  window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
                }}
                className="btn-green w-full flex items-center justify-center gap-2 mb-6"
              >
                <MessageCircle className="w-4 h-4" />
                Tirar Dúvidas no WhatsApp
              </button>

              <div className="space-y-3 text-sm mb-6">
                {[
                  "Acesso imediato após pagamento",
                  "4 macetes completos de armas",
                  "Configuração para emulador",
                  "Suporte via WhatsApp",
                  "Garantia de 7 dias",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Check className="w-4 h-4 text-neon-green" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-neon-green" />
                  Compra 100% segura
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4 text-neon-green" />
                  Pagamento criptografado
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
