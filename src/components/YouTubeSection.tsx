"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube, Play, Eye, ThumbsUp, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
  duration: string;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "CONFIG SENSIBILIDADE PERFEITA PARA MOBILADOR 2024",
    thumbnail: "",
    views: "250K",
    date: "há 2 dias",
    duration: "15:30",
  },
  {
    id: "2",
    title: "TOP 10 MACETES QUE VOCÊ NÃO SABIA NO FREE FIRE",
    thumbnail: "",
    views: "180K",
    date: "há 5 dias",
    duration: "12:45",
  },
  {
    id: "3",
    title: "COMO JOGAR FREE FIRE COM TECLADO E MOUSE NO CELULAR",
    thumbnail: "",
    views: "500K",
    date: "há 1 semana",
    duration: "20:10",
  },
  {
    id: "4",
    title: "MELHORES PERIFÉRICOS PARA MOBILADOR EM 2024",
    thumbnail: "",
    views: "120K",
    date: "há 2 semanas",
    duration: "18:20",
  },
];

export function YouTubeSection() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-300">Meu Canal</span>
          </div>
          <h2 className="section-title">FREE FIRE YOUTUBE</h2>
          <p className="section-subtitle">
            Assista meus vídeos mais recentes com dicas, configurações e
            gameplay de Free Fire mobilador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-video bg-dark-700 overflow-hidden">
                {video.thumbnail ? (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-500/20 to-dark-700">
                    <Youtube className="w-12 h-12 text-red-500/50" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-xs font-medium">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-rajdhani font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views} views
                  </span>
                  <span>{video.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="https://youtube.com/@mobilador"
            target="_blank"
            className="btn-red inline-flex items-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            Inscrever-se no Canal
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
