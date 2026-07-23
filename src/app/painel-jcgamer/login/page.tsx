"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("jcgamer");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
      router.replace("/painel-jcgamer");
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Não foi possível entrar.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020714] px-4 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,#28070a_0%,#020714_48%)]" />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#060b18]/95 p-5 shadow-2xl sm:p-7"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#118cff]/35 bg-[#118cff]/10">
          <ShieldCheck className="h-5 w-5 text-[#35b8ff]" />
        </div>
        <p className="mt-5 font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.14em] text-[#43c7ff]">
          Acesso exclusivo
        </p>
        <h1 className="mt-2 font-['Oxanium'] text-2xl font-extrabold">
          Painel JCGAMER
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#99999f]">
          Use a senha administrativa para controlar o conteúdo do seu site.
        </p>

        <label className="mt-6 block text-sm font-bold text-[#c7c7cb]" htmlFor="username">
          Usuário
        </label>
        <div className="relative mt-2">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77777d]" />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="input-dark min-h-11 pl-10"
            autoComplete="username"
            required
            autoFocus
          />
        </div>

        <label className="mt-4 block text-sm font-bold text-[#c7c7cb]" htmlFor="password">
          Senha administrativa
        </label>
        <div className="relative mt-2">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77777d]" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-dark min-h-11 pl-10 pr-11"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#89898f] hover:bg-white/5 hover:text-white"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && (
          <p className="mt-3 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="primary-button mt-5 w-full disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar no painel"}
        </button>
      </form>
    </div>
  );
}
