"use client";

import Link from "next/link";
import {
  Gamepad2,
  Youtube,
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  loja: [
    { label: "Periféricos Gamer", href: "/loja?cat=perifericos" },
    { label: "Cursos Online", href: "/cursos" },
    { label: "Pack Mobilador", href: "/pack-mobilador" },
    { label: "Ofertas", href: "/loja?sort=sale" },
  ],
  conteudo: [
    { label: "Blog", href: "/blog" },
    { label: "YouTube", href: "https://youtube.com/@mobilador" },
    { label: "Comunidade", href: "/comunidade" },
    { label: "Calculadora", href: "/calculadora" },
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
    <footer className="relative bg-dark-900 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-dark-900" />
              </div>
              <span className="font-orbitron font-bold text-xl text-gradient">
                MOBILADOR
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Domine o Free Fire com teclado e mouse. Aprenda as melhores
              configurações de sensibilidade, techniques de gameplay e alcance
              o nível profissional no mobilador.
            </p>

            <div className="flex gap-3">
              {[
                { icon: Youtube, href: "https://youtube.com/@mobilador", color: "hover:text-red-500" },
                { icon: Instagram, href: "https://instagram.com/mobilador", color: "hover:text-pink-500" },
                { icon: MessageCircle, href: "https://wa.me/5500000000000", color: "hover:text-green-500" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 ${social.color} transition-all hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-white mb-4">
                {title === "loja"
                  ? "Loja"
                  : title === "conteudo"
                  ? "Conteúdo"
                  : "Suporte"}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-neon-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Mail className="w-4 h-4" />
            <span>contato@mobilador.com.br</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Mobilador. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
