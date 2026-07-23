import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/Providers";
import AdSenseScript from "@/components/AdSenseScript";
import { SiteChrome } from "@/components/SiteChrome";

export function generateMetadata(): Metadata {
  const requestHeaders = headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "mobilador-site.vercel.app";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const siteUrl = `${protocol}://${host}`;
  const title = "JCGAMER | Produtos, Periféricos e Free Fire";
  const description =
    "Produtos digitais, periféricos, downloads e conteúdo para elevar seu gameplay no Free Fire.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "jcgamer",
      "loja gamer",
      "periféricos",
      "free fire",
      "teclado",
      "mouse",
      "headset",
      "canal youtube",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      url: siteUrl,
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1729,
          height: 910,
          alt: "JCGAMER — produtos, periféricos, downloads e vídeos",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6149055817227270" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-[#000000] text-[#FFFFFF]">
        <AdSenseScript />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
