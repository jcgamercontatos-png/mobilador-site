"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Settings,
  Gamepad2,
  Trophy,
  ArrowRight,
  Check,
  Play,
} from "lucide-react";

const courses = [
  {
    id: "sensibilidade-pro",
    title: "Sensibilidade Pro",
    description:
      "Domine a sensibilidade perfeita para mobilador. Configurações testadas e aprovadas por jogadores profissionais.",
    price: 49.9,
    originalPrice: 99.9,
    icon: Target,
    color: "from-neon-blue to-cyan-400",
    features: [
      "Configuração de sensibilidade completa",
      "Ajuste DPI profissional",
      "Configuração HUD otimizada",
      "Treinos profissionais",
      "Técnicas de capa avançadas",
      "Suporte por 30 dias",
    ],
    badge: "MAIS VENDIDO",
    students: "5.000+",
    rating: "4.9",
  },
  {
    id: "master-mobilador",
    title: "Master Mobilador",
    description:
      "Do zero ao avançado. Tudo que você precisa para virar um jogador profissional de mobilador.",
    price: 99.9,
    originalPrice: 199.9,
    icon: Gamepad2,
    color: "from-neon-purple to-pink-500",
    features: [
      "Tudo do Sensibilidade Pro",
      "Mapeamento de teclas avançado",
      "Scripts e automações",
      "Táticas competitivas",
      "Coaching individual",
      "Comunidade exclusiva",
      "Atualizações vitalícias",
    ],
    badge: "COMPLETO",
    students: "2.000+",
    rating: "4.8",
  },
];

export function CoursesSection() {
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
            <GraduationCap className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-gray-300">Treinamentos</span>
          </div>
          <h2 className="section-title">CURSOS ONLINE</h2>
          <p className="section-subtitle">
            Transforme seu jogo com configurações profissionais e técnicas
            avançadas de mobilador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card overflow-hidden group relative"
            >
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />

              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-neon text-dark-900">
                  {course.badge}
                </span>
              </div>

              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-6`}
                >
                  <course.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-orbitron font-bold text-2xl mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    {course.rating}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">
                    {course.students} alunos
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-neon-green" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="font-orbitron font-bold text-3xl text-gradient">
                    R$ {course.price.toFixed(2)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      R$ {course.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <Link
                  href={`/cursos/${course.id}`}
                  className="btn-neon w-full flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Começar Agora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
