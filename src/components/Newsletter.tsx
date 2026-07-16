"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Sparkles } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-blue/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 neon-border text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-neon flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-dark-900" />
          </div>

          <h2 className="font-orbitron font-bold text-2xl md:text-3xl mb-4">
            RECEBA DICAS{" "}
            <span className="text-gradient">EXCLUSIVAS</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Cadastre-se e receba configurações atualizadas, dicas de
            sensibilidade e ofertas especiais direto no seu email.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
              required
            />
            <button
              type="submit"
              className="btn-neon flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Cadastrado!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Cadastrar
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Sem spam. Cancele quando quiser.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
