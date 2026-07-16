"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Keyboard,
  Mouse,
  Monitor,
  Zap,
  Trophy,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";

interface LatestVideo {
  id: string;
  title: string;
  thumbnail: string;
}

export function HeroSection() {
  const [latestVideo, setLatestVideo] = useState<LatestVideo | null>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (data.videos && data.videos.length > 0) {
          setLatestVideo(data.videos[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6"
            >
              <Zap className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-neon-blue font-medium">
                #1 em Mobilador do Brasil
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              DOMINE O{" "}
              <span className="text-gradient neon-text">FREE FIRE</span>
              <br />
              NO JCGAMERFPS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Aprenda a jogar com teclado e mouse no celular, melhore sua
              sensibilidade e alcance outro nível de gameplay.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/cursos/sensibilidade-pro"
                className="btn-neon flex items-center justify-center gap-2"
              >
                Quero Aprender
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cursos"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Ver Cursos
              </Link>
              <Link
                href="/comunidade"
                className="btn-green flex items-center justify-center gap-2"
              >
                Comunidade
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { icon: Users, value: "50K+", label: "Seguidores" },
                { icon: Trophy, value: "10K+", label: "Alunos" },
                { icon: Monitor, value: "100K+", label: "Downloads" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                  <div className="font-orbitron text-2xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-neon rounded-3xl blur-3xl opacity-20" />

              <div className="relative glass-card p-8 neon-border">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-700">
                  {latestVideo ? (
                    <a
                      href={`https://youtube.com/watch?v=${latestVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative w-full h-full"
                    >
                      <Image
                        src={latestVideo.thumbnail}
                        alt={latestVideo.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-500/90 flex items-center justify-center hover:scale-110 transition-transform animate-glow-pulse">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-neon flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                          <Play className="w-8 h-8 text-dark-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <p className="text-xs text-red-500 font-orbitron font-bold uppercase mb-1">
                      Último Vídeo
                    </p>
                    <h3 className="font-rajdhani font-bold text-lg leading-tight line-clamp-2">
                      {latestVideo?.title || "Carregando..."}
                    </h3>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: Keyboard,
                      label: "Teclado",
                      value: "Mecânico RGB",
                    },
                    { icon: Mouse, label: "Mouse", value: "8000 DPI" },
                    { icon: Monitor, label: "Tela", value: "120Hz" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="glass rounded-lg p-3 text-center"
                    >
                      <item.icon className="w-5 h-5 text-neon-purple mx-auto mb-1" />
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-medium text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
