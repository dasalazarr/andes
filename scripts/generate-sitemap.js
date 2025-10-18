/**
 * Generate sitemap.xml and robots.txt from Markdown posts
 * - Scans content/blog/{en,es}
 * - Parses minimal frontmatter
 * - Emits public/sitemap.xml and public/robots.txt
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://andesrunners.com';
const CONTENT_DIR = path.resolve(__dirname, '..', 'content', 'blog');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

function readAllMarkdown(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...readAllMarkdown(p));
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

function trimQuotes(s) {
  return s.replace(/^['"]|['"]$/g, '');
}

function parseInlineArray(val) {
  const inner = val.trim().slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(',').map((p) => trimQuotes(p.trim())).filter(Boolean);
}

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/);
  if (!fmMatch) return { data: {}, content: raw };
  const fm = fmMatch[1];
  const content = raw.slice(fmMatch[0].length);
  const data = {};
  for (const line of fm.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const valueRaw = trimmed.slice(idx + 1).trim();
    let value = valueRaw;
    if (valueRaw.startsWith('[') && valueRaw.endsWith(']')) {
      value = parseInlineArray(valueRaw);
    } else if (/^(true|false)$/i.test(valueRaw)) {
      value = /^true$/i.test(valueRaw);
    } else {
      value = trimQuotes(valueRaw);
    }
    data[key] = value;
  }
  return { data, content };
}

function getLangFromPath(p) {
  return p.includes(path.sep + 'es' + path.sep) ? 'es' : 'en';
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const files = readAllMarkdown(CONTENT_DIR);
  const urls = new Map();
  urls.set('/blog', { lastmod: null });
  urls.set('/es/blog', { lastmod: null });

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = parseFrontmatter(raw);
    const published = data.published !== false;
    if (!published) continue;
    const lang = (data.lang === 'es' || getLangFromPath(file) === 'es') ? 'es' : 'en';
    const slug = data.slug || path.basename(file, '.md');
    const date = data.updated || data.date || null;
    const route = (lang === 'es' ? '/es/blog/' : '/blog/') + slug;
    urls.set(route, { lastmod: date });
  }

  const now = new Date().toISOString();
  const items = Array.from(urls.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    items.map(([loc, meta]) => {
      const lastmod = meta.lastmod || now;
      return `  <url>\n    <loc>${BASE_URL + loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    }).join('\n') +
    `\n</urlset>\n`;

  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);

  console.log(`[sitemap] Wrote ${items.length} URLs to public/sitemap.xml`);
}

main();

