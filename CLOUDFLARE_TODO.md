# Cloudflare — що зробити руками

Сайт віддає GitHub Pages; серверних редиректів там немає, тому 301 налаштовуються в Cloudflare.

## 1. Редиректи 301 зі старих `.html` URL (P0)
Cloudflare → домен infiniteunion.com.ua → **Rules → Redirect Rules → Create rule** (Single Redirect):

- **Назва:** `legacy .html → folder URLs`
- **When incoming requests match… → Custom filter expression → Edit expression:**
  ```
  (http.host eq "infiniteunion.com.ua" and starts_with(http.request.uri.path, "/services/") and ends_with(http.request.uri.path, ".html"))
  ```
- **Then… → URL redirect → Dynamic**, expression:
  ```
  concat(regex_replace(http.request.uri.path, "\\.html$", ""), "/")
  ```
  (Якщо `regex_replace` недоступний на вашому плані — використайте Bulk Redirects зі списком нижче.)
- **Status code:** 301 · **Preserve query string:** ✓

Окремі правила (або Bulk Redirect List, якщо простіше):

| Старий URL | Новий URL |
|---|---|
| `/bots.html` | `/services/bots/` |
| `/services/bots-crm.html` | `/services/bots-crm/` |
| `/services/bots-restaurant.html` | `/services/bots-restaurant/` |
| `/services/bots-sales.html` | `/services/bots-sales/` |
| `/services/bots.html` | `/services/bots/` |
| `/services/constructor.html` | `/services/constructor/` |
| `/services/ecosystems.html` | `/services/ecosystems/` |
| `/services/google-ads-search.html` | `/services/google-ads-search/` |
| `/services/google-ads.html` | `/services/google-ads/` |
| `/services/meta-ads-instagram.html` | `/services/meta-ads-instagram/` |
| `/services/meta-ads.html` | `/services/meta-ads/` |
| `/services/platforms.html` | `/services/platforms/` |
| `/services/privacy.html` | `/services/privacy/` |
| `/services/seo-audit.html` | `/services/seo-audit/` |
| `/services/seo-local.html` | `/services/seo-local/` |
| `/services/seo.html` | `/services/seo/` |
| `/services/tiktok-ads.html` | `/services/tiktok-ads/` |
| `/services/websites-corporate.html` | `/services/websites-corporate/` |
| `/services/websites-landing.html` | `/services/websites-landing/` |
| `/services/websites-shop.html` | `/services/websites-shop/` |
| `/services/websites.html` | `/services/websites/` |
| `/index.html` | `/` |
| `/en/index.html` | `/en/` |
| будь-який `/<шлях>/index.html` | `/<шлях>/` |

Друге правило (необов'язкове, прибирає дублі `/index.html`):
```
(http.host eq "infiniteunion.com.ua" and ends_with(http.request.uri.path, "/index.html"))
→ Dynamic: regex_replace(http.request.uri.path, "index\\.html$", "")   · 301
```

**Перевірка після збереження:**
```
curl -sI https://infiniteunion.com.ua/services/bots.html | grep -iE '^HTTP|^location'
# очікуємо: HTTP/2 301 і location: https://infiniteunion.com.ua/services/bots/
```

## 2. Боти та robots.txt (P2)
- **AI Crawl Control / Managed robots.txt:** зараз Cloudflare дописує свій блок перед нашим `robots.txt` (дубль `User-agent: *`, директива `Content-Signal`, яку Lighthouse вважає помилкою → SEO-бал 92 замість 100). Наш файл уже блокує GPTBot, CCBot і Google-Extended. Рекомендую **вимкнути** «Managed robots.txt» (Security → Bots → AI Crawl Control → robots.txt) — або залишити, якщо блок AI-ботів важливіший за 100 у Lighthouse. Googlebot не блокується в жодному з варіантів.
- **Security → Events:** фільтр `User agent contains Googlebot` за 30 днів — переконатися, що немає Managed Challenge / Block. Якщо є — додати правило Skip для `cf.client.bot` (verified bots).
- **Bot Fight Mode:** якщо увімкнено — переконатися, що «Verified bots» дозволені (за замовчуванням так).

## 2b. JavaScript Detections (Best Practices у Lighthouse)
Cloudflare вставляє в кожну сторінку inline-скрипт `/cdn-cgi/challenge-platform/scripts/jsd/main.js` (Bot Management → **JavaScript Detections**).
- На головній його блокує CSP (це нормально, але в консолі помилка), на інших сторінках він дає попередження про застарілі API (FencedFrame, Fledge, StorageType.persistent) → Best Practices 75–82 замість 93–100.
- Рекомендація: Security → Bots → **вимкнути JavaScript Detections**, якщо не використовуєте правила з `cf.bot_management.js_detection` (на Free/Pro їх зазвичай немає). На Googlebot це не впливає.

## 3. Кешування (P2)
- Caching → Configuration → Browser Cache TTL: «Respect Existing Headers» (GitHub Pages віддає `max-age=600`).
- Після деплою зробіть **Caching → Purge Everything**, щоб Cloudflare не віддавав старі HTML.

## 4. Заголовки безпеки
Зараз X-Frame-Options / HSTS / Referrer-Policy вже приходять (Transform Rules). `serve.json` у репозиторії на прод не впливає — він лише для локального `npx serve`.
