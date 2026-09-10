import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { LANGS, listPostFiles, readPost } from "./lib-posts.mjs";
import { renderIndex, renderPost, esc } from "./blog-template.mjs";

const OUT = path.resolve(process.argv[2] ?? "dist");
// A Vercel define NODE_ENV=production automaticamente no build de produção.
// Por isso drafts são excluídos no deploy real, mas continuam aparecendo em
// builds locais (NODE_ENV != "production") — isso é esperado, não um bug.
// Não trocar essa checagem por algo que rode sempre, ou drafts vazam em produção.
const isProd = process.env.NODE_ENV === "production";

function write(rel, content) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

let total = 0;
const sitemap = [];
for (const lang of LANGS) {
  const posts = listPostFiles(lang)
    .map((f) => readPost(lang, f))
    .filter((p) => !(isProd && p.data.draft))
    .sort((a, b) => String(b.data.publishedAt).localeCompare(String(a.data.publishedAt)));

  for (const p of posts) {
    const html = marked.parse(p.body);
    write(`${lang}/news/${p.slug}/index.html`,
      renderPost({ lang, slug: p.slug, data: p.data, html, related: p.data.relatedProducts ?? [] }));
    sitemap.push(`https://eforcedrums.com/${lang}/news/${p.slug}/`);
    total++;
  }
  write(`${lang}/news/index.html`, renderIndex({ lang, posts }));
  sitemap.push(`https://eforcedrums.com/${lang}/news/`);

  const items = posts.map((p) =>
    `<item><title>${esc(p.data.title)}</title><link>https://eforcedrums.com/${lang}/news/${p.slug}/</link><pubDate>${new Date(p.data.publishedAt).toUTCString()}</pubDate></item>`).join("");
  write(`${lang}/news/feed.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>E-Force — ${lang === "pt" ? "Novidades" : "News"}</title><link>https://eforcedrums.com/${lang}/news/</link><description>Bateria eletrônica.</description>${items}</channel></rss>`);
}
write("sitemap-blog.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`);
console.log(`gera-blog: ${total} post(s) em ${LANGS.length} idioma(s) → ${OUT}`);
