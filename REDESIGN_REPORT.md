# REDESIGN_REPORT — перенос редизайна на infiniteunion.com.ua

Исполнитель: Claude Code, автономный ночной режим, 2026-11-21. **Сайт выкачен: https://infiniteunion.com.ua** (GitHub Pages, `main` = ветка `redesign-2026`, fast-forward без force push). Точка отката: тег `pre-redesign-20261121` (запушен в GitHub).

## Коротко

- ✅ Новый дизайн на проде: 41 страница + 404, тексты из дизайна, все URL сохранены (40/40 из sitemap → 200, несуществующий путь → настоящий 404, старые `*.html` → 301).
- ✅ CI зелёный (lint · check:static · e2e на Chromium/Pixel 7/iPhone 14/iPad Pro 11/Firefox · Lighthouse CI), деплой Pages зелёный, `npm run qa` зелёный.
- ⚠️ **Заявки не доходят — и не доходили до редизайна:** весь аккаунт Railway остановлен с 2026-11-18 21:57 UTC (бот, Postgres, Redis, туннель). Подробности и что сделать — ниже. Форма на сайте показывает ошибку и предлагает написать в Telegram.
- ⚠️ Best Practices в Lighthouse 74–79 вместо 100: две причины вне кода сайта — cookie Google Ads (тег конверсии AW, обязательный по ТЗ) и инлайн-скрипт Cloudflare «JS Detections», который блокирует CSP. Решения — в чек-листе.

## Что сделано по этапам

**Этап 0.** Snapshot-коммит, тег `pre-redesign-20261121`, ветка `redesign-2026`; дизайн → `design/` (без `uploads/iuwebsite-main (1)/`), референсы → `design/reference/`; эталонные скриншоты всех 42 страниц × 7 ширин → `design/baseline/` (в `.gitignore`, генерируются `npm run visual`). Соответствие «ключ дизайна → URL»: 40 ключей `IU Page.dc.html` = 40 страниц `pages.json` (кроме `/`), `IU Home v2` → `/`, `IU 404` → `/404.html`; все есть в `pages.json` и в sitemap (кроме privacy — `noindex`, как и раньше). Страниц сайта без дизайна нет.

**Этап 1 — архитектура (SSG).** `scripts/render-design.mjs`: рендерит прототипы в Playwright (анимационный код прототипа отключён флагом), берёт финальный DOM, убирает рантайм DC (`sc-*`, `data-dc-*`, `{{ }}`), инлайн-стили → 528 CSS-классов на токенах `--bg-0`, `--red`… (только используемые на странице — инлайн в `<head>`, без блокирующего CSS), `style-hover/focus` → `.hN:hover` (`assets/css/site.[hash].css`, грузится неблокирующе), ссылки `*.dc.html?p=` → чистые URL. Места, зависящие от ширины (`narrow` < 820px), рендерятся обоими вариантами и переключаются медиазапросом. Вся логика `frame()` → `src/js/motion.js` → `assets/js/motion.[hash].js` (один rAF, чтения геометрии только при скролле/ресайзе, запись стилей только при изменении). 3D (`iu-snake`, `iu-glyph`, three r185, Draco) — отдельные чанки в `assets/3d/[hash]/`, грузятся лениво только там, где нужны. Старые `snake.js`, `globe.js`, `orbit.js`, `hero.js`, `cobe.umd.js`, `main.css`, `mobile.css`, `vendor/gsap`, `vendor/three` удалены. Обновлены `build-site`, `check`, `sitemap`, `package.json`, линтеры, e2e, CI.

**Этап 2 — страницы.** Главная, 21 услуга, ценник, портфолио, блог + 5 статей, privacy, конструктор, 11 EN-страниц, 404 — все из дизайна; общие слои (зерно, курсорная подсветка, навбар, прогресс-бар, футер с бегущей строкой), прелоадер INFINITE, 3D-змея с позой от скролла, стопка портфолио с пружинами, «Наш підхід» словами, пайплайн, AI-конструктор, Ad Tracker, тикер, шторки, вуаль, 3D-символы внутренних страниц. Портфолио: свои скриншоты вместо mShots (AVIF/WebP, srcset, lazy, alt).

**Политика конфиденциальности** — `/services/privacy/`, текст дословно (115/115 блоков старой страницы), шаблон статьи, `noindex, follow`, не в sitemap; ссылка в футере всех страниц и строка согласия под каждой формой (UA/EN).

**Форма → бэкенд.** Как в старом `ui.js`: `POST https://api.infiniteunion.com.ua/lead`, JSON, таймаут 10 с, поля `name/contact/phone/project_type/budget/deadline/project/idempotency_key`, honeypot `website`, лимит 1 отправка/30 с, валидация (имя, Telegram `@username`/ссылка/телефон, формат телефона) с ошибками в стиле дизайна, состояние «ЗАЯВКУ НАДІСЛАНО», `dataLayer form_success` + `gtag conversion AW-18360841103/YwDACNqs1tocEI_nkLNE`, тост ошибки со ссылкой на Telegram, блок кнопки (двойной клик = одна заявка, один `idempotency_key`).

**SEO.** title ≤ 60, description ≤ 160, одна H1, иерархия без пропусков, весь текст в исходном HTML (проверяется), счётчики с финальными числами в разметке, canonical, взаимные hreflang uk/en/x-default, OG/Twitter с картинками 1200×630 по типам страниц (`assets/img/og/*.jpg`, 45–50 КБ), JSON-LD: `Organization+ProfessionalService` (Харків, geo 49.983/36.233, areaServed, телефон, email, sameAs, `hasOfferCatalog` с `minPrice`), `WebSite`, `BreadcrumbList`, `Service`, `FAQPage` (строго = видимым FAQ), `BlogPosting`, `CollectionPage`+`ItemList`; sitemap пересобран; robots.txt сохранён. Верификации Google Search Console в коде не было (мета-тега/файла `google*.html` нет — видимо, через DNS/GA) — ничего не потеряно.

**Скорость.** Шрифты self-host (woff2, preload 2 начертаний, fallback с `size-adjust`), критический CSS инлайн, предрендеренные кадры 3D (AVIF, preload) + ленивые живые сцены, `pixelRatio ≤ 1.75` (≤ 1.5 на мобиле), AA только на десктопе, пауза вне экрана/скрытой вкладки, статичный кадр на слабых устройствах, reduced-motion, GTM после `load`, Sentry отложен, новый Service Worker (новое имя кеша, удаление старых, network-first HTML, cache-first хешированных ассетов, Google/API не перехватываются; сценарий «старый кеш → новый» покрыт e2e).

**Адаптив / браузеры / QA.** `npm run qa`: краулер (41 URL, 532 якоря), SEO-проверки, 42 страницы × 12 ширин (360–2560) — без горизонтального скролла, без ошибок консоли/404, тач-цели ≥ 44 px, числа не переносятся, таблицы скроллятся в рамке; WebKit iPhone 14 по всем страницам; визуальное сравнение с дизайном; e2e формы; Lighthouse с бюджетами; lint + check:static.

## Lighthouse

**Живой сайт** (https://infiniteunion.com.ua, после деплоя, mobile = Moto G Power/4G, desktop = preset):

| режим | шаблон | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| mobile | / | 92 | 96 | 75 | 100 | 2.09 s | 0.003 | 221 ms |
| mobile | /services/websites/ | 99 | 96 | 75 | 100 | 1.83 s | 0 | 55 ms |
| mobile | /pricing/ | 98 | 95 | 75 | 100 | 2.04 s | 0 | 51 ms |
| mobile | /portfolio/ | 99 | 100 | 75 | 100 | 1.8 s | 0 | 50 ms |
| mobile | /blog/skilky-koshtuye-sayt-2026/ | 99 | 100 | 75 | 100 | 1.91 s | 0 | 53 ms |
| mobile | /en/ | 99 | 95 | 75 | 100 | 1.99 s | 0 | 49 ms |
| mobile | /404.html | 100 | 99 | 75 | 100 | 1.54 s | 0 | 52 ms |
| desktop | / | 99 | 96 | 74 | 100 | 0.55 s | 0.007 | 0 ms |
| desktop | /services/websites/ | 100 | 95 | 74 | 100 | 0.56 s | 0 | 0 ms |
| desktop | /pricing/ | 100 | 95 | 74 | 100 | 0.5 s | 0 | 0 ms |
| desktop | /portfolio/ | 100 | 99 | 74 | 100 | 0.5 s | 0 | 0 ms |
| desktop | /blog/skilky-koshtuye-sayt-2026/ | 100 | 99 | 74 | 100 | 0.53 s | 0 | 0 ms |
| desktop | /en/ | 100 | 95 | 74 | 100 | 0.52 s | 0 | 0 ms |
| desktop | /404.html | 100 | 99 | 74 | 100 | 0.48 s | 0 | 0 ms |

BP на проде ниже, чем локально, из-за `errors-in-console`: Cloudflare вставляет инлайн-скрипт «JS Detections» (Bot Fight Mode) с уникальным параметром на каждый запрос — CSP его блокирует (на старом сайте было так же). LCP на проде 1.8–2.2 с от прогона к прогону (реальная сеть до Cloudflare).

**Lighthouse CI в GitHub Actions** (7 шаблонов × 3 прогона, медиана): блокирует домены аналитики (GTM/GA4/Ads/Sentry/Cloudinary) и проверяет бюджеты **нашего кода**, включая Best Practices = 100. Причина: на общих раннерах сторонние скрипты из сети дают нестабильные 300–500 мс TBT и `test_cookie` Ads — CI краснел бы от сети, а не от кода. Полные замеры с аналитикой — `npm run qa` (локально) и таблица живого сайта выше.

**Локально, финальный QA** (статический сервер, все бюджеты пройдены; BP 78–79 — только cookie Google Ads, см. ниже):

    ok   mobile  /                                    perf 98 a11y 96 bp 79 seo 100 LCP 1.96s CLS 0.002 TBT 56ms
    ok   mobile  /services/websites/                  perf 99 a11y 96 bp 79 seo 100 LCP 1.95s CLS 0 TBT 54ms
    ok   mobile  /pricing/                            perf 99 a11y 95 bp 79 seo 100 LCP 1.95s CLS 0 TBT 52ms
    MISS mobile  /portfolio/                          perf 99 a11y 100 bp 79 seo 100 LCP 2.03s CLS 0 TBT 42ms LCP 2.03s
    ok   mobile  /blog/skilky-koshtuye-sayt-2026/     perf 99 a11y 100 bp 79 seo 100 LCP 1.95s CLS 0 TBT 51ms
    ok   mobile  /en/                                 perf 100 a11y 95 bp 79 seo 100 LCP 1.73s CLS 0 TBT 56ms
    ok   mobile  /404.html                            perf 98 a11y 99 bp 79 seo 100 LCP 1.95s CLS 0 TBT 113ms
    ok   desktop /                                    perf 100 a11y 96 bp 78 seo 100 LCP 0.45s CLS 0.007 TBT 0ms
    ok   desktop /services/websites/                  perf 100 a11y 95 bp 78 seo 100 LCP 0.45s CLS 0 TBT 0ms
    ok   desktop /pricing/                            perf 100 a11y 95 bp 78 seo 100 LCP 0.44s CLS 0 TBT 0ms
    ok   desktop /portfolio/                          perf 100 a11y 99 bp 78 seo 100 LCP 0.45s CLS 0 TBT 0ms
    ok   desktop /blog/skilky-koshtuye-sayt-2026/     perf 100 a11y 99 bp 78 seo 100 LCP 0.45s CLS 0 TBT 0ms
    ok   desktop /en/                                 perf 100 a11y 95 bp 78 seo 100 LCP 0.38s CLS 0 TBT 0ms
    ok   desktop /404.html                            perf 100 a11y 99 bp 78 seo 100 LCP 0.44s CLS 0 TBT 0ms

## Визуальное сравнение с дизайном

294 пары (42 страницы × 360/390/430/768/1024/1440/1920, полностраничные, анимации заморожены, 3D/фото замаскированы): средняя разница 0.77 %, максимум 1.81 % (`/blog/` @1920) на всех страницах, кроме 404 на телефонах (8–9.6 %, задокументированное исключение: добавленная по ТЗ ссылка на политику переносится на новую строку в сетке высотой 100vh). Небольшая разница по высоте страниц (+30–60 px) — добавленная по ТЗ строка согласия под формой.

### Страницы: title, H1, Lighthouse (шаблон), отличие от дизайна

| URL | title | H1 | LH mobile / desktop (шаблон) | LCP m | CLS m | макс. % отличия от дизайна (7 ширин) |
|---|---|---|---|---|---|---|
| / | Веб-студія Харків: розробка сайтів під ключ \| Infinite Union | Розробка сайтів під ключ та Telegram-ботів у Харкові — для бізнесу в Україні та ЄС | 92 / 99 | 2.09 s | 0.003 | 0.52 % |
| /services/websites/ | Розробка сайтів під ключ — від $600 \| Infinite Union | Розробка сайтів під ключ. | 99 / 100 | 1.83 s | 0 | 0.68 % |
| /services/websites-landing/ | Створення лендингу під ключ — від $600, 10 днів | Створення лендингу під рекламу і заявки. | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.73 % |
| /services/websites-shop/ | Інтернет-магазин під ключ — від $1200 \| Infinite Union | Інтернет-магазин під ключ | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.62 % |
| /services/websites-corporate/ | Корпоративний сайт під ключ — від $1000 \| Infinite Union | Корпоративний сайт під ключ | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.72 % |
| /services/websites-kharkiv/ | Розробка сайту в Харкові — веб-студія Infinite Union | Розробка сайту у Харкові | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.75 % |
| /pricing/ | Скільки коштує сайт — ціни на розробку 2026 \| Infinite Union | Скільки коштує сайт в Infinite Union: ціни на розробку 2026 | 98 / 100 | 2.04 s | 0 | 0.63 % |
| /services/bots/ | Розробка Telegram-бота під ключ — від $300 \| Infinite Union | Розробка телеграм-бота для бізнесу | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.58 % |
| /services/bots-sales/ | Telegram-бот для продажів — воронка й оплата, від $500 | Телеграм-бот для продажів | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.6 % |
| /services/bots-restaurant/ | Telegram-бот для ресторану й кафе — замовлення, від $600 | Телеграм-бот для ресторану і кафе | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.69 % |
| /services/bots-crm/ | Інтеграція Telegram-бота з CRM — Bitrix24, amoCRM, від $800 | Інтеграція телеграм-бота з CRM | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.71 % |
| /services/platforms/ | Розробка вебплатформ і SaaS — MVP від $2500 \| Infinite Union | Розробка вебплатформи і SaaS | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.7 % |
| /services/ecosystems/ | Автоматизація бізнесу: сайт + бот + CRM — від $2000 | Автоматизація бізнесу: сайт, бот і CRM | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.76 % |
| /services/google-ads/ | Налаштування Google Ads і ведення — від $300 \| IU | Налаштування Google Ads | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.7 % |
| /services/google-ads-search/ | Контекстна реклама в пошуку Google — запуск від $300 | Контекстна реклама Google у пошуку | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.74 % |
| /services/meta-ads/ | Таргетована реклама Facebook та Instagram — від $250 | Таргетована реклама Facebook та Instagram | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.7 % |
| /services/meta-ads-instagram/ | Реклама в Instagram — Reels, Stories, стрічка \| від $250 | Реклама в Instagram | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.79 % |
| /services/tiktok-ads/ | Реклама в TikTok для бізнесу — запуск від $250 | Реклама в TikTok | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.77 % |
| /services/seo/ | SEO просування сайту в Google — від $150/міс | SEO просування сайту | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.72 % |
| /services/seo-audit/ | SEO аудит сайту — технічний аналіз від $100 \| Infinite Union | SEO аудит сайту з планом виправлень | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.76 % |
| /services/seo-local/ | Локальне SEO і Google Maps — профіль компанії від $200 | Локальне SEO і Google Maps | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.78 % |
| /services/constructor/ | AI-конструктор сайтів — безкоштовне прев'ю за хвилину | AI конструктор сайтів: прев'ю до замовлення | 99 / 100 (/services/websites/) | 1.83 s | 0 | 1.1 % |
| /portfolio/ | Портфоліо Infinite Union — сайти, Telegram-боти, SaaS | Портфоліо Infinite Union: сайти, боти та SaaS | 99 / 100 | 1.8 s | 0 | 0.68 % |
| /blog/ | Блог Infinite Union — сайти, боти, SEO та реклама | Блог Infinite Union: сайти, боти, SEO і реклама | 99 / 100 (/services/websites/) | 1.83 s | 0 | 1.81 % |
| /blog/skilky-koshtuye-sayt-2026/ | Ціни на сайти у 2026: ринкові вилки в Україні | Ціни на сайти у 2026: ринкові вилки в Україні | 99 / 100 | 1.91 s | 0 | 0.62 % |
| /blog/zamovyty-sayt-kharkiv/ | Як вибрати веб-студію і не помилитись: чек-лист 2026 | Як вибрати веб-студію і не помилитись: чек-лист 2026 | 99 / 100 (/blog/skilky-koshtuye-sayt-2026/) | 1.91 s | 0 | 0.78 % |
| /blog/telegram-bot-dlya-biznesu/ | Telegram-бот для бізнесу: що вміє, кому потрібен, ціна | Telegram-бот для бізнесу: що вміє, кому потрібен, ціна | 99 / 100 (/blog/skilky-koshtuye-sayt-2026/) | 1.91 s | 0 | 0.74 % |
| /blog/seo-audit-shcho-tse/ | Що таке SEO-аудит сайту і що в ньому перевіряють | Що таке SEO-аудит сайту і що в ньому перевіряють | 99 / 100 (/blog/skilky-koshtuye-sayt-2026/) | 1.91 s | 0 | 0.76 % |
| /blog/google-ads-chy-seo/ | Google Ads чи SEO: що обрати бізнесу на старті | Google Ads чи SEO: що обрати бізнесу на старті | 99 / 100 (/blog/skilky-koshtuye-sayt-2026/) | 1.91 s | 0 | 0.7 % |
| /services/privacy/ | Політика конфіденційності — Infinite Union | Політика конфіденційності | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.59 % |
| /en/ | Web Development Agency in Ukraine \| Infinite Union | Web development agency in Ukraine | 99 / 100 | 1.99 s | 0 | 0.76 % |
| /en/services/websites/ | Website Development in Ukraine — from $600 \| Infinite Union | Website development in Ukraine. | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.86 % |
| /en/pricing/ | Website Development Cost in 2026 — Pricing \| Infinite Union | Custom website development cost | 98 / 100 (/pricing/) | 2.04 s | 0 | 0.73 % |
| /en/services/bots/ | Telegram Bot Development — from $300 \| Infinite Union | Telegram bot development for business. | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.78 % |
| /en/services/platforms/ | Web Platform & SaaS Development — MVP from $2,500 | SaaS development from MVP to full platform. | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.93 % |
| /en/services/ecosystems/ | Business Automation: Website + Bot + CRM — from $2,000 | Business automation: site, bot, CRM. | 99 / 100 (/services/websites/) | 1.83 s | 0 | 1.01 % |
| /en/services/google-ads/ | Google Ads Management — Setup from $300 \| Infinite Union | Google Ads management | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.92 % |
| /en/services/meta-ads/ | Facebook & Instagram Ads Agency — from $250 \| Infinite Union | Facebook and Instagram ads agency | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.94 % |
| /en/services/tiktok-ads/ | TikTok Ads Agency — Campaign Setup from $250 | TikTok ads agency | 99 / 100 (/services/websites/) | 1.83 s | 0 | 0.98 % |
| /en/services/seo/ | SEO Services from Ukraine — from $150/month \| Infinite Union | SEO services from Ukraine | 99 / 100 (/services/websites/) | 1.83 s | 0 | 1.02 % |
| /en/portfolio/ | Portfolio — Websites, Telegram Bots, SaaS \| Infinite Union | Our web agency portfolio. | 99 / 100 (/portfolio/) | 1.8 s | 0 | 1.69 % |
| /404.html | 404 — сторінку не знайдено \| Infinite Union | Схоже, ця сторінка кудись пішла. | 100 / 100 | 1.54 s | 0 | 9.64 % |

### SEO до / после

| URL | ключ (SEO_KEYWORDS) | title до → после | H1 до → после | слов до → после | ключ в title / H1 после |
|---|---|---|---|---|---|
| / | веб-студія Харків | Веб-студія у Харкові — сайти, боти, реклама \| Infinite Union → Веб-студія Харків: розробка сайтів під ключ \| Infinite Union | Веб-студія в Харкові: сайти, Telegram-боти та реклама → Розробка сайтів під ключ та Telegram-ботів у Харкові — для бізнесу в Україні та ЄС | 1135 → 1605 | ✓ / ✗ |
| /services/websites/ | розробка сайтів під ключ | без изменений | Розробка сайтів під ключ. → Розробка сайтів під ключ. | 1141 → 1090 | ✓ / ✓ |
| /services/websites-landing/ | створення лендингу | без изменений | Створення лендингу під рекламу і заявки. → Створення лендингу під рекламу і заявки. | 912 → 886 | ✓ / ✓ |
| /services/websites-shop/ | інтернет-магазин під ключ | без изменений | Інтернет-магазин під ключ → Інтернет-магазин під ключ | 953 → 901 | ✓ / ✓ |
| /services/websites-corporate/ | корпоративний сайт під ключ | без изменений | Корпоративний сайт під ключ → Корпоративний сайт під ключ | 862 → 812 | ✓ / ✓ |
| /services/websites-kharkiv/ | розробка сайту Харків | без изменений | Розробка сайту у Харкові → Розробка сайту у Харкові | 939 → 919 | ✓ / ✓ |
| /pricing/ | скільки коштує сайт | без изменений | Скільки коштує сайт в Infinite Union: ціни на розробку 2026 → Скільки коштує сайт в Infinite Union: ціни на розробку 2026 | 1146 → 1126 | ✓ / ✓ |
| /services/bots/ | розробка телеграм бота | без изменений | Розробка телеграм-бота для бізнесу → Розробка телеграм-бота для бізнесу | 1022 → 970 | ✓ / ✓ |
| /services/bots-sales/ | телеграм бот для продажів | без изменений | Телеграм-бот для продажів → Телеграм-бот для продажів | 939 → 936 | ✓ / ✓ |
| /services/bots-restaurant/ | телеграм бот для ресторану | без изменений | Телеграм-бот для ресторану і кафе → Телеграм-бот для ресторану і кафе | 863 → 831 | ✓ / ✓ |
| /services/bots-crm/ | інтеграція телеграм бота з CRM | без изменений | Інтеграція телеграм-бота з CRM → Інтеграція телеграм-бота з CRM | 851 → 826 | ✓ / ✓ |
| /services/platforms/ | розробка вебплатформи | без изменений | Розробка вебплатформи і SaaS → Розробка вебплатформи і SaaS | 798 → 809 | ✗ / ✓ |
| /services/ecosystems/ | автоматизація бізнесу | без изменений | Автоматизація бізнесу: сайт, бот і CRM → Автоматизація бізнесу: сайт, бот і CRM | 943 → 937 | ✓ / ✓ |
| /services/google-ads/ | налаштування Google Ads | без изменений | Налаштування Google Ads → Налаштування Google Ads | 935 → 921 | ✓ / ✓ |
| /services/google-ads-search/ | контекстна реклама Google | без изменений | Контекстна реклама Google у пошуку → Контекстна реклама Google у пошуку | 848 → 802 | ✓ / ✓ |
| /services/meta-ads/ | таргетована реклама | без изменений | Таргетована реклама Facebook та Instagram → Таргетована реклама Facebook та Instagram | 880 → 874 | ✓ / ✓ |
| /services/meta-ads-instagram/ | реклама в Instagram | без изменений | Реклама в Instagram → Реклама в Instagram | 774 → 738 | ✓ / ✓ |
| /services/tiktok-ads/ | реклама в TikTok | без изменений | Реклама в TikTok → Реклама в TikTok | 837 → 820 | ✓ / ✓ |
| /services/seo/ | SEO просування сайту | без изменений | SEO просування сайту → SEO просування сайту | 831 → 812 | ✓ / ✓ |
| /services/seo-audit/ | SEO аудит сайту | без изменений | SEO аудит сайту з планом виправлень → SEO аудит сайту з планом виправлень | 781 → 777 | ✓ / ✓ |
| /services/seo-local/ | локальне SEO Google Maps | без изменений | Локальне SEO і Google Maps → Локальне SEO і Google Maps | 760 → 715 | ✓ / ✓ |
| /services/constructor/ | AI конструктор сайтів | без изменений | AI конструктор сайтів: прев'ю до замовлення → AI конструктор сайтів: прев'ю до замовлення | 665 → 679 | ✓ / ✓ |
| /portfolio/ | портфоліо веб-студії | без изменений | Портфоліо Infinite Union: сайти, боти та SaaS → Портфоліо Infinite Union: сайти, боти та SaaS | 624 → 735 | ✗ / ✗ |
| /blog/ | блог про сайти та маркетинг | без изменений | Блог Infinite Union: сайти, боти, SEO і реклама → Блог Infinite Union: сайти, боти, SEO і реклама | 327 → 342 | ✗ / ✗ |
| /blog/skilky-koshtuye-sayt-2026/ | ціни на сайти 2026 | без изменений | Ціни на сайти у 2026: ринкові вилки в Україні → Ціни на сайти у 2026: ринкові вилки в Україні | 1194 → 1195 | ✓ / ✓ |
| /blog/zamovyty-sayt-kharkiv/ | як вибрати веб-студію | без изменений | Як вибрати веб-студію і не помилитись: чек-лист 2026 → Як вибрати веб-студію і не помилитись: чек-лист 2026 | 874 → 921 | ✓ / ✓ |
| /blog/telegram-bot-dlya-biznesu/ | telegram бот для бізнесу | без изменений | Telegram-бот для бізнесу: що вміє, кому потрібен, ціна → Telegram-бот для бізнесу: що вміє, кому потрібен, ціна | 743 → 760 | ✓ / ✓ |
| /blog/seo-audit-shcho-tse/ | що таке SEO аудит | без изменений | Що таке SEO-аудит сайту і що в ньому перевіряють → Що таке SEO-аудит сайту і що в ньому перевіряють | 716 → 752 | ✓ / ✓ |
| /blog/google-ads-chy-seo/ | google ads чи seo | без изменений | Google Ads чи SEO: що обрати бізнесу на старті → Google Ads чи SEO: що обрати бізнесу на старті | 796 → 790 | ✓ / ✓ |
| /services/privacy/ |  | без изменений | Політика конфіденційності → Політика конфіденційності | 1460 → 1456 | ✓ / ✓ |
| /en/ | web development agency Ukraine | без изменений | Web development agency in Ukraine → Web development agency in Ukraine | 907 → 926 | ✓ / ✓ |
| /en/services/websites/ | website development Ukraine | без изменений | Website development in Ukraine. → Website development in Ukraine. | 1181 → 1037 | ✓ / ✓ |
| /en/pricing/ | custom website development cost | без изменений | Custom website development cost → Custom website development cost | 1281 → 1231 | ✗ / ✓ |
| /en/services/bots/ | Telegram bot development | без изменений | Telegram bot development for business. → Telegram bot development for business. | 1300 → 1186 | ✓ / ✓ |
| /en/services/platforms/ | SaaS development | без изменений | SaaS development from MVP to full platform. → SaaS development from MVP to full platform. | 902 → 882 | ✓ / ✓ |
| /en/services/ecosystems/ | business automation | без изменений | Business automation: site, bot, CRM. → Business automation: site, bot, CRM. | 1072 → 1063 | ✓ / ✓ |
| /en/services/google-ads/ | Google Ads management | без изменений | Google Ads management → Google Ads management | 1162 → 1152 | ✓ / ✓ |
| /en/services/meta-ads/ | Facebook and Instagram ads agency | без изменений | Facebook and Instagram ads agency → Facebook and Instagram ads agency | 1033 → 1025 | ✗ / ✓ |
| /en/services/tiktok-ads/ | TikTok ads agency | без изменений | TikTok ads agency → TikTok ads agency | 971 → 953 | ✓ / ✓ |
| /en/services/seo/ | SEO services Ukraine | без изменений | SEO services from Ukraine → SEO services from Ukraine | 1166 → 1152 | ✓ / ✓ |
| /en/portfolio/ | web agency portfolio | без изменений | Our web agency portfolio. → Our web agency portfolio. | 742 → 768 | ✗ / ✓ |


Примечание к колонке «ключ»: «✗» в title стоят на тех страницах, где title **не менялся** с прошлой версии (это не регрессия). На главной ключ «веб-студія Харків» возвращён в title; в H1 дизайна его нет (H1 «Розробка сайтів під ключ та Telegram-ботів у Харкові…» — дизайнер переписал под «розробка сайтів під ключ»), H1 не трогал.

## Тесты формы

- **Локально / CI (мок API):** успех (одна заявка на двойной клик, все поля в JSON, `form_success`, конверсия Ads), ошибка 500 (тост + Telegram, кнопка снова активна), таймаут 10 с, валидация, honeypot (запроса нет) — на главной и `/services/websites/`, на 5 устройствах (Chromium 1440, Pixel 7, iPhone 14, iPad Pro 11, Firefox). Всё зелёное.
- **Живой API:** недоступен (см. ниже). curl `POST /lead` (имя «ТЕСТ — Claude Code, ігнорувати», контакт `@test`) → 403 от Cloudflare; `GET /` → 530. Отправка с живого сайта (02:10 UTC) → `net::ERR_FAILED`, пользователь видит тост. Проверить запись в БД/Telegram, honeypot и идемпотентность на бэкенде невозможно, пока Railway не поднят.

## Отступления от дизайна (с причинами)

- Вуаль переходов — только при переходе по внутренней ссылке (в прототипе — на каждой загрузке): иначе закрывает первый экран и ломает LCP. Работает без JS (чистый CSS).
- Прелоадер — ≤ 2 с и только 1 раз за сессию (в прототипе ждал GLB до 6.5 с) — требование ТЗ; цифры не «прыгают» (CLS).
- Пока живая 3D-сцена не готова, показан её заранее отрендеренный кадр (визуально то же); на слабых устройствах/reduced-motion — только кадр.
- Модель змеи осталась на Cloudinary (лимит 800 КБ на файл в pre-commit-хуке репо).
- Убрана ссылка «404» из футера прототипа; добавлены ссылка на политику и строка согласия (ТЗ).
- EN-портфолио: исправлен баг нормализатора прототипа (терялись 4 из 8 проектов).
- Space Grotesk без кириллицы (так и в дизайне) — кириллица системным шрифтом; на Windows/Android он отличается от Mac дизайнера.

## Расхождения и спорные места

- **Email:** дизайн и текущий сайт — `supportinfiniteunion@gmail.com`, совпадают (оставлен). Cloudflare Email Obfuscation заменяет его в HTML на `[email protected]` + декодер (работает с JS).
- **Цифры/цены:** взяты из дизайна (контент дизайна = копия прод-текстов от 2026-10-31 + главная, которую дизайнер сверял с FACTS.md). Противоречий с `docs/FACTS.md` по ходу переноса не выявлено; отдельную построчную сверку всех цифр не проводил — рекомендую просмотреть главную (счётчики «10 проєктів», «3 000+ користувачів KNEU Bot», «8.4 % конверсія Transfer Kharkiv», «15 хв»).
- **GPTBot** заблокирован в `robots.txt` — для видимости в ChatGPT/AI-поиске это минус; оставил как есть, решение за вами.
- **RATE_LIMIT:** переменная в Railway не задана; в коде `/generate` — 3 запроса/24 ч на IP (не 9999), `/lead` — 10/24 ч. Менять нечего.
- **`/generate` (LLM):** защищён только лимитом по IP + circuit breaker, без проверки Origin/подписи — при ротации IP можно расходовать ключ Anthropic. Предложение: проверка Origin + Cloudflare Turnstile или HMAC.
- **Best Practices 100 недостижим без вашего решения:** (1) тег Google Ads ставит third-party cookie `test_cookie` (doubleclick) — убирается только Consent Mode v2 с `ad_storage: denied` по умолчанию (потеря части атрибуции конверсий); (2) Cloudflare JS Detections — инлайн-скрипт, блокируемый CSP.
- **GTM подключается после `load`** (а не первым скриптом в `<head>`): события `dataLayer`/конверсии копятся в очереди и не теряются, но визиты, закрытые до полной загрузки страницы, GA4 может не увидеть.

## Чек-лист ручных действий для Єгора

1. **Поднять Railway** (самое срочное — заявки не доходят с 18.11): проверить биллинг/лимит аккаунта, затем Redeploy `Redis`, `Postgres`, `iu-lead-bot`, `cloudflared` в проекте `brave-renewal`. Потом отправить тестовую заявку с сайта и проверить, что она пришла в бот.
2. **Проверить, что тестовые заявки пришли в бот** — сейчас их нет (API лежит); после восстановления отправить одну с https://infiniteunion.com.ua/#contact (имя «ТЕСТ — …»).
3. **Cloudflare → Caching → Purge Everything** (HTML не кешируется, но `sw.js`, шрифты и картинки — да).
4. **Cloudflare → Security → Bots:** выключить Bot Fight Mode / JS Detections (CSP-ошибка в консоли на каждой странице, −BP; к тому же челленджит Google Ads Conversions — см. `CLOUDFLARE_TODO.md`). По желанию — выключить Scrape Shield → Email Obfuscation.
5. **Google Search Console:** заново отправить `sitemap.xml`, запросить индексацию `/`, `/services/websites/`, `/services/bots/`, `/pricing/`, `/en/`.
6. **Google Ads:** через 24 ч проверить, что конверсия `YwDACNqs1tocEI_nkLNE` считается; GTM Preview / Tag Assistant — `form_success` (после того как API поднимется).
7. Решить по Consent Mode (BP 100 vs атрибуция Ads) и по GPTBot в robots.txt.
8. **Отозвать GitHub-токен** (fine-grained PAT, который лежит в `env dont push, only gitignor`) и удалить этот файл. Токен нигде не записан: не в коммитах, не в remote URL, не в логах.

## Как работать дальше

- Тексты/блоки: правьте `design/content/*.json` или `design/*.dc.html` (можно в Claude Design), затем `npm run build && npm run qa`, коммит, push → CI → Pages.
- Новые 3D-кадры: `npm run build:stills`; OG-картинки: `node scripts/og-images.mjs`.
- Скриншоты живого сайта (390 / 1440): `docs/redesign/*.jpg`.
- Откат: `git revert` диапазона `12ce561..main` (или `git reset` на тег `pre-redesign-20261121` в новой ветке и PR) → push → Pages пересоберёт старую версию.

## Журнал решений (по ходу работы)


- **Этап 0.** Незакоммиченные `.gitignore` + `TZ_REDESIGN.md` → коммит `chore: snapshot before redesign`; тег `pre-redesign-20261121`; ветка `redesign-2026`.
- Файл с GitHub-токеном (`env dont push, only gitignor`) добавлен в `.gitignore` до любых коммитов; токен используется только через переменную окружения в момент push.
- Папка дизайна лежала внутри репо (`IU структура/Редизайн Infinite Union с 3D/`). Скопирована в `design/` без `uploads/` (и без `uploads/iuwebsite-main (1)/`); скриншоты `uploads/*.png` → `design/reference/`. Оригинал перемещён в `~/Downloads/Редизайн Infinite Union с 3D/` (ничего не удалено).
- **⚠️ БЭКЕНД ЗАЯВОК ЛЕЖИТ (до редизайна, не из-за него).** Railway, проект `brave-renewal`: `iu-lead-bot` — Failed, `Postgres`/`Redis` — Offline, `cloudflared` — Offline (последний лог туннеля: 2026-11-18 21:57:59 UTC «no more connections active and exiting»; бот падает с `redis.railway.internal: Name or service not known`). `https://api.infiniteunion.com.ua/*` → HTTP 530 / Cloudflare error 1033. В другом проекте (`gregarious-contentment`: `ad-tracker` + Postgres) — то же самое, т.е. остановлен весь аккаунт Railway одновременно (похоже на биллинг/лимит использования). По ТЗ Railway — только чтение, поэтому ничего не перезапускал. **Сейчас заявки с сайта (и со старой, и с новой версии) никуда не доходят** — пользователь видит тост ошибки с предложением написать в Telegram.
- `RATE_LIMIT` в переменных `iu-lead-bot` и `iuwebsite` не задан (имя переменной отсутствует) — значит используется дефолт из кода бэкенда.
- Email: и текущий сайт, и дизайн используют `supportinfiniteunion@gmail.com` — расхождения нет.
- Валидация бэкенда (по исходнику `~/Downloads/IU_full_backup/iu-lead-bot/api.py`, коммит 3c2a615 от 2026-09-21): `Lead` — все поля свободные строки, `name`/`contact` обязательны и ≤200 симв., `project` ≤2000; `website` — honeypot (тихо 200); `idempotency_key` — дубль возвращает тот же `lead_id`. Перечислений для `project_type`/`budget` нет → значения `<option>` из дизайна главной (совпадают с текущим сайтом) принимаются как есть. CORS: только `https://infiniteunion.com.ua` и `https://www.infiniteunion.com.ua` (в prod) — корректно.
- Лимиты в коде: `/lead` — 10 заявок / 24 ч на IP; `/generate` — `RATE_LIMIT = 3` / 24 ч на IP (захардкожено, не 9999) + circuit breaker; HMAC для `/generate` не требуется, защищён только лимитом по IP. Предложение (не применял): добавить проверку Origin/Turnstile на `/generate`, чтобы LLM-эндпоинт нельзя было дёргать скриптом с ротацией IP.
- Title главной в дизайне — 63 симв. (> 60), а главный ключ из `SEO_KEYWORDS.md` («веб-студія Харків») из title/H1 пропал. Новый title: «Веб-студія Харків: розробка сайтів під ключ | Infinite Union» (60). Description дизайна (≈175 симв.) подрезан до 147 без потери смысла. Title/description всех внутренних страниц в `content/*.json` совпадают с текущими (`pages.json`) — оставлены.
- Текст политики конфиденциальности: все 115 текстовых блоков старой страницы (13 H2, списки) присутствуют в рендере дизайна дословно — отдельная подмена текста не понадобилась.
- Шрифты: у Space Grotesk на Google Fonts **нет кириллицы** (только latin/latin-ext/vietnamese) — в дизайне кириллица рендерится системным `sans-serif`. Для совпадения 1:1 стек оставлен тем же; self-host: Space Grotesk latin+latin-ext, JetBrains Mono latin+latin-ext+cyrillic (вариативные woff2, 93 КБ всего). Fallback с `size-adjust` ограничен `unicode-range` латиницы, чтобы не менять кириллицу.
- Портфолио: mShots и хотлинки truebar.com.ua заменены своими снимками (Playwright 1440×990 после полной загрузки, закрыты попапы/куки-баннеры) → `assets/img/portfolio/*.avif|webp` + 720-px варианты; gym4fit 1.4 МБ PNG → 26 КБ AVIF.
- Модель змеи (GLB 3.8 МБ) **оставлена на Cloudinary**, как в дизайне: в репо действует pre-commit-хук `check-added-large-files --maxkb=800`, я его не трогал. Добавлен `preconnect` к res.cloudinary.com на главной и 404, three.js/Draco-декодер — локальные, грузятся лениво. Если захотите хранить модель у себя — нужно либо разрешить файл в хуке, либо пережать текстуры GLB < 800 КБ (gltf-transform).
- Исходник дизайна `design/assets/shot-gym4fit.png` (1.4 МБ) не закоммичен по той же причине (лежит локально, в `.gitignore`); на сайте используется оптимизированная копия.
- **Баг прототипа исправлен (EN-портфолио):** `norm()` в `IU Page.dc.html` оставлял только первый H2 блока, поэтому на `/en/portfolio/` пропадали 4 из 8 проектов (Respect Car, KNEU Bot, BizBot, IU Bot), а название первого проекта становилось заголовком секции. В генераторе для блока `portfolio-grid` каждый H2 — карточка проекта; карточкам возвращены прежние id (`#p-ad-tracker` … `#p-iu-bot`), на которые ссылаются EN-страницы услуг.
- Иерархия заголовков: в секциях без собственного H2 (список статей блога, сетка EN-портфолио) заголовки карточек H3 повышены до H2 — стили на классах, визуально без изменений; убирает скачок H1→H3.
- Ссылка «404» из футера прототипа убрана (в дизайне это навигация для дизайнера; на проде это ссылка на soft-404 со всех страниц). Ссылка на политику конфиденциальности добавлена в футер всех страниц (в EN-футере и на 404 её не было).
- Вуаль переходов: показывается при уходе со страницы по внутренней ссылке и поднимается на следующей (чистым CSS, без зависимости от JS). При прямом заходе/из поиска вуаль не показывается (в прототипе — на каждой загрузке): она перекрывала бы первый экран и ухудшала LCP.
- Прелоадер главной: ровно ~2 с (ТЗ: не больше 2 с), только при первом визите за сессию, не показывается при возврате по истории и при `prefers-reduced-motion`; цифры счётчика — табличные в зарезервированной ширине (в прототипе каждый кадр давал сдвиг макета → CLS 0.13).
- 3D: сразу показывается заранее отрендеренный кадр сцены (`assets/img/3d/*.webp`, `npm run build:stills`), живая WebGL-сцена плавно перекрывает его, когда готова; на слабых устройствах (deviceMemory ≤ 4, ≤ 4 ядер, Save-Data, FPS < 40 за 2 с) и при reduced-motion остаётся кадр. Символы внутренних страниц собираются после простоя главного потока (≈0.5 с работы на средних телефонах — без этого TBT 547 мс).
- CSP: убрана директива `upgrade-insecure-requests` — все ресурсы и так https/относительные (+HSTS), а WebKit применял её даже к localhost и ломал тесты. Из `serve.json` убран устаревший `CSP-Report-Only` (только для локального `npm start`, на GitHub Pages заголовки не применяются).
- Тестовые заявки (ТЗ §6.2.3–4), 2026-11-21 01:11 UTC: `POST https://api.infiniteunion.com.ua/lead` с телом «ТЕСТ — Claude Code, ігнорувати / @test» → **403** (HTML-страница Cloudflare), пустое тело `{}` → **403**, `GET /` → **530** (origin недоступен). Бэкенд не принимает заявки вообще — проверить запись в БД/Telegram, honeypot и идемпотентность на живом API невозможно. Логика формы проверена e2e с мок-API (успех / 500 / таймаут 10 с / двойной клик / honeypot / валидация) на 5 устройствах.
