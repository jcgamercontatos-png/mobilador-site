"use client";

import { useEffect } from "react";

const ADSENSE_ID = "ca-pub-6149055817227270";

type Layout = "horizontal" | "vertical" | "square" | "responsive";

const SIZE_CLASS: Record<Layout, string> = {
  horizontal: "min-h-[90px] md:min-h-[120px]",
  vertical: "min-h-[600px] w-full md:w-[300px]",
  square: "min-h-[250px] md:min-h-[300px]",
  responsive: "min-h-[100px]",
};

type AdBannerProps = {
  slot?: string;
  layout?: Layout;
  className?: string;
  label?: string;
};

export default function AdBanner({
  slot,
  layout = "responsive",
  className = "",
  label = "Publicidade",
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle é injetado pelo script externo
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* silent */
    }
  }, []);

  const isResponsive = layout === "responsive";

  return (
    <div
      className={`my-4 sm:my-6 w-full flex justify-center ${className}`}
      aria-label="Espaço publicitário"
    >
      <ins
        className="adsbygoogle block w-full"
        style={{
          display: "block",
          textAlign: "center",
          maxWidth: isResponsive ? "100%" : layout === "vertical" ? "300px" : "970px",
        }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot ?? ""}
        data-ad-format={isResponsive ? "auto" : undefined}
        data-full-width-responsive={isResponsive ? "true" : undefined}
      />
    </div>
  );
}
