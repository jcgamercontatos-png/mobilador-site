import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ParticleBackground } from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "Mobilador | Domine o Free Fire com Teclado e Mouse",
  description:
    "Aprenda a jogar Free Fire com teclado e mouse no celular. Cursos de sensibilidade, periféricos gamer e packs de configurações exclusivas.",
  keywords: [
    "mobilador",
    "free fire",
    "teclado e mouse",
    "sensibilidade",
    "configuração",
    "gamer",
    "periféricos",
  ],
  openGraph: {
    title: "Mobilador | Domine o Free Fire com Teclado e Mouse",
    description:
      "Aprenda a jogar Free Fire com teclado e mouse no celular. Cursos, periféricos e packs exclusivos.",
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
      <body className="bg-dark-900 text-white min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
