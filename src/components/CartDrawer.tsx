"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    closeCart,
    totalItems,
    isCartOpen,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeCart, isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] cursor-default bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[390px] flex-col border-l border-white/[0.1] bg-[#050b1d]"
            aria-label="Carrinho de compras"
          >
            <div className="flex h-[58px] items-center justify-between border-b border-white/[0.08] px-4">
              <h2 className="font-['Oxanium'] text-sm font-extrabold uppercase tracking-wide text-white">
                Carrinho ({totalItems})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-[#aaaab0] hover:text-white"
                aria-label="Fechar carrinho"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5">
              {items.length === 0 ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#118cff]/25 bg-[#118cff]/[0.08]">
                    <ShoppingBag className="h-5 w-5 text-[#35b8ff]" />
                  </span>
                  <p className="mt-3 font-bold text-white">Seu carrinho está vazio</p>
                  <Link href="/loja" onClick={closeCart} className="secondary-button mt-4">
                    Ver periféricos
                  </Link>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0b1427]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain p-1"
                            unoptimized
                          />
                        ) : (
                          <ShoppingBag className="h-5 w-5 text-[#35b8ff]/[0.45]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">{item.name}</p>
                        <p className="text-xs text-[#87878d]">{item.category}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.09] text-white"
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.09] text-white disabled:cursor-not-allowed disabled:opacity-35"
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto flex h-7 w-7 items-center justify-center text-[#929298] hover:text-red-400"
                            aria-label={`Remover ${item.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-2 text-sm font-extrabold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-white/[0.08] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9a9aa0]">Subtotal</span>
                  <strong className="font-['Oxanium'] text-white">{formatPrice(subtotal)}</strong>
                </div>
                <Link href="/checkout" onClick={closeCart} className="primary-button w-full">
                  Finalizar compra
                </Link>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-[#8f8f95] hover:text-red-400"
                  >
                    Limpar carrinho
                  </button>
                  <Link href="/loja" onClick={closeCart} className="text-xs text-[#b6b6bb] hover:text-white">
                    Continuar comprando
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
