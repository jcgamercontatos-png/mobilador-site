"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Smartphone,
  Mouse,
  Monitor,
  Zap,
  Settings,
  RotateCcw,
  Copy,
  Check,
  Gamepad2,
} from "lucide-react";

const devices = [
  "Samsung Galaxy S21",
  "Samsung Galaxy S22",
  "Samsung Galaxy S23",
  "Samsung Galaxy S24",
  "Xiaomi Redmi Note 11",
  "Xiaomi Redmi Note 12",
  "Xiaomi Poco X4",
  "Xiaomi Poco X5",
  "iPhone 13",
  "iPhone 14",
  "iPhone 15",
  "Realme GT",
  "Realme 11 Pro",
  "OnePlus 9",
  "OnePlus 11",
  "Motorola Edge 40",
  "Outro",
];

const playStyles = [
  { label: "Rush", description: "Agressivo, sempre atacando", icon: "⚡" },
  { label: "Estratégico", description: "Posicionamento tático", icon: "🎯" },
  { label: "Sniper", description: "Longa distância", icon: "🔭" },
  { label: "Suporte", description: "Ajudando o time", icon: "🛡️" },
  {
    label: "Flexível",
    description: "Muda conforme a situação",
    icon: "🔄",
  },
];

function calculateSensitivity(dpi: number, screenSize: number, fps: number, style: string) {
  const dpiFactor = dpi / 800;
  const screenFactor = screenSize / 6.5;
  const fpsFactor = fps / 60;

  let generalBase = 85;
  let redDotBase = 72;
  let scope2xBase = 65;
  let scope4xBase = 45;
  let freeLookBase = 100;

  if (style === "Rush") {
    generalBase += 5;
    redDotBase += 8;
  } else if (style === "Sniper") {
    generalBase -= 10;
    redDotBase -= 5;
    scope4xBase -= 10;
  } else if (style === "Estratégico") {
    generalBase -= 3;
    redDotBase -= 2;
  }

  const general = Math.min(100, Math.max(50, Math.round(generalBase / dpiFactor * screenFactor)));
  const redDot = Math.min(100, Math.max(40, Math.round(redDotBase / dpiFactor * screenFactor)));
  const scope2x = Math.min(100, Math.max(30, Math.round(scope2xBase / dpiFactor * screenFactor)));
  const scope4x = Math.min(100, Math.max(20, Math.round(scope4xBase / dpiFactor * screenFactor)));
  const freeLook = Math.min(100, Math.max(70, Math.round(freeLookBase * fpsFactor)));

  return { general, redDot, scope2x, scope4x, freeLook };
}

export default function CalculatorPage() {
  const [device, setDevice] = useState("");
  const [dpi, setDpi] = useState(800);
  const [screenSize, setScreenSize] = useState(6.5);
  const [fps, setFps] = useState(60);
  const [playStyle, setPlayStyle] = useState("");
  const [copied, setCopied] = useState(false);

  const result = calculateSensitivity(dpi, screenSize, fps, playStyle || "Flexível");

  const handleCopy = () => {
    const text = `Configuração Mobilador:
Geral: ${result.general}%
Red Dot: ${result.redDot}%
Scope 2x: ${result.scope2x}%
Scope 4x: ${result.scope4x}%
Free Look: ${result.freeLook}%
DPI: ${dpi}
Dispositivo: ${device || "N/A"}
Estilo: ${playStyle || "Flexível"}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setDevice("");
    setDpi(800);
    setScreenSize(6.5);
    setFps(60);
    setPlayStyle("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calculator className="w-5 h-5 text-neon-green" />
            <span className="text-sm text-gray-300">Ferramenta</span>
          </div>
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient mb-4">
            CALCULADORA DE SENSIBILIDADE
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Configure seus dados e receba a sensibilidade perfeita para o seu
            dispositivo e estilo de jogo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-8 neon-border">
              <h2 className="font-orbitron font-bold text-xl mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-neon-blue" />
                CONFIGURAÇÕES
              </h2>

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
                    DPI do Mouse: <span className="text-neon-blue font-bold">{dpi}</span>
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
                    Tamanho da Tela:{" "}
                    <span className="text-neon-purple font-bold">
                      {screenSize.toFixed(1)}"
                    </span>
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
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4"</span>
                    <span>12"</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Zap className="w-4 h-4 inline mr-2" />
                    FPS do Jogo:{" "}
                    <span className="text-neon-green font-bold">{fps}</span>
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
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30</span>
                    <span>120</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Gamepad2 className="w-4 h-4 inline mr-2" />
                    Estilo de Jogo
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        <span className="text-lg">{style.icon}</span>
                        <p className="text-sm font-medium mt-1">{style.label}</p>
                        <p className="text-xs text-gray-500">
                          {style.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleReset} className="btn-outline flex-1 flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Resetar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-8 neon-border flex-1">
              <h2 className="font-orbitron font-bold text-xl mb-6 text-center text-gradient">
                SUA CONFIGURAÇÃO
              </h2>

              <div className="space-y-4">
                {[
                  { label: "Sensibilidade Geral", value: `${result.general}%`, color: "text-neon-blue" },
                  { label: "Sensibilidade Red Dot", value: `${result.redDot}%`, color: "text-neon-purple" },
                  { label: "Sensibilidade 2x", value: `${result.scope2x}%`, color: "text-neon-green" },
                  { label: "Sensibilidade 4x", value: `${result.scope4x}%`, color: "text-yellow-400" },
                  { label: "DPI do Mouse", value: `${dpi}`, color: "text-neon-blue" },
                  { label: "Velocidade Free Look", value: `${result.freeLook}%`, color: "text-neon-purple" },
                ].map((config, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-dark-700"
                  >
                    <span className="text-sm text-gray-300">{config.label}</span>
                    <span className={`font-orbitron font-bold text-xl ${config.color}`}>
                      {config.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="btn-neon w-full mt-6 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Configuração
                  </>
                )}
              </button>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-orbitron font-bold text-sm mb-3">
                DICA RÁPIDA
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Essa configuração é um ponto de partida. Ajuste
                gradualmente os valores em partidas de treinamento até
                encontrar o equilíbrio perfeito para o seu estilo de jogo.
                Cada pessoa tem uma sensibilidade ideal diferente!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
