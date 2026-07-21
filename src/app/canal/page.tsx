"use client";

import { motion } from "framer-motion";
import { Youtube, ExternalLink } from "lucide-react";

export default function CanalPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e50914]/40 bg-[#e50914]/10 mb-4">
            <Youtube className="w-4 h-4 text-[#e50914]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#e50914]">
              YouTube
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Canal <span className="text-[#e50914]">JCGAMER</span>
          </h1>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
            Dicas, gameplay e configurações de Free Fire. Inscreva-se e ative o sininho!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="aspect-video rounded-lg overflow-hidden border border-[#333]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/videoseries?list=UU835FbsSjT9bDt6os1nuu7g"
              title="JCGAMER - YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@Jcgamerofc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#e50914] text-white px-8 py-3 rounded font-semibold hover:bg-[#f40612] transition-colors"
            >
              <Youtube className="w-5 h-5" />
              Inscreva-se no Canal
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Inscritos", value: "10K+" },
              { label: "Vídeos", value: "100+" },
              { label: "Visualizações", value: "1M+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0d0d0d] border border-[#222] rounded-lg p-6 text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-[#777] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
