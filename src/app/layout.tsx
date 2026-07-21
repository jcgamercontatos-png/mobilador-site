import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "JCGAMER | Loja Gamer & Periféricos",
  description:
    "JCGAMER - Periféricos gamer, teclado e mouse para Free Fire. Dicas, gameplay e configurações. Inscreva-se no canal @Jcgamerofc no YouTube.",
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
    title: "JCGAMER | Loja Gamer & Periféricos",
    description:
      "Periféricos gamer selecionados para elevar seu gameplay. Acesse nossa loja e inscreva-se no canal!",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
