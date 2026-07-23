"use client";

import { ExternalLink, Play, Youtube } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
};

export default function CanalPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/youtube")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setVideos(Array.isArray(data?.videos) ? data.videos.slice(0, 6) : []))
      .catch(() => {});
  }, []);

  return (
    <div className="site-page">
      <div className="page-shell">
        <section className="panel grid items-center gap-4 p-5 sm:p-6 md:grid-cols-[110px_minmax(0,1fr)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#118cff]/50 bg-[#118cff]/[0.08] font-['Oxanium'] text-xl font-extrabold shadow-[0_0_28px_rgba(17,140,255,.15)] md:h-24 md:w-24">
            JC
          </div>
          <div className="min-w-0">
            <span className="eyebrow">Canal</span>
            <h1 className="route-title mt-2">JCGAMER</h1>
            <p className="mt-1 text-sm font-bold text-[#85858b]">@Jcgamerofc</p>
            <p className="body-copy mt-2 max-w-3xl">
              Dicas, gameplay, configurações e conteúdo de Free Fire para melhorar seu desempenho.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.youtube.com/@Jcgamerofc"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                <Youtube className="h-3.5 w-3.5" />
                Inscreva-se
              </a>
              <a
                href="https://www.youtube.com/@Jcgamerofc/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                Abrir vídeos
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { value: "10K+", label: "Inscritos" },
            { value: "100+", label: "Vídeos" },
            { value: "1M+", label: "Visualizações" },
          ].map((stat) => (
            <article key={stat.label} className="compact-panel border-l-2 border-l-[#118cff] p-3 sm:p-4">
              <strong className="font-['Oxanium'] text-base font-extrabold sm:text-xl">{stat.value}</strong>
              <p className="mt-1 truncate text-[11px] text-[#8f8f95] sm:text-sm">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="section-block grid gap-3 lg:grid-cols-[1.65fr_0.75fr]">
          <div className="compact-panel overflow-hidden p-2.5 sm:p-3">
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=UU835FbsSjT9bDt6os1nuu7g"
                title="Vídeos do canal JCGAMER"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </div>
          <aside className="panel flex flex-col justify-center p-5">
            <span className="eyebrow">Em destaque</span>
            <h2 className="section-title mt-3">Conteúdo direto</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9d9da2]">
              Tutoriais, configurações e novidades sem enrolação. Assista pelo site ou abra o canal completo.
            </p>
            <a
              href="https://www.youtube.com/@Jcgamerofc/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button mt-4 w-fit"
            >
              Ver todos os vídeos
            </a>
          </aside>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Últimos vídeos</span>
              <h2 className="section-title mt-2">Mais no canal</h2>
            </div>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compact-panel group overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#111]">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/40">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#118cff]">
                        <Play className="h-3.5 w-3.5 fill-white text-white" />
                      </span>
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{video.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="compact-panel px-4 py-8 text-center">
              <Youtube className="mx-auto h-6 w-6 text-[#35b8ff]" />
              <p className="mt-2 text-sm text-[#9d9da2]">Os vídeos mais recentes estão disponíveis no YouTube.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
