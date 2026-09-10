import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const BASE_URL = "https://eforcedrums.com";

// Mantido em paralelo a supportedLanguages (src/i18n.ts) e LANGS (scripts/lib-posts.mjs).
const SITE_LANGS = ["pt", "en", "it", "de", "zh", "es"];
const BLOG_LANGS = ["pt", "en"];
const STATIC_ROUTES = ["", "story", "technology", "dealers", "support"];

function readProductSlugs() {
  const src = fs.readFileSync(path.join(ROOT, "src/data/products.ts"), "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function readBlogLocs(outDir) {
  const file = path.join(outDir, "sitemap-blog.xml");
  if (!fs.existsSync(file)) return [];
  const xml = fs.readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const slugs = readProductSlugs();
const urls = [];

for (const lang of SITE_LANGS) {
  for (const route of STATIC_ROUTES) {
    urls.push(`${BASE_URL}/${lang}${route ? `/${route}` : ""}`);
  }
  for (const slug of slugs) {
    urls.push(`${BASE_URL}/${lang}/kits/${slug}`);
  }
}
for (const lang of BLOG_LANGS) {
  urls.push(`${BASE_URL}/${lang}/news`);
}

const OUT = path.resolve(process.argv[2] ?? "dist");
urls.push(...readBlogLocs(OUT));

fs.mkdirSync(OUT, { recursive: true });
const body = urls.map((u) => `<url><loc>${u}</loc></url>`).join("");
fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
);
console.log(`gera-sitemap: ${urls.length} URL(s) → ${path.join(OUT, "sitemap.xml")}`);
