"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  Smartphone,
  Mouse,
  Monitor,
  Zap,
  ArrowRight,
  Settings,
} from "lucide-react";

const devices = [
  "Samsung Galaxy S21",
  "Samsung Galaxy S22",
  "Samsung Galaxy S23",
  "Xiaomi Redmi Note 11",
  "Xiaomi Poco X4",
  "iPhone 13",
  "iPhone 14",
  "Realme GT",
  "OnePlus 9",
  "Outro",
];

const playStyles = [
  { label: "Rush", description: "Agressivo, sempre atacando" },
  { label: "Estratégico", description: "Posicionamento tático" },
  { label: "Sniper", description: "Longa distância" },
  { label: "Suporte", description: "Ajudando o time" },
];

export function CalculatorPreview() {
  const [device, setDevice] = useState("");
  const [dpi, setDpi] = useState(800);
  const [screenSize, setScreenSize] = useState(6.5);
  const [fps, setFps] = useState(60);
  const [playStyle, setPlayStyle] = useState("");

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calculator className="w-5 h-5 text-neon-green" />
            <span className="text-sm text-gray-300">Ferramenta</span>
          </div>
          <h2 className="section-title">CALCULADORA DE SENSIBILIDADE</h2>
          <p className="section-subtitle">
            Descubra a configuração perfeita para o seu dispositivo e estilo de
            jogo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 neon-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Modelo do Celular
                  </label>
                  <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-neon-blue focus:outline-none transition-colors"
                  >
                    <option value="">Selecione seu dispositivo</option>
                    {devices.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mouse className="w-4 h-4 inline mr-2" />
                    DPI do Mouse: {dpi}
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="16000"
                    step="100"
                    value={dpi}
                    onChange={(e) => setDpi(Number(e.target.value))}
                    className="w-full accent-neon-blue"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>200</span>
                    <span>16000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Monitor className="w-4 h-4 inline mr-2" />
                    Tamanho da Tela: {screenSize}&quot;
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="0.1"
                    value={screenSize}
                    onChange={(e) => setScreenSize(Number(e.target.value))}
                    className="w-full accent-neon-purple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Zap className="w-4 h-4 inline mr-2" />
                    FPS do Jogo: {fps}
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    step="10"
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-full accent-neon-green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Estilo de Jogo
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {playStyles.map((style) => (
                      <button
                        key={style.label}
                        onClick={() => setPlayStyle(style.label)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          playStyle === style.label
                            ? "bg-neon-blue/20 border border-neon-blue/50"
                            : "glass hover:bg-white/5"
                        }`}
                      >
                        <p className="text-sm font-medium">{style.label}</p>
                        <p className="text-xs text-gray-500">
                          {style.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-orbitron font-bold text-lg text-center mb-6 text-gradient">
                    SUA CONFIGURAÇÃO
                  </h3>

                  <div className="space-y-4">
                    {[
                      { label: "Sensibilidade Geral", value: "85%", icon: "🎯" },
                      { label: "Sensibilidade Red Dot", value: "72%", icon: "🔴" },
                      { label: "Sensibilidade 2x", value: "65%", icon: "🔭" },
                      { label: "Sensibilidade 4x", value: "45%", icon: "🔭" },
                      { label: "DPI Recomendado", value: `${dpi}`, icon: "🖱️" },
                      { label: "Velocidade Free Look", value: "100%", icon: "👁️" },
                    ].map((config, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-dark-700"
                      >
                        <span className="flex items-center gap-2 text-sm text-gray-300">
                          <span>{config.icon}</span>
                          {config.label}
                        </span>
                        <span className="font-orbitron font-bold text-neon-blue">
                          {config.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-neon-green/10 border border-neon-green/20 text-center">
                    <Settings className="w-6 h-6 text-neon-green mx-auto mb-2" />
                    <p className="text-sm text-gray-300">
                      Configuração baseada no seu perfil
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ajuste fino pode ser necessário
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/calculadora"
                className="btn-neon inline-flex items-center gap-2"
              >
                Calculadora Completa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
