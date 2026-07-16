"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Smartphone,
  MessageCircle,
  ArrowRight,
  Shield,
} from "lucide-react";

const GOOGLE_DRIVE_LINK = process.env.NEXT_PUBLIC_APK_DOWNLOAD_LINK || "#";

export default function APKSuccessPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center neon-border"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-neon-green" />
          </motion.div>

          <h1 className="font-orbitron font-bold text-2xl md:text-3xl mb-4 text-gradient">
            PAGAMENTO APROVADO!
          </h1>

          <p className="text-gray-400 mb-8">
            Seu pagamento foi confirmado com sucesso. Clique no botão abaixo para
            baixar seu APK JCGAMERFPS.
          </p>

          <a
            href={GOOGLE_DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon w-full flex items-center justify-center gap-2 mb-4 text-lg py-4"
          >
            <Download className="w-5 h-5" />
            BAIXAR APK AGORA
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="glass-card p-4 mb-6 text-left">
            <h3 className="font-orbitron text-sm font-semibold mb-3 text-gray-300">
              INSTRUÇÕES DE INSTALAÇÃO
            </h3>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-neon-blue font-bold">1.</span>
                Baixe o APK clicando no botão acima
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-blue font-bold">2.</span>
                Vá em Configurações &gt; Segurança &gt;-fontes desconhecidas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-blue font-bold">3.</span>
                Ative a opção "Fontes desconhecidas"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-blue font-bold">4.</span>
                Abra o arquivo APK baixado e instale
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-blue font-bold">5.</span>
                Abra o app e configure conforme o guia
              </li>
            </ol>
          </div>

          <button
            onClick={() => {
              const msg = encodeURIComponent("Olá! Comprei o APK JCGAMERFPS pelo site. Preciso de ajuda com a instalação.");
              window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
            }}
            className="btn-green w-full flex items-center justify-center gap-2 mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            Precisa de ajuda? Fale no WhatsApp
          </button>

          <div className="pt-6 border-t border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 justify-center">
              <Shield className="w-4 h-4 text-neon-green" />
              APK 100% seguro e testado
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 justify-center">
              <Smartphone className="w-4 h-4 text-neon-green" />
              Compatível com Android 7.0+
            </div>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-neon-blue transition-colors"
          >
            ← Voltar para o site
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
