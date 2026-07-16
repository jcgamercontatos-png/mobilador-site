"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Gamepad2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  password: string;
}

function getUsers(): UserData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("mobilador_users");
  return data ? JSON.parse(data) : [];
}

function saveUser(user: UserData) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("mobilador_users", JSON.stringify(users));
}

function findUser(email: string, password: string): UserData | null {
  const users = getUsers();
  return (
    users.find((u) => u.email === email && u.password === password) || null
  );
}

function setCurrentUser(user: UserData) {
  localStorage.setItem("mobilador_current_user", JSON.stringify(user));
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      if (isLogin) {
        if (!email || !password) {
          setMessage({ type: "error", text: "Preencha todos os campos." });
          setLoading(false);
          return;
        }

        const user = findUser(email, password);
        if (user) {
          setCurrentUser(user);
          setMessage({
            type: "success",
            text: `Bem-vindo de volta, ${user.name}!`,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          setMessage({
            type: "error",
            text: "Email ou senha incorretos. Crie uma conta se ainda não tiver.",
          });
        }
      } else {
        if (!name || !email || !password) {
          setMessage({ type: "error", text: "Preencha todos os campos." });
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setMessage({
            type: "error",
            text: "A senha deve ter pelo menos 6 caracteres.",
          });
          setLoading(false);
          return;
        }

        const existingUsers = getUsers();
        if (existingUsers.some((u) => u.email === email)) {
          setMessage({
            type: "error",
            text: "Este email já está cadastrado. Faça login.",
          });
          setLoading(false);
          return;
        }

        const newUser = { name, email, password };
        saveUser(newUser);
        setCurrentUser(newUser);
        setMessage({
          type: "success",
          text: "Conta criada com sucesso! Redirecionando...",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
      setLoading(false);
    }, 800);
  };

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

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
                  message.type === "success"
                    ? "bg-neon-green/10 border border-neon-green/30 text-neon-green"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
              disabled={loading}
              className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Entrar" : "Criar Conta"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(null);
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
            >
              {isLogin
                ? "Não tem conta? Criar conta"
                : "Já tem conta? Entrar"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
