"use client";

import { motion } from "framer-motion";
import {
  Package,
  Check,
  Shield,
  Lock,
  FileText,
  Video,
  Settings,
  Sparkles,
  Star,
  Users,
  Zap,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const packContents = [
  {
    icon: Settings,
    title: "15 Configurações Secretas",
    description: "Ajustes testados por profissionais",
  },
  {
    icon: Zap,
    title: "5 Ajustes DPI",
    description: "Para cada tipo de dispositivo",
  },
  {
    icon: Lock,
    title: "10 Scripts Permitidos",
    description: "Seguros e otimizados",
  },
  {
    icon: FileText,
    title: "8 Guias PDF",
    description: "Manuais completos com passo a passo",
  },
  {
    icon: Video,
    title: "12 Vídeos Exclusivos",
    description: "Tutoriais em vídeo detalhados",
  },
  {
    icon: Sparkles,
    title: "Atualizações Mensais",
    description: "Novas configs a cada atualização",
  },
];

export default function PackMobiladorPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-purple mb-6">
              <Package className="w-5 h-5 text-neon-purple" />
              <span className="text-sm text-neon-purple font-medium">
                Pack Exclusivo
              </span>
            </div>

            <h1 className="font-orbitron font-bold text-3xl md:text-5xl mb-4">
              PACK{" "}
              <span className="text-gradient neon-text-purple">MOBILADOR</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Tenha acesso a todas as configurações secretas, ajustes
              profissionais, scripts permitidos e guias exclusivos para dominar
              o Free Fire com teclado e mouse.
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
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                4.9 avaliação
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                500+ compradores
              </span>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-orbitron font-bold text-lg mb-4">
                O QUE VOCÊ VAI RECEBER
              </h3>
              <div className="space-y-3">
                {[
                  "PDF com todas as configurações detalhadas",
                  "Vídeos explicativos para cada configuração",
                  "Scripts testados e aprovados",
                  "Guia de instalação passo a passo",
                  "Acesso ao grupo exclusivo",
                  "Atualizações mensais gratuitas",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neon-purple" />
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
            <div className="glass-card p-8 neon-border-purple">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-orbitron font-bold text-2xl">
                  PACK MOBILADOR
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Tudo que você precisa em um só lugar
                </p>
              </div>

              <div className="text-center mb-8">
                <span className="text-gray-500 line-through text-lg">
                  R$ 149,90
                </span>
                <div className="font-orbitron font-bold text-5xl text-gradient">
                  R$ 39,90
                </div>
                <span className="text-neon-green text-sm">
                  ou 12x de R$ 3,32
                </span>
              </div>

              <button className="btn-neon w-full flex items-center justify-center gap-2 mb-4 text-lg py-4">
                <Zap className="w-5 h-5" />
                Comprar Pack Agora
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="btn-green w-full flex items-center justify-center gap-2 mb-6">
                <MessageCircle className="w-4 h-4" />
                Tirar Dúvidas no WhatsApp
              </button>

              <div className="space-y-3 text-sm mb-6">
                {[
                  "Download imediato",
                  "50+ configurações",
                  "12 vídeos exclusivos",
                  "8 guias PDF",
                  "Atualizações mensais",
                  "Garantia de 7 dias",
                  "Suporte via WhatsApp",
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
