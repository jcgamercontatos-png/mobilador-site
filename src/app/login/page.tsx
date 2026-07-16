"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 neon-border"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-neon flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8 text-dark-900" />
            </div>
            <h1 className="font-orbitron font-bold text-2xl">
              {isLogin ? "ENTRAR" : "CRIAR CONTA"}
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {isLogin
                ? "Acesse sua conta para continuar"
                : "Crie sua conta gratuitamente"}
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
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
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-neon w-full flex items-center justify-center gap-2"
            >
              {isLogin ? "Entrar" : "Criar Conta"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
            >
              {isLogin
                ? "Não tem conta? Criar conta"
                : "Já tem conta? Entrar"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-center text-xs text-gray-500 mb-4">
              Ou entre com
            </p>
            <button className="w-full flex items-center justify-center gap-3 glass py-3 rounded-lg hover:bg-white/5 transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Entrar com Google
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
