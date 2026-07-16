"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Lock,
  FileText,
  Video,
  Settings,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

const packFeatures = [
  {
    icon: Settings,
    title: "Configurações Secretas",
    description: "Ajustes testados e aprovados que poucos conhecem",
  },
  {
    icon: Zap,
    title: "DPI Profissional",
    description: "Configuração de DPI ideal para cada tipo de jogo",
  },
  {
    icon: FileText,
    title: "Guias PDF Exclusivos",
    description: "Manuais completos com passo a passo detalhado",
  },
  {
    icon: Video,
    title: "Vídeos Exclusivos",
    description: "Tutoriais em vídeo com configurações detalhadas",
  },
  {
    icon: Lock,
    title: "Scripts Permitidos",
    description: "Scripts seguros e otimizados para mobilador",
  },
  {
    icon: Sparkles,
    title: "Atualizações Gratuitas",
    description: "Novas configurações a cada atualização do jogo",
  },
];

export function PackSection() {
  return (
    <section className="py-24 relative gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 neon-border-purple">
              <Package className="w-5 h-5 text-neon-purple" />
              <span className="text-sm text-neon-purple font-medium">
                Pack Exclusivo
              </span>
            </div>

            <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              PACK{" "}
              <span className="neon-text-purple text-gradient">
                MOBILADOR
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Tenha acesso a todas as configurações secretas, ajustes
              profissionais, scripts permitidos e guias exclusivos para
              dominar o Free Fire com teclado e mouse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {packFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
              <Shield className="w-5 h-5 text-neon-green" />
              <span>Garantia de 7 dias ou seu dinheiro de volta</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <span className="text-gray-500 line-through text-lg">
                  R$ 149,90
                </span>
                <div className="font-orbitron font-bold text-4xl text-gradient">
                  R$ 39,90
                </div>
                <span className="text-neon-green text-sm">
                  ou 12x de R$ 3,32
                </span>
              </div>
              <Link
                href="/pack-mobilador"
                className="btn-neon inline-flex items-center gap-2"
              >
                Comprar Pack
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-purple/5 rounded-3xl blur-3xl" />
            <div className="relative glass-card p-8 neon-border-purple">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-orbitron font-bold text-xl">
                  PACK MOBILADOR
                </h3>
                <p className="text-gray-400 text-sm">
                  Tudo que você precisa em um só lugar
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "15 Configurações Secretas",
                  "5 Ajustes DPI Profissionais",
                  "10 Scripts Permitidos",
                  "8 Guias PDF Completos",
                  "12 Vídeos Exclusivos",
                  "Atualizações Mensais",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg glass"
                  >
                    <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <span className="text-neon-purple text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-neon-green/10 border border-neon-green/20 text-center">
                <p className="text-neon-green font-semibold text-sm">
                  +500 Mobiladores já compraram
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
