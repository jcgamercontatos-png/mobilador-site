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
    <div className="min-h-screen pt-14 md:pt-16 bg-dark-900">
      {/* Overlay do mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex relative">
        <aside
          className={`fixed left-0 top-14 md:top-16 bottom-0 w-64 glass border-r border-white/5 z-40 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="font-orbitron font-bold text-base md:text-lg text-gradient">
                PAINEL ADMIN
             </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
             </button>
           </div>
            <nav className="space-y-1 md:space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.label.toLowerCase());
                    setSidebarOpen(false);
                    router.push(item.path);
                  }}
                  className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm transition-all ${
                    activeSection === item.label.toLowerCase()
                      ? "bg-neon-blue/20 text-neon-blue"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
               </button>
              ))}
           </nav>
         </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 border-t border-white/5 bg-dark-900/80 backdrop-blur-sm">
            <button className="w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Sair</span>
           </button>
         </div>
       </aside>

        <main className="flex-1 w-full lg:ml-64 p-3 sm:p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
          <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8 gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white flex-shrink-0"
                aria-label="Abrir menu"
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
             </button>
              <div className="min-w-0 flex-1">
                <h1 className="font-orbitron font-bold text-lg sm:text-xl md:text-2xl truncate">
                  Dashboard
               </h1>
                <p className="text-gray-400 text-xs md:text-sm truncate">
                  Visão geral do seu site
               </p>
             </div>
           </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                className="relative p-1.5 md:p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Notificações"
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full" />
             </button>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-neon flex items-center justify-center text-dark-900 font-bold text-sm md:text-base">
                A
             </div>
           </div>
         </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-3 sm:p-4 md:p-6"
              >
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                  <span className="text-[10px] md:text-xs text-neon-green font-medium flex items-center gap-0.5 md:gap-1">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    {stat.change}
                 </span>
               </div>
                <p className="font-orbitron font-bold text-base sm:text-lg md:text-2xl truncate">
                  {stat.value}
               </p>
                <p className="text-gray-400 text-[10px] md:text-sm mt-0.5 md:mt-1 truncate">
                  {stat.label}
               </p>
             </motion.div>
            ))}
         </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
            <div className="lg:col-span-2 glass-card p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-6">
                <h2 className="font-orbitron font-bold text-sm sm:text-base md:text-lg">
                  Últimas Vendas
               </h2>
                <button className="text-neon-blue text-xs md:text-sm hover:underline flex-shrink-0">
                  Ver todas
               </button>
             </div>
              <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
                <div className="inline-block min-w-full align-middle">
                  <div className="px-3 sm:px-4 md:px-6">
                    <table className="w-full text-xs sm:text-sm min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left py-2 md:py-3 text-gray-400 font-medium whitespace-nowrap">
                            Pedido
                         </th>
                          <th className="text-left py-2 md:py-3 text-gray-400 font-medium whitespace-nowrap">
                            Usuário
                         </th>
                          <th className="text-left py-2 md:py-3 text-gray-400 font-medium whitespace-nowrap">
                            Produto
                         </th>
                          <th className="text-left py-2 md:py-3 text-gray-400 font-medium whitespace-nowrap">
                            Valor
                         </th>
                          <th className="text-left py-2 md:py-3 text-gray-400 font-medium whitespace-nowrap">
                            Status
                         </th>
                       </tr>
                     </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5">
                            <td className="py-2 md:py-3 font-medium whitespace-nowrap">
                              {order.id}
                           </td>
                            <td className="py-2 md:py-3 text-gray-300 whitespace-nowrap">
                              {order.user}
                           </td>
                            <td className="py-2 md:py-3 text-gray-300">
                              <span className="block max-w-[120px] truncate">
                                {order.product}
                             </span>
                           </td>
                            <td className="py-2 md:py-3 font-orbitron text-neon-green whitespace-nowrap">
                              {order.value}
                           </td>
                            <td className="py-2 md:py-3">
                              <span
                                className={`px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap inline-block ${
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
             </div>
           </div>

            <div className="glass-card p-3 sm:p-4 md:p-6">
              <h2 className="font-orbitron font-bold text-sm sm:text-base md:text-lg mb-3 md:mb-6">
                Ações Rápidas
             </h2>
              <div className="space-y-2 md:space-y-3">
                {[
                  { label: "Novo Produto", icon: Plus, color: "text-neon-blue", path: "/admin/produtos" },
                  { label: "Gerenciar Chaves", icon: FileText, color: "text-neon-purple", path: "/admin/chaves" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(action.path)}
                    className="w-full flex items-center gap-3 p-2.5 md:p-3 rounded-lg glass hover:bg-white/5 transition-all text-left"
                  >
                    <action.icon className={`w-4 h-4 md:w-5 md:h-5 ${action.color} flex-shrink-0`} />
                    <span className="text-xs md:text-sm truncate">{action.label}</span>
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
