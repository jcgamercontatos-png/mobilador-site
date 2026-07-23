import { ChevronRight, Gamepad2, Smartphone, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "gg-mouse",
    name: "GG Mouse Pro",
    category: "Aplicativo",
    price: "Grátis",
    description:
      "Configure sensibilidade e mapeie teclas para jogar Free Fire com teclado e mouse no celular.",
    features: ["Sensibilidade profissional", "Mapeamento de teclas", "Interface simples"],
    icon: Smartphone,
    href: "https://play.google.com/store/apps/details?id=com.zjx.ztezscreenshot&pcampaignid=web_share",
    buttonText: "Baixar",
  },
  {
    id: "sensibilidade",
    name: "Sensibilidade PRO",
    category: "Configuração",
    price: "R$ 19,90",
    description:
      "Configuração calibrada de DPI, mira e grip para combinar com seu aparelho e estilo de jogo.",
    features: ["DPI customizado", "Mira otimizada", "Suporte vitalício"],
    icon: Zap,
    href: "https://wa.me/5521973199886?text=Ol%C3%A1!%20Quero%20comprar%20a%20Sensibilidade%20PRO",
    buttonText: "Comprar",
  },
  {
    id: "pack",
    name: "Pack de Configurações",
    category: "Pacote",
    price: "R$ 34,90",
    description:
      "Várias configurações para diferentes estilos de gameplay e tamanhos de tela.",
    features: ["5 configurações", "Todos os dispositivos", "Atualizações mensais"],
    icon: Gamepad2,
    href: "https://wa.me/5521973199886?text=Ol%C3%A1!%20Quero%20comprar%20o%20Pack%20de%20Configura%C3%A7%C3%B5es",
    buttonText: "Comprar",
  },
];

export default function ProdutosPage() {
  return (
    <div className="site-page">
      <div className="page-shell">
        <section className="panel p-5 sm:p-6">
          <span className="eyebrow">
            <Star className="h-3 w-3" />
            Produtos digitais
          </span>
          <h1 className="route-title mt-3">
            Produtos <span className="text-[#118cff]">JCGAMER</span>
          </h1>
          <p className="body-copy mt-3 max-w-2xl">
            Apps, configurações e pacotes para deixar seu Free Fire mais preciso e organizado.
          </p>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          {products.map(({ icon: Icon, ...product }) => (
            <article key={product.id} className="product-card">
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#118cff]/25 bg-[#118cff]/[0.08]">
                    <Icon className="h-5 w-5 text-[#35b8ff]" />
                  </span>
                  <span className="eyebrow min-h-6 px-2 py-1">{product.category}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold leading-tight text-white">{product.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#9d9da2]">{product.description}</p>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#b2b2b7]">
                      <Sparkles className="h-3 w-3 shrink-0 text-[#35b8ff]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                  <strong className="font-['Oxanium'] text-lg font-extrabold text-white">{product.price}</strong>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-button min-h-10 px-4"
                  >
                    {product.buttonText}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/loja"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#b5b5ba] transition-colors hover:text-white"
          >
            Ver periféricos na loja
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
