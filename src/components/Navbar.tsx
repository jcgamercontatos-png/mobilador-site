"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Periféricos", href: "/loja" },
  { label: "Download", href: "/download" },
  { label: "Canal", href: "/canal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/90 backdrop-blur-sm border-b border-[#333333] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-[#e50914] flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-xl text-white">JCGAMER</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#e50914]"
                    : "text-[#CCCCCC] hover:text-[#FFFFFF]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#333333] bg-[#000000]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#e50914]"
                    : "text-[#CCCCCC] hover:text-[#FFFFFF]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
