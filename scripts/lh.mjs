// Lighthouse over the page templates (TZ §8): mobile (Moto G Power, 4G — LH default) and desktop.
// Usage: node scripts/lh.mjs [--base=https://infiniteunion.com.ua] [--paths=/,/pricing/] [--form=mobile|desktop|both]
// Writes .cache/lh/summary.json; exits 1 when a budget is missed.
import fs from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';

const arg = n => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=').slice(1).join('=');
const PATHS = (arg('paths') || '/,/services/websites/,/pricing/,/portfolio/,/blog/skilky-koshtuye-sayt-2026/,/en/,/404.html').split(',');
const FORMS = arg('form') === 'mobile' ? ['mobile'] : arg('form') === 'desktop' ? ['desktop'] : ['mobile', 'desktop'];
const remote = !!arg('base');
const port = 4173;
const base = arg('base') || `http://localhost:${port}`;
const BUDGET = { mobile: { performance: 90, lcp: 2.0 }, desktop: { performance: 95, lcp: 2.0 }, seo: 100, bp: 100, a11y: 95, cls: 0.05, tbt: 200 };
fs.mkdirSync('.cache/lh', { recursive: true });
const srv = remote ? null : spawn('npx', ['serve', '.', '-p', String(port), '--no-request-logging'], { stdio: 'ignore' });
if (srv) await new Promise(r => setTimeout(r, 2500));
const rows = [];
let bad = 0;
try {
  for (const form of FORMS) for (const p of PATHS) {
    const out = `.cache/lh/${form}-${p.replace(/\W+/g, '_')}.json`;
    const flags = ['lighthouse', base + p, '--quiet', '--chrome-flags=--headless=new', '--only-categories=performance,seo,accessibility,best-practices', '--output=json', `--output-path=${out}`];
    if (form === 'desktop') flags.push('--preset=desktop');
    if (/404/.test(p)) flags.push('--skip-audits=is-crawlable'); // 404 is noindex by design
    try { execFileSync('npx', flags, { stdio: 'ignore', timeout: 180000 }); } catch { /* LH exits non-zero on some runtime errors but still writes the report */ }
    const lr = JSON.parse(fs.readFileSync(out, 'utf8'));
    const sc = k => Math.round((lr.categories[k]?.score || 0) * 100);
    const a = id => lr.audits[id]?.numericValue || 0;
    const r = { form, path: p, perf: sc('performance'), a11y: sc('accessibility'), bp: sc('best-practices'), seo: sc('seo'),
      lcp: +(a('largest-contentful-paint') / 1000).toFixed(2), cls: +a('cumulative-layout-shift').toFixed(3), tbt: Math.round(a('total-blocking-time')), fcp: +(a('first-contentful-paint') / 1000).toFixed(2) };
    const miss = [];
    if (r.perf < BUDGET[form].performance) miss.push(`perf ${r.perf}`);
    if (r.seo < BUDGET.seo) miss.push(`seo ${r.seo}`);
    // Best Practices: every audit must pass, except the Google Ads third-party cookie (doubleclick test_cookie set by the
    // AW conversion tag the TZ requires on every page) — accepted only if ALL offending items are Google Ads domains.
    const ADS = /doubleclick\.net|googleadservices\.com|google\.com\/pagead|googlesyndication/;
    const bpFails = lr.categories['best-practices'].auditRefs.filter(x => x.weight > 0 && lr.audits[x.id].score !== null && lr.audits[x.id].score < 1).map(x => x.id)
      .filter(id => !(['third-party-cookies', 'inspector-issues'].includes(id) && JSON.stringify(lr.audits[id].details?.items || []).match(/https?:\/\/[^"\s]+/g)?.every(u => ADS.test(u))));
    r.bpFails = bpFails;
    if (bpFails.length) miss.push(`bp ${r.bp}: ${bpFails.join(',')}`);
    if (r.a11y < BUDGET.a11y) miss.push(`a11y ${r.a11y}`);
    if (r.lcp > BUDGET[form].lcp) miss.push(`LCP ${r.lcp}s`);
    if (r.cls > BUDGET.cls) miss.push(`CLS ${r.cls}`);
    if (r.tbt > BUDGET.tbt) miss.push(`TBT ${r.tbt}ms`);
    r.miss = miss; if (miss.length) bad++;
    rows.push(r);
    console.log(`${miss.length ? 'MISS' : 'ok  '} ${form.padEnd(7)} ${p.padEnd(36)} perf ${r.perf} a11y ${r.a11y} bp ${r.bp} seo ${r.seo} LCP ${r.lcp}s CLS ${r.cls} TBT ${r.tbt}ms ${miss.join(', ')}`);
  }
} finally { if (srv) srv.kill(); }
fs.writeFileSync('.cache/lh/summary.json', JSON.stringify(rows, null, 1));
process.exitCode = bad ? 1 : 0;
