"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Download,
  Youtube,
  Instagram,
  MessageCircle,
  Mail,
  Gamepad2,
  Shield,
  KeyRound,
  Zap,
  Star,
  Send,
} from "lucide-react";

const SOCIALS = [
  {
    name: "YouTube",
    handle: "@mobilador",
    icon: Youtube,
    href: "https://youtube.com/@mobilador",
    color: "#E50914",
  },
  {
    name: "Instagram",
    handle: "@jcgamer",
    icon: Instagram,
    href: "https://instagram.com/jcgamer",
    color: "#E1306C",
  },
  {
    name: "Discord",
    handle: "Comunidade MOBILADOR",
    icon: MessageCircle,
    href: "https://discord.gg/mobilador",
    color: "#5865F2",
  },
  {
    name: "WhatsApp",
    handle: "Fale com a gente",
    icon: Send,
    href: "https://wa.me/5500000000000",
    color: "#25D366",
  },
  {
    name: "E-mail",
    handle: "contato@jcgameryt.com.br",
    icon: Mail,
    href: "mailto:contato@jcgameryt.com.br",
    color: "#E50914",
  },
];

const STATS = [
  { label: "Downloads", value: "10K+", icon: Download },
  { label: "Keys Ativas", value: "24/7", icon: KeyRound },
  { label: "Avaliação", value: "4.9", icon: Star },
  { label: "Usuários", value: "5K+", icon: Gamepad2 },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Sensibilidade Pro",
    desc: "Configurações profissionais de DPI, mirra e grip calibradas para o seu estilo.",
  },
  {
    icon: KeyRound,
    title: "Key de Acesso",
    desc: "Gere e ative sua key em segundos. Sem usuário, sem senha — só a KEY.",
  },
  {
    icon: Shield,
    title: "100% Seguro",
    desc: "APK testado, leve e sem vírus. Compatível com os principais emuladores.",
  },
  {
    icon: Gamepad2,
    title: "Free Fire + Mouse",
    desc: "Jogue Free Fire com teclado e mouse no celular com precisão de PC.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a0306_0%,#000000_55%)] z-0" />

      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#E50914] font-extrabold text-2xl tracking-tight">
              MOBILADOR
            </span>
            <span className="text-[#E50914] font-extrabold text-2xl">.</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#a0a0a0]">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
          </nav>
          <Link href="/apk" className="netflix-button !py-2 !px-5 text-sm">
            Baixar
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section id="inicio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E50914]/40 bg-[#E50914]/10 mb-6">
              <Smartphone className="w-4 h-4 text-[#E50914]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E50914]">
                App de Sensibilidade
              </span>
            </div>

            <h1 className="netflix-title mb-5">
              Domine o Free Fire com{" "}
              <span className="netflix-gradient-text">teclado e mouse</span>
            </h1>

            <p className="netflix-text text-[#a0a0a0] max-w-2xl mb-8">
              O MOBILADOR transforma seu celular em uma máquina de precisão. Baixe o
              APK, ative sua key e jogue Free Fire com a sensibilidade dos pros.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apk" className="netflix-button flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Baixar App
              </Link>
              <a
                href="https://youtube.com/@mobilador"
                target="_blank"
                rel="noopener noreferrer"
                className="netflix-button-outline flex items-center justify-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                YouTube
              </a>
            </div>

            <p className="mt-6 text-sm text-[#777] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E50914]" />
              APK seguro e testado · Ativação instantânea com sua KEY
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="relative bg-[#0d0d0d] border border-[#222] rounded-md p-5 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[#E50914]" />
                <s.icon className="w-5 h-5 text-[#E50914] mb-3" />
                <div className="font-jb text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-[#777] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        <div className="netflix-divider max-w-7xl mx-auto" />

        <section id="recursos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="netflix-header mb-8"
          >
            Tudo que o app entrega
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="netflix-card p-5 group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#E50914]/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#E50914]" />
                </div>
                <h3 className="netflix-subtitle text-white font-bold mb-2">{f.title}</h3>
                <p className="netflix-text text-[#a0a0a0] text-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contato" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0d0d0d] border border-[#222] rounded-lg p-8 lg:p-12"
          >
            <h2 className="netflix-header mb-2">Fale com a gente</h2>
            <p className="netflix-text text-[#a0a0a0] mb-8 max-w-xl">
              Tire dúvidas, receba suporte e acompanhe as novidades do MOBILADOR em
              nossas redes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-[#000] border border-[#222] rounded-md p-4 transition-all hover:border-[#E50914] hover:-translate-y-1"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${s.color}1a` }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm">{s.name}</div>
                    <div className="text-[#777] text-xs truncate">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#222] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[#E50914] font-extrabold text-xl">MOBILADOR</span>
            <span className="text-[#E50914] font-extrabold text-xl">.</span>
          </div>
          <p className="text-[#777] text-sm">
            © {new Date().getFullYear()} MOBILADOR · jcgameryt.com.br · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
