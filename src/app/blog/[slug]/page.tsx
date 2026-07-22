"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const postsData: Record<string, any> = {
  "melhor-configuracao-sensibilidade-2024": {
    title: "Guia Completo: Melhor Configuração de Sensibilidade 2024",
    category: "Configuração",
    date: "10 Jul 2024",
    readTime: "8 min",
    content: `
## Introdução

A sensibilidade é um dos fatores mais importantes para quem joga Free Fire com teclado e mouse no celular (mobilador). Neste guia, vamos mostrar as melhores configurações testadas e aprovadas por jogadores profissionais.

## Configuração Básica

### Sensibilidade Geral
- **Recomendado:** 80-90%
- **Para iniciantes:** 75-80%
- **Para avançados:** 85-95%

### Red Dot
- **Recomendado:** 70-80%
- Funciona bem para combates curtos

### Scope 2x
- **Recomendado:** 60-70%
- Equilíbrio entre precisão e velocidade

### Scope 4x
- **Recomendado:** 40-50%
- Foco em precisão para longa distância

### Free Look
- **Recomendado:** 100%
- Sempre no máximo para melhor visão

## DPI do Mouse

O DPI influencia diretamente na sensibilidade:
- **400 DPI:** Mais controle, ideal para sniper
- **800 DPI:** Equilíbrio, recomendado para iniciantes
- **1600 DPI:** Mais rápido, para jogadores agressivos

## Dicas Extras

1. Comece com configurações base e ajuste gradualmente
2. Pratique no treinamento antes de jogar ranqueada
3. Não mude configurações muito frequentemente
4. Anote suas configurações para referência
5. Teste diferentes DPIs para encontrar o ideal
    `,
  },
  "top-5-mouse-mobilador-2024": {
    title: "Top 5 Mouse para Mobilador em 2024",
    category: "Periféricos",
    date: "05 Jul 2024",
    readTime: "6 min",
    content: `
## Os Melhores Mouse para Mobilador

Escolher o mouse certo é essencial para uma boa experiência de mobilador. Aqui estão nossas recomendações.

## 1. Logitech G203 Lightsync

O melhor custo-benefício do mercado. Sensor de até 8000 DPI, build quality excelente e preço acessível.

**Preço:** ~R$ 130

## 2. Redragon Cobra

Excelente para quem busca DPI alto e botões programáveis. Muito usado por mobiladores brasileiros.

**Preço:** ~R$ 100

## 3. Logitech G305

Mouse wireless com sensor HERO 25K. Perfeito para quem não quer se prender com fio.

**Preço:** ~R$ 200

## 4. HyperX Pulsefire Core

Design ergonômico e sensor Pixart 3327. Ópimo para sessões longas de jogo.

**Preço:** ~R$ 180

## 5. Razer DeathAdder Essential

Icônico e confiável. Sensor óptico de 6400 DPI e design que se adapta a qualquer mão.

**Preço:** ~R$ 150
    `,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = postsData[params.slug] || {
    title: "Artigo não encontrado",
    content: "Este artigo ainda está sendo escrito.",
    category: "Blog",
    date: new Date().toLocaleDateString("pt-BR"),
    readTime: "5 min",
  };

  return (
    <div className="min-h-screen pt-12 lg:pt-16 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>

          <div className="glass-card overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-neon-blue/30" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <button className="flex items-center gap-1 hover:text-neon-blue transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>

              <h1 className="font-orbitron font-bold text-3xl md:text-4xl mb-8">
                {post.title}
              </h1>

              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
