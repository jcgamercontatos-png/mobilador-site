"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="w-8 h-8 border-2 border-[#118cff] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
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

  function getUsers(): { name: string; email: string; password: string }[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("jcgamer_users");
    return data ? JSON.parse(data) : [];
  }

  function saveUser(user: { name: string; email: string; password: string }) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("jcgamer_users", JSON.stringify(users));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: "error", text: "Preencha todos os campos." });
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (!name) {
        setMessage({ type: "error", text: "Preencha todos os campos." });
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres." });
        setLoading(false);
        return;
      }

      const existingUsers = getUsers();
      if (existingUsers.some((u) => u.email === email)) {
        setMessage({ type: "error", text: "Este email já está cadastrado. Faça login." });
        setLoading(false);
        return;
      }

      saveUser({ name, email, password });
    } else {
      const users = getUsers();
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        setMessage({ type: "error", text: "Email ou senha incorretos. Crie uma conta se ainda não tiver." });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/auth/site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isLogin ? "login" : "register",
          name,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Erro ao processar." });
        setLoading(false);
        return;
      }

      setMessage({
        type: "success",
        text: isLogin
          ? `Bem-vindo de volta, ${data.user.name}!`
          : "Conta criada com sucesso! Redirecionando...",
      });

      setTimeout(() => {
        const redirect = searchParams.get("redirect") || "/";
        window.location.href = redirect;
      }, 1500);
    } catch {
      setMessage({ type: "error", text: "Erro de conexão. Tente novamente." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#020a20_0%,#000000_55%)] z-0" />
      <div className="max-w-md w-full mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#060c1a] border border-[#222] rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#118cff]/10 flex items-center justify-center mx-auto mb-4 border border-[#118cff]/30">
              <Gamepad2 className="w-8 h-8 text-[#118cff]" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isLogin ? "ENTRAR" : "CRIAR CONTA"}
            </h1>
            <p className="text-[#a0a0a0] text-sm mt-2">
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
                    ? "bg-green-500/10 border border-green-500/30 text-green-400"
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
                  <label className="block text-sm text-[#a0a0a0] mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-[#111] border border-[#333] rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#118cff] transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm text-[#a0a0a0] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-[#111] border border-[#333] rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#118cff] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#a0a0a0] mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full bg-[#111] border border-[#333] rounded-lg pl-10 pr-10 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#118cff] transition-colors"
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
              className="w-full bg-[#118cff] text-white py-3 rounded-lg font-semibold hover:bg-[#35b8ff] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
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
