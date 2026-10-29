// Generates sitemap.xml from scripts/pages.json.
// lastmod = date of the last git commit that touched the page file (today if it has uncommitted changes).
// Usage: node scripts/sitemap.mjs
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const cfg = JSON.parse(fs.readFileSync(new URL('./pages.json', import.meta.url)));
const SITE = cfg.site;
const fileOf = p => (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');
const today = () => new Date().toISOString().slice(0, 10);

function lastmod(file) {
  const git = args => execFileSync('git', args, { encoding: 'utf8' }).trim();
  try {
    if (git(['status', '--porcelain', '--', file])) return today();
    return git(['log', '-1', '--format=%cs', '--', file]) || today();
  } catch {
    return today();
  }
}

export function sitemapXml() {
  const pages = cfg.pages.filter(p => !p.noindex && fs.existsSync(fileOf(p)));
  const urls = pages.map(p => {
    const alt = p.alt ? [
      ['uk', p.lang === 'uk' ? p.path : p.alt],
      ['en', p.lang === 'en' ? p.path : p.alt],
      ['x-default', p.lang === 'uk' ? p.path : p.alt],
    ].map(([l, h]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${h}"/>`).join('') : '';
    return `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${lastmod(fileOf(p))}</lastmod>${alt}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  fs.writeFileSync('sitemap.xml', sitemapXml());
  console.log('sitemap.xml written');
}
