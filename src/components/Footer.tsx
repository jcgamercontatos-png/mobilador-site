"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  MessageCircle,
  Mail,
} from "lucide-react";

const footerLinks = {
  conteudo: [
    { label: "YouTube", href: "https://youtube.com/@mobilador" },
    { label: "Comunidade", href: "/comunidade" },
  ],
  suporte: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contato", href: "mailto:contato@mobilador.com.br" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Privacidade", href: "/privacidade" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#333333] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-[#e50914] flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="font-bold text-lg text-white">JCGAMERFPS</span>
            </Link>
            <p className="text-[#CCCCCC] text-sm leading-relaxed mb-6 max-w-md">
              Domine o Free Fire com teclado e mouse. Aprenda as melhores configurações de sensibilidade e técnicas de gameplay.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Youtube, href: "https://youtube.com/@mobilador" },
                { icon: Instagram, href: "https://instagram.com/mobilador" },
                { icon: MessageCircle, href: "https://wa.me/5521973199886" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-[#1a1a1a] flex items-center justify-center text-[#CCCCCC] hover:text-[#ffffff] transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-3">
                {title === "conteudo" ? "Conteúdo" : "Suporte"}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#CCCCCC] hover:text-[#ffffff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#777777]">
            <Mail className="w-3 h-3" />
            <span>contato@mobilador.com.br</span>
          </div>
          <p className="text-xs text-[#777777] text-center">
            © 2026 Mobilador. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
