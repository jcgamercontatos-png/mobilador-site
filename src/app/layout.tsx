import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOBILADOR | App de Sensibilidade Free Fire",
  description:
    "MOBILADOR - O app de sensibilidade definitivo para jogar Free Fire com teclado e mouse no celular. Baixe o APK e ative sua key.",
  keywords: [
    "mobilador",
    "jcgamer",
    "free fire",
    "sensibilidade",
    "teclado e mouse",
    "apk",
  ],
  openGraph: {
    title: "MOBILADOR | App de Sensibilidade Free Fire",
    description:
      "O app de sensibilidade definitivo para Free Fire com teclado e mouse no celular.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#000000] text-[#FFFFFF] min-h-screen overflow-x-hidden">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
