"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-dark-900 to-neon-purple/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            PRONTO PARA{" "}
            <span className="text-gradient neon-text">DOMINAR</span>
            <br />
            O MOBILADOR?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Junte-se a milhares de jogadores que já transformaram seu
            gameplay. Comece agora mesmo!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cursos/sensibilidade-pro"
              className="btn-neon text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/5521973199886"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
