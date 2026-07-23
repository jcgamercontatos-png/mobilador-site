"use client";

import { ExternalLink, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";

type Placement = "HOME_TOP" | "HOME_PRODUCTS" | "STORE_TOP";

type Advertisement = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  placement: Placement;
  active: boolean;
};

export function ManagedAd({ placement }: { placement: Placement }) {
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);

  useEffect(() => {
    fetch(`/api/site/ads?placement=${placement}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setAdvertisement(data.ads?.[0] || null))
      .catch(() => setAdvertisement(null));
  }, [placement]);

  if (!advertisement) return null;

  const content = (
    <div className="group relative overflow-hidden rounded-2xl border border-[#ff2530]/25 bg-[#111113]">
      {advertisement.imageUrl && (
        <img
          src={advertisement.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0d] via-[#0b0b0d]/90 to-[#0b0b0d]/35" />
      <div className="relative flex min-h-28 items-center justify-between gap-4 p-4 sm:min-h-32 sm:p-5">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#ff6870]">
            <Megaphone className="h-3 w-3" />
            Anúncio
          </span>
          <h2 className="mt-2 text-lg font-extrabold text-white sm:text-xl">
            {advertisement.title}
          </h2>
          {advertisement.description && (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#b0b0b5]">
              {advertisement.description}
            </p>
          )}
        </div>
        {advertisement.targetUrl && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff2530] text-white">
            <ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );

  return advertisement.targetUrl ? (
    <a
      href={advertisement.targetUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="mt-3 block"
    >
      {content}
    </a>
  ) : (
    <div className="mt-3">{content}</div>
  );
}

