"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Edit,
  Trash2,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const stats = [
  { label: "Receita Total", value: "R$ 15.420", change: "+12%", icon: DollarSign, color: "text-neon-green" },
  { label: "Vendas", value: "342", change: "+8%", icon: ShoppingCart, color: "text-neon-blue" },
  { label: "Usuários", value: "2.847", change: "+15%", icon: Users, color: "text-neon-purple" },
  { label: "Visualizações", value: "28.5K", change: "+22%", icon: Eye, color: "text-yellow-400" },
];

const recentOrders = [
  { id: "#001", user: "Carlos M.", product: "Sensibilidade Pro", value: "R$ 49,90", status: "Pago" },
  { id: "#002", user: "Lucas R.", product: "Pack Mobilador", value: "R$ 39,90", status: "Pago" },
  { id: "#003", user: "Pedro H.", product: "Mouse Gamer Pro", value: "R$ 149,90", status: "Pendente" },
  { id: "#004", user: "Ana S.", product: "Master Mobilador", value: "R$ 99,90", status: "Pago" },
  { id: "#005", user: "João P.", product: "Pack Mobilador", value: "R$ 39,90", status: "Pago" },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Produtos", path: "/admin/produtos" },
  { icon: ShoppingCart, label: "Chaves", path: "/admin/chaves" },
];

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 bg-dark-900">
      <div className="flex">
        <aside
          className={`fixed left-0 top-16 bottom-0 w-64 glass border-r border-white/5 z-40 transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            <h2 className="font-orbitron font-bold text-lg text-gradient mb-8">
              PAINEL ADMIN
            </h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.label.toLowerCase());
                    setSidebarOpen(false);
                    router.push(item.path);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeSection === item.label.toLowerCase()
                      ? "bg-neon-blue/20 text-neon-blue"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
               </button>
              ))}
           </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-400"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-orbitron font-bold text-2xl">Dashboard</h1>
                <p className="text-gray-400 text-sm">
                  Visão geral do seu site
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-dark-900 font-bold">
                A
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-xs text-neon-green font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="font-orbitron font-bold text-2xl">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-orbitron font-bold text-lg">
                  Últimas Vendas
                </h2>
                <button className="text-neon-blue text-sm hover:underline">
                  Ver todas
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Pedido
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Usuário
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Produto
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Valor
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5">
                        <td className="py-3 font-medium">{order.id}</td>
                        <td className="py-3 text-gray-300">{order.user}</td>
                        <td className="py-3 text-gray-300">{order.product}</td>
                        <td className="py-3 font-orbitron text-neon-green">
                          {order.value}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Pago"
                                ? "bg-neon-green/20 text-neon-green"
                                : "bg-yellow-400/20 text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-orbitron font-bold text-lg mb-6">
                Ações Rápidas
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Novo Produto", icon: Plus, color: "text-neon-blue", path: "/admin/produtos" },
                  { label: "Gerenciar Chaves", icon: FileText, color: "text-neon-purple", path: "/admin/chaves" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(action.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg glass hover:bg-white/5 transition-all text-left"
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="text-sm">{action.label}</span>
                 </button>
                ))}
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
