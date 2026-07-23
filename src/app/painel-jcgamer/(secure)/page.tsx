"use client";

import {
  BarChart3,
  Box,
  Check,
  Eye,
  ImageIcon,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Megaphone,
  Menu,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  AdPlacement,
  ManagedAdvertisement,
  ProductCondition,
  SiteSettings,
} from "@/lib/site-control";

type DashboardTab = "overview" | "products" | "appearance" | "ads" | "security";

type Product = {
  id: string;
  name: string;
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
  condition: ProductCondition;
  unit: string;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  badge: string;
  stock: string;
  condition: ProductCondition;
  unit: string;
  featured: boolean;
  active: boolean;
};

type AdvertisementForm = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  placement: AdPlacement;
  active: boolean;
};

const EMPTY_PRODUCT: ProductForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  category: "",
  subcategory: "",
  imageUrl: "",
  badge: "",
  stock: "1",
  condition: "NEW",
  unit: "unidade",
  featured: false,
  active: true,
};

const PRODUCT_CATEGORIES = [
  "Free Fire",
  "Acessórios",
  "Periféricos",
  "Produtos digitais",
  "Outros",
];

const EMPTY_AD: AdvertisementForm = {
  id: "",
  title: "",
  description: "",
  imageUrl: "",
  targetUrl: "",
  placement: "HOME_TOP",
  active: true,
};

const TAB_ITEMS = [
  { id: "overview" as const, label: "Visão geral", icon: LayoutDashboard },
  { id: "products" as const, label: "Produtos", icon: Package },
  { id: "appearance" as const, label: "Perfil e site", icon: Settings },
  { id: "ads" as const, label: "Anúncios", icon: Megaphone },
  { id: "security" as const, label: "Acesso e senha", icon: LockKeyhole },
];

const PLACEMENT_LABELS: Record<AdPlacement, string> = {
  HOME_TOP: "Início — topo",
  HOME_PRODUCTS: "Início — produtos",
  STORE_TOP: "Loja — topo",
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<DashboardTab>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [adminUsername, setAdminUsername] = useState("jcgamer");
  const [ads, setAds] = useState<ManagedAdvertisement[]>([]);
  const [productModal, setProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>(EMPTY_PRODUCT);
  const [adForm, setAdForm] = useState<AdvertisementForm>(EMPTY_AD);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const stats = useMemo(
    () => ({
      products: products.length,
      activeProducts: products.filter((product) => product.active).length,
      stock: products.reduce((sum, product) => sum + product.stock, 0),
      usedProducts: products.filter((product) => product.condition === "USED").length,
      activeAds: ads.filter((ad) => ad.active).length,
    }),
    [ads, products],
  );

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    if (TAB_ITEMS.some((item) => item.id === requestedTab)) {
      setTab(requestedTab as DashboardTab);
    }
    void loadDashboard();
  }, []);

  function showNotice(type: "success" | "error", text: string) {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  }

  async function loadDashboard() {
    setLoading(true);
    try {
      const [controlResponse, productsResponse] = await Promise.all([
        fetch("/api/admin/control", { cache: "no-store" }),
        fetch("/api/products?includeInactive=true&limit=100", { cache: "no-store" }),
      ]);

      if (controlResponse.status === 401 || productsResponse.status === 401) {
        router.replace("/painel-jcgamer/login");
        return;
      }
      if (!controlResponse.ok || !productsResponse.ok) {
        throw new Error("Não foi possível carregar os dados do painel.");
      }

      const control = await controlResponse.json();
      const productData = await productsResponse.json();
      setSettings(control.settings);
      setAds(control.ads || []);
      setProducts(productData.products || []);
      setAdminUsername(control.admin?.username || "jcgamer");
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Não foi possível carregar o painel.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/painel-jcgamer/login");
    router.refresh();
  }

  async function uploadImage(
    event: ChangeEvent<HTMLInputElement>,
    destination: "profile" | "product" | "ad",
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(destination);

    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao enviar imagem.");

      if (destination === "profile" && settings) {
        setSettings({ ...settings, profileImage: data.url });
      } else if (destination === "product") {
        setProductForm((current) => ({ ...current, imageUrl: data.url }));
      } else {
        setAdForm((current) => ({ ...current, imageUrl: data.url }));
      }
      showNotice("success", "Imagem enviada com sucesso.");
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Falha ao enviar imagem.",
      );
    } finally {
      setUploading("");
      event.target.value = "";
    }
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/control", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao salvar o site.");
      setSettings(data.settings);
      showNotice("success", "Perfil e informações do site atualizados.");
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Falha ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  function openNewProduct() {
    setEditingProductId(null);
    setProductForm(EMPTY_PRODUCT);
    setProductModal(true);
  }

  function openEditProduct(product: Product) {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      category: product.category,
      subcategory: product.subcategory || "",
      imageUrl: product.images[0] || "",
      badge: product.badge || "",
      stock: String(product.stock),
      condition: product.condition || "NEW",
      unit: product.unit || "unidade",
      featured: product.featured,
      active: product.active,
    });
    setProductModal(true);
  }

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(
        editingProductId ? `/api/products/${editingProductId}` : "/api/products",
        {
          method: editingProductId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: productForm.name,
            description: productForm.description,
            price: Number(productForm.price),
            originalPrice: productForm.originalPrice
              ? Number(productForm.originalPrice)
              : null,
            category: productForm.category,
            subcategory: productForm.subcategory,
            images: productForm.imageUrl ? [productForm.imageUrl] : [],
            badge: productForm.badge,
            stock: Number(productForm.stock),
            condition: productForm.condition,
            unit: productForm.unit,
            featured: productForm.featured,
            active: productForm.active,
          }),
        },
      );
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        router.replace("/painel-jcgamer/login");
        return;
      }
      if (!response.ok) throw new Error(data.error || "Falha ao salvar produto.");
      setProductModal(false);
      await loadDashboard();
      setTab("products");
      showNotice("success", editingProductId ? "Produto atualizado." : "Produto criado.");
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Falha ao salvar produto.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`Excluir “${product.name}”? Esta ação não poderá ser desfeita.`)) {
      return;
    }
    const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    if (response.ok) {
      setProducts((current) => current.filter((item) => item.id !== product.id));
      showNotice("success", "Produto excluído.");
    } else {
      showNotice("error", "Não foi possível excluir o produto.");
    }
  }

  function editAdvertisement(advertisement: ManagedAdvertisement) {
    setAdForm({
      id: advertisement.id,
      title: advertisement.title,
      description: advertisement.description,
      imageUrl: advertisement.imageUrl,
      targetUrl: advertisement.targetUrl,
      placement: advertisement.placement,
      active: advertisement.active,
    });
    document.getElementById("ad-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function saveAdvertisement(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsertAd",
          advertisement: {
            ...adForm,
            id: adForm.id || crypto.randomUUID(),
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao salvar anúncio.");
      setAdForm(EMPTY_AD);
      await loadDashboard();
      setTab("ads");
      showNotice("success", "Anúncio salvo e conectado ao site.");
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Falha ao salvar anúncio.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteAd(advertisement: ManagedAdvertisement) {
    if (!window.confirm(`Excluir o anúncio “${advertisement.title}”?`)) return;
    const response = await fetch(
      `/api/admin/control?id=${encodeURIComponent(advertisement.id)}`,
      { method: "DELETE" },
    );
    if (response.ok) {
      setAds((current) => current.filter((item) => item.id !== advertisement.id));
      showNotice("success", "Anúncio excluído.");
    } else {
      showNotice("error", "Não foi possível excluir o anúncio.");
    }
  }

  const currentTab = TAB_ITEMS.find((item) => item.id === tab)!;

  return (
    <div className="min-h-screen bg-[#030816] text-white lg:grid lg:grid-cols-[238px_minmax(0,1fr)]">
      <aside className="hidden border-r border-white/[0.08] bg-[#050b1d] lg:flex lg:min-h-screen lg:flex-col">
        <DashboardNavigation tab={tab} setTab={setTab} logout={logout} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#040a18]/95 px-3 backdrop-blur-xl sm:px-5 lg:h-16 lg:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 lg:hidden"
              aria-label="Abrir menu do painel"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate font-['Oxanium'] text-sm font-extrabold sm:text-base">
                {currentTab.label}
              </p>
              <p className="hidden text-xs text-[#85858b] sm:block">
                Controle direto do site JCGAMER
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#aaaab0] hover:text-white"
              aria-label="Atualizar painel"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <a href="/" target="_blank" className="secondary-button min-h-9 px-3">
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ver site</span>
            </a>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            />
            <aside className="relative flex h-full w-[min(280px,86vw)] flex-col bg-[#050b1d] shadow-2xl">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10"
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </button>
              <DashboardNavigation
                tab={tab}
                setTab={(next) => {
                  setTab(next);
                  setMenuOpen(false);
                }}
                logout={logout}
              />
            </aside>
          </div>
        )}

        <main className="mx-auto w-full max-w-7xl p-3 sm:p-5 lg:p-7">
          {loading && !settings ? (
            <div className="grid min-h-[55vh] place-items-center">
              <RefreshCw className="h-6 w-6 animate-spin text-[#35b8ff]" />
            </div>
          ) : (
            <>
              {tab === "overview" && (
                <Overview
                  stats={stats}
                  products={products}
                  setTab={setTab}
                  openNewProduct={openNewProduct}
                />
              )}
              {tab === "products" && (
                <ProductsSection
                  products={products}
                  openNewProduct={openNewProduct}
                  openEditProduct={openEditProduct}
                  deleteProduct={deleteProduct}
                />
              )}
              {tab === "appearance" && settings && (
                <AppearanceSection
                  settings={settings}
                  setSettings={setSettings}
                  saveSettings={saveSettings}
                  uploadImage={uploadImage}
                  uploading={uploading}
                  saving={saving}
                />
              )}
              {tab === "ads" && (
                <AdsSection
                  ads={ads}
                  adForm={adForm}
                  setAdForm={setAdForm}
                  editAdvertisement={editAdvertisement}
                  deleteAd={deleteAd}
                  saveAdvertisement={saveAdvertisement}
                  uploadImage={uploadImage}
                  uploading={uploading}
                  saving={saving}
                />
              )}
              {tab === "security" && (
                <SecuritySection
                  username={adminUsername}
                  setUsername={setAdminUsername}
                  showNotice={showNotice}
                />
              )}
            </>
          )}
        </main>
      </div>

      {productModal && (
        <ProductDialog
          editing={Boolean(editingProductId)}
          form={productForm}
          setForm={setProductForm}
          onClose={() => setProductModal(false)}
          onSubmit={saveProduct}
          onUpload={uploadImage}
          uploading={uploading}
          saving={saving}
        />
      )}

      {notice && (
        <div
          className={`fixed bottom-4 left-1/2 z-[80] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold shadow-2xl ${
            notice.type === "success"
              ? "border-emerald-500/30 bg-[#0d2018] text-emerald-300"
              : "border-red-500/30 bg-[#260d10] text-red-300"
          }`}
        >
          {notice.type === "success" ? (
            <Check className="h-4 w-4 shrink-0" />
          ) : (
            <X className="h-4 w-4 shrink-0" />
          )}
          {notice.text}
        </div>
      )}
    </div>
  );
}

function DashboardNavigation({
  tab,
  setTab,
  logout,
}: {
  tab: DashboardTab;
  setTab: (tab: DashboardTab) => void;
  logout: () => void;
}) {
  return (
    <>
      <div className="border-b border-white/[0.08] p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#118cff]/35 bg-[#118cff]/10 font-['Oxanium'] text-sm font-extrabold">
          JC
        </span>
        <p className="mt-3 font-['Oxanium'] text-base font-extrabold tracking-[0.08em]">
          JCGAMER
        </p>
        <p className="mt-1 text-xs text-[#85858b]">Painel de controle</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {TAB_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors ${
              tab === id
                ? "bg-[#118cff]/[0.13] text-white"
                : "text-[#99999f] hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Icon className={`h-4 w-4 ${tab === id ? "text-[#35b8ff]" : ""}`} />
            {label}
          </button>
        ))}
      </nav>
      <div className="border-t border-white/[0.08] p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-[#9b9ba1] hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </>
  );
}

function Overview({
  stats,
  products,
  setTab,
  openNewProduct,
}: {
  stats: {
    products: number;
    activeProducts: number;
    stock: number;
    usedProducts: number;
    activeAds: number;
  };
  products: Product[];
  setTab: (tab: DashboardTab) => void;
  openNewProduct: () => void;
}) {
  const cards = [
    { label: "Produtos cadastrados", value: stats.products, icon: Package },
    { label: "Produtos no site", value: stats.activeProducts, icon: ShoppingBag },
    { label: "Unidades em estoque", value: stats.stock, icon: Box },
    { label: "Anúncios ativos", value: stats.activeAds, icon: Megaphone },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <section className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(135deg,#171012_0%,#050811_58%)] p-4 sm:p-6">
        <p className="font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.14em] text-[#43c7ff]">
          Tudo em um só lugar
        </p>
        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-['Oxanium'] text-2xl font-extrabold sm:text-3xl">
              Controle do site JCGAMER
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9c9ca2]">
              Edite produtos, estoque, condição, foto de perfil, links e anúncios.
              As alterações salvas aparecem diretamente no site.
            </p>
          </div>
          <button type="button" onClick={openNewProduct} className="primary-button shrink-0">
            <Plus className="h-4 w-4" />
            Novo produto
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-xl border border-white/[0.08] bg-[#07101f] p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <Icon className="h-4 w-4 text-[#35b8ff]" />
              <BarChart3 className="h-3.5 w-3.5 text-[#55555b]" />
            </div>
            <strong className="mt-4 block font-['Oxanium'] text-xl font-extrabold sm:text-2xl">
              {value}
            </strong>
            <p className="mt-1 text-xs leading-snug text-[#88888e] sm:text-sm">{label}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-['Oxanium'] text-base font-extrabold">Estoque recente</h2>
            <button
              type="button"
              onClick={() => setTab("products")}
              className="text-xs font-bold text-[#43c7ff]"
            >
              Ver produtos
            </button>
          </div>
          <div className="mt-3 divide-y divide-white/[0.06]">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{product.name}</p>
                  <p className="mt-0.5 text-xs text-[#7f7f85]">
                    {product.condition === "USED" ? "Usado" : "Novo"} · {product.category}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold ${
                    product.stock > 0
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  {product.stock} {product.unit}
                </span>
              </div>
            ))}
            {!products.length && (
              <p className="py-8 text-center text-sm text-[#7f7f85]">
                Nenhum produto cadastrado.
              </p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4">
          <h2 className="font-['Oxanium'] text-base font-extrabold">Ações rápidas</h2>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              onClick={() => setTab("appearance")}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left text-sm font-bold hover:border-[#118cff]/30"
            >
              <ImageIcon className="h-4 w-4 text-[#35b8ff]" />
              Trocar foto e perfil
            </button>
            <button
              type="button"
              onClick={() => setTab("ads")}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left text-sm font-bold hover:border-[#118cff]/30"
            >
              <Megaphone className="h-4 w-4 text-[#35b8ff]" />
              Gerenciar anúncios
            </button>
            <button
              type="button"
              onClick={() => setTab("products")}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left text-sm font-bold hover:border-[#118cff]/30"
            >
              <Package className="h-4 w-4 text-[#35b8ff]" />
              Editar produtos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsSection({
  products,
  openNewProduct,
  openEditProduct,
  deleteProduct,
}: {
  products: Product[];
  openNewProduct: () => void;
  openEditProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = products.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-3 sm:p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-['Oxanium'] text-xl font-extrabold">Produtos da loja</h1>
          <p className="mt-1 text-sm text-[#88888e]">
            Quantidade, unidade e estado aparecem no site público.
          </p>
        </div>
        <button type="button" onClick={openNewProduct} className="primary-button">
          <Plus className="h-4 w-4" />
          Cadastrar produto
        </button>
      </div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nome ou categoria"
        className="input-dark mt-4 max-w-md"
      />

      <div className="mt-4 grid gap-2.5">
        {filtered.map((product) => (
          <article
            key={product.id}
            className="grid gap-3 rounded-xl border border-white/[0.07] bg-[#050b1d] p-3 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-[#0d1930]">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt=""
                  className="h-full w-full object-contain"
                />
              ) : (
                <Package className="h-5 w-5 text-[#55555b]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h2 className="truncate text-sm font-extrabold sm:text-base">{product.name}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                    product.condition === "USED"
                      ? "bg-amber-500/10 text-amber-300"
                      : "bg-emerald-500/10 text-emerald-300"
                  }`}
                >
                  {product.condition === "USED" ? "Usado" : "Novo"}
                </span>
                {!product.active && (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-extrabold uppercase text-red-300">
                    Oculto
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#808086]">
                {product.category} · {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-xs font-bold text-[#c4c4c8]">
                Estoque: {product.stock} {product.unit}
              </p>
            </div>
            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => openEditProduct(product)}
                className="secondary-button min-h-9 flex-1 px-3 sm:flex-none"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => deleteProduct(product)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10"
                aria-label={`Excluir ${product.name}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <p className="py-10 text-center text-sm text-[#7f7f85]">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </section>
  );
}

function AppearanceSection({
  settings,
  setSettings,
  saveSettings,
  uploadImage,
  uploading,
  saving,
}: {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  saveSettings: (event: FormEvent) => void;
  uploadImage: (
    event: ChangeEvent<HTMLInputElement>,
    destination: "profile" | "product" | "ad",
  ) => void;
  uploading: string;
  saving: boolean;
}) {
  return (
    <form
      onSubmit={saveSettings}
      className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]"
    >
      <section className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4">
        <h1 className="font-['Oxanium'] text-lg font-extrabold">Foto de perfil</h1>
        <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1930]">
          {settings.profileImage ? (
            <img
              src={settings.profileImage}
              alt="Foto de perfil do site"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-['Oxanium'] text-5xl font-extrabold text-[#35b8ff]">
              JC
            </span>
          )}
        </div>
        <label className="secondary-button mt-3 w-full cursor-pointer">
          <Upload className="h-4 w-4" />
          {uploading === "profile" ? "Enviando..." : "Escolher nova foto"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            onChange={(event) => uploadImage(event, "profile")}
            disabled={Boolean(uploading)}
          />
        </label>
        <p className="mt-2 text-xs leading-relaxed text-[#77777d]">
          Formatos JPG, PNG, WEBP ou GIF. Máximo de 5 MB.
        </p>
      </section>

      <section className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4 sm:p-5">
        <h2 className="font-['Oxanium'] text-lg font-extrabold">Informações do site</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <DashboardField label="Nome do site">
            <input
              value={settings.siteName}
              onChange={(event) =>
                setSettings({ ...settings, siteName: event.target.value })
              }
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Título principal">
            <input
              value={settings.heroTitle}
              onChange={(event) =>
                setSettings({ ...settings, heroTitle: event.target.value })
              }
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Descrição principal" wide>
            <textarea
              value={settings.heroDescription}
              onChange={(event) =>
                setSettings({ ...settings, heroDescription: event.target.value })
              }
              className="input-dark min-h-24 resize-y"
              required
            />
          </DashboardField>
          <DashboardField label="Link do YouTube">
            <input
              type="url"
              value={settings.youtubeUrl}
              onChange={(event) =>
                setSettings({ ...settings, youtubeUrl: event.target.value })
              }
              className="input-dark"
            />
          </DashboardField>
          <DashboardField label="Link do Instagram">
            <input
              type="url"
              value={settings.instagramUrl}
              onChange={(event) =>
                setSettings({ ...settings, instagramUrl: event.target.value })
              }
              className="input-dark"
            />
          </DashboardField>
          <DashboardField label="Link do WhatsApp" wide>
            <input
              type="url"
              value={settings.whatsappUrl}
              onChange={(event) =>
                setSettings({ ...settings, whatsappUrl: event.target.value })
              }
              className="input-dark"
            />
          </DashboardField>
        </div>
        <button type="submit" disabled={saving} className="primary-button mt-5">
          <Save className="h-4 w-4" />
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </section>
    </form>
  );
}

function AdsSection({
  ads,
  adForm,
  setAdForm,
  editAdvertisement,
  deleteAd,
  saveAdvertisement,
  uploadImage,
  uploading,
  saving,
}: {
  ads: ManagedAdvertisement[];
  adForm: AdvertisementForm;
  setAdForm: (form: AdvertisementForm) => void;
  editAdvertisement: (advertisement: ManagedAdvertisement) => void;
  deleteAd: (advertisement: ManagedAdvertisement) => void;
  saveAdvertisement: (event: FormEvent) => void;
  uploadImage: (
    event: ChangeEvent<HTMLInputElement>,
    destination: "profile" | "product" | "ad",
  ) => void;
  uploading: string;
  saving: boolean;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Oxanium'] text-xl font-extrabold">Anúncios do site</h1>
            <p className="mt-1 text-sm text-[#88888e]">
              Ative, edite ou remova campanhas sem alterar o código.
            </p>
          </div>
          <span className="rounded-full bg-[#118cff]/10 px-2.5 py-1 text-xs font-extrabold text-[#43c7ff]">
            {ads.length}
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {ads.map((advertisement) => (
            <article
              key={advertisement.id}
              className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#050b1d]"
            >
              {advertisement.imageUrl && (
                <img
                  src={advertisement.imageUrl}
                  alt=""
                  className="aspect-[3/1] w-full object-cover"
                />
              )}
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#43c7ff]">
                      {PLACEMENT_LABELS[advertisement.placement]}
                    </span>
                    <h2 className="mt-1 font-bold">{advertisement.title}</h2>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-extrabold uppercase ${
                      advertisement.active
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-white/5 text-[#77777d]"
                    }`}
                  >
                    {advertisement.active ? "Ativo" : "Pausado"}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-[#8c8c92]">
                  {advertisement.description || "Sem descrição."}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => editAdvertisement(advertisement)}
                    className="secondary-button min-h-9 flex-1 px-3"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAd(advertisement)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300"
                    aria-label={`Excluir ${advertisement.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!ads.length && (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center">
              <Megaphone className="mx-auto h-5 w-5 text-[#35b8ff]" />
              <p className="mt-2 text-sm text-[#88888e]">Nenhum anúncio criado.</p>
            </div>
          )}
        </div>
      </section>

      <form
        id="ad-form"
        onSubmit={saveAdvertisement}
        className="h-fit rounded-2xl border border-white/[0.08] bg-[#07101f] p-4 xl:sticky xl:top-20"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-['Oxanium'] text-lg font-extrabold">
            {adForm.id ? "Editar anúncio" : "Novo anúncio"}
          </h2>
          {adForm.id && (
            <button
              type="button"
              onClick={() => setAdForm(EMPTY_AD)}
              className="text-xs font-bold text-[#88888e]"
            >
              Cancelar
            </button>
          )}
        </div>
        <div className="mt-4 grid gap-3">
          <DashboardField label="Título">
            <input
              value={adForm.title}
              onChange={(event) => setAdForm({ ...adForm, title: event.target.value })}
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Descrição">
            <textarea
              value={adForm.description}
              onChange={(event) =>
                setAdForm({ ...adForm, description: event.target.value })
              }
              className="input-dark min-h-20 resize-y"
            />
          </DashboardField>
          <DashboardField label="Posição no site">
            <select
              value={adForm.placement}
              onChange={(event) =>
                setAdForm({
                  ...adForm,
                  placement: event.target.value as AdPlacement,
                })
              }
              className="input-dark"
            >
              {Object.entries(PLACEMENT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </DashboardField>
          <DashboardField label="Link ao clicar">
            <input
              type="url"
              value={adForm.targetUrl}
              onChange={(event) =>
                setAdForm({ ...adForm, targetUrl: event.target.value })
              }
              className="input-dark"
              placeholder="https://..."
            />
          </DashboardField>
          <DashboardField label="Imagem do anúncio">
            <input
              type="url"
              value={adForm.imageUrl}
              onChange={(event) =>
                setAdForm({ ...adForm, imageUrl: event.target.value })
              }
              className="input-dark"
              placeholder="Cole uma URL ou envie abaixo"
            />
            <label className="secondary-button mt-2 w-full cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              {uploading === "ad" ? "Enviando..." : "Enviar imagem"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => uploadImage(event, "ad")}
                disabled={Boolean(uploading)}
              />
            </label>
          </DashboardField>
          <label className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#050b1d] p-3 text-sm font-bold">
            Mostrar no site
            <input
              type="checkbox"
              checked={adForm.active}
              onChange={(event) =>
                setAdForm({ ...adForm, active: event.target.checked })
              }
              className="h-4 w-4 accent-[#118cff]"
            />
          </label>
        </div>
        <button type="submit" disabled={saving} className="primary-button mt-4 w-full">
          <Save className="h-4 w-4" />
          {saving ? "Salvando..." : "Salvar anúncio"}
        </button>
      </form>
    </div>
  );
}

function SecuritySection({
  username,
  setUsername,
  showNotice,
}: {
  username: string;
  setUsername: (username: string) => void;
  showNotice: (type: "success" | "error", text: string) => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [updating, setUpdating] = useState(false);

  async function updateCredentials(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmation) {
      showNotice("error", "A confirmação não corresponde à nova senha.");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newUsername,
          newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Não foi possível alterar o acesso.");
      }

      setUsername(data.username);
      setNewUsername(data.username);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");
      showNotice("success", "Usuário e senha atualizados com sucesso.");
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Não foi possível alterar o acesso.",
      );
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
      <section className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,#071733,#07101f_60%)] p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#118cff]/30 bg-[#118cff]/10">
          <ShieldCheck className="h-5 w-5 text-[#35b8ff]" />
        </span>
        <p className="mt-5 font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.13em] text-[#43c7ff]">
          Segurança do painel
        </p>
        <h1 className="mt-2 font-['Oxanium'] text-2xl font-extrabold">
          Acesso administrativo
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#97979d]">
          Altere o usuário e a senha sempre que quiser. A nova senha fica protegida
          e não é exibida no painel.
        </p>
        <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/20 p-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#77777d]">
            Usuário atual
          </p>
          <p className="mt-1 font-['Oxanium'] text-lg font-extrabold">{username}</p>
        </div>
      </section>

      <form
        onSubmit={updateCredentials}
        className="rounded-2xl border border-white/[0.08] bg-[#07101f] p-4 sm:p-5"
      >
        <h2 className="font-['Oxanium'] text-lg font-extrabold">
          Trocar usuário ou senha
        </h2>
        <p className="mt-1 text-sm text-[#85858b]">
          Confirme a senha atual antes de salvar.
        </p>
        <div className="mt-4 grid gap-3">
          <DashboardField label="Senha atual">
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="input-dark"
              autoComplete="current-password"
              required
            />
          </DashboardField>
          <DashboardField label="Novo usuário">
            <input
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
              className="input-dark"
              autoComplete="username"
              minLength={3}
              required
            />
          </DashboardField>
          <div className="grid gap-3 sm:grid-cols-2">
            <DashboardField label="Nova senha">
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="input-dark"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </DashboardField>
            <DashboardField label="Confirmar nova senha">
              <input
                type="password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className="input-dark"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </DashboardField>
          </div>
        </div>
        <button type="submit" disabled={updating} className="primary-button mt-5">
          <LockKeyhole className="h-4 w-4" />
          {updating ? "Atualizando..." : "Atualizar acesso"}
        </button>
      </form>
    </div>
  );
}

function ProductDialog({
  editing,
  form,
  setForm,
  onClose,
  onSubmit,
  onUpload,
  uploading,
  saving,
}: {
  editing: boolean;
  form: ProductForm;
  setForm: (form: ProductForm) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  onUpload: (
    event: ChangeEvent<HTMLInputElement>,
    destination: "profile" | "product" | "ad",
  ) => void;
  uploading: string;
  saving: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar formulário"
      />
      <form
        onSubmit={onSubmit}
        className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-white/[0.1] bg-[#07101f] p-4 shadow-2xl sm:rounded-2xl sm:p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-['Oxanium'] text-xs font-extrabold uppercase tracking-[0.12em] text-[#43c7ff]">
              Catálogo
            </p>
            <h2 className="mt-1 font-['Oxanium'] text-xl font-extrabold">
              {editing ? "Editar produto" : "Novo produto"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <DashboardField label="Nome do produto" wide>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Descrição" wide>
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="input-dark min-h-24 resize-y"
              required
            />
          </DashboardField>
          <DashboardField label="Preço">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Preço anterior">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.originalPrice}
              onChange={(event) =>
                setForm({ ...form, originalPrice: event.target.value })
              }
              className="input-dark"
            />
          </DashboardField>
          <DashboardField label="Categoria">
            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className="input-dark"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {form.category &&
                !PRODUCT_CATEGORIES.some((category) => category === form.category) && (
                  <option value={form.category}>{form.category}</option>
                )}
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </DashboardField>
          <DashboardField label="Subcategoria">
            <input
              value={form.subcategory}
              onChange={(event) =>
                setForm({ ...form, subcategory: event.target.value })
              }
              className="input-dark"
            />
          </DashboardField>
          <DashboardField label="Quantidade em estoque">
            <input
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: event.target.value })}
              className="input-dark"
              required
            />
          </DashboardField>
          <DashboardField label="Unidade">
            <input
              value={form.unit}
              onChange={(event) => setForm({ ...form, unit: event.target.value })}
              className="input-dark"
              placeholder="unidade, kit, par..."
              required
            />
          </DashboardField>
          <DashboardField label="Estado do produto">
            <select
              value={form.condition}
              onChange={(event) =>
                setForm({
                  ...form,
                  condition: event.target.value as ProductCondition,
                })
              }
              className="input-dark"
            >
              <option value="NEW">Novo</option>
              <option value="USED">Usado</option>
            </select>
          </DashboardField>
          <DashboardField label="Selo">
            <input
              value={form.badge}
              onChange={(event) => setForm({ ...form, badge: event.target.value })}
              className="input-dark"
              placeholder="Destaque, Oferta..."
            />
          </DashboardField>
          <DashboardField label="Imagem do produto" wide>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(event) =>
                setForm({ ...form, imageUrl: event.target.value })
              }
              className="input-dark"
              placeholder="Cole uma URL, um caminho de imagem ou envie um arquivo"
            />
            <label className="secondary-button mt-2 w-fit cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              {uploading === "product" ? "Enviando..." : "Enviar imagem"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => onUpload(event, "product")}
                disabled={Boolean(uploading)}
              />
            </label>
          </DashboardField>
          <label className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#050b1d] p-3 text-sm font-bold">
            Mostrar no site
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => setForm({ ...form, active: event.target.checked })}
              className="h-4 w-4 accent-[#118cff]"
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#050b1d] p-3 text-sm font-bold">
            Produto em destaque
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm({ ...form, featured: event.target.checked })
              }
              className="h-4 w-4 accent-[#118cff]"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="secondary-button">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="primary-button">
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar produto"}
          </button>
        </div>
      </form>
    </div>
  );
}

function DashboardField({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm font-bold text-[#bdbdc2] ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}
