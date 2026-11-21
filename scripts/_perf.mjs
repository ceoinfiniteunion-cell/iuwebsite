import { chromium, devices } from '@playwright/test';
import { startServer } from './lib/design-server.mjs';
const site = await startServer(process.cwd());
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['Pixel 7'] });

const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); await cdp.send('Network.enable'); await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await p.addInitScript(() => {
  window.__lcp = []; window.__cls = [];
  new PerformanceObserver(l => l.getEntries().forEach(e => window.__lcp.push({ t: Math.round(e.startTime), el: e.element ? e.element.tagName + '.' + (e.element.className || '') + ' ' + (e.element.textContent || '').trim().slice(0, 40) : '?', size: e.size }))).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls.push({ t: Math.round(e.startTime), v: +e.value.toFixed(4), src: (e.sources || []).map(s => s.node ? s.node.nodeName + '.' + (s.node.className || s.node.id || '') : '?').join(',') }); })).observe({ type: 'layout-shift', buffered: true });
});
await p.goto(`http://127.0.0.1:${site.port}${process.argv[2] || '/'}`);
await p.waitForTimeout(8000);
console.log(JSON.stringify(await p.evaluate(() => ({ lcp: window.__lcp, cls: window.__cls })), null, 1));
await b.close(); site.close();
