"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Check,
  Play,
  Star,
  Users,
  Clock,
  Award,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

const modules = [
  {
    title: "Módulo 1: Introdução ao Mobilador",
    lessons: [
      "O que é Mobilador?",
      "Como funciona teclado e mouse no celular",
      "Instalando o app de mapeamento",
      "Primeiros passos no treinamento",
    ],
  },
  {
    title: "Módulo 2: Configuração de Sensibilidade",
    lessons: [
      "Entendendo DPI e sensibilidade",
      "Sensibilidade geral ideal",
      "Red Dot e Scope 2x",
      "Scope 4x e Sniper",
      "Free Look perfeito",
    ],
  },
  {
    title: "Módulo 3: Configuração HUD",
    lessons: [
      "Layout otimizado para teclado",
      "Mapeamento de teclas essencial",
      "Configuração de macros",
      "Ajustes finos do HUD",
    ],
  },
  {
    title: "Módulo 4: Técnicas Avançadas",
    lessons: [
      "Técnica de capa profissional",
      "Movimentação avançada",
      "Posicionamento tático",
      "Como ganhar mais headshots",
      "Treinos diários recomendados",
    ],
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    device: "Samsung Galaxy S23",
    rating: 5,
    comment:
      "Em 2 semanas já estava jogando muito melhor. A sensibilidade que ele passou é perfeita!",
  },
  {
    name: "Lucas R.",
    device: "Xiaomi Poco X4",
    rating: 5,
    comment:
      "Melhor investimento que fiz. Meu KDA subiu muito depois de aplicar as configurações.",
  },
  {
    name: "Pedro H.",
    device: "iPhone 14",
    rating: 5,
    comment:
      "Curso muito completo. As técnicas de capa mudaram meu jogo completamente.",
  },
];

export default function SensibilidadeProPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6">
                <Target className="w-4 h-4 text-neon-blue" />
                <span className="text-sm text-neon-blue">Curso</span>
              </div>

              <h1 className="font-orbitron font-bold text-3xl md:text-5xl mb-4">
                SENSIBILIDADE{" "}
                <span className="text-gradient">PRO</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Domine a sensibilidade perfeita para mobilador. Configurações
                testadas e aprovadas por jogadores profissionais.
              </p>

              <div className="glass-card p-6 mb-8">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-700">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center mx-auto mb-3 animate-glow-pulse">
                        <Play className="w-6 h-6 text-dark-900 ml-1" />
                      </div>
                      <p className="text-sm text-gray-400">
                        Assistir preview do curso
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  4.9 avaliação
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  5.000+ alunos
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  4h30 de conteúdo
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  12 módulos
                </span>
              </div>

              <div className="space-y-6 mb-12">
                {modules.map((mod, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card overflow-hidden"
                  >
                    <div className="p-5">
                      <h3 className="font-rajdhani font-bold text-lg flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center text-neon-blue text-sm font-orbitron">
                          {i + 1}
                        </span>
                        {mod.title}
                      </h3>
                      <div className="mt-4 space-y-2 ml-11">
                        {mod.lessons.map((lesson, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <Play className="w-3 h-3 text-neon-blue" />
                            {lesson}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="font-orbitron font-bold text-2xl mb-6">
                DEPOIMENTOS
              </h2>
              <div className="space-y-4 mb-12">
                {testimonials.map((t, i) => (
                  <div key={i} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-dark-900 font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.device}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">{t.comment}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h3 className="font-orbitron font-bold text-lg mb-4">
                  PERGUNTAS FREQUENTES
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "Funciona em qualquer celular?",
                      a: "Sim! O curso ensina adaptações para diferentes dispositivos e modelos.",
                    },
                    {
                      q: "Preciso comprar teclado e mouse?",
                      a: "Sim, você precisa de um teclado, mouse e adaptador para celular.",
                    },
                    {
                      q: "Tem garantia?",
                      a: "Sim! 7 dias de garantia ou seu dinheiro de volta.",
                    },
                    {
                      q: "Por quanto tempo tenho acesso?",
                      a: "Acesso vitalício com atualizações gratuitas.",
                    },
                  ].map((faq, i) => (
                    <div key={i} className="glass p-4 rounded-xl">
                      <h4 className="font-semibold text-sm mb-2">{faq.q}</h4>
                      <p className="text-sm text-gray-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="glass-card p-8 neon-border">
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-neon text-dark-900">
                    MAIS VENDIDO
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-gray-500 line-through text-lg">
                    R$ 99,90
                  </span>
                  <div className="font-orbitron font-bold text-4xl text-gradient">
                    R$ 49,90
                  </div>
                  <span className="text-neon-green text-sm">
                    ou 12x de R$ 4,16
                  </span>
                </div>

                <button
                  onClick={() => {
                    const msg = encodeURIComponent("Olá! Vim pelo site JCGAMERFPS. Quero comprar o curso SENSIBILIDADE PRO - R$ 49,90");
                    window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
                  }}
                  className="btn-neon w-full flex items-center justify-center gap-2 mb-4"
                >
                  <Zap className="w-4 h-4" />
                  Quero Esse Curso
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="btn-green w-full flex items-center justify-center gap-2 mb-6">
                  <MessageCircle className="w-4 h-4" />
                  Tirar Dúvidas no WhatsApp
                </button>

                <div className="space-y-3 text-sm">
                  {[
                    "Acesso imediato",
                    "4h30 de conteúdo",
                    "12 módulos",
                    "Suporte por 30 dias",
                    "Atualizações gratuitas",
                    "Garantia de 7 dias",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-neon-green" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-neon-green" />
                  Compra 100% segura
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
