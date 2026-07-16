"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
} from "lucide-react";

const categories = ["Todos", "Configuração", "Periféricos", "Tutorial", "Notícias"];

const posts = [
  {
    id: "1",
    title: "Guia Completo: Melhor Configuração de Sensibilidade 2024",
    excerpt:
      "Descubra as configurações de sensibilidade mais usadas por jogadores profissionais de mobilador.",
    category: "Configuração",
    date: "10 Jul 2024",
    readTime: "8 min",
    slug: "melhor-configuracao-sensibilidade-2024",
    featured: true,
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
    featured: false,
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
    featured: false,
  },
  {
    id: "4",
    title: "Atualização Free Fire: O que Mudou para Mobilador",
    excerpt:
      "Análise da última atualização do Free Fire e como ela afeta os jogadores de mobilador.",
    category: "Notícias",
    date: "28 Jun 2024",
    readTime: "5 min",
    slug: "atualizacao-free-fire-mobilador",
    featured: false,
  },
  {
    id: "5",
    title: "Os 10 Melhores Adaptadores USB para Celular em 2024",
    excerpt:
      "Comparativo dos melhores adaptadores USB-C para conectar teclado e mouse no celular.",
    category: "Periféricos",
    date: "25 Jun 2024",
    readTime: "7 min",
    slug: "melhores-adaptadores-usb-celular",
    featured: false,
  },
  {
    id: "6",
    title: "Dicas para Melhorar sua Mirra no Free Fire",
    excerpt:
      "Técnicas profissionais para melhorar sua mirra e acertar mais headshots no jogo.",
    category: "Tutorial",
    date: "20 Jun 2024",
    readTime: "9 min",
    slug: "dicas-melhorar-mirra-free-fire",
    featured: false,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (p) =>
      (selectedCategory === "Todos" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <BookOpen className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-gray-300">Blog</span>
          </div>
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient mb-4">
            CONTEÚDOS
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dicas, tutoriais e novidades sobre Free Fire e mobilador.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={post.featured ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="glass-card overflow-hidden group h-full">
                  <div
                    className={`relative bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 ${
                      post.featured ? "h-64" : "h-48"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-neon-blue/20" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                          Destaque
                        </span>
                      </div>
                    )}
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

                    <h3
                      className={`font-rajdhani font-bold group-hover:text-neon-blue transition-colors line-clamp-2 ${
                        post.featured ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mt-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-neon-blue text-sm font-medium group-hover:gap-3 transition-all">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
