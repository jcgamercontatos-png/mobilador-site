"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Download,
  Shield,
  Zap,
  Check,
  Lock,
  Star,
  Users,
  MessageCircle,
  Clock,
  CreditCard,
  Settings,
} from "lucide-react";

const MERCADO_PAGO_LINK = "https://mpago.la/1rXKWUh";

export default function APKPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6">
              <Smartphone className="w-5 h-5 text-neon-blue" />
              <span className="text-sm text-neon-blue font-medium">
                APK Exclusivo
              </span>
            </div>

            <h1 className="font-orbitron font-bold text-3xl md:text-5xl mb-4">
              APK{" "}
              <span className="text-gradient">JCGAMERFPS</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              APK exclusivo com todas as configurações profissionais do JCGAMERFPS.
              Sensibilidade perfeita, ajustes de mira e otimizações que vão elevar
              seu jogo a outro nível. Download instantâneo após pagamento!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, title: "Performance Otimizada", desc: "Configurações que maximizam o FPS e reduzem lag" },
                { icon: Shield, title: "100% Seguro", desc: "APK testado e sem vírus. Seguro para seu dispositivo" },
                { icon: Settings, title: "Configurações Profissionais", desc: "Sensibilidade e ajustes usados por players pro" },
                { icon: Download, title: "Download Instantâneo", desc: "Receba o APK imediatamente após o pagamento" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                4.9 avaliação
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                300+ downloads
              </span>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-orbitron font-bold text-lg mb-4">
                O QUE VOCÊ VAI RECEBER
              </h3>
              <div className="space-y-3">
                {[
                  "APK com configurações profissionais",
                  "Sensibilidade otimizada para mobilador",
                  "Ajustes de mira personalizados",
                  "Otimização de performance e FPS",
                  "Guia de instalação passo a passo",
                  "Suporte via WhatsApp",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neon-blue" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="glass-card p-8 neon-border">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-blue to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-orbitron font-bold text-2xl">
                  APK JCGAMERFPS
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Download Instantâneo
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="font-orbitron font-bold text-5xl text-gradient">
                  R$ 25,00
                </div>
                <span className="text-neon-green text-sm">
                  Pagamento único • Acesso vitalício
                </span>
              </div>

              <a
                href={MERCADO_PAGO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon w-full flex items-center justify-center gap-2 mb-4 text-lg py-4"
              >
                <CreditCard className="w-5 h-5" />
                Comprar Agora
              </a>

              <button
                onClick={() => {
                  const msg = encodeURIComponent("Olá! Vim pelo site JCGAMERFPS. Tenho dúvidas sobre o APK");
                  window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
                }}
                className="btn-green w-full flex items-center justify-center gap-2 mb-6"
              >
                <MessageCircle className="w-4 h-4" />
                Tirar Dúvidas no WhatsApp
              </button>

              <div className="space-y-3 text-sm mb-6">
                {[
                  "Download imediato após pagamento",
                  "Pagamento via PIX ou Cartão",
                  "Suporte via WhatsApp",
                  "Garantia de 7 dias",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Check className="w-4 h-4 text-neon-green" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-neon-green" />
                  Compra 100% segura via Mercado Pago
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4 text-neon-green" />
                  Pagamento criptografado
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-neon-green" />
                  Acesso em segundos
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
