# eForce Site — contexto para o Claude
*Criado em 08/10/2026. Ler antes de qualquer trabalho nesta pasta.*

## O que é

Código do site **eforcedrums.com** (E-Force, baterias eletrônicas da Odery Drums Brazil).
Projeto conduzido por **Mauricio Odery + Claude** a partir de 08/10/2026. O site foi
construído pelo Nicolas Cunha (filho do Mauricio) com Claude entre mar e out/2026. As
atualizações do dia a dia saem daqui; o **Nicolas continua com acesso** ao repositório e à
Vercel, e o Mauricio pode acioná-lo quando precisar. Antes de mexer, conferir se há PR ou
branch dele em andamento para não trabalhar em cima da mesma coisa.

## Onde fica cada coisa

| | |
|---|---|
| Pasta local | `~/Desktop/eForce Site` (este repositório) |
| GitHub | `Mauodery/eforce-site` (público; id 1207055599, transferido da conta do Nicolas) |
| Hospedagem | Vercel, projeto `eforce-site`, time `odery` — https://vercel.com/odery/eforce-site |
| Domínio | https://eforcedrums.com → redireciona para https://www.eforcedrums.com (eforce.com.br também redireciona) |
| App | subpasta **`eforce-site/`** (Root Directory do projeto na Vercel). `docs/` na raiz é histórico de design |

## Como publicar

**`git push` na `main` publica em produção.** A Vercel está ligada ao repositório: cada push
na `main` gera um deploy de produção; push em outro branch ou PR gera preview. Não existe
servidor, SSH ou `vercel --prod` manual — e NÃO rodar `vercel --prod` da pasta (subiria o que
estiver no working tree, commitado ou não).

Preview em `*.vercel.app` fica atrás de login SSO. Validar sempre no domínio
www.eforcedrums.com depois do deploy (1–3 min após o push).

```bash
cd "/Users/Mauodery/Desktop/eForce Site/eforce-site" && npm run build
```
Build local antes de todo push. Ele roda: `prebuild` (validador dos posts do blog) →
`tsc -b && vite build` → `postbuild` (gera o blog estático e o sitemap). Post do blog
inválido **quebra o build** e nada sobe — é proteção, não bug.

Depois do build:
```bash
cd "/Users/Mauodery/Desktop/eForce Site" && git add -A && git commit -m "..." && git push
```
Confirmar o deploy: `curl -sI https://www.eforcedrums.com/ | grep -i x-vercel-id` e conferir
na página se a mudança está no ar.

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion + three.js (shaders) +
i18next (6 idiomas: en, pt, es, it, de, zh) + React Router v7. SPA. Node 24 no Mac.

```
eforce-site/
  src/pages/           HomePage, LinePage, ProductDetailPage, StoryPage, TechnologyPage,
                       DealersPage, SupportPage, NewsPage (redirect), NotFoundPage
  src/components/      layout (Navbar, Sidebar, Footer, SEO) · home · product · line · ui
  src/data/products.ts            catálogo: 6 kits (ef2-v1..v4, ef5-v2, ef7-eye-hybrid)
  src/data/products-translations.ts
  src/locales/<lang>/  textos da interface
  content/{pt,en}/news/*.md       posts do blog (markdown, sempre PT e EN com o mesmo slug)
  content/dados/       marcas permitidas/banidas do validador
  scripts/             gera-blog, gera-sitemap, valida-post, convert-to-webp
  public/assets/       imagens, vídeos, manuais (~1,5 GB — por isso o clone é pesado)
  vercel.json          redirects eforce.com.br → eforcedrums.com + rewrite SPA
  docs/                BLOG-ROTINA.md (voz e regras do blog), BLOG-DEPLOY-HANDOFF.md
```

Rotas: `/:lang/`, `/:lang/kits/:slug`, `/:lang/story`, `/:lang/technology`, `/:lang/dealers`,
`/:lang/support`, `/:lang/news/` (blog estático, fora do React).

## Regras herdadas que valem

- **Design system** em `docs/PROMPT-DESIGN-SYSTEM.md`: o produto é a página, no máximo
  35–45 palavras por seção, números como heróis, alternar seção escura/clara. Fundo
  `#0a0a0a`, laranja `#ff4a1c`.
- **Blog**: só cita Odery, E-Force e Bronz. Sem preço, prazo, promessa ou garantia. Todo post
  em PT e EN. Regras completas em `eforce-site/docs/BLOG-ROTINA.md`.
- **Imagens** entram em `.webp` (`scripts/convert-to-webp.mjs`); pesado em `public/assets/`.
- Conventional Commits em PT-BR, como o histórico (`feat(ef7): ...`, `fix(support): ...`).

## Regras de trabalho (as mesmas do Odery Code)

- **Publicar sempre.** O Mauricio testa em produção. Mudança que não subiu não existe.
- **Testar o caminho do navegador**, não só o build — abrir a página no domínio real.
- **Ler o arquivo antes de editar.**
- Modal/popup nunca fecha ao clicar fora.
- Senha, token ou chave NÃO entram neste repositório: ele é **público**.

## Pendências conhecidas (08/10/2026)

- Repositório é público — decidir se vira privado (Vercel continua funcionando).
- Conta/assento do Mauricio na Vercel (time `odery`) ainda não confirmado.
- Nenhum PR do Nicolas pendente em 08/10 (o #17, tutorial do F50 no suporte, já entrou na main).
