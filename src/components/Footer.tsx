"use client";

import Link from "next/link";
import { Instagram, Mail, MessageCircle, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/loja" },
  { label: "Periféricos", href: "/loja?categoria=Perif%C3%A9ricos" },
  { label: "Free Fire", href: "/loja?categoria=Free%20Fire" },
  { label: "Download", href: "/download" },
  { label: "Canal", href: "/canal" },
];

export function Footer() {
  const [settings, setSettings] = useState({
    siteName: "JCGAMER",
    profileImage: "",
    heroDescription:
      "Produtos digitais, periféricos e conteúdo para melhorar seu gameplay no Free Fire.",
    youtubeUrl: "https://www.youtube.com/@Jcgamerofc",
    instagramUrl: "https://www.instagram.com/jcgamerofc/",
    whatsappUrl: "https://wa.me/5521973199886",
  });

  useEffect(() => {
    fetch("/api/site/settings")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (data.settings) {
          setSettings((current) => ({ ...current, ...data.settings }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-white/[0.08] bg-[#020714]">
      <div className="page-shell py-8 md:py-10">
        <div className="grid gap-7 md:grid-cols-[1.45fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="JCGAMER - Início">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-[#118cff]/[0.45] bg-[#118cff]/10 font-['Oxanium'] text-sm font-extrabold">
                {settings.profileImage ? (
                  <img src={settings.profileImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  "JC"
                )}
              </span>
              <span className="font-['Oxanium'] text-base font-extrabold tracking-[0.1em]">
                {settings.siteName}
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#9b9ba0]">
              {settings.heroDescription}
            </p>
            <div className="mt-4 flex gap-2">
              {[
                { label: "YouTube", icon: Youtube, href: settings.youtubeUrl },
                { label: "Instagram", icon: Instagram, href: settings.instagramUrl },
                { label: "WhatsApp", icon: MessageCircle, href: settings.whatsappUrl },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-[#b7b7bb] transition-colors hover:border-[#118cff]/[0.45] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.12em] text-[#59ceff]">
              Loja e conteúdo
            </h2>
            <nav className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-1" aria-label="Links do rodapé">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#a7a7ab] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.12em] text-[#59ceff]">
              Contato
            </h2>
            <div className="mt-3 space-y-2.5">
              <a
                href="mailto:jcgamercontatos@gmail.com"
                className="flex min-w-0 items-center gap-2 text-sm text-[#a7a7ab] hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#35b8ff]" />
                <span className="truncate">jcgamercontatos@gmail.com</span>
              </a>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#a7a7ab] hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#35b8ff]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-white/[0.07] pt-4 text-center text-xs text-[#727278] md:text-left">
          © 2026 {settings.siteName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
