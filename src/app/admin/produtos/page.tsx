"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  Eye,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Minus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Produto = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  subcategory: string | null;
  images: string[];
  badge: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export default function AdminProdutosPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    images: "",
    badge: "",
    stock: "",
    featured: false,
    active: true,
  });

  const [stockAction, setStockAction] = useState({
    productId: "",
    quantity: "",
    type: "ADD" as "ADD" | "REMOVE" | "SET",
    reason: "",
  });

  const categories = ["Todos", "Mouse", "Teclados", "Headsets", "Monitores", "Acessórios"];

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      });
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory && selectedCategory !== "Todos") params.append("category", selectedCategory);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      showToast("error", "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          category: formData.category,
          subcategory: formData.subcategory,
          images: formData.images.split(",").map((img) => img.trim()).filter(Boolean),
          badge: formData.badge,
          stock: parseInt(formData.stock) || 0,
          featured: formData.featured,
          active: formData.active,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao salvar produto");
      }

      showToast("success", editingProduct ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      showToast("error", error.message || "Erro ao salvar produto");
    }
  };

  const handleEdit = (product: Produto) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      subcategory: product.subcategory || "",
      images: product.images.join(", "),
      badge: product.badge || "",
      stock: product.stock.toString(),
      featured: product.featured,
      active: product.active,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    try {
      const res = await fetch(`/api/products/${deletingProduct}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar");
      showToast("success", "Produto deletado com sucesso!");
      setDeletingProduct(null);
      fetchProducts();
    } catch (error) {
      showToast("error", "Erro ao deletar produto");
    }
  };

  const handleStockAdjust = async () => {
    if (!stockAction.productId || !stockAction.quantity) return;
    try {
      const res = await fetch(`/api/products/${stockAction.productId}/stock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: parseInt(stockAction.quantity),
          type: stockAction.type,
          reason: stockAction.reason,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao ajustar estoque");
      }
      showToast("success", "Estoque atualizado com sucesso!");
      setStockAction({ productId: "", quantity: "", type: "ADD", reason: "" });
      fetchProducts();
    } catch (error: any) {
      showToast("error", error.message || "Erro ao ajustar estoque");
    }
  };

  const openStockModal = (product: Produto) => {
    setStockAction({ productId: product.id, quantity: "", type: "ADD", reason: "Reposição de estoque" });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      subcategory: "",
      images: "",
      badge: "",
      stock: "",
      featured: false,
      active: true,
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Esgotado", color: "text-red-400 bg-red-400/10" };
    if (stock === 1) return { label: "Última unidade disponível", color: "text-yellow-400 bg-yellow-400/10" };
    if (stock <= 5) return { label: `${stock} unidades (Baixo)`, color: "text-yellow-400 bg-yellow-400/10" };
    return { label: `${stock} unidades`, color: "text-neon-green bg-neon-green/10" };
  };

  return (
    <div className="min-h-screen pt-16 bg-dark-900">
      <div className="flex">
        <aside className="fixed left-0 top-16 bottom-0 w-64 glass border-r border-white/5 z-40">
          <div className="p-6">
            <h2 className="font-orbitron font-bold text-lg text-gradient mb-8">
              PAINEL ADMIN
            </h2>
            <nav className="space-y-2">
              <button
                onClick={() => router.push("/admin")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Package className="w-5 h-5" />
                Dashboard
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
              >
                <Package className="w-5 h-5" />
                Produtos
              </button>
              <button
                onClick={() => router.push("/admin/vendas")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Eye className="w-5 h-5" />
                Vendas
              </button>
              <button
                onClick={() => router.push("/admin/usuarios")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Eye className="w-5 h-5" />
                Usuários
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="lg:hidden p-2 text-gray-400"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-orbitron font-bold text-2xl">Gerenciar Produtos</h1>
                <p className="text-gray-400 text-sm">Cadastre, edite e controle estoque dos periféricos</p>
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="btn-neon flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>

          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg glass-card border flex items-center gap-3 ${
                toast.type === "success" ? "border-neon-green/30" : "border-red-400/30"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-neon-green" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <span className="text-sm">{toast.message}</span>
            </motion.div>
          )}

          <div className="glass-card mb-6">
            <div className="flex flex-col md:flex-row gap-4 p-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-blue transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="glass-card p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue mx-auto" />
              <p className="text-gray-400 mt-4">Carregando produtos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400">Comece cadastrando seu primeiro produto</p>
            </div>
          ) : (
            <>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Produto</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Categoria</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Preço</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Estoque</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const stockStatus = getStockStatus(product.stock);
                        return (
                          <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                {product.images[0] ? (
                                  <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-neon-blue/30" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-white">{product.name}</p>
                                  <p className="text-xs text-gray-400">{product.slug}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{product.category}</td>
                            <td className="py-4 px-4">
                              <span className="font-orbitron font-bold text-gradient">
                                R$ {product.price.toFixed(2)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${stockStatus.color}`}>
                                {stockStatus.label}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                product.active ? "text-neon-green bg-neon-green/10" : "text-gray-400 bg-gray-400/10"
                              }`}>
                                {product.active ? "Ativo" : "Inativo"}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="p-2 text-neon-blue hover:bg-neon-blue/10 rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openStockModal(product)}
                                  className="p-2 text-neon-purple hover:bg-neon-purple/10 rounded transition-colors"
                                  title="Ajustar Estoque"
                                >
                                  <Package className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeletingProduct(product.id)}
                                  className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                  title="Deletar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                    <p className="text-sm text-gray-400">
                      Página {page} de {totalPages} — {products.length} de {products.length} produtos
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm bg-dark-700 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm bg-dark-700 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Modal Novo/Editar Produto */}
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h2 className="font-orbitron font-bold text-xl">
                    {editingProduct ? "Editar Produto" : "Novo Produto"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Nome do Produto *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="Ex: Mouse Gamer Pro X1"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Descrição</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="Descrição completa do produto..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preço (R$) *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="149.90"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preço Original (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="199.90"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Categoria *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-blue transition-colors"
                        required
                      >
                        <option value="">Selecione</option>
                        {["Mouse", "Teclados", "Headsets", "Monitores", "Acessórios"].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Subcategoria</label>
                      <input
                        type="text"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="Ex: Sem fio, Mecânico, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Estoque Inicial *</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="0"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Badge</label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="Ex: -25%, Mais Vendido, Lançamento"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Imagens (URLs separadas por vírgula)</label>
                      <input
                        type="text"
                        value={formData.images}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                        placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-neon-blue border-white/10 rounded focus:ring-neon-blue"
                      />
                      <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
                        Produto em destaque na home
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="w-4 h-4 text-neon-blue border-white/10 rounded focus:ring-neon-blue"
                      />
                      <label htmlFor="active" className="text-sm text-gray-300 cursor-pointer">
                        Produto ativo/visível na loja
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn-outline px-6 py-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-neon px-6 py-2"
                    >
                      {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Modal Ajustar Estoque */}
          {stockAction.productId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setStockAction({ productId: "", quantity: "", type: "ADD", reason: "" })}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-card max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h2 className="font-orbitron font-bold text-xl">Ajustar Estoque</h2>
                  <button
                    onClick={() => setStockAction({ productId: "", quantity: "", type: "ADD", reason: "" })}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleStockAdjust} className="p-6 space-y-4">
                  <input type="hidden" value={stockAction.productId} onChange={e => setStockAction({...stockAction, productId: e.target.value })} />

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tipo de Ajuste</label>
                    <select
                      value={stockAction.type}
                      onChange={(e) => setStockAction({ ...stockAction, type: e.target.value as any })}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-blue transition-colors"
                    >
                      <option value="ADD">Adicionar ao estoque</option>
                      <option value="REMOVE">Remover do estoque</option>
                      <option value="SET">Definir estoque exato</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      value={stockAction.quantity}
                      onChange={(e) => setStockAction({ ...stockAction, quantity: e.target.value })}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                      placeholder="Ex: 10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Motivo</label>
                    <input
                      type="text"
                      value={stockAction.reason}
                      onChange={(e) => setStockAction({ ...stockAction, reason: e.target.value })}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                      placeholder="Ex: Reposição de estoque, Ajuste manual, etc."
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setStockAction({ productId: "", quantity: "", type: "ADD", reason: "" })}
                      className="btn-outline px-6 py-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-neon px-6 py-2"
                    >
                      Aplicar Ajuste
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Modal Deletar */}
          {deletingProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setDeletingProduct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-card max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="font-orbitron font-bold text-xl mb-2">Confirmar Exclusão</h3>
                  <p className="text-gray-400 mb-6">
                    Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setDeletingProduct(null)}
                      className="btn-outline px-6 py-2"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn-neon px-6 py-2 bg-red-500 hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}