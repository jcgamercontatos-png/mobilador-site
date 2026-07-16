"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  MessageSquare,
  Settings,
  Crown,
  Medal,
  Award,
  ChevronRight,
  Search,
  Star,
  Gamepad2,
  ArrowRight,
} from "lucide-react";

const rankings = [
  { position: 1, name: "ProPlayer_BR", points: 15420, device: "Galaxy S23", kd: "4.8" },
  { position: 2, name: "MobiladorKing", points: 14350, device: "iPhone 14", kd: "4.5" },
  { position: 3, name: "HeadshotMaster", points: 13200, device: "Poco X4", kd: "4.2" },
  { position: 4, name: "SniperFF", points: 12100, device: "Galaxy S22", kd: "4.0" },
  { position: 5, name: "RushMaster", points: 11500, device: "Realme GT", kd: "3.9" },
  { position: 6, name: "AimGod_BR", points: 10800, device: "OnePlus 9", kd: "3.8" },
  { position: 7, name: "ConfigMaster", points: 10200, device: "Galaxy A54", kd: "3.7" },
  { position: 8, name: "TacticalPro", points: 9800, device: "iPhone 13", kd: "3.5" },
  { position: 9, name: "SpeedMobilador", points: 9200, device: "Poco F4", kd: "3.4" },
  { position: 10, name: "FFPro2024", points: 8900, device: "Galaxy S21", kd: "3.3" },
];

const recentConfigs = [
  {
    user: "ProPlayer_BR",
    device: "Galaxy S23",
    dpi: 1600,
    general: "88%",
    likes: 342,
  },
  {
    user: "MobiladorKing",
    device: "iPhone 14",
    dpi: 1200,
    general: "85%",
    likes: 289,
  },
  {
    user: "HeadshotMaster",
    device: "Poco X4",
    dpi: 800,
    general: "90%",
    likes: 256,
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"ranking" | "configs" | "forum">("ranking");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Users className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-gray-300">Comunidade</span>
          </div>
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient mb-4">
            COMUNIDADE JC GAMER
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conecte-se com outros jogadores, compartilhe configurações e suba
            no ranking!
          </p>
        </motion.div>

        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {[
            { key: "ranking" as const, label: "Ranking", icon: Trophy },
            { key: "configs" as const, label: "Configurações", icon: Settings },
            { key: "forum" as const, label: "Fórum", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.key
                  ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "ranking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {rankings.slice(0, 3).map((player, i) => (
                <motion.div
                  key={player.position}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card p-6 text-center ${
                    i === 0 ? "neon-border md:-mt-4" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      i === 0
                        ? "bg-yellow-400/20"
                        : i === 1
                        ? "bg-gray-300/20"
                        : "bg-orange-400/20"
                    }`}
                  >
                    {i === 0 ? (
                      <Crown className="w-8 h-8 text-yellow-400" />
                    ) : i === 1 ? (
                      <Medal className="w-8 h-8 text-gray-300" />
                    ) : (
                      <Award className="w-8 h-8 text-orange-400" />
                    )}
                  </div>
                  <h3 className="font-orbitron font-bold text-lg">
                    {player.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{player.device}</p>
                  <p className="font-orbitron text-2xl font-bold text-gradient">
                    {player.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">pontos</p>
                  <p className="text-sm text-neon-blue mt-1">
                    K/D: {player.kd}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar jogador..."
                    className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                  />
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {rankings.map((player) => (
                  <div
                    key={player.position}
                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`w-8 text-center font-orbitron font-bold ${
                        player.position <= 3 ? "text-neon-blue" : "text-gray-500"
                      }`}
                    >
                      #{player.position}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-dark-900 font-bold">
                      {player.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.device}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-orbitron font-bold text-sm text-gradient">
                        {player.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">K/D: {player.kd}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "configs" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentConfigs.map((config, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-dark-900 font-bold">
                      {config.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{config.user}</p>
                      <p className="text-xs text-gray-500">{config.device}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">DPI</span>
                      <span className="font-orbitron text-neon-blue">{config.dpi}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Geral</span>
                      <span className="font-orbitron text-neon-purple">{config.general}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-400">{config.likes} likes</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "forum" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card overflow-hidden">
              {[
                {
                  title: "Melhor config para Samsung Galaxy S23?",
                  author: "Novato_FF",
                  replies: 24,
                  lastActivity: "2h atrás",
                },
                {
                  title: "Dica de mouse para mobilador até R$150",
                  author: "GamerBR",
                  replies: 18,
                  lastActivity: "4h atrás",
                },
                {
                  title: "Como resolver lag no teclado e mouse?",
                  author: "TechHelper",
                  replies: 32,
                  lastActivity: "1h atrás",
                },
                {
                  title: "Tier list dos melhores adaptadores USB",
                  author: "ReviewerPro",
                  replies: 15,
                  lastActivity: "6h atrás",
                },
              ].map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Gamepad2 className="w-6 h-6 text-neon-blue flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{topic.title}</h3>
                    <p className="text-xs text-gray-500">
                      por {topic.author} · {topic.replies} respostas · {topic.lastActivity}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
