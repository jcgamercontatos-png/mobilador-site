"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";

export default function APKErroPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4">
        <div className="glass-card p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="font-orbitron font-bold text-2xl mb-4 text-red-500">
            PAGAMENTO NÃO REALIZADO
          </h1>
          <p className="text-gray-400 mb-8">
            O pagamento não foi concluído. Se você já efetuou o pagamento, aguarde
            alguns minutos e tente novamente.
          </p>
          <Link
            href="/apk"
            className="btn-neon inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Tentar Novamente
          </Link>
          <br />
          <button
            onClick={() => {
              const msg = encodeURIComponent("Olá! Tentei comprar o APK JCGAMERFPS mas o pagamento não foi concluído. Preciso de ajuda.");
              window.open(`https://wa.me/5521973199886?text=${msg}`, "_blank");
            }}
            className="btn-green inline-flex items-center gap-2 mt-4"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
