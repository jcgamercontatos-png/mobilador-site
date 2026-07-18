import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ParticleBackground } from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "JCGAMERFPS | Domine o Free Fire com Teclado e Mouse",
  description:
    "APK exclusivo, periféricos gamer e packs de configurações profissionais para mobilador e emulador Free Fire.",
  keywords: [
    "jcgamerfps",
    "free fire",
    "mobilador",
    "teclado e mouse",
    "apk",
    "sensibilidade",
    "configuração",
    "gamer",
    "periféricos",
  ],
  openGraph: {
    title: "JCGAMERFPS | Domine o Free Fire com Teclado e Mouse",
    description:
      "APK exclusivo, periféricos e packs de configurações profissionais.",
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
