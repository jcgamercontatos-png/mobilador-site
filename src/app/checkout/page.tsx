"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Lock,
  Check,
  ArrowLeft,
  MessageCircle,
  Tag,
  Truck,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "JCGAMER10") {
      setCouponApplied(true);
    }
  };

  const subtotal = 49.9;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/loja"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-orbitron font-bold text-3xl mb-8">CHECKOUT</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h2 className="font-orbitron font-bold text-lg mb-4">
                  DADOS PESSOAIS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="font-orbitron font-bold text-lg mb-4">
                  FORMA DE PAGAMENTO
                </h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { key: "pix", label: "PIX" },
                    { key: "card", label: "Cartão" },
                    { key: "boleto", label: "Boleto" },
                  ].map((method) => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        paymentMethod === method.key
                          ? "bg-neon-blue/20 border border-neon-blue/50 text-neon-blue"
                          : "glass text-gray-400"
                      }`}
                    >
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === "pix" && (
                  <div className="glass p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-300 mb-2">
                      Pagamento instantâneo via PIX
                    </p>
                    <p className="text-xs text-gray-500">
                      Após finalizar, você receberá o QR Code para pagamento
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Número do cartão
                      </label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          Validade
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="000"
                          className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="glass-card p-6">
                <h2 className="font-orbitron font-bold text-lg mb-4">
                  CUPOM DE DESCONTO
                </h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Digite seu cupom"
                    className="flex-1 bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                  />
                  <button
                    onClick={applyCoupon}
                    className="btn-outline flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-neon-green text-sm mt-2">
                    Cupom aplicado! 10% de desconto
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="font-orbitron font-bold text-lg mb-6">
                  RESUMO
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm font-medium">Sensibilidade Pro</p>
                    <p className="text-xs text-gray-500">Curso online</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-neon-green">
                      <span>Desconto (10%)</span>
                      <span>-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/5 pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-orbitron font-bold text-xl text-gradient">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="btn-neon w-full flex items-center justify-center gap-2 mb-4">
                  <Lock className="w-4 h-4" />
                  Finalizar Compra
                </button>

                <button className="btn-green w-full flex items-center justify-center gap-2 mb-6">
                  <MessageCircle className="w-4 h-4" />
                  Tirar Dúvidas
                </button>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    Compra 100% segura
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-blue" />
                    Acesso imediato após pagamento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
