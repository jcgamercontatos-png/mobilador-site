"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Gamepad2,
  Trophy,
  Check,
  ArrowRight,
  Play,
  Users,
  Star,
} from "lucide-react";

const courses = [
  {
    id: "sensibilidade-pro",
    title: "Sensibilidade Pro",
    subtitle: "Domine a sensibilidade perfeita",
    description:
      "Aprenda a configurar sua sensibilidade de forma profissional. DPI, HUD,Red Dot, Scope e muito mais.",
    price: 49.9,
    originalPrice: 99.9,
    icon: Target,
    color: "from-neon-blue to-cyan-400",
    features: [
      "Configuração de sensibilidade completa",
      "Ajuste DPI profissional",
      "Configuração HUD otimizada",
      "Treinos profissionais diários",
      "Técnicas de capa avançadas",
      "Suporte por 30 dias via WhatsApp",
      "Atualizações gratuitas",
    ],
    badge: "MAIS VENDIDO",
    students: "5.000+",
    rating: "4.9",
    modules: 12,
    duration: "4h30",
  },
  {
    id: "master-mobilador",
    title: "Master Mobilador",
    subtitle: "Do zero ao profissional",
    description:
      "Curso completo de mobilador. Do setup básico até técnicas avançadas de gameplay competitivo.",
    price: 99.9,
    originalPrice: 199.9,
    icon: Gamepad2,
    color: "from-neon-purple to-pink-500",
    features: [
      "Tudo do Sensibilidade Pro",
      "Mapeamento de teclas avançado",
      "Scripts e automações seguras",
      "Táticas competitivas",
      "Coaching individual 1x1",
      "Comunidade exclusiva no Discord",
      "Atualizações vitalícias",
      "Certificado de conclusão",
    ],
    badge: "COMPLETO",
    students: "2.000+",
    rating: "4.8",
    modules: 24,
    duration: "10h+",
  },
  {
    id: "pack-completo",
    title: "Pack Completo",
    subtitle: "Sensibilidade + Master",
    description:
      "Economize levando os dois cursos juntos. Acesso total a tudo que existe na plataforma.",
    price: 129.9,
    originalPrice: 299.9,
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    features: [
      "Todos os módulos do Sensibilidade Pro",
      "Todos os módulos do Master Mobilador",
      "Pack de configurações secretas",
      "Scripts premium exclusivos",
      "Coaching 1x1 mensal",
      "Acesso vitalício",
      "Grupo VIP no WhatsApp",
      "Atualizações para sempre",
    ],
    badge: "MELHOR CUSTO-BENEFÍCIO",
    students: "1.500+",
    rating: "5.0",
    modules: 36,
    duration: "15h+",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <GraduationCap className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-gray-300">Treinamentos</span>
          </div>
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient mb-4">
            CURSOS ONLINE
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Escolha o curso ideal para o seu nível e comece a jogar Free Fire
            como um profissional de mobilador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`glass-card overflow-hidden relative ${
                index === 2 ? "lg:-mt-4" : ""
              }`}
            >
              {index === 2 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-dark-900">
                    ECONOMIZE 57%
                  </span>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${course.color}`} />

              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-6`}
                >
                  <course.icon className="w-7 h-7 text-white" />
                </div>

                <span className="text-xs text-neon-blue font-semibold uppercase tracking-wider">
                  {course.subtitle}
                </span>
                <h2 className="font-orbitron font-bold text-2xl mt-2 mb-3">
                  {course.title}
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} alunos
                  </span>
                  <span>{course.modules} módulos</span>
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
    </div>
  );
}
