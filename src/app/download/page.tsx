"use client";

import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API = "https://mobilador-api.vercel.app/api/site/downloads";

type DownloadItem = {
  id: number | string;
  title: string;
  description?: string;
  url: string;
  version?: string;
  file_size?: string;
  image?: string;
  is_active?: boolean;
};

const fallbackDownloads: DownloadItem[] = [
  {
    id: "gg-mouse-pro",
    title: "GG Mouse Pro",
    description: "Aplicativo para configurar sua experiência com teclado e mouse no celular.",
    url: "https://play.google.com/store/apps/details?id=com.zjx.ztezscreenshot&pcampaignid=web_share",
  },
];

export default function DownloadPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>(fallbackDownloads);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const activeDownloads = data.filter((item: DownloadItem) => item.is_active !== false);
        if (activeDownloads.length) setDownloads(activeDownloads);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="site-page">
      <div className="page-shell">
        <section className="text-center">
          <span className="eyebrow">
            <Download className="h-3 w-3" />
            Download
          </span>
          <h1 className="route-title mx-auto mt-3 max-w-3xl">Central de downloads</h1>
          <p className="body-copy mx-auto mt-3 max-w-2xl">
            Aplicativos, APKs e ferramentas JCGAMER reunidos em uma página simples e sem distrações.
          </p>
        </section>

        <section className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
          {downloads.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-media min-h-44 sm:min-h-56">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={220}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#118cff]/30 bg-[#118cff]/[0.08] shadow-[0_0_28px_rgba(17,140,255,.12)]">
                    <Download className="h-7 w-7 text-[#35b8ff]" />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow min-h-6 px-2 py-1">Download</span>
                  {item.version && <span className="text-xs text-[#85858b]">Versão {item.version}</span>}
                  {item.file_size && <span className="text-xs text-[#85858b]">• {item.file_size}</span>}
                </div>
                <h2 className="mt-3 text-xl font-extrabold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#9d9da2]">
                  {item.description || "Arquivo disponível para download."}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button mt-5 w-full"
                >
                  <Download className="h-3.5 w-3.5" />
                  Baixar agora
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {loading && (
          <p className="mt-3 text-center text-xs text-[#77777d]" role="status">
            Atualizando a lista de downloads…
          </p>
        )}

        <div className="mt-5 text-center">
          <Link href="/" className="text-sm font-bold text-[#a8a8ad] hover:text-white">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
