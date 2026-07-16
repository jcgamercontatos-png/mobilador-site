# Mobilador Site

Site profissional para criador de conteúdo de Free Fire especializado em Mobilador (teclado e mouse no celular).

## Funcionalidades

- Home page com Hero section, YouTube, Loja, Cursos, Pack, Blog e Calculadora
- Loja de periféricos gamer com carrinho e checkout
- Cursos online com páginas de venda estilo Hotmart
- Pack de mobilador com área de membros
- Calculadora de sensibilidade interativa
- Comunidade com ranking e fórum
- Blog com SEO otimizado
- Painel administrativo completo
- Assistente IA (Mobilador AI)
- WhatsApp flutuante
- Newsletter
- Design responsivo mobile-first

## Stack Tecnológica

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Banco:** PostgreSQL + Prisma ORM
- **Autenticação:** NextAuth.js
- **Hospedagem:** Vercel

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Configurar banco de dados
npx prisma generate
npx prisma db push

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## Estrutura de Pastas

```
mobilador-site/
├── prisma/
│   └── schema.prisma
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home
│   │   ├── layout.tsx        # Layout global
│   │   ├── globals.css       # Estilos globais
│   │   ├── loja/             # Loja
│   │   ├── cursos/           # Cursos
│   │   ├── pack-mobilador/   # Pack
│   │   ├── comunidade/       # Comunidade
│   │   ├── calculadora/      # Calculadora
│   │   ├── blog/             # Blog
│   │   ├── admin/            # Painel admin
│   │   ├── login/            # Login
│   │   ├── checkout/         # Checkout
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── YouTubeSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── PackSection.tsx
│   │   ├── CalculatorPreview.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── Newsletter.tsx
│   │   ├── CTASection.tsx
│   │   ├── MobiladorAI.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── WhatsAppButton.tsx
│   ├── hooks/
│   │   └── index.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Configuração do YouTube API

1. Acesse Google Cloud Console
2. Crie um projeto e habilite YouTube Data API v3
3. Gere uma API Key
4. Adicione no .env

## Configuração do Banco

1. Crie um banco PostgreSQL
2. Configure a DATABASE_URL no .env
3. Execute `npx prisma db push`

## Deploy no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| DATABASE_URL | URL do PostgreSQL |
| NEXTAUTH_SECRET | Chave secreta NextAuth |
| GOOGLE_CLIENT_ID | ID do Google OAuth |
| GOOGLE_CLIENT_SECRET | Segredo do Google OAuth |
| YOUTUBE_API_KEY | Chave da API YouTube |
| YOUTUBE_CHANNEL_ID | ID do canal YouTube |

## Comandos Úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar em produção
npm run lint         # Verificar código
npx prisma studio    # Abrir Prisma Studio
npx prisma generate  # Gerar Prisma Client
npx prisma db push   # Sincronizar banco
```

## Licença

MIT
