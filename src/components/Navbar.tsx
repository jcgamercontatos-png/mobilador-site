"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

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
  const { totalItems, openCart } = useCart();
  const [settings, setSettings] = useState({
    siteName: "JCGAMER",
    profileImage: "",
    youtubeUrl: "https://www.youtube.com/@Jcgamerofc",
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#020714]/95 backdrop-blur-xl">
      <div className="page-shell flex h-[58px] items-center justify-between gap-3 md:h-16">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="JCGAMER - Início">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#118cff]/[0.45] bg-[#118cff]/10 font-['Oxanium'] text-sm font-extrabold text-white shadow-[0_0_18px_rgba(17,140,255,0.16)]">
            {settings.profileImage ? (
              <img src={settings.profileImage} alt="" className="h-full w-full object-cover" />
            ) : (
              "JC"
            )}
          </span>
          <span className="truncate font-['Oxanium'] text-sm font-extrabold tracking-[0.1em] text-white sm:text-base">
            {settings.siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "bg-[#118cff]/[0.14] text-white"
                    : "text-[#a7a7ab] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-[#c6c6c9] transition-colors hover:border-[#118cff]/50 hover:text-white"
            aria-label={`Abrir carrinho${totalItems ? ` com ${totalItems} item(ns)` : ""}`}
          >
            <ShoppingBag className="h-[17px] w-[17px]" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#118cff] px-1 text-[9px] font-extrabold text-white">
                {totalItems}
              </span>
            )}
          </button>

          <a
            href={settings.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button hidden min-h-9 px-4 lg:inline-flex"
          >
            <Youtube className="h-3.5 w-3.5" />
            Canal no YouTube
          </a>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-white/[0.08] bg-[#050b1d] px-2.5 py-2 md:hidden"
          aria-label="Navegação para celular"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-center text-sm font-bold ${
                  pathname === link.href
                    ? "bg-[#118cff]/[0.14] text-white"
                    : "bg-white/[0.025] text-[#b7b7bb]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={settings.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button mt-2 w-full"
          >
            <Youtube className="h-3.5 w-3.5" />
            Canal no YouTube
          </a>
        </nav>
      )}
    </header>
  );
}
