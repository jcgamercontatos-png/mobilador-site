"use client";

import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Cursos",
    href: "/cursos",
  },
  {
    label: "Comunidade",
    href: "/comunidade",
  },
  {
    label: "Jogos",
    href: "/pack-mobilador",
  },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/90 backdrop-blur-sm border-b border-[#333333] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-[#e50914] flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-xl text-white">JCGAMERFPS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#CCCCCC] hover:text-[#FFFFFF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
