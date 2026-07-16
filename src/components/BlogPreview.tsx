"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "Guia Completo: Melhor Configuração de Sensibilidade 2024",
    excerpt:
      "Descubra as configurações de sensibilidade mais usadas por jogadores profissionais de mobilador.",
    category: "Configuração",
    date: "10 Jul 2024",
    readTime: "8 min",
    slug: "melhor-configuracao-sensibilidade-2024",
  },
  {
    id: "2",
    title: "Top 5 Mouse para Mobilador em 2024",
    excerpt:
      "Análise completa dos melhores mouse para jogar Free Fire com teclado e mouse no celular.",
    category: "Periféricos",
    date: "05 Jul 2024",
    readTime: "6 min",
    slug: "top-5-mouse-mobilador-2024",
  },
  {
    id: "3",
    title: "Como Configurar Teclado e Mouse no Celular Passo a Passo",
    excerpt:
      "Tutorial completo para configurar teclado e mouse no seu celular e começar a jogar Free Fire.",
    category: "Tutorial",
    date: "01 Jul 2024",
    readTime: "10 min",
    slug: "configurar-teclado-mouse-celular",
  },
];

export function BlogPreview() {
  return (
    <section className="py-24 relative gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-5 h-5 text-neon-blue" />
              <span className="text-sm text-gray-300">Blog</span>
            </div>
            <h2 className="section-title text-left">CONTEÚDOS</h2>
            <p className="text-gray-400 mt-2 max-w-lg">
              Dicas, tutoriais e novidades sobre Free Fire e mobilador.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-outline mt-6 md:mt-0 inline-flex items-center gap-2 text-sm"
          >
            Ver Todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="glass-card overflow-hidden group h-full">
                  <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-neon-blue/20" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-rajdhani font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-neon-blue text-sm font-medium group-hover:gap-3 transition-all">
                      Ler mais
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
