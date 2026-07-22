"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, closeCart, totalItems } = useCart();

  if (!totalItems) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={closeCart}
      />

      <AnimatePresence>
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-[#0d0d0d] border-l border-[#333] flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-[#333]">
            <h2 className="font-orbitron font-bold text-lg text-white">
              Carrinho ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar carrinho"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#333]"
              >
                <Link href={`/loja`} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#333]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#e50914]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded bg-[#e50914] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 rounded bg-[#e50914] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-gray-400 ml-1">
                      / {item.stock} disp.
                    </span>
                  </div>

                  <p className="font-orbitron font-bold text-white mt-2">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-[#333] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold text-white">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotal)}
              </span>
            </div>

            {items.length > 1 && (
              <button
                onClick={clearCart}
                className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Limpar carrinho
              </button>
            )}

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#e50914] text-white py-3 rounded-lg font-semibold text-center hover:bg-[#f40612] transition-colors"
            >
              Finalizar Compra
            </Link>

            <Link
              href="/loja"
              onClick={closeCart}
              className="block w-full text-center text-sm text-gray-400 hover:text-white transition-colors mt-2"
            >
              Continuar comprando
            </Link>
          </div>
        </motion.aside>
      </AnimatePresence>
    </AnimatePresence>
  );
}