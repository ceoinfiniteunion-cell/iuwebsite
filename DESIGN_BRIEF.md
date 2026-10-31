# DESIGN_BRIEF — Infinite Union (infiniteunion.com.ua)

Поточний прод-контент із гілки `main` (коміт `b7b90b7`), зібраний автоматично скриптом `node scripts/design-content.mjs`. Текст узято з HTML дослівно: нічого не дописано й не переписано. Структуровані дані для зворотної верстки лежать у `design-content/*.json` (по файлу на сторінку + `_site.json` зі спільними даними).

**Сторінок:** 42 (41 з `scripts/pages.json` + 404) · **UA:** 31 · **EN:** 11 · **Слів видимого контенту:** 37 238 (без меню й футера).

Як читати блоки: `тип` (hero, problem/cards, process, pricing-tiers, portfolio, faq, cta-form…) визначено автоматично за класами й вмістом, поруч — оригінальний тег і класи. `_[декор, aria-hidden]_` — текст, який видно, але він декоративний (бігучий рядок, великі цифри). `_[клас]_` перед текстом — роль дрібного елемента (лейбл, бейдж, підпис).

## Зміст

1. [Навігація і перемикач мови](#1-навігація-і-перемикач-мови)
2. [Футер](#2-футер)
3. [Контакти](#3-контакти)
4. [Єдиний прайс](#4-єдиний-прайс)
5. [Шаблони сторінок](#5-шаблони-сторінок)
6. [Кольори, шрифти, ассети](#6-кольори-шрифти-ассети)
7. [Сторінки](#7-сторінки)
8. [Перевірка повноти](#8-перевірка-повноти)

## 1. Навігація і перемикач мови

Шапку кожна сторінка верстає сама, тому меню між шаблонами різне. Нижче — як воно виглядає зараз.

**Головна UK (`/`)** — десктопне меню `.n-links`, CTA `.n-cta`, бургер `#burger` → мобільне меню `#mob`:

- INFINITE UNION → /#hero
- Послуги → /#services
- Роботи → /portfolio/
- Ціни → /pricing/
- Контакт → /#contact
- Блог → /blog/
- EN → /en/
- Замовити проект → /#contact
- 01 Послуги → /#services
- 02 Портфоліо → /portfolio/
- 03 Ціни → /pricing/
- 04 Блог → /blog/

**Головна EN (`/en/`)** — десктопне меню `.n-links`, CTA `.n-cta`, бургер `#burger` → мобільне меню `#mob`:

- INFINITE UNION → /en/#hero
- Services → /en/#services
- Portfolio → /en/#portfolio
- Contact → /en/#contact
- UA → /
- Start a project → /en/#contact

**Решта сторінок** — шапка `nav-back` + логотип + перемикач мови + CTA `.nav-cta`:

| Сторінка | ← Назад | Логотип | Мова | CTA | Інші пункти |
|---|---|---|---|---|---|
| `/services/websites/` | ← Назад → / | / | EN → /en/services/websites/ | ЗАМОВИТИ САЙТ → /services/websites/#contact | — |
| `/services/websites-landing/` | ← Розробка сайтів → /services/websites/ | / | EN → /en/services/websites/ | ЗАМОВИТИ ЛЕНДІНГ → /services/websites-landing/#contact | — |
| `/services/websites-shop/` | ← Розробка сайтів → /services/websites/ | / | EN → /en/services/websites/ | ЗАМОВИТИ МАГАЗИН → /services/websites-shop/#contact | — |
| `/services/websites-corporate/` | ← Розробка сайтів → /services/websites/ | / | EN → /en/services/websites/ | ЗАМОВИТИ САЙТ → /services/websites-corporate/#contact | — |
| `/services/websites-kharkiv/` | ← Розробка сайтів → /services/websites/ | / | EN → /en/services/websites/ | ЗАМОВИТИ ЛЕНДІНГ → /services/websites-kharkiv/#contact | — |
| `/pricing/` | ← Назад → / | / | EN → /en/pricing/ | ДІЗНАТИСЬ ЦІНУ → /pricing/#contact | — |
| `/services/bots/` | ← Назад → / | / | EN → /en/services/bots/ | ЗАМОВИТИ БОТА → /services/bots/#contact | — |
| `/services/bots-sales/` | ← Telegram боти → /services/bots/ | / | EN → /en/services/bots/ | ЗАМОВИТИ БОТА → /services/bots-sales/#contact | — |
| `/services/bots-restaurant/` | ← Telegram боти → /services/bots/ | / | EN → /en/services/bots/ | ЗАМОВИТИ БОТА → /services/bots-restaurant/#contact | — |
| `/services/bots-crm/` | ← Telegram боти → /services/bots/ | / | EN → /en/services/bots/ | ЗАМОВИТИ ІНТЕГРАЦІЮ → /services/bots-crm/#contact | — |
| `/services/platforms/` | ← Назад → / | / | EN → /en/services/platforms/ | ЗАМОВИТИ ПЛАТФОРМУ → /services/platforms/#contact | — |
| `/services/ecosystems/` | ← Назад → / | / | EN → /en/services/ecosystems/ | ЗАМОВИТИ ЕКОСИСТЕМУ → /services/ecosystems/#contact | — |
| `/services/google-ads/` | ← Назад → / | / | EN → /en/services/google-ads/ | ЗАПУСТИТИ GOOGLE ADS → /services/google-ads/#contact | — |
| `/services/google-ads-search/` | ← Google Реклама → /services/google-ads/ | / | EN → /en/services/google-ads/ | ЗАМОВИТИ РЕКЛАМУ → /services/google-ads-search/#contact | — |
| `/services/meta-ads/` | ← Назад → / | / | EN → /en/services/meta-ads/ | ЗАМОВИТИ РЕКЛАМУ → /services/meta-ads/#contact | — |
| `/services/meta-ads-instagram/` | ← Meta Ads → /services/meta-ads/ | / | EN → /en/services/meta-ads/ | ЗАМОВИТИ РЕКЛАМУ → /services/meta-ads-instagram/#contact | — |
| `/services/tiktok-ads/` | ← Назад → / | / | EN → /en/services/tiktok-ads/ | ЗАПУСТИТИ TIKTOK ADS → /services/tiktok-ads/#contact | — |
| `/services/seo/` | ← Назад → / | / | EN → /en/services/seo/ | ЗАМОВИТИ SEO → /services/seo/#contact | — |
| `/services/seo-audit/` | ← SEO просування → /services/seo/ | / | EN → /en/services/seo/ | ЗАМОВИТИ АУДИТ → /services/seo-audit/#contact | — |
| `/services/seo-local/` | ← SEO просування → /services/seo/ | / | EN → /en/services/seo/ | ЗАМОВИТИ LOCAL SEO → /services/seo-local/#contact | — |
| `/services/constructor/` | Назад → / | / | EN → /en/ | — | — |
| `/portfolio/` | ← Назад → / | / | EN → /en/portfolio/ | Замовити проєкт → /#contact | — |
| `/blog/` | — | / | EN → /en/ | ЗВ'ЯЗАТИСЬ → /#contact | Сайти → /services/websites/; Боти → /services/bots/; SEO → /services/seo/; Блог → /blog/ |
| `/blog/skilky-koshtuye-sayt-2026/` | — | / | EN → /en/ | ЗАМОВИТИ САЙТ → /#contact | — |
| `/blog/zamovyty-sayt-kharkiv/` | — | / | EN → /en/ | ЗАМОВИТИ САЙТ → /#contact | — |
| `/blog/telegram-bot-dlya-biznesu/` | — | / | EN → /en/ | ЗАМОВИТИ БОТА → /#contact | — |
| `/blog/seo-audit-shcho-tse/` | — | / | EN → /en/ | ЗАМОВИТИ АУДИТ → /#contact | — |
| `/blog/google-ads-chy-seo/` | — | / | EN → /en/ | ОТРИМАТИ КОНСУЛЬТАЦІЮ → /#contact | — |
| `/services/privacy/` | ← Назад → / | / | EN → /en/ | — | — |
| `/en/services/websites/` | ← Back → /en/ | /en/ | UA → /services/websites/ | ORDER WEBSITE → /en/services/websites/#contact | — |
| `/en/pricing/` | ← Back → /en/ | /en/ | UA → /pricing/ | GET A QUOTE → /en/pricing/#contact | — |
| `/en/services/bots/` | ← Back → /en/ | /en/ | UA → /services/bots/ | ORDER BOT → /en/services/bots/#contact | — |
| `/en/services/platforms/` | ← Back → /en/ | /en/ | UA → /services/platforms/ | ORDER PLATFORM → /en/services/platforms/#contact | — |
| `/en/services/ecosystems/` | ← Back → /en/ | /en/ | UA → /services/ecosystems/ | ORDER ECOSYSTEM → /en/services/ecosystems/#contact | — |
| `/en/services/google-ads/` | ← Back → /en/ | /en/ | UA → /services/google-ads/ | LAUNCH GOOGLE ADS → /en/services/google-ads/#contact | — |
| `/en/services/meta-ads/` | ← Back → /en/ | /en/ | UA → /services/meta-ads/ | ORDER ADS → /en/services/meta-ads/#contact | — |
| `/en/services/tiktok-ads/` | ← Back → /en/ | /en/ | UA → /services/tiktok-ads/ | LAUNCH TIKTOK ADS → /en/services/tiktok-ads/#contact | — |
| `/en/services/seo/` | ← Back → /en/ | /en/ | UA → /services/seo/ | ORDER SEO → /en/services/seo/#contact | — |
| `/en/portfolio/` | ← Back → /en/ | /en/ | UA → /portfolio/ | Start a project → /en/#contact | — |
| `/404.html` | — | — | — | — | — |

_404 не має шапки: логотип і посилання розташовані всередині сторінки (див. сторінку 404)._

**Перемикач мови** — посилання `EN` / `UA` у шапці перед CTA (клас `.iu-lang`, генерує `scripts/build-seo.mjs`). Веде на сторінку-пару; якщо пари немає — на головну іншою мовою. Також у футері, у групі «Компанія», є пункт «English» / «Українською».

**Мобільне меню головної** (`#mob`, бургер `#burger`) — пункти вище у варіанті для `/` та `/en/`. Прелоадер (`#loader`) показує логотип, відсоток, статус («• Ініціалізація» / «• Loading») і координати «49° 59′ N / 36° 14′ E · Kharkiv, Ukraine».

## 2. Футер

Однаковий на всіх сторінках мови (генерується з `scripts/pages.json`). Над футером — хлібні крихти (для всіх, крім головних).

### Футер UK

**(бренд)** — Infinite Union — веб-студія з Харкова. Сайти, Telegram-боти, реклама та SEO.

- «INFINITE UNION» → `/`

**Розробка**

- «Розробка сайтів» → `/services/websites/`
- «Лендінг під ключ» → `/services/websites-landing/`
- «Інтернет-магазин» → `/services/websites-shop/`
- «Корпоративний сайт» → `/services/websites-corporate/`
- «Сайти в Харкові» → `/services/websites-kharkiv/`
- «Telegram-боти» → `/services/bots/`
- «Бот для продажів» → `/services/bots-sales/`
- «Бот для ресторану» → `/services/bots-restaurant/`
- «Бот + CRM» → `/services/bots-crm/`
- «Вебплатформи та SaaS» → `/services/platforms/`
- «Цифрові екосистеми» → `/services/ecosystems/`

**Реклама і SEO**

- «Google Ads» → `/services/google-ads/`
- «Пошукова реклама» → `/services/google-ads-search/`
- «Таргет Facebook та Instagram» → `/services/meta-ads/`
- «Реклама в Instagram» → `/services/meta-ads-instagram/`
- «TikTok Ads» → `/services/tiktok-ads/`
- «SEO просування» → `/services/seo/`
- «SEO аудит» → `/services/seo-audit/`
- «Локальне SEO» → `/services/seo-local/`

**Компанія**

- «Ціни» → `/pricing/`
- «AI-конструктор» → `/services/constructor/`
- «Портфоліо» → `/portfolio/`
- «Блог» → `/blog/`
- «English» → `/en/`

**Контакти**

- «Telegram» → `https://t.me/infiniteunion_manager`
- «WhatsApp» → `https://wa.me/380688286969`
- «+380688286969» → `tel:+380688286969`
- «supportinfiniteunion@gmail.com» → `mailto:supportinfiniteunion@gmail.com`

**Нижній рядок:** © 2026 Infinite Union · Харків, Україна Instagram · Telegram-канал · Політика конфіденційності

- «Instagram» → `https://instagram.com/infinite_union`
- «Telegram-канал» → `https://t.me/infinite_union_channel`
- «Політика конфіденційності» → `/services/privacy/`

### Футер EN

**(бренд)** — Infinite Union — web development agency from Kharkiv, Ukraine. Websites, Telegram bots, ads and SEO.

- «INFINITE UNION» → `/en/`

**Development**

- «Website development» → `/en/services/websites/`
- «Telegram bots» → `/en/services/bots/`
- «Web platforms & SaaS» → `/en/services/platforms/`
- «Business automation» → `/en/services/ecosystems/`

**Marketing**

- «Google Ads» → `/en/services/google-ads/`
- «Meta Ads» → `/en/services/meta-ads/`
- «TikTok Ads» → `/en/services/tiktok-ads/`
- «SEO services» → `/en/services/seo/`

**Company**

- «Pricing» → `/en/pricing/`
- «Portfolio» → `/en/portfolio/`
- «Українською» → `/`

**Contact**

- «Telegram» → `https://t.me/infiniteunion_manager`
- «WhatsApp» → `https://wa.me/380688286969`
- «+380688286969» → `tel:+380688286969`
- «supportinfiniteunion@gmail.com» → `mailto:supportinfiniteunion@gmail.com`

**Нижній рядок:** © 2026 Infinite Union · Kharkiv, Ukraine Instagram · Telegram channel · Privacy policy (UA)

- «Instagram» → `https://instagram.com/infinite_union`
- «Telegram channel» → `https://t.me/infinite_union_channel`
- «Privacy policy (UA)» → `/services/privacy/`

## 3. Контакти

_Дослівно з `docs/FACTS.md`, розділ «Компанія»._

- Назва: Infinite Union (IU). Digital-агенція / веб-студія, Харків, Україна (49°59′N 36°14′E).
- Працюємо по Україні та з клієнтами з ЄС (areaServed: UA, PL, DE, NL, CZ, SK, GB).
- Контакти: Telegram https://t.me/infiniteunion_manager · WhatsApp https://wa.me/380688286969 ·
  Viber viber://chat?number=%2B380688286969 · тел. +380688286969.
- Відповідаємо на запит протягом 15 хвилин (у робочий час — так формулювати).
- Передаємо клієнту весь вихідний код і доступи — продукт належить клієнту.
- Оплата поетапно (у блозі рекомендуємо 50% / 50%).
- Стек: HTML/CSS/JS, Next.js, React, TypeScript, Python, FastAPI, aiogram 3, PostgreSQL, Redis, Railway, Cloudflare, n8n, Claude API.
- Процес (з головної): Брифінг 1–2 дні → Прототип 3–5 днів → Розробка (залежно від проєкту) → Тестування 2–4 дні → Запуск 1 день → Підтримка.
- Ліди з форми: зберігаються в PostgreSQL, черга Redis з повторною обробкою, сповіщення в Telegram.
- Ad Tracker: власний дашборд IU (Meta, Google, TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії) — app.infinitetracker.com.ua. У розробці.
- AI-конструктор: /services/constructor/ — безкоштовне AI-прев'ю сайту (до 3 генерацій), це концепт, не готовий сайт.

## 4. Єдиний прайс

_Дослівно з `docs/FACTS.md`. Лише ці цифри використовуються на сайті._

Сайти (з таблиць тарифів сторінок + блог «Скільки коштує сайт», розділ «наші ціни»):
- Лендінг: Start від $600 (5–7 секцій, до 10 днів) · Pro від $1 200 (10+ секцій, до 3 тижнів) · Max від $2 000.
- Корпоративний сайт: Представницький від $1 000 (5–8 сторінок, ~3 тижні) · Pro від $2 000 (10–20 сторінок, 4–5 тижнів) · Enterprise від $4 000 (50+ сторінок).
- Інтернет-магазин: Start від $1 200 (до 100 товарів, ~3 тижні) · Pro від $2 500 (необмежено товарів, ~5 тижнів, Nova Poshta API) · Маркетплейс від $5 000.
- Вебплатформа / SaaS: MVP від $2 500 (4–8 тижнів) · Platform від $6 000 (2–4 місяці) · Enterprise від $15 000.
- Цифрова екосистема (сайт + бот + CRM): від $2 000.
- У вартість сайту входить: унікальний дизайн, адаптивна верстка, базова SEO-оптимізація, базова інтеграція з Telegram або CRM, 1 місяць підтримки. Хостинг і домен — окремо.
- Підтримка після запуску: від $150/міс або погодинно.
Telegram-боти:
- Загальна сторінка: Starter від $300 (простий бот, до 2 тижнів) · Business від $700 (до 4 тижнів, оплати, CRM, 1 міс. підтримки) · Enterprise від $1 500 (Mini App, AI, 3 міс. підтримки).
- Бот для продажів: Start від $500 (7 днів) · Pro від $1 200 (14 днів) · Max від $2 500.
- Бот для ресторану: Кафе від $600 (до 50 позицій, 7 днів) · Ресторан від $1 200 (14 днів) · Мережа від $2 500.
- CRM-інтеграція бота: Старт від $800 (1 CRM, 7 днів) · Pro від $1 500 (14 днів) · Enterprise від $3 000.
- Платіжки, які підключаємо: LiqPay, WayForPay, Monobank, Stripe, Telegram Payments.
Реклама та SEO (рекламний бюджет — окремо):
- Google Ads: налаштування від $300 разово · ведення від $200/міс · великі бюджети / e-commerce від $500/міс. Рекомендований стартовий бюджет від $300/міс.
- Meta Ads (Facebook/Instagram): налаштування від $250 · ведення від $200/міс · e-commerce від $400/міс. Рекомендований бюджет від $300/міс.
- TikTok Ads: налаштування від $250 · ведення від $150/міс. Мінімальний бюджет від $200/міс.
- SEO просування: від $150/міс (перші результати 3–6 міс.).
- SEO аудит: базовий від $100 (до 50 сторінок, 3 дні) · повний від $300 (5 днів).
- Локальне SEO: старт від $200 разово · Local Pro від $150/міс · мережа філій від $400/міс.

**Не використовувати в макетах** (з `docs/FACTS.md`):

- Відгуки «Олексій Коваленко», «Марина Сидоренко», «Дмитро Мельник» та будь-які інші відгуки.
- Показники рекламних «кейсів» без джерела: 3.8x ROAS, $4.2 CPL, +38%, 2.4M views, 8.3% ER, +210% трафіку, ROI 300%, «+40% конверсія», «конверсія від 8%» як гарантія.
- «99.9% uptime гарантія», «0 втрачених заявок», «34+ сторінок», «10 проєктів на місяць / N місць залишилось».
- «гарантований топ», будь-які гарантії позицій.
- Кліше: «продукти що приносять/генерують прибуток», «боти що продають поки ви спите», «на новий рівень», «під ваш бізнес» без конкретики, «senior команда» як порожнє слово.

## 5. Шаблони сторінок

| Шаблон | Опис | Сторінки |
|---|---|---|
| **home** | Головна: прелоадер, 3D-змія/глобус/орбіта стеку, окремі мобільні секції (`#mobile-hero`, `#mobile-works`) і мобільне меню `#mob`, форма заявки `#contact` (форми є лише на `/` і `/en/`; конструктор має власні поля генерації). | `/`, `/en/` |
| **service** | Основна сторінка послуги: hero → проблема → що входить → етапи → тарифи → приклади з портфоліо → FAQ → CTA (Telegram / WhatsApp / Viber / телефон + «Заповнити форму» → форма на головній `/#contact`). | `/services/websites/`, `/services/bots/`, `/services/platforms/`, `/services/ecosystems/`, `/services/google-ads/`, `/services/meta-ads/`, `/services/tiktok-ads/`, `/services/seo/`, `/en/services/websites/`, `/en/services/bots/`, `/en/services/platforms/`, `/en/services/ecosystems/`, `/en/services/google-ads/`, `/en/services/meta-ads/`, `/en/services/tiktok-ads/`, `/en/services/seo/` |
| **cluster** | Підпослуга (вужчий ключ), та сама структура, що й service, має батьківську сторінку. | `/services/websites-landing/`, `/services/websites-shop/`, `/services/websites-corporate/`, `/services/websites-kharkiv/`, `/services/bots-sales/`, `/services/bots-restaurant/`, `/services/bots-crm/`, `/services/google-ads-search/`, `/services/meta-ads-instagram/`, `/services/seo-audit/`, `/services/seo-local/` |
| **pricing** | Зведений прайс: таблиці/картки всіх послуг, що входить, етапи оплати, FAQ. | `/pricing/`, `/en/pricing/` |
| **portfolio** | Портфоліо: фільтри + сітка проєктів + CTA. | `/portfolio/`, `/en/portfolio/` |
| **constructor** | AI-конструктор: інтерфейс генерації прев'ю + FAQ. | `/services/constructor/` |
| **blog-list** | Список статей блогу з фільтрами. | `/blog/` |
| **blog-post** | Стаття: H1, вступ, розділи H2, таблиці, пов'язані статті. | `/blog/skilky-koshtuye-sayt-2026/`, `/blog/zamovyty-sayt-kharkiv/`, `/blog/telegram-bot-dlya-biznesu/`, `/blog/seo-audit-shcho-tse/`, `/blog/google-ads-chy-seo/` |
| **privacy** | Юридична сторінка (noindex). | `/services/privacy/` |
| **404** | Сторінка помилки 404 (noindex). | `/404.html` |

## 6. Кольори, шрифти, ассети

### CSS-змінні (`:root`) — як зараз

Фон за змінною `--bg`: **темний** на 32 сторінках, **світлий** на 10: `/services/google-ads/`, `/services/meta-ads/`, `/services/tiktok-ads/`, `/services/seo/`, `/portfolio/`, `/en/services/google-ads/`, `/en/services/meta-ads/`, `/en/services/tiktok-ads/`, `/en/services/seo/`, `/en/portfolio/`. Групи сторінок з однаковими змінними (inline `<style>` + підключені `assets/css/*.css`):

**2 стор.:** `/`, `/en/`

```css
:root {
  --bg: #0a0706;
  --bg2: #0C0808;
  --bg3: #110D0D;
  --fg: #EDE8E5;
  --muted: #8A8080;
  --muted2: #A89E9E;
  --red: #D40000;
  --red-glow: rgba(212, 0, 0, 0.25);
  --border: rgba(237, 232, 229, 0.07);
  --fh: 'Space Grotesk', sans-serif;
  --fb: 'Inter', sans-serif;
  --ease: cubic-bezier(0.76, 0, 0.24, 1);
  --ease2: cubic-bezier(0.23, 1, 0.32, 1);
}
```

**9 стор.:** `/services/websites/`, `/services/websites-shop/`, `/services/websites-corporate/`, `/pricing/`, `/services/ecosystems/`, `/services/privacy/`, `/en/services/websites/`, `/en/pricing/`, `/en/services/ecosystems/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

**3 стор.:** `/services/websites-landing/`, `/services/websites-kharkiv/`, `/services/constructor/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --border2: rgba(255,255,255,0.15);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

**2 стор.:** `/services/bots/`, `/en/services/bots/`

```css
:root {
  --red: #D40000;
  --red-glow: rgba(212,0,0,0.15);
  --bg: #060404;
  --bg2: #0e0b0b;
  --bg3: #111;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --muted2: rgba(255,255,255,0.25);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --ease: cubic-bezier(0.76,0,0.24,1);
  --ease2: cubic-bezier(0.23,1,0.32,1);
}
```

**1 стор.:** `/services/bots-sales/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --tg: #229ED9;
}
```

**1 стор.:** `/services/bots-restaurant/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --tg: #229ED9;
  --warm: #FF6B35;
}
```

**1 стор.:** `/services/bots-crm/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --blue: #3B82F6;
  --green: #22C55E;
  --purple: #A855F7;
}
```

**2 стор.:** `/services/platforms/`, `/en/services/platforms/`

```css
:root {
  --red: #D40000;
  --red-glow: rgba(212,0,0,0.15);
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --muted2: rgba(255,255,255,0.25);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --ease: cubic-bezier(0.76,0,0.24,1);
  --ease2: cubic-bezier(0.23,1,0.32,1);
}
```

**8 стор.:** `/services/google-ads/`, `/services/meta-ads/`, `/services/tiktok-ads/`, `/services/seo/`, `/en/services/google-ads/`, `/en/services/meta-ads/`, `/en/services/tiktok-ads/`, `/en/services/seo/`

```css
:root {
  --red: #D40000;
  --bg: #F5F0E8;
  --bg2: #EDE8E0;
  --dark: #0A0A0A;
  --text: #1A1A1A;
  --muted: #777;
  --border: rgba(0,0,0,0.07);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --ease: cubic-bezier(0.76,0,0.24,1);
  --ease2: cubic-bezier(0.23,1,0.32,1);
}
```

**1 стор.:** `/services/google-ads-search/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --google: #4285F4;
}
```

**1 стор.:** `/services/meta-ads-instagram/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --ig: #E1306C;
  --ig2: #833AB4;
  --ig3: #F77737;
}
```

**1 стор.:** `/services/seo-audit/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --green: #22C55E;
  --yellow: #F59E0B;
  --orange: #F97316;
}
```

**1 стор.:** `/services/seo-local/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --map: #4285F4;
  --pin: #D40000;
}
```

**2 стор.:** `/portfolio/`, `/en/portfolio/`

```css
:root {
  --red: #D40000;
  --red2: #8B0000;
  --ink: #0a0a0a;
  --ink2: #242121;
  --muted: #6b6560;
  --muted2: #a39d97;
  --bg: #ffffff;
  --bg2: #f7f5f3;
  --border: rgba(10,8,8,.1);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

**1 стор.:** `/blog/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.45);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

**2 стор.:** `/blog/skilky-koshtuye-sayt-2026/`, `/blog/zamovyty-sayt-kharkiv/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.5);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

**1 стор.:** `/blog/telegram-bot-dlya-biznesu/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.5);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --tg: #229ED9;
}
```

**1 стор.:** `/blog/seo-audit-shcho-tse/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.5);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --green: #22C55E;
  --yellow: #F59E0B;
}
```

**1 стор.:** `/blog/google-ads-chy-seo/`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --bg2: #0e0b0b;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.5);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
  --google: #4285F4;
  --green: #22C55E;
}
```

**1 стор.:** `/404.html`

```css
:root {
  --red: #D40000;
  --bg: #060404;
  --border: rgba(255,255,255,.08);
  --muted: rgba(255,255,255,.4);
  --font: 'Space Grotesk',sans-serif;
  --body: 'Inter',sans-serif;
}
```

Фірмовий червоний — `#D40000` (на всіх сторінках). Контраст `#D40000` на чорному = 3.6:1: для дрібного тексту нижче WCAG AA (4.5:1) — варто врахувати в редизайні.

### Шрифти

Google Fonts: **Space Grotesk** (заголовки, `--font`/`--fh`) + **Inter** (текст, `--body`/`--fb`). Набори ваг різняться між сторінками:

- `fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap` — 2 стор.
- `fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap` — 29 стор.
- `fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap` — 8 стор.
- `fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap` — 2 стор.
- `fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400&display=swap` — 1 стор.

### Логотип

Текстовий: `INFINITE <span>UNION</span>`, «UNION» червоним; на сторінках послуг `.nav-logo` — Space Grotesk 700, 15px, letter-spacing .12em. Окремого файлу-логотипу (SVG) немає; іконки нижче.

### Ассети

| Шлях | Px | Вага | Де використовується |
|---|---|---|---|
| `/favicon-32.png` | 32×32 | 1.0 KB | 42 файл(ів): `404.html`, `blog/google-ads-chy-seo/index.html`, `blog/index.html`, `blog/seo-audit-shcho-tse/index.html` … |
| `/favicon.png` | 512×512 | 105.5 KB | 1 файл(ів): `sw.js` |
| `/favicon.ico` | — | 2.9 KB | 43 файл(ів): `404.html`, `blog/google-ads-chy-seo/index.html`, `blog/index.html`, `blog/seo-audit-shcho-tse/index.html` … |
| `/apple-touch-icon.png` | 180×180 | 14.9 KB | 41 файл(ів): `blog/google-ads-chy-seo/index.html`, `blog/index.html`, `blog/seo-audit-shcho-tse/index.html`, `blog/skilky-koshtuye-sayt-2026/index.html` … |
| `/icon-192.png` | 192×192 | 16.7 KB | 1 файл(ів): `manifest.json` |
| `/icon-512.png` | 512×512 | 105.5 KB | 3 файл(ів): `en/index.html`, `index.html`, `manifest.json` |
| `/og-image.png` | 1200×630 | 188.6 KB | 41 файл(ів): `blog/google-ads-chy-seo/index.html`, `blog/index.html`, `blog/seo-audit-shcho-tse/index.html`, `blog/skilky-koshtuye-sayt-2026/index.html` … |
| `/og-image.svg` | 1200×630 | 3.0 KB | **ніде** (файл лежить, але в коді не підключений) |
| `/avatar.jpeg` | 656×711 | 54.3 KB | 3 файл(ів): `en/index.html`, `index.html`, `sw.js` |
| `/avatar.png` | 480×520 | 239.6 KB | **ніде** (файл лежить, але в коді не підключений) |
| `/assets/pattern-bg.jpg` | 1280×714 | 93.8 KB | 1 файл(ів): `assets/css/main.css` |

**3D-модель:** `https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb` — /assets/js/snake.js (головна, тільки десктоп, Draco: /vendor/three/draco-r185/).

**Скрипти з візуалом:**

- /cobe.umd.js + /assets/js/globe.js (глобус, головні)
- /assets/js/orbit.js (орбіта стеку, головні)
- /assets/js/hero.js (3D hero, десктоп)
- /assets/js/preloader.js
- /assets/js/mobile-animations.js (GSAP, мобільна головна)

Інших растрових зображень у контенті немає: портфоліо, картки й ілюстрації зроблені CSS/SVG/canvas. CSS: `assets/css/main.css` (головна), `assets/css/mobile.css` (мобільна головна), `assets/css/site-shared.css` (футер, крихти, перемикач мови — усі сторінки), решта стилів — inline у `<head>` кожної сторінки.

## 7. Сторінки

## 7.1 Шаблон: home

### / — Головна

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/ |
| Мова | uk |
| Пара | en: `/en/` |
| Шаблон | **home** |
| Robots | index, follow |
| Title (60) | Веб-студія у Харкові — сайти, боти, реклама \| Infinite Union |
| Description (140) | Infinite Union — веб-студія з Харкова. Сайти під ключ від $600, Telegram-боти від $300, Google Ads, таргет і SEO. Працюємо по Україні та ЄС. |
| Головний ключ | веб-студія Харків |
| H1 | Веб-студія в Харкові: сайти, Telegram-боти та реклама |
| Слів | 1161 |
| JSON | `design-content/uk__home.json` |

**Хлібні крихти:** — (не показуються)

#### Блоки (15)

**1. mobile-cta** · _тільки мобільна версія_ · `<div .mob-cta-section>`

- Посилання/кнопка: «Замовити проект» → `/#contact`
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=380688286969`
- Посилання/кнопка: «Зателефонувати» → `tel:+380688286969`

**2. content** · `<section#snake-intro>`

- _[si-bg-text]_ INFINITE
- _[si-coords]_ 49° 59′ N • 36° 23′ E
- _[si-num]_ 01 ·
- Сайти від $600
- _[si-num]_ 02 ·
- Telegram-боти від $300
- _[si-num]_ 03 ·
- Вебплатформи MVP від $2 500
- _[si-num]_ 04 ·
- Реклама та SEO Google · Meta
- Веб-студія в Харкові: сайти, Telegram-боти та реклама

**3. hero** — Веб-студія в Харкові: сайти, Telegram-боти та реклама · _тільки мобільна версія_ · `<section#mobile-hero>`

- **H1:** Веб-студія в Харкові: сайти, Telegram-боти та реклама
- _[mh-title]_ Infinite · Union
- Infinite Union робить сайти від $600 і Telegram-боти від $300 для малого й середнього бізнесу в Україні та ЄС, налаштовує Google Ads, таргет і SEO. Код і доступи — ваші.
- Посилання/кнопка: «Обговорити проєкт» → `/#contact`
- Посилання/кнопка: «01 Сайти — від $600» → `/services/websites/`
- Посилання/кнопка: «02 Telegram-боти — від $300» → `/services/bots/`
- Посилання/кнопка: «03 Google · Meta Ads» → `/services/google-ads/`
- Посилання/кнопка: «04 SEO просування» → `/services/seo/`
- _[mh-coords]_ 49° 59′ N · 36° 14′ E · Kharkiv, Ukraine

**4. stats** · `<section#stats>`

- _[sn]_ 8
- _[sl]_ Проєктів у портфоліо
- _[sn]_ 3000+
- _[sl]_ Користувачів KNEU Bot
- _[sn]_ 8.4%
- _[sl]_ Конверсія лендінгу Transfer Kharkiv
- _[sn]_ 15хв
- _[sl]_ Відповідь у робочий час

**5. content** — Що ми робимо · `<section#services .sec>`

- _[slabel]_ Послуги
- **H2:** Що ми робимо
- _[snum]_ 01 / 02
- Infinite Union — веб-студія з Харкова. Розробляємо сайти, Telegram-боти та вебплатформи, запускаємо рекламу в Google, Facebook, Instagram і TikTok та просуваємо сайти в пошуку. Працюємо з малим і середнім бізнесом в Україні та ЄС. Лендінг — від $600, Telegram-бот — від $300; усі тарифи на сторінці Ціни, приклади робіт — у портфоліо.

**6. content** — IT Розробка · `<section#directions .dir-section>`

- _[dir-label]_ Digital · 01
- **H2:** IT Розробка
- Лендінги, корпоративні сайти, інтернет-магазини, Telegram-боти й вебплатформи. Пишемо код самі й передаємо вам вихідний код і всі доступи.
- Список:
  - «01СайтиЛендінг від $600 · магазин від $1 200» → `/services/websites/`
  - «02Telegram-ботиВід $300 · оплати · CRM» → `/services/bots/`
  - «03Вебплатформи та SaaSMVP від $2 500 · 4–8 тижнів» → `/services/platforms/`
  - «04Сайт + бот + CRMАвтоматизація від $2 000» → `/services/ecosystems/`
  - «05Ціни на всі послугиТарифи, терміни, що входить» → `/pricing/`
- _[dir-label]_ Marketing · 02
- **H2:** Digital Реклама
- Налаштовуємо й ведемо рекламу та SEO: відстеження заявок, звіти по кампаніях. Рекламний бюджет оплачується окремо.
- Список:
  - «01Таргет Facebook та InstagramНалаштування від $250» → `/services/meta-ads/`
  - «02Google AdsНалаштування від $300» → `/services/google-ads/`
  - «03SEO просуванняВід $150/міс» → `/services/seo/`
  - «04TikTok AdsНалаштування від $250» → `/services/tiktok-ads/`
- Посилання/кнопка: «Обговорити рекламу» → `/#contact`

**7. process** — Як ми працюємо · `<section#process .sec.proc-section>`

- _[slabel]_ Процес
- **H2:** Як ми працюємо
- _[snum]_ 03 / 08
- _[proc-n]_ 01
- **H3:** Брифінг
- Обговорюємо задачу, аудиторію, бюджет і терміни. Фіксуємо, що вважаємо результатом. На виході — технічне завдання і кошторис.
- _[proc-term]_ · 1–2 дні
- _[proc-n]_ 02
- **H3:** Прототип
- Показуємо структуру сторінок або сценарій бота до написання коду. Правки на цьому етапі коштують найменше.
- _[proc-term]_ · 3–5 днів
- _[proc-n]_ 03
- **H3:** Розробка
- Верстаємо, програмуємо, підключаємо оплати, CRM і Telegram. Показуємо проміжні результати, оплата поетапна.
- _[proc-term]_ · залежно від проєкту
- _[proc-n]_ 04
- **H3:** Тестування
- Перевіряємо форми, оплати, мобільну версію і швидкість завантаження на реальних сценаріях.
- _[proc-term]_ · 2–4 дні
- _[proc-n]_ 05
- **H3:** Запуск
- Публікуємо на хостингу, підключаємо домен і аналітику. Передаємо вихідний код і всі доступи — продукт належить вам.
- _[proc-term]_ · 1 день
- _[proc-n]_ 06
- **H3:** Підтримка
- Перший місяць підтримки входить у вартість сайту. Далі — від $150/міс або погодинно.
- _[proc-term]_ · постійно

**8. tech-stack** — Що під капотом · `<section#stack .sec>`

- _[slabel]_ Технології
- **H2:** Що під капотом
- _[snum]_ 04 / 08
- Як влаштована обробка заявок на наших сайтах: форма → перевірка даних → запис у PostgreSQL → черга Redis → сповіщення в Telegram.
- _[stack-node__name]_ Форма
- _[stack-node__name]_ Валідація
- _[stack-node__name]_ База даних
- _[stack-node__name]_ Черга
- _[stack-node__name]_ Telegram
- _[stack-highlight]_ Заявка спочатку зберігається в базі, а вже потім надсилається вам. Якщо Telegram чи CRM у цей момент недоступні, вона стає в чергу на повторну відправку. Збій месенджера не означає втрачену заявку.
- _[stack-tag]_ FastAPI · швидкий асинхронний бекенд
- _[stack-tag]_ PostgreSQL · надійне сховище даних
- _[stack-tag]_ Redis · черги та захист від навантаження
- _[stack-tag]_ aiogram · Telegram-автоматизація
- _[stack-tag]_ Railway · хмарний хостинг ботів і API

**9. content** — Побачте свій сайт до замовлення · `<section#ai-constructor>`

- _[slabel]_ AI-конструктор
- **H2:** Побачте свій сайт до замовлення
- Опишіть бізнес — AI збере концепт головної сторінки. 3 безкоштовні генерації на день, без реєстрації. Це ескіз для обговорення: робочий сайт за ним ми робимо окремо.
- Посилання/кнопка: «Спробувати конструктор» → `/services/constructor/`
- _[ai-preview-bar]_ infiniteunion.com.ua/services/constructor/
- _[ai-preview-label]_ AI · ГЕНЕРАЦІЯ
- _[ai-preview-heading]_ Барбершоп у Харкові, темний стиль...
- _[ai-progress-label]_ ГЕНЕРУЄМО КОД... 75%
- _[ai-code-preview]_ ← Підбираємо кольорову палітру ← Будуємо структуру сторінки ← Додаємо анімації...

**10. portfolio** — Наші роботи · _тільки мобільна версія_ · `<section#mobile-works>`

- _[mw-label]_ Портфоліо
- **H2:** Наші роботи
- 8 проєктів: лендінг Transfer Kharkiv з конверсією 8.4%, бот КНЕУ на 3 000+ користувачів, сайти, боти та внутрішні сервіси.
- Посилання/кнопка: «Переглянути всі роботи» → `/portfolio/`
- Кнопка: «Попередній проєкт»
- Картка-посилання → `/portfolio/#p-ad-tracker`:
  - _[mw-card-top]_ SaaS · Флагман IU · 01
  - **H3:** Ad Tracker by Infinite Union
  - Один дашборд замість трьох вкладок — Meta, Google і TikTok Ads разом
  - _[mw-card-stats]_ 3 платформи · 5+ год економії щотижня
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-respect-car`:
  - _[mw-card-top]_ Автобізнес · Харків · 02
  - **H3:** Respect Car
  - Продаж, викуп та імпорт авто зі США — з адмінкою прямо в Telegram
  - _[mw-card-stats]_ Фото каталог авто · TG адмінка
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-parrot-school`:
  - _[mw-card-top]_ Освіта · Екосистема · 03
  - **H3:** Parrot School
  - Сайт + Telegram-бот для учня, батька і вчителя школи англійської
  - _[mw-card-stats]_ 3 ролі в боті · + адмін-бот
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-transfer-kharkiv`:
  - _[mw-card-top]_ Флагман · SEO · 04
  - **H3:** Transfer Kharkiv
  - Лендінг трансферної компанії + Telegram-бот, що приймає заявки 24/7
  - _[mw-card-stats]_ 8.4% конверсія · 119+ SEO-позицій
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-kneu-bot`:
  - _[mw-card-top]_ Університет · 3000+ юзерів · 05
  - **H3:** KNEU Bot
  - Офіційний Telegram-бот КНЕУ: розклад, новини, сповіщення
  - _[mw-card-stats]_ 3 000+ користувачів · Live розклад
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-bizbot`:
  - _[mw-card-top]_ Автоматизація · Бізнес · 06
  - **H3:** BizBot
  - Бот для бухгалтерії малого бізнесу: зарплати, задачі, автозаповнення Excel
  - _[mw-card-stats]_ 4+ год економії · Excel автозаповнення
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-infinitycreo`:
  - _[mw-card-top]_ AI · Автоматизація · 07
  - **H3:** InfinityCreo
  - Від брифу до готового рекламного банера за 3 хвилини
  - _[mw-card-stats]_ 3 хв на креатив · 10+ форматів
  - _[mw-card-link]_ Детальніше
- Картка-посилання → `/portfolio/#p-iu-bot`:
  - _[mw-card-top]_ Internal · Автоматизація · 08
  - **H3:** IU Bot
  - Внутрішній lead-бот IU: квіз, FSM-сценарії, передача ліда в CRM
  - _[mw-card-stats]_ Квіз кваліфікація · CRM інтеграція
  - _[mw-card-link]_ Детальніше
- Кнопка: «Наступний проєкт»
- _[mw-counter]_ 01 / 08

**11. portfolio** — Портфоліо · `<section#portfolio .sec>`

- _[slabel]_ Роботи
- **H2:** Портфоліо
- _[snum]_ 02 / 03
- _[gs-num]_ 01
- _[gs-badge]_ ФЛАГМАН
- _[gs-title]_ Transfer Kharkiv
- _[gs-desc]_ Лендінг з конверсією 8.4%, боти, SEO під ключ.
- _[gs-stats]_ 119 SEO · 24/7
- Посилання/кнопка: «Переглянути» → `https://transferkharkiv.com.ua/`
- _[gs-num]_ 02
- _[gs-badge]_ SAAS
- _[gs-title]_ Realty Monitor
- _[gs-desc]_ Моніторинг нерухомості з LiqPay та FSM.
- _[gs-stats]_ LiqPay · FSM
- _[gs-num]_ 03
- _[gs-badge]_ УНІВЕРСИТЕТ
- _[gs-title]_ KNEU Bot
- _[gs-desc]_ Офіційний бот з 3 000+ користувачів.
- _[gs-stats]_ 3 000+ · aiogram
- _[gs-num]_ 04
- _[gs-badge]_ АВТОМАТИЗАЦІЯ
- _[gs-title]_ IU Bot
- _[gs-desc]_ Lead-бот з квізом, PostgreSQL, Railway.
- _[gs-stats]_ FastAPI · Redis
- _[gs-num]_ 05
- _[gs-badge]_ ШІ-АВТОМАТИЗАЦІЯ
- _[gs-title]_ InfinityCreo
- _[gs-desc]_ ШІ-генерація креативів для медіабаєрів через n8n. Від брифу до банера.
- _[gs-stats]_ n8n · AI
- Посилання/кнопка: «Спробувати» → `https://t.me/infinitycreo_bot`
- _[gs-num]_ 06
- _[gs-badge]_ БІЗНЕС
- _[gs-title]_ BizBot
- _[gs-desc]_ Бухгалтерія, зарплати та задачі в Telegram. Автозаповнення Excel.
- _[gs-stats]_ Excel API · FastAPI
- _[gs-num]_ 07
- _[gs-badge]_ ФЛАГМАН IU
- _[gs-title]_ Ad Tracker by IU
- _[gs-desc]_ Клієнтський портал реклами. Meta, Google, TikTok в одному дашборді.
- _[gs-stats]_ Next.js 14 · Meta API
- _[gs-num]_ 08
- _[gs-badge]_ MINI APP
- _[gs-title]_ EduApp
- _[gs-desc]_ Telegram Mini App для школи англійської. Розробляємо під ключ.
- _[gs-stats]_ Mini App · На замовлення
- _[gs-num]_ 09
- _[gs-badge]_ SAAS IU
- _[gs-title]_ IU Tracker
- _[gs-desc]_ Платформа IU для медіабаєрів. Аналітика кампаній, звіти, CSV.
- _[gs-stats]_ PostgreSQL · Railway
- _[pf-cta-label]_ ПОРТФОЛІО
- **H3:** Усі проєкти — на окремій сторінці
- Задача, рішення, стек і результат кожного проєкту
- Посилання/кнопка: «Переглянути всі роботи» → `/portfolio/`
- _[pf-cta-num]_ 08 / 08

**12. process** — Ad Tracker — дашборд для вашої реклами · `<section#tracker-showcase .sec>`

- _[ts-eyebrow]_ Наш власний продукт
- **H2:** Ad Tracker — дашборд для вашої реклами
- Власний дашборд Infinite Union для рекламних кампаній: Meta, Google Ads і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить нам 5+ годин на тиждень на звітах. Продукт зараз у розробці.
- _[ts-stat-num]_ 3
- _[ts-stat-label]_ рекламні платформи
- _[ts-stat-num]_ 2 год
- _[ts-stat-label]_ автооновлення
- _[ts-stat-num]_ 90 днів
- _[ts-stat-label]_ історія даних
- _[ts-stat-num]_ 5+ год
- _[ts-stat-label]_ економії на звітах щотижня
- Список:
  - Три платформи — один дашбордMeta, Google, TikTok
  - Автооновлення кожні 2 годинисвіжі дані без ручного експорту
  - Клієнтський порталкожен клієнт бачить лише свої кампанії
- Посилання/кнопка: «Спробувати трекер» → `https://infinitetracker.com.ua/`
- Посилання/кнопка: «Дізнатись більше» → `https://infinitetracker.com.ua/`
- _[декор, aria-hidden]_ app.infinitetracker.com.ua Meta Google TikTok Дашборд CTR 4.8% +12% ROAS 6.2x +8% Spend $14.2k −3% Meta Ads Google Ads TikTok Ads

**13. content** · `<section#avatar-sec>`

- _[slabel]_ Infinite Union
- _[av-quote]_ Ви отримуєте робочий інструмент, а не макет: сайт чи бот з вашим кодом, доступами і заявками в Telegram.
- _[av-attr-l]_ Оплата
- _[av-attr-v]_ Поетапно
- _[av-attr-l]_ Стек
- _[av-attr-v]_ Next.js · Python · PostgreSQL
- _[av-attr-l]_ Власність
- _[av-attr-v]_ Код і доступи — ваші
- _[av-attr-l]_ Підтримка
- _[av-attr-v]_ Відповідь за 15 хв у робочий час
- Зображення: `/avatar.jpeg` (alt: «Орел — талісман веб-студії Infinite Union»)

**14. content** — До старту домовляємося, що вважаємо результатом — заявки, оплати чи зекономлені години, — і будуємо продукт так, щоб це можна було порахувати. · `<section#philo>`

- _[ph-q]_ Наш підхід
- **H2:** До старту домовляємося, що вважаємо результатом — заявки, оплати чи зекономлені години, — і будуємо продукт так, щоб це можна було порахувати.

**15. cta-form** — Розкажіть про задачу · `<section#contact>`

- _[slabel]_ Контакт
- **H2:** Розкажіть про задачу
- Відповідаємо протягом 15 хвилин у робочий час. Після короткого брифу називаємо орієнтовну ціну й терміни. Базові ціни — на сторінці Ціни.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=380688286969`
- Посилання/кнопка: «Зателефонувати» → `tel:+380688286969`
- _[ct-new-coords]_ 49° 59′ N / 36° 14′ E · Kharkiv, Ukraine · 2026
- _[form-new-title]_ Залишити заявку
- Поле форми: text `cn` · label «Ім'я» · placeholder «Як до вас звертатися?» · обов'язкове
- Поле форми: text `cc` · label «Telegram» · placeholder «@username» · обов'язкове
- Поле форми: text `cphone` · label «Телефон» · placeholder «+380...»
- Поле форми: select `ctype` · label «Тип проєкту»
  - «Оберіть...» (value: )
  - «Сайт (лендінг, корпоративний, магазин)» (value: Конверсійний сайт)
  - «Telegram-бот»
  - «Платформа / вебдодаток»
  - «Цифрова екосистема»
  - «Інше»
- Поле форми: select `cbudget` · label «Бюджет»
  - «Оберіть...» (value: )
  - «до $500»
  - «$500–$1 000»
  - «$1 000–$3 000»
  - «$3 000+»
- Поле форми: date `cdeadline` · label «Дедлайн»
- Поле форми: textarea `cp` · label «Про проєкт» · placeholder «Коротко опишіть задачу»
- _[form-ok-new]_ ✓ ЗАЯВКУ НАДІСЛАНО — ВІДПОВІМО ПРОТЯГОМ 15 ХВ
- Кнопка: «Надіслати заявку»
- Відповімо протягом 15 хв у робочий час
- _[декор, aria-hidden]_ Website
- Посилання/кнопка: «Написати в Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «Написати в WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Написати у Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «Подзвонити +380688286969» → `tel:+380688286969`
- _[ci-l]_ Email
- _[ci-v]_ supportinfiniteunion@gmail.com
- _[ci-l]_ Час відповіді
- _[ci-v]_ 15 хвилин у робочий час
- _[ci-l]_ Ми в мережі
- _[ci-v]_ Instagram @infinite_union · Telegram-канал · Google Maps

#### Внутрішні посилання з контенту (22)

- «Замовити проект» → `/#contact` · блок 1
- «Обговорити проєкт» → `/#contact` · блок 3
- «01 Сайти — від $600» → `/services/websites/` · блок 3
- «02 Telegram-боти — від $300» → `/services/bots/` · блок 3
- «03 Google · Meta Ads» → `/services/google-ads/` · блок 3
- «04 SEO просування» → `/services/seo/` · блок 3
- «Ціни» → `/pricing/` · блок 5
- «портфоліо» → `/portfolio/` · блок 5
- «01СайтиЛендінг від $600 · магазин від $1 200» → `/services/websites/` · блок 6
- «02Telegram-ботиВід $300 · оплати · CRM» → `/services/bots/` · блок 6
- «03Вебплатформи та SaaSMVP від $2 500 · 4–8 тижнів» → `/services/platforms/` · блок 6
- «04Сайт + бот + CRMАвтоматизація від $2 000» → `/services/ecosystems/` · блок 6
- «05Ціни на всі послугиТарифи, терміни, що входить» → `/pricing/` · блок 6
- «01Таргет Facebook та InstagramНалаштування від $250» → `/services/meta-ads/` · блок 6
- «02Google AdsНалаштування від $300» → `/services/google-ads/` · блок 6
- «03SEO просуванняВід $150/міс» → `/services/seo/` · блок 6
- «04TikTok AdsНалаштування від $250» → `/services/tiktok-ads/` · блок 6
- «Обговорити рекламу» → `/#contact` · блок 6
- «Спробувати конструктор» → `/services/constructor/` · блок 9
- «Переглянути всі роботи» → `/portfolio/` · блок 10
- «Переглянути всі роботи» → `/portfolio/` · блок 11
- «Ціни» → `/pricing/` · блок 15

Зовнішні / контактні: «Написати в Telegram» → `https://t.me/infiniteunion_manager`, «Написати в WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=380688286969`, «Подзвонити +380688286969» → `tel:+380688286969`, «Переглянути» → `https://transferkharkiv.com.ua/`, «Спробувати» → `https://t.me/infinitycreo_bot`, «Дізнатись більше» → `https://infinitetracker.com.ua/`, «Написати у Viber» → `viber://chat?number=%2B380688286969`, «supportinfiniteunion@gmail.com» → `mailto:supportinfiniteunion@gmail.com`, «Instagram @infinite_union» → `https://instagram.com/infinite_union`, «Telegram-канал» → `https://t.me/infinite_union_channel`, «Google Maps» → `https://maps.app.goo.gl/sDMRaLPPcaLcZkHH9`

---

### /en/ — Home

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/ |
| Мова | en |
| Пара | uk: `/` |
| Шаблон | **home** |
| Robots | index, follow |
| Title (50) | Web Development Agency in Ukraine \| Infinite Union |
| Description (154) | Infinite Union is a web development agency from Kharkiv, Ukraine. Websites from $600, Telegram bots from $300, Google & Meta Ads, SEO. EU clients welcome. |
| Головний ключ | web development agency Ukraine |
| H1 | Web development agency in Ukraine |
| Слів | 955 |
| JSON | `design-content/en__home.json` |

**Хлібні крихти:** — (не показуються)

#### Блоки (11)

**1. mobile-menu** · _тільки мобільна версія_ · `<div#mob .mob>`

- Кнопка: «×»
- Посилання/кнопка: «Services» → `/en/#services`
- Посилання/кнопка: «Portfolio» → `/en/#portfolio`
- Посилання/кнопка: «Contact» → `/en/#contact`

**2. content** · `<section#snake-intro>`

- _[декор, aria-hidden]_ INFINITE
- _[si-coords]_ 49° 59′ N • 36° 14′ E
- _[si-num]_ 01 ·
- Websites & online stores
- _[si-num]_ 02 ·
- Telegram bots & automation
- _[si-num]_ 03 ·
- SaaS platforms & web apps
- _[si-num]_ 04 ·
- Site, bot and CRM as one system

**3. stats** · `<section#stats>`

- _[sn]_ 3000+
- _[sl]_ Active users of the KNEU bot we built
- _[sn]_ $600
- _[sl]_ Websites from
- _[sn]_ $300
- _[sl]_ Telegram bots from
- _[sn]_ 15 min
- _[sl]_ Reply time in business hours

**4. content** — Web development agency in Ukraine · `<section#services .sec>`

- _[slabel]_ Services
- **H1:** Web development agency in Ukraine
- _[snum]_ 01 / 02
- Infinite Union is a web development agency based in Kharkiv, Ukraine, working with small and mid-sized businesses across the EU. We build websites, Telegram bots and SaaS platforms, and we run Google, Meta and TikTok ads. You talk directly to the people who build your project, in English, and when we finish you own the source code and every account. Fixed prices start at $600 for a website and $300 for a bot. See the full breakdown on our pricing page.

**5. content** — IT Development · `<section#directions .dir-section>`

- _[dir-label]_ Digital · 01
- **H2:** IT Development
- From a one-page landing page to a website, bot and CRM that work as one system. Agreed scope, staged payments, and the code is handed over to you.
- Список:
  - «01WebsitesLanding · Corporate · Store↗» → `/en/services/websites/`
  - «02Telegram botsSales · Bookings · CRM↗» → `/en/services/bots/`
  - «03SaaS & web appsMVP · Dashboards · API↗» → `/en/services/platforms/`
  - «04Business automationWebsite + bot + CRM↗» → `/en/services/ecosystems/`
  - «05Something else?Tell us and we will suggest a plan→» → `/en/#contact`
- _[dir-label]_ Marketing · 02
- **H2:** Digital Marketing
- Paid and organic traffic, with conversion tracking set up before the first campaign goes live, so you can see what each lead cost. Ad budgets are paid separately, directly to the platforms.
- Список:
  - «01Meta AdsFacebook · Instagram · Reels↗» → `/en/services/meta-ads/`
  - «02Google AdsSearch · Performance Max · YouTube↗» → `/en/services/google-ads/`
  - «03SEOAudit · Content · Local SEO↗» → `/en/services/seo/`
  - «04TikTok AdsIn-Feed · Spark Ads · UGC↗» → `/en/services/tiktok-ads/`
- Посилання/кнопка: «Discuss your marketing→» → `/en/#contact`

**6. process** — How we work with EU clients · `<section#process .sec.proc-section>`

- _[slabel]_ Process
- **H2:** How we work with EU clients
- _[snum]_ 03 / 08
- _[proc-n]_ 01
- **H3:** Briefing
- A call or a chat about your business, your customers and what the project has to achieve. You get a written scope with a fixed price and timeline.
- _[proc-term]_ · 1–2 days
- _[proc-n]_ 02
- **H3:** Prototype
- We show the structure and user flow before any code is written. Changes at this stage are quick and cost nothing extra.
- _[proc-term]_ · 3–5 days
- _[proc-n]_ 03
- **H3:** Development
- Design, code and integrations. You get a staging link and regular progress updates, so there are no surprises at the end.
- _[proc-term]_ · depends on scope
- _[proc-n]_ 04
- **H3:** Testing
- We test real scenarios on phones and desktops: forms, payments, bot flows and edge cases. Bugs get fixed before launch.
- _[proc-term]_ · 2–4 days
- _[proc-n]_ 05
- **H3:** Launch
- We deploy, connect analytics and hand over the source code and all access. The product is registered to you, not to us.
- _[proc-term]_ · 1 day
- _[proc-n]_ 06
- **H3:** Support
- One month of support is included with every website. After that, support plans start at $150/month, or we work by the hour.
- _[proc-term]_ · ongoing

**7. tech-stack** — What's under the hood · `<section#stack .sec>`

- _[slabel]_ Technologies
- **H2:** What's under the hood
- _[snum]_ 04 / 08
- Many websites quietly lose an enquiry when something fails at the moment of sending. We build the lead path so that does not happen.
- _[stack-node__name]_ Form
- _[декор, aria-hidden]_ →
- _[stack-node__name]_ Validation
- _[stack-node__name]_ Database
- _[stack-node__name]_ Queue
- _[stack-node__name]_ Telegram
- _[stack-highlight]_ Every enquiry from the form is saved to PostgreSQL first, then passed through a Redis queue with automatic retries and delivered to your Telegram. If one step fails, the lead waits in the queue instead of disappearing.
- _[stack-tag]_ Next.js / React · fast websites and web apps
- _[stack-tag]_ FastAPI · async Python backend
- _[stack-tag]_ PostgreSQL · reliable data storage
- _[stack-tag]_ Redis · queues and retries
- _[stack-tag]_ aiogram 3 · Telegram bots
- _[stack-tag]_ Railway · Cloudflare · hosting, CDN and protection

**8. portfolio** — Selected projects · `<section#portfolio .sec>`

- _[slabel]_ Portfolio
- **H2:** Selected projects
- _[snum]_ 02 / 03
- _[gs-num]_ 01
- _[gs-badge]_ FLAGSHIP
- _[gs-title]_ Transfer Kharkiv
- _[gs-desc]_ Landing page for a transfer company: 8.4% conversion, 119+ search positions in the top results, bookings via a Telegram bot.
- _[gs-stats]_ 8.4% conversion · 119+ SEO
- Посилання/кнопка: «Visit site ↗» → `https://transferkharkiv.com.ua/`
- _[gs-num]_ 02
- _[gs-badge]_ SAAS
- _[gs-title]_ Realty Monitor
- _[gs-desc]_ Real estate monitoring service with LiqPay payments and FSM-based bot flows.
- _[gs-stats]_ LiqPay · FSM
- _[gs-num]_ 03
- _[gs-badge]_ UNIVERSITY
- _[gs-title]_ KNEU Bot
- _[gs-desc]_ Official university Telegram bot: timetable, news and notifications for 3,000+ active users.
- _[gs-stats]_ 3,000+ users · aiogram
- Посилання/кнопка: «Case study →» → `/en/portfolio/#p-kneu-bot`
- _[gs-num]_ 04
- _[gs-badge]_ AUTOMATION
- _[gs-title]_ IU Bot
- _[gs-desc]_ Our own lead bot: a quiz qualifies the request and passes the lead to the CRM.
- _[gs-stats]_ FastAPI · Redis
- Посилання/кнопка: «Case study →» → `/en/portfolio/#p-iu-bot`
- _[gs-num]_ 05
- _[gs-badge]_ AI AUTOMATION
- _[gs-title]_ InfinityCreo
- _[gs-desc]_ AI ad creatives for media buyers, built on n8n. About 3 minutes from brief to banner.
- _[gs-stats]_ n8n · 10+ formats
- Посилання/кнопка: «Try it ↗» → `https://t.me/infinitycreo_bot`
- _[gs-num]_ 06
- _[gs-badge]_ SMALL BUSINESS
- _[gs-title]_ BizBot
- _[gs-desc]_ Payroll, tasks and bookkeeping in Telegram, with automatic Excel filling. Saves the owner 4+ hours a week.
- _[gs-stats]_ Excel API · FastAPI
- Посилання/кнопка: «Case study →» → `/en/portfolio/#p-bizbot`
- _[gs-num]_ 07
- _[gs-badge]_ IU PRODUCT
- _[gs-title]_ Ad Tracker by IU
- _[gs-desc]_ Ad reporting portal: Meta, Google and TikTok Ads in one dashboard. Currently in development.
- _[gs-stats]_ Next.js 14 · Meta API
- Посилання/кнопка: «Case study →» → `/en/portfolio/#p-ad-tracker`
- _[gs-num]_ 08
- _[gs-badge]_ MINI APP
- _[gs-title]_ EduApp
- _[gs-desc]_ Telegram Mini App for an English language school.
- _[gs-stats]_ Mini App · Telegram
- _[gs-num]_ 09
- _[gs-badge]_ CAR DEALER
- _[gs-title]_ Respect Car
- _[gs-desc]_ Website for a Kharkiv car dealer: sales, buyback and imports from the USA. Live catalogue, admin panel in Telegram.
- _[gs-stats]_ Next.js 16 · PostgreSQL
- Посилання/кнопка: «Visit site ↗» → `https://respectcar.com.ua/`

**9. content** · `<section#avatar-sec>`

- _[slabel]_ Infinite Union
- _[av-quote]_ A website, a bot and a CRM that talk to each other, built and supported by one team.
- _[av-attr-l]_ Based in
- _[av-attr-v]_ Kharkiv, Ukraine, working with clients across the EU
- _[av-attr-l]_ Stack
- _[av-attr-v]_ Next.js, Python, PostgreSQL
- _[av-attr-l]_ Ownership
- _[av-attr-v]_ Source code and access are yours
- _[av-attr-l]_ Support
- _[av-attr-v]_ Reply within 15 min in business hours
- See the projects in detail in our portfolio, or compare packages on the pricing page.

**10. content** — Every form, bot and campaign we launch is tracked, so you can see where each lead came from and what it cost. · `<section#philo>`

- _[ph-q]_ Our approach
- **H2:** Every form, bot and campaign we launch is tracked, so you can see where each lead came from and what it cost.

**11. cta-form** — Ready to start? · `<section#contact>`

- _[slabel]_ Contact
- **H2:** Ready to start?
- Free first consultation. Message our manager on Telegram or WhatsApp, in English. We reply within 15 minutes during business hours.
- Посилання/кнопка: «Message on Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- _[ct-coords]_ 49° 59′ N / 36° 14′ E Kharkiv, Ukraine · 2026
- Поле форми: text `cn` · label «Name» · placeholder «Your name» · обов'язкове
- Поле форми: text `cc` · label «Telegram or WhatsApp» · placeholder «@username or +49...» · обов'язкове
- Поле форми: text `cphone` · label «Phone» · placeholder «+ country code»
- Поле форми: select `ctype` · label «Project type»
  - «Choose...» (value: )
  - «Website» (value: Конверсійний сайт)
  - «Telegram bot» (value: Telegram-бот)
  - «SaaS / web app» (value: Платформа / вебдодаток)
  - «Business automation» (value: Цифрова екосистема)
  - «Ads / SEO» (value: Інше)
  - «Other» (value: Інше)
- Поле форми: select `cbudget` · label «Budget»
  - «Choose...» (value: )
  - «Up to $500» (value: до $500)
  - «$500–$1,000» (value: $500–$1 000)
  - «$1,000–$3,000» (value: $1 000–$3 000)
  - «$3,000+» (value: $3 000+)
- Поле форми: date `cdeadline` · label «Deadline»
- Поле форми: textarea `cp` · label «About the project» · placeholder «What would you like to build?»
- _[form-ok]_ ✓ Request sent. We will reply within 15 minutes during business hours.
- Кнопка: «Send →»
- _[декор, aria-hidden]_ Website
- _[ci-l]_ Messengers
- _[ci-v]_ @infiniteunion_manager / WhatsApp / +380688286969
- _[ci-l]_ Email
- _[ci-v]_ supportinfiniteunion@gmail.com
- _[ci-l]_ Reply time
- _[ci-v]_ 15 minutes, business hours

#### Внутрішні посилання з контенту (20)

- «Services» → `/en/#services` · блок 1
- «Portfolio» → `/en/#portfolio` · блок 1
- «Contact» → `/en/#contact` · блок 1
- «pricing page» → `/en/pricing/` · блок 4
- «01WebsitesLanding · Corporate · Store↗» → `/en/services/websites/` · блок 5
- «02Telegram botsSales · Bookings · CRM↗» → `/en/services/bots/` · блок 5
- «03SaaS & web appsMVP · Dashboards · API↗» → `/en/services/platforms/` · блок 5
- «04Business automationWebsite + bot + CRM↗» → `/en/services/ecosystems/` · блок 5
- «05Something else?Tell us and we will suggest a plan→» → `/en/#contact` · блок 5
- «01Meta AdsFacebook · Instagram · Reels↗» → `/en/services/meta-ads/` · блок 5
- «02Google AdsSearch · Performance Max · YouTube↗» → `/en/services/google-ads/` · блок 5
- «03SEOAudit · Content · Local SEO↗» → `/en/services/seo/` · блок 5
- «04TikTok AdsIn-Feed · Spark Ads · UGC↗» → `/en/services/tiktok-ads/` · блок 5
- «Discuss your marketing→» → `/en/#contact` · блок 5
- «Case study →» → `/en/portfolio/#p-kneu-bot` · блок 8
- «Case study →» → `/en/portfolio/#p-iu-bot` · блок 8
- «Case study →» → `/en/portfolio/#p-bizbot` · блок 8
- «Case study →» → `/en/portfolio/#p-ad-tracker` · блок 8
- «portfolio» → `/en/portfolio/` · блок 9
- «pricing page» → `/en/pricing/` · блок 9

Зовнішні / контактні: «Visit site ↗» → `https://transferkharkiv.com.ua/`, «Try it ↗» → `https://t.me/infinitycreo_bot`, «Visit site ↗» → `https://respectcar.com.ua/`, «@infiniteunion_manager» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «+380688286969» → `tel:+380688286969`, «supportinfiniteunion@gmail.com» → `mailto:supportinfiniteunion@gmail.com`

---

## 7.2 Шаблон: service

### /services/websites/ — Розробка сайтів

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/websites/ |
| Мова | uk |
| Пара | en: `/en/services/websites/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (52) | Розробка сайтів під ключ — від $600 \| Infinite Union |
| Description (147) | Розробка сайтів під ключ у Харкові: лендінги, корпоративні сайти, інтернет-магазини. Унікальний дизайн, SEO-основа, код і доступи — ваші. Від $600. |
| Головний ключ | розробка сайтів під ключ |
| Вторинні ключі | розробка сайтів, створення сайту під ключ, замовити сайт, веб-студія, розробка сайту для бізнесу, сайт для компанії |
| H1 | Розробка сайтів під ключ. |
| Слів | 1102 |
| JSON | `design-content/services__websites.json` |

**Хлібні крихти:** Головна (`/`) › Розробка сайтів

#### Блоки (9)

**1. hero** — Розробка сайтів під ключ. · `<section .hero>`

- _[hero-label]_ ПОСЛУГА 01 · РОЗРОБКА САЙТІВ · ХАРКІВ, УКРАЇНА, ЄС
- **H1:** Розробка сайтів під ключ.
- Infinite Union — веб-студія з Харкова. Розробка сайтів під ключ для малого й середнього бізнесу в Україні та ЄС: структура, дизайн, верстка, запуск і передача доступів. Лендінг — від $600 і до 10 днів, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200.
- ОБГОВОРИТИ ПРОЄКТ
- _[hero-stat-num]_ $600
- _[hero-stat-label]_ ЦІНА САЙТУ ВІД
- _[hero-stat-num]_ 10дн
- _[hero-stat-label]_ ЛЕНДІНГ START
- _[hero-stat-num]_ 1міс
- _[hero-stat-label]_ ПІДТРИМКИ В ЦІНІ
- _[hero-stat-num]_ 15хв
- _[hero-stat-label]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС
- _[flagship-tag]_ ПРОЄКТ З ПОРТФОЛІО
- _[flagship-name]_ Transfer Kharkiv
- _[flagship-url]_ transferkharkiv.com.ua
- _[fm-val]_ 8.4%
- _[fm-key]_ Конверсія лендінгу
- _[fm-val]_ 119+
- _[fm-key]_ SEO-позицій у топі
- _[fm-val]_ 24/7
- _[fm-key]_ Заявки через Telegram-бот
- _[fm-val]_ HTML/JS
- _[fm-key]_ Статичний стек

**2. problem** — Сайт є, а заявок немає · `<section>`

- _[sec-label]_ З ЧИМ ДО НАС ПРИХОДЯТЬ
- **H2:** Сайт є, а заявок немає
- Типова історія: сайт зробили на шаблоні, він повільно відкривається з телефона, форма надсилає листи на пошту, яку ніхто не читає, а Google не бачить половину сторінок. Реклама веде трафік у нікуди, і незрозуміло, скільки звернень дав сайт за місяць.
- Друга історія — підрядник зник разом із доступами до хостингу й домену. Щоб змінити телефон у шапці, доводиться шукати нового розробника.
- Розробка сайту під ключ в Infinite Union закриває обидві проблеми: ми робимо сайт під конкретну задачу — заявки, продажі чи довіру партнерів — і передаємо вам весь вихідний код і доступи. Сайт належить вам, а не студії.
- _[cred-val]_ 50/50
- _[cred-label]_ Оплата етапами
- _[cred-val]_ 100%
- _[cred-label]_ Коду й доступів — ваші
- _[cred-val]_ 1міс
- _[cred-label]_ Підтримки після запуску
- _[cred-val]_ 15хв
- _[cred-label]_ Відповідь у робочий час

**3. types** — Види сайтів, які ми розробляємо · `<section>`

- _[sec-label]_ ЯКИЙ САЙТ ВАМ ПОТРІБЕН
- **H2:** Види сайтів, які ми розробляємо
- Картка-посилання → `/services/websites-landing/`:
  - 01 · ВІД $600
  - **H3:** Лендінг
  - Одна сторінка під одну пропозицію — для запуску реклами, нової послуги чи акції. 5–7 секцій, форма з передачею заявок у Telegram. Запуск до 10 днів.
  - Про створення лендингу →
- Картка-посилання → `/services/websites-corporate/`:
  - 02 · ВІД $1 000
  - **H3:** Корпоративний сайт
  - Багатосторінковий сайт компанії: послуги, команда, кейси, блог, кілька мов. Від 5–8 сторінок за ~3 тижні до 50+ сторінок для холдингів.
  - Про корпоративні сайти →
- Картка-посилання → `/services/websites-shop/`:
  - 03 · ВІД $1 200
  - **H3:** Інтернет-магазин
  - Каталог, фільтри, кошик, онлайн-оплата й доставка Новою Поштою. До 100 товарів — від ~3 тижнів, без обмежень за кількістю — від ~5 тижнів.
  - Про інтернет-магазини →
- Картка-посилання → `/services/websites-kharkiv/`:
  - 04 · ДЛЯ ХАРКОВА
  - **H3:** Сайт для бізнесу в Харкові
  - Працюєте в Харкові? Зустрінемося офлайн, покажемо харківські проєкти з портфоліо й допоможемо з видимістю в Google Maps.
  - Розробка сайту в Харкові →
- Потрібен особистий кабінет, сервіс із підпискою чи внутрішня система? Це вже вебплатформа або SaaS — від $2 500. А якщо сайт має працювати разом із Telegram-ботом і CRM, подивіться автоматизацію бізнесу — від $2 000.

**4. included-cards** — Від брифу до робочого сайту · `<section .what>`

- _[sec-label]_ ЩО ВХОДИТЬ У РОЗРОБКУ ПІД КЛЮЧ
- **H2:** Від брифу до робочого сайту
- _[what-num]_ 01
- **H3:** Структура і тексти-каркас
- _[what-desc]_ Розбираємо ваш продукт, клієнтів і конкурентів, складаємо карту сторінок і порядок блоків. На цьому етапі видно, що сайт має сказати і куди веде кожна кнопка.
- _[what-tags]_ Бриф · Аналіз конкурентів · Прототип
- _[what-num]_ 02
- **H3:** Унікальний дизайн
- _[what-desc]_ Малюємо дизайн з нуля, без готових шаблонів. Спершу мобільна версія, бо саме з телефона заходить більшість відвідувачів із реклами та соцмереж.
- _[what-tags]_ Figma · Mobile-first · Адаптив
- _[what-num]_ 03
- **H3:** Верстка й інтеграції
- _[what-desc]_ Лендінги робимо на чистому HTML/CSS/JS, складніші сайти — на Next.js, React і TypeScript. Форма заявки передає звернення в Telegram або CRM: ліди зберігаються в базі, і жодне не загубиться в пошті.
- _[what-tags]_ HTML/CSS/JS · Next.js · Telegram / CRM
- _[what-num]_ 04
- **H3:** Базове SEO і запуск
- _[what-desc]_ Мета-теги, розмітка Schema.org, sitemap, robots.txt, швидкість завантаження, підключення аналітики. Після запуску — місяць підтримки. Далі можна підключити SEO-просування чи рекламу в Google.
- _[what-tags]_ Schema.org · Core Web Vitals · Аналітика

**5. process** — Як проходить розробка сайту · `<section .process>`

- _[sec-label]_ ЕТАПИ І ТЕРМІНИ
- **H2:** Як проходить розробка сайту
- _[process-dot]_ 01
- _[process-step-name]_ Брифінг
- _[process-step-desc]_ Обговорюємо задачу, аудиторію, бюджет і терміни. Фіксуємо обсяг робіт
- _[process-time]_ 1–2 дні
- _[process-dot]_ 02
- _[process-step-name]_ Прототип
- _[process-step-desc]_ Структура сторінок і блоків, яку ви погоджуєте до дизайну
- _[process-time]_ 3–5 днів
- _[process-dot]_ 03
- _[process-step-name]_ Дизайн і розробка
- _[process-step-desc]_ Дизайн, верстка, форми, інтеграції. Термін залежить від типу сайту
- _[process-time]_ від 1 тижня
- _[process-dot]_ 04
- _[process-step-name]_ Тестування
- _[process-step-desc]_ Перевіряємо на телефонах і ПК, тестуємо форми та швидкість
- _[process-time]_ 2–4 дні
- _[process-dot]_ 05
- _[process-step-name]_ Запуск і підтримка
- _[process-step-desc]_ Публікація, аналітика, передача доступів. Місяць підтримки в ціні
- _[process-time]_ 1 день + 1 міс

**6. pricing-tiers** — Скільки коштує сайт під ключ · `<section>`

- _[sec-label]_ ЦІНИ
- **H2:** Скільки коштує сайт під ключ
- **H3:** Лендінг
- _[level-price]_ від $600
- _[level-price-note]_ 5–7 секцій · до 10 днів
- Список:
  - Унікальний дизайн
  - Адаптивна верстка
  - Форма заявки в Telegram або CRM
  - Базова SEO-оптимізація
  - 1 місяць підтримки
  - Кілька сторінок
  - Каталог і оплата
- Посилання/кнопка: «ДЕТАЛЬНІШЕ ПРО ЛЕНДІНГ» → `/services/websites-landing/`
- _[level-badge]_ БАГАТОСТОРІНКОВИЙ
- **H3:** Корпоративний сайт
- _[level-price]_ від $1 000
- _[level-price-note]_ 5–8 сторінок · ~3 тижні
- Список:
  - Усе з тарифу «Лендінг»
  - Сторінки послуг, кейсів, контактів
  - Блог і мультимовність — у Pro від $2 000
  - Заявки в CRM
  - 1 місяць підтримки
  - Каталог і оплата
- Посилання/кнопка: «ДЕТАЛЬНІШЕ ПРО КОРПОРАТИВНИЙ» → `/services/websites-corporate/`
- **H3:** Інтернет-магазин
- _[level-price]_ від $1 200
- _[level-price-note]_ до 100 товарів · ~3 тижні
- Список:
  - Каталог і фільтри
  - Кошик і оформлення замовлення
  - Онлайн-оплата
  - Адмінка для товарів
  - Нова Пошта — у Pro від $2 500
  - 1 місяць підтримки
- Посилання/кнопка: «ДЕТАЛЬНІШЕ ПРО МАГАЗИН» → `/services/websites-shop/`
- Хостинг і домен оплачуються окремо. Підтримка після першого місяця — від $150/міс або погодинно. Усі тарифи в одній таблиці — на сторінці цін, а ринкові вилки з поясненнями — у статті «Ціни на сайти у 2026».

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Лендінг | від $600 · 5–7 секцій · до 10 днів | 5–7 секцій · до 10 днів | Унікальний дизайн; Адаптивна верстка; Форма заявки в Telegram або CRM; Базова SEO-оптимізація; 1 місяць підтримки; Кілька сторінок; Каталог і оплата |
| Корпоративний сайт _(БАГАТОСТОРІНКОВИЙ)_ | від $1 000 · 5–8 сторінок · ~3 тижні | 5–8 сторінок · ~3 тижні | Усе з тарифу «Лендінг»; Сторінки послуг, кейсів, контактів; Блог і мультимовність — у Pro від $2 000; Заявки в CRM; 1 місяць підтримки; Каталог і оплата |
| Інтернет-магазин | від $1 200 · до 100 товарів · ~3 тижні | до 100 товарів · ~3 тижні | Каталог і фільтри; Кошик і оформлення замовлення; Онлайн-оплата; Адмінка для товарів; Нова Пошта — у Pro від $2 500; 1 місяць підтримки |

**7. portfolio** — Сайти, які ми вже запустили · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Сайти, які ми вже запустили
- **H3:** Transfer Kharkiv
- _[extra-desc]_ Лендінг трансферної компанії. Конверсія 8.4%, 119+ SEO-позицій у топі Google, заявки приймає Telegram-бот цілодобово. Статичний HTML/CSS/JS і бот на Python.
- _[extra-price]_ Лендінг + SEO + бот
- **H3:** Respect Car
- _[extra-desc]_ Сайт автомайданчика в Харкові: продаж, викуп та імпорт авто зі США. Живий каталог із фото, керування оголошеннями через адмінку в Telegram. Next.js, PostgreSQL, Redis.
- _[extra-price]_ Сайт з каталогом
- **H3:** Parrot School
- _[extra-desc]_ Сайт школи англійської мови в Харкові та Telegram-екосистема з трьома ролями — учень, батьки, вчитель — і окремим адмін-ботом.
- _[extra-price]_ Сайт + екосистема
- Усі проєкти з описом стеку — у портфоліо. Як оцінювати чуже портфоліо і що питати у студії до договору, ми розписали в статті «Як вибрати веб-студію».

**8. faq** — Питання про розробку сайтів під ключ · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про розробку сайтів під ключ
- **Q:** Скільки коштує розробка сайту під ключ?
  **A:** Лендінг — від $600, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200, вебплатформа чи SaaS — від $2 500. У ціну входять дизайн, адаптивна верстка, базове SEO, інтеграція з Telegram або CRM і місяць підтримки. Хостинг і домен — окремо. Точну суму називаємо після брифінгу.
- **Q:** Скільки часу займає розробка?
  **A:** Лендінг Start — до 10 днів, корпоративний сайт на 5–8 сторінок — близько 3 тижнів, інтернет-магазин до 100 товарів — близько 3 тижнів. Розширені версії — 3–5 тижнів. Терміни узгоджуємо після брифінгу, до старту робіт.
- **Q:** Що означає «під ключ»?
  **A:** Ви не шукаєте окремо дизайнера, верстальника й SEO-спеціаліста. Ми ведемо проєкт від брифу до запуску: структура, дизайн, розробка, форми й інтеграції, базове SEO, аналітика, публікація і місяць підтримки.
- **Q:** Чи отримаю я вихідний код і доступи?
  **A:** Так. Після запуску передаємо весь вихідний код, доступи до хостингу, домену й аналітики. Сайт належить вам, і ви можете працювати з ним без нас.
- **Q:** Як відбувається оплата?
  **A:** Поетапно. Зазвичай 50% на старті і 50% після здачі. Для великих проєктів розбиваємо оплату на більше етапів.
- **Q:** На яких технологіях ви робите сайти?
  **A:** Лендінги — на HTML/CSS/JS: вони легкі й швидкі. Сайти з каталогом, кабінетами чи складною логікою — на Next.js, React і TypeScript з базою PostgreSQL. Розміщуємо на Railway або Cloudflare.
- **Q:** Що відбувається після запуску?
  **A:** Перший місяць підтримки входить у вартість: виправлення, дрібні правки, консультації. Далі — абонентська підтримка від $150/міс або погодинна оплата.

**9. cta** — Обговоримо ваш сайт · `<section#contact .cta-final>`

- _[sec-label]_ ГОТОВІ ПОЧАТИ?
- **H2:** Обговоримо ваш сайт
- _[cta-final-sub]_ Опишіть задачу в месенджері або телефоном — відповімо протягом 15 хвилин у робочий час і запропонуємо формат сайту.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (7, дослівно)

1. **Скільки коштує розробка сайту під ключ?**

   Лендінг — від $600, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200, вебплатформа чи SaaS — від $2 500. У ціну входять дизайн, адаптивна верстка, базове SEO, інтеграція з Telegram або CRM і місяць підтримки. Хостинг і домен — окремо. Точну суму називаємо після брифінгу.

2. **Скільки часу займає розробка?**

   Лендінг Start — до 10 днів, корпоративний сайт на 5–8 сторінок — близько 3 тижнів, інтернет-магазин до 100 товарів — близько 3 тижнів. Розширені версії — 3–5 тижнів. Терміни узгоджуємо після брифінгу, до старту робіт.

3. **Що означає «під ключ»?**

   Ви не шукаєте окремо дизайнера, верстальника й SEO-спеціаліста. Ми ведемо проєкт від брифу до запуску: структура, дизайн, розробка, форми й інтеграції, базове SEO, аналітика, публікація і місяць підтримки.

4. **Чи отримаю я вихідний код і доступи?**

   Так. Після запуску передаємо весь вихідний код, доступи до хостингу, домену й аналітики. Сайт належить вам, і ви можете працювати з ним без нас.

5. **Як відбувається оплата?**

   Поетапно. Зазвичай 50% на старті і 50% після здачі. Для великих проєктів розбиваємо оплату на більше етапів.

6. **На яких технологіях ви робите сайти?**

   Лендінги — на HTML/CSS/JS: вони легкі й швидкі. Сайти з каталогом, кабінетами чи складною логікою — на Next.js, React і TypeScript з базою PostgreSQL. Розміщуємо на Railway або Cloudflare.

7. **Що відбувається після запуску?**

   Перший місяць підтримки входить у вартість: виправлення, дрібні правки, консультації. Далі — абонентська підтримка від $150/міс або погодинна оплата.


#### Внутрішні посилання з контенту (13)

- «ОБГОВОРИТИ ПРОЄКТ» → `/services/websites/#contact` · блок 1
- «вебплатформа або SaaS» → `/services/platforms/` · блок 3
- «автоматизацію бізнесу» → `/services/ecosystems/` · блок 3
- «SEO-просування» → `/services/seo/` · блок 4
- «рекламу в Google» → `/services/google-ads/` · блок 4
- «ДЕТАЛЬНІШЕ ПРО ЛЕНДІНГ» → `/services/websites-landing/` · блок 6
- «ДЕТАЛЬНІШЕ ПРО КОРПОРАТИВНИЙ» → `/services/websites-corporate/` · блок 6
- «ДЕТАЛЬНІШЕ ПРО МАГАЗИН» → `/services/websites-shop/` · блок 6
- «цін» → `/pricing/` · блок 6
- ««Ціни на сайти у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- ««Як вибрати веб-студію»» → `/blog/zamovyty-sayt-kharkiv/` · блок 7
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 9

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/bots/ — Telegram-боти

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/bots/ |
| Мова | uk |
| Пара | en: `/en/services/bots/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (59) | Розробка Telegram-бота під ключ — від $300 \| Infinite Union |
| Description (149) | Розробка Telegram-ботів для бізнесу: заявки, запис, оплати, CRM, розсилки, Mini App. aiogram 3, PostgreSQL. Простий бот від $300, запуск до 2 тижнів. |
| Головний ключ | розробка телеграм бота |
| Вторинні ключі | розробка телеграм бота, створення телеграм бота, телеграм бот для бізнесу (інформаційний варіант → блог), чат-бот telegram |
| H1 | Розробка телеграм-бота для бізнесу |
| Слів | 992 |
| JSON | `design-content/services__bots.json` |

**Хлібні крихти:** Головна (`/`) › Telegram-боти

#### Блоки (10)

**1. hero** — Розробка телеграм-бота для бізнесу · `<section .hero>`

- _[hero-label]_ ПОСЛУГА · РОЗРОБКА TELEGRAM-БОТІВ
- **H1:** Розробка телеграм-бота для бізнесу
- Розробка телеграм-бота в Infinite Union — це бот, який приймає заявки, записує клієнтів, бере оплату й передає дані в CRM. Ми агенція з Харкова, працюємо з малим і середнім бізнесом в Україні та ЄС. Простий бот — від $300 і до 2 тижнів, код і доступи передаємо вам.
- _[hero-stat-num]_ 3000+
- _[hero-stat-label]_ АКТИВНИХ КОРИСТУВАЧІВ KNEU BOT
- _[hero-stat-num]_ $300
- _[hero-stat-label]_ ПРОСТИЙ БОТ, ВІД
- _[hero-stat-num]_ 2тиж
- _[hero-stat-label]_ ЗАПУСК ПРОСТОГО БОТА
- _[hero-stat-num]_ 15хв
- _[hero-stat-label]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС
- _[flagship-tag]_ ПРОЄКТ З ПОРТФОЛІО
- _[flagship-name]_ KNEU Bot
- _[flagship-url]_ Офіційний Telegram-бот КНЕУ
- _[fm-val]_ 3000+
- _[fm-key]_ Активних користувачів
- _[fm-val]_ Розклад
- _[fm-key]_ Завжди актуальний у чаті
- _[fm-val]_ Новини
- _[fm-key]_ Університету в одному місці
- _[fm-val]_ Push
- _[fm-key]_ Сповіщення студентам

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ AIOGRAM 3 → FASTAPI → POSTGRESQL → REDIS → LIQPAY → MONOBANK → MINI APP → CRM → AIOGRAM 3 → FASTAPI → POSTGRESQL → REDIS → LIQPAY → MONOBANK → MINI APP → CRM →

**3. problem** — Коли бізнесу потрібен бот · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Коли бізнесу потрібен бот
- Клієнти пишуть у Telegram о 23:00, а менеджер відповідає зранку. Половина питань однакові: ціна, графік, наявність, «як записатися». Заявки з різних чатів губляться, а таблицю з контактами ведуть вручну.
- Бот забирає цю рутину: відповідає на типові питання, збирає контакти за сценарієм, приймає оплату й одразу сповіщає відповідального. Менеджер отримує вже готову заявку з іменем, телефоном і суттю запиту.
- Ми не ставимо шаблонний конструктор. Розробка телеграм-бота в нас — це код на Python (aiogram 3), власна база PostgreSQL і логіка під ваш процес. Бот, база й доступи належать вам.

**4. included-cards** — Що входить у розробку телеграм-бота · `<section .what>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у розробку телеграм-бота
- _[what-num]_ 01
- **H3:** Сценарії та логіка
- _[what-desc]_ Розписуємо діалоги, кнопки й гілки: що бот питає, що відповідає, коли передає розмову людині. Стани зберігаються в Redis, тож користувач продовжує з того місця, де зупинився.
- _[what-tags]_ aiogram 3 · FSM · Redis
- _[what-num]_ 02
- **H3:** База і CRM
- _[what-desc]_ Кожна заявка записується в PostgreSQL і приходить адміністратору в Telegram. За потреби синхронізуємо з Google Sheets або CRM — детальніше на сторінці інтеграції бота з CRM.
- _[what-tags]_ PostgreSQL · Google Sheets · REST API
- _[what-num]_ 03
- **H3:** Оплата в чаті
- _[what-desc]_ Підключаємо LiqPay, WayForPay, Monobank, Stripe або Telegram Payments. Клієнт платить, не виходячи з Telegram, а бот сам підтверджує оплату й видає доступ чи чек.
- _[what-tags]_ LiqPay · WayForPay · Monobank
- _[what-num]_ 04
- **H3:** Адмінка й розсилки
- _[what-desc]_ Керування ботом — прямо в Telegram: нові заявки, зміна статусів, розсилка за сегментами, базова статистика. Технічні знання для цього не потрібні.
- _[what-tags]_ Адмін-бот · Ролі · Розсилки
- _[what-num]_ 05
- **H3:** Mini App і AI
- _[what-desc]_ Коли кнопок замало — робимо Telegram Mini App: каталог, кабінет чи форму всередині Telegram. AI-функції (відповіді, генерація текстів) будуємо на Claude API або через n8n.
- _[what-tags]_ Mini App · Claude API · n8n
- _[what-num]_ 06
- **H3:** Запуск і передача
- _[what-desc]_ Розгортаємо на Railway або вашому сервері, налаштовуємо логи й автоперезапуск. Передаємо вихідний код, доступи до бази та інструкцію для адміністратора.
- _[what-tags]_ Railway · VPS · Код — ваш

**5. types** — Бот під конкретну задачу · `<section>`

- _[sec-label]_ ТИПИ БОТІВ
- **H2:** Бот під конкретну задачу
- Картка-посилання → `/services/bots-sales/`:
  - 01
  - **H3:** Бот для продажів
  - Квіз-кваліфікація, каталог, оплата в чаті й передача теплого ліда менеджеру. Від $500, від 7 днів.
  - Детальніше →
- Картка-посилання → `/services/bots-restaurant/`:
  - 02
  - **H3:** Бот для ресторану
  - Меню з фото, замовлення на доставку й самовивіз, бронювання столиків. Від $600.
  - Детальніше →
- Картка-посилання → `/services/bots-crm/`:
  - 03
  - **H3:** Бот + CRM
  - Ліди, угоди й статуси синхронізуються з Bitrix24, amoCRM, Pipedrive або Google Sheets. Від $800.
  - Детальніше →

**6. pricing-tiers** — Скільки коштує телеграм-бот · `<section>`

- _[sec-label]_ ЦІНИ
- **H2:** Скільки коштує телеграм-бот
- **H3:** Starter
- _[level-price]_ від $300
- _[level-price-note]_ Простий бот · до 2 тижнів
- Список:
  - Заявки, квіз або запис
  - Відповіді на типові питання
  - Сповіщення адміністратору
  - База даних PostgreSQL
  - Запуск на Railway
  - Оплати
  - CRM-інтеграція
  - Mini App
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact`
- _[level-badge]_ ЧАСТО ОБИРАЮТЬ
- **H3:** Business
- _[level-price]_ від $700
- _[level-price-note]_ Повноцінний бот · до 4 тижнів
- Список:
  - Багатокрокові сценарії
  - Оплати в чаті
  - CRM або Google Sheets
  - Кілька адміністраторів і ролі
  - Розсилки за сегментами
  - Базова статистика
  - 1 місяць підтримки
  - Mini App
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact`
- **H3:** Enterprise
- _[level-price]_ від $1 500
- _[level-price-note]_ Складна система · план робіт окремо
- Список:
  - Telegram Mini App
  - AI-функції (Claude API, n8n)
  - Кілька ботів і ролей
  - Веб-дашборд для команди
  - Інтеграції з вашими API
  - 3 місяці підтримки
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact`
- Точну суму фіксуємо після брифу. Оплата поетапно. Сервер і комісії платіжних систем оплачуються окремо. Ціни на сайти, рекламу та SEO — на сторінці ціни. Що врахувати перед замовленням, ми розібрали в статті «Telegram-бот для бізнесу».

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Starter | від $300 · Простий бот · до 2 тижнів | Простий бот · до 2 тижнів | Заявки, квіз або запис; Відповіді на типові питання; Сповіщення адміністратору; База даних PostgreSQL; Запуск на Railway; Оплати; CRM-інтеграція; Mini App |
| Business _(ЧАСТО ОБИРАЮТЬ)_ | від $700 · Повноцінний бот · до 4 тижнів | Повноцінний бот · до 4 тижнів | Багатокрокові сценарії; Оплати в чаті; CRM або Google Sheets; Кілька адміністраторів і ролі; Розсилки за сегментами; Базова статистика; 1 місяць підтримки; Mini App |
| Enterprise | від $1 500 · Складна система · план робіт окремо | — | Telegram Mini App; AI-функції (Claude API, n8n); Кілька ботів і ролей; Веб-дашборд для команди; Інтеграції з вашими API; 3 місяці підтримки |

**7. process** — Як ми працюємо · `<section .process>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як ми працюємо
- _[process-dot]_ 01
- **H3:** Бриф
- _[process-step-desc]_ Розбираємо процес, ролі та що має робити бот
- _[process-time]_ 1–2 дні
- _[process-dot]_ 02
- **H3:** Сценарій
- _[process-step-desc]_ Схема діалогів і кнопок, погоджуємо з вами
- _[process-time]_ 3–5 днів
- _[process-dot]_ 03
- **H3:** Розробка
- _[process-step-desc]_ Код, база, оплати, інтеграції, адмінка
- _[process-time]_ Залежно від тарифу
- _[process-dot]_ 04
- **H3:** Тестування
- _[process-step-desc]_ Проходимо всі сценарії, виправляємо помилки
- _[process-time]_ 2–4 дні
- _[process-dot]_ 05
- **H3:** Запуск
- _[process-step-desc]_ Деплой, передача коду й доступів, підтримка
- _[process-time]_ 1 день

**8. portfolio** — Боти, які ми вже запустили · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Боти, які ми вже запустили
- **H3:** KNEU Bot
- _[uc-desc]_ Офіційний бот КНЕУ: розклад, новини, сповіщення. 3 000+ активних користувачів.
- Список:
  - Python, aiogram
  - PostgreSQL
  - Railway
- **H3:** Parrot School
- _[uc-desc]_ Telegram-екосистема школи англійської: окремі ролі для учня, батьків і вчителя плюс адмін-бот.
- Список:
  - 3 ролі + адмін-бот
  - aiogram
  - Railway
- **H3:** BizBot
- _[uc-desc]_ Бот для бухгалтерії малого бізнесу: зарплати, задачі, автозаповнення Excel. Економить 4+ години на тиждень.
- Список:
  - aiogram
  - FastAPI
  - Приватний проєкт
- **H3:** IU Bot
- _[uc-desc]_ Наш власний lead-бот: квіз, покрокові сценарії, передача ліда в CRM.
- Список:
  - Квіз-кваліфікація
  - FSM-сценарії
  - CRM
- **H3:** InfinityCreo
- _[uc-desc]_ AI-генерація рекламних креативів через n8n: від брифу до банера приблизно за 3 хвилини, 10+ форматів.
- Список:
  - n8n
  - AI-генерація
  - @infinitycreo_bot
- **H3:** Realty Monitor
- _[uc-desc]_ Моніторинг об'єктів нерухомості з оплатою підписки через LiqPay і покроковими сценаріями.
- Список:
  - LiqPay
  - FSM
  - Сповіщення
- Сайти, рекламні та інші проєкти — у портфоліо. Якщо боту потрібен ще й сайт і CRM як одна система, дивіться автоматизацію бізнесу.

**9. faq** — Питання про розробку бота · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про розробку бота
- **Q:** Скільки коштує розробка телеграм-бота?
  **A:** Starter — від $300, Business з оплатами й CRM — від $700, Enterprise з Mini App чи AI — від $1 500. Точну суму фіксуємо після брифу. Сервер і комісії платіжних систем — окремо.
- **Q:** Скільки часу займає розробка?
  **A:** Простий бот — до 2 тижнів, бот рівня Business — до 4 тижнів. Для Enterprise складаємо окремий план етапів після брифу.
- **Q:** Які оплати можна підключити до бота?
  **A:** LiqPay, WayForPay, Monobank, Stripe і Telegram Payments. Бот сам підтверджує оплату, надсилає чек і видає доступ або передає замовлення в роботу.
- **Q:** Чи можна зв'язати бота з CRM або сайтом?
  **A:** Так. Бот може передавати ліди в Google Sheets чи CRM і отримувати заявки з сайту через webhook. Варіанти й ціни — на сторінці інтеграції з CRM.
- **Q:** Кому належить бот після запуску?
  **A:** Вам. Бот реєструється на ваш акаунт через @BotFather, а ми передаємо вихідний код, доступи до бази та сервера. Без абонплати за «оренду» бота.
- **Q:** Хто підтримує бота після запуску?
  **A:** У тариф Business входить 1 місяць підтримки, у Enterprise — 3 місяці. Далі — від $150/міс або погодинно, коли потрібні зміни.

**10. cta** — Розкажіть, що має робити бот · `<section#contact .cta-final>`

- _[sec-label]_ ОБГОВОРИТИ БОТА
- **H2:** Розкажіть, що має робити бот
- _[cta-final-sub]_ Опишіть задачу в месенджері — у робочий час відповідаємо протягом 15 хвилин і пропонуємо тариф
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує розробка телеграм-бота?**

   Starter — від $300, Business з оплатами й CRM — від $700, Enterprise з Mini App чи AI — від $1 500. Точну суму фіксуємо після брифу. Сервер і комісії платіжних систем — окремо.

2. **Скільки часу займає розробка?**

   Простий бот — до 2 тижнів, бот рівня Business — до 4 тижнів. Для Enterprise складаємо окремий план етапів після брифу.

3. **Які оплати можна підключити до бота?**

   LiqPay, WayForPay, Monobank, Stripe і Telegram Payments. Бот сам підтверджує оплату, надсилає чек і видає доступ або передає замовлення в роботу.

4. **Чи можна зв'язати бота з CRM або сайтом?**

   Так. Бот може передавати ліди в Google Sheets чи CRM і отримувати заявки з сайту через webhook. Варіанти й ціни — на сторінці інтеграції з CRM.

5. **Кому належить бот після запуску?**

   Вам. Бот реєструється на ваш акаунт через @BotFather, а ми передаємо вихідний код, доступи до бази та сервера. Без абонплати за «оренду» бота.

6. **Хто підтримує бота після запуску?**

   У тариф Business входить 1 місяць підтримки, у Enterprise — 3 місяці. Далі — від $150/міс або погодинно, коли потрібні зміни.


#### Внутрішні посилання з контенту (10)

- «інтеграції бота з CRM» → `/services/bots-crm/` · блок 4
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact` · блок 6
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact` · блок 6
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/bots/#contact` · блок 6
- «ціни» → `/pricing/` · блок 6
- ««Telegram-бот для бізнесу»» → `/blog/telegram-bot-dlya-biznesu/` · блок 6
- «портфоліо» → `/portfolio/` · блок 8
- «автоматизацію бізнесу» → `/services/ecosystems/` · блок 8
- «інтеграції з CRM» → `/services/bots-crm/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/platforms/ — Вебплатформи та SaaS

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/platforms/ |
| Мова | uk |
| Пара | en: `/en/services/platforms/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (60) | Розробка вебплатформ і SaaS — MVP від $2500 \| Infinite Union |
| Description (145) | Розробка вебплатформ, SaaS, кабінетів і внутрішніх систем: React/Next.js, FastAPI, PostgreSQL. MVP від $2500 за 4–8 тижнів, код і доступи — ваші. |
| Головний ключ | розробка вебплатформи |
| H1 | Розробка вебплатформи і SaaS |
| Слів | 863 |
| JSON | `design-content/services__platforms.json` |

**Хлібні крихти:** Головна (`/`) › Вебплатформи та SaaS

#### Блоки (10)

**1. hero** — Розробка вебплатформи і SaaS · `<section .hero>`

- _[hero-label]_ ПОСЛУГА · ВЕБПЛАТФОРМИ, SAAS, КАБІНЕТИ
- **H1:** Розробка вебплатформи і SaaS
- Розробка вебплатформи в Infinite Union — це SaaS, особистий кабінет, маркетплейс або внутрішня система під ваш процес. Ми агенція з Харкова, працюємо з компаніями в Україні та ЄС. MVP — від $2 500 за 4–8 тижнів, код і доступи передаємо вам.
- _[hero-stat-num]_ $2 500
- _[hero-stat-label]_ MVP, ВІД
- _[hero-stat-num]_ 4–8тиж
- _[hero-stat-label]_ ТЕРМІН MVP
- _[hero-stat-num]_ 100%
- _[hero-stat-label]_ КОДУ Й ДОСТУПІВ — ВАШІ
- _[hero-stat-num]_ 15хв
- _[hero-stat-label]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС
- _[декор, aria-hidden]_ app.infinitetracker.com.ua AD TRACKER BY IU ДжерелаMeta · Google · TikTok Автооновленнякожні 2 год Історія90 днів Економія на звітах5+ год/тиж Статусу розробці

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ REACT NEXT.JS TYPESCRIPT FASTAPI POSTGRESQL REDIS CLOUDFLARE REST API REACT NEXT.JS TYPESCRIPT FASTAPI POSTGRESQL REDIS CLOUDFLARE REST API

**3. problem** — Коли сайту вже замало · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Коли сайту вже замало
- _[stack-cat]_ СИМПТОМ 01
- **H3:** Процес у таблицях
- _[stack-sub]_ Замовлення, клієнти й статуси живуть у Excel і чатах. Ніхто не бачить повної картини.
- _[stack-cat]_ СИМПТОМ 02
- **H3:** Клієнти питають статус
- _[stack-sub]_ Менеджери відповідають на «де моє замовлення?» замість роботи. Потрібен особистий кабінет.
- _[stack-cat]_ СИМПТОМ 03
- **H3:** Ідея продукту без коду
- _[stack-sub]_ Є гіпотеза SaaS чи маркетплейсу, і її треба перевірити на реальних користувачах, не витративши річний бюджет.
- _[stack-cat]_ СИМПТОМ 04
- **H3:** Звіти вручну
- _[stack-sub]_ Дані з кількох сервісів щотижня зводять руками. Помилки й затримки — норма.

**4. included-cards** — Що входить у розробку вебплатформи · `<section .what>`

- _[sec-label]_ ЩО МИ БУДУЄМО
- **H2:** Що входить у розробку вебплатформи
- _[what-num]_ 01
- **H3:** SaaS і підписки
- _[what-desc]_ Сервіс з реєстрацією, тарифами, оплатою підписки, ролями й дашбордами. Оплата через Stripe, LiqPay, WayForPay або Monobank.
- _[what-tags]_ Кабінет · Білінг · Ролі
- _[what-num]_ 02
- **H3:** Клієнтські кабінети
- _[what-desc]_ Особистий кабінет для клієнтів, партнерів чи співробітників: статуси замовлень, документи, звіти, сповіщення в Telegram.
- _[what-tags]_ Статуси · Документи · Telegram
- _[what-num]_ 03
- **H3:** Внутрішні системи
- _[what-desc]_ Облік замовлень, задач, складу чи заявок замість розрізнених таблиць. Інтеграція з вашою CRM і сервісами через API.
- _[what-tags]_ Облік · API · Звіти
- _[what-num]_ 04
- **H3:** Маркетплейси й каталоги
- _[what-desc]_ Платформа для продавців і покупців або живий каталог з фільтрами, фото й адмінкою. Для простого магазину достатньо інтернет-магазину.
- _[what-tags]_ Каталог · Фільтри · Адмінка

**5. process** — Як ми працюємо · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як ми працюємо
- _[stack-cat]_ 1–2 ДНІ
- **H3:** Бриф
- _[stack-sub]_ Ролі користувачів, сценарії, що входить у першу версію, а що — пізніше
- _[stack-cat]_ 3–5 ДНІВ
- **H3:** Прототип
- _[stack-sub]_ Ключові екрани й структура даних. Погоджуємо до старту розробки
- _[stack-cat]_ ЗА ТАРИФОМ
- **H3:** Розробка
- _[stack-sub]_ Етапами з демо після кожного. Оплата теж поетапна
- _[stack-cat]_ 2–4 ДНІ + 1 ДЕНЬ
- **H3:** Тест і запуск
- _[stack-sub]_ Перевірка сценаріїв, деплой, передача коду, доступів і документації

**6. tech-stack** — На чому ми будуємо · `<section>`

- _[sec-label]_ СТЕК
- **H2:** На чому ми будуємо
- _[stack-cat]_ FRONTEND
- _[stack-item]_ React / Next.js
- _[stack-sub]_ Швидкі інтерфейси з SSR
- _[stack-item]_ TypeScript
- _[stack-sub]_ Менше помилок у коді
- _[stack-cat]_ BACKEND
- _[stack-item]_ Python / FastAPI
- _[stack-sub]_ API і бізнес-логіка
- _[stack-item]_ PostgreSQL
- _[stack-sub]_ Основна база даних
- _[stack-cat]_ ІНФРАСТРУКТУРА
- _[stack-item]_ Railway / Cloudflare
- _[stack-sub]_ Хостинг, CDN, захист
- _[stack-item]_ Redis
- _[stack-sub]_ Кеш і черги задач
- _[stack-cat]_ АВТОМАТИЗАЦІЯ
- _[stack-item]_ n8n
- _[stack-sub]_ Зв'язки між сервісами
- _[stack-item]_ Claude API
- _[stack-sub]_ AI-функції в продукті

**7. pricing-tiers** — Скільки коштує вебплатформа · `<section>`

- _[sec-label]_ ЦІНИ
- **H2:** Скільки коштує вебплатформа
- **H3:** MVP
- _[level-price]_ від $2 500
- _[level-price-note]_ Перша версія продукту · 4–8 тижнів
- Список:
  - Ключові сценарії продукту
  - Реєстрація, вхід, ролі
  - Базовий дашборд
  - REST API
  - Деплой і передача коду
  - Платежі
  - Інтеграції
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact`
- _[level-badge]_ ЧАСТО ОБИРАЮТЬ
- **H3:** Platform
- _[level-price]_ від $6 000
- _[level-price-note]_ Повна платформа · 2–4 місяці
- Список:
  - Повний набір функцій
  - Адаптив для мобільних
  - Оплати й підписки
  - Адмін-панель
  - Звіти й аналітика
  - Інтеграції з CRM і сервісами
  - Сповіщення в Telegram
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact`
- **H3:** Enterprise
- _[level-price]_ від $15 000
- _[level-price-note]_ Велика система · план робіт окремо
- Список:
  - Кілька продуктів чи модулів
  - Кілька компаній в одній системі
  - Складні ролі й права
  - Власна аналітика
  - AI-функції
  - Документація для команди
- Посилання/кнопка: «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact`
- Точну суму рахуємо після брифу й прототипу. Хостинг, домени й платні API оплачуються окремо. Підтримка після запуску — від $150/міс або погодинно. Порівняння з іншими послугами — на сторінці ціни; ринкові ціни на розробку ми розібрали у статті «Ціни на сайти у 2026».

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| MVP | від $2 500 · Перша версія продукту · 4–8 тижнів | Перша версія продукту · 4–8 тижнів | Ключові сценарії продукту; Реєстрація, вхід, ролі; Базовий дашборд; REST API; Деплой і передача коду; Платежі; Інтеграції |
| Platform _(ЧАСТО ОБИРАЮТЬ)_ | від $6 000 · Повна платформа · 2–4 місяці | Повна платформа · 2–4 місяці | Повний набір функцій; Адаптив для мобільних; Оплати й підписки; Адмін-панель; Звіти й аналітика; Інтеграції з CRM і сервісами; Сповіщення в Telegram |
| Enterprise | від $15 000 · Велика система · план робіт окремо | — | Кілька продуктів чи модулів; Кілька компаній в одній системі; Складні ролі й права; Власна аналітика; AI-функції; Документація для команди |

**8. portfolio** — Платформи, які ми вже зробили · `<section .what>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Платформи, які ми вже зробили
- _[what-num]_ 01
- **H3:** Ad Tracker by IU
- _[what-desc]_ Наш власний дашборд: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить 5+ годин на тиждень на звітах. Зараз у розробці.
- _[what-tags]_ SaaS · Дашборд · API
- _[what-num]_ 02
- **H3:** Respect Car
- _[what-desc]_ Сайт автомайданчика в Харкові з живим каталогом авто, фото й адмінкою в Telegram: продаж, викуп, імпорт зі США.
- _[what-tags]_ Next.js 16 · PostgreSQL · Redis
- _[what-num]_ 03
- **H3:** Parrot School
- _[what-desc]_ Сайт школи англійської плюс Telegram-екосистема з ролями учня, батьків і вчителя та адмін-ботом.
- _[what-tags]_ Ролі · aiogram · Railway
- _[what-num]_ 04
- **H3:** EduApp
- _[what-desc]_ Telegram Mini App для школи англійської — вебдодаток, який відкривається всередині Telegram без встановлення.
- _[what-tags]_ Mini App · Освіта
- Більше робіт — у портфоліо. Якщо замість окремої платформи потрібно зв'язати сайт, бота й CRM, дивіться автоматизацію бізнесу; для бота з кабінетом — розробку телеграм-ботів.

**9. faq** — Питання про розробку платформи · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про розробку платформи
- **Q:** Скільки коштує розробка вебплатформи?
  **A:** MVP — від $2 500 (4–8 тижнів), Platform — від $6 000 (2–4 місяці), Enterprise — від $15 000. Точну суму фіксуємо після брифу й прототипу. Хостинг і платні сервіси — окремо.
- **Q:** Чим платформа відрізняється від сайту?
  **A:** Сайт здебільшого показує інформацію й збирає заявки. Платформа має користувачів з логіном, ролі, базу даних і бізнес-логіку: клієнт щось робить у системі, а не лише читає. Якщо вам потрібен саме сайт — дивіться розробку сайтів.
- **Q:** Навіщо починати з MVP?
  **A:** MVP — це перша робоча версія з ключовими сценаріями. Ви показуєте її реальним користувачам за 4–8 тижнів і вирішуєте, що розвивати далі, замість місяців розробки «наосліп».
- **Q:** Як ви оцінюєте вартість?
  **A:** Після брифу розбиваємо проєкт на етапи й оцінюємо кожен. Оплата поетапно: ви платите за наступний етап після того, як побачили результат попереднього.
- **Q:** Чи можете продовжити проєкт, який почали інші?
  **A:** Так, але спершу дивимося код. Якщо його можна розвивати — продовжуємо. Якщо простіше переписати частину — чесно кажемо й показуємо план.
- **Q:** Що я отримаю після завершення?
  **A:** Вихідний код у вашому репозиторії, доступи до серверів і бази, інструкцію з розгортання. Продукт належить вам, і його може розвивати будь-яка команда.

**10. cta** — Розкажіть про продукт · `<section#contact .cta-final>`

- _[sec-label]_ ОБГОВОРИТИ ПЛАТФОРМУ
- **H2:** Розкажіть про продукт
- _[cta-final-sub]_ Опишіть ідею або процес, який треба автоматизувати, — у робочий час відповімо протягом 15 хвилин
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує розробка вебплатформи?**

   MVP — від $2 500 (4–8 тижнів), Platform — від $6 000 (2–4 місяці), Enterprise — від $15 000. Точну суму фіксуємо після брифу й прототипу. Хостинг і платні сервіси — окремо.

2. **Чим платформа відрізняється від сайту?**

   Сайт здебільшого показує інформацію й збирає заявки. Платформа має користувачів з логіном, ролі, базу даних і бізнес-логіку: клієнт щось робить у системі, а не лише читає. Якщо вам потрібен саме сайт — дивіться розробку сайтів.

3. **Навіщо починати з MVP?**

   MVP — це перша робоча версія з ключовими сценаріями. Ви показуєте її реальним користувачам за 4–8 тижнів і вирішуєте, що розвивати далі, замість місяців розробки «наосліп».

4. **Як ви оцінюєте вартість?**

   Після брифу розбиваємо проєкт на етапи й оцінюємо кожен. Оплата поетапно: ви платите за наступний етап після того, як побачили результат попереднього.

5. **Чи можете продовжити проєкт, який почали інші?**

   Так, але спершу дивимося код. Якщо його можна розвивати — продовжуємо. Якщо простіше переписати частину — чесно кажемо й показуємо план.

6. **Що я отримаю після завершення?**

   Вихідний код у вашому репозиторії, доступи до серверів і бази, інструкцію з розгортання. Продукт належить вам, і його може розвивати будь-яка команда.


#### Внутрішні посилання з контенту (11)

- «інтернет-магазину» → `/services/websites-shop/` · блок 4
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact` · блок 7
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact` · блок 7
- «ОБГОВОРИТИ ПРОЄКТ» → `/services/platforms/#contact` · блок 7
- «ціни» → `/pricing/` · блок 7
- ««Ціни на сайти у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 7
- «портфоліо» → `/portfolio/` · блок 8
- «автоматизацію бізнесу» → `/services/ecosystems/` · блок 8
- «розробку телеграм-ботів» → `/services/bots/` · блок 8
- «розробку сайтів» → `/services/websites/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/ecosystems/ — Цифрові екосистеми

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/ecosystems/ |
| Мова | uk |
| Пара | en: `/en/services/ecosystems/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (51) | Автоматизація бізнесу: сайт + бот + CRM — від $2000 |
| Description (144) | Автоматизація бізнесу під ключ: сайт, Telegram-бот, CRM і аналітика працюють як одна система. Заявки не губляться, звіти — без Excel. Від $2000. |
| Головний ключ | автоматизація бізнесу |
| H1 | Автоматизація бізнесу: сайт, бот і CRM |
| Слів | 895 |
| JSON | `design-content/services__ecosystems.json` |

**Хлібні крихти:** Головна (`/`) › Цифрові екосистеми

#### Блоки (9)

**1. hero** — Автоматизація бізнесу: сайт, бот і CRM · `<section .hero>`

- _[hero-label]_ ПОСЛУГА · САЙТ + TELEGRAM-БОТ + CRM
- **H1:** Автоматизація бізнесу: сайт, бот і CRM
- Автоматизація бізнесу від Infinite Union — це сайт, Telegram-бот і CRM, які зроблені однією командою й передають дані одне одному. Заявка з сайту чи бота одразу потрапляє в базу, менеджер отримує сповіщення, а звіти збираються без Excel. Для малого й середнього бізнесу в Україні та ЄС. Від $2 000.
- _[hero-stat-num]_ $2 000
- _[hero-stat-label]_ БАЗОВА СИСТЕМА, ВІД
- _[hero-stat-num]_ 3в1
- _[hero-stat-label]_ САЙТ, БОТ І CRM
- _[hero-stat-num]_ 1
- _[hero-stat-label]_ КОМАНДА НА ВСІ ЧАСТИНИ
- _[hero-stat-num]_ 15хв
- _[hero-stat-label]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ САЙТ ·TELEGRAM-БОТ ·CRM ·POSTGRESQL ·N8N ·СПОВІЩЕННЯ ·ЗВІТИ ·ОДНА СИСТЕМА · САЙТ ·TELEGRAM-БОТ ·CRM ·POSTGRESQL ·N8N ·СПОВІЩЕННЯ ·ЗВІТИ ·ОДНА СИСТЕМА ·

**3. problem** — Коли інструменти не пов'язані · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Коли інструменти не пов'язані
- **H3:** ЯК ЧАСТО БУВАЄ ЗАРАЗ
- Список:
  - —Сайт від однієї студії, бот від іншої — дані між ними не ходять
  - —Заявки з форми приходять на пошту, з бота — в чат, з Instagram — у директ
  - —Менеджер вручну переносить контакти в таблицю
  - —Невідомо, з якого каналу прийшов клієнт
  - —Коли щось ламається, підрядники перекладають відповідальність
- **H3:** ЯК ПРАЦЮЄ АВТОМАТИЗАЦІЯ
- Список:
  - +Сайт, бот і CRM робить одна команда з одним технічним планом
  - +Усі заявки записуються в одну базу й приходять сповіщенням у Telegram
  - +Статуси й нагадування — автоматично, без перенесення вручну
  - +Джерело кожного ліда зберігається в картці
  - +Один відповідальний підрядник за всю зв'язку

**4. included-cards** — Що входить в автоматизацію бізнесу · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить в автоматизацію бізнесу
- _[eco-num]_ 01
- **H3:** Сайт
- _[eco-type]_ ТОЧКА ВХОДУ
- _[eco-desc]_ Лендінг або корпоративний сайт з унікальним дизайном, адаптивною версткою й базовою SEO-оптимізацією. Форма передає заявку не на пошту, а в базу й бота. Детальніше — у розділі розробка сайтів.
- _[eco-includes]_ Унікальний дизайн · Базове SEO · Форма → база → Telegram
- _[eco-num]_ 02
- **H3:** Telegram-бот
- _[eco-type]_ ЗАЯВКИ Й КОМУНІКАЦІЯ
- _[eco-desc]_ Бот відповідає на типові питання, збирає заявки, записує клієнтів, приймає оплату й надсилає нагадування. Для команди — окремий адмін-бот з новими заявками. Детальніше — розробка телеграм-ботів.
- _[eco-includes]_ Квіз і сценарії · Оплата в чаті · Адмін-бот
- _[eco-num]_ 03
- **H3:** CRM і база
- _[eco-type]_ ОБЛІК КЛІЄНТІВ
- _[eco-desc]_ Заявки з сайту й бота — в одній базі: статуси, коментарі, відповідальний, джерело. Підключаємо вашу CRM (Bitrix24, amoCRM, Pipedrive) або робимо просту базу на PostgreSQL з Google Sheets. Деталі — на сторінці інтеграції бота з CRM.
- _[eco-includes]_ Єдина база клієнтів · Статуси · Нагадування
- _[eco-num]_ 04
- **H3:** Автоматизація рутини
- _[eco-type]_ ЗВ'ЯЗКИ МІЖ СЕРВІСАМИ
- _[eco-desc]_ Повторювані дії — автоматично: заповнення документів, звіти, розсилки, передача даних між сервісами через n8n або власний код. AI-частини — на Claude API.
- _[eco-includes]_ n8n · Claude API · Автозвіти
- _[eco-num]_ 05
- **H3:** Реклама й аналітика
- _[eco-type]_ ЗА ПОТРЕБИ
- _[eco-desc]_ Коли система готова, підключаємо трафік: Google Ads, Meta Ads або SEO. Мітки джерел записуються в картку ліда. Для звітів по рекламі розробляємо власний Ad Tracker. Ці послуги та рекламний бюджет оплачуються окремо.
- _[eco-includes]_ UTM-мітки · Джерело ліда · Окремий бюджет

**5. process** — Як ми працюємо · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як ми працюємо
- **H3:** 01 · Бриф
- _[why-desc]_ Розбираємо, звідки приходять клієнти і що з ними відбувається далі. Фіксуємо, що автоматизуємо першим. 1–2 дні.
- **H3:** 02 · Прототип
- _[why-desc]_ Схема системи: які дані де зберігаються, хто що бачить, які сповіщення приходять. Плюс ключові екрани сайту. 3–5 днів.
- **H3:** 03 · Розробка
- _[why-desc]_ Сайт, бот і база розробляються паралельно й одразу зв'язуються між собою. Терміни залежать від обсягу; показуємо проміжні результати.
- **H3:** 04 · Тестування
- _[why-desc]_ Проганяємо реальні сценарії: заявка з сайту, з бота, оплата, зміна статусу, сповіщення. 2–4 дні.
- **H3:** 05 · Запуск
- _[why-desc]_ Переносимо на робочі сервери, навчаємо команду, передаємо код і доступи. 1 день.
- **H3:** 06 · Підтримка
- _[why-desc]_ Перший місяць підтримки сайту входить у вартість. Далі — від $150/міс або погодинно.

**6. pricing-cards** — Скільки коштує автоматизація бізнесу · `<section>`

- _[sec-label]_ ЦІНА
- **H2:** Скільки коштує автоматизація бізнесу
- **H3:** Базова система — від $2 000
- _[why-desc]_ Сайт + Telegram-бот + CRM або база з сповіщеннями в Telegram. Точну суму рахуємо після брифу, оплата поетапно.
- **H3:** Що впливає на ціну
- _[why-desc]_ Кількість сторінок сайту, складність сценаріїв бота, оплати, яка CRM і скільки ролей у команді. Окремі частини можна замовити й окремо — див. ціни.
- **H3:** Що оплачується окремо
- _[why-desc]_ Хостинг, домен, підписка на CRM, комісії платіжних систем. Реклама — окремою послугою, рекламний бюджет — окремо.

**7. portfolio** — Приклади з наших проєктів · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Приклади з наших проєктів
- **H3:** Parrot School
- _[why-desc]_ Сайт школи англійської в Харкові + Telegram-екосистема: окремі боти для учня, батьків і вчителя та адмін-бот. aiogram, Railway.
- **H3:** Respect Car
- _[why-desc]_ Сайт автомайданчика з живим каталогом авто, яким керують через адмінку в Telegram. Next.js, PostgreSQL, Redis, Cloudflare.
- **H3:** BizBot
- _[why-desc]_ Бот для бухгалтерії малого бізнесу: зарплати, задачі, автозаповнення Excel. Економить 4+ години на тиждень.
- А для власної реклами ми робимо Ad Tracker — дашборд Meta, Google і TikTok Ads в одному вікні, що економить 5+ годин на тиждень на звітах (зараз у розробці). Усі проєкти — у портфоліо. Якщо потрібна велика система з кабінетами й ролями, дивіться розробку вебплатформ. Як обрати підрядника на сайт — у чек-листі «Як вибрати веб-студію», про ботів — «Telegram-бот для бізнесу».

**8. faq** — Питання про автоматизацію · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про автоматизацію
- **Q:** Скільки коштує автоматизація бізнесу?
  **A:** Базова зв'язка «сайт + бот + CRM» — від $2 000. Точна сума залежить від обсягу сайту, сценаріїв бота й обраної CRM. Хостинг, домен і рекламний бюджет — окремо.
- **Q:** Чи підійде це малому бізнесу?
  **A:** Так. Для малого бізнесу часто достатньо лендінгу, бота для заявок і простої бази в Google Sheets зі сповіщеннями в Telegram. Решту додаємо, коли з'явиться потреба.
- **Q:** У нас уже є сайт або CRM. Треба все переробляти?
  **A:** Ні. Спершу дивимося, що є. Якщо сайт чи CRM можна підключити через API — інтегруємо. Якщо інструмент цього не дозволяє, чесно скажемо й запропонуємо заміну.
- **Q:** Скільки часу займає запуск?
  **A:** Залежить від обсягу. Бриф — 1–2 дні, прототип — 3–5 днів, далі розробка, 2–4 дні тестування й 1 день на запуск. Точний графік даємо після брифу.
- **Q:** Кому належить система після запуску?
  **A:** Вам. Передаємо вихідний код сайту й бота, доступи до бази, серверів і CRM. Розвивати систему далі може будь-яка команда.
- **Q:** Чи робите ви рекламу для такої системи?
  **A:** Так, окремою послугою: Google Ads — налаштування від $300, Meta Ads — від $250, SEO — від $150/міс. Рекламний бюджет оплачується окремо.

**9. cta** — Розкажіть про ваш процес · `<section#contact .cta-final>`

- _[sec-label]_ ОБГОВОРИТИ АВТОМАТИЗАЦІЮ
- **H2:** Розкажіть про ваш процес
- _[cta-final-sub]_ Опишіть, звідки приходять клієнти і де губиться час — у робочий час відповімо протягом 15 хвилин і запропонуємо схему
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує автоматизація бізнесу?**

   Базова зв'язка «сайт + бот + CRM» — від $2 000. Точна сума залежить від обсягу сайту, сценаріїв бота й обраної CRM. Хостинг, домен і рекламний бюджет — окремо.

2. **Чи підійде це малому бізнесу?**

   Так. Для малого бізнесу часто достатньо лендінгу, бота для заявок і простої бази в Google Sheets зі сповіщеннями в Telegram. Решту додаємо, коли з'явиться потреба.

3. **У нас уже є сайт або CRM. Треба все переробляти?**

   Ні. Спершу дивимося, що є. Якщо сайт чи CRM можна підключити через API — інтегруємо. Якщо інструмент цього не дозволяє, чесно скажемо й запропонуємо заміну.

4. **Скільки часу займає запуск?**

   Залежить від обсягу. Бриф — 1–2 дні, прототип — 3–5 днів, далі розробка, 2–4 дні тестування й 1 день на запуск. Точний графік даємо після брифу.

5. **Кому належить система після запуску?**

   Вам. Передаємо вихідний код сайту й бота, доступи до бази, серверів і CRM. Розвивати систему далі може будь-яка команда.

6. **Чи робите ви рекламу для такої системи?**

   Так, окремою послугою: Google Ads — налаштування від $300, Meta Ads — від $250, SEO — від $150/міс. Рекламний бюджет оплачується окремо.


#### Внутрішні посилання з контенту (12)

- «розробка сайтів» → `/services/websites/` · блок 4
- «розробка телеграм-ботів» → `/services/bots/` · блок 4
- «інтеграції бота з CRM» → `/services/bots-crm/` · блок 4
- «Google Ads» → `/services/google-ads/` · блок 4
- «Meta Ads» → `/services/meta-ads/` · блок 4
- «SEO» → `/services/seo/` · блок 4
- «ціни» → `/pricing/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- «розробку вебплатформ» → `/services/platforms/` · блок 7
- ««Як вибрати веб-студію»» → `/blog/zamovyty-sayt-kharkiv/` · блок 7
- ««Telegram-бот для бізнесу»» → `/blog/telegram-bot-dlya-biznesu/` · блок 7
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 9

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/google-ads/ — Google Ads

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/google-ads/ |
| Мова | uk |
| Пара | en: `/en/services/google-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (49) | Налаштування Google Ads і ведення — від $300 \| IU |
| Description (149) | Налаштування та ведення Google Ads: пошук, Performance Max, YouTube, ремаркетинг, відстеження конверсій. Налаштування від $300, ведення від $200/міс. |
| Головний ключ | налаштування Google Ads |
| Вторинні ключі | налаштування Google Ads, ведення Google Ads, Google реклама. Пошуковий інтент («контекстна реклама», «реклама в пошуку Google») → `/services/google-ads-search/` |
| H1 | Налаштування Google Ads |
| Слів | 900 |
| JSON | `design-content/services__google-ads.json` |

**Хлібні крихти:** Головна (`/`) › Google Ads

#### Блоки (11)

**1. hero** — Налаштування Google Ads · `<section .hero>`

- _[hm-val]_ від $300
- _[hm-key]_ SETUP
- _[hm-sub]_ Налаштування, разово
- _[hm-val]_ від $200
- _[hm-key]_ MGMT
- _[hm-sub]_ Ведення, на місяць
- _[hm-key]_ BUDGET
- _[hm-sub]_ Бюджет на рекламу — окремо
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 02
- _[hero-label]_ GOOGLE ADS · ХАРКІВ · УКРАЇНА / ЄС
- **H1:** Налаштування Google Ads
- Infinite Union — агенція з Харкова. Робимо налаштування Google Ads і ведемо кампанії для малого та середнього бізнесу в Україні та ЄС: пошук, Performance Max, YouTube, ремаркетинг, відстеження заявок. Налаштування від $300, ведення від $200/міс, рекламний бюджет — окремо. Обговорити задачу →
- _[hero-stat-num]_ $300+
- _[hero-stat-label]_ налаштування, від
- _[hero-stat-num]_ $200/міс
- _[hero-stat-label]_ ведення, від
- _[hero-stat-num]_ 4
- _[hero-stat-label]_ типи кампаній під задачу

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ GOOGLE SEARCH →DISPLAY →YOUTUBE ADS →PERFORMANCE MAX →SMART BIDDING →REMARKETING →GA4 →GOOGLE MERCHANT →GOOGLE SEARCH →DISPLAY →YOUTUBE ADS →PERFORMANCE MAX →SMART BIDDING →REMARKETING →GA4 →GOOGLE MERCHANT →

**3. problem** — Чому реклама в Google з'їдає бюджет · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Чому реклама в Google з'їдає бюджет
- Найчастіше ми бачимо одну картину: кампанію запустили самостійно або в «розумному» режимі, гроші списуються, а заявок мало і незрозуміло, звідки вони. Причини прозаїчні: широкі ключові слова без мінус-слів, одна кампанія на всі послуги, не налаштовані конверсії. Алгоритм Google тоді оптимізує показ під кліки, а не під дзвінки й форми.
- Тому налаштування Google Ads ми починаємо не з оголошень, а з двох питань: яка дія на сайті для вас є результатом і скільки ви готові за неї платити. Від відповідей залежать структура акаунта, типи кампаній і стратегія ставок.

**4. included-cards** — Що входить у налаштування Google Ads · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у налаштування Google Ads
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Пошукові кампанії
- _[service-desc]_ Семантика за наміром, мінус-слова, адаптивні оголошення, розширення. Детально — на сторінці контекстної реклами Google.
- _[service-tags]_ Search · RSA · Мінус-слова
- _[service-num]_ 02
- **H3:** Performance Max
- _[service-desc]_ Для інтернет-магазинів і бізнесу з каталогом: групи об'єктів, сигнали аудиторій, фід Merchant Center. Запускаємо, коли вже працює відстеження конверсій.
- _[service-tags]_ PMax · Merchant Center · Фід товарів
- _[service-num]_ 03
- **H3:** YouTube і відео
- _[service-desc]_ In-stream і Shorts для охоплення та ремаркетингу на тих, хто вже знає бренд. Якщо відео немає — підкажемо, яке потрібно під формат.
- _[service-tags]_ In-stream · Shorts · Bumper
- _[service-num]_ 04
- **H3:** Ремаркетинг
- _[service-desc]_ Окремі оголошення для відвідувачів сайту, тих, хто дивився ціни або почав заповнювати форму.
- _[service-tags]_ Списки аудиторій · Customer Match
- _[service-num]_ 05
- **H3:** Відстеження конверсій
- _[service-desc]_ GA4 і Google Tag Manager: форми, кліки по телефону, переходи в Telegram і Viber. Без цього оптимізувати рекламу неможливо — алгоритму нема на чому вчитися.
- _[service-tags]_ GA4 · GTM · Конверсії
- _[service-num]_ 06
- **H3:** Звіти без води
- _[service-desc]_ Щотижневе коротке зведення в Telegram і щомісячний звіт: витрати, заявки, ціна заявки, що змінили і що плануємо далі. Доступ до акаунта у вас відкритий постійно.
- _[service-tags]_ Telegram · Щомісячний звіт

**5. process** — Етапи запуску · `<section>`

- _[sec-label]_ ЯК МИ ПРАЦЮЄМО
- **H2:** Етапи запуску
- **H3:** Бриф і аудит
- _[process-item-desc]_ Розбираємо послуги, географію, маржу й конкурентів. Якщо акаунт уже є — перевіряємо поточні кампанії.
- _[process-time]_ 1–2 дні
- **H3:** Структура і трекінг
- _[process-item-desc]_ Семантика, структура кампаній, GA4 і конверсії, тексти оголошень — на ваше погодження.
- _[process-time]_ 3–5 днів
- **H3:** Запуск
- _[process-item-desc]_ Вмикаємо кампанії з денними лімітами й перевіряємо, що конверсії записуються коректно.
- _[process-time]_ 1 день
- **H3:** Оптимізація
- _[process-item-desc]_ Чистимо пошукові запити, тестуємо оголошення, перерозподіляємо бюджет на те, що дає заявки.
- _[process-time]_ Щотижня

**6. pricing-cards** — Ціна налаштування і ведення · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна налаштування і ведення
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01 · РАЗОВО
- **H3:** Налаштування — від $300
- _[service-desc]_ Аудит або створення акаунта, семантика, перші кампанії, оголошення, GA4 і конверсії. Підходить, якщо далі ви ведете рекламу самі: акаунт і всі доступи залишаються вашими.
- _[service-num]_ 02 · ЩОМІСЯЦЯ
- **H3:** Ведення — від $200/міс
- _[service-desc]_ Чистка запитів, тести оголошень, коригування ставок і бюджету, щотижневі зведення та щомісячний звіт.
- _[service-num]_ 03 · ЩОМІСЯЦЯ
- **H3:** Великі бюджети та e-commerce — від $500/міс
- _[service-desc]_ Performance Max, Merchant Center, динамічний ремаркетинг, кілька регіонів або мов.
- _[service-num]_ 04 · БЮДЖЕТ
- **H3:** Реклама — від $300/міс
- _[service-desc]_ Рекламний бюджет оплачується окремо, напряму в Google Ads з вашого платіжного профілю. Ціну заявки чи ROAS до запуску не обіцяємо: вони залежать від ніші, конкуренції та сайту. Усі тарифи агенції — на сторінці цін.

**7. portfolio** — Що ми вже зробили · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Що ми вже зробили
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ЛЕНДІНГ + SEO
  - **H3:** Transfer Kharkiv
  - _[service-desc]_ Лендінг трансферної компанії: конверсія 8.4%, 119+ SEO-позицій у топі, заявки 24/7 приймає Telegram-бот. Саме на таку сторінку вигідно вести платний трафік — швидка, з одним зрозумілим сценарієм дії.
  - _[service-tags]_ HTML/CSS/JS · Python-бот · SEO
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ВЛАСНИЙ ІНСТРУМЕНТ
  - **H3:** Ad Tracker by IU
  - _[service-desc]_ Власний дашборд Infinite Union: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить команді 5+ годин на тиждень на звітах. Зараз у розробці.
  - _[service-tags]_ Google Ads · Meta Ads · TikTok Ads

**8. stats** · `<div .results-strip>`

- _[result-val]_ 8.4%
- _[result-label]_ Конверсія лендінгу Transfer Kharkiv
- _[result-val]_ 119+
- _[result-label]_ SEO-позицій у топі Google
- _[result-val]_ 2год
- _[result-label]_ Оновлення даних в Ad Tracker

**9. types** — Оберіть канал під задачу · `<section>`

- _[sec-label]_ ФОРМАТИ
- **H2:** Оберіть канал під задачу
- Картка-посилання → `/services/google-ads-search/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ GOOGLE SEARCH
  - **H3:** Контекстна реклама Google
  - _[service-desc]_ Тільки пошукові кампанії: для послуг і товарів, які вже шукають. Семантика, мінус-слова, відстеження дзвінків.
  - _[service-tags]_ Від $300
- Картка-посилання → `/services/seo/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ОРГАНІКА
  - **H3:** SEO просування сайту
  - _[service-desc]_ Другий канал, який накопичує ефект. Порівняння двох підходів — у статті «Google Ads чи SEO» в нашому блозі.
  - _[service-tags]_ Від $150/міс

**10. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує налаштування Google Ads?
  **A:** Налаштування — від $300 разово, ведення — від $200/міс, для великих бюджетів та e-commerce — від $500/міс. Рекламний бюджет оплачується окремо, рекомендований старт — від $300/міс.
- **Q:** Коли з'являться перші заявки?
  **A:** Пошукові кампанії отримують кліки одразу після модерації оголошень. Перші заявки часто приходять у перші дні, але стабільну ціну заявки видно після 2–4 тижнів збору даних. Конкретну кількість заявок до запуску не гарантуємо.
- **Q:** Чи потрібен сайт для Google Ads?
  **A:** Для пошуку та Performance Max — так: потрібна сторінка, яка швидко завантажується і має зрозумілу форму або кнопку дзвінка. Якщо сайту немає, можемо зробити лендінг — від $600.
- **Q:** Кому належить рекламний акаунт?
  **A:** Вам. Створюємо акаунт на вашу компанію або працюємо у вашому через доступ менеджера. Якщо співпраця завершиться, кампанії, історія та доступи залишаються у вас.
- **Q:** Як ви звітуєте про результати?
  **A:** Щотижня — коротке зведення в Telegram, раз на місяць — звіт: витрати, кліки, заявки, ціна заявки, зміни і план. Доступ до акаунта Google Ads у вас відкритий весь час.
- **Q:** Що обрати на старті: Google Ads чи SEO?
  **A:** Реклама дає трафік з першого дня, поки ви платите за кліки. SEO накопичує ефект, але перші результати — через 3–6 місяців. Докладно — у статті «Google Ads чи SEO».

**11. cta** — Обговоримо вашу рекламу · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ GOOGLE
- **H2:** Обговоримо вашу рекламу
- Напишіть, що рекламуєте і в якому регіоні — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує налаштування Google Ads?**

   Налаштування — від $300 разово, ведення — від $200/міс, для великих бюджетів та e-commerce — від $500/міс. Рекламний бюджет оплачується окремо, рекомендований старт — від $300/міс.

2. **Коли з'являться перші заявки?**

   Пошукові кампанії отримують кліки одразу після модерації оголошень. Перші заявки часто приходять у перші дні, але стабільну ціну заявки видно після 2–4 тижнів збору даних. Конкретну кількість заявок до запуску не гарантуємо.

3. **Чи потрібен сайт для Google Ads?**

   Для пошуку та Performance Max — так: потрібна сторінка, яка швидко завантажується і має зрозумілу форму або кнопку дзвінка. Якщо сайту немає, можемо зробити лендінг — від $600.

4. **Кому належить рекламний акаунт?**

   Вам. Створюємо акаунт на вашу компанію або працюємо у вашому через доступ менеджера. Якщо співпраця завершиться, кампанії, історія та доступи залишаються у вас.

5. **Як ви звітуєте про результати?**

   Щотижня — коротке зведення в Telegram, раз на місяць — звіт: витрати, кліки, заявки, ціна заявки, зміни і план. Доступ до акаунта Google Ads у вас відкритий весь час.

6. **Що обрати на старті: Google Ads чи SEO?**

   Реклама дає трафік з першого дня, поки ви платите за кліки. SEO накопичує ефект, але перші результати — через 3–6 місяців. Докладно — у статті «Google Ads чи SEO».


#### Внутрішні посилання з контенту (6)

- «Обговорити задачу →» → `/services/google-ads/#contact` · блок 1
- «контекстної реклами Google» → `/services/google-ads-search/` · блок 4
- «цін» → `/pricing/` · блок 6
- «лендінг» → `/services/websites-landing/` · блок 10
- ««Google Ads чи SEO»» → `/blog/google-ads-chy-seo/` · блок 10
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/meta-ads/ — Таргет Facebook та Instagram

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/meta-ads/ |
| Мова | uk |
| Пара | en: `/en/services/meta-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (52) | Таргетована реклама Facebook та Instagram — від $250 |
| Description (155) | Таргетована реклама у Facebook та Instagram: Pixel і Conversions API, аудиторії, креативи, ретаргетинг, звіти. Налаштування від $250, ведення від $200/міс. |
| Головний ключ | таргетована реклама |
| Вторинні ключі | таргетована реклама, таргет, налаштування таргетованої реклами, реклама у Facebook. Instagram-інтент → `/services/meta-ads-instagram/` |
| H1 | Таргетована реклама Facebook та Instagram |
| Слів | 851 |
| JSON | `design-content/services__meta-ads.json` |

**Хлібні крихти:** Головна (`/`) › Таргет Facebook та Instagram

#### Блоки (11)

**1. hero** — Таргетована реклама Facebook та Instagram · `<section .hero>`

- _[hm-val]_ від $250
- _[hm-key]_ SETUP
- _[hm-sub]_ Налаштування, разово
- _[hm-val]_ від $200
- _[hm-key]_ MGMT
- _[hm-sub]_ Ведення, на місяць
- _[hm-val]_ від $300
- _[hm-key]_ BUDGET
- _[hm-sub]_ Бюджет на рекламу — окремо
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 01
- _[hero-label]_ META ADS · FACEBOOK · INSTAGRAM
- **H1:** Таргетована реклама Facebook та Instagram
- Infinite Union — агенція з Харкова. Налаштовуємо таргетовану рекламу у Facebook та Instagram для бізнесу в Україні та ЄС: Pixel і Conversions API, аудиторії, креативи, ретаргетинг, зрозумілі звіти. Налаштування від $250, ведення від $200/міс. Обговорити запуск →
- _[hero-stat-num]_ $250+
- _[hero-stat-label]_ налаштування, від
- _[hero-stat-num]_ $200/міс
- _[hero-stat-label]_ ведення, від
- _[hero-stat-num]_ 2
- _[hero-stat-label]_ платформи в одному кабінеті

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ FACEBOOK ADS →INSTAGRAM ADS →REELS →ТАРГЕТИНГ →РЕТАРГЕТИНГ →LOOKALIKE →PIXEL →CONVERSIONS API →FACEBOOK ADS →INSTAGRAM ADS →REELS →ТАРГЕТИНГ →РЕТАРГЕТИНГ →LOOKALIKE →PIXEL →CONVERSIONS API →

**3. problem** — Чому таргет не дає заявок · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Чому таргет не дає заявок
- Таргетована реклама працює інакше, ніж пошук: людина не шукала ваш продукт, вона гортає стрічку. Результат вирішують три речі — кому показуємо, що показуємо і що відбувається після кліку. Кнопка «Просувати» під дописом закриває лише першу частину і зазвичай оптимізує показ під охоплення чи лайки, а не під заявки.
- Друга типова ситуація: реклама працювала, а потім кабінет «осліп». Через блокувальники та обмеження браузерів Pixel бачить лише частину конверсій, і алгоритм Meta навчається на неповних даних. Це виправляється налаштуванням Conversions API та чіткої схеми подій.

**4. included-cards** — Що входить у таргетовану рекламу · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у таргетовану рекламу
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Pixel і Conversions API
- _[service-desc]_ Події «перегляд», «заявка», «покупка», дедуплікація між Pixel і CAPI. Алгоритм бачить реальні конверсії.
- _[service-tags]_ Meta Pixel · CAPI · Events Manager
- _[service-num]_ 02
- **H3:** Аудиторії
- _[service-desc]_ Інтереси, схожі аудиторії (Lookalike) на базі ваших клієнтів, широкий таргет з Advantage+ там, де вже достатньо даних.
- _[service-tags]_ Lookalike · Custom Audiences · Advantage+
- _[service-num]_ 03
- **H3:** Креативи під плейсменти
- _[service-desc]_ Статика, каруселі, короткі відео 9:16 та 1:1, тексти й заголовки. Варіанти банерів швидко готуємо у власному AI-інструменті InfinityCreo.
- _[service-tags]_ Reels · Stories · Стрічка
- _[service-num]_ 04
- **H3:** Ретаргетинг
- _[service-desc]_ Окремі оголошення для тих, хто був на сайті, писав у Direct або дивився ваші відео.
- _[service-tags]_ Сайт · Взаємодії · Відео
- _[service-num]_ 05
- **H3:** Лід-форми і повідомлення
- _[service-desc]_ Instant Forms, Messenger, Direct, WhatsApp. Заявки одразу передаємо в Telegram або CRM, щоб ви відповідали швидко.
- _[service-tags]_ Instant Forms · Direct · Telegram
- _[service-num]_ 06
- **H3:** Звіти
- _[service-desc]_ Щотижневе зведення і щомісячний звіт: витрати, заявки, ціна заявки, які креативи працюють, а які вимикаємо.
- _[service-tags]_ Щотижня · Щомісяця

**5. process** — Етапи запуску · `<section>`

- _[sec-label]_ ЯК МИ ПРАЦЮЄМО
- **H2:** Етапи запуску
- **H3:** Бриф і аудит
- _[process-item-desc]_ Продукт, аудиторія, географія, середній чек. Якщо кабінет уже є — дивимося історію кампаній.
- _[process-time]_ 1–2 дні
- **H3:** Трекінг і аудиторії
- _[process-item-desc]_ Pixel, Conversions API, події, базові та схожі аудиторії.
- _[process-time]_ 2–3 дні
- **H3:** Креативи і запуск
- _[process-item-desc]_ Готуємо 3–5 варіантів креативів, погоджуємо з вами й запускаємо тести.
- _[process-time]_ 3–5 днів
- **H3:** Навчання і масштаб
- _[process-item-desc]_ Перші 1–2 тижні алгоритм навчається. Далі вимикаємо слабке й додаємо бюджет туди, де є заявки.
- _[process-time]_ Щотижня

**6. pricing-cards** — Ціна таргетованої реклами · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна таргетованої реклами
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01 · РАЗОВО
- **H3:** Налаштування — від $250
- _[service-desc]_ Business Manager, Pixel і CAPI, аудиторії, перша кампанія з креативами. Кабінет і доступи — ваші.
- _[service-num]_ 02 · ЩОМІСЯЦЯ
- **H3:** Ведення — від $200/міс
- _[service-desc]_ Тести креативів і аудиторій, оптимізація бюджету, ретаргетинг, щотижневі зведення і щомісячний звіт.
- _[service-num]_ 03 · ЩОМІСЯЦЯ
- **H3:** E-commerce — від $400/міс
- _[service-desc]_ Каталог товарів, динамічні оголошення, Advantage+ для магазинів, окремі кампанії під категорії.
- _[service-num]_ 04 · БЮДЖЕТ
- **H3:** Реклама — від $300/міс
- _[service-desc]_ Рекламний бюджет оплачується окремо, напряму в Meta з вашої картки. ROAS і ціну заявки до запуску не обіцяємо. Усі ціни агенції — на сторінці тарифів.

**7. portfolio** — Інструменти, які ми створили · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Інструменти, які ми створили
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ВЛАСНИЙ ІНСТРУМЕНТ
  - **H3:** Ad Tracker by IU
  - _[service-desc]_ Власний дашборд Infinite Union: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить команді 5+ годин на тиждень на звітах. Зараз у розробці.
  - _[service-tags]_ Meta Ads · Google Ads · TikTok Ads
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ AI-КРЕАТИВИ
  - **H3:** InfinityCreo
  - _[service-desc]_ Telegram-бот на n8n, що генерує рекламні креативи: від брифу до банера приблизно за 3 хвилини, 10+ форматів. Використовуємо, щоб швидше тестувати гіпотези.
  - _[service-tags]_ n8n · AI · 10+ форматів

**8. stats** · `<div .results-strip>`

- _[result-val]_ 2год
- _[result-label]_ Автооновлення даних в Ad Tracker
- _[result-val]_ 90днів
- _[result-label]_ Історії кампаній в одному вікні
- _[result-val]_ ~3хв
- _[result-label]_ Від брифу до банера в InfinityCreo

**9. types** — Окремі напрями · `<section>`

- _[sec-label]_ ФОРМАТИ
- **H2:** Окремі напрями
- Картка-посилання → `/services/meta-ads-instagram/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ INSTAGRAM
  - **H3:** Реклама в Instagram
  - _[service-desc]_ Reels, Stories і стрічка: креативи під кожен формат, заявки в Direct або на сайт.
  - _[service-tags]_ Від $250
- Картка-посилання → `/services/tiktok-ads/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ TIKTOK
  - **H3:** Реклама в TikTok
  - _[service-desc]_ Якщо ваша аудиторія молодша і живе у вертикальному відео — In-Feed і Spark Ads.
  - _[service-tags]_ Від $250
- Картка-посилання → `/services/google-ads/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ GOOGLE
  - **H3:** Налаштування Google Ads
  - _[service-desc]_ Коли ваш продукт уже шукають — пошукова реклама приводить людей з готовим наміром.
  - _[service-tags]_ Від $300
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ БЛОГ
  - **H3:** Google Ads чи SEO
  - _[service-desc]_ Як обрати перший канал залучення клієнтів і коли їх варто поєднувати.
  - _[service-tags]_ Стаття

**10. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує таргетована реклама?
  **A:** Налаштування — від $250 разово, ведення — від $200/міс, для e-commerce — від $400/міс. Рекламний бюджет — окремо, рекомендуємо від $300/міс, щоб алгоритм Meta мав достатньо даних для навчання.
- **Q:** Що обрати: Facebook чи Instagram?
  **A:** Залежить від аудиторії та продукту. Зазвичай запускаємо кампанії в одному кабінеті Meta на обидві платформи і розподіляємо бюджет за результатами. Про особливості Instagram — на сторінці реклами в Instagram.
- **Q:** Хто робить креативи?
  **A:** Статичні банери, каруселі та тексти готуємо в межах ведення. Зйомку відео або UGC-контент — окремо, або працюємо з вашими матеріалами.
- **Q:** Навіщо Conversions API, якщо є Pixel?
  **A:** Pixel працює в браузері і втрачає частину подій через блокувальники. Conversions API передає події з сервера — Meta бачить більше реальних заявок і краще оптимізує показ.
- **Q:** Коли буде результат?
  **A:** Перші 1–2 тижні кампанії проходять навчання, ціна заявки в цей час нестабільна. Висновки робимо після накопичення даних. Конкретний ROAS чи кількість заявок заздалегідь не обіцяємо.
- **Q:** Кабінет і сторінки залишаться моїми?
  **A:** Так. Працюємо у вашому Business Manager або створюємо його на вашу компанію. Pixel, аудиторії та історія кампаній належать вам.

**11. cta** — Запустимо таргет правильно · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ ADS
- **H2:** Запустимо таргет правильно
- Розкажіть про продукт і аудиторію — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує таргетована реклама?**

   Налаштування — від $250 разово, ведення — від $200/міс, для e-commerce — від $400/міс. Рекламний бюджет — окремо, рекомендуємо від $300/міс, щоб алгоритм Meta мав достатньо даних для навчання.

2. **Що обрати: Facebook чи Instagram?**

   Залежить від аудиторії та продукту. Зазвичай запускаємо кампанії в одному кабінеті Meta на обидві платформи і розподіляємо бюджет за результатами. Про особливості Instagram — на сторінці реклами в Instagram.

3. **Хто робить креативи?**

   Статичні банери, каруселі та тексти готуємо в межах ведення. Зйомку відео або UGC-контент — окремо, або працюємо з вашими матеріалами.

4. **Навіщо Conversions API, якщо є Pixel?**

   Pixel працює в браузері і втрачає частину подій через блокувальники. Conversions API передає події з сервера — Meta бачить більше реальних заявок і краще оптимізує показ.

5. **Коли буде результат?**

   Перші 1–2 тижні кампанії проходять навчання, ціна заявки в цей час нестабільна. Висновки робимо після накопичення даних. Конкретний ROAS чи кількість заявок заздалегідь не обіцяємо.

6. **Кабінет і сторінки залишаться моїми?**

   Так. Працюємо у вашому Business Manager або створюємо його на вашу компанію. Pixel, аудиторії та історія кампаній належать вам.


#### Внутрішні посилання з контенту (4)

- «Обговорити запуск →» → `/services/meta-ads/#contact` · блок 1
- «тарифів» → `/pricing/` · блок 6
- «реклами в Instagram» → `/services/meta-ads-instagram/` · блок 10
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/tiktok-ads/ — TikTok Ads

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/tiktok-ads/ |
| Мова | uk |
| Пара | en: `/en/services/tiktok-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (46) | Реклама в TikTok для бізнесу — запуск від $250 |
| Description (148) | Реклама в TikTok: In-Feed, Spark Ads, TikTok Pixel, UGC-креативи під формат платформи. Налаштування від $250, ведення від $150/міс, бюджет від $200. |
| Головний ключ | реклама в TikTok |
| H1 | Реклама в TikTok |
| Слів | 799 |
| JSON | `design-content/services__tiktok-ads.json` |

**Хлібні крихти:** Головна (`/`) › TikTok Ads

#### Блоки (10)

**1. hero** — Реклама в TikTok · `<section .hero>`

- _[hm-val]_ від $250
- _[hm-key]_ SETUP
- _[hm-sub]_ Налаштування, разово
- _[hm-val]_ від $150
- _[hm-key]_ MGMT
- _[hm-sub]_ Ведення, на місяць
- _[hm-val]_ від $200
- _[hm-key]_ BUDGET
- _[hm-sub]_ Мінімальний бюджет — окремо
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 04
- _[hero-label]_ TIKTOK ADS · SPARK ADS · UGC
- **H1:** Реклама в TikTok
- Infinite Union налаштовує рекламу в TikTok для брендів, онлайн-магазинів і сервісів, чия аудиторія дивиться вертикальне відео. In-Feed і Spark Ads, TikTok Pixel, креативи у стилі платформи. Налаштування від $250, ведення від $150/міс, бюджет від $200/міс — окремо. Обговорити запуск →
- _[hero-stat-num]_ $250+
- _[hero-stat-label]_ налаштування, від
- _[hero-stat-num]_ $150/міс
- _[hero-stat-label]_ ведення, від
- _[hero-stat-num]_ 9:16
- _[hero-stat-label]_ формат усіх креативів

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ TIKTOK ADS →IN-FEED ADS →TOPVIEW →UGC ВІДЕО →SPARK ADS →TIKTOK PIXEL →CREATOR MARKETPLACE →VIRAL CONTENT →TIKTOK ADS →IN-FEED ADS →TOPVIEW →UGC ВІДЕО →SPARK ADS →TIKTOK PIXEL →CREATOR MARKETPLACE →VIRAL CONTENT →

**3. problem** — TikTok не пробачає «рекламного» вигляду · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** TikTok не пробачає «рекламного» вигляду
- Реклама в TikTok провалюється з однієї причини частіше за інші: туди заливають банер або ролик, зроблений для телевізора чи Facebook. Користувач гортає далі за секунду, а ви платите за покази, які ніхто не подивився.
- Працюють ролики, які виглядають як звичайний контент: обличчя в кадрі, сильний перший кадр, субтитри, живий звук. Тому реклама в TikTok — це передусім сценарії та тест кількох креативів, а вже потім налаштування аудиторій і ставок.

**4. included-cards** — Що входить у рекламу в TikTok · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у рекламу в TikTok
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** TikTok Pixel і події
- _[service-desc]_ Встановлюємо Pixel на сайт, налаштовуємо події заявки чи покупки, щоб алгоритм оптимізував показ під результат.
- _[service-tags]_ TikTok Pixel · Events
- _[service-num]_ 02
- **H3:** In-Feed Ads
- _[service-desc]_ Ролики у стрічці «Для вас» з кнопкою переходу на сайт, у профіль або на лід-форму.
- _[service-tags]_ In-Feed · Лід-форми
- _[service-num]_ 03
- **H3:** Spark Ads
- _[service-desc]_ Просуваємо органічні відео вашого акаунта або авторів (з їхнього дозволу). Лайки й коментарі залишаються на оригінальному відео.
- _[service-tags]_ Spark Ads · Автори
- _[service-num]_ 04
- **H3:** Сценарії креативів
- _[service-desc]_ Пишемо короткі сценарії під формат: перший кадр, текст на екрані, заклик до дії. Знімаєте ви або автори — ми даємо структуру і монтаж-ТЗ.
- _[service-tags]_ UGC · Сценарії · 9:16
- _[service-num]_ 05
- **H3:** Аудиторії
- _[service-desc]_ Інтереси, поведінка, схожі аудиторії та ретаргетинг на тих, хто дивився ролики чи заходив на сайт.
- _[service-tags]_ Interest · Lookalike · Retargeting
- _[service-num]_ 06
- **H3:** Звіти
- _[service-desc]_ Щотижневе зведення та щомісячний звіт: витрати, перегляди, переходи, заявки — і які ролики варто перезняти.
- _[service-tags]_ Щотижня · Щомісяця

**5. process** — Етапи запуску · `<section>`

- _[sec-label]_ ЯК МИ ПРАЦЮЄМО
- **H2:** Етапи запуску
- **H3:** Бриф
- _[process-item-desc]_ Продукт, аудиторія, наявний відеоконтент, ціль кампанії: продажі, заявки чи підписники.
- _[process-time]_ 1–2 дні
- **H3:** Pixel і сценарії
- _[process-item-desc]_ TikTok Ads Manager, Pixel, події, 3–5 сценаріїв для перших тестів.
- _[process-time]_ 2–3 дні
- **H3:** Зйомка і запуск
- _[process-item-desc]_ Ви знімаєте за сценаріями, ми монтуємо ТЗ і запускаємо кілька креативів паралельно.
- _[process-time]_ Залежить від зйомки
- **H3:** Тести і оновлення
- _[process-item-desc]_ Креативи в TikTok «вигорають» швидше, ніж деінде, тому регулярно оновлюємо ролики.
- _[process-time]_ Щотижня

**6. pricing-cards** — Ціна реклами в TikTok · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна реклами в TikTok
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01 · РАЗОВО
- **H3:** Налаштування — від $250
- _[service-desc]_ Рекламний кабінет, Pixel і події, аудиторії, сценарії та перша кампанія з кількома креативами.
- _[service-num]_ 02 · ЩОМІСЯЦЯ
- **H3:** Ведення — від $150/міс
- _[service-desc]_ Тести креативів і аудиторій, Spark Ads, оптимізація бюджету, щотижневі зведення і щомісячний звіт.
- _[service-num]_ 03 · БЮДЖЕТ
- **H3:** Реклама — від $200/міс
- _[service-desc]_ Рекламний бюджет оплачується окремо, напряму в TikTok. Менший бюджет алгоритм не встигає ефективно використати.
- _[service-num]_ 04 · НЕ ВХОДИТЬ
- **H3:** Що оплачується окремо
- _[service-desc]_ Зйомка відео, гонорари авторів і рекламний бюджет. Кількість переглядів чи продажів заздалегідь не обіцяємо. Усі ціни агенції — на сторінці тарифів.

**7. portfolio** — Наші інструменти · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Наші інструменти
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ВЛАСНИЙ ІНСТРУМЕНТ
  - **H3:** Ad Tracker by IU
  - _[service-desc]_ Власний дашборд Infinite Union: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить команді 5+ годин на тиждень на звітах. Зараз у розробці.
  - _[service-tags]_ TikTok Ads · Meta Ads · Google Ads
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ AI-КРЕАТИВИ
  - **H3:** InfinityCreo
  - _[service-desc]_ Бот на n8n для генерації рекламних креативів: від брифу до банера приблизно за 3 хвилини, 10+ форматів.
  - _[service-tags]_ n8n · AI

**8. related-services** — Поєднайте TikTok з іншими каналами · `<section>`

- _[sec-label]_ ІНШІ КАНАЛИ
- **H2:** Поєднайте TikTok з іншими каналами
- Картка-посилання → `/services/meta-ads/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ META
  - **H3:** Таргетована реклама Facebook та Instagram
  - _[service-desc]_ Ті самі відео можна використати в Reels — часто це найшвидший спосіб перевірити креатив на двох платформах.
  - _[service-tags]_ Від $250
- Картка-посилання → `/services/meta-ads-instagram/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ INSTAGRAM
  - **H3:** Реклама в Instagram
  - _[service-desc]_ Reels, Stories і стрічка, заявки в Direct.
  - _[service-tags]_ Від $250

**9. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує реклама в TikTok?
  **A:** Налаштування — від $250 разово, ведення — від $150/міс. Рекламний бюджет оплачується окремо, мінімум — від $200/міс.
- **Q:** Чи потрібен акаунт у TikTok і власні відео?
  **A:** Для In-Feed реклами достатньо рекламного кабінету, але з активним акаунтом і органічними відео можна запускати Spark Ads — вони зазвичай виглядають природніше. Відео знімаєте ви або автори, сценарії готуємо ми.
- **Q:** Що таке Spark Ads?
  **A:** Це формат, коли рекламою стає вже опубліковане відео — ваше або автора, який дав дозвіл. Реакції й підписки залишаються на оригінальному акаунті.
- **Q:** Чому бюджет від $200/міс?
  **A:** TikTok має мінімальні денні ліміти для кампаній і груп оголошень, а алгоритму потрібні дані для навчання. З меншим бюджетом тест кількох креативів просто не набирає статистики.
- **Q:** Кому підходить реклама в TikTok?
  **A:** Брендам і магазинам з візуальним продуктом, сервісам для молодшої аудиторії, закладам, які можна показати у відео. Якщо ваш продукт активно шукають у Google, почніть з Google Ads — про вибір між пошуковими каналами є стаття «Google Ads чи SEO».
- **Q:** Як ви звітуєте?
  **A:** Щотижня — коротке зведення, раз на місяць — звіт із витратами, переглядами, переходами й заявками. Дані з TikTok, Meta і Google збираємо в Ad Tracker — нашому дашборді, який зараз у розробці.

**10. cta** — Запустимо рекламу в TikTok · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ TIKTOK
- **H2:** Запустимо рекламу в TikTok
- Надішліть посилання на продукт або профіль — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує реклама в TikTok?**

   Налаштування — від $250 разово, ведення — від $150/міс. Рекламний бюджет оплачується окремо, мінімум — від $200/міс.

2. **Чи потрібен акаунт у TikTok і власні відео?**

   Для In-Feed реклами достатньо рекламного кабінету, але з активним акаунтом і органічними відео можна запускати Spark Ads — вони зазвичай виглядають природніше. Відео знімаєте ви або автори, сценарії готуємо ми.

3. **Що таке Spark Ads?**

   Це формат, коли рекламою стає вже опубліковане відео — ваше або автора, який дав дозвіл. Реакції й підписки залишаються на оригінальному акаунті.

4. **Чому бюджет від $200/міс?**

   TikTok має мінімальні денні ліміти для кампаній і груп оголошень, а алгоритму потрібні дані для навчання. З меншим бюджетом тест кількох креативів просто не набирає статистики.

5. **Кому підходить реклама в TikTok?**

   Брендам і магазинам з візуальним продуктом, сервісам для молодшої аудиторії, закладам, які можна показати у відео. Якщо ваш продукт активно шукають у Google, почніть з Google Ads — про вибір між пошуковими каналами є стаття «Google Ads чи SEO».

6. **Як ви звітуєте?**

   Щотижня — коротке зведення, раз на місяць — звіт із витратами, переглядами, переходами й заявками. Дані з TikTok, Meta і Google збираємо в Ad Tracker — нашому дашборді, який зараз у розробці.


#### Внутрішні посилання з контенту (5)

- «Обговорити запуск →» → `/services/tiktok-ads/#contact` · блок 1
- «тарифів» → `/pricing/` · блок 6
- «Google Ads» → `/services/google-ads/` · блок 9
- ««Google Ads чи SEO»» → `/blog/google-ads-chy-seo/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/seo/ — SEO просування

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/seo/ |
| Мова | uk |
| Пара | en: `/en/services/seo/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (44) | SEO просування сайту в Google — від $150/міс |
| Description (149) | SEO просування сайту: технічний аудит, семантичне ядро, структура, тексти, посилання, щомісячні звіти. Від $150/міс, перші результати за 3–6 місяців. |
| Головний ключ | SEO просування сайту |
| Вторинні ключі | SEO просування, просування сайту в Google, розкрутка сайту. Аудит → `/services/seo-audit/` (комерційний) vs `/blog/seo-audit-shcho-tse/` (інформаційний «що таке»). Локальне → `/services/seo-local/` |
| H1 | SEO просування сайту |
| Слів | 797 |
| JSON | `design-content/services__seo.json` |

**Хлібні крихти:** Головна (`/`) › SEO просування

#### Блоки (11)

**1. hero** — SEO просування сайту · `<section .hero>`

- _[hm-val]_ від $150
- _[hm-key]_ SEO
- _[hm-sub]_ Просування, на місяць
- _[hm-val]_ від $100
- _[hm-key]_ AUDIT
- _[hm-sub]_ SEO аудит, разово
- _[hm-val]_ 3–6 міс
- _[hm-key]_ TIME
- _[hm-sub]_ До перших результатів
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 03
- _[hero-label]_ SEO · GOOGLE · ХАРКІВ · УКРАЇНА / ЄС
- **H1:** SEO просування сайту
- Infinite Union — веб-студія з Харкова. SEO просування сайту в Google для бізнесу в Україні та ЄС: технічний аудит, семантика, структура, тексти, посилання й щомісячні звіти. Від $150/міс, перші результати — через 3–6 місяців. Обговорити сайт →
- _[hero-stat-num]_ $150/міс
- _[hero-stat-label]_ просування, від
- _[hero-stat-num]_ 3–6міс
- _[hero-stat-label]_ до перших результатів
- _[hero-stat-num]_ 119+
- _[hero-stat-label]_ позицій у топі Transfer Kharkiv

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ ТЕХНІЧНЕ SEO →СЕМАНТИЧНЕ ЯДРО →КОНТЕНТ →ПОСИЛАННЯ →CORE WEB VITALS →SCHEMA.ORG →LOCAL SEO →E-E-A-T →ТЕХНІЧНЕ SEO →СЕМАНТИЧНЕ ЯДРО →КОНТЕНТ →ПОСИЛАННЯ →CORE WEB VITALS →SCHEMA.ORG →LOCAL SEO →E-E-A-T →

**3. problem** — Сайт є, а з Google — тиша · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Сайт є, а з Google — тиша
- Типова ситуація: сайт зробили, він гарний, але в Google його знаходять тільки за назвою компанії. Причини зазвичай технічні й структурні: сторінки не в індексі, під кожну послугу немає окремої сторінки, тексти написані «про нас», а не під запити клієнтів.
- SEO просування сайту — це не разова «оптимізація», а щомісячна робота: виправити технічну базу, зібрати семантику, розширити структуру, оновлювати тексти й нарощувати згадки про сайт. Ефект накопичується повільно, зате не зникає, щойно ви перестаєте платити за кліки.

**4. included-cards** — Що входить у SEO просування сайту · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у SEO просування сайту
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Технічний аудит
- _[service-desc]_ Індексація, швидкість, Core Web Vitals, дублікати, редиректи, мікророзмітка. Окремою послугою — SEO аудит сайту.
- _[service-tags]_ Search Console · Core Web Vitals
- _[service-num]_ 02
- **H3:** Семантичне ядро
- _[service-desc]_ Збираємо запити, за якими вас шукають клієнти, і групуємо їх за сторінками. Без цього тексти пишуться навмання.
- _[service-tags]_ Кластеризація · Інтент
- _[service-num]_ 03
- **H3:** Структура і посадкові сторінки
- _[service-desc]_ Окрема сторінка під кожну послугу, категорію чи місто. Логічні внутрішні посилання між ними.
- _[service-tags]_ Структура · Перелінковка
- _[service-num]_ 04
- **H3:** Тексти й мета-теги
- _[service-desc]_ Оновлюємо або пишемо тексти під запити: title, description, заголовки, FAQ. Пишемо для людей, а не для щільності ключів.
- _[service-tags]_ Контент · Title · FAQ
- _[service-num]_ 05
- **H3:** Посилання і згадки
- _[service-desc]_ Тематичні каталоги, профілі компанії, партнерські публікації. Без масових бірж і спаму, через які сайт може отримати санкції.
- _[service-tags]_ Каталоги · Публікації
- _[service-num]_ 06
- **H3:** Локальне SEO
- _[service-desc]_ Якщо у вас є адреса чи зона обслуговування — профіль Google Business і Google Maps. Детально — на сторінці локального SEO.
- _[service-tags]_ Google Maps · GBP

**5. process** — Етапи просування · `<section>`

- _[sec-label]_ ЯК МИ ПРАЦЮЄМО
- **H2:** Етапи просування
- **H3:** Аудит
- _[process-item-desc]_ Технічний аудит і аналіз конкурентів у видачі. Отримуєте список задач з пріоритетами.
- _[process-time]_ 3–5 днів
- **H3:** Стратегія
- _[process-item-desc]_ Семантика, структура сторінок і план робіт на перші місяці.
- _[process-time]_ 1–2 тижні
- **H3:** Впровадження
- _[process-item-desc]_ Технічні виправлення, нові сторінки, тексти, посилання — за планом.
- _[process-time]_ Щомісяця
- **H3:** Звіт і корекція
- _[process-item-desc]_ Видимість, трафік із Google, заявки, виконані задачі й план на наступний місяць.

**6. pricing-cards** — Ціна SEO просування · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна SEO просування
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01 · РАЗОВО
- **H3:** SEO аудит — від $100
- _[service-desc]_ Базовий — від $100 (до 50 сторінок, 3 дні), повний — від $300 (5 днів). Звіт з пріоритетами виправлень.
- _[service-num]_ 02 · ЩОМІСЯЦЯ
- **H3:** SEO просування — від $150/міс
- _[service-desc]_ Технічна база, семантика, сторінки, тексти, посилання, щомісячний звіт. Перші результати — через 3–6 місяців.
- _[service-num]_ 03 · GOOGLE MAPS
- **H3:** Локальне SEO — від $200
- _[service-desc]_ Старт від $200 разово, ведення Local Pro — від $150/міс, мережа філій — від $400/міс.
- _[service-num]_ 04 · ЧЕСНО
- **H3:** Що ми не обіцяємо
- _[service-desc]_ Гарантованих позицій у Google не дає ніхто — алгоритм нам не належить. Ми обіцяємо зрозумілий план, виконані задачі й прозорі звіти. Усі ціни — на сторінці тарифів.

**7. portfolio** — Приклад з портфоліо · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Приклад з портфоліо
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ЛЕНДІНГ + SEO
  - **H3:** Transfer Kharkiv
  - _[service-desc]_ Лендінг трансферної компанії на статичному HTML/CSS/JS з SEO-оптимізацією: 119+ позицій у топі Google, конверсія 8.4%, заявки 24/7 приймає Telegram-бот.
  - _[service-tags]_ SEO · HTML/CSS/JS · Python-бот
- Картка-посилання → `/portfolio/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ ПОРТФОЛІО
  - **H3:** Інші проєкти
  - _[service-desc]_ Сайти, Telegram-боти та екосистеми, які ми зробили для бізнесу в Харкові та Україні.
  - _[service-tags]_ Усі кейси →

**8. stats** · `<div .results-strip>`

- _[result-val]_ 119+
- _[result-label]_ SEO-позицій у топі Transfer Kharkiv
- _[result-val]_ 8.4%
- _[result-label]_ Конверсія лендінгу
- _[result-val]_ 24/7
- _[result-label]_ Прийом заявок Telegram-ботом

**9. related-services** — Почніть з того, що потрібно саме вам · `<section>`

- _[sec-label]_ НАПРЯМИ SEO
- **H2:** Почніть з того, що потрібно саме вам
- Картка-посилання → `/services/seo-audit/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ АУДИТ
  - **H3:** SEO аудит сайту
  - _[service-desc]_ Технічна перевірка і план виправлень. Від $100, 3–5 днів.
  - _[service-tags]_ Від $100
- Картка-посилання → `/services/seo-local/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ GOOGLE MAPS
  - **H3:** Локальне SEO
  - _[service-desc]_ Профіль Google Business, карта, відгуки, локальні сторінки.
  - _[service-tags]_ Від $200
- Картка-посилання → `/blog/seo-audit-shcho-tse/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ БЛОГ
  - **H3:** Що таке SEO аудит
  - _[service-desc]_ Простими словами: з чого складається аудит і коли він потрібен.
  - _[service-tags]_ Стаття
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[декор, aria-hidden]_ ↗
  - _[service-num]_ БЛОГ
  - **H3:** Google Ads чи SEO
  - _[service-desc]_ Порівнюємо швидкість, вартість і довгостроковий ефект двох каналів.
  - _[service-tags]_ Стаття

**10. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує SEO просування сайту?
  **A:** Від $150/міс. Ціна залежить від кількості сторінок, конкуренції в ніші та обсягу контенту. Перед стартом радимо аудит — від $100.
- **Q:** Коли будуть результати?
  **A:** Перші результати — зазвичай через 3–6 місяців. Технічні виправлення Google враховує швидше, а зростання видимості за конкурентними запитами потребує часу.
- **Q:** Ви гарантуєте топ-3 або топ-10?
  **A:** Ні. Гарантувати позиції не може жодна агенція: алгоритм Google нам не належить. Ми гарантуємо виконання погодженого плану робіт і прозорі щомісячні звіти.
- **Q:** Що ви робите щомісяця?
  **A:** Виправляємо технічні помилки, створюємо або оновлюємо сторінки й тексти, працюємо з посиланнями, стежимо за індексацією. Наприкінці місяця — звіт: що зроблено, як змінились видимість і трафік, що далі.
- **Q:** Чи треба переробляти сайт?
  **A:** Не обов'язково. Спочатку робимо аудит. Якщо сайт технічно слабкий і дешевше зробити новий, скажемо про це прямо — ми також розробляємо сайти.
- **Q:** Можна поєднати SEO і рекламу?
  **A:** Так, і часто це найкращий варіант: Google Ads дає заявки зараз, поки SEO набирає обертів. Порівняння каналів — у статті «Google Ads чи SEO».

**11. cta** — Розберемо ваш сайт · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ SEO
- **H2:** Розберемо ваш сайт
- Надішліть адресу сайту — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує SEO просування сайту?**

   Від $150/міс. Ціна залежить від кількості сторінок, конкуренції в ніші та обсягу контенту. Перед стартом радимо аудит — від $100.

2. **Коли будуть результати?**

   Перші результати — зазвичай через 3–6 місяців. Технічні виправлення Google враховує швидше, а зростання видимості за конкурентними запитами потребує часу.

3. **Ви гарантуєте топ-3 або топ-10?**

   Ні. Гарантувати позиції не може жодна агенція: алгоритм Google нам не належить. Ми гарантуємо виконання погодженого плану робіт і прозорі щомісячні звіти.

4. **Що ви робите щомісяця?**

   Виправляємо технічні помилки, створюємо або оновлюємо сторінки й тексти, працюємо з посиланнями, стежимо за індексацією. Наприкінці місяця — звіт: що зроблено, як змінились видимість і трафік, що далі.

5. **Чи треба переробляти сайт?**

   Не обов'язково. Спочатку робимо аудит. Якщо сайт технічно слабкий і дешевше зробити новий, скажемо про це прямо — ми також розробляємо сайти.

6. **Можна поєднати SEO і рекламу?**

   Так, і часто це найкращий варіант: Google Ads дає заявки зараз, поки SEO набирає обертів. Порівняння каналів — у статті «Google Ads чи SEO».


#### Внутрішні посилання з контенту (8)

- «Обговорити сайт →» → `/services/seo/#contact` · блок 1
- «SEO аудит сайту» → `/services/seo-audit/` · блок 4
- «локального SEO» → `/services/seo-local/` · блок 4
- «тарифів» → `/pricing/` · блок 6
- «розробляємо сайти» → `/services/websites/` · блок 10
- «Google Ads» → `/services/google-ads/` · блок 10
- ««Google Ads чи SEO»» → `/blog/google-ads-chy-seo/` · блок 10
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /en/services/websites/ — Website development

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/websites/ |
| Мова | en |
| Пара | uk: `/services/websites/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (59) | Website Development in Ukraine — from $600 \| Infinite Union |
| Description (149) | Custom website development from a Ukrainian agency: landing pages, corporate sites, online stores. Unique design, SEO-ready code, you own everything. |
| Головний ключ | website development Ukraine |
| Вторинні ключі | website development Ukraine, web development company Ukraine, hire Ukrainian web developers. `/en/pricing/`: custom website development cost, how much does a website cost, website price Ukraine |
| H1 | Website development in Ukraine. |
| Слів | 1169 |
| JSON | `design-content/en__services__websites.json` |

**Хлібні крихти:** Home (`/en/`) › Website development

#### Блоки (9)

**1. hero** — Website development in Ukraine. · `<section .hero>`

- _[hero-label]_ SERVICE 01 · WEBSITE DEVELOPMENT
- **H1:** Website development in Ukraine.
- Infinite Union is a web studio based in Kharkiv, Ukraine, working with small businesses at home and across the EU. We design and build landing pages, corporate websites and online stores: custom design, SEO-ready code, launch in 10 days to 5 weeks. Landing pages from $600. Get a quote.
- _[hero-stat-num]_ $600
- _[hero-stat-label]_ LANDING PAGES FROM
- _[hero-stat-num]_ $1,000
- _[hero-stat-label]_ CORPORATE SITES FROM
- _[hero-stat-num]_ $1,200
- _[hero-stat-label]_ ONLINE STORES FROM
- _[hero-stat-num]_ 15 min
- _[hero-stat-label]_ REPLY TIME, BUSINESS HOURS
- _[flagship-tag]_ FLAGSHIP PROJECT
- _[flagship-name]_ Transfer Kharkiv
- _[flagship-url]_ transferkharkiv.com.ua
- _[fm-val]_ 8.4%
- _[fm-key]_ Landing page conversion
- _[fm-val]_ 119+
- _[fm-key]_ Search positions in the top
- _[fm-val]_ 24/7
- _[fm-key]_ Bookings via Telegram bot

**2. problem** — Why most small business sites underperform · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** Why most small business sites underperform
- A template site looks fine on the day it goes live. Then the problems show up: it loads slowly on mobile, Google indexes half the pages, the contact form sends enquiries to an inbox nobody checks, and every small change needs the original freelancer, who no longer replies.
- We fix that at the source. Every website we build has a clear structure planned around what your customers search for, fast hand-written code, and a lead form connected to Telegram or your CRM, so enquiries reach a person within minutes.
- When the project is done, the source code, domain, hosting and analytics accounts are yours. You can keep working with us or hand the site to any other team.
- _[cred-val]_ 10 days
- _[cred-label]_ Landing page from brief to launch
- _[cred-val]_ 1 month
- _[cred-label]_ Support included after launch
- _[cred-val]_ 2 stages
- _[cred-label]_ Payment split into stages
- _[cred-val]_ 100%
- _[cred-label]_ Source code handed over

**3. included-cards** — What every website project includes · `<section .what>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What every website project includes
- _[what-num]_ 01
- **H3:** Structure and copy plan
- _[what-desc]_ We look at your competitors and the search terms your customers use, then plan the pages and sections around them. You approve the structure before design starts.
- _[what-tags]_ Competitor review · Keyword map · Sitemap
- _[what-num]_ 02
- **H3:** Custom design
- _[what-desc]_ A design made for your brand, not a purchased theme. Mobile layouts are designed first, because that is where most of your visitors arrive.
- _[what-tags]_ Figma · Mobile-first · Brand styling
- _[what-num]_ 03
- **H3:** Fast, clean front end
- _[what-desc]_ Semantic HTML, light pages and animations that do not slow the site down. We build with plain HTML/CSS/JS or Next.js and React, depending on what the project needs.
- _[what-tags]_ HTML/CSS/JS · Next.js · Core Web Vitals
- _[what-num]_ 04
- **H3:** SEO basics and lead delivery
- _[what-desc]_ Meta tags, schema markup, sitemap, robots.txt and analytics are set up before launch. Form enquiries go straight to Telegram or your CRM.
- _[what-tags]_ On-page SEO · Schema.org · Telegram / CRM

**4. pricing-tiers** — Website types and prices · `<section>`

- _[sec-label]_ PRICING
- **H2:** Website types and prices
- **H3:** Landing page
- _[level-price]_ from $600
- _[level-price-note]_ One page built to get enquiries
- Список:
  - Start from $600: 5–7 sections, up to 10 days
  - Pro from $1,200: 10+ sections, up to 3 weeks
  - Max from $2,000: extended scope and integrations
  - Good for a single service, offer or ad campaign
- Посилання/кнопка: «DISCUSS A LANDING PAGE» → `/en/services/websites/#contact`
- _[level-badge]_ MOST REQUESTED
- **H3:** Corporate website
- _[level-price]_ from $1,000
- _[level-price-note]_ Multi-page site for a company
- Список:
  - Business from $1,000: 5–8 pages, about 3 weeks
  - Pro from $2,000: 10–20 pages, 4–5 weeks
  - Enterprise from $4,000: 50+ pages
  - Services, team, case studies, blog, multilingual
- Посилання/кнопка: «DISCUSS A COMPANY SITE» → `/en/services/websites/#contact`
- **H3:** Online store
- _[level-price]_ from $1,200
- _[level-price-note]_ Catalogue, cart and payments
- Список:
  - Start from $1,200: up to 100 products, about 3 weeks
  - Pro from $2,500: unlimited products, about 5 weeks
  - Marketplace from $5,000: multiple sellers
  - Payments, delivery and order notifications
- Посилання/кнопка: «DISCUSS A STORE» → `/en/services/websites/#contact`
- Every price includes custom design, responsive layout, basic SEO setup, a basic Telegram or CRM integration and one month of support. Hosting and domain are paid separately. Support after the first month starts at $150/month. Compare all packages on the pricing page. If you need user accounts, dashboards or billing, that is a web platform: see SaaS development. Need the site, a bot and a CRM working together? See business automation.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Landing page | from $600 · One page built to get enquiries | Start from $600: 5–7 sections, up to 10 days | Start from $600: 5–7 sections, up to 10 days; Pro from $1,200: 10+ sections, up to 3 weeks; Max from $2,000: extended scope and integrations; Good for a single service, offer or ad campaign |
| Corporate website _(MOST REQUESTED)_ | from $1,000 · Multi-page site for a company | Business from $1,000: 5–8 pages, about 3 weeks | Business from $1,000: 5–8 pages, about 3 weeks; Pro from $2,000: 10–20 pages, 4–5 weeks; Enterprise from $4,000: 50+ pages; Services, team, case studies, blog, multilingual |
| Online store | from $1,200 · Catalogue, cart and payments | Start from $1,200: up to 100 products, about 3 weeks | Start from $1,200: up to 100 products, about 3 weeks; Pro from $2,500: unlimited products, about 5 weeks; Marketplace from $5,000: multiple sellers; Payments, delivery and order notifications |

**5. process** — From brief to launch · `<section .process>`

- _[sec-label]_ HOW WE WORK
- **H2:** From brief to launch
- _[process-dot]_ 01
- **H3:** Brief
- _[process-step-desc]_ Goals, audience, competitors and a fixed quote
- _[process-time]_ 1–2 days
- _[process-dot]_ 02
- **H3:** Prototype
- _[process-step-desc]_ Page structure and key screens for your approval
- _[process-time]_ 3–5 days
- _[process-dot]_ 03
- **H3:** Design and build
- _[process-step-desc]_ Final design, code, forms and integrations on a staging link
- _[process-time]_ Depends on scope
- _[process-dot]_ 04
- **H3:** Testing
- _[process-step-desc]_ Phones, browsers, forms, speed and SEO checks
- _[process-time]_ 2–4 days
- _[process-dot]_ 05
- **H3:** Launch
- _[process-step-desc]_ Go-live, analytics, handover of code and access
- _[process-time]_ 1 day, then support

**6. pricing-tiers** — After the site goes live · `<section>`

- _[sec-label]_ ADD-ONS
- **H2:** After the site goes live
- Картка-посилання → `/en/services/seo/`:
  - _[декор, aria-hidden]_ 📈
  - **H3:** SEO
  - _[extra-desc]_ Keyword research, technical fixes, content and links. A one-off SEO audit starts at $100 (up to 50 pages). First results usually take 3–6 months.
  - _[extra-price]_ from $150 / month
- Картка-посилання → `/en/services/google-ads/`:
  - **H3:** Google and Meta Ads
  - _[extra-desc]_ Campaign setup from $300 (Google) or $250 (Meta), with conversion tracking connected to your new site. Ad budget is paid separately.
  - _[extra-price]_ management from $200 / month
- Картка-посилання → `/en/services/bots/`:
  - **H3:** Telegram bot
  - _[extra-desc]_ A bot that takes bookings, answers common questions and sends every lead from the site to your team.
  - _[extra-price]_ from $300

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| SEO | from $150 / month | — | — |
| Google and Meta Ads | management from $200 / month | — | — |
| Telegram bot | from $300 | — | — |

**7. faq** — Website development: common questions · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Website development: common questions
- **Q:** How long does it take to build a website?
  **A:** A Start landing page takes up to 10 days, a Pro landing page up to 3 weeks. A corporate website takes about 3 weeks for 5–8 pages and 4–5 weeks for 10–20 pages. An online store takes about 3 weeks (Start) or 5 weeks (Pro). The timeline is agreed in writing before we start.
- **Q:** How much does a website cost?
  **A:** Landing pages start at $600, corporate websites at $1,000 and online stores at $1,200. The price includes design, responsive layout, basic SEO, a basic Telegram or CRM integration and one month of support. Hosting and domain are extra.
- **Q:** Do you work with clients outside Ukraine?
  **A:** Yes. We are based in Kharkiv and work with clients in Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Communication is in English over Telegram, WhatsApp, email or video calls, and prices are quoted in US dollars.
- **Q:** How does payment work?
  **A:** You pay in stages. For most websites it is 50% before work starts and 50% after launch. Larger projects are split into milestones.
- **Q:** Will I own the website?
  **A:** Yes. We hand over the full source code and all access: domain, hosting, analytics and admin panel. You are not locked into working with us.
- **Q:** What happens after launch?
  **A:** The first month of support is included: fixes and small edits. After that you can choose a support plan from $150/month, pay by the hour, or add SEO and ads to bring in traffic.

**8. portfolio** — Websites we have built · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Websites we have built
- Картка-посилання → `/en/portfolio/#p-transfer-kharkiv`:
  - LANDING PAGE
  - **H3:** Transfer Kharkiv
  - Landing page for a transfer company with 8.4% conversion and 119+ search positions in the top. A Telegram bot takes bookings around the clock.
  - See the project →
- Картка-посилання → `/en/portfolio/#p-respect-car`:
  - CATALOGUE WEBSITE
  - **H3:** Respect Car
  - Website for a Kharkiv car dealer: sales, buyback and imports from the USA. Live car catalogue with photos, managed from a Telegram admin panel.
  - See the project →
- Картка-посилання → `/en/portfolio/#p-parrot-school`:
  - WEBSITE + BOTS
  - **H3:** Parrot School
  - Website for an English school in Kharkiv plus a Telegram system for students, parents and teachers, with a separate admin bot.
  - See the project →
- View the full portfolio

**9. cta** — Let's talk about your website · `<section#contact .cta-final>`

- _[sec-label]_ READY TO START?
- **H2:** Let's talk about your website
- _[cta-final-sub]_ Send a short description of your business and what the site should do. We reply within 15 minutes during business hours, in English.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (6, дослівно)

1. **How long does it take to build a website?**

   A Start landing page takes up to 10 days, a Pro landing page up to 3 weeks. A corporate website takes about 3 weeks for 5–8 pages and 4–5 weeks for 10–20 pages. An online store takes about 3 weeks (Start) or 5 weeks (Pro). The timeline is agreed in writing before we start.

2. **How much does a website cost?**

   Landing pages start at $600, corporate websites at $1,000 and online stores at $1,200. The price includes design, responsive layout, basic SEO, a basic Telegram or CRM integration and one month of support. Hosting and domain are extra.

3. **Do you work with clients outside Ukraine?**

   Yes. We are based in Kharkiv and work with clients in Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Communication is in English over Telegram, WhatsApp, email or video calls, and prices are quoted in US dollars.

4. **How does payment work?**

   You pay in stages. For most websites it is 50% before work starts and 50% after launch. Larger projects are split into milestones.

5. **Will I own the website?**

   Yes. We hand over the full source code and all access: domain, hosting, analytics and admin panel. You are not locked into working with us.

6. **What happens after launch?**

   The first month of support is included: fixes and small edits. After that you can choose a support plan from $150/month, pay by the hour, or add SEO and ads to bring in traffic.


#### Внутрішні посилання з контенту (9)

- «Get a quote» → `/en/services/websites/#contact` · блок 1
- «DISCUSS A LANDING PAGE» → `/en/services/websites/#contact` · блок 4
- «DISCUSS A COMPANY SITE» → `/en/services/websites/#contact` · блок 4
- «DISCUSS A STORE» → `/en/services/websites/#contact` · блок 4
- «pricing page» → `/en/pricing/` · блок 4
- «SaaS development» → `/en/services/platforms/` · блок 4
- «business automation» → `/en/services/ecosystems/` · блок 4
- «View the full portfolio» → `/en/portfolio/` · блок 8
- «FILL IN THE FORM» → `/en/#contact` · блок 9

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`

---

### /en/services/bots/ — Telegram bots

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/bots/ |
| Мова | en |
| Пара | uk: `/services/bots/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (53) | Telegram Bot Development — from $300 \| Infinite Union |
| Description (142) | Custom Telegram bot development for business: lead capture, bookings, payments, CRM sync, Mini Apps. Python, aiogram 3. Simple bots from $300. |
| Головний ключ | Telegram bot development |
| H1 | Telegram bot development for business. |
| Слів | 1277 |
| JSON | `design-content/en__services__bots.json` |

**Хлібні крихти:** Home (`/en/`) › Telegram bots

#### Блоки (10)

**1. hero** — Telegram bot development for business. · `<section .hero>`

- _[hero-label]_ SERVICE 02 · TELEGRAM BOT DEVELOPMENT
- **H1:** Telegram bot development for business.
- Infinite Union is a development agency in Kharkiv, Ukraine, working with businesses across the EU. We build Telegram bots that take orders, bookings and payments, and pass every lead to your CRM. Python and aiogram 3, launch in 1–4 weeks, simple bots from $300. Describe your bot.
- _[hero-stat-num]_ 3000+
- _[hero-stat-label]_ ACTIVE USERS IN THE KNEU BOT
- _[hero-stat-num]_ $300
- _[hero-stat-label]_ SIMPLE BOTS FROM
- _[hero-stat-num]_ 5
- _[hero-stat-label]_ PAYMENT PROVIDERS SUPPORTED
- _[hero-stat-num]_ 15 min
- _[hero-stat-label]_ REPLY TIME, BUSINESS HOURS
- _[flagship-tag]_ FLAGSHIP PROJECT
- _[flagship-name]_ KNEU Bot
- _[flagship-url]_ Official university Telegram bot
- _[fm-val]_ 3,000+
- _[fm-key]_ Active users
- _[fm-val]_ Live
- _[fm-key]_ Timetable and news
- _[fm-val]_ Push
- _[fm-key]_ Notifications

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ AIOGRAM 3 → FASTAPI → POSTGRESQL → REDIS FSM → STRIPE → TELEGRAM PAYMENTS → MINI APPS → CRM INTEGRATION → AIOGRAM 3 → FASTAPI → POSTGRESQL → REDIS FSM → STRIPE → TELEGRAM PAYMENTS → MINI APPS → CRM INTEGRATION →

**3. problem** — Where a bot saves you time · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** Where a bot saves you time
- Your team answers the same ten questions every day: prices, opening hours, availability, delivery. Orders arrive as private messages, some get lost, and anything that comes in after 6 pm waits until the morning.
- A Telegram bot takes over that routine. It shows the menu or catalogue, collects the order or booking, takes payment and sends a complete request to your team, so a manager only steps in where a person is really needed.
- We build bots as proper applications, with a database, an admin panel and error handling, not as a script that stops working when Telegram changes something. You get the full source code and the bot account.
- _[cred-val]_ 2 wks
- _[cred-label]_ Simple bot, from brief to launch
- _[cred-val]_ 1 mo
- _[cred-label]_ Support included from Business
- _[cred-val]_ aiogram 3
- _[cred-label]_ Current async framework
- _[cred-val]_ 100%
- _[cred-label]_ Code and access handed over

**4. included-cards** — What goes into a business bot · `<section .what>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What goes into a business bot
- _[what-num]_ 01
- **H3:** Conversation flows
- _[what-desc]_ We map every step of the dialogue: buttons, questions, branches and what happens if the user leaves halfway. Flows run on a finite state machine with Redis, so conversations do not get stuck.
- _[what-tags]_ FSM · Redis · aiogram 3
- _[what-num]_ 02
- **H3:** Database and CRM sync
- _[what-desc]_ Every order or lead is saved to PostgreSQL and sent to your manager. We can also push data to Google Sheets, Notion or your CRM through its API.
- _[what-tags]_ PostgreSQL · Google Sheets · REST API
- _[what-num]_ 03
- **H3:** Payments in the chat
- _[what-desc]_ Customers pay without leaving Telegram. We connect Stripe, Telegram Payments, LiqPay, WayForPay or Monobank, with automatic confirmation and receipts.
- _[what-tags]_ Stripe · Telegram Payments · LiqPay
- _[what-num]_ 04
- **H3:** Admin panel and hosting
- _[what-desc]_ You manage content, orders and broadcasts from an admin menu inside Telegram. The bot is deployed on Railway or your own server, with automatic restarts and error logs.
- _[what-tags]_ Admin bot · Railway · Logging

**5. types** — Sales, restaurant and CRM bots · `<section>`

- _[sec-label]_ BOT TYPES
- **H2:** Sales, restaurant and CRM bots
- **H3:** Sales bot
- _[uc-desc]_ Catalogue, a short quiz to qualify the buyer, payment and follow-up messages for people who did not finish.
- Список:
  - Start from $500, about 7 days
  - Pro from $1,200, about 14 days
  - Max from $2,500 for complex funnels
  - Abandoned order reminders
- **H3:** Restaurant and cafe bot
- _[uc-desc]_ Menu with photos and prices, orders for delivery or pickup, table bookings and promo broadcasts, without paying commission to a delivery app.
- Список:
  - Cafe from $600: up to 50 menu items, 7 days
  - Restaurant from $1,200: about 14 days
  - Chain from $2,500: several locations
  - Bookings with confirmation
- **H3:** CRM integration
- _[uc-desc]_ Leads from the bot land in your CRM with the right fields, status and owner, and your managers get notified in Telegram.
- Список:
  - Start from $800: one CRM, 7 days
  - Pro from $1,500: about 14 days
  - Enterprise from $3,000
  - Two-way status updates
- **H3:** Booking bot
- _[uc-desc]_ For salons, clinics and other appointment-based services: online booking with a choice of specialist and time slot.
- Список:
  - Choice of specialist and slot
  - Reminders before the visit
  - Cancel or reschedule in the chat
  - Feedback request afterwards
- **H3:** Education bot
- _[uc-desc]_ Timetables, homework, progress and course payments. We built this kind of system for Parrot School: separate roles for students, parents and teachers.
- Список:
  - Lessons and materials on schedule
  - Tests and homework
  - Progress for parents
  - Course payment and access
- **H3:** Internal team bot
- _[uc-desc]_ Requests, tasks, payroll and reports for your own staff. BizBot, which we built for a small business, saves its owner 4+ hours a week.
- Список:
  - Tasks and requests
  - Daily team reports
  - Automatic Excel filling
  - Roles and access levels

**6. pricing-tiers** — Telegram bot development cost · `<section>`

- _[sec-label]_ PRICING
- **H2:** Telegram bot development cost
- **H3:** Starter
- _[level-price]_ from $300
- _[level-price-note]_ Simple bot · up to 2 weeks
- Список:
  - Lead form or quiz
  - Admin menu in Telegram
  - Database
  - Notifications to your team
  - Deployment on Railway
  - Payments
  - CRM integration
- Посилання/кнопка: «DISCUSS YOUR BOT» → `/en/services/bots/#contact`
- _[level-badge]_ MOST REQUESTED
- **H3:** Business
- _[level-price]_ from $700
- _[level-price-note]_ Full bot · up to 4 weeks
- Список:
  - Multi-step flows
  - Payments in the chat
  - CRM or Google Sheets integration
  - Several admins and roles
  - Segmented broadcasts
  - 1 month of support
  - Telegram Mini App
- Посилання/кнопка: «DISCUSS YOUR BOT» → `/en/services/bots/#contact`
- **H3:** Enterprise
- _[level-price]_ from $1,500
- _[level-price-note]_ Mini App and AI · scope agreed individually
- Список:
  - Telegram Mini App (web app inside Telegram)
  - AI features with the Claude API
  - Custom admin dashboard
  - Integrations with your systems
  - 3 months of support
- Посилання/кнопка: «DISCUSS YOUR BOT» → `/en/services/bots/#contact`
- Prices are starting points; the final quote depends on the number of flows and integrations. Support after launch starts at $150/month. All our prices are on the pricing page. If the bot should work together with a new website and CRM, see business automation.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Starter | from $300 · Simple bot · up to 2 weeks | Simple bot · up to 2 weeks | Lead form or quiz; Admin menu in Telegram; Database; Notifications to your team; Deployment on Railway; Payments; CRM integration |
| Business _(MOST REQUESTED)_ | from $700 · Full bot · up to 4 weeks | Full bot · up to 4 weeks | Multi-step flows; Payments in the chat; CRM or Google Sheets integration; Several admins and roles; Segmented broadcasts; 1 month of support; Telegram Mini App |
| Enterprise | from $1,500 · Mini App and AI · scope agreed individually | — | Telegram Mini App (web app inside Telegram); AI features with the Claude API; Custom admin dashboard; Integrations with your systems; 3 months of support |

**7. process** — From idea to a live bot · `<section .process>`

- _[sec-label]_ HOW WE WORK
- **H2:** From idea to a live bot
- _[process-dot]_ 01
- **H3:** Brief
- _[process-step-desc]_ We go through your process and agree what the bot does
- _[process-time]_ 1–2 days
- _[process-dot]_ 02
- **H3:** Flow map
- _[process-step-desc]_ Dialogue scheme, data fields and integrations for your approval
- _[process-time]_ 1–3 days
- _[process-dot]_ 03
- **H3:** Development
- _[process-step-desc]_ Code, payments, integrations and the admin menu
- _[process-time]_ Depends on scope
- _[process-dot]_ 04
- **H3:** Testing
- _[process-step-desc]_ You test the bot on real scenarios, we fix what comes up
- _[process-time]_ 2–4 days
- _[process-dot]_ 05
- **H3:** Launch
- _[process-step-desc]_ Deployment, handover of code and access, then support
- _[process-time]_ 1 day

**8. faq** — Telegram bot development: FAQ · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Telegram bot development: FAQ
- **Q:** How much does a Telegram bot cost?
  **A:** A simple bot starts at $300, a full business bot with payments and CRM at $700, and a bot with a Mini App or AI features at $1,500. Sales bots start at $500, restaurant bots at $600 and CRM integrations at $800.
- **Q:** How long does development take?
  **A:** A simple bot takes up to 2 weeks, a business bot up to 4 weeks. Focused bots such as a sales bot or a cafe bot can be ready in about 7 days.
- **Q:** Do I need any technical knowledge?
  **A:** No. You describe how your business works and create the bot account in @BotFather (we guide you through it). We handle everything else, and you manage the bot through buttons in an admin menu.
- **Q:** Which payment systems can the bot accept?
  **A:** Stripe and Telegram Payments for EU clients, plus LiqPay, WayForPay and Monobank for Ukrainian customers. Payment confirmation and receipts are automatic.
- **Q:** Can the bot work with my website and CRM?
  **A:** Yes. The bot can receive leads from your website form, send order notifications and sync customers with your CRM through its API.
- **Q:** Who owns the bot after launch?
  **A:** You do. The bot account is registered to you, and we hand over the full source code and server access. You can keep us on support from $150/month or move to another team.

**9. portfolio** — Bots we have built · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Bots we have built
- Картка-посилання → `/en/portfolio/#p-kneu-bot`:
  - UNIVERSITY
  - **H3:** KNEU Bot
  - Official university bot with timetable, news and notifications for 3,000+ active users. Python, aiogram, PostgreSQL.
  - See the project →
- Картка-посилання → `/en/portfolio/#p-bizbot`:
  - SMALL BUSINESS
  - **H3:** BizBot
  - Bookkeeping bot for a small business: payroll, tasks and automatic Excel filling. Saves 4+ hours a week.
  - See the project →
- Картка-посилання → `/en/portfolio/#p-infinitycreo`:
  - AI BOT
  - **H3:** InfinityCreo
  - Telegram bot that generates ad creatives with AI through n8n: about 3 minutes from brief to banner, 10+ formats.
  - See the project →
- View the full portfolio · Need a website for the bot to work with? See website development.

**10. cta** — Let's plan your bot · `<section#contact .cta-final>`

- _[sec-label]_ READY TO AUTOMATE?
- **H2:** Let's plan your bot
- _[cta-final-sub]_ Tell us what the bot should do. We reply within 15 minutes during business hours and suggest a scope and price.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (6, дослівно)

1. **How much does a Telegram bot cost?**

   A simple bot starts at $300, a full business bot with payments and CRM at $700, and a bot with a Mini App or AI features at $1,500. Sales bots start at $500, restaurant bots at $600 and CRM integrations at $800.

2. **How long does development take?**

   A simple bot takes up to 2 weeks, a business bot up to 4 weeks. Focused bots such as a sales bot or a cafe bot can be ready in about 7 days.

3. **Do I need any technical knowledge?**

   No. You describe how your business works and create the bot account in @BotFather (we guide you through it). We handle everything else, and you manage the bot through buttons in an admin menu.

4. **Which payment systems can the bot accept?**

   Stripe and Telegram Payments for EU clients, plus LiqPay, WayForPay and Monobank for Ukrainian customers. Payment confirmation and receipts are automatic.

5. **Can the bot work with my website and CRM?**

   Yes. The bot can receive leads from your website form, send order notifications and sync customers with your CRM through its API.

6. **Who owns the bot after launch?**

   You do. The bot account is registered to you, and we hand over the full source code and server access. You can keep us on support from $150/month or move to another team.


#### Внутрішні посилання з контенту (9)

- «Describe your bot» → `/en/services/bots/#contact` · блок 1
- «DISCUSS YOUR BOT» → `/en/services/bots/#contact` · блок 6
- «DISCUSS YOUR BOT» → `/en/services/bots/#contact` · блок 6
- «DISCUSS YOUR BOT» → `/en/services/bots/#contact` · блок 6
- «pricing page» → `/en/pricing/` · блок 6
- «business automation» → `/en/services/ecosystems/` · блок 6
- «View the full portfolio» → `/en/portfolio/` · блок 9
- «website development» → `/en/services/websites/` · блок 9
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`

---

### /en/services/platforms/ — Web platforms & SaaS

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/platforms/ |
| Мова | en |
| Пара | uk: `/services/platforms/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (49) | Web Platform & SaaS Development — MVP from $2,500 |
| Description (144) | Web platform and SaaS development: dashboards, client portals, internal tools. React/Next.js, FastAPI, PostgreSQL. MVP from $2,500 in 4–8 weeks. |
| Головний ключ | SaaS development |
| H1 | SaaS development from MVP to full platform. |
| Слів | 977 |
| JSON | `design-content/en__services__platforms.json` |

**Хлібні крихти:** Home (`/en/`) › Web platforms & SaaS

#### Блоки (10)

**1. hero** — SaaS development from MVP to full platform. · `<section .hero>`

- _[hero-label]_ SERVICE 03 · SAAS AND WEB PLATFORMS
- **H1:** SaaS development from MVP to full platform.
- Infinite Union is a development agency in Kharkiv, Ukraine, working with founders and companies across the EU. We build SaaS products, client portals, dashboards and internal tools with React, Next.js, FastAPI and PostgreSQL. An MVP starts at $2,500 and takes 4–8 weeks.
- _[hero-stat-num]_ $2,500
- _[hero-stat-label]_ MVP FROM
- _[hero-stat-num]_ 4–8 wks
- _[hero-stat-label]_ TYPICAL MVP TIMELINE
- _[hero-stat-num]_ $6,000
- _[hero-stat-label]_ FULL PLATFORM FROM
- _[hero-stat-num]_ 15 min
- _[hero-stat-label]_ REPLY TIME, BUSINESS HOURS
- _[декор, aria-hidden]_ app.example.com/dashboard TYPICAL MVP SCOPE Sign-up and rolesAuth SubscriptionsStripe Core featureYour product Admin and reportsDashboard IntegrationsREST API

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ REACT NEXT.JS TYPESCRIPT FASTAPI POSTGRESQL REDIS SaaS REST API REACT NEXT.JS TYPESCRIPT FASTAPI POSTGRESQL REDIS SaaS REST API

**3. problem** — When spreadsheets and plugins stop working · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** When spreadsheets and plugins stop working
- _[what-num]_ 01
- **H3:** The idea needs real users
- _[what-desc]_ You have a product idea and want paying customers before investing a year of development. You need a focused MVP that does one job well, not a prototype that falls apart once real users arrive.
- _[what-num]_ 02
- **H3:** The business outgrew its tools
- _[what-desc]_ Orders live in one spreadsheet, clients in another, reports are put together by hand every Friday. Off-the-shelf software covers most of the process, and the part it misses is where the time goes.

**4. included-cards** — SaaS development and web apps we deliver · `<section .what>`

- _[sec-label]_ WHAT WE BUILD
- **H2:** SaaS development and web apps we deliver
- _[what-num]_ 01
- **H3:** SaaS products
- _[what-desc]_ Subscription services with user accounts, roles, billing and an admin panel. Stripe for EU customers, LiqPay or Monobank for Ukraine.
- _[what-tags]_ Subscriptions · Stripe · Roles
- _[what-num]_ 02
- **H3:** Client portals
- _[what-desc]_ A private area where your clients see orders, documents, invoices and status updates, instead of asking for them by email.
- _[what-tags]_ Accounts · Documents · Notifications
- _[what-num]_ 03
- **H3:** Dashboards and reporting
- _[what-desc]_ Data from your ad accounts, CRM or database collected in one screen and refreshed automatically. Our own Ad Tracker, which pulls Meta, Google and TikTok Ads into one dashboard, is built this way.
- _[what-tags]_ Analytics · API · Auto-refresh
- _[what-num]_ 04
- **H3:** Internal tools
- _[what-desc]_ Order management, task tracking, payroll or stock: software built around how your team actually works, connected to Telegram for notifications.
- _[what-tags]_ Workflows · Telegram · Integrations

**5. process** — Stages and timelines · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** Stages and timelines
- _[stack-cat]_ STAGE 01 · 1–2 DAYS
- **H3:** Discovery
- _[stack-sub]_ Users, core scenarios and what goes into version one. You get a written scope and a fixed quote.
- _[stack-cat]_ STAGE 02 · 3–5 DAYS
- **H3:** Prototype
- _[stack-sub]_ Clickable screens for the main flows, so you can test the logic before code is written.
- _[stack-cat]_ STAGE 03 · 4–8 WEEKS FOR AN MVP
- **H3:** Development
- _[stack-sub]_ Regular progress updates on a staging link, so you see working features as they are built.
- _[stack-cat]_ STAGE 04 · 2–4 DAYS + 1 DAY
- **H3:** Testing and launch
- _[stack-sub]_ End-to-end testing, deployment, then handover of the repository, documentation and access.

**6. tech-stack** — The stack we build on · `<section>`

- _[sec-label]_ TECHNOLOGY
- **H2:** The stack we build on
- _[stack-cat]_ FRONTEND
- _[stack-item]_ React / Next.js
- _[stack-sub]_ Fast interfaces and server rendering
- _[stack-item]_ TypeScript
- _[stack-sub]_ Fewer bugs as the code grows
- _[stack-cat]_ BACKEND
- _[stack-item]_ Python / FastAPI
- _[stack-sub]_ Async APIs
- _[stack-item]_ PostgreSQL
- _[stack-sub]_ Reliable relational database
- _[stack-cat]_ INFRASTRUCTURE
- _[stack-item]_ Railway
- _[stack-sub]_ Cloud hosting and deploys
- _[stack-item]_ Cloudflare
- _[stack-sub]_ CDN and protection
- _[stack-cat]_ DATA AND AI
- _[stack-item]_ Redis
- _[stack-sub]_ Caching and queues
- _[stack-item]_ n8n · Claude API
- _[stack-sub]_ Automation and AI features

**7. pricing-tiers** — SaaS development cost · `<section>`

- _[sec-label]_ PRICING
- **H2:** SaaS development cost
- **H3:** MVP
- _[level-price]_ from $2,500
- _[level-price-note]_ First version for real users · 4–8 weeks
- Список:
  - Core product features
  - Sign-up, login and roles
  - Basic admin dashboard
  - REST API
  - Cloud deployment
  - Payments
  - Advanced analytics
- Посилання/кнопка: «DISCUSS YOUR MVP» → `/en/services/platforms/#contact`
- _[level-badge]_ MOST REQUESTED
- **H3:** Platform
- _[level-price]_ from $6,000
- _[level-price-note]_ Complete product · 2–4 months
- Список:
  - Full feature set
  - Mobile-friendly interface
  - Payments and subscriptions
  - Analytics and reports
  - Admin panel
  - Third-party integrations
  - Automated deploys
- Посилання/кнопка: «DISCUSS YOUR PLATFORM» → `/en/services/platforms/#contact`
- **H3:** Enterprise
- _[level-price]_ from $15,000
- _[level-price-note]_ Large system · scope agreed individually
- Список:
  - Multiple user groups and permissions
  - Integrations with your existing systems
  - Custom reporting
  - Technical documentation
  - Team training and handover
- Посилання/кнопка: «DISCUSS YOUR PROJECT» → `/en/services/platforms/#contact`
- Hosting and third-party services are billed separately. Support after launch starts at $150/month or by the hour. See all prices on the pricing page. If you mainly need a website, bot and CRM connected together, business automation starts at $2,000. A Telegram-first product can also start as a Telegram bot or Mini App.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| MVP | from $2,500 · First version for real users · 4–8 weeks | First version for real users · 4–8 weeks | Core product features; Sign-up, login and roles; Basic admin dashboard; REST API; Cloud deployment; Payments; Advanced analytics |
| Platform _(MOST REQUESTED)_ | from $6,000 · Complete product · 2–4 months | Complete product · 2–4 months | Full feature set; Mobile-friendly interface; Payments and subscriptions; Analytics and reports; Admin panel; Third-party integrations; Automated deploys |
| Enterprise | from $15,000 · Large system · scope agreed individually | — | Multiple user groups and permissions; Integrations with your existing systems; Custom reporting; Technical documentation; Team training and handover |

**8. portfolio** — Platforms we have built · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Platforms we have built
- Картка-посилання → `/en/portfolio/#p-ad-tracker`:
  - _[what-num]_ AD TRACKER BY IU
  - **H3:** Ad reporting portal
  - _[what-desc]_ Meta, Google and TikTok Ads in one dashboard, refreshed every 2 hours with 90 days of history. Saves 5+ hours a week on reports. Currently in development.
  - _[what-tags]_ Next.js · PostgreSQL · Ads APIs
- Картка-посилання → `/en/portfolio/#p-respect-car`:
  - _[what-num]_ RESPECT CAR
  - **H3:** Car dealer platform
  - _[what-desc]_ Sales, buyback and US import for a Kharkiv car dealer, with a live catalogue and an admin panel that runs inside Telegram.
  - _[what-tags]_ Next.js 16 · React 19 · Redis
- View the full portfolio

**9. faq** — SaaS development: common questions · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** SaaS development: common questions
- **Q:** How is a web platform different from a website?
  **A:** A website mostly presents information. A platform has user accounts, a database, business logic and an API: people log in and do work in it, such as placing orders, managing subscriptions or viewing reports.
- **Q:** How much does SaaS development cost?
  **A:** An MVP starts at $2,500 (4–8 weeks), a full platform at $6,000 (2–4 months) and enterprise systems at $15,000. After the discovery call we split the scope into tasks and give you a fixed quote.
- **Q:** What should go into an MVP?
  **A:** Only what a first customer needs to get value and pay: sign-up, the core feature and a simple admin. Everything else goes on a list for version two, based on what real users ask for.
- **Q:** Can you take over a project someone else started?
  **A:** Yes, after a code review. If the code is in reasonable shape, we continue. If there are serious problems, we tell you plainly and suggest a plan to fix them.
- **Q:** Who owns the code?
  **A:** You do. We hand over the repository, all access, technical documentation and deployment instructions, and walk your team through the codebase.
- **Q:** Do you work with founders outside Ukraine?
  **A:** Yes. We are based in Kharkiv and work with clients across the EU and the UK. All communication is in English, by chat, email or video call, and payment is split into stages.

**10. cta** — Let's scope your product · `<section#contact .cta-final>`

- _[sec-label]_ HAVE AN IDEA?
- **H2:** Let's scope your product
- _[cta-final-sub]_ Free technical consultation. We reply within 15 minutes during business hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (6, дослівно)

1. **How is a web platform different from a website?**

   A website mostly presents information. A platform has user accounts, a database, business logic and an API: people log in and do work in it, such as placing orders, managing subscriptions or viewing reports.

2. **How much does SaaS development cost?**

   An MVP starts at $2,500 (4–8 weeks), a full platform at $6,000 (2–4 months) and enterprise systems at $15,000. After the discovery call we split the scope into tasks and give you a fixed quote.

3. **What should go into an MVP?**

   Only what a first customer needs to get value and pay: sign-up, the core feature and a simple admin. Everything else goes on a list for version two, based on what real users ask for.

4. **Can you take over a project someone else started?**

   Yes, after a code review. If the code is in reasonable shape, we continue. If there are serious problems, we tell you plainly and suggest a plan to fix them.

5. **Who owns the code?**

   You do. We hand over the repository, all access, technical documentation and deployment instructions, and walk your team through the codebase.

6. **Do you work with founders outside Ukraine?**

   Yes. We are based in Kharkiv and work with clients across the EU and the UK. All communication is in English, by chat, email or video call, and payment is split into stages.


#### Внутрішні посилання з контенту (8)

- «DISCUSS YOUR MVP» → `/en/services/platforms/#contact` · блок 7
- «DISCUSS YOUR PLATFORM» → `/en/services/platforms/#contact` · блок 7
- «DISCUSS YOUR PROJECT» → `/en/services/platforms/#contact` · блок 7
- «pricing page» → `/en/pricing/` · блок 7
- «business automation» → `/en/services/ecosystems/` · блок 7
- «Telegram bot or Mini App» → `/en/services/bots/` · блок 7
- «View the full portfolio» → `/en/portfolio/` · блок 8
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`

---

### /en/services/ecosystems/ — Business automation

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/ecosystems/ |
| Мова | en |
| Пара | uk: `/services/ecosystems/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (54) | Business Automation: Website + Bot + CRM — from $2,000 |
| Description (144) | Business automation as one system: website, Telegram bot, CRM and analytics connected end to end. No lost leads, no manual reports. From $2,000. |
| Головний ключ | business automation |
| H1 | Business automation: site, bot, CRM. |
| Слів | 1039 |
| JSON | `design-content/en__services__ecosystems.json` |

**Хлібні крихти:** Home (`/en/`) › Business automation

#### Блоки (9)

**1. hero** — Business automation: site, bot, CRM. · `<section .hero>`

- _[hero-label]_ SERVICE 04 · BUSINESS AUTOMATION
- **H1:** Business automation: site, bot, CRM.
- Infinite Union, a development agency in Kharkiv, Ukraine, builds business automation for small companies in Ukraine and the EU: a website, a Telegram bot, a CRM and analytics connected end to end. Leads stop getting lost between tools, and reports stop being made by hand. From $2,000.
- _[hero-stat-num]_ $2,000
- _[hero-stat-label]_ COMPLETE SYSTEM FROM
- _[hero-stat-num]_ 3 in 1
- _[hero-stat-label]_ WEBSITE · BOT · CRM
- _[hero-stat-num]_ 1
- _[hero-stat-label]_ TEAM RESPONSIBLE FOR ALL OF IT
- _[hero-stat-num]_ 15 min
- _[hero-stat-label]_ REPLY TIME, BUSINESS HOURS

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ WEBSITE ·TELEGRAM BOT ·CRM ·SEO ·GOOGLE ADS ·ANALYTICS ·N8N ·ONE SYSTEM · WEBSITE ·TELEGRAM BOT ·CRM ·SEO ·GOOGLE ADS ·ANALYTICS ·N8N ·ONE SYSTEM ·

**3. problem** — Separate tools vs one system · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** Separate tools vs one system
- _[compare-title]_ WHAT WE USUALLY SEE
- Список:
  - —The website was built by one contractor, the bot by another, and they are not connected
  - —Leads from ads end up in an inbox, a chat and a spreadsheet at the same time
  - —Nobody can say which channel brought the last ten customers
  - —A manager copies requests from one system to another by hand
  - —When something breaks, each contractor points at the other
- _[compare-title]_ WHAT WE BUILD INSTEAD
- Список:
  - +Website, bot and CRM designed and connected by one team
  - +Every lead is saved to a database first, then queued and delivered to Telegram and the CRM
  - +Tracking from the ad click to the request, so you see what each channel brings
  - +Routine steps automated: confirmations, reminders, status updates
  - +One contact who answers for the whole system

**4. included-cards** — Business automation, layer by layer · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** Business automation, layer by layer
- _[eco-num]_ 01
- **H3:** Website
- _[eco-type]_ ENTRY POINT
- _[eco-desc]_ A fast, SEO-ready site with clear offers and a short form. The form is wired to the bot and the CRM from day one, so no request sits unread in a mailbox.
- _[eco-includes]_ Custom design · Basic SEO · Form → bot → CRM
- _[eco-num]_ 02
- **H3:** Telegram bot
- _[eco-type]_ FIRST RESPONSE
- _[eco-desc]_ The bot answers common questions, runs a short quiz to qualify the request, takes bookings or payments and sends reminders. Your team gets a complete request instead of "hi, how much?".
- _[eco-includes]_ Quiz · Payments · Reminders · FSM flows
- _[eco-num]_ 03
- **H3:** CRM
- _[eco-type]_ ONE CUSTOMER BASE
- _[eco-desc]_ Requests from the site, the bot and ads land in one place with status, owner and history. We connect your existing CRM or set up a simple one around your sales process.
- _[eco-includes]_ Pipeline · Statuses · Notifications
- _[eco-num]_ 04
- **H3:** Automations
- _[eco-type]_ NO MANUAL COPYING
- _[eco-desc]_ Workflows in n8n or custom code move data between tools: new order to spreadsheet, payment to invoice, status change to a message for the client. AI steps with the Claude API where they save real time.
- _[eco-includes]_ n8n · Claude API · Google Sheets
- _[eco-num]_ 05
- **H3:** Traffic and reporting
- _[eco-type]_ OPTIONAL
- _[eco-desc]_ If you also want us to bring in traffic, we run Google Ads, Meta Ads or SEO on top of the system, with conversions tracked to the request. Reports come from the data, not from a manager's spreadsheet.
- _[eco-includes]_ Google Analytics 4 · Conversion tracking · Ad reports

**5. process** — Stages and timelines · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** Stages and timelines
- **H3:** 1. Audit and plan · 1–7 days
- _[why-desc]_ We map how a lead travels through your business today and where it gets stuck (1–2 days), then show a prototype of the new flow and the system layout (3–5 days).
- **H3:** 2. Build and connect
- _[why-desc]_ Website, bot, CRM and automations are built and connected on a test environment. The timeline depends on how many parts and integrations you need.
- **H3:** 3. Test, launch, support
- _[why-desc]_ We run real requests through the whole chain (2–4 days), launch (1 day) and train your team. Then we stay on support so the system keeps working as you grow.

**6. pricing-cards** — What business automation costs · `<section>`

- _[sec-label]_ PRICING
- **H2:** What business automation costs
- **H3:** Core system · from $2,000
- _[why-desc]_ Website, Telegram bot and CRM connected into one lead pipeline, with notifications and basic analytics. The final price depends on the number of pages, bot flows and integrations.
- **H3:** Traffic · from $200/month
- _[why-desc]_ Optional ad management: Google Ads from $200/month after a $300 setup, Meta Ads from $200/month after a $250 setup, SEO from $150/month. Ad budgets are paid separately.
- **H3:** Support · from $150/month
- _[why-desc]_ Fixes, updates and small improvements after launch, or hourly work if you prefer. Full price list on the pricing page.

**7. portfolio** — Connected systems we have built · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Connected systems we have built
- Картка-посилання → `/en/portfolio/#p-parrot-school`:
  - **H3:** Parrot School
  - _[why-desc]_ Website for an English school in Kharkiv plus a Telegram system with three roles (student, parent, teacher) and a separate admin bot. aiogram, Railway.
- Картка-посилання → `/en/portfolio/#p-transfer-kharkiv`:
  - **H3:** Transfer Kharkiv
  - _[why-desc]_ Landing page with 8.4% conversion and 119+ search positions in the top, connected to a Telegram bot that takes bookings around the clock.
- Картка-посилання → `/en/portfolio/#p-iu-bot`:
  - **H3:** IU Bot
  - _[why-desc]_ Our own lead bot: a quiz qualifies the request, FSM flows guide the conversation, and the lead is passed to the CRM automatically.
- View the full portfolio · Individual parts: website development, Telegram bots, SaaS and web platforms.

**8. faq** — Business automation: common questions · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Business automation: common questions
- **Q:** Is this worth it for a small business?
  **A:** Usually yes, if you get leads from more than one channel or spend hours a week moving data by hand. We start with the parts that save the most time and add the rest later.
- **Q:** How much does business automation cost?
  **A:** A connected website, Telegram bot and CRM starts at $2,000. Ad management and SEO are optional monthly services, and ad budgets are paid separately. You get an exact quote after the first call.
- **Q:** Can you connect the tools we already use?
  **A:** Yes. If you already have a website or CRM, we connect new parts to it. If a tool has no API or blocks integration, we say so and suggest an alternative.
- **Q:** How long does it take?
  **A:** Audit and planning take about a week. The build depends on scope: a landing page with a bot is much faster than a multi-page site with a custom CRM. We agree the timeline in writing before starting.
- **Q:** What happens if one part stops working?
  **A:** Leads are saved to the database before anything else, and failed deliveries are retried from a queue, so a temporary error does not lose a request. On support, we are the single contact for fixes.
- **Q:** Who owns the system?
  **A:** You do. We hand over all source code, accounts and documentation, so you can keep working with us or pass the system to another team.

**9. cta** — Tell us about your business · `<section#contact .cta-final>`

- _[sec-label]_ READY TO AUTOMATE?
- **H2:** Tell us about your business
- _[cta-final-sub]_ Describe how leads reach you today. We reply within 15 minutes during business hours and suggest what to automate first.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (6, дослівно)

1. **Is this worth it for a small business?**

   Usually yes, if you get leads from more than one channel or spend hours a week moving data by hand. We start with the parts that save the most time and add the rest later.

2. **How much does business automation cost?**

   A connected website, Telegram bot and CRM starts at $2,000. Ad management and SEO are optional monthly services, and ad budgets are paid separately. You get an exact quote after the first call.

3. **Can you connect the tools we already use?**

   Yes. If you already have a website or CRM, we connect new parts to it. If a tool has no API or blocks integration, we say so and suggest an alternative.

4. **How long does it take?**

   Audit and planning take about a week. The build depends on scope: a landing page with a bot is much faster than a multi-page site with a custom CRM. We agree the timeline in writing before starting.

5. **What happens if one part stops working?**

   Leads are saved to the database before anything else, and failed deliveries are retried from a queue, so a temporary error does not lose a request. On support, we are the single contact for fixes.

6. **Who owns the system?**

   You do. We hand over all source code, accounts and documentation, so you can keep working with us or pass the system to another team.


#### Внутрішні посилання з контенту (9)

- «Google Ads» → `/en/services/google-ads/` · блок 4
- «Meta Ads» → `/en/services/meta-ads/` · блок 4
- «SEO» → `/en/services/seo/` · блок 4
- «pricing page» → `/en/pricing/` · блок 6
- «View the full portfolio» → `/en/portfolio/` · блок 7
- «website development» → `/en/services/websites/` · блок 7
- «Telegram bots» → `/en/services/bots/` · блок 7
- «SaaS and web platforms» → `/en/services/platforms/` · блок 7
- «FILL IN THE FORM» → `/en/#contact` · блок 9

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`

---

### /en/services/google-ads/ — Google Ads

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/google-ads/ |
| Мова | en |
| Пара | uk: `/services/google-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (56) | Google Ads Management — Setup from $300 \| Infinite Union |
| Description (148) | Google Ads setup and management: Search, Performance Max, YouTube, remarketing and conversion tracking. Setup from $300, management from $200/month. |
| Головний ключ | Google Ads management |
| H1 | Google Ads management |
| Слів | 1133 |
| JSON | `design-content/en__services__google-ads.json` |

**Хлібні крихти:** Home (`/en/`) › Google Ads

#### Блоки (10)

**1. hero** — Google Ads management · `<section .hero>`

- _[hm-val]_ $300
- _[hm-key]_ Setup
- _[hm-sub]_ one-off, from
- _[hm-val]_ $200
- _[hm-key]_ Management
- _[hm-sub]_ per month, from
- _[hm-key]_ Ad budget
- _[hm-sub]_ per month, suggested start
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 02
- _[hero-label]_ GOOGLE ADS · SEARCH · PERFORMANCE MAX
- **H1:** Google Ads management
- Google Ads management for small and mid-sized businesses in the EU and Ukraine. Infinite Union is an agency in Kharkiv: we set up Search, Performance Max and YouTube campaigns with proper conversion tracking, then manage them every week. Setup from $300, management from $200/month, ad budget separate.
- _[hero-stat-num]_ $300
- _[hero-stat-label]_ setup, from
- _[hero-stat-num]_ $200/mo
- _[hero-stat-label]_ management, from
- _[hero-stat-num]_ 15min
- _[hero-stat-label]_ reply time, working hours

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ GOOGLE SEARCH →PERFORMANCE MAX →YOUTUBE ADS →DISPLAY →REMARKETING →GA4 →CONVERSION TRACKING →MERCHANT CENTER →GOOGLE SEARCH →PERFORMANCE MAX →YOUTUBE ADS →DISPLAY →REMARKETING →GA4 →CONVERSION TRACKING →MERCHANT CENTER →

**3. problem** — Clicks are easy. Customers are not. · `<section>`

- _[sec-label]_ WHY CAMPAIGNS LEAK MONEY
- **H2:** Clicks are easy. Customers are not.
- A typical self-run Google Ads account has the same set of issues: broad keywords that match irrelevant searches, no negative keyword list, every ad sending people to the home page, and conversion tracking that counts page views as leads. The budget gets spent, the dashboard looks busy, and nobody can say which campaign brought a paying customer.
- Another common case: Performance Max switched on with default settings, so Google decides where your money goes and you see very little of why. Good Google Ads management fixes this with a clear account structure, clean conversion data and regular search-term reviews — not with a bigger budget.

**4. included-cards** — What our Google Ads management covers · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What our Google Ads management covers
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Search campaigns
- _[service-desc]_ Ads for people who are already typing your service or product into Google. We build the keyword list by intent, split it into tight ad groups, write responsive search ads, add sitelinks, callouts and call assets, and maintain negative keywords from day one.
- _[service-tags]_ Keyword research · Responsive search ads · Negative keywords
- _[service-num]_ 02
- **H3:** Conversion tracking
- _[service-desc]_ Before launch we set up GA4 and Google Ads conversions for the actions that matter: form submissions, calls, Telegram or WhatsApp clicks, purchases. Without this, Smart Bidding optimises for the wrong thing.
- _[service-tags]_ GA4 · Google Tag Manager · Enhanced conversions
- _[service-num]_ 03
- **H3:** Performance Max and Shopping
- _[service-desc]_ For online stores we connect Google Merchant Center, clean up the product feed and run Performance Max with separate asset groups and audience signals, so you can see which product groups earn money and which only spend it.
- _[service-tags]_ Merchant Center · Product feed · Asset groups
- _[service-num]_ 04
- **H3:** YouTube and remarketing
- _[service-desc]_ Video and display remarketing for people who visited your site but did not get in touch. It works best for services with a longer decision cycle, such as education, renovation or B2B.
- _[service-tags]_ Remarketing lists · YouTube in-stream · Customer Match

**5. process** — From brief to first optimisation · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** From brief to first optimisation
- _[process-dot]_ 01
- **H3:** Brief and audit
- _[process-item-desc]_ We review your site, offer, competitors and your current account, if you have one.
- _[process-time]_ 1–2 days
- _[process-dot]_ 02
- **H3:** Keywords and structure
- _[process-item-desc]_ Keyword research, negative lists, campaign and ad group structure, ad copy.
- _[process-time]_ 2–3 days
- _[process-dot]_ 03
- **H3:** Tracking and launch
- _[process-item-desc]_ Conversion tracking, billing check, launch and close monitoring in the first week.
- _[process-time]_ 1 week
- _[process-dot]_ 04
- **H3:** Optimisation
- _[process-item-desc]_ Search-term clean-up, bid and budget changes, ad tests, monthly report.
- _[process-time]_ Ongoing

**6. pricing-cards** — Google Ads pricing · `<section>`

- _[sec-label]_ PRICING
- **H2:** Google Ads pricing
- _[декор, aria-hidden]_ ↗
- _[service-num]_ TIER 01
- **H3:** Setup — from $300
- _[service-desc]_ One-off. Audit of the existing account or a new one, keyword research, campaign structure, ads, conversion tracking in GA4 and Google Ads, launch.
- _[service-tags]_ One-off
- _[service-num]_ TIER 02
- **H3:** Management — from $200/month
- _[service-desc]_ Weekly search-term reviews, negative keywords, bid and budget changes, ad copy tests and a monthly report in plain language.
- _[service-tags]_ Monthly
- _[service-num]_ TIER 03
- **H3:** Large budgets and e-commerce — from $500/month
- _[service-desc]_ Several campaign types at once: Search, Performance Max, Shopping and remarketing, product feed maintenance and more frequent reviews.
- _[service-num]_ BUDGET
- **H3:** Ad budget — paid to Google
- _[service-desc]_ The ad budget is always separate from our fee and is charged by Google directly to your card. We suggest starting from $300/month so campaigns collect enough data to optimise.
- _[service-tags]_ Separate
- Prices for every service we offer, from websites to SEO, are on one page: Infinite Union pricing.

**7. portfolio** — What we build around ads · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** What we build around ads
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Ad Tracker by IU
- _[service-desc]_ Our own dashboard that puts Google Ads, Meta Ads and TikTok Ads in one window, refreshes every 2 hours and keeps 90 days of history. It is still in development; on our side it already saves 5+ hours a week on reporting.
- _[service-tags]_ Google Ads · Meta Ads · TikTok Ads
- _[service-num]_ 02
- **H3:** Transfer Kharkiv
- _[service-desc]_ Landing page for a transfer company with an 8.4% conversion rate and a Telegram bot that accepts bookings 24/7. Paid clicks only pay off when the page they land on is fast and clear — this is the kind of page we build for that.
- _[service-tags]_ Landing page · Telegram bot
- More projects in our portfolio.

**8. faq** — Questions we get asked · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Questions we get asked
- **Q:** How much does Google Ads management cost?
  **A:** Setup starts from $300 as a one-off payment. Monthly management starts from $200, or from $500/month for large budgets and e-commerce. The ad budget is paid to Google separately and is not part of our fee.
- **Q:** What ad budget do I need?
  **A:** We suggest starting from $300/month. With less, campaigns collect data slowly and it takes longer to see which keywords bring enquiries. Before launch we estimate realistic click costs for your niche and country.
- **Q:** How soon will I see results?
  **A:** Search ads can start showing as soon as Google approves them. The first weeks are about collecting data; we judge campaigns by enquiries and sales over several weeks, not by the first few days of clicks.
- **Q:** Do you guarantee leads or the first position?
  **A:** No. Nobody can honestly guarantee positions or a number of leads: competition, click prices and your offer all play a part. What we do commit to is transparent work — you own the account, see every change and get a monthly report.
- **Q:** Will the Google Ads account be mine?
  **A:** Yes. The Google Ads account, GA4 property and all data stay in your name. We work through manager access, and if we stop working together, everything stays with you.
- **Q:** Do I need a website first?
  **A:** You need a page that matches the ad: offer, price and an easy way to get in touch. If your current site is slow or unclear, we can build a landing page from $600 — see website development.
- **Q:** Do you work with businesses outside Ukraine?
  **A:** Yes. We run campaigns for clients in Ukraine and the EU, including Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Communication is in English or Ukrainian, by Telegram, WhatsApp or call.

**9. related-services** — Other ways to get customers · `<section>`

- _[sec-label]_ RELATED SERVICES
- **H2:** Other ways to get customers
- Картка-посилання → `/en/services/meta-ads/`:
  - 01
  - **H3:** Facebook and Instagram ads
  - Pixel, Conversions API, audiences and creatives. Setup from $250.
  - Learn more →
- Картка-посилання → `/en/services/seo/`:
  - 02
  - **H3:** SEO services
  - Organic traffic that does not stop when the budget does. From $150/month.
  - Learn more →
- Картка-посилання → `/en/services/websites/`:
  - 03
  - **H3:** Website development
  - Landing pages built for paid traffic. From $600.
  - Learn more →

**10. cta** — Ready to launch Google Ads? · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ GOOGLE
- **H2:** Ready to launch Google Ads?
- Tell us about your business and target market. We reply within 15 minutes during working hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «VIBER» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380 68 828 6969» → `tel:+380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (7, дослівно)

1. **How much does Google Ads management cost?**

   Setup starts from $300 as a one-off payment. Monthly management starts from $200, or from $500/month for large budgets and e-commerce. The ad budget is paid to Google separately and is not part of our fee.

2. **What ad budget do I need?**

   We suggest starting from $300/month. With less, campaigns collect data slowly and it takes longer to see which keywords bring enquiries. Before launch we estimate realistic click costs for your niche and country.

3. **How soon will I see results?**

   Search ads can start showing as soon as Google approves them. The first weeks are about collecting data; we judge campaigns by enquiries and sales over several weeks, not by the first few days of clicks.

4. **Do you guarantee leads or the first position?**

   No. Nobody can honestly guarantee positions or a number of leads: competition, click prices and your offer all play a part. What we do commit to is transparent work — you own the account, see every change and get a monthly report.

5. **Will the Google Ads account be mine?**

   Yes. The Google Ads account, GA4 property and all data stay in your name. We work through manager access, and if we stop working together, everything stays with you.

6. **Do I need a website first?**

   You need a page that matches the ad: offer, price and an easy way to get in touch. If your current site is slow or unclear, we can build a landing page from $600 — see website development.

7. **Do you work with businesses outside Ukraine?**

   Yes. We run campaigns for clients in Ukraine and the EU, including Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Communication is in English or Ukrainian, by Telegram, WhatsApp or call.


#### Внутрішні посилання з контенту (4)

- «Infinite Union pricing» → `/en/pricing/` · блок 6
- «portfolio» → `/en/portfolio/` · блок 7
- «website development» → `/en/services/websites/` · блок 8
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`, «VIBER» → `viber://chat?number=%2B380688286969`, «+380 68 828 6969» → `tel:+380688286969`

---

### /en/services/meta-ads/ — Meta Ads

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/meta-ads/ |
| Мова | en |
| Пара | uk: `/services/meta-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (60) | Facebook & Instagram Ads Agency — from $250 \| Infinite Union |
| Description (154) | Facebook and Instagram advertising: Pixel and Conversions API, audiences, creatives, retargeting, clear reports. Setup from $250, management from $200/mo. |
| Головний ключ | Facebook and Instagram ads agency |
| H1 | Facebook and Instagram ads agency |
| Слів | 1008 |
| JSON | `design-content/en__services__meta-ads.json` |

**Хлібні крихти:** Home (`/en/`) › Meta Ads

#### Блоки (10)

**1. hero** — Facebook and Instagram ads agency · `<section .hero>`

- _[hm-val]_ $250
- _[hm-key]_ Setup
- _[hm-sub]_ one-off, from
- _[hm-val]_ $200
- _[hm-key]_ Management
- _[hm-sub]_ per month, from
- _[hm-val]_ $300
- _[hm-key]_ Ad budget
- _[hm-sub]_ per month, suggested start
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 01
- _[hero-label]_ FACEBOOK · INSTAGRAM · REELS
- **H1:** Facebook and Instagram ads agency
- Infinite Union is a Facebook and Instagram ads agency from Kharkiv, Ukraine, working with small businesses across the EU. We set up Meta Pixel and Conversions API, build audiences, prepare creatives and run campaigns in Feed, Stories and Reels. Setup from $250, management from $200/month, ad budget paid separately.
- _[hero-stat-num]_ $250
- _[hero-stat-label]_ setup, from
- _[hero-stat-num]_ $200/mo
- _[hero-stat-label]_ management, from
- _[hero-stat-num]_ 15min
- _[hero-stat-label]_ reply time, working hours

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ FACEBOOK ADS →INSTAGRAM ADS →REELS →STORIES →RETARGETING →LOOKALIKE →META PIXEL →CONVERSIONS API →FACEBOOK ADS →INSTAGRAM ADS →REELS →STORIES →RETARGETING →LOOKALIKE →META PIXEL →CONVERSIONS API →

**3. problem** — Boosted posts are not a strategy · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** Boosted posts are not a strategy
- Many businesses start with the Boost button on Instagram. It brings likes and profile visits, but rarely enquiries, because the campaign is optimised for engagement, not for leads or sales. Meta never learns who actually contacted you or bought something.
- Browser tracking alone also misses part of your conversions since the privacy changes on iOS and in browsers. If Pixel events are set up incorrectly, the algorithm learns from incomplete data and shows ads to the wrong people. So the fix starts with the technical part — correct events, Conversions API, a clear funnel — and only then comes the budget.

**4. included-cards** — What a Facebook and Instagram ads agency does · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What a Facebook and Instagram ads agency does
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Pixel and Conversions API
- _[service-desc]_ We set up Meta Pixel and server-side Conversions API for the events that matter — lead, purchase, add to cart, message — and check event deduplication in Events Manager before any money is spent.
- _[service-tags]_ Meta Pixel · Conversions API · Events Manager
- _[service-num]_ 02
- **H3:** Instagram ads: Reels, Stories, Feed
- _[service-desc]_ Instagram needs vertical, native-looking creatives. We plan formats per placement: short Reels videos, Stories with one clear call to action, and carousels for products or services.
- _[service-tags]_ Reels · Stories · Carousel
- _[service-num]_ 03
- **H3:** Audiences and retargeting
- _[service-desc]_ Broad and interest audiences for cold traffic, lookalikes from your customer list, and retargeting for site visitors, video viewers and people who opened a lead form but did not send it.
- _[service-tags]_ Custom Audiences · Lookalike · Advantage+
- _[service-num]_ 04
- **H3:** Creatives and testing
- _[service-desc]_ We write ad copy, design static banners and prepare video scripts, or brief your designer. New creatives are tested in small batches, and only the ones that bring enquiries get more budget.
- _[service-tags]_ Ad copy · Banners · Video scripts

**5. process** — Four steps to a working funnel · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** Four steps to a working funnel
- _[process-dot]_ 01
- **H3:** Brief and research
- _[process-item-desc]_ Your offer and audience, competitors' ads in the Meta Ad Library, your current account if you have one.
- _[process-time]_ 1–2 days
- _[process-dot]_ 02
- **H3:** Tracking and setup
- _[process-item-desc]_ Business Manager, Pixel, Conversions API, audiences and the first campaigns.
- _[process-time]_ 2–3 days
- _[process-dot]_ 03
- **H3:** Testing
- _[process-item-desc]_ Several audiences and creatives run side by side to find what brings enquiries.
- _[process-time]_ 1–2 weeks
- _[process-dot]_ 04
- **H3:** Scaling
- _[process-item-desc]_ Budget moves to what works, weak ads are paused, new creatives are added.
- _[process-time]_ Ongoing

**6. pricing-cards** — Meta Ads pricing · `<section>`

- _[sec-label]_ PRICING
- **H2:** Meta Ads pricing
- _[декор, aria-hidden]_ ↗
- _[service-num]_ TIER 01
- **H3:** Setup — from $250
- _[service-desc]_ One-off. Business Manager and ad account check, Pixel and Conversions API, audiences, campaign structure and launch.
- _[service-tags]_ One-off
- _[service-num]_ TIER 02
- **H3:** Management — from $200/month
- _[service-desc]_ Ongoing optimisation, creative tests, audience updates and a monthly report with the same numbers you see in Ads Manager.
- _[service-tags]_ Monthly
- _[service-num]_ TIER 03
- **H3:** E-commerce — from $400/month
- _[service-desc]_ Product catalog, dynamic ads for people who viewed or added products to cart, Advantage+ shopping campaigns.
- _[service-num]_ BUDGET
- **H3:** Ad budget — paid to Meta
- _[service-desc]_ Your ad budget is charged by Meta directly and is never mixed with our fee. We suggest starting from $300/month.
- _[service-tags]_ Separate
- All our prices in one place: pricing for websites, bots, ads and SEO.

**7. portfolio** — Tools we built for advertising · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Tools we built for advertising
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** InfinityCreo
- _[service-desc]_ Our AI tool for ad creatives, built on n8n and available as @infinitycreo_bot. It goes from a short brief to a finished banner in about 3 minutes and supports 10+ formats, which makes it faster to prepare variations for testing.
- _[service-tags]_ n8n · AI · Telegram bot
- _[service-num]_ 02
- **H3:** Ad Tracker by IU
- _[service-desc]_ A dashboard in development that shows Meta, Google and TikTok campaigns in one window, with auto-refresh every 2 hours and 90 days of history.
- _[service-tags]_ Reporting · Dashboard
- See the rest of our work in the portfolio.

**8. faq** — Questions we get asked · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Questions we get asked
- **Q:** How much does a Facebook and Instagram ads agency cost?
  **A:** With us, setup starts from $250 one-off, and management from $200/month; e-commerce management starts from $400/month. The ad budget goes to Meta directly and is not part of our fee.
- **Q:** What is the minimum ad budget?
  **A:** We suggest from $300/month. A smaller budget makes it hard to test several audiences and creatives at the same time, so the learning phase takes longer.
- **Q:** Can you run Instagram ads only?
  **A:** Yes. In Ads Manager we can choose placements, so a campaign can run only in Instagram Feed, Stories and Reels. Whether Facebook placements are worth adding is a decision we make based on your data.
- **Q:** Do you create the ads?
  **A:** Yes: copy, static banners and video scripts. Filming with real people or products is usually done by you or a creator; we provide a script and a shot list.
- **Q:** Is my type of business allowed?
  **A:** Meta has special rules for categories such as finance, employment, housing, health, alcohol and gambling. Some need extra verification or have limited targeting. We check this before setup.
- **Q:** Do you guarantee leads or ROAS?
  **A:** No. Results depend on your offer, prices, market and budget. We commit to correct tracking, regular testing and honest reporting.
- **Q:** Will the ad account be mine?
  **A:** Yes. Everything stays in your Business Manager, and we work through partner access. If we stop working together, your account, audiences and data remain yours.

**9. related-services** — Other channels worth testing · `<section>`

- _[sec-label]_ RELATED SERVICES
- **H2:** Other channels worth testing
- Картка-посилання → `/en/services/google-ads/`:
  - 01
  - **H3:** Google Ads management
  - Search and Performance Max for people already looking for you. Setup from $300.
  - Learn more →
- Картка-посилання → `/en/services/tiktok-ads/`:
  - 02
  - **H3:** TikTok ads
  - In-Feed and Spark Ads with UGC-style video. Setup from $250.
  - Learn more →
- Картка-посилання → `/en/services/websites/`:
  - 03
  - **H3:** Landing pages
  - A page built for ad traffic, from $600.
  - Learn more →

**10. cta** — Let's plan your Meta Ads · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ ADS
- **H2:** Let's plan your Meta Ads
- Tell us about your business and target market. We reply within 15 minutes during working hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «VIBER» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380 68 828 6969» → `tel:+380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (7, дослівно)

1. **How much does a Facebook and Instagram ads agency cost?**

   With us, setup starts from $250 one-off, and management from $200/month; e-commerce management starts from $400/month. The ad budget goes to Meta directly and is not part of our fee.

2. **What is the minimum ad budget?**

   We suggest from $300/month. A smaller budget makes it hard to test several audiences and creatives at the same time, so the learning phase takes longer.

3. **Can you run Instagram ads only?**

   Yes. In Ads Manager we can choose placements, so a campaign can run only in Instagram Feed, Stories and Reels. Whether Facebook placements are worth adding is a decision we make based on your data.

4. **Do you create the ads?**

   Yes: copy, static banners and video scripts. Filming with real people or products is usually done by you or a creator; we provide a script and a shot list.

5. **Is my type of business allowed?**

   Meta has special rules for categories such as finance, employment, housing, health, alcohol and gambling. Some need extra verification or have limited targeting. We check this before setup.

6. **Do you guarantee leads or ROAS?**

   No. Results depend on your offer, prices, market and budget. We commit to correct tracking, regular testing and honest reporting.

7. **Will the ad account be mine?**

   Yes. Everything stays in your Business Manager, and we work through partner access. If we stop working together, your account, audiences and data remain yours.


#### Внутрішні посилання з контенту (3)

- «pricing for websites, bots, ads and SEO» → `/en/pricing/` · блок 6
- «portfolio» → `/en/portfolio/` · блок 7
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`, «VIBER» → `viber://chat?number=%2B380688286969`, «+380 68 828 6969» → `tel:+380688286969`

---

### /en/services/tiktok-ads/ — TikTok Ads

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/tiktok-ads/ |
| Мова | en |
| Пара | uk: `/services/tiktok-ads/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (44) | TikTok Ads Agency — Campaign Setup from $250 |
| Description (135) | TikTok advertising for business: In-Feed and Spark Ads, TikTok Pixel, UGC-style creatives. Setup from $250, management from $150/month. |
| Головний ключ | TikTok ads agency |
| H1 | TikTok ads agency |
| Слів | 942 |
| JSON | `design-content/en__services__tiktok-ads.json` |

**Хлібні крихти:** Home (`/en/`) › TikTok Ads

#### Блоки (10)

**1. hero** — TikTok ads agency · `<section .hero>`

- _[hm-val]_ $250
- _[hm-key]_ Setup
- _[hm-sub]_ one-off, from
- _[hm-val]_ $150
- _[hm-key]_ Management
- _[hm-sub]_ per month, from
- _[hm-val]_ $200
- _[hm-key]_ Ad budget
- _[hm-sub]_ per month, minimum
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 04
- _[hero-label]_ IN-FEED · SPARK ADS · TIKTOK PIXEL
- **H1:** TikTok ads agency
- Infinite Union is a TikTok ads agency based in Kharkiv, Ukraine. We launch In-Feed and Spark Ads for small businesses in the EU and Ukraine: TikTok Pixel and events, audiences, UGC-style video scripts and weekly optimisation. Setup from $250, management from $150/month, ad budget from $200/month paid separately.
- _[hero-stat-num]_ $250
- _[hero-stat-label]_ setup, from
- _[hero-stat-num]_ $150/mo
- _[hero-stat-label]_ management, from
- _[hero-stat-num]_ $200/mo
- _[hero-stat-label]_ minimum ad budget

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ TIKTOK ADS →IN-FEED ADS →SPARK ADS →UGC VIDEO →TIKTOK PIXEL →EVENTS API →CREATIVE TESTING →LEAD GENERATION →TIKTOK ADS →IN-FEED ADS →SPARK ADS →UGC VIDEO →TIKTOK PIXEL →EVENTS API →CREATIVE TESTING →LEAD GENERATION →

**3. problem** — TikTok skips ads that look like ads · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** TikTok skips ads that look like ads
- Polished TV-style videos and recycled Instagram banners usually get scrolled past on TikTok in the first second. The platform rewards content that looks native: vertical, fast, with a real person talking and a clear hook at the start.
- The second problem is data. Without TikTok Pixel and correct events, campaigns optimise for cheap views, and you get reach without enquiries. A TikTok ads agency has to fix both sides at once: the creative approach and the signals the algorithm learns from.

**4. included-cards** — What our TikTok ads agency work covers · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What our TikTok ads agency work covers
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** In-Feed Ads
- _[service-desc]_ Native video ads in the For You feed, with campaign objectives set for traffic, leads or sales — not just views. Each campaign has a clear target action and a landing page or form to match.
- _[service-tags]_ In-Feed · Lead generation · Website conversions
- _[service-num]_ 02
- **H3:** Spark Ads
- _[service-desc]_ We promote your own posts, or a creator's posts with their permission, as ads. Likes, comments and follows stay on the original post, so paid reach also builds your profile.
- _[service-tags]_ Spark Ads · Creator posts
- _[service-num]_ 03
- **H3:** UGC-style scripts
- _[service-desc]_ Hooks, scripts and shot lists for 15–30 second videos that you or a creator can film on a phone. One idea becomes several variations with different hooks to test.
- _[service-tags]_ Hooks · Scripts · Shot lists
- _[service-num]_ 04
- **H3:** TikTok Pixel and events
- _[service-desc]_ Pixel and Events API setup for leads, purchases and messages, checked in TikTok Events Manager before launch, so you can see what the ads actually bring.
- _[service-tags]_ TikTok Pixel · Events API

**5. process** — From idea to first tests · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** From idea to first tests
- _[process-dot]_ 01
- **H3:** Strategy
- _[process-item-desc]_ Your niche on TikTok, competitors' content, formats and audiences to start with.
- _[process-time]_ 2–3 days
- _[process-dot]_ 02
- **H3:** Content
- _[process-item-desc]_ Scripts and briefs for UGC-style videos, or a selection of posts for Spark Ads.
- _[process-time]_ 3–5 days
- _[process-dot]_ 03
- **H3:** Launch
- _[process-item-desc]_ Ad account, Pixel, conversion events and the first campaigns.
- _[process-time]_ 1–2 days
- _[process-dot]_ 04
- **H3:** Optimisation
- _[process-item-desc]_ New creatives every cycle, budget moves to the ads that bring enquiries.
- _[process-time]_ Ongoing

**6. pricing-cards** — TikTok Ads pricing · `<section>`

- _[sec-label]_ PRICING
- **H2:** TikTok Ads pricing
- _[декор, aria-hidden]_ ↗
- _[service-num]_ TIER 01
- **H3:** Setup — from $250
- _[service-desc]_ One-off. Ad account, TikTok Pixel and events, audiences, campaign structure, first creative brief and launch.
- _[service-tags]_ One-off
- _[service-num]_ TIER 02
- **H3:** Management — from $150/month
- _[service-desc]_ Creative testing, budget and targeting changes, new script ideas every cycle and a monthly report.
- _[service-tags]_ Monthly
- _[service-num]_ BUDGET
- **H3:** Ad budget — from $200/month
- _[service-desc]_ The ad budget is paid to TikTok directly. Below about $200/month there is too little data to compare creatives properly.
- _[service-tags]_ Separate
- _[service-num]_ NOTE
- **H3:** Not included
- _[service-desc]_ Video production on location, actors and creator fees. We can help you find a creator, but their fee is agreed with them separately.
- Compare with our other services on the pricing page.

**7. portfolio** — Our own tools for ad work · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** Our own tools for ad work
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** InfinityCreo
- _[service-desc]_ AI generator of ad creatives (@infinitycreo_bot) built on n8n: about 3 minutes from brief to banner, 10+ formats. Handy for static cover images and test variations alongside video.
- _[service-tags]_ n8n · AI creatives
- _[service-num]_ 02
- **H3:** Ad Tracker by IU
- _[service-desc]_ TikTok, Meta and Google Ads results in one dashboard, refreshed every 2 hours, with 90 days of history. Currently in development.
- _[service-tags]_ Reporting
- Websites, bots and other projects are in our portfolio.

**8. faq** — Questions we get asked · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Questions we get asked
- **Q:** Is TikTok advertising available in the EU and Ukraine?
  **A:** Yes, TikTok Ads Manager is available for businesses in Ukraine and in most EU countries. Some ad categories and targeting options differ by country, so we check the rules for your market before setup.
- **Q:** How much does a TikTok ads agency cost?
  **A:** With us, setup starts from $250 and management from $150/month. The ad budget is separate, with a minimum of about $200/month, and is paid directly to TikTok.
- **Q:** Is TikTok right for my business?
  **A:** It works best for consumer products and services with a visual story: e-commerce, beauty, fitness, food, education, events. For narrow B2B services, Google Ads usually fits better, and we will tell you so.
- **Q:** Do I need a TikTok account?
  **A:** You need a TikTok Business account to run Spark Ads with your own posts. Standard In-Feed ads can run without active posting, but a profile with a few real videos makes people trust the ad more.
- **Q:** Who films the videos?
  **A:** Usually you, your team or a creator, on a phone. We write the hooks, scripts and shot lists, so filming takes a few hours, not days.
- **Q:** How quickly will we know if it works?
  **A:** The first week is a learning phase while TikTok tests your ads on different people. We evaluate creatives after one to two weeks and decide by cost per lead or sale, not by views.

**9. related-services** — Other ad channels · `<section>`

- _[sec-label]_ RELATED SERVICES
- **H2:** Other ad channels
- Картка-посилання → `/en/services/meta-ads/`:
  - 01
  - **H3:** Facebook and Instagram ads
  - Reels, Stories and retargeting. Setup from $250.
  - Learn more →
- Картка-посилання → `/en/services/google-ads/`:
  - 02
  - **H3:** Google Ads management
  - Search campaigns for high-intent queries. Setup from $300.
  - Learn more →
- Картка-посилання → `/en/services/websites/`:
  - 03
  - **H3:** Landing pages
  - A fast mobile page for TikTok traffic. From $600.
  - Learn more →

**10. cta** — Start with TikTok ads · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ TIKTOK
- **H2:** Start with TikTok ads
- Tell us about your business and target market. We reply within 15 minutes during working hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «VIBER» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380 68 828 6969» → `tel:+380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (6, дослівно)

1. **Is TikTok advertising available in the EU and Ukraine?**

   Yes, TikTok Ads Manager is available for businesses in Ukraine and in most EU countries. Some ad categories and targeting options differ by country, so we check the rules for your market before setup.

2. **How much does a TikTok ads agency cost?**

   With us, setup starts from $250 and management from $150/month. The ad budget is separate, with a minimum of about $200/month, and is paid directly to TikTok.

3. **Is TikTok right for my business?**

   It works best for consumer products and services with a visual story: e-commerce, beauty, fitness, food, education, events. For narrow B2B services, Google Ads usually fits better, and we will tell you so.

4. **Do I need a TikTok account?**

   You need a TikTok Business account to run Spark Ads with your own posts. Standard In-Feed ads can run without active posting, but a profile with a few real videos makes people trust the ad more.

5. **Who films the videos?**

   Usually you, your team or a creator, on a phone. We write the hooks, scripts and shot lists, so filming takes a few hours, not days.

6. **How quickly will we know if it works?**

   The first week is a learning phase while TikTok tests your ads on different people. We evaluate creatives after one to two weeks and decide by cost per lead or sale, not by views.


#### Внутрішні посилання з контенту (4)

- «pricing page» → `/en/pricing/` · блок 6
- «portfolio» → `/en/portfolio/` · блок 7
- «Google Ads» → `/en/services/google-ads/` · блок 8
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`, «VIBER» → `viber://chat?number=%2B380688286969`, «+380 68 828 6969» → `tel:+380688286969`

---

### /en/services/seo/ — SEO services

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/services/seo/ |
| Мова | en |
| Пара | uk: `/services/seo/` |
| Шаблон | **service** |
| Robots | index, follow |
| Title (60) | SEO Services from Ukraine — from $150/month \| Infinite Union |
| Description (154) | SEO services: technical audit, keyword research, site structure, content, link building and monthly reports. From $150/month, first results in 3–6 months. |
| Головний ключ | SEO services Ukraine |
| H1 | SEO services from Ukraine |
| Слів | 1143 |
| JSON | `design-content/en__services__seo.json` |

**Хлібні крихти:** Home (`/en/`) › SEO services

#### Блоки (10)

**1. hero** — SEO services from Ukraine · `<section .hero>`

- _[hm-val]_ $150
- _[hm-key]_ SEO
- _[hm-sub]_ per month, from
- _[hm-val]_ $100
- _[hm-key]_ Audit
- _[hm-sub]_ one-off, from
- _[hm-val]_ 3–6
- _[hm-key]_ Months
- _[hm-sub]_ to first results
- _[декор, aria-hidden]_ SCROLL
- _[декор, aria-hidden]_ 03
- _[hero-label]_ TECHNICAL SEO · CONTENT · LOCAL SEO
- **H1:** SEO services from Ukraine
- SEO services from Ukraine for small businesses in the EU and Ukraine. Infinite Union, an agency in Kharkiv, handles technical SEO, keyword research, site structure, content and local SEO for Google Maps. SEO from $150/month, audits from $100. First results usually take 3–6 months, and we never promise rankings.
- _[hero-stat-num]_ $150/mo
- _[hero-stat-label]_ SEO, from
- _[hero-stat-num]_ $100
- _[hero-stat-label]_ SEO audit, from
- _[hero-stat-num]_ 3–6mo
- _[hero-stat-label]_ to first results

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ TECHNICAL SEO →KEYWORD RESEARCH →CONTENT →LINK BUILDING →CORE WEB VITALS →SCHEMA.ORG →LOCAL SEO →GOOGLE BUSINESS PROFILE →TECHNICAL SEO →KEYWORD RESEARCH →CONTENT →LINK BUILDING →CORE WEB VITALS →SCHEMA.ORG →LOCAL SEO →GOOGLE BUSINESS PROFILE →

**3. problem** — Your site exists. Google ignores it. · `<section>`

- _[sec-label]_ THE PROBLEM
- **H2:** Your site exists. Google ignores it.
- A familiar picture: the website looks fine, but brings almost no search traffic. Some pages are not indexed, titles are duplicated, the site is slow on mobile, and the texts do not match what people actually type into Google. Each page tries to rank for everything and ends up ranking for nothing.
- SEO fixes this step by step: technical problems first, then structure and keywords, then content and links. It is slower than ads, but the traffic does not vanish the moment you pause a budget. That is why we combine SEO with paid ads when a business needs enquiries now.

**4. included-cards** — What our SEO services include · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What our SEO services include
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** SEO audit
- _[service-desc]_ A technical and on-page check: indexing, crawl errors, speed and Core Web Vitals, mobile version, duplicates, meta tags and structured data. You get a prioritised list of fixes you can hand to any developer.
- _[service-tags]_ Indexing · Core Web Vitals · Structured data
- _[service-num]_ 02
- **H3:** Keyword research and structure
- _[service-desc]_ We collect search queries for your languages and markets, group them by intent and map each group to one page. Missing pages go into a content plan.
- _[service-tags]_ Keyword research · Clustering · Site structure
- _[service-num]_ 03
- **H3:** On-page and content
- _[service-desc]_ Titles, headings, internal links and texts written for people first. We improve existing pages and create new ones only where there is real search demand.
- _[service-tags]_ On-page SEO · Content plan
- _[service-num]_ 04
- **H3:** Local SEO
- _[service-desc]_ Google Business Profile, categories, photos, a process for collecting reviews, consistent name, address and phone across listings, and local landing pages for each city or branch.
- _[service-tags]_ Google Business Profile · Google Maps · Local pages
- _[service-num]_ 05
- **H3:** Link building
- _[service-desc]_ Careful, relevant links: industry directories, partner sites, guest articles. No link farms or schemes that put your site at risk of penalties.
- _[service-tags]_ Relevant links · Digital PR
- _[service-num]_ 06
- **H3:** Monthly reporting
- _[service-desc]_ A short report based on Google Search Console and GA4: impressions, clicks, pages that grew or dropped, what we did and what comes next.
- _[service-tags]_ Search Console · GA4

**5. process** — SEO in four stages · `<section>`

- _[sec-label]_ HOW WE WORK
- **H2:** SEO in four stages
- _[process-dot]_ 01
- **H3:** Audit
- _[process-item-desc]_ Technical audit of the site and a look at competitors in your niche.
- _[process-time]_ 3–5 days
- _[process-dot]_ 02
- **H3:** Strategy
- _[process-item-desc]_ Keyword map, priorities and a content plan for the next months.
- _[process-time]_ 1 week
- _[process-dot]_ 03
- **H3:** Optimisation
- _[process-item-desc]_ Technical fixes, page optimisation, first new pages.
- _[process-time]_ 1–2 months
- _[process-dot]_ 04
- **H3:** Growth
- _[process-item-desc]_ New content, links, wider keyword coverage, monthly review.
- _[process-time]_ Ongoing

**6. pricing-cards** — SEO, audit and local SEO pricing · `<section>`

- _[sec-label]_ PRICING
- **H2:** SEO, audit and local SEO pricing
- _[декор, aria-hidden]_ ↗
- _[service-num]_ SEO
- **H3:** SEO — from $150/month
- _[service-desc]_ Ongoing technical work, content and links, monthly report. First results usually in 3–6 months.
- _[service-tags]_ Monthly
- _[service-num]_ AUDIT
- **H3:** Basic SEO audit — from $100
- _[service-desc]_ Up to 50 pages, ready in 3 days. Technical issues and a prioritised list of fixes.
- _[service-tags]_ One-off · 3 days
- **H3:** Full SEO audit — from $300
- _[service-desc]_ Technical, on-page and content audit with keyword gaps and competitor comparison. Ready in 5 days.
- _[service-tags]_ One-off · 5 days
- _[service-num]_ LOCAL
- **H3:** Local SEO start — from $200
- _[service-desc]_ One-off Google Business Profile setup or clean-up, categories, listings and a local landing page plan.
- _[service-tags]_ One-off
- **H3:** Local Pro — from $150/month
- _[service-desc]_ Ongoing local SEO for one location: profile updates, posts, reviews workflow, local pages.
- **H3:** Multi-location — from $400/month
- _[service-desc]_ Local SEO for a network of branches, with a separate profile and page for each location.
- Website, bot and advertising prices are on the pricing page.

**7. portfolio** — SEO built into real projects · `<section>`

- _[sec-label]_ FROM OUR PORTFOLIO
- **H2:** SEO built into real projects
- _[декор, aria-hidden]_ ↗
- _[service-num]_ 01
- **H3:** Transfer Kharkiv
- _[service-desc]_ Landing page for a transfer company: static HTML/CSS/JS for speed and SEO built in from the start. It holds 119+ search positions in Google's top results, converts at 8.4% and passes bookings to a Telegram bot.
- _[service-tags]_ Static HTML · SEO · Telegram bot
- _[service-num]_ 02
- **H3:** Respect Car
- _[service-desc]_ Website for a car dealership in Kharkiv — sales, buyback and imports from the USA — with a live photo catalog and a Telegram admin panel. Built on Next.js, React, PostgreSQL and Cloudflare: a fast technical base is where SEO starts.
- _[service-tags]_ Next.js · Cloudflare
- Full case list in our portfolio.

**8. faq** — Questions we get asked · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Questions we get asked
- **Q:** How long does SEO take to show results?
  **A:** Usually 3–6 months for the first noticeable results. It depends on competition, the age of the site and how many technical issues need fixing first.
- **Q:** How much do your SEO services cost?
  **A:** SEO starts from $150/month. A basic audit is from $100 (up to 50 pages, 3 days), a full audit from $300 (5 days). Local SEO starts from $200 one-off, $150/month for one location or $400/month for a network of branches.
- **Q:** Do you guarantee top positions?
  **A:** No, and be careful with anyone who does. Google's algorithms and your competitors change all the time. We commit to a clear plan, monthly work you can check, and reports based on Search Console data.
- **Q:** Should I start with an audit or monthly SEO?
  **A:** If you are not sure what is wrong with the site, start with an audit. It gives a list of fixes your own developer can implement. Monthly SEO makes sense when you want us to do the work and keep growing the site.
- **Q:** Can you do SEO for sites in German, Polish or English?
  **A:** Yes. Keyword research is done separately for each language and country. Texts in a language we do not write natively should be reviewed by a native speaker — on your side or a translator you trust.
- **Q:** What do you need from us?
  **A:** Access to the website admin or code, Google Search Console and GA4. If they are not set up yet, we set them up at the start.
- **Q:** Is local SEO worth it for a small business?
  **A:** If your customers come from one city or area — a clinic, a salon, a repair service, a restaurant — Google Maps is often where they find you. A complete, active Google Business Profile is one of the most practical things to fix first.

**9. related-services** — Works well together with SEO · `<section>`

- _[sec-label]_ RELATED SERVICES
- **H2:** Works well together with SEO
- Картка-посилання → `/en/services/websites/`:
  - 01
  - **H3:** Website development
  - Fast sites with SEO basics built in. From $600.
  - Learn more →
- Картка-посилання → `/en/services/google-ads/`:
  - 02
  - **H3:** Google Ads management
  - Enquiries while SEO is still growing. Setup from $300.
  - Learn more →
- Картка-посилання → `/en/pricing/`:
  - 03
  - **H3:** Full pricing
  - Every service and starting price on one page.
  - Learn more →

**10. cta** — Let's grow your organic traffic · `<section#contact .cta-final>`

- _[декор, aria-hidden]_ SEO
- **H2:** Let's grow your organic traffic
- Tell us about your business and target market. We reply within 15 minutes during working hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «VIBER» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380 68 828 6969» → `tel:+380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (7, дослівно)

1. **How long does SEO take to show results?**

   Usually 3–6 months for the first noticeable results. It depends on competition, the age of the site and how many technical issues need fixing first.

2. **How much do your SEO services cost?**

   SEO starts from $150/month. A basic audit is from $100 (up to 50 pages, 3 days), a full audit from $300 (5 days). Local SEO starts from $200 one-off, $150/month for one location or $400/month for a network of branches.

3. **Do you guarantee top positions?**

   No, and be careful with anyone who does. Google's algorithms and your competitors change all the time. We commit to a clear plan, monthly work you can check, and reports based on Search Console data.

4. **Should I start with an audit or monthly SEO?**

   If you are not sure what is wrong with the site, start with an audit. It gives a list of fixes your own developer can implement. Monthly SEO makes sense when you want us to do the work and keep growing the site.

5. **Can you do SEO for sites in German, Polish or English?**

   Yes. Keyword research is done separately for each language and country. Texts in a language we do not write natively should be reviewed by a native speaker — on your side or a translator you trust.

6. **What do you need from us?**

   Access to the website admin or code, Google Search Console and GA4. If they are not set up yet, we set them up at the start.

7. **Is local SEO worth it for a small business?**

   If your customers come from one city or area — a clinic, a salon, a repair service, a restaurant — Google Maps is often where they find you. A complete, active Google Business Profile is one of the most practical things to fix first.


#### Внутрішні посилання з контенту (3)

- «pricing page» → `/en/pricing/` · блок 6
- «portfolio» → `/en/portfolio/` · блок 7
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`, «VIBER» → `viber://chat?number=%2B380688286969`, «+380 68 828 6969» → `tel:+380688286969`

---

## 7.3 Шаблон: cluster

### /services/websites-landing/ — Лендінг під ключ

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/websites-landing/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/websites/`) |
| Robots | index, follow |
| Title (47) | Створення лендингу під ключ — від $600, 10 днів |
| Description (149) | Створення лендингу під рекламу: структура під конверсію, унікальний дизайн, форма з передачею заявок у Telegram чи CRM. Запуск від 10 днів, від $600. |
| Головний ключ | створення лендингу |
| Вторинні ключі | створення лендингу, лендінг під ключ, landing page, односторінковий сайт, лендінг під рекламу |
| H1 | Створення лендингу під рекламу і заявки. |
| Слів | 859 |
| JSON | `design-content/services__websites-landing.json` |

**Хлібні крихти:** Головна (`/`) › Розробка сайтів (`/services/websites/`) › Лендінг під ключ

#### Блоки (10)

**1. hero** — Створення лендингу під рекламу і заявки. · `<section .hero>`

- _[hero-badge]_ СТВОРЕННЯ ЛЕНДИНГУ · START ДО 10 ДНІВ
- **H1:** Створення лендингу під рекламу і заявки.
- Створення лендингу під ключ від агенції Infinite Union з Харкова. Одна сторінка під одну пропозицію: структура, дизайн, форма із заявками в Telegram чи CRM. Для запуску реклами, нової послуги або акції. Від $600, запуск — до 10 днів.
- ОБГОВОРИТИ ЛЕНДИНГ
- _[hm-val]_ $600
- _[hm-key]_ ЦІНА ВІД
- _[hm-val]_ 10дн
- _[hm-key]_ ЗАПУСК START
- _[hm-val]_ 5–7
- _[hm-key]_ СЕКЦІЙ У START
- _[hm-val]_ 8.4%
- _[hm-key]_ КОНВЕРСІЯ TRANSFER KHARKIV

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ ОДИН ОФЕР· ЗАЯВКИ В TELEGRAM· MOBILE-FIRST· БАЗОВЕ SEO· ШВИДКЕ ЗАВАНТАЖЕННЯ· CRM ІНТЕГРАЦІЯ· ВІД $600· ОДИН ОФЕР· ЗАЯВКИ В TELEGRAM· MOBILE-FIRST· БАЗОВЕ SEO· ШВИДКЕ ЗАВАНТАЖЕННЯ· CRM ІНТЕГРАЦІЯ· ВІД $600·

**3. problem** — Реклама працює, а заявок мало · `<section .wireframe-section>`

- _[sec-label]_ НАВІЩО ОКРЕМИЙ ЛЕНДИНГ
- **H2:** Реклама працює, а заявок мало
- Найчастіше рекламу ведуть на головну сторінку сайту або в Instagram-профіль. Людина приходить по конкретну послугу, бачить десять розділів, меню й новини — і закриває вкладку. Ви платите за клік, а заявки не отримуєте.
- Лендинг вирішує це одним сценарієм: одна пропозиція, одна аудиторія, одна дія. Кожен блок відповідає на питання, яке клієнт ставить собі перед заявкою.
- Список:
  - Офер у першому екраніЩо ви пропонуєте, для кого, за скільки і що зробити далі — зрозуміло без прокрутки.
  - Структура під запереченняЦіна, терміни, гарантії процесу, приклади робіт і FAQ — у тому порядку, в якому виникають сумніви.
  - Заявка не губитьсяФорма надсилає звернення в Telegram менеджеру або в CRM, а не на пошту, яку перевіряють раз на день.
- _[декор, aria-hidden]_ WIREFRAME · LIVE

**4. included-cards** — Що ви отримуєте разом із лендингом · `<section .anatomy>`

- _[sec-label]_ ЩО ВХОДИТЬ У СТВОРЕННЯ ЛЕНДИНГУ
- **H2:** Що ви отримуєте разом із лендингом
- _[anatomy-num]_ 01
- **H3:** Структура і прототип
- _[anatomy-desc]_ Розбираємо продукт, аудиторію та рекламний канал, складаємо порядок блоків і тексти-каркас. Ви погоджуєте прототип ще до дизайну, тож переробок на фінальному етапі мінімум.
- _[anatomy-tags]_ Бриф · Прототип · Офер
- _[anatomy-num]_ 02
- **H3:** Унікальний дизайн
- _[anatomy-desc]_ Малюємо з нуля, без шаблонів. Спершу мобільна версія: трафік із Meta Ads і TikTok майже весь мобільний. Потім адаптуємо під планшет і ПК.
- _[anatomy-tags]_ Figma · Mobile-first · Адаптив
- _[anatomy-num]_ 03
- **H3:** Верстка і швидкість
- _[anatomy-desc]_ Верстаємо на чистому HTML/CSS/JS — без важких конструкторів. Сторінка швидко відкривається навіть на мобільному інтернеті, а це напряму впливає на вартість кліка й кількість заявок.
- _[anatomy-tags]_ HTML/CSS/JS · Core Web Vitals · Cloudflare
- _[anatomy-num]_ 04
- **H3:** Форма, аналітика, SEO
- _[anatomy-desc]_ Форма із захистом від спаму і передачею заявок у Telegram або CRM. Підключаємо аналітику та події для реклами, налаштовуємо мета-теги, розмітку й sitemap. Місяць підтримки після запуску.
- _[anatomy-tags]_ Telegram / CRM · Аналітика · Базове SEO

**5. pricing-tiers** — Ціна створення лендингу · `<section .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна створення лендингу
- Ціни «від» — точну суму називаємо після брифінгу. Хостинг, домен і рекламний бюджет — окремо.
- **H3:** Start
- _[level-price]_ від $600
- _[level-note]_ 5–7 секцій · до 10 днів
- Список:
  - Унікальний дизайн
  - Адаптивна верстка
  - Форма із заявками в Telegram
  - Базова SEO-оптимізація
  - Підключення аналітики
  - 1 місяць підтримки
  - Складні анімації
  - Кілька мов
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-landing/#contact`
- _[level-badge]_ ДЛЯ РЕКЛАМИ
- **H3:** Pro
- _[level-price]_ від $1 200
- _[level-note]_ 10+ секцій · до 3 тижнів
- Список:
  - Усе з тарифу Start
  - Розширена структура з кейсами і FAQ
  - Анімації та інтерактивні блоки
  - Інтеграція з CRM
  - Події для Google Ads і Meta Pixel
  - 1 місяць підтримки
  - Кілька мов
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-landing/#contact`
- **H3:** Max
- _[level-price]_ від $2 000
- _[level-note]_ складні сценарії · термін після брифу
- Список:
  - Усе з тарифу Pro
  - Кілька мов
  - 3D, WebGL, складна анімація
  - Калькулятор, квіз або онлайн-оплата
  - Зв'язка з Telegram-ботом
  - 1 місяць підтримки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-landing/#contact`

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Start | від $600 · 5–7 секцій · до 10 днів | 5–7 секцій · до 10 днів | Унікальний дизайн; Адаптивна верстка; Форма із заявками в Telegram; Базова SEO-оптимізація; Підключення аналітики; 1 місяць підтримки; Складні анімації; Кілька мов |
| Pro _(ДЛЯ РЕКЛАМИ)_ | від $1 200 · 10+ секцій · до 3 тижнів | 10+ секцій · до 3 тижнів | Усе з тарифу Start; Розширена структура з кейсами і FAQ; Анімації та інтерактивні блоки; Інтеграція з CRM; Події для Google Ads і Meta Pixel; 1 місяць підтримки; Кілька мов |
| Max | від $2 000 · складні сценарії · термін після брифу | — | Усе з тарифу Pro; Кілька мов; 3D, WebGL, складна анімація; Калькулятор, квіз або онлайн-оплата; Зв'язка з Telegram-ботом; 1 місяць підтримки |

**6. process** — Лендинг Start за 10 днів · `<section .process>`

- _[sec-label]_ ЕТАПИ
- **H2:** Лендинг Start за 10 днів
- _[pstep-dot]_ 01
- _[pstep-name]_ Брифінг
- _[pstep-desc]_ Продукт, аудиторія, рекламний канал, конкуренти
- _[pstep-time]_ День 1
- _[pstep-dot]_ 02
- _[pstep-name]_ Прототип
- _[pstep-desc]_ Порядок блоків і тексти-каркас на погодження
- _[pstep-time]_ День 2–3
- _[pstep-dot]_ 03
- _[pstep-name]_ Дизайн
- _[pstep-desc]_ Мобільна і десктопна версії в Figma
- _[pstep-time]_ День 3–6
- _[pstep-dot]_ 04
- _[pstep-name]_ Верстка
- _[pstep-desc]_ Код, форма, інтеграція з Telegram чи CRM
- _[pstep-time]_ День 6–9
- _[pstep-dot]_ 05
- _[pstep-name]_ Тест і запуск
- _[pstep-desc]_ Перевірка на пристроях, аналітика, публікація
- _[pstep-time]_ День 10

**7. portfolio** — Лендинг Transfer Kharkiv · `<section .conv-section>`

- _[sec-label]_ ПРИКЛАД З ПОРТФОЛІО
- **H2:** Лендинг Transfer Kharkiv
- Лендинг трансферної компанії з Харкова. Статичний HTML/CSS/JS, SEO-оптимізація та Telegram-бот на Python, який приймає заявки цілодобово. Інші роботи — у портфоліо.
- _[cs-val]_ 8.4%
- _[cs-key]_ Конверсія
- _[cs-val]_ 119+
- _[cs-key]_ SEO-позицій у топі
- _[cs-val]_ 24/7
- _[cs-key]_ Заявки через бот
- _[cs-val]_ HTML/JS
- _[cs-key]_ Стек без конструктора

**8. faq** — Питання про створення лендингу · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про створення лендингу
- **Q:** Скільки коштує створення лендингу?
  **A:** Start — від $600 (5–7 секцій), Pro — від $1 200 (10+ секцій), Max — від $2 000. У ціну входять дизайн, верстка, форма, базове SEO і місяць підтримки. Хостинг, домен і рекламний бюджет оплачуються окремо. Порівняти з іншими типами сайтів можна на сторінці цін.
- **Q:** За скільки днів буде готовий лендинг?
  **A:** Start — до 10 днів, Pro — до 3 тижнів, термін Max визначаємо після брифінгу. Відлік починається, коли ви передали матеріали: тексти чи інформацію про продукт, фото, логотип.
- **Q:** Яку конверсію дасть мій лендинг?
  **A:** Конкретних цифр не обіцяємо: конверсія залежить від оферу, ціни і якості трафіку не менше, ніж від дизайну. Для орієнтиру: лендинг Transfer Kharkiv конвертує 8.4%. Ми робимо структуру й технічну основу, на якій реклама може окупатися.
- **Q:** Куди приходять заявки з форми?
  **A:** Туди, де їх швидко оброблять: у Telegram менеджеру, у CRM або в обидва місця. Форму захищаємо від спаму, щоб у чат не сипалися порожні заявки.
- **Q:** Чи налаштуєте рекламу на лендинг?
  **A:** Так, це окрема послуга: Google Ads — налаштування від $300, таргет у Facebook та Instagram — від $250. Рекламний бюджет оплачуєте напряму. Події для аналітики на лендингу закладаємо ще під час розробки.
- **Q:** Що, якщо потрібна не одна сторінка?
  **A:** Якщо у вас кілька послуг, команда, кейси й блог, вам підійде корпоративний сайт — від $1 000. Для продажу товарів з кошиком і оплатою — інтернет-магазин.
- **Q:** Як відбувається оплата?
  **A:** Поетапно: зазвичай 50% на старті, 50% після здачі. Після запуску передаємо вам весь код і доступи.

**9. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/websites/`:
  - Усі види сайтів
  - Розробка сайтів
  - Детальніше →
- Картка-посилання → `/services/websites-corporate/`:
  - Від $1 000
  - Корпоративні сайти
  - Детальніше →
- Картка-посилання → `/services/google-ads/`:
  - Трафік на лендинг
  - Google Ads
  - Детальніше →
- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - Блог
  - Ціни на сайти у 2026
  - Читати →

**10. cta** — Замовте лендинг · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ПОЧАТИ?
- **H2:** Замовте лендинг
- Розкажіть, що й кому продаєте, — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (7, дослівно)

1. **Скільки коштує створення лендингу?**

   Start — від $600 (5–7 секцій), Pro — від $1 200 (10+ секцій), Max — від $2 000. У ціну входять дизайн, верстка, форма, базове SEO і місяць підтримки. Хостинг, домен і рекламний бюджет оплачуються окремо. Порівняти з іншими типами сайтів можна на сторінці цін.

2. **За скільки днів буде готовий лендинг?**

   Start — до 10 днів, Pro — до 3 тижнів, термін Max визначаємо після брифінгу. Відлік починається, коли ви передали матеріали: тексти чи інформацію про продукт, фото, логотип.

3. **Яку конверсію дасть мій лендинг?**

   Конкретних цифр не обіцяємо: конверсія залежить від оферу, ціни і якості трафіку не менше, ніж від дизайну. Для орієнтиру: лендинг Transfer Kharkiv конвертує 8.4%. Ми робимо структуру й технічну основу, на якій реклама може окупатися.

4. **Куди приходять заявки з форми?**

   Туди, де їх швидко оброблять: у Telegram менеджеру, у CRM або в обидва місця. Форму захищаємо від спаму, щоб у чат не сипалися порожні заявки.

5. **Чи налаштуєте рекламу на лендинг?**

   Так, це окрема послуга: Google Ads — налаштування від $300, таргет у Facebook та Instagram — від $250. Рекламний бюджет оплачуєте напряму. Події для аналітики на лендингу закладаємо ще під час розробки.

6. **Що, якщо потрібна не одна сторінка?**

   Якщо у вас кілька послуг, команда, кейси й блог, вам підійде корпоративний сайт — від $1 000. Для продажу товарів з кошиком і оплатою — інтернет-магазин.

7. **Як відбувається оплата?**

   Поетапно: зазвичай 50% на старті, 50% після здачі. Після запуску передаємо вам весь код і доступи.


#### Внутрішні посилання з контенту (11)

- «ОБГОВОРИТИ ЛЕНДИНГ» → `/services/websites-landing/#contact` · блок 1
- «ОБГОВОРИТИ» → `/services/websites-landing/#contact` · блок 5
- «ОБГОВОРИТИ» → `/services/websites-landing/#contact` · блок 5
- «ОБГОВОРИТИ» → `/services/websites-landing/#contact` · блок 5
- «портфоліо» → `/portfolio/` · блок 7
- «цін» → `/pricing/` · блок 8
- «Google Ads» → `/services/google-ads/` · блок 8
- «таргет у Facebook та Instagram» → `/services/meta-ads/` · блок 8
- «корпоративний сайт» → `/services/websites-corporate/` · блок 8
- «інтернет-магазин» → `/services/websites-shop/` · блок 8
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/websites-shop/ — Інтернет-магазин

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/websites-shop/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/websites/`) |
| Robots | index, follow |
| Title (54) | Інтернет-магазин під ключ — від $1200 \| Infinite Union |
| Description (144) | Розробка інтернет-магазину під ключ: каталог, фільтри, кошик, оплата LiqPay/WayForPay, Нова Пошта, адмінка. Запуск від 3 тижнів, ціна від $1200. |
| Головний ключ | інтернет-магазин під ключ |
| Вторинні ключі | інтернет-магазин під ключ, створення інтернет-магазину, розробка інтернет-магазину, магазин з оплатою LiqPay / Нова Пошта |
| H1 | Інтернет-магазин під ключ |
| Слів | 910 |
| JSON | `design-content/services__websites-shop.json` |

**Хлібні крихти:** Головна (`/`) › Розробка сайтів (`/services/websites/`) › Інтернет-магазин

#### Блоки (12)

**1. hero** — Інтернет-магазин під ключ · `<section .hero>`

- _[hero-tag]_ E-COMMERCE · START ЗА ~3 ТИЖНІ
- **H1:** Інтернет-магазин під ключ
- Розробка інтернет-магазину під ключ від агенції Infinite Union з Харкова: каталог, фільтри, кошик, оплата через LiqPay, WayForPay чи Monobank, доставка Новою Поштою і зручна адмінка. Для брендів і магазинів, яким тісно на маркетплейсах і в Instagram. Від $1 200, запуск — від 3 тижнів.
- Посилання/кнопка: «ОБГОВОРИТИ МАГАЗИН» → `/services/websites-shop/#contact`
- Посилання/кнопка: «ПОДИВИТИСЬ ЦІНИ» → `/services/websites-shop/#levels`

**2. stats** · `<div .stats-bar>`

- _[stat-val]_ $1 200
- _[stat-key]_ ЦІНА ВІД
- _[stat-val]_ 3тж
- _[stat-key]_ ЗАПУСК START
- _[stat-val]_ 4
- _[stat-key]_ ПЛАТІЖНІ СИСТЕМИ НА ВИБІР
- _[stat-val]_ 1міс
- _[stat-key]_ ПІДТРИМКИ В ЦІНІ

**3. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ КАТАЛОГ І ФІЛЬТРИ· LIQPAY · WAYFORPAY· MONOBANK· КОШИК І CHECKOUT· NOVA POSHTA API· SEO ДЛЯ КАТАЛОГУ· АДМІНКА· КАТАЛОГ І ФІЛЬТРИ· LIQPAY · WAYFORPAY· MONOBANK· КОШИК І CHECKOUT· NOVA POSHTA API· SEO ДЛЯ КАТАЛОГУ· АДМІНКА·

**4. problem** — Замовлення в Direct і таблиці — це стеля · `<section .tech>`

- _[sec-label]_ КОЛИ ПОТРІБЕН ВЛАСНИЙ МАГАЗИН
- **H2:** Замовлення в Direct і таблиці — це стеля
- Поки товарів двадцять, можна приймати замовлення в месенджерах і вести залишки в Excel. Далі починаються помилки: продали те, чого немає на складі, забули відправити, клієнт не дочекався відповіді й купив у конкурента. Маркетплейс бере комісію і не дає вам контактів покупця.
- Власний інтернет-магазин під ключ забирає рутину: покупець сам обирає товар, оплачує, отримує ТТН, а ви бачите замовлення в адмінці чи в Telegram. Технології підбираємо під обсяг каталогу:
- _[tech-name]_ Next.js + React
- _[tech-role]_ Вітрина і каталог
- _[tech-name]_ TypeScript
- _[tech-role]_ Надійний код
- _[tech-name]_ PostgreSQL
- _[tech-role]_ Товари й замовлення
- _[tech-name]_ Redis
- _[tech-role]_ Кеш і черги
- _[tech-name]_ FastAPI
- _[tech-role]_ API та інтеграції
- _[tech-name]_ Cloudflare
- _[tech-role]_ CDN і захист

**5. included-cards** — Інтернет-магазин під ключ: з чого він складається · `<section .features>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Інтернет-магазин під ключ: з чого він складається
- **H3:** Каталог і фільтри
- _[feat-desc]_ Категорії, варіанти товару (розмір, колір), фільтри й пошук. Картка товару з фото, характеристиками й наявністю.
- _[feat-num]_ 01
- **H3:** Кошик і оформлення
- _[feat-desc]_ Короткий шлях від товару до оплати: мінімум полів, вибір відділення Нової Пошти, промокоди. Кошик зберігається, якщо покупець повернувся пізніше.
- _[feat-num]_ 02
- **H3:** Онлайн-оплата
- _[feat-desc]_ LiqPay, WayForPay, Monobank — для України, Stripe — для покупців з ЄС. Накладений платіж Новою Поштою — за потреби.
- _[feat-num]_ 03
- **H3:** Замовлення в CRM і Telegram
- _[feat-desc]_ Нове замовлення одразу з'являється в адмінці, CRM або в Telegram-чаті менеджера. Статуси оновлюються, і нічого не губиться між месенджерами.
- _[feat-num]_ 04
- **H3:** Мобільна версія
- _[feat-desc]_ Дизайн починаємо з телефона: великі кнопки, швидкі фото, зручний фільтр однією рукою. Десктоп — друга ітерація, а не навпаки.
- _[feat-num]_ 05
- **H3:** SEO для каталогу
- _[feat-desc]_ Розмітка Schema.org для товарів, окремі URL для категорій і фільтрів, sitemap каталогу, мета-теги, що генеруються з назви й ціни.
- _[feat-num]_ 06

**6. pricing-tiers** — Скільки коштує інтернет-магазин · `<section#levels .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Скільки коштує інтернет-магазин
- **H3:** Start
- _[level-price]_ від $1 200
- _[level-note]_ до 100 товарів · ~3 тижні
- Список:
  - Унікальний дизайн
  - Каталог і фільтри
  - Кошик і оформлення замовлення
  - 1 платіжна система
  - Адмінка для товарів
  - Замовлення в Telegram
  - 1 місяць підтримки
  - Nova Poshta API
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-shop/#contact`
- _[level-badge]_ ДЛЯ ЗРОСТАННЯ
- **H3:** Pro
- _[level-price]_ від $2 500
- _[level-note]_ без обмежень за товарами · ~5 тижнів
- Список:
  - Усе з тарифу Start
  - Необмежений каталог
  - Nova Poshta API: відділення й ТТН
  - Кілька платіжних систем
  - Інтеграція з CRM
  - Промокоди та знижки
  - Аналітика продажів і події для реклами
  - 1 місяць підтримки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-shop/#contact`
- **H3:** Маркетплейс
- _[level-price]_ від $5 000
- _[level-note]_ кілька продавців · термін після брифу
- Список:
  - Кабінети продавців
  - Модерація товарів
  - Розподіл оплат
  - Кілька мов і валют
  - Інтеграції за ТЗ
  - 1 місяць підтримки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-shop/#contact`
- Хостинг, домен і комісії платіжних систем — окремо. Підтримка після першого місяця — від $150/міс. Порівняти з цінами на інші сайти можна на сторінці цін, а ринкові вилки — у статті «Ціни на сайти у 2026».

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Start | від $1 200 · до 100 товарів · ~3 тижні | до 100 товарів · ~3 тижні | Унікальний дизайн; Каталог і фільтри; Кошик і оформлення замовлення; 1 платіжна система; Адмінка для товарів; Замовлення в Telegram; 1 місяць підтримки; Nova Poshta API |
| Pro _(ДЛЯ ЗРОСТАННЯ)_ | від $2 500 · без обмежень за товарами · ~5 тижнів | без обмежень за товарами · ~5 тижнів | Усе з тарифу Start; Необмежений каталог; Nova Poshta API: відділення й ТТН; Кілька платіжних систем; Інтеграція з CRM; Промокоди та знижки; Аналітика продажів і події для реклами; 1 місяць підтримки |
| Маркетплейс | від $5 000 · кілька продавців · термін після брифу | — | Кабінети продавців; Модерація товарів; Розподіл оплат; Кілька мов і валют; Інтеграції за ТЗ; 1 місяць підтримки |

**7. tech-stack** — Що підключаємо до магазину · `<section .integrations>`

- _[sec-label]_ ІНТЕГРАЦІЇ
- **H2:** Що підключаємо до магазину
- _[int-name]_ WayForPay
- _[int-type]_ Оплата карткою
- _[int-name]_ LiqPay
- _[int-name]_ Stripe
- _[int-type]_ Оплата з ЄС
- _[int-name]_ Нова Пошта
- _[int-type]_ Відділення і ТТН
- _[int-name]_ CRM
- _[int-type]_ Замовлення і статуси
- _[int-name]_ Google Analytics
- _[int-type]_ Аналітика продажів
- _[int-name]_ Meta Pixel
- _[int-type]_ Реклама і ретаргетинг
- _[int-name]_ Telegram-бот
- _[int-type]_ Сповіщення про замовлення

**8. process** — Від каталогу до першого замовлення · `<section .process>`

- _[sec-label]_ ЕТАПИ
- **H2:** Від каталогу до першого замовлення
- _[pstep-dot]_ 01
- _[pstep-name]_ Брифінг
- _[pstep-desc]_ Асортимент, структура каталогу, оплата і доставка
- _[pstep-time]_ 1–2 дні
- _[pstep-dot]_ 02
- _[pstep-name]_ Прототип
- _[pstep-desc]_ Каталог, картка товару, кошик, оформлення
- _[pstep-time]_ 3–5 днів
- _[pstep-dot]_ 03
- _[pstep-name]_ Дизайн і розробка
- _[pstep-desc]_ Вітрина, адмінка, оплата, доставка, CRM
- _[pstep-time]_ від 2 тижнів
- _[pstep-dot]_ 04
- _[pstep-name]_ Наповнення і тести
- _[pstep-desc]_ Імпорт товарів, тестові оплати й замовлення
- _[pstep-time]_ 2–4 дні
- _[pstep-dot]_ 05
- _[pstep-name]_ Запуск
- _[pstep-desc]_ Публікація, аналітика, передача доступів
- _[pstep-time]_ 1 день

**9. portfolio** — Каталог Respect Car · `<section .tech>`

- _[sec-label]_ ПРИКЛАД З ПОРТФОЛІО
- **H2:** Каталог Respect Car
- Сайт автомайданчика в Харкові: продаж, викуп та імпорт авто зі США. Живий каталог авто з фото, а оголошеннями менеджери керують через адмінку в Telegram — без входу в окрему панель. Стек: Next.js 16, React 19, TypeScript, PostgreSQL, Redis, Cloudinary, Cloudflare. На такому ж стеку ми будуємо інтернет-магазини. Інші роботи — у портфоліо.

**10. faq** — Питання про інтернет-магазини · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про інтернет-магазини
- **Q:** Скільки коштує інтернет-магазин під ключ?
  **A:** Start на каталог до 100 товарів — від $1 200, Pro без обмежень за товарами і з Nova Poshta API — від $2 500, маркетплейс — від $5 000. У ціну входять дизайн, верстка, базове SEO, інтеграція з Telegram або CRM і місяць підтримки. Хостинг і домен — окремо.
- **Q:** Скільки часу займає розробка?
  **A:** Start — близько 3 тижнів, Pro — близько 5 тижнів. Терміни маркетплейсу визначаємо після брифінгу. На швидкість сильно впливає, як швидко готові фото й описи товарів.
- **Q:** Чи зможу я сам додавати товари й змінювати ціни?
  **A:** Так. Ви отримуєте адмінку, де додаєте товари, міняєте ціни й наявність, бачите замовлення. Технічні знання не потрібні. Покажемо, як нею користуватися, під час здачі проєкту.
- **Q:** Які платіжні системи підключаєте?
  **A:** LiqPay, WayForPay і Monobank — для покупців з України, Stripe — для продажу в ЄС. Договір з платіжною системою укладаєте ви, ми робимо технічне підключення.
- **Q:** Чи інтегруєте Нову Пошту?
  **A:** Так, у тарифі Pro: вибір міста й відділення при оформленні, створення ТТН з адмінки і номер відправлення для покупця.
- **Q:** Чи можна перенести товари з Prom, Хорошопа чи WooCommerce?
  **A:** Так, переносимо товари, категорії й фото. Налаштовуємо переадресації зі старих адрес, щоб зберегти накопичений пошуковий трафік. Обсяг переносу оцінюємо на брифінгу.
- **Q:** Хто приведе покупців після запуску?
  **A:** Можемо взяти й це: SEO-просування — від $150/міс, таргет у Facebook та Instagram — налаштування від $250. Рекламний бюджет оплачуєте окремо.

**11. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/websites/`:
  - Усі види сайтів
  - Розробка сайтів
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Сторінка під акцію
  - Лендинги
  - Детальніше →
- Картка-посилання → `/services/bots-sales/`:
  - Продажі в чаті
  - Бот для продажів
  - Детальніше →
- Картка-посилання → `/services/seo/`:
  - Трафік у магазин
  - SEO просування
  - Детальніше →

**12. cta** — Обговоримо ваш магазин · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ПОЧАТИ?
- **H2:** Обговоримо ваш магазин
- Розкажіть, що продаєте і скільки товарів у каталозі, — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (7, дослівно)

1. **Скільки коштує інтернет-магазин під ключ?**

   Start на каталог до 100 товарів — від $1 200, Pro без обмежень за товарами і з Nova Poshta API — від $2 500, маркетплейс — від $5 000. У ціну входять дизайн, верстка, базове SEO, інтеграція з Telegram або CRM і місяць підтримки. Хостинг і домен — окремо.

2. **Скільки часу займає розробка?**

   Start — близько 3 тижнів, Pro — близько 5 тижнів. Терміни маркетплейсу визначаємо після брифінгу. На швидкість сильно впливає, як швидко готові фото й описи товарів.

3. **Чи зможу я сам додавати товари й змінювати ціни?**

   Так. Ви отримуєте адмінку, де додаєте товари, міняєте ціни й наявність, бачите замовлення. Технічні знання не потрібні. Покажемо, як нею користуватися, під час здачі проєкту.

4. **Які платіжні системи підключаєте?**

   LiqPay, WayForPay і Monobank — для покупців з України, Stripe — для продажу в ЄС. Договір з платіжною системою укладаєте ви, ми робимо технічне підключення.

5. **Чи інтегруєте Нову Пошту?**

   Так, у тарифі Pro: вибір міста й відділення при оформленні, створення ТТН з адмінки і номер відправлення для покупця.

6. **Чи можна перенести товари з Prom, Хорошопа чи WooCommerce?**

   Так, переносимо товари, категорії й фото. Налаштовуємо переадресації зі старих адрес, щоб зберегти накопичений пошуковий трафік. Обсяг переносу оцінюємо на брифінгу.

7. **Хто приведе покупців після запуску?**

   Можемо взяти й це: SEO-просування — від $150/міс, таргет у Facebook та Instagram — налаштування від $250. Рекламний бюджет оплачуєте окремо.


#### Внутрішні посилання з контенту (11)

- «ОБГОВОРИТИ МАГАЗИН» → `/services/websites-shop/#contact` · блок 1
- «ПОДИВИТИСЬ ЦІНИ» → `/services/websites-shop/#levels` · блок 1
- «ОБГОВОРИТИ» → `/services/websites-shop/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/websites-shop/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/websites-shop/#contact` · блок 6
- «цін» → `/pricing/` · блок 6
- ««Ціни на сайти у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 6
- «портфоліо» → `/portfolio/` · блок 9
- «SEO-просування» → `/services/seo/` · блок 10
- «таргет у Facebook та Instagram» → `/services/meta-ads/` · блок 10
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 12

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/websites-corporate/ — Корпоративний сайт

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/websites-corporate/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/websites/`) |
| Robots | index, follow |
| Title (56) | Корпоративний сайт під ключ — від $1000 \| Infinite Union |
| Description (147) | Корпоративний сайт компанії під ключ: 5–50+ сторінок, мультимовність, блог, CMS, заявки в CRM. Від $1000, запуск від 3 тижнів. Харків, Україна, ЄС. |
| Головний ключ | корпоративний сайт під ключ |
| Вторинні ключі | корпоративний сайт, сайт компанії, багатомовний сайт, B2B сайт |
| H1 | Корпоративний сайт під ключ |
| Слів | 827 |
| JSON | `design-content/services__websites-corporate.json` |

**Хлібні крихти:** Головна (`/`) › Розробка сайтів (`/services/websites/`) › Корпоративний сайт

#### Блоки (11)

**1. hero** — Корпоративний сайт під ключ · `<section .hero>`

- _[hero-eyebrow-text]_ КОРПОРАТИВНІ САЙТИ · B2B · КІЛЬКА МОВ
- **H1:** Корпоративний сайт під ключ
- Корпоративний сайт під ключ від агенції Infinite Union з Харкова — для компаній, які продають B2B, шукають партнерів у ЄС або просто переросли сайт-візитку. Від 5–8 сторінок за ~3 тижні до порталів на 50+ сторінок. Ціна — від $1 000.
- ОБГОВОРИТИ САЙТ КОМПАНІЇ
- _[trust-text]_ Від $1 0005–8 сторінок, ~3 тижні
- _[trust-text]_ Кілька мовUA / EN / PL / DE
- _[trust-text]_ Код і доступиПередаємо вам

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ САЙТ КОМПАНІЇ· КІЛЬКА МОВ· БЛОГ І НОВИНИ· B2B ЗАЯВКИ· КЕЙСИ І ПОСЛУГИ· SEO ДЛЯ КОЖНОЇ МОВИ· COOKIE І GDPR· САЙТ КОМПАНІЇ· КІЛЬКА МОВ· БЛОГ І НОВИНИ· B2B ЗАЯВКИ· КЕЙСИ І ПОСЛУГИ· SEO ДЛЯ КОЖНОЇ МОВИ· COOKIE І GDPR·

**3. problem** — Коли сайт компанії працює проти неї · `<section .pillars>`

- _[sec-label]_ ЩО НЕ ТАК ЗІ СТАРИМ САЙТОМ
- **H2:** Коли сайт компанії працює проти неї
- _[pillar-num]_ 01
- **H3:** Партнер не довіряє
- _[pillar-desc]_ Потенційний клієнт гуглить компанію перед зустріччю і бачить сайт 2015 року без мобільної версії. Перше враження зіпсоване ще до переговорів.
- _[pillar-num]_ 02
- **H3:** Немає англійської
- _[pillar-desc]_ Ви виходите на ринок ЄС, а сайт тільки українською. Іноземний закупівельник не розуміє, що ви робите, і йде до конкурента.
- _[pillar-num]_ 03
- **H3:** Послуги на одній сторінці
- _[pillar-desc]_ Усі напрями зібрані в один список. Google не розуміє, за якими запитами вас показувати, а клієнт не знаходить свою послугу.
- _[pillar-num]_ 04
- **H3:** Правки через розробника
- _[pillar-desc]_ Щоб додати новину чи вакансію, треба писати підряднику й чекати тиждень. Тому сайт роками стоїть без оновлень.

**4. included-cards** — Структура корпоративного сайту · `<section .org-section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Структура корпоративного сайту
- **H3:** Головна і «Про компанію»
- _[of-desc]_ Хто ви, для кого працюєте і чим відрізняєтесь. Команда, історія, документи, партнери — те, що перевіряють перед першим дзвінком.
- **H3:** Окрема сторінка на кожну послугу
- _[of-desc]_ Опис, етапи, ціни або умови, приклади робіт і форма заявки. Кожна сторінка — окрема точка входу з Google.
- **H3:** Блог, мови, заявки в CRM
- _[of-desc]_ Новини й статті, які ви публікуєте самі. Версії іншими мовами з окремими мета-тегами. Заявки з форм ідуть у CRM або в Telegram відділу продажів.

**5. pricing-tiers** — Ціна корпоративного сайту під ключ · `<section .types>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна корпоративного сайту під ключ
- **H3:** Представницький
- _[type-price]_ від $1 000
- _[type-note]_ 5–8 сторінок · ~3 тижні
- Список:
  - Головна, про компанію, контакти
  - Сторінки послуг або продуктів
  - Форма із заявками в Telegram або CRM
  - Адаптивна верстка
  - Базове SEO
  - 1 місяць підтримки
  - Кілька мов
  - Блог
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-corporate/#contact`
- _[type-label]_ ДЛЯ B2B І ЄС
- **H3:** Pro
- _[type-price]_ від $2 000
- _[type-note]_ 10–20 сторінок · 4–5 тижнів
- Список:
  - Повна структура розділів
  - 2–3 мови
  - Блог і новини з адмінкою
  - Кейси та портфоліо
  - Інтеграція з CRM
  - Аналітика і цілі
  - 1 місяць підтримки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-corporate/#contact`
- **H3:** Enterprise
- _[type-price]_ від $4 000
- _[type-note]_ 50+ сторінок · термін після брифу
- Список:
  - Сайт холдингу або групи компаній
  - Багато мов
  - Кабінет партнера чи дилера
  - Інтеграції з CRM та обліком
  - Власна адмінка
  - Cookie-банер і політика конфіденційності
  - 1 місяць підтримки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/websites-corporate/#contact`
- Хостинг і домен — окремо, підтримка після першого місяця — від $150/міс. Тексти-каркас і структуру даємо ми, повний копірайтинг і переклади рахуємо окремо. Усі ціни студії — на сторінці цін.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Представницький | від $1 000 · 5–8 сторінок · ~3 тижні | 5–8 сторінок · ~3 тижні | Головна, про компанію, контакти; Сторінки послуг або продуктів; Форма із заявками в Telegram або CRM; Адаптивна верстка; Базове SEO; 1 місяць підтримки; Кілька мов; Блог |
| Pro _(ДЛЯ B2B І ЄС)_ | від $2 000 · 10–20 сторінок · 4–5 тижнів | 10–20 сторінок · 4–5 тижнів | Повна структура розділів; 2–3 мови; Блог і новини з адмінкою; Кейси та портфоліо; Інтеграція з CRM; Аналітика і цілі; 1 місяць підтримки |
| Enterprise | від $4 000 · 50+ сторінок · термін після брифу | — | Сайт холдингу або групи компаній; Багато мов; Кабінет партнера чи дилера; Інтеграції з CRM та обліком; Власна адмінка; Cookie-банер і політика конфіденційності; 1 місяць підтримки |

**6. why-us** — Як ми працюємо з компаніями · `<section .trust-section>`

- _[sec-label]_ УМОВИ РОБОТИ
- **H2:** Як ми працюємо з компаніями
- _[tc-val]_ 50/50
- _[tc-key]_ ОПЛАТА ЕТАПАМИ
- _[tc-val]_ 100%
- _[tc-key]_ КОДУ Й ДОСТУПІВ — ВАШІ
- _[tc-val]_ 15хв
- _[tc-key]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС
- _[tc-val]_ 1міс
- _[tc-key]_ ПІДТРИМКИ ПІСЛЯ ЗАПУСКУ

**7. process** — Від брифу до запуску · `<section .process>`

- _[sec-label]_ ЕТАПИ
- **H2:** Від брифу до запуску
- _[pstep-dot]_ 01
- _[pstep-name]_ Брифінг
- _[pstep-desc]_ Цілі, аудиторії, ринки, конкуренти, список послуг
- _[pstep-time]_ 1–2 дні
- _[pstep-dot]_ 02
- _[pstep-name]_ Прототип
- _[pstep-desc]_ Карта сторінок і структура ключових шаблонів
- _[pstep-time]_ 3–5 днів
- _[pstep-dot]_ 03
- _[pstep-name]_ Дизайн і розробка
- _[pstep-desc]_ Дизайн у стилі бренду, верстка, адмінка, мови
- _[pstep-time]_ 2–4 тижні
- _[pstep-dot]_ 04
- _[pstep-name]_ Наповнення і тести
- _[pstep-desc]_ Контент, переклади, перевірка форм і швидкості
- _[pstep-time]_ 2–4 дні
- _[pstep-dot]_ 05
- _[pstep-name]_ Запуск
- _[pstep-desc]_ Публікація, аналітика, навчання роботі з адмінкою
- _[pstep-time]_ 1 день

**8. portfolio** — Сайт школи Parrot School · `<section .pillars>`

- _[sec-label]_ ПРИКЛАД З ПОРТФОЛІО
- **H2:** Сайт школи Parrot School
- Сайт школи англійської мови в Харкові, пов'язаний з Telegram-екосистемою: окремі сценарії для учнів, батьків і вчителів плюс адмін-бот для керування. Приклад того, як сайт компанії стає частиною робочих процесів, а не лише вітриною. Інші проєкти — у портфоліо; якщо вам потрібна саме зв'язка сайту, бота й CRM, подивіться автоматизацію бізнесу.

**9. faq** — Питання про корпоративні сайти · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про корпоративні сайти
- **Q:** Скільки коштує корпоративний сайт під ключ?
  **A:** Представницький сайт на 5–8 сторінок — від $1 000, Pro на 10–20 сторінок — від $2 000, Enterprise на 50+ сторінок — від $4 000. Ціна залежить від кількості сторінок і мов, інтеграцій та адмінки. Хостинг і домен — окремо.
- **Q:** Скільки триває розробка?
  **A:** Представницький — близько 3 тижнів, Pro — 4–5 тижнів. Терміни Enterprise визначаємо після брифінгу. Найчастіше запуск затримують не розробники, а погодження текстів усередині компанії, тому плануємо це окремим етапом.
- **Q:** Чи зможемо самі оновлювати новини й вакансії?
  **A:** Так, у тарифах Pro та Enterprise підключаємо адмінку: співробітник без технічних знань додає новини, кейси, вакансії й змінює тексти. Під час запуску показуємо, як нею користуватися.
- **Q:** Робите сайти кількома мовами?
  **A:** Так. Для кожної мови — окремі адреси сторінок, мета-теги й розмітка hreflang, щоб Google показував потрібну версію в Польщі, Німеччині чи Чехії. Переклад можете дати свій або замовити в нас окремо.
- **Q:** Що з GDPR для клієнтів з ЄС?
  **A:** Додаємо cookie-банер з вибором згоди, сторінку політики конфіденційності й форми, які збирають лише потрібні дані. Юридичний текст політики краще погодити з вашим юристом.
- **Q:** Чи допоможете з текстами?
  **A:** Структуру сторінок і тексти-каркас для ключових блоків робимо самі. Повний копірайтинг і переклади рахуємо окремо — або працюємо з вашими матеріалами.

**10. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/websites/`:
  - Усі види сайтів
  - Розробка сайтів
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Сторінка під одну послугу
  - Лендинги
  - Детальніше →
- Картка-посилання → `/services/seo/`:
  - Органічний трафік
  - SEO просування
  - Детальніше →
- Картка-посилання → `/blog/zamovyty-sayt-kharkiv/`:
  - Блог
  - Як вибрати веб-студію
  - Читати →

**11. cta** — Обговоримо сайт компанії · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ПОЧАТИ?
- **H2:** Обговоримо сайт компанії
- Розкажіть про компанію й ринки, на яких працюєте, — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує корпоративний сайт під ключ?**

   Представницький сайт на 5–8 сторінок — від $1 000, Pro на 10–20 сторінок — від $2 000, Enterprise на 50+ сторінок — від $4 000. Ціна залежить від кількості сторінок і мов, інтеграцій та адмінки. Хостинг і домен — окремо.

2. **Скільки триває розробка?**

   Представницький — близько 3 тижнів, Pro — 4–5 тижнів. Терміни Enterprise визначаємо після брифінгу. Найчастіше запуск затримують не розробники, а погодження текстів усередині компанії, тому плануємо це окремим етапом.

3. **Чи зможемо самі оновлювати новини й вакансії?**

   Так, у тарифах Pro та Enterprise підключаємо адмінку: співробітник без технічних знань додає новини, кейси, вакансії й змінює тексти. Під час запуску показуємо, як нею користуватися.

4. **Робите сайти кількома мовами?**

   Так. Для кожної мови — окремі адреси сторінок, мета-теги й розмітка hreflang, щоб Google показував потрібну версію в Польщі, Німеччині чи Чехії. Переклад можете дати свій або замовити в нас окремо.

5. **Що з GDPR для клієнтів з ЄС?**

   Додаємо cookie-банер з вибором згоди, сторінку політики конфіденційності й форми, які збирають лише потрібні дані. Юридичний текст політики краще погодити з вашим юристом.

6. **Чи допоможете з текстами?**

   Структуру сторінок і тексти-каркас для ключових блоків робимо самі. Повний копірайтинг і переклади рахуємо окремо — або працюємо з вашими матеріалами.


#### Внутрішні посилання з контенту (8)

- «ОБГОВОРИТИ САЙТ КОМПАНІЇ» → `/services/websites-corporate/#contact` · блок 1
- «ОБГОВОРИТИ» → `/services/websites-corporate/#contact` · блок 5
- «ОБГОВОРИТИ» → `/services/websites-corporate/#contact` · блок 5
- «ОБГОВОРИТИ» → `/services/websites-corporate/#contact` · блок 5
- «цін» → `/pricing/` · блок 5
- «портфоліо» → `/portfolio/` · блок 8
- «автоматизацію бізнесу» → `/services/ecosystems/` · блок 8
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/websites-kharkiv/ — Сайти в Харкові

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/websites-kharkiv/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/websites/`) |
| Robots | index, follow |
| Title (52) | Розробка сайту в Харкові — веб-студія Infinite Union |
| Description (140) | Розробка сайтів у Харкові: лендінги, корпоративні сайти, магазини для харківського бізнесу. Зустріч офлайн, договір, код ваш. Ціни від $600. |
| Головний ключ | розробка сайту Харків |
| Вторинні ключі | розробка сайту Харків, створення сайтів Харків, веб-студія Харків (головна теж бере брендовий «веб-студія Харків» — головна = бренд+загальне, ця сторінка = локальний комерційний інтент) |
| H1 | Розробка сайту у Харкові |
| Слів | 885 |
| JSON | `design-content/services__websites-kharkiv.json` |

**Хлібні крихти:** Головна (`/`) › Розробка сайтів (`/services/websites/`) › Сайти в Харкові

#### Блоки (10)

**1. hero** — Розробка сайту у Харкові · `<section .hero>`

- _[hero-badge]_ ВЕБ-СТУДІЯ З ХАРКОВА · ЗУСТРІЧ ОФЛАЙН
- **H1:** Розробка сайту у Харкові
- Infinite Union — веб-студія з Харкова. Розробка сайту для харківського бізнесу: лендинги, сайти компаній, інтернет-магазини. Зустрічаємося особисто в Харкові, працюємо за договором з оплатою етапами, код і доступи передаємо вам. Ціни — від $600.
- ДОМОВИТИСЬ ПРО ЗУСТРІЧ
- _[hm-val]_ $600
- _[hm-key]_ САЙТ ВІД
- _[hm-val]_ 50/50
- _[hm-key]_ ОПЛАТА ЕТАПАМИ
- _[hm-val]_ 15хв
- _[hm-key]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС
- _[hm-val]_ 1міс
- _[hm-key]_ ПІДТРИМКИ В ЦІНІ

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ ХАРКІВ· ЗУСТРІЧ ОФЛАЙН· ДОГОВІР· КОД ВАШ· GOOGLE MAPS· ЛЕНДИНГИ · МАГАЗИНИ· САЙТИ КОМПАНІЙ· ХАРКІВ· ЗУСТРІЧ ОФЛАЙН· ДОГОВІР· КОД ВАШ· GOOGLE MAPS· ЛЕНДИНГИ · МАГАЗИНИ· САЙТИ КОМПАНІЙ·

**3. why-us** — Розробник поруч, а не «десь онлайн» · `<section .wireframe-section>`

- _[sec-label]_ ЧОМУ СТУДІЯ З ХАРКОВА
- **H2:** Розробник поруч, а не «десь онлайн»
- Багато власників харківського бізнесу вже обпікалися: замовили сайт у фрилансера з оголошення, віддали передоплату — і за місяць не отримали ні сайту, ні відповіді в месенджері. Віддалено важко зрозуміти, хто стоїть за підрядником.
- Ми працюємо з Харкова і не ховаємося за чатом. Перед стартом можна зустрітися, подивитися на людей, які робитимуть ваш сайт, і обговорити задачу за кавою, а не в довгому листуванні.
- Список:
  - Зустріч офлайн у ХарковіНа старті та під час здачі проєкту, решта — у Telegram чи по відеозв'язку, як вам зручніше.
  - Договір і оплата етапамиФіксуємо обсяг робіт, терміни й вартість. Зазвичай 50% на старті, 50% після здачі.
  - Знаємо місцевий ринокРобили сайти для харківських трансферу, автомайданчика і школи англійської — розуміємо, як тут шукають послуги.
- _[декор, aria-hidden]_ WIREFRAME · LIVE

**4. included-cards** — Який сайт потрібен вашому бізнесу в Харкові · `<section .anatomy>`

- _[sec-label]_ ЩО МИ РОБИМО ДЛЯ ХАРКІВСЬКОГО БІЗНЕСУ
- **H2:** Який сайт потрібен вашому бізнесу в Харкові
- _[anatomy-num]_ 01
- **H3:** Лендинг під послугу
- _[anatomy-desc]_ Для майстрів, клінік, СТО, курсів, які запускають рекламу на Харків і хочуть отримувати дзвінки й заявки з однієї сторінки. Від $600, до 10 днів. Детальніше про лендинги.
- _[anatomy-tags]_ Реклама · Заявки · Від $600
- _[anatomy-num]_ 02
- **H3:** Сайт компанії
- _[anatomy-desc]_ Для виробництв, юристів, будівельних і логістичних компаній, які працюють з партнерами по Україні та в ЄС. Кілька послуг, кейси, англійська версія. Від $1 000. Про корпоративні сайти.
- _[anatomy-tags]_ B2B · Кілька мов · Від $1 000
- _[anatomy-num]_ 03
- **H3:** Інтернет-магазин
- _[anatomy-desc]_ Для харківських магазинів і брендів, які продають по всій Україні: каталог, онлайн-оплата, Нова Пошта. Від $1 200, запуск від 3 тижнів. Про інтернет-магазини.
- _[anatomy-tags]_ Каталог · Оплата · Від $1 200
- _[anatomy-num]_ 04
- **H3:** Google Maps і локальний пошук
- _[anatomy-desc]_ Коли клієнт шукає «поруч» чи «у Харкові», Google показує карту з компаніями. Налаштуємо профіль компанії, локальні сторінки й відгуки. Старт від $200. Про локальне SEO.
- _[anatomy-tags]_ Google Maps · Локальне SEO · Від $200

**5. portfolio** — Сайти, які ми зробили в Харкові · `<section .conv-section>`

- _[sec-label]_ ХАРКІВСЬКІ ПРОЄКТИ
- **H2:** Сайти, які ми зробили в Харкові
- Transfer Kharkiv — лендинг трансферної компанії: конверсія 8.4%, 119+ SEO-позицій у топі, заявки приймає Telegram-бот цілодобово.
- Respect Car — сайт автомайданчика: продаж, викуп та імпорт авто зі США, живий каталог із фото й адмінка в Telegram. Next.js, TypeScript, PostgreSQL.
- Parrot School — сайт школи англійської та Telegram-екосистема для учнів, батьків і вчителів з окремим адмін-ботом. Деталі — у портфоліо.
- _[cs-val]_ 8.4%
- _[cs-key]_ Конверсія Transfer Kharkiv
- _[cs-val]_ 119+
- _[cs-key]_ SEO-позицій Transfer Kharkiv
- _[cs-val]_ США
- _[cs-key]_ Імпорт авто в каталозі Respect Car
- _[cs-val]_ 3 ролі
- _[cs-key]_ Учні, батьки, вчителі в Parrot School

**6. pricing-tiers** — Ціни на розробку сайту в Харкові · `<section .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціни на розробку сайту в Харкові
- Ціни однакові для Харкова, інших міст і ЄС. Хостинг і домен — окремо.
- **H3:** Лендинг
- _[level-price]_ від $600
- _[level-note]_ 5–7 секцій · до 10 днів
- Список:
  - Зустріч у Харкові на старті
  - Дизайн під вашу послугу
  - Кнопки дзвінка й месенджерів
  - Заявки в Telegram
  - 1 місяць підтримки
- Посилання/кнопка: «ПРО ЛЕНДИНГИ» → `/services/websites-landing/`
- _[level-badge]_ ДЛЯ КОМПАНІЙ
- **H3:** Сайт компанії
- _[level-price]_ від $1 000
- _[level-note]_ 5–8 сторінок · ~3 тижні
- Список:
  - Зустрічі на старті й при здачі
  - Сторінка на кожну послугу
  - Адреса, карта, графік роботи
  - Заявки в CRM або Telegram
  - 1 місяць підтримки
- Посилання/кнопка: «ПРО КОРПОРАТИВНІ» → `/services/websites-corporate/`
- **H3:** Магазин
- _[level-price]_ від $1 200
- _[level-note]_ до 100 товарів · ~3 тижні
- Список:
  - Каталог і кошик
  - Онлайн-оплата
  - Самовивіз у Харкові або доставка
  - Адмінка для товарів
  - 1 місяць підтримки
- Посилання/кнопка: «ПРО МАГАЗИНИ» → `/services/websites-shop/`

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Лендинг | від $600 · 5–7 секцій · до 10 днів | 5–7 секцій · до 10 днів | Зустріч у Харкові на старті; Дизайн під вашу послугу; Кнопки дзвінка й месенджерів; Заявки в Telegram; 1 місяць підтримки |
| Сайт компанії _(ДЛЯ КОМПАНІЙ)_ | від $1 000 · 5–8 сторінок · ~3 тижні | 5–8 сторінок · ~3 тижні | Зустрічі на старті й при здачі; Сторінка на кожну послугу; Адреса, карта, графік роботи; Заявки в CRM або Telegram; 1 місяць підтримки |
| Магазин | від $1 200 · до 100 товарів · ~3 тижні | до 100 товарів · ~3 тижні | Каталог і кошик; Онлайн-оплата; Самовивіз у Харкові або доставка; Адмінка для товарів; 1 місяць підтримки |

**7. process** — Від зустрічі до запуску · `<section .process>`

- _[sec-label]_ ЯК МИ ПРАЦЮЄМО
- **H2:** Від зустрічі до запуску
- _[pstep-dot]_ 01
- _[pstep-name]_ Зустріч або дзвінок
- _[pstep-desc]_ Знайомимось у Харкові чи онлайн, розбираємо задачу
- _[pstep-time]_ 1–2 дні
- _[pstep-dot]_ 02
- _[pstep-name]_ Договір і прототип
- _[pstep-desc]_ Підписуємо договір, показуємо структуру сайту
- _[pstep-time]_ 3–5 днів
- _[pstep-dot]_ 03
- _[pstep-name]_ Дизайн і розробка
- _[pstep-desc]_ Показуємо проміжні результати, збираємо правки
- _[pstep-time]_ від 1 тижня
- _[pstep-dot]_ 04
- _[pstep-name]_ Тестування
- _[pstep-desc]_ Форми, швидкість, телефони й ПК
- _[pstep-time]_ 2–4 дні
- _[pstep-dot]_ 05
- _[pstep-name]_ Здача
- _[pstep-desc]_ Запуск, передача коду й доступів, навчання
- _[pstep-time]_ 1 день

**8. faq** — Питання про розробку сайту в Харкові · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про розробку сайту в Харкові
- **Q:** Чи можна зустрітися з вами особисто в Харкові?
  **A:** Так. Напишіть у Telegram або зателефонуйте — домовимося про зустріч у Харкові на зручний день. Зазвичай зустрічаємося на старті, щоб обговорити задачу, і під час здачі проєкту. Між зустрічами працюємо онлайн.
- **Q:** Ви працюєте за договором?
  **A:** Так. У договорі фіксуємо обсяг робіт, терміни, вартість і порядок оплати. Оплата поетапна: зазвичай 50% на старті і 50% після здачі. Після запуску передаємо весь код і доступи — сайт належить вам.
- **Q:** Скільки коштує розробка сайту в Харкові?
  **A:** Лендинг — від $600, сайт компанії — від $1 000, інтернет-магазин — від $1 200. Ціни не залежать від міста. Детальніше — на сторінці цін, а ринкові вилки — у статті «Ціни на сайти у 2026».
- **Q:** Допоможете з'явитися в Google Maps у Харкові?
  **A:** Так, це локальне SEO: оптимізуємо профіль компанії в Google, додаємо на сайт адресу, карту й локальні сторінки, налаштовуємо роботу з відгуками. Старт — від $200 разово, ведення — від $150/міс.
- **Q:** Ви працюєте тільки з харківськими компаніями?
  **A:** Ні, працюємо по всій Україні та з клієнтами з ЄС. Для Харкова перевага одна — можна зустрітися наживо. Процес, ціни й терміни ті самі.
- **Q:** Як перевірити веб-студію перед замовленням?
  **A:** Подивіться живі сайти з портфоліо, а не лише скриншоти, спитайте, кому належатимуть код і домен, і як розбита оплата. Повний чек-лист — у статті «Як вибрати веб-студію».

**9. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/websites/`:
  - Усі види сайтів
  - Розробка сайтів
  - Детальніше →
- Картка-посилання → `/services/seo-local/`:
  - Google Maps
  - Локальне SEO
  - Детальніше →
- Картка-посилання → `/services/google-ads/`:
  - Реклама на Харків
  - Google Ads
  - Детальніше →
- Картка-посилання → `/portfolio/`:
  - Наші роботи
  - Портфоліо
  - Дивитися →

**10. cta** — Зустрінемось у Харкові · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ПОЧАТИ?
- **H2:** Зустрінемось у Харкові
- Напишіть, який сайт потрібен, — відповімо протягом 15 хвилин у робочий час і домовимося про зустріч
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Чи можна зустрітися з вами особисто в Харкові?**

   Так. Напишіть у Telegram або зателефонуйте — домовимося про зустріч у Харкові на зручний день. Зазвичай зустрічаємося на старті, щоб обговорити задачу, і під час здачі проєкту. Між зустрічами працюємо онлайн.

2. **Ви працюєте за договором?**

   Так. У договорі фіксуємо обсяг робіт, терміни, вартість і порядок оплати. Оплата поетапна: зазвичай 50% на старті і 50% після здачі. Після запуску передаємо весь код і доступи — сайт належить вам.

3. **Скільки коштує розробка сайту в Харкові?**

   Лендинг — від $600, сайт компанії — від $1 000, інтернет-магазин — від $1 200. Ціни не залежать від міста. Детальніше — на сторінці цін, а ринкові вилки — у статті «Ціни на сайти у 2026».

4. **Допоможете з'явитися в Google Maps у Харкові?**

   Так, це локальне SEO: оптимізуємо профіль компанії в Google, додаємо на сайт адресу, карту й локальні сторінки, налаштовуємо роботу з відгуками. Старт — від $200 разово, ведення — від $150/міс.

5. **Ви працюєте тільки з харківськими компаніями?**

   Ні, працюємо по всій Україні та з клієнтами з ЄС. Для Харкова перевага одна — можна зустрітися наживо. Процес, ціни й терміни ті самі.

6. **Як перевірити веб-студію перед замовленням?**

   Подивіться живі сайти з портфоліо, а не лише скриншоти, спитайте, кому належатимуть код і домен, і як розбита оплата. Повний чек-лист — у статті «Як вибрати веб-студію».


#### Внутрішні посилання з контенту (14)

- «ДОМОВИТИСЬ ПРО ЗУСТРІЧ» → `/services/websites-kharkiv/#contact` · блок 1
- «Детальніше про лендинги» → `/services/websites-landing/` · блок 4
- «Про корпоративні сайти» → `/services/websites-corporate/` · блок 4
- «Про інтернет-магазини» → `/services/websites-shop/` · блок 4
- «Про локальне SEO» → `/services/seo-local/` · блок 4
- «портфоліо» → `/portfolio/` · блок 5
- «ПРО ЛЕНДИНГИ» → `/services/websites-landing/` · блок 6
- «ПРО КОРПОРАТИВНІ» → `/services/websites-corporate/` · блок 6
- «ПРО МАГАЗИНИ» → `/services/websites-shop/` · блок 6
- «цін» → `/pricing/` · блок 8
- ««Ціни на сайти у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 8
- «локальне SEO» → `/services/seo-local/` · блок 8
- ««Як вибрати веб-студію»» → `/blog/zamovyty-sayt-kharkiv/` · блок 8
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/bots-sales/ — Бот для продажів

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/bots-sales/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/bots/`) |
| Robots | index, follow |
| Title (54) | Telegram-бот для продажів — воронка й оплата, від $500 |
| Description (140) | Telegram-бот для продажів: квіз-кваліфікація, каталог, оплата в чаті, передача теплих лідів менеджеру чи в CRM. Від $500, запуск від 7 днів. |
| Головний ключ | телеграм бот для продажів |
| H1 | Телеграм-бот для продажів |
| Слів | 905 |
| JSON | `design-content/services__bots-sales.json` |

**Хлібні крихти:** Головна (`/`) › Telegram-боти (`/services/bots/`) › Бот для продажів

#### Блоки (12)

**1. hero** — Телеграм-бот для продажів · `<section .hero>`

- _[hero-tag]_ TELEGRAM · ВОРОНКА · ОПЛАТА В ЧАТІ
- **H1:** Телеграм-бот для продажів
- Телеграм-бот для продажів від Infinite Union (Харків) кваліфікує звернення, показує пропозицію, приймає оплату й передає менеджеру лише готових до покупки клієнтів. Для онлайн-шкіл, сервісів і магазинів, які отримують заявки в Telegram. Від $500, запуск від 7 днів.
- _[proof-val]_ $500
- _[proof-key]_ СТАРТ, ВІД
- _[proof-val]_ 7дн
- _[proof-key]_ ЗАПУСК ВІД
- _[proof-val]_ 15хв
- _[proof-key]_ ВІДПОВІДЬ НА ЗАПИТ
- _[декор, aria-hidden]_ 🤖 Sales Bot ● online

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ КВІЗ-КВАЛІФІКАЦІЯ· КАТАЛОГ У TELEGRAM· ОПЛАТА В ЧАТІ· ПЕРЕДАЧА В CRM· НАГАДУВАННЯ· СТАТИСТИКА ВОРОНКИ· КВІЗ-КВАЛІФІКАЦІЯ· КАТАЛОГ У TELEGRAM· ОПЛАТА В ЧАТІ· ПЕРЕДАЧА В CRM· НАГАДУВАННЯ· СТАТИСТИКА ВОРОНКИ·

**3. problem** — Навіщо бізнесу бот для продажів · `<section .features>`

- _[sec-label]_ ДЕ ВТРАЧАЮТЬСЯ ПРОДАЖІ
- **H2:** Навіщо бізнесу бот для продажів
- **H3:** Довга перша відповідь
- _[feat-desc]_ Клієнт написав увечері, менеджер побачив повідомлення зранку. За цей час людина вже купила в того, хто відповів першим.
- _[feat-tag]_ ШВИДКІСТЬ
- **H3:** Однакові питання
- _[feat-desc]_ «Скільки коштує?», «Є в наявності?», «Як оплатити?» — менеджер щодня відповідає на це вручну замість того, щоб закривати угоди.
- _[feat-tag]_ РУТИНА
- **H3:** Заявки без контексту
- _[feat-desc]_ Контакти лежать у різних чатах, невідомо, хто з якої реклами прийшов і на якому етапі зупинився. Повторно написати нікому.
- _[feat-tag]_ КОНТРОЛЬ

**4. process** — Шлях клієнта у боті для продажів · `<section .funnel>`

- _[sec-label]_ ЯК ПРАЦЮЄ ВОРОНКА
- **H2:** Шлях клієнта у боті для продажів
- _[fstep-num]_ 01
- **H3:** Вхід у бота
- _[fstep-desc]_ Клієнт натискає /start із реклами, сайту чи QR-коду. Бот фіксує джерело переходу й вітається.
- _[fstep-metric]_ → джерело ліда записано
- _[fstep-num]_ 02
- **H3:** Кваліфікація
- _[fstep-desc]_ 3–5 питань-кнопок: що потрібно, бюджет, терміни. Відповіді визначають, яку пропозицію показати далі.
- _[fstep-metric]_ → потреба й бюджет відомі
- _[fstep-num]_ 03
- **H3:** Пропозиція
- _[fstep-desc]_ Бот показує відповідний товар, тариф чи каталог з цінами. На складне питання — кнопка «написати менеджеру».
- _[fstep-metric]_ → клієнт бачить ціну одразу
- _[fstep-num]_ 04
- **H3:** Оплата
- _[fstep-desc]_ LiqPay, WayForPay, Monobank, Stripe або Telegram Payments прямо в чаті. Бот підтверджує оплату й надсилає чек.
- _[fstep-metric]_ → без переходу на сайт
- _[fstep-num]_ 05
- **H3:** Передача менеджеру
- _[fstep-desc]_ Заявка з усіма відповідями приходить менеджеру в Telegram або падає в CRM. Хто не купив — отримує нагадування.
- _[fstep-metric]_ → ліди в одному місці

**5. included-cards** — Що вміє бот для продажів · `<section .features>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що вміє бот для продажів
- **H3:** Квіз і гілки сценарію
- _[feat-desc]_ Від простого квізу до воронки з умовними переходами: різні відповіді ведуть до різних пропозицій.
- _[feat-tag]_ AIOGRAM 3 · FSM
- **H3:** Каталог і оплата
- _[feat-desc]_ Товари чи тарифи з фото й цінами, кошик, оплата в чаті. Для більшого каталогу — Telegram Mini App.
- _[feat-tag]_ LIQPAY · MONOBANK
- **H3:** Ліди в CRM
- _[feat-desc]_ Кожен контакт з відповідями квізу потрапляє в Google Sheets або CRM. Як це працює — на сторінці інтеграції бота з CRM.
- _[feat-tag]_ BITRIX24 · AMOCRM
- **H3:** Нагадування й розсилки
- _[feat-desc]_ Бот сам нагадує тим, хто не завершив покупку, і робить розсилки за сегментами — за правилами, які ви задали.
- _[feat-tag]_ ТРИГЕРИ
- **H3:** Статистика воронки
- _[feat-desc]_ Скільки людей почали діалог, дійшли до пропозиції й оплатили. Видно, на якому кроці клієнти зупиняються.
- _[feat-tag]_ АДМІН-ПАНЕЛЬ
- **H3:** AI-відповіді
- _[feat-desc]_ Для нестандартних питань підключаємо Claude API: бот відповідає за вашою базою знань, а складне передає людині.
- _[feat-tag]_ CLAUDE API

**6. stats** · `<div .stats>`

- _[stat-val]_ 7дн
- _[stat-key]_ ЗАПУСК ТАРИФУ START
- _[stat-val]_ 14дн
- _[stat-key]_ ЗАПУСК ТАРИФУ PRO
- _[stat-val]_ 5
- _[stat-key]_ ПЛАТІЖНИХ СИСТЕМ НА ВИБІР
- _[stat-val]_ 15хв
- _[stat-key]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС

**7. pricing-tiers** — Скільки коштує бот для продажів · `<section .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Скільки коштує бот для продажів
- **H3:** Start
- _[level-price]_ від $500
- _[level-note]_ проста воронка · 7 днів
- Список:
  - Воронка до 5 кроків
  - Збір контактів і відповідей
  - Сповіщення менеджеру
  - Кнопки та меню
  - Оплата в боті
  - CRM-інтеграція
  - Статистика воронки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-sales/#contact`
- _[level-badge]_ ЧАСТО ОБИРАЮТЬ
- **H3:** Pro
- _[level-price]_ від $1 200
- _[level-note]_ повна воронка · 14 днів
- Список:
  - Квіз і гілки сценарію
  - Каталог з цінами
  - Оплата в чаті
  - Передача лідів у CRM
  - Нагадування й розсилки
  - Адмін-панель і статистика
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-sales/#contact`
- **H3:** Max
- _[level-price]_ від $2 500
- _[level-note]_ кілька воронок · план робіт окремо
- Список:
  - Кілька воронок і продуктів
  - AI-кваліфікація лідів
  - Telegram Mini App
  - Кілька платіжних систем
  - Інтеграції з вашими API
  - Власний дашборд
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-sales/#contact`

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Start | від $500 · проста воронка · 7 днів | проста воронка · 7 днів | Воронка до 5 кроків; Збір контактів і відповідей; Сповіщення менеджеру; Кнопки та меню; Оплата в боті; CRM-інтеграція; Статистика воронки |
| Pro _(ЧАСТО ОБИРАЮТЬ)_ | від $1 200 · повна воронка · 14 днів | повна воронка · 14 днів | Квіз і гілки сценарію; Каталог з цінами; Оплата в чаті; Передача лідів у CRM; Нагадування й розсилки; Адмін-панель і статистика |
| Max | від $2 500 · кілька воронок · план робіт окремо | — | Кілька воронок і продуктів; AI-кваліфікація лідів; Telegram Mini App; Кілька платіжних систем; Інтеграції з вашими API; Власний дашборд |

**8. process** — Від сценарію до запуску · `<section .process>`

- _[sec-label]_ ЕТАПИ
- **H2:** Від сценарію до запуску
- _[pstep-dot]_ 01
- **H3:** Бриф
- _[pstep-desc]_ Продукт, аудиторія, звідки приходять клієнти
- _[pstep-time]_ 1–2 дні
- _[pstep-dot]_ 02
- **H3:** Сценарій
- _[pstep-desc]_ Карта діалогів, питання квізу, тексти
- _[pstep-time]_ 2–3 дні
- _[pstep-dot]_ 03
- **H3:** Розробка
- _[pstep-desc]_ Логіка, оплата, CRM, адмін-панель
- _[pstep-time]_ 3–7 днів
- _[pstep-dot]_ 04
- **H3:** Тестування
- _[pstep-desc]_ Проходимо всі гілки й тестові оплати
- _[pstep-time]_ 2–4 дні
- _[pstep-dot]_ 05
- **H3:** Запуск
- _[pstep-desc]_ Деплой, передача коду й доступів
- _[pstep-time]_ 1 день

**9. process** — Наші боти, що працюють із лідами · `<section .features>`

- _[sec-label]_ ПРИКЛАДИ
- **H2:** Наші боти, що працюють із лідами
- **H3:** IU Bot
- _[feat-desc]_ Наш власний lead-бот: квіз, покрокові сценарії, передача ліда в CRM. На ньому ми перевіряємо ту саму логіку, яку робимо клієнтам.
- _[feat-tag]_ КВІЗ · FSM · CRM
- **H3:** Transfer Kharkiv
- _[feat-desc]_ Лендінг трансферної компанії з Telegram-ботом, який приймає заявки цілодобово. Конверсія лендінгу — 8.4%.
- _[feat-tag]_ PYTHON-БОТ · SEO
- **H3:** Realty Monitor
- _[feat-desc]_ Бот моніторингу нерухомості з платною підпискою через LiqPay і покроковими сценаріями.
- _[feat-tag]_ LIQPAY · FSM
- Більше проєктів — у портфоліо. Інші типи ботів і загальні тарифи — на сторінці розробки телеграм-ботів, порівняння всіх послуг — у розділі ціни. Про те, як бот вписується у продажі, читайте в статті «Telegram-бот для бізнесу».

**10. faq** — Питання про бот для продажів · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про бот для продажів
- **Q:** Скільки коштує телеграм-бот для продажів?
  **A:** Start — від $500 (проста воронка, 7 днів), Pro — від $1 200 (квіз, оплата, CRM, 14 днів), Max — від $2 500. Точну суму фіксуємо після брифу. Комісії платіжних систем і сервер — окремо.
- **Q:** Чи може бот приймати оплату?
  **A:** Так. Підключаємо LiqPay, WayForPay, Monobank, Stripe або Telegram Payments. Клієнт платить у чаті, бот підтверджує оплату й повідомляє менеджера.
- **Q:** Чи замінить бот менеджера з продажів?
  **A:** Ні, і не має. Бот бере першу відповідь, типові питання й збір даних. Менеджер отримує клієнта, який уже знає ціну й залишив контакт, і витрачає час на розмову, а не на анкету.
- **Q:** З якими CRM можна інтегрувати бота?
  **A:** Bitrix24, amoCRM, Pipedrive, Google Sheets або будь-яка система з API чи webhook. Підключення CRM входить у тариф Pro.
- **Q:** Чи можу я сам змінювати тексти й ціни?
  **A:** Так. Робимо адмін-панель у Telegram або редагування через Google Sheets, щоб міняти тексти, ціни й товари без розробника.
- **Q:** Що, якщо бот не знає відповіді?
  **A:** Бот передає діалог менеджеру разом з історією розмови. За бажанням підключаємо AI на Claude API, який відповідає за вашою базою знань.

**11. cards** — Може знадобитися · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може знадобитися
- Картка-посилання → `/services/bots-crm/`:
  - Ліди одразу в CRM
  - Бот + CRM
  - Детальніше →
- Картка-посилання → `/services/bots-restaurant/`:
  - Меню та замовлення
  - Бот для ресторану
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Сторінка під воронку
  - Лендінг
  - Детальніше →
- Картка-посилання → `/services/meta-ads/`:
  - Трафік у бота
  - Meta Ads
  - Детальніше →

**12. cta** — Покажіть, як ви продаєте зараз · `<section#contact .cta-final>`

- _[cta-label]_ ОБГОВОРИТИ ВОРОНКУ
- **H2:** Покажіть, як ви продаєте зараз
- Опишіть продукт і звідки приходять клієнти — у робочий час відповімо протягом 15 хвилин
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує телеграм-бот для продажів?**

   Start — від $500 (проста воронка, 7 днів), Pro — від $1 200 (квіз, оплата, CRM, 14 днів), Max — від $2 500. Точну суму фіксуємо після брифу. Комісії платіжних систем і сервер — окремо.

2. **Чи може бот приймати оплату?**

   Так. Підключаємо LiqPay, WayForPay, Monobank, Stripe або Telegram Payments. Клієнт платить у чаті, бот підтверджує оплату й повідомляє менеджера.

3. **Чи замінить бот менеджера з продажів?**

   Ні, і не має. Бот бере першу відповідь, типові питання й збір даних. Менеджер отримує клієнта, який уже знає ціну й залишив контакт, і витрачає час на розмову, а не на анкету.

4. **З якими CRM можна інтегрувати бота?**

   Bitrix24, amoCRM, Pipedrive, Google Sheets або будь-яка система з API чи webhook. Підключення CRM входить у тариф Pro.

5. **Чи можу я сам змінювати тексти й ціни?**

   Так. Робимо адмін-панель у Telegram або редагування через Google Sheets, щоб міняти тексти, ціни й товари без розробника.

6. **Що, якщо бот не знає відповіді?**

   Бот передає діалог менеджеру разом з історією розмови. За бажанням підключаємо AI на Claude API, який відповідає за вашою базою знань.


#### Внутрішні посилання з контенту (9)

- «інтеграції бота з CRM» → `/services/bots-crm/` · блок 5
- «ОБГОВОРИТИ» → `/services/bots-sales/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-sales/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-sales/#contact` · блок 7
- «портфоліо» → `/portfolio/` · блок 9
- «розробки телеграм-ботів» → `/services/bots/` · блок 9
- «ціни» → `/pricing/` · блок 9
- ««Telegram-бот для бізнесу»» → `/blog/telegram-bot-dlya-biznesu/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 12

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/bots-restaurant/ — Бот для ресторану

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/bots-restaurant/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/bots/`) |
| Robots | index, follow |
| Title (56) | Telegram-бот для ресторану й кафе — замовлення, від $600 |
| Description (148) | Telegram-бот для ресторану чи кафе: меню з фото, замовлення на доставку й самовивіз, оплата, бронювання столиків. Без комісії агрегаторів. Від $600. |
| Головний ключ | телеграм бот для ресторану |
| H1 | Телеграм-бот для ресторану і кафе |
| Слів | 804 |
| JSON | `design-content/services__bots-restaurant.json` |

**Хлібні крихти:** Головна (`/`) › Telegram-боти (`/services/bots/`) › Бот для ресторану

#### Блоки (11)

**1. hero** — Телеграм-бот для ресторану і кафе · `<section .hero>`

- _[hero-eyebrow]_ 🍕 · TELEGRAM · КАФЕ · РЕСТОРАН · ДОСТАВКА
- **H1:** Телеграм-бот для ресторану і кафе
- Робимо телеграм-бот для ресторану: меню з фото, замовлення на доставку й самовивіз, оплата в чаті, бронювання столиків. Замовлення йдуть напряму вам, а база клієнтів залишається у вас. Infinite Union, Харків. Кафе — від $600 і 7 днів.
- _[декор, aria-hidden]_ 🧮
- _[saving-text]_ Приклад розрахунку (умовні цифри) 300 замовлень на місяць × чек $20 × комісія агрегатора 25% = $1 500 комісії на місяць. Підставте свої обсяги й ставку з вашого договору.
- _[декор, aria-hidden]_ 🍕 Демо-бот закладу ● приклад інтерфейсу

**2. stats** · `<div .benefits>`

- _[benefit-val]_ $600
- _[benefit-key]_ ТАРИФ «КАФЕ», ВІД
- _[benefit-val]_ 7дн
- _[benefit-key]_ ЗАПУСК ТАРИФУ «КАФЕ»
- _[benefit-val]_ 50
- _[benefit-key]_ ПОЗИЦІЙ МЕНЮ У «КАФЕ»
- _[benefit-val]_ 24/7
- _[benefit-key]_ ПРИЙОМ ЗАМОВЛЕНЬ

**3. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ МЕНЮ З ФОТО· ОПЛАТА В TELEGRAM· БРОНЮВАННЯ СТОЛИКІВ· ДОСТАВКА Й САМОВИВІЗ· СПОВІЩЕННЯ КУХНІ· СТОП-ЛИСТ· МЕНЮ З ФОТО· ОПЛАТА В TELEGRAM· БРОНЮВАННЯ СТОЛИКІВ· ДОСТАВКА Й САМОВИВІЗ· СПОВІЩЕННЯ КУХНІ· СТОП-ЛИСТ·

**4. problem** — Агрегатор чи власний бот · `<section .vs>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Агрегатор чи власний бот
- **H3:** Лише агрегатори
- Список:
  - Комісія з кожного замовлення
  - Контакти гостей бачить агрегатор, не ви
  - Немає прямих розсилок постійним гостям
  - Видача у списку залежить від алгоритму
  - Формат меню — за правилами платформи
- _[декор, aria-hidden]_ VS
- **H3:** Власний Telegram-бот
- Список:
  - Без комісії агрегатора — лише еквайринг
  - База гостей і історія замовлень — ваші
  - Розсилки про нові страви й акції
  - Меню, акції й стоп-лист змінюєте самі
  - Можна поєднувати з агрегаторами

**5. included-cards** — Що вміє телеграм-бот для ресторану · `<section .features>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що вміє телеграм-бот для ресторану
- _[декор, aria-hidden]_ 🍽️
- **H3:** Меню з фото
- _[feat-desc]_ Категорії, фото страв, склад, алергени, ціни. Великі меню робимо як Telegram Mini App — з пошуком і фільтрами.
- _[feat-save]_ Стоп-лист і ціни — з адмінки
- _[декор, aria-hidden]_ 🛒
- **H3:** Кошик і оформлення
- _[feat-desc]_ Кількість, модифікатори, доставка чи самовивіз, адреса й час — гість оформлює все в одному чаті.
- _[feat-save]_ Без дзвінка адміністратору
- _[декор, aria-hidden]_ 💳
- **H3:** Оплата онлайн
- _[feat-desc]_ LiqPay, WayForPay, Monobank або Telegram Payments прямо в боті. Готівку й оплату карткою кур'єру теж можна залишити.
- _[feat-save]_ Тариф «Ресторан»
- _[декор, aria-hidden]_ 📋
- **H3:** Замовлення на кухню
- _[feat-desc]_ Кожне замовлення приходить у Telegram-групу кухні з кнопками статусів: прийнято → готується → передано кур'єру. Гість бачить статус у чаті.
- _[feat-save]_ Статуси для гостя
- _[декор, aria-hidden]_ 📅
- **H3:** Бронювання столиків
- _[feat-desc]_ Дата, час, кількість гостей, побажання. Адміністратор підтверджує кнопкою, бот нагадує гостю перед візитом.
- _[feat-save]_ Нагадування автоматично
- _[декор, aria-hidden]_ 🎁
- **H3:** Бонуси й розсилки
- _[feat-desc]_ Бали за замовлення, промокоди, розсилки про нові страви. Розсилку отримують ті, хто вже замовляв у вас.
- _[feat-save]_ Тариф «Ресторан» і вище

**6. process** — Як ми запускаємо бота для закладу · `<section .flow>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як ми запускаємо бота для закладу
- _[декор, aria-hidden]_ 📝
- **H3:** Бриф і меню
- _[fstep-desc]_ Збираємо меню, зони доставки, графік, правила оплати
- _[fstep-time]_ 1–2 дні
- _[декор, aria-hidden]_ 🧩
- **H3:** Сценарій
- _[fstep-desc]_ Погоджуємо кроки замовлення й бронювання
- _[fstep-time]_ 1–3 дні
- _[декор, aria-hidden]_ ⚙️
- **H3:** Розробка й тест
- _[fstep-desc]_ Бот, оплата, група кухні, тестові замовлення
- _[fstep-time]_ 4–10 днів
- _[декор, aria-hidden]_ 🚀
- **H3:** Запуск
- _[fstep-desc]_ Інструктаж персоналу, QR-коди на столи, передача доступів
- _[fstep-time]_ 1 день

**7. pricing-tiers** — Ціна бота для закладу · `<section .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна бота для закладу
- **H3:** Кафе
- _[level-price]_ від $600
- _[level-note]_ до 50 позицій · 7 днів
- Список:
  - Меню з категоріями й фото
  - Кошик і оформлення
  - Сповіщення кухні
  - Адмін-панель у Telegram
  - Оплата онлайн
  - Бронювання столиків
  - Бонуси й розсилки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact`
- _[level-badge]_ ЧАСТО ОБИРАЮТЬ
- **H3:** Ресторан
- _[level-price]_ від $1 200
- _[level-note]_ повне меню · 14 днів
- Список:
  - Меню без обмеження позицій
  - Оплата онлайн
  - Бронювання столиків
  - Бонуси й промокоди
  - Розсилки гостям
  - Статистика замовлень
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact`
- **H3:** Мережа
- _[level-price]_ від $2 500
- _[level-note]_ кілька закладів · план робіт окремо
- Список:
  - Кілька філій в одному боті
  - Спільна база гостей
  - Окремі кухні й зони доставки
  - Mini App з повним меню
  - Інтеграція з касою через API
  - Звіти по філіях
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact`

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Кафе | від $600 · до 50 позицій · 7 днів | до 50 позицій · 7 днів | Меню з категоріями й фото; Кошик і оформлення; Сповіщення кухні; Адмін-панель у Telegram; Оплата онлайн; Бронювання столиків; Бонуси й розсилки |
| Ресторан _(ЧАСТО ОБИРАЮТЬ)_ | від $1 200 · повне меню · 14 днів | повне меню · 14 днів | Меню без обмеження позицій; Оплата онлайн; Бронювання столиків; Бонуси й промокоди; Розсилки гостям; Статистика замовлень |
| Мережа | від $2 500 · кілька закладів · план робіт окремо | — | Кілька філій в одному боті; Спільна база гостей; Окремі кухні й зони доставки; Mini App з повним меню; Інтеграція з касою через API; Звіти по філіях |

**8. portfolio** — Та сама механіка в наших проєктах · `<section .features>`

- _[sec-label]_ ПРИКЛАДИ
- **H2:** Та сама механіка в наших проєктах
- **H3:** Transfer Kharkiv
- _[feat-desc]_ Telegram-бот приймає заявки на трансфер цілодобово й одразу передає їх диспетчеру — так само, як бот закладу передає замовлення кухні.
- _[feat-save]_ Python-бот · лендінг
- **H3:** Respect Car
- _[feat-desc]_ Сайт автомайданчика з живим каталогом, яким керують через адмінку в Telegram. Той самий підхід — для меню й стоп-листа.
- _[feat-save]_ Next.js · PostgreSQL
- **H3:** Parrot School
- _[feat-desc]_ Telegram-екосистема з окремими ролями й адмін-ботом. Для мережі закладів це ролі «гість», «кухня», «адміністратор філії».
- _[feat-save]_ aiogram · Railway
- Окремого ресторанного кейсу в портфоліо поки немає — показуємо проєкти з тією ж логікою. Усі роботи — у портфоліо. Загальні тарифи на ботів — на сторінці розробки телеграм-ботів, усі ціни студії — у розділі ціни. Що ще варто знати перед замовленням — у статті «Telegram-бот для бізнесу».

**9. faq** — Питання про бот для ресторану · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про бот для ресторану
- **Q:** Скільки коштує телеграм-бот для ресторану?
  **A:** «Кафе» — від $600 (до 50 позицій, 7 днів), «Ресторан» — від $1 200 (оплата, бронювання, бонуси, 14 днів), «Мережа» — від $2 500. Комісія еквайрингу й сервер оплачуються окремо.
- **Q:** Чи замінить бот Glovo або Bolt Food?
  **A:** Бот замінює прийом замовлень, а не логістику. Якщо у вас свої кур'єри або самовивіз, частину замовлень можна перевести в бота. Багато закладів працюють з обома каналами одночасно.
- **Q:** Чи можна самому змінювати меню й ціни?
  **A:** Так. Ціни, фото, стоп-лист і акційні позиції змінюються через адмін-панель у Telegram або Google Sheets, без розробника.
- **Q:** Як замовлення потрапляє на кухню?
  **A:** Базово — у Telegram-групу кухні з кнопками статусів. Інтеграцію з касовою чи POS-системою робимо, якщо вона має API; це обговорюємо на брифі.
- **Q:** Скільки часу займе запуск?
  **A:** «Кафе» — 7 днів, «Ресторан» — 14 днів. Для мережі закладів складаємо окремий план після брифу. Терміни рахуємо з моменту, коли отримали меню й фото.
- **Q:** Звідки гості дізнаються про бота?
  **A:** QR-коди на столах і пакуванні, посилання в Instagram і Google Maps, кнопка на сайті. Для пошуку на картах допоможе локальне SEO.

**10. cards** — Може знадобитися · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може знадобитися
- Картка-посилання → `/services/bots-sales/`:
  - Воронка й оплата
  - Бот для продажів
  - Детальніше →
- Картка-посилання → `/services/bots-crm/`:
  - Облік гостей
  - Бот + CRM
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Сайт закладу
  - Лендінг
  - Детальніше →
- Картка-посилання → `/services/seo-local/`:
  - Google Maps
  - Локальне SEO
  - Детальніше →

**11. cta** — Приймайте замовлення напряму · `<section#contact .cta-final>`

- _[cta-label]_ ОБГОВОРИТИ БОТА
- **H2:** Приймайте замовлення напряму
- Розкажіть про заклад і формат доставки — у робочий час відповімо протягом 15 хвилин
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує телеграм-бот для ресторану?**

   «Кафе» — від $600 (до 50 позицій, 7 днів), «Ресторан» — від $1 200 (оплата, бронювання, бонуси, 14 днів), «Мережа» — від $2 500. Комісія еквайрингу й сервер оплачуються окремо.

2. **Чи замінить бот Glovo або Bolt Food?**

   Бот замінює прийом замовлень, а не логістику. Якщо у вас свої кур'єри або самовивіз, частину замовлень можна перевести в бота. Багато закладів працюють з обома каналами одночасно.

3. **Чи можна самому змінювати меню й ціни?**

   Так. Ціни, фото, стоп-лист і акційні позиції змінюються через адмін-панель у Telegram або Google Sheets, без розробника.

4. **Як замовлення потрапляє на кухню?**

   Базово — у Telegram-групу кухні з кнопками статусів. Інтеграцію з касовою чи POS-системою робимо, якщо вона має API; це обговорюємо на брифі.

5. **Скільки часу займе запуск?**

   «Кафе» — 7 днів, «Ресторан» — 14 днів. Для мережі закладів складаємо окремий план після брифу. Терміни рахуємо з моменту, коли отримали меню й фото.

6. **Звідки гості дізнаються про бота?**

   QR-коди на столах і пакуванні, посилання в Instagram і Google Maps, кнопка на сайті. Для пошуку на картах допоможе локальне SEO.


#### Внутрішні посилання з контенту (9)

- «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-restaurant/#contact` · блок 7
- «портфоліо» → `/portfolio/` · блок 8
- «розробки телеграм-ботів» → `/services/bots/` · блок 8
- «ціни» → `/pricing/` · блок 8
- ««Telegram-бот для бізнесу»» → `/blog/telegram-bot-dlya-biznesu/` · блок 8
- «локальне SEO» → `/services/seo-local/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/bots-crm/ — Бот + CRM

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/bots-crm/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/bots/`) |
| Robots | index, follow |
| Title (59) | Інтеграція Telegram-бота з CRM — Bitrix24, amoCRM, від $800 |
| Description (151) | Інтеграція Telegram-бота з CRM: ліди, угоди й статуси синхронізуються з Bitrix24, amoCRM, Pipedrive чи Google Sheets автоматично. Від $800, від 7 днів. |
| Головний ключ | інтеграція телеграм бота з CRM |
| H1 | Інтеграція телеграм-бота з CRM |
| Слів | 790 |
| JSON | `design-content/services__bots-crm.json` |

**Хлібні крихти:** Головна (`/`) › Telegram-боти (`/services/bots/`) › Бот + CRM

#### Блоки (11)

**1. hero** — Інтеграція телеграм-бота з CRM · `<section .hero>`

- _[hero-tag-text]_ TELEGRAM · CRM · СИНХРОНІЗАЦІЯ
- **H1:** Інтеграція телеграм-бота з CRM
- Інтеграція телеграм-бота з CRM від Infinite Union (Харків): кожне звернення з бота стає угодою в Bitrix24, amoCRM, Pipedrive чи Google Sheets, а менеджер отримує задачу в Telegram. Для відділів продажів і сервісних команд, які втомилися переносити ліди вручну. Від $800, одна CRM — від 7 днів.
- _[декор, aria-hidden]_ Bitrix24 REST API → amoCRM REST API → Pipedrive REST API → Google Sheets API → Ваша система API / webhook →

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ BITRIX24 API· AMOCRM· ЛІДИ З БОТА· ЗАДАЧІ В TELEGRAM· WEBHOOK· PIPEDRIVE· BITRIX24 API· AMOCRM· ЛІДИ З БОТА· ЗАДАЧІ В TELEGRAM· WEBHOOK· PIPEDRIVE·

**3. problem** — Що ламається без інтеграції · `<section .features>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Що ламається без інтеграції
- **H3:** Ручне перенесення
- _[feat-desc]_ Менеджер копіює ім'я й телефон з Telegram у CRM. Частина заявок не доходить до системи, частина — з помилками в номері.
- _[feat-badge]_ ЧАС
- **H3:** Ліди без джерела
- _[feat-desc]_ У CRM не видно, з якої реклами чи кнопки прийшов клієнт. Неможливо порівняти канали й зрозуміти, куди вкладати бюджет.
- _[feat-badge]_ АНАЛІТИКА
- **H3:** Тиша після заявки
- _[feat-desc]_ Угода в CRM змінила статус, а клієнт про це не знає. Він пише ще раз або йде до конкурента.
- _[feat-badge]_ СЕРВІС

**4. process** — Від повідомлення до угоди в CRM · `<section .pipeline>`

- _[sec-label]_ ЯК РУХАЄТЬСЯ ЛІД
- **H2:** Від повідомлення до угоди в CRM
- **H3:** Новий лід
- Бот збирає контакт, потребу й джерело
- **H3:** Угода в CRM
- Створюється картка з усіма відповідями
- **H3:** Задача менеджеру
- Сповіщення в Telegram з кнопками дій
- **H3:** Робота з клієнтом
- Зміна статусу — повідомлення клієнту в боті
- **H3:** Результат
- Угода закрита, історія — в одній картці

**5. included-cards** — Що дає інтеграція бота з CRM · `<section .how>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що дає інтеграція бота з CRM
- **H3:** Ліди з бота — у CRM
- _[hstep-desc]_ Ім'я, телефон, відповіді на питання, UTM-мітка чи кнопка входу — у потрібних полях картки. Повторні звернення прив'язуються до наявного контакту.
- **H3:** Задачі менеджерам у Telegram
- _[hstep-desc]_ Новий лід — сповіщення з кнопками «взяти в роботу», «передзвонити», «відкласти». Ліди розподіляються по черзі або за напрямком.
- **H3:** Двостороння синхронізація
- _[hstep-desc]_ Статус змінили в CRM — клієнт отримує повідомлення в боті. Менеджер натиснув кнопку в Telegram — картка в CRM оновилася.
- **H3:** Черга й повторні спроби
- _[hstep-desc]_ Якщо CRM тимчасово не відповідає, ліди зберігаються в PostgreSQL і чекають у черзі Redis, а потім відправляються повторно. Так працює й наша власна обробка заявок.

**6. stats** · `<div .stats>`

- _[stat-val]_ $800
- _[stat-key]_ ІНТЕГРАЦІЯ З 1 CRM, ВІД
- _[stat-val]_ 7дн
- _[stat-key]_ ТАРИФ «СТАРТ»
- _[stat-val]_ 14дн
- _[stat-key]_ ТАРИФ PRO
- _[stat-val]_ 15хв
- _[stat-key]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС

**7. pricing-tiers** — Ціна інтеграції телеграм-бота з CRM · `<section .levels>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна інтеграції телеграм-бота з CRM
- **H3:** Старт
- _[level-price]_ від $800
- _[level-note]_ 1 CRM · 7 днів
- Список:
  - Інтеграція з однією CRM
  - Ліди з бота — у картки CRM
  - Сповіщення менеджерам
  - Базові статуси угод
  - Двостороння синхронізація
  - Розподіл лідів
  - Ролі й доступи
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-crm/#contact`
- _[level-badge]_ ЧАСТО ОБИРАЮТЬ
- **H3:** Pro
- _[level-price]_ від $1 500
- _[level-note]_ повна інтеграція · 14 днів
- Список:
  - Двостороння синхронізація
  - Розподіл лідів між менеджерами
  - Ролі: менеджер, керівник
  - Повідомлення клієнту про статус
  - Черга й повторні спроби
  - Звіт по джерелах лідів
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-crm/#contact`
- **H3:** Enterprise
- _[level-price]_ від $3 000
- _[level-note]_ кілька систем · план робіт окремо
- Список:
  - Кілька CRM і облікових систем
  - Інтеграції з вашими API
  - AI-оцінка лідів
  - Веб-дашборд для керівника
  - Міграція даних зі старої системи
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/bots-crm/#contact`

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Старт | від $800 · 1 CRM · 7 днів | 1 CRM · 7 днів | Інтеграція з однією CRM; Ліди з бота — у картки CRM; Сповіщення менеджерам; Базові статуси угод; Двостороння синхронізація; Розподіл лідів; Ролі й доступи |
| Pro _(ЧАСТО ОБИРАЮТЬ)_ | від $1 500 · повна інтеграція · 14 днів | повна інтеграція · 14 днів | Двостороння синхронізація; Розподіл лідів між менеджерами; Ролі: менеджер, керівник; Повідомлення клієнту про статус; Черга й повторні спроби; Звіт по джерелах лідів |
| Enterprise | від $3 000 · кілька систем · план робіт окремо | — | Кілька CRM і облікових систем; Інтеграції з вашими API; AI-оцінка лідів; Веб-дашборд для керівника; Міграція даних зі старої системи |

**8. portfolio** — Де ми вже з'єднували бот і дані · `<section .features>`

- _[sec-label]_ ПРИКЛАДИ
- **H2:** Де ми вже з'єднували бот і дані
- **H3:** IU Bot
- _[feat-desc]_ Наш lead-бот: квіз, покрокові сценарії й передача ліда в CRM. Заявки з форми сайту зберігаються в PostgreSQL, проходять чергу Redis і приходять сповіщенням у Telegram.
- _[feat-badge]_ FSM · CRM · REDIS
- **H3:** BizBot
- _[feat-desc]_ Бот для бухгалтерії малого бізнесу: зарплати, задачі, автозаповнення Excel. Економить 4+ години на тиждень.
- _[feat-badge]_ AIOGRAM · FASTAPI
- **H3:** Respect Car
- _[feat-desc]_ Сайт автомайданчика з живим каталогом на PostgreSQL і адмінкою в Telegram — дані сайту й бота синхронні.
- _[feat-badge]_ NEXT.JS · POSTGRESQL
- Інші проєкти — у портфоліо. Самого бота з нуля робимо в межах розробки телеграм-ботів, а якщо потрібні сайт, бот і CRM як одна система — дивіться автоматизацію бізнесу. Усі тарифи — на сторінці ціни, а про роль бота в продажах — у статті «Telegram-бот для бізнесу».

**9. faq** — Питання про інтеграцію з CRM · `<section .faq>`

- _[sec-label]_ ЧАСТІ ПИТАННЯ
- **H2:** Питання про інтеграцію з CRM
- **Q:** Скільки коштує інтеграція телеграм-бота з CRM?
  **A:** «Старт» з однією CRM — від $800 і 7 днів, Pro з двосторонньою синхронізацією — від $1 500 і 14 днів, Enterprise — від $3 000. Підписка на саму CRM оплачується окремо.
- **Q:** З якими CRM ви працюєте?
  **A:** Bitrix24, amoCRM, Pipedrive, Google Sheets, а також будь-яка система з REST API або webhook. Можливості конкретної CRM перевіряємо на брифі, до старту робіт.
- **Q:** У мене вже є бот. Можна підключити CRM до нього?
  **A:** Так, якщо є доступ до коду бота. Спочатку дивимося, як він зроблений, і пропонуємо: доробити наявний або переписати, якщо так буде дешевше в підтримці.
- **Q:** Що буде, якщо CRM тимчасово недоступна?
  **A:** Лід зберігається в базі бота й стоїть у черзі. Коли CRM знову відповідає, дані відправляються повторно, а адміністратор отримує сповіщення про збій.
- **Q:** Чи має бот доступ до всіх даних CRM?
  **A:** Ні. Використовуємо окремий API-ключ з мінімальними правами. Менеджер у Telegram бачить лише свої угоди, керівник — усі. Ключі й доступи передаємо вам.
- **Q:** Чи можна перенести дані зі старої CRM?
  **A:** Так, міграцію контактів і угод робимо в тарифі Enterprise або окремою задачею. Обсяг і формат даних оцінюємо після вивантаження.

**10. cards** — Може знадобитися · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може знадобитися
- Картка-посилання → `/services/bots-sales/`:
  - Воронка й оплата
  - Бот для продажів
  - Детальніше →
- Картка-посилання → `/services/bots-restaurant/`:
  - Замовлення їжі
  - Бот для ресторану
  - Детальніше →
- Картка-посилання → `/services/ecosystems/`:
  - Сайт + бот + CRM
  - Автоматизація бізнесу
  - Детальніше →
- Картка-посилання → `/services/platforms/`:
  - Власна система
  - Вебплатформа
  - Детальніше →

**11. cta** — Ліди в CRM без ручної роботи · `<section#contact .cta-final>`

- _[cta-label]_ ОБГОВОРИТИ ІНТЕГРАЦІЮ
- **H2:** Ліди в CRM без ручної роботи
- Напишіть, яка у вас CRM і звідки приходять заявки — у робочий час відповімо протягом 15 хвилин
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує інтеграція телеграм-бота з CRM?**

   «Старт» з однією CRM — від $800 і 7 днів, Pro з двосторонньою синхронізацією — від $1 500 і 14 днів, Enterprise — від $3 000. Підписка на саму CRM оплачується окремо.

2. **З якими CRM ви працюєте?**

   Bitrix24, amoCRM, Pipedrive, Google Sheets, а також будь-яка система з REST API або webhook. Можливості конкретної CRM перевіряємо на брифі, до старту робіт.

3. **У мене вже є бот. Можна підключити CRM до нього?**

   Так, якщо є доступ до коду бота. Спочатку дивимося, як він зроблений, і пропонуємо: доробити наявний або переписати, якщо так буде дешевше в підтримці.

4. **Що буде, якщо CRM тимчасово недоступна?**

   Лід зберігається в базі бота й стоїть у черзі. Коли CRM знову відповідає, дані відправляються повторно, а адміністратор отримує сповіщення про збій.

5. **Чи має бот доступ до всіх даних CRM?**

   Ні. Використовуємо окремий API-ключ з мінімальними правами. Менеджер у Telegram бачить лише свої угоди, керівник — усі. Ключі й доступи передаємо вам.

6. **Чи можна перенести дані зі старої CRM?**

   Так, міграцію контактів і угод робимо в тарифі Enterprise або окремою задачею. Обсяг і формат даних оцінюємо після вивантаження.


#### Внутрішні посилання з контенту (9)

- «ОБГОВОРИТИ» → `/services/bots-crm/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-crm/#contact` · блок 7
- «ОБГОВОРИТИ» → `/services/bots-crm/#contact` · блок 7
- «портфоліо» → `/portfolio/` · блок 8
- «розробки телеграм-ботів» → `/services/bots/` · блок 8
- «автоматизацію бізнесу» → `/services/ecosystems/` · блок 8
- «ціни» → `/pricing/` · блок 8
- ««Telegram-бот для бізнесу»» → `/blog/telegram-bot-dlya-biznesu/` · блок 8
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 11

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/google-ads-search/ — Пошукова реклама

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/google-ads-search/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/google-ads/`) |
| Robots | index, follow |
| Title (52) | Контекстна реклама в пошуку Google — запуск від $300 |
| Description (151) | Контекстна реклама в пошуку Google: семантика, мінус-слова, оголошення, ставки й відстеження дзвінків та заявок. Запуск від $300, ведення від $200/міс. |
| Головний ключ | контекстна реклама Google |
| H1 | Контекстна реклама Google у пошуку |
| Слів | 800 |
| JSON | `design-content/services__google-ads-search.json` |

**Хлібні крихти:** Головна (`/`) › Google Ads (`/services/google-ads/`) › Пошукова реклама

#### Блоки (10)

**1. hero** — Контекстна реклама Google у пошуку · `<section .hero>`

- _[hero-tag]_ GOOGLE SEARCH · КОНТЕКСТНА РЕКЛАМА · ХАРКІВ
- **H1:** Контекстна реклама Google у пошуку
- Infinite Union налаштовує контекстну рекламу Google для бізнесу, який уже шукають: послуги, ремонт, доставка, B2B. Збираємо семантику, пишемо оголошення, налаштовуємо відстеження дзвінків і заявок. Запуск від $300, ведення від $200/міс, бюджет на кліки — окремо.
- _[hs-val]_ $300
- _[hs-key]_ ЗАПУСК, ВІД
- _[hs-val]_ $200
- _[hs-key]_ ВЕДЕННЯ / МІС
- _[hs-key]_ БЮДЖЕТ / МІС, ВІД
- Посилання/кнопка: «ОБГОВОРИТИ ЗАПУСК» → `/services/google-ads-search/#contact`

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ ПОШУКОВА РЕКЛАМА·KEYWORD RESEARCH·A/B ТЕСТИ·SMART BIDDING·CONVERSION TRACKING·QUALITY SCORE·ПОШУКОВА РЕКЛАМА·KEYWORD RESEARCH·A/B ТЕСТИ·SMART BIDDING·CONVERSION TRACKING·QUALITY SCORE·

**3. problem** — Коли контекстна реклама працює · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Коли контекстна реклама працює
- Контекстна реклама Google показує оголошення людям, які прямо зараз вводять запит: «ремонт пральної машини Харків», «доставка квітів», «бухгалтерський супровід ТОВ». Це найкоротший шлях від потреби до заявки — але лише якщо ви платите за правильні запити.
- Типові втрати бюджету: кліки за «безкоштовно», «своїми руками», «вакансії» та назвами конкурентів; одне оголошення на всі послуги, яке веде на головну; відсутність відстеження дзвінків, через що незрозуміло, яке ключове слово дало клієнта. А якщо ваш продукт поки ніхто не шукає, пошук не допоможе — краще почати з таргетованої реклами.

**4. included-cards** — Що робимо в пошукових кампаніях · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що робимо в пошукових кампаніях
- **H3:** Семантика за наміром
- _[feat-desc]_ Збираємо запити з Keyword Planner і підказок Google, відділяємо «гарячі» (купити, ціна, замовити) від інформаційних. Платимо лише за ті, де є намір звернутися.
- **H3:** Оголошення під кожну послугу
- _[feat-desc]_ Адаптивні оголошення з кількома заголовками та описами: ціна, терміни, географія. Тексти погоджуємо з вами до запуску.
- **H3:** Стратегія ставок
- _[feat-desc]_ Стартуємо з контрольованих ставок, на автоматичні стратегії (цільова ціна конверсії) переходимо, коли накопичено конверсії.
- **H3:** Відстеження дзвінків і заявок
- _[feat-desc]_ Форми, кліки по телефону, переходи в Telegram і Viber через GA4 і Tag Manager. Видно, який запит дав заявку.
- **H3:** Гео і розклад
- _[feat-desc]_ Показ лише у ваших містах чи районах і в години, коли ви можете відповісти на дзвінок.
- **H3:** Мінус-слова і розширення
- _[feat-desc]_ Стартовий список мінус-слів до запуску, далі — щотижнева чистка запитів. Додаткові посилання, телефон, ціни, адреса в оголошенні.

**5. process** — Як запускаємо пошукову рекламу · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як запускаємо пошукову рекламу
- _[level-note]_ 01 · 2–4 дні
- **H3:** Бриф і семантика
- _[feat-desc]_ Послуги, регіони, середній чек, конкуренти. Збираємо і чистимо семантику, оцінюємо попит у ніші.
- _[level-note]_ 02 · 1–2 дні
- **H3:** Оголошення і трекінг
- _[feat-desc]_ Структура кампаній за послугами, тексти, розширення, налаштування конверсій у GA4.
- _[level-note]_ 03 · далі щотижня
- **H3:** Запуск і перший місяць
- _[feat-desc]_ Модерація, запуск з денним лімітом, щотижнева чистка запитів. Стабільну картину видно через 2–4 тижні.

**6. pricing-tiers** — Ціна контекстної реклами Google · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна контекстної реклами Google
- **H3:** Запуск
- _[level-price]_ від $300
- _[level-note]_ налаштування · разово
- Список:
  - Семантика і мінус-слова
  - Кампанії за напрямами послуг
  - Адаптивні оголошення і розширення
  - Конверсії в GA4 і Tag Manager
  - Передача акаунта та інструкція
  - Щотижнева оптимізація
  - Щомісячні звіти
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/google-ads-search/#contact`
- _[level-badge]_ НАЙЧАСТІШЕ
- **H3:** Ведення
- _[level-price]_ від $200/міс
- _[level-note]_ оптимізація + звіти
- Список:
  - Щотижнева чистка пошукових запитів
  - Тести оголошень
  - Коригування ставок і бюджету
  - Зведення в Telegram щотижня
  - Звіт щомісяця
  - Відкритий доступ до акаунта
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/google-ads-search/#contact`
- **H3:** Великі бюджети
- _[level-price]_ від $500/міс
- _[level-note]_ кілька напрямів · регіонів · мов
- Список:
  - Кілька регіонів і мов
  - Окремі кампанії під кожну послугу
  - Ремаркетинг у пошуку
  - Передача заявок у CRM
  - Звіти в Ad Tracker (у розробці)
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/google-ads-search/#contact`
- Рекламний бюджет оплачується окремо, напряму в Google Ads; рекомендований старт — від $300/міс. Ціну кліку чи заявки до збору семантики не називаємо: вона залежить від ніші та конкуренції. Performance Max, YouTube і ремаркетинг — на сторінці налаштування Google Ads, усі тарифи — на сторінці цін.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Запуск | від $300 · налаштування · разово | — | Семантика і мінус-слова; Кампанії за напрямами послуг; Адаптивні оголошення і розширення; Конверсії в GA4 і Tag Manager; Передача акаунта та інструкція; Щотижнева оптимізація; Щомісячні звіти |
| Ведення _(НАЙЧАСТІШЕ)_ | від $200/міс · оптимізація + звіти | — | Щотижнева чистка пошукових запитів; Тести оголошень; Коригування ставок і бюджету; Зведення в Telegram щотижня; Звіт щомісяця; Відкритий доступ до акаунта |
| Великі бюджети | від $500/міс · кілька напрямів · регіонів · мов | — | Кілька регіонів і мов; Окремі кампанії під кожну послугу; Ремаркетинг у пошуку; Передача заявок у CRM; Звіти в Ad Tracker (у розробці) |

**7. portfolio** — Приклади з портфоліо · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Приклади з портфоліо
- **H3:** Transfer Kharkiv
- _[feat-desc]_ Лендінг трансферної компанії з Харкова: конверсія 8.4%, 119+ SEO-позицій у топі Google, заявки 24/7 приймає Telegram-бот. Такий лендінг — хороша посадкова для пошукової реклами: одна послуга, одна дія.
- **H3:** Ad Tracker by IU
- _[feat-desc]_ Власний дашборд IU: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить 5+ годин на тиждень на звітах. Зараз у розробці.
- Усі проєкти — у портфоліо.

**8. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/google-ads/`:
  - Усі формати
  - Налаштування Google Ads
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Посадкова під рекламу
  - Лендінг від $600
  - Детальніше →
- Картка-посилання → `/services/seo/`:
  - Органічний трафік
  - SEO просування
  - Детальніше →
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - Блог
  - Google Ads чи SEO
  - Детальніше →

**9. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує контекстна реклама Google?
  **A:** Наша робота: запуск від $300, ведення від $200/міс. Кліки ви оплачуєте Google окремо, рекомендований бюджет — від $300/міс. Точнішу оцінку даємо після збору семантики.
- **Q:** Чи можна обмежити витрати?
  **A:** Так: денний бюджет, географія і розклад показів. В окремий день Google може витратити більше денного ліміту, але за місяць не списує більше, ніж денний бюджет × 30,4.
- **Q:** Чим пошукова реклама відрізняється від Performance Max?
  **A:** У пошуку ви контролюєте ключові слова й тексти. Performance Max — автоматичні кампанії на всі мережі Google, найкраще підходять магазинам із фідом товарів. Для послуг зазвичай починаємо з пошуку.
- **Q:** Чи можу я вести рекламу сам після налаштування?
  **A:** Так. Акаунт ваш, після запуску передаємо доступи та коротку інструкцію. Або продовжуємо ведення — вирішуєте ви.
- **Q:** Коли з'являться перші заявки?
  **A:** Оголошення починають показуватися після модерації, зазвичай протягом доби. Перші заявки можуть прийти одразу, стабільну ціну заявки видно через 2–4 тижні. Кількість заявок заздалегідь не гарантуємо.
- **Q:** Що, якщо в моїй ніші мало пошукових запитів?
  **A:** Тоді обсяг пошукової реклами обмежений попитом, і більший бюджет не допоможе. Скажемо про це після збору семантики й запропонуємо таргетовану рекламу або SEO.

**10. cta** — Покажіться тим, хто шукає вас · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ЗАПУСТИТИ РЕКЛАМУ?
- **H2:** Покажіться тим, хто шукає вас
- Опишіть послуги та регіон — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує контекстна реклама Google?**

   Наша робота: запуск від $300, ведення від $200/міс. Кліки ви оплачуєте Google окремо, рекомендований бюджет — від $300/міс. Точнішу оцінку даємо після збору семантики.

2. **Чи можна обмежити витрати?**

   Так: денний бюджет, географія і розклад показів. В окремий день Google може витратити більше денного ліміту, але за місяць не списує більше, ніж денний бюджет × 30,4.

3. **Чим пошукова реклама відрізняється від Performance Max?**

   У пошуку ви контролюєте ключові слова й тексти. Performance Max — автоматичні кампанії на всі мережі Google, найкраще підходять магазинам із фідом товарів. Для послуг зазвичай починаємо з пошуку.

4. **Чи можу я вести рекламу сам після налаштування?**

   Так. Акаунт ваш, після запуску передаємо доступи та коротку інструкцію. Або продовжуємо ведення — вирішуєте ви.

5. **Коли з'являться перші заявки?**

   Оголошення починають показуватися після модерації, зазвичай протягом доби. Перші заявки можуть прийти одразу, стабільну ціну заявки видно через 2–4 тижні. Кількість заявок заздалегідь не гарантуємо.

6. **Що, якщо в моїй ніші мало пошукових запитів?**

   Тоді обсяг пошукової реклами обмежений попитом, і більший бюджет не допоможе. Скажемо про це після збору семантики й запропонуємо таргетовану рекламу або SEO.


#### Внутрішні посилання з контенту (11)

- «ОБГОВОРИТИ ЗАПУСК» → `/services/google-ads-search/#contact` · блок 1
- «таргетованої реклами» → `/services/meta-ads/` · блок 3
- «ОБГОВОРИТИ» → `/services/google-ads-search/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/google-ads-search/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/google-ads-search/#contact` · блок 6
- «налаштування Google Ads» → `/services/google-ads/` · блок 6
- «цін» → `/pricing/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- «таргетовану рекламу» → `/services/meta-ads/` · блок 9
- «SEO» → `/services/seo/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/meta-ads-instagram/ — Реклама в Instagram

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/meta-ads-instagram/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/meta-ads/`) |
| Robots | index, follow |
| Title (56) | Реклама в Instagram — Reels, Stories, стрічка \| від $250 |
| Description (143) | Реклама в Instagram для бізнесу: Reels, Stories і стрічка, підбір аудиторій, креативи під формат, заявки в Direct або на сайт. Запуск від $250. |
| Головний ключ | реклама в Instagram |
| H1 | Реклама в Instagram |
| Слів | 721 |
| JSON | `design-content/services__meta-ads-instagram.json` |

**Хлібні крихти:** Головна (`/`) › Таргет Facebook та Instagram (`/services/meta-ads/`) › Реклама в Instagram

#### Блоки (10)

**1. hero** — Реклама в Instagram · `<section .hero>`

- _[hero-tag]_ INSTAGRAM · REELS · STORIES · СТРІЧКА
- **H1:** Реклама в Instagram
- Infinite Union з Харкова налаштовує рекламу в Instagram для кафе, салонів, онлайн-магазинів, брендів і сервісів, які продають через візуал. Креативи під кожен формат, аудиторії, заявки в Direct або на сайт. Запуск від $250, рекламний бюджет — окремо, від $300/міс.
- _[format-badge]_ Reels
- _[format-badge]_ Stories
- _[format-badge]_ Стрічка
- Посилання/кнопка: «ОБГОВОРИТИ РЕКЛАМУ» → `/services/meta-ads-instagram/#contact`

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ REELS РЕКЛАМА·STORIES ADS·ТАРГЕТИНГ АУДИТОРІЙ·LOOKALIKE·РЕТАРГЕТИНГ ПІКСЕЛЕМ·A/B ТЕСТИ·REELS РЕКЛАМА·STORIES ADS·ТАРГЕТИНГ АУДИТОРІЙ·LOOKALIKE·РЕТАРГЕТИНГ ПІКСЕЛЕМ·A/B ТЕСТИ·

**3. problem** — Чому реклама в Instagram не окупається · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** Чому реклама в Instagram не окупається
- В Instagram люди не шукають — вони дивляться. На те, щоб зупинити палець, у вас секунда. Найчастіша помилка — один горизонтальний банер, обрізаний під усі плейсменти: у Stories він губиться, у Reels виглядає чужим.
- Друга — заявки йдуть у Direct, а відповідають на них через кілька годин. Реклама в Instagram — це ланцюжок: креатив, профіль і швидка відповідь. Ми налаштовуємо всі три ланки: формати, аудиторії та маршрут заявки — Direct, лід-форма, сайт або Telegram-бот.

**4. included-cards** — Реклама в Instagram: що ми робимо · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Реклама в Instagram: що ми робимо
- **H3:** Reels
- _[feat-desc]_ Вертикальні відео 9:16, які виглядають як звичайний контент. Найбільше охоплення серед форматів Instagram.
- **H3:** Stories з кнопкою
- _[feat-desc]_ Повноекранний формат із переходом на сайт, у Direct або на лід-форму. Окремий креатив, а не обрізаний банер.
- **H3:** Стрічка і каруселі
- _[feat-desc]_ Для каталогу, кейсів «до/після», кількох послуг в одному оголошенні.
- **H3:** Профіль як посадкова
- _[feat-desc]_ Перевіряємо шапку, хайлайти й закріплені дописи — те, що людина бачить одразу після кліку на рекламу.
- **H3:** Заявки в Direct і лід-форми
- _[feat-desc]_ Автовідповіді, швидкі запитання, передача заявок у Telegram, щоб жодна не загубилась.
- **H3:** Ретаргетинг на взаємодії
- _[feat-desc]_ Показуємо рекламу тим, хто дивився Reels, писав у Direct, зберігав дописи або був на сайті.

**5. process** — Як запускаємо · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як запускаємо
- _[level-note]_ 01 · 1–2 дні
- **H3:** Бриф і аудит профілю
- _[feat-desc]_ Продукт, аудиторія, географія, стан профілю. Підключаємо Instagram до Meta Business Suite.
- _[level-note]_ 02 · 3–5 днів
- **H3:** Креативи і трекінг
- _[feat-desc]_ Креативи окремо під Reels, Stories і стрічку, Pixel і Conversions API, якщо є сайт.
- _[level-note]_ 03 · далі щотижня
- **H3:** Запуск і тести
- _[feat-desc]_ Перші 1–2 тижні алгоритм навчається. Далі залишаємо креативи, що дають заявки, решту замінюємо.

**6. pricing-tiers** — Ціна реклами в Instagram · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна реклами в Instagram
- **H3:** Старт
- _[level-price]_ від $250
- _[level-note]_ налаштування · разово
- Список:
  - Підключення до Meta Business Suite
  - Pixel і події (якщо є сайт)
  - Кампанія на Reels, Stories і стрічку
  - Аудиторії під продукт
  - Перші креативи і тексти
  - Ретаргетинг
  - Щомісячні звіти
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact`
- _[level-badge]_ НАЙЧАСТІШЕ
- **H3:** Ведення
- _[level-price]_ від $200/міс
- _[level-note]_ оптимізація + креативи
- Список:
  - Нові креативи під формати
  - Тести аудиторій
  - Ретаргетинг і Lookalike
  - Conversions API
  - Зведення щотижня
  - Звіт щомісяця
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact`
- **H3:** E-commerce
- _[level-price]_ від $400/міс
- _[level-note]_ магазини з каталогом
- Список:
  - Каталог товарів у Commerce Manager
  - Динамічні оголошення товарів
  - Advantage+ для магазинів
  - Кампанії під категорії
  - Передача замовлень у CRM
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact`
- Рекламний бюджет оплачується окремо, напряму в Meta; рекомендуємо від $300/міс. Ціну заявки й ROAS до запуску не обіцяємо. Якщо вам потрібен і Facebook — дивіться таргетовану рекламу Facebook та Instagram, усі тарифи — на сторінці цін.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Старт | від $250 · налаштування · разово | — | Підключення до Meta Business Suite; Pixel і події (якщо є сайт); Кампанія на Reels, Stories і стрічку; Аудиторії під продукт; Перші креативи і тексти; Ретаргетинг; Щомісячні звіти |
| Ведення _(НАЙЧАСТІШЕ)_ | від $200/міс · оптимізація + креативи | — | Нові креативи під формати; Тести аудиторій; Ретаргетинг і Lookalike; Conversions API; Зведення щотижня; Звіт щомісяця |
| E-commerce | від $400/міс · магазини з каталогом | — | Каталог товарів у Commerce Manager; Динамічні оголошення товарів; Advantage+ для магазинів; Кампанії під категорії; Передача замовлень у CRM |

**7. portfolio** — Наші інструменти · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Наші інструменти
- **H3:** InfinityCreo
- _[feat-desc]_ AI-генерація рекламних креативів через n8n: від брифу до банера приблизно за 3 хвилини, 10+ форматів — зручно, коли під Reels, Stories і стрічку потрібні різні версії.
- **H3:** Ad Tracker by IU
- _[feat-desc]_ Власний дашборд IU: Meta, Google і TikTok Ads в одному вікні, автооновлення кожні 2 години, 90 днів історії. Економить 5+ годин на тиждень на звітах. Зараз у розробці.
- Усі проєкти — у портфоліо.

**8. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/meta-ads/`:
  - Facebook + Instagram
  - Таргетована реклама
  - Детальніше →
- Картка-посилання → `/services/tiktok-ads/`:
  - Вертикальне відео
  - Реклама в TikTok
  - Детальніше →
- Картка-посилання → `/services/websites-landing/`:
  - Посадкова під рекламу
  - Лендінг від $600
  - Детальніше →
- Картка-посилання → `/pricing/`:
  - Усі ціни
  - Тарифи агенції
  - Детальніше →

**9. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує реклама в Instagram?
  **A:** Налаштування — від $250 разово, ведення — від $200/міс, для магазинів з каталогом — від $400/міс. Рекламний бюджет — окремо, рекомендуємо від $300/міс.
- **Q:** Який формат обрати: Reels, Stories чи стрічку?
  **A:** Reels дають найбільше охоплення, Stories — швидкий перехід за кнопкою, стрічка і каруселі — для каталогу й кейсів. Зазвичай запускаємо всі три з окремими креативами і залишаємо те, що дає заявки.
- **Q:** Чи потрібен сайт?
  **A:** Ні, заявки можна збирати в Direct або через лід-форму. Але сайт з Pixel дає алгоритму більше даних і відкриває ретаргетинг.
- **Q:** Хто робить креативи?
  **A:** Статичні макети, каруселі й тексти — ми, в межах ведення. Зйомку Reels з людьми або UGC-контент — окремо, або монтуємо з ваших матеріалів.
- **Q:** Що потрібно від мене для старту?
  **A:** Професійний акаунт Instagram (бізнес або автор), підключений до Meta Business Suite, і доступ до платіжного профілю. Якщо чогось немає — допоможемо налаштувати.
- **Q:** Коли буде результат?
  **A:** Перші 1–2 тижні кампанія навчається, вартість заявки в цей час коливається. Висновки робимо після накопичення даних; конкретну кількість заявок заздалегідь не обіцяємо.

**10. cta** — Покажемо ваш продукт тим, кому він потрібен · `<section#contact .cta-final>`

- _[cta-label]_ ГОТОВІ ДО РЕКЛАМИ В INSTAGRAM?
- **H2:** Покажемо ваш продукт тим, кому він потрібен
- Надішліть посилання на профіль — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує реклама в Instagram?**

   Налаштування — від $250 разово, ведення — від $200/міс, для магазинів з каталогом — від $400/міс. Рекламний бюджет — окремо, рекомендуємо від $300/міс.

2. **Який формат обрати: Reels, Stories чи стрічку?**

   Reels дають найбільше охоплення, Stories — швидкий перехід за кнопкою, стрічка і каруселі — для каталогу й кейсів. Зазвичай запускаємо всі три з окремими креативами і залишаємо те, що дає заявки.

3. **Чи потрібен сайт?**

   Ні, заявки можна збирати в Direct або через лід-форму. Але сайт з Pixel дає алгоритму більше даних і відкриває ретаргетинг.

4. **Хто робить креативи?**

   Статичні макети, каруселі й тексти — ми, в межах ведення. Зйомку Reels з людьми або UGC-контент — окремо, або монтуємо з ваших матеріалів.

5. **Що потрібно від мене для старту?**

   Професійний акаунт Instagram (бізнес або автор), підключений до Meta Business Suite, і доступ до платіжного профілю. Якщо чогось немає — допоможемо налаштувати.

6. **Коли буде результат?**

   Перші 1–2 тижні кампанія навчається, вартість заявки в цей час коливається. Висновки робимо після накопичення даних; конкретну кількість заявок заздалегідь не обіцяємо.


#### Внутрішні посилання з контенту (8)

- «ОБГОВОРИТИ РЕКЛАМУ» → `/services/meta-ads-instagram/#contact` · блок 1
- «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/meta-ads-instagram/#contact` · блок 6
- «таргетовану рекламу Facebook та Instagram» → `/services/meta-ads/` · блок 6
- «цін» → `/pricing/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/seo-audit/ — SEO аудит

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/seo-audit/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/seo/`) |
| Robots | index, follow |
| Title (60) | SEO аудит сайту — технічний аналіз від $100 \| Infinite Union |
| Description (152) | SEO аудит сайту: індексація, швидкість і Core Web Vitals, структура, мета-теги, дублікати, розмітка. Звіт з пріоритетами виправлень. Від $100, 3–5 днів. |
| Головний ключ | SEO аудит сайту |
| H1 | SEO аудит сайту з планом виправлень |
| Слів | 749 |
| JSON | `design-content/services__seo-audit.json` |

**Хлібні крихти:** Головна (`/`) › SEO просування (`/services/seo/`) › SEO аудит

#### Блоки (10)

**1. hero** — SEO аудит сайту з планом виправлень · `<section .hero>`

- _[hero-tag]_ SEO АУДИТ · ТЕХНІЧНИЙ АНАЛІЗ · ПЛАН ДІЙ
- **H1:** SEO аудит сайту з планом виправлень
- Infinite Union з Харкова перевіряє сайт так, як його бачить Google: індексація, швидкість і Core Web Vitals, структура, мета-теги, дублікати, розмітка. На виході — звіт із пріоритетами: що виправити першим і як. Базовий аудит від $100 за 3 дні, повний — від $300 за 5 днів.
- Посилання/кнопка: «ЗАМОВИТИ АУДИТ» → `/services/seo-audit/#contact`

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ CORE WEB VITALS·ІНДЕКСАЦІЯ СТОРІНОК·ТЕХНІЧНИЙ SEO·СЕМАНТИЧНИЙ АНАЛІЗ·ПОСИЛАЛЬНИЙ ПРОФІЛЬ·КОНКУРЕНТНИЙ АНАЛІЗ·CORE WEB VITALS·ІНДЕКСАЦІЯ СТОРІНОК·ТЕХНІЧНИЙ SEO·СЕМАНТИЧНИЙ АНАЛІЗ·ПОСИЛАЛЬНИЙ ПРОФІЛЬ·КОНКУРЕНТНИЙ АНАЛІЗ·

**3. problem** — Коли варто замовити SEO аудит сайту · `<section>`

- _[sec-label]_ КОЛИ ПОТРІБЕН
- **H2:** Коли варто замовити SEO аудит сайту
- SEO аудит сайту потрібен, коли трафік із Google впав після редизайну чи переїзду на нову CMS; коли сайт новий, а в індексі лише кілька сторінок; перед стартом SEO просування або реклами, щоб не вкладати гроші в сайт із технічними помилками.
- Що таке аудит і з чого він складається, ми пояснили в статті «SEO аудит: що це». Тут — що конкретно перевіряємо, що ви отримаєте і скільки це коштує.

**4. included-cards** — Що входить в аудит · `<section>`

- _[sec-label]_ ЩО ПЕРЕВІРЯЄМО
- **H2:** Що входить в аудит
- **H3:** Індексація і сканування
- _[check-desc]_ robots.txt, sitemap, коди відповіді, noindex, canonical. Порівнюємо, що є на сайті і що бачить Google у Search Console.
- _[check-count]_ Search Console · sitemap · robots.txt
- **H3:** Швидкість і Core Web Vitals
- _[check-desc]_ LCP, INP, CLS на мобільних і десктопі: що саме гальмує сторінки — зображення, скрипти, шрифти, сервер.
- _[check-count]_ PageSpeed · CrUX · Lighthouse
- **H3:** Структура і внутрішні посилання
- _[check-desc]_ Глибина вкладеності, сторінки без вхідних посилань, биті посилання, ланцюжки редиректів.
- _[check-count]_ Структура · перелінковка
- **H3:** Мета-теги і заголовки
- _[check-desc]_ Title, description, H1: порожні, задовгі, однакові на різних сторінках.
- _[check-count]_ Title · description · H1
- **H3:** Дублікати і каннібалізація
- _[check-desc]_ Версії з www і без, параметри в URL, кілька сторінок, що конкурують за один запит.
- _[check-count]_ Дублікати · канонічні URL
- **H3:** Мікророзмітка і мовні версії
- _[check-desc]_ Schema.org (Organization, Service, FAQ, Product), її валідність, hreflang для мовних версій.
- _[check-count]_ Schema.org · hreflang

**5. process** — Як проходить аудит · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як проходить аудит
- **H3:** Бриф і доступи
- _[check-desc]_ Цілі сайту, основні послуги, конкуренти. Для повного аудиту — доступ на читання до Search Console і GA4.
- _[check-count]_ День 1
- **H3:** Сканування і аналіз
- _[check-desc]_ Скануємо сайт, перевіряємо швидкість, індексацію, структуру, контент.
- _[check-count]_ Дні 1–4
- **H3:** Звіт з пріоритетами
- _[check-desc]_ Кожна проблема — з поясненням, впливом і конкретною рекомендацією: що виправити першим, що можна пізніше.
- _[check-count]_ 3 дні — базовий · 5 днів — повний
- **H3:** Розбір звіту
- _[check-desc]_ Проходимо звіт разом на дзвінку і відповідаємо на питання вашого розробника.
- _[check-count]_ Після здачі звіту

**6. pricing-tiers** — Ціна SEO аудиту сайту · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна SEO аудиту сайту
- **H3:** Базовий
- _[level-price]_ від $100
- _[level-note]_ до 50 сторінок · 3 дні
- Список:
  - Індексація і сканування
  - Швидкість і Core Web Vitals
  - Мета-теги і заголовки
  - Технічні помилки
  - Список виправлень
  - Аналіз дублікатів і каннібалізації
  - Порівняння з конкурентами
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-audit/#contact`
- _[level-badge]_ НАЙЧАСТІШЕ
- **H3:** Повний
- _[level-price]_ від $300
- _[level-note]_ сайти понад 50 сторінок · 5 днів
- Список:
  - Усе з базового
  - Дані Search Console і GA4
  - Дублікати і каннібалізація
  - Мікророзмітка і hreflang
  - Порівняння з конкурентами у видачі
  - План виправлень з пріоритетами
  - Розбір звіту на дзвінку
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-audit/#contact`
- **H3:** Аудит + просування
- _[level-price]_ від $150/міс
- _[level-note]_ виправлення + SEO щомісяця
- Список:
  - Виправлення за звітом
  - Семантика і нові сторінки
  - Тексти й мета-теги
  - Робота з посиланнями
  - Звіт щомісяця
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-audit/#contact`
- Аудит — разова послуга. Виправлення можна доручити своєму розробнику за звітом або нам у межах SEO просування сайту. Усі тарифи — на сторінці цін.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Базовий | від $100 · до 50 сторінок · 3 дні | до 50 сторінок · 3 дні | Індексація і сканування; Швидкість і Core Web Vitals; Мета-теги і заголовки; Технічні помилки; Список виправлень; Аналіз дублікатів і каннібалізації; Порівняння з конкурентами |
| Повний _(НАЙЧАСТІШЕ)_ | від $300 · сайти понад 50 сторінок · 5 днів | сайти понад 50 сторінок · 5 днів | Усе з базового; Дані Search Console і GA4; Дублікати і каннібалізація; Мікророзмітка і hreflang; Порівняння з конкурентами у видачі; План виправлень з пріоритетами; Розбір звіту на дзвінку |
| Аудит + просування | від $150/міс · виправлення + SEO щомісяця | — | Виправлення за звітом; Семантика і нові сторінки; Тексти й мета-теги; Робота з посиланнями; Звіт щомісяця |

**7. portfolio** — Приклад з портфоліо · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Приклад з портфоліо
- **H3:** Transfer Kharkiv
- _[check-desc]_ Лендінг трансферної компанії з Харкова: конверсія 8.4%, 119+ SEO-позицій у топі Google, заявки 24/7 приймає Telegram-бот. Технічна SEO-база закладена ще на етапі розробки: статичний HTML/CSS/JS, швидке завантаження.
- _[check-count]_ SEO · HTML/CSS/JS · Python-бот
- Усі проєкти — у портфоліо.

**8. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/seo/`:
  - Щомісячна робота
  - SEO просування сайту
  - Детальніше →
- Картка-посилання → `/services/seo-local/`:
  - Google Maps
  - Локальне SEO
  - Детальніше →
- Картка-посилання → `/blog/seo-audit-shcho-tse/`:
  - Блог
  - SEO аудит: що це
  - Детальніше →
- Картка-посилання → `/services/websites/`:
  - Якщо сайт застарів
  - Розробка сайтів
  - Детальніше →

**9. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує SEO аудит сайту?
  **A:** Базовий — від $100 для сайтів до 50 сторінок, готовий за 3 дні. Повний — від $300, 5 днів. Точну ціну називаємо після того, як подивимось сайт.
- **Q:** Що я отримаю в результаті?
  **A:** Звіт у Google Docs або PDF: список проблем, вплив кожної на SEO, конкретні рекомендації та порядок виправлень. До повного аудиту додаємо розбір звіту на дзвінку.
- **Q:** Чим базовий аудит відрізняється від повного?
  **A:** Базовий охоплює технічну частину: індексацію, швидкість, мета-теги, помилки. Повний додає дані Search Console і GA4, дублікати й каннібалізацію, мікророзмітку і порівняння з конкурентами.
- **Q:** Чи потрібен доступ до сайту?
  **A:** Для базового аудиту — ні, аналізуємо публічну частину. Для повного потрібен доступ на читання до Google Search Console і GA4. Адмінка сайту не потрібна.
- **Q:** Ви виправите знайдені проблеми?
  **A:** Можемо — у межах SEO просування від $150/міс або окремою задачею за оцінкою. Або передайте звіт своєму розробнику: рекомендації написані так, щоб їх можна було виконати без нас.
- **Q:** Коли буде ефект після виправлень?
  **A:** Технічні виправлення Google враховує після повторного сканування — зазвичай за кілька тижнів. Зростання позицій залежить від конкуренції й контенту; гарантувати конкретні позиції не може ніхто.

**10. cta** — Надішліть сайт — скажемо, що заважає · `<section#contact .cta-final>`

- _[cta-label]_ ПОТРІБЕН АУДИТ?
- **H2:** Надішліть сайт — скажемо, що заважає
- Відповімо протягом 15 хвилин у робочий час і назвемо ціну аудиту
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує SEO аудит сайту?**

   Базовий — від $100 для сайтів до 50 сторінок, готовий за 3 дні. Повний — від $300, 5 днів. Точну ціну називаємо після того, як подивимось сайт.

2. **Що я отримаю в результаті?**

   Звіт у Google Docs або PDF: список проблем, вплив кожної на SEO, конкретні рекомендації та порядок виправлень. До повного аудиту додаємо розбір звіту на дзвінку.

3. **Чим базовий аудит відрізняється від повного?**

   Базовий охоплює технічну частину: індексацію, швидкість, мета-теги, помилки. Повний додає дані Search Console і GA4, дублікати й каннібалізацію, мікророзмітку і порівняння з конкурентами.

4. **Чи потрібен доступ до сайту?**

   Для базового аудиту — ні, аналізуємо публічну частину. Для повного потрібен доступ на читання до Google Search Console і GA4. Адмінка сайту не потрібна.

5. **Ви виправите знайдені проблеми?**

   Можемо — у межах SEO просування від $150/міс або окремою задачею за оцінкою. Або передайте звіт своєму розробнику: рекомендації написані так, щоб їх можна було виконати без нас.

6. **Коли буде ефект після виправлень?**

   Технічні виправлення Google враховує після повторного сканування — зазвичай за кілька тижнів. Зростання позицій залежить від конкуренції й контенту; гарантувати конкретні позиції не може ніхто.


#### Внутрішні посилання з контенту (9)

- «ЗАМОВИТИ АУДИТ» → `/services/seo-audit/#contact` · блок 1
- ««SEO аудит: що це»» → `/blog/seo-audit-shcho-tse/` · блок 3
- «ОБГОВОРИТИ» → `/services/seo-audit/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/seo-audit/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/seo-audit/#contact` · блок 6
- «SEO просування сайту» → `/services/seo/` · блок 6
- «цін» → `/pricing/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /services/seo-local/ — Локальне SEO

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/seo-local/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **cluster** (батьківська: `/services/seo/`) |
| Robots | index, follow |
| Title (54) | Локальне SEO і Google Maps — профіль компанії від $200 |
| Description (155) | Локальне SEO: оптимізація профілю Google Business, позиції в Google Maps, локальні сторінки, NAP, робота з відгуками. Старт від $200, ведення від $150/міс. |
| Головний ключ | локальне SEO Google Maps |
| H1 | Локальне SEO і Google Maps |
| Слів | 710 |
| JSON | `design-content/services__seo-local.json` |

**Хлібні крихти:** Головна (`/`) › SEO просування (`/services/seo/`) › Локальне SEO

#### Блоки (10)

**1. hero** — Локальне SEO і Google Maps · `<section .hero>`

- _[hero-tag-text]_ LOCAL SEO · GOOGLE MAPS · GOOGLE BUSINESS
- **H1:** Локальне SEO і Google Maps
- Infinite Union оптимізує профіль компанії в Google Business, сайт і згадки про вас, щоб вас знаходили в Google Maps і локальному пошуку — у Харкові чи будь-якому іншому місті. Старт від $200, ведення від $150/міс.
- _[ltype]_ Кафе та ресторани«кава поруч», «піца Харків»
- _[ltype]_ Медицина«стоматолог Олексіївка»
- _[ltype]_ Сервіси«шиномонтаж Салтівка»
- _[ltype]_ Магазини«квіти біля метро»
- Посилання/кнопка: «ОБГОВОРИТИ ПРОФІЛЬ» → `/services/seo-local/#contact`

**2. marquee** · `<div .marquee-wrap>`

- _[декор, aria-hidden]_ GOOGLE BUSINESS PROFILE·GOOGLE MAPS SEO·ЛОКАЛЬНІ ЗАПИТИ·ВІДГУКИ КЛІЄНТІВ·NAP КОНСИСТЕНТНІСТЬ·LOCAL CITATIONS·GOOGLE BUSINESS PROFILE·GOOGLE MAPS SEO·ЛОКАЛЬНІ ЗАПИТИ·ВІДГУКИ КЛІЄНТІВ·NAP КОНСИСТЕНТНІСТЬ·LOCAL CITATIONS·

**3. problem** — На карті вас бачать, але не обирають · `<section>`

- _[sec-label]_ ЗАДАЧА
- **H2:** На карті вас бачать, але не обирають
- Коли людина шукає «стоматолог поруч» або «шиномонтаж Салтівка», Google показує карту з кількома компаніями ще до звичайних сайтів. Бути на карті й бути в цьому блоці — різні речі. Профіль без фото, з неправильними годинами роботи, без відповідей на відгуки і з іншою адресою, ніж на сайті, Google показує рідше.
- Локальне SEO в Google Maps — це впорядкування всього, що Google знає про ваш бізнес: профіль компанії, сайт, каталоги, відгуки. Підходить кафе, клінікам, салонам, автосервісам, магазинам і компаніям, що працюють у певному районі чи місті.

**4. included-cards** — Локальне SEO Google Maps: що робимо · `<section>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Локальне SEO Google Maps: що робимо
- **H3:** Профіль Google Business
- _[feat-desc]_ Категорії, послуги, години роботи, фото, атрибути, опис. Заповнюємо все, що Google дозволяє заповнити.
- **H3:** Однакові назва, адреса, телефон
- _[feat-desc]_ Перевіряємо, щоб NAP збігалися на сайті, в профілі, каталогах і соцмережах. Розбіжності знижують довіру Google.
- **H3:** Відгуки
- _[feat-desc]_ Налаштовуємо простий спосіб попросити відгук у реальних клієнтів і шаблони відповідей. Відгуки не купуємо й не пишемо.
- **H3:** Локальні сторінки
- _[feat-desc]_ Окремі сторінки сайту під райони або міста, які ви обслуговуєте, — з адресою, картою і послугами.
- **H3:** Розмітка LocalBusiness
- _[feat-desc]_ Schema.org з адресою, годинами, телефоном і координатами, щоб Google точно зв'язав сайт із профілем.
- **H3:** Пости і фото
- _[feat-desc]_ Регулярні оновлення профілю: акції, новини, фото робіт. Профіль виглядає живим.

**5. process** — Як працюємо · `<section>`

- _[sec-label]_ ЕТАПИ
- **H2:** Як працюємо
- _[level-note]_ 01 · 2–3 дні
- **H3:** Аудит профілю і карти
- _[feat-desc]_ Перевіряємо профіль, сайт, каталоги й те, хто з конкурентів показується за вашими запитами.
- _[level-note]_ 02 · 1–2 тижні
- **H3:** Оптимізація
- _[feat-desc]_ Профіль, NAP, розмітка, базові правки сайту, реєстрація в ключових каталогах.
- _[level-note]_ 03 · щомісяця
- **H3:** Щомісячне ведення
- _[feat-desc]_ Пости, фото, відповіді на відгуки, локальні сторінки, звіт про дзвінки та маршрути з профілю.

**6. pricing-tiers** — Ціна локального SEO · `<section>`

- _[sec-label]_ ВАРТІСТЬ
- **H2:** Ціна локального SEO
- **H3:** Старт
- _[level-price]_ від $200
- _[level-note]_ налаштування · разово
- Список:
  - Оптимізація профілю Google Business
  - Перевірка і виправлення NAP
  - Розмітка LocalBusiness
  - Базові правки сайту
  - Реєстрація в основних каталогах
  - Ведення профілю
  - Локальні сторінки
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-local/#contact`
- _[level-badge]_ НАЙЧАСТІШЕ
- **H3:** Local Pro
- _[level-price]_ від $150/міс
- _[level-note]_ ведення профілю
- Список:
  - Пости і фото щомісяця
  - Відповіді на відгуки
  - Система збору відгуків
  - Локальні сторінки
  - Моніторинг видимості на карті
  - Звіт щомісяця
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-local/#contact`
- **H3:** Мережа філій
- _[level-price]_ від $400/міс
- _[level-note]_ кілька адрес · кілька міст
- Список:
  - Окремий профіль для кожної філії
  - Сторінка на сайті під кожну адресу
  - Єдині правила NAP
  - Зведений звіт по філіях
- Посилання/кнопка: «ОБГОВОРИТИ» → `/services/seo-local/#contact`
- Позицій у Google Maps ми не гарантуємо — на них впливають відстань до користувача, конкуренти й відгуки. Гарантуємо виконаний план робіт і щомісячний звіт. Ширше просування — на сторінці SEO просування сайту, усі ціни — на сторінці тарифів.

Тарифи блоку:

| Тариф | Ціна | Строк | Що входить |
|---|---|---|---|
| Старт | від $200 · налаштування · разово | — | Оптимізація профілю Google Business; Перевірка і виправлення NAP; Розмітка LocalBusiness; Базові правки сайту; Реєстрація в основних каталогах; Ведення профілю; Локальні сторінки |
| Local Pro _(НАЙЧАСТІШЕ)_ | від $150/міс · ведення профілю | — | Пости і фото щомісяця; Відповіді на відгуки; Система збору відгуків; Локальні сторінки; Моніторинг видимості на карті; Звіт щомісяця |
| Мережа філій | від $400/міс · кілька адрес · кілька міст | — | Окремий профіль для кожної філії; Сторінка на сайті під кожну адресу; Єдині правила NAP; Зведений звіт по філіях |

**7. portfolio** — Приклад з Харкова · `<section>`

- _[sec-label]_ ПОРТФОЛІО
- **H2:** Приклад з Харкова
- **H3:** Transfer Kharkiv
- _[feat-desc]_ Лендінг трансферної компанії з Харкова: конверсія 8.4%, 119+ SEO-позицій у топі Google, заявки 24/7 приймає Telegram-бот.
- Усі проєкти — у портфоліо.

**8. cards** — Може зацікавити · `<section>`

- ПОВ'ЯЗАНІ ПОСЛУГИ
- **H2:** Може зацікавити
- Картка-посилання → `/services/seo/`:
  - Просування сайту
  - SEO просування
  - Детальніше →
- Картка-посилання → `/services/seo-audit/`:
  - Технічна перевірка
  - SEO аудит сайту
  - Детальніше →
- Картка-посилання → `/services/websites-kharkiv/`:
  - Для бізнесу в Харкові
  - Сайт у Харкові
  - Детальніше →
- Картка-посилання → `/blog/seo-audit-shcho-tse/`:
  - Блог
  - SEO аудит: що це
  - Детальніше →

**9. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Скільки коштує локальне SEO?
  **A:** Старт — від $200 разово: профіль, NAP, розмітка, каталоги. Ведення Local Pro — від $150/міс. Для мережі філій — від $400/міс.
- **Q:** Що таке Local Pack?
  **A:** Це блок із картою і кількома компаніями, який Google показує над звичайними результатами за локальними запитами. Потрапляння в нього залежить від повноти профілю, відстані до користувача, відгуків і сайту.
- **Q:** Мій бізнес уже є в Google Maps. Навіщо оптимізація?
  **A:** Бути на карті і показуватися в першому блоці — різні речі. Неповний профіль, розбіжності в адресі чи телефоні, відгуки без відповідей знижують видимість.
- **Q:** Коли з'являться результати?
  **A:** Перші зміни після оптимізації профілю зазвичай помітні за кілька тижнів, за конкурентними запитами — за кілька місяців. Конкретних позицій не гарантуємо.
- **Q:** Чи потрібен сайт?
  **A:** Профіль працює і без сайту, але сайт із локальними сторінками та розміткою підсилює його. Якщо сайту немає — можемо зробити.
- **Q:** А якщо в мене немає офісу для клієнтів?
  **A:** Google дозволяє приховати адресу і вказати зону обслуговування — так працюють доставка, виїзні майстри, клінінг. Налаштуємо профіль саме так.

**10. cta** — Знайдемо, чому вас не обирають · `<section#contact .cta-final>`

- _[cta-label]_ ХОЧЕТЕ БІЛЬШЕ ДЗВІНКІВ З КАРТИ?
- **H2:** Знайдемо, чому вас не обирають
- Надішліть назву компанії в Google Maps — відповімо протягом 15 хвилин у робочий час
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (6, дослівно)

1. **Скільки коштує локальне SEO?**

   Старт — від $200 разово: профіль, NAP, розмітка, каталоги. Ведення Local Pro — від $150/міс. Для мережі філій — від $400/міс.

2. **Що таке Local Pack?**

   Це блок із картою і кількома компаніями, який Google показує над звичайними результатами за локальними запитами. Потрапляння в нього залежить від повноти профілю, відстані до користувача, відгуків і сайту.

3. **Мій бізнес уже є в Google Maps. Навіщо оптимізація?**

   Бути на карті і показуватися в першому блоці — різні речі. Неповний профіль, розбіжності в адресі чи телефоні, відгуки без відповідей знижують видимість.

4. **Коли з'являться результати?**

   Перші зміни після оптимізації профілю зазвичай помітні за кілька тижнів, за конкурентними запитами — за кілька місяців. Конкретних позицій не гарантуємо.

5. **Чи потрібен сайт?**

   Профіль працює і без сайту, але сайт із локальними сторінками та розміткою підсилює його. Якщо сайту немає — можемо зробити.

6. **А якщо в мене немає офісу для клієнтів?**

   Google дозволяє приховати адресу і вказати зону обслуговування — так працюють доставка, виїзні майстри, клінінг. Налаштуємо профіль саме так.


#### Внутрішні посилання з контенту (9)

- «ОБГОВОРИТИ ПРОФІЛЬ» → `/services/seo-local/#contact` · блок 1
- «ОБГОВОРИТИ» → `/services/seo-local/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/seo-local/#contact` · блок 6
- «ОБГОВОРИТИ» → `/services/seo-local/#contact` · блок 6
- «SEO просування сайту» → `/services/seo/` · блок 6
- «тарифів» → `/pricing/` · блок 6
- «портфоліо» → `/portfolio/` · блок 7
- «зробити» → `/services/websites-kharkiv/` · блок 9
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 10

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

## 7.4 Шаблон: pricing

### /pricing/ — Ціни

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/pricing/ |
| Мова | uk |
| Пара | en: `/en/pricing/` |
| Шаблон | **pricing** |
| Robots | index, follow |
| Title (60) | Скільки коштує сайт — ціни на розробку 2026 \| Infinite Union |
| Description (139) | Скільки коштує розробити сайт: лендінг від $600, корпоративний від $1000, магазин від $1200, бот від $300. Що входить у ціну, терміни, FAQ. |
| Головний ключ | скільки коштує сайт |
| Вторинні ключі | скільки коштує розробити сайт, ціна сайту, вартість розробки сайту, ціна лендингу, скільки коштує інтернет-магазин, скільки коштує телеграм бот |
| H1 | Скільки коштує сайт в Infinite Union: ціни на розробку 2026 |
| Слів | 1132 |
| JSON | `design-content/pricing.json` |

**Хлібні крихти:** Головна (`/`) › Ціни

#### Блоки (9)

**1. hero** — Скільки коштує сайт в Infinite Union: ціни на розробку 2026 · `<section .hero>`

- _[hero-label]_ ЦІНИ · 2026 · USD
- **H1:** Скільки коштує сайт в Infinite Union: ціни на розробку 2026
- Скільки коштує сайт, бот чи реклама — відповідь на одній сторінці. Infinite Union — веб-студія з Харкова, працюємо з бізнесом по Україні та в ЄС. Лендінг від $600, корпоративний сайт від $1 000, інтернет-магазин від $1 200, Telegram-бот від $300. Точну суму фіксуємо після брифу — до старту робіт.
- _[hero-stat-num]_ $600
- _[hero-stat-label]_ ЛЕНДІНГ — ВІД
- _[hero-stat-num]_ $300
- _[hero-stat-label]_ TELEGRAM-БОТ — ВІД
- _[hero-stat-num]_ 50/50
- _[hero-stat-label]_ ОПЛАТА ПОЕТАПНО
- _[hero-stat-num]_ 15хв
- _[hero-stat-label]_ ВІДПОВІДЬ У РОБОЧИЙ ЧАС

**2. pricing-table** — Ціна сайту, бота і реклами — коротко · `<section>`

- _[sec-label]_ ПРАЙС
- **H2:** Ціна сайту, бота і реклами — коротко
- Таблиця:

  | Послуга | Тарифи | Ціна |
  | --- | --- | --- |
  | САЙТИ |  |  |
  | Лендінг | Start (5–7 секцій, до 10 днів) · Pro (10+ секцій, до 3 тижнів) · Max | від $600 · від $1 200 · від $2 000 |
  | Корпоративний сайт | Представницький (5–8 сторінок, ~3 тижні) · Pro (10–20 сторінок, 4–5 тижнів) · Enterprise (50+ сторінок) | від $1 000 · від $2 000 · від $4 000 |
  | Інтернет-магазин | Start (до 100 товарів, ~3 тижні) · Pro (необмежено товарів, ~5 тижнів, Nova Poshta API) · Маркетплейс | від $1 200 · від $2 500 · від $5 000 |
  | Вебплатформа / SaaS | MVP (4–8 тижнів) · Platform (2–4 місяці) · Enterprise | від $2 500 · від $6 000 · від $15 000 |
  | Цифрова екосистема | Сайт + Telegram-бот + CRM в одній зв'язці | від $2 000 |
  | TELEGRAM-БОТИ |  |  |
  | Telegram-бот | Starter (до 2 тижнів) · Business (до 4 тижнів, оплати, CRM) · Enterprise (Mini App, AI) | від $300 · від $700 · від $1 500 |
  | Бот для продажів | Start (7 днів) · Pro (14 днів) · Max | від $500 · від $1 200 · від $2 500 |
  | Бот для ресторану | Кафе (до 50 позицій, 7 днів) · Ресторан (14 днів) · Мережа | від $600 · від $1 200 · від $2 500 |
  | CRM-інтеграція бота | Старт (1 CRM, 7 днів) · Pro (14 днів) · Enterprise | від $800 · від $1 500 · від $3 000 |
  | РЕКЛАМА (БЮДЖЕТ — ОКРЕМО) |  |  |
  | Google Ads | Налаштування разово · ведення · великі бюджети / e-commerce | від $300 · від $200/міс · від $500/міс |
  | Meta Ads (Facebook / Instagram) | Налаштування · ведення · e-commerce | від $250 · від $200/міс · від $400/міс |
  | TikTok Ads | Налаштування · ведення | від $250 · від $150/міс |
  | SEO |  |  |
  | SEO-просування | Щомісячна робота, перші результати за 3–6 місяців | від $150/міс |
  | SEO-аудит | Базовий (до 50 сторінок, 3 дні) · Повний (5 днів) | від $100 · від $300 |
  | Локальне SEO | Старт разово · Local Pro · мережа філій | від $200 · від $150/міс · від $400/міс |

- Усі ціни — у доларах США, формат «від»: це мінімальна вартість тарифу. Рекламний бюджет платите ви напряму рекламній системі: для Google Ads і Meta Ads радимо стартувати від $300/міс, для TikTok Ads — від $200/міс. Підтримка сайту після запуску — від $150/міс або погодинно. Не знаєте, що вам потрібно? Згенеруйте безкоштовне прев'ю в AI-конструкторі і покажіть його нам на брифі.

**3. included-cards** — Що входить у вартість сайту · `<section .what>`

- _[sec-label]_ ЩО ВХОДИТЬ
- **H2:** Що входить у вартість сайту
- _[what-num]_ 01
- **H3:** Унікальний дизайн
- _[what-desc]_ Макет під вашу нішу і структуру, без купленого шаблону. Спершу погоджуємо прототип, потім фінальний вигляд.
- _[what-num]_ 02
- **H3:** Адаптивна верстка
- _[what-desc]_ Сайт однаково зручний на телефоні, планшеті й десктопі. Перевіряємо на реальних пристроях перед запуском.
- _[what-num]_ 03
- **H3:** Базова SEO-оптимізація
- _[what-desc]_ Мета-теги, структура заголовків, sitemap, robots.txt, швидке завантаження. Регулярне просування — окрема послуга SEO.
- _[what-num]_ 04
- **H3:** Інтеграція і підтримка
- _[what-desc]_ Базова інтеграція з Telegram або CRM — заявки не губляться в пошті. Плюс 1 місяць підтримки після запуску, весь вихідний код і доступи — ваші.

**4. pricing-cards** — Що не входить у ціну · `<section>`

- _[sec-label]_ ОКРЕМО
- **H2:** Що не входить у ціну
- **H3:** Хостинг і домен
- _[extra-desc]_ Оплачуєте напряму провайдеру, оформлюємо на вас. Допоможемо обрати й налаштувати.
- **H3:** Рекламний бюджет
- _[extra-desc]_ Наша ціна — це налаштування і ведення кампаній. Гроші на покази йдуть Google, Meta чи TikTok з вашого кабінету.
- **H3:** Платні плагіни та API
- _[extra-desc]_ Платні сервіси, ліцензії, AI-API, SMS-розсилки, тарифи CRM — за прайсом постачальника. Перелік називаємо до старту.

**5. pricing-cards** — Що впливає на ціну сайту · `<section .what>`

- _[sec-label]_ ВІД ЧОГО ЗАЛЕЖИТЬ
- **H2:** Що впливає на ціну сайту
- _[what-num]_ 01
- **H3:** Дизайн і кількість сторінок
- _[what-desc]_ Лендінг на 5–7 секцій і корпоративний сайт на 20 сторінок — різні обсяги роботи. Складні анімації та нестандартні блоки додають часу.
- _[what-num]_ 02
- **H3:** Мови
- _[what-desc]_ Кожна додаткова мова — це переклад, окремі сторінки, налаштування hreflang. Для клієнтів з ЄС часто потрібні UA + EN.
- _[what-num]_ 03
- **H3:** Інтеграції
- _[what-desc]_ Оплата (LiqPay, WayForPay, Monobank, Stripe), Nova Poshta API, CRM, Telegram-бот, особистий кабінет. Чим більше зв'язок, тим вища ціна.
- _[what-num]_ 04
- **H3:** Контент і підтримка
- _[what-desc]_ Готові тексти й фото здешевлюють проєкт. Якщо контент пишемо ми або потрібна регулярна підтримка — це закладаємо в кошторис окремо.
- Детальніше про ринкові вилки та чому дві студії називають різні суми за «той самий» сайт — у статті «Ціни на сайти у 2026». Як перевірити підрядника до оплати — у чек-листі вибору веб-студії.

**6. process** — Скільки часу займає розробка · `<section .process>`

- _[sec-label]_ ТЕРМІНИ
- **H2:** Скільки часу займає розробка
- _[process-dot]_ 01
- **H3:** Брифінг
- _[process-step-desc]_ Задачі, структура, інтеграції, фіксуємо ціну
- _[process-time]_ 1–2 дні
- _[process-dot]_ 02
- **H3:** Прототип
- _[process-step-desc]_ Структура сторінок і перший вигляд
- _[process-time]_ 3–5 днів
- _[process-dot]_ 03
- **H3:** Розробка
- _[process-step-desc]_ Лендінг — до 10 днів, магазин — ~3–5 тижнів, SaaS MVP — 4–8 тижнів
- _[process-time]_ залежно від проєкту
- _[process-dot]_ 04
- **H3:** Тестування і запуск
- _[process-step-desc]_ Перевірка на пристроях, форми, аналітика, деплой
- _[process-time]_ 2–4 дні + 1 день
- _[process-dot]_ 05
- **H3:** Підтримка
- _[process-step-desc]_ 1 місяць включено, далі від $150/міс
- _[process-time]_ після запуску

**7. pricing-cards** — Як рахуємо ціну і як оплатити · `<section>`

- _[sec-label]_ ЯК МИ РАХУЄМО
- **H2:** Як рахуємо ціну і як оплатити
- Ціна з таблиці — стартова точка. На брифі ми з'ясовуємо, скільки сторінок і мов потрібно, які інтеграції підключаємо, чий контент. Після цього надсилаємо кошторис з переліком робіт і термінами — сума фіксується до старту і не росте без вашої згоди.
- Оплата поетапна: 50% на старті, 50% після здачі. Великі проєкти ділимо на етапи з окремою оплатою за кожен. Після фінальної оплати передаємо весь вихідний код і доступи — сайт належить вам.
- Хочете побачити, що ви отримаєте за ці гроші? Подивіться реальні проєкти в портфоліо: лендінг Transfer Kharkiv, сайт Respect Car, бот КНЕУ.
- _[cred-val]_ 1–2д
- _[cred-label]_ Брифінг і кошторис
- _[cred-val]_ 50%
- _[cred-label]_ На старті
- _[cred-label]_ Після здачі
- _[cred-val]_ 1міс
- _[cred-label]_ Підтримки включено

**8. faq** — Питання про ціну сайту · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Питання про ціну сайту
- **Q:** Скільки коштує розробити сайт у 2026 році?
  **A:** В Infinite Union лендінг коштує від $600, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200, вебплатформа (SaaS MVP) — від $2 500. Точна ціна залежить від кількості сторінок, мов та інтеграцій і фіксується після брифу.
- **Q:** Чому ціни вказані «від»?
  **A:** Це мінімальна вартість тарифу з базовим набором робіт. Додаткові мови, оплата онлайн, CRM чи особистий кабінет збільшують обсяг. Усе це ми називаємо в кошторисі до старту.
- **Q:** Хостинг і домен входять у ціну сайту?
  **A:** Ні, хостинг і домен оплачуються окремо, напряму провайдеру, і оформлюються на вас. Ми допомагаємо обрати і все налаштовуємо.
- **Q:** Як відбувається оплата?
  **A:** Поетапно: 50% на старті, 50% після здачі проєкту. Для великих проєктів — оплата за окремими етапами.
- **Q:** Скільки коштує підтримка після запуску?
  **A:** Перший місяць підтримки входить у вартість сайту. Далі — від $150/міс або погодинно, за вашим вибором.
- **Q:** Скільки коштує Telegram-бот?
  **A:** Простий бот — від $300 (до 2 тижнів), бізнес-бот з оплатами і CRM — від $700, бот з Mini App і AI — від $1 500. Бот для продажів — від $500, для ресторану — від $600.
- **Q:** Рекламний бюджет входить у ціну Google Ads чи Meta Ads?
  **A:** Ні. Ми беремо оплату за налаштування (від $300 для Google Ads, від $250 для Meta Ads і TikTok Ads) та ведення. Бюджет на покази ви сплачуєте рекламній системі: радимо від $300/міс для Google і Meta, від $200/міс для TikTok.
- **Q:** Чи можна отримати точну ціну без брифу?
  **A:** Орієнтир дає таблиця вище. Точну суму назвемо після короткої розмови в Telegram чи телефоном — це безкоштовно, відповідаємо протягом 15 хвилин у робочий час.

**9. cta** — Порахуємо ваш проєкт · `<section#contact .cta-final>`

- _[sec-label]_ ДІЗНАТИСЬ ТОЧНУ ЦІНУ
- **H2:** Порахуємо ваш проєкт
- _[cta-final-sub]_ Опишіть задачу — надішлемо кошторис з термінами. Відповідаємо протягом 15 хвилин у робочий час.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «ЗАПОВНИТИ ФОРМУ» → `/#contact`

#### FAQ (8, дослівно)

1. **Скільки коштує розробити сайт у 2026 році?**

   В Infinite Union лендінг коштує від $600, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200, вебплатформа (SaaS MVP) — від $2 500. Точна ціна залежить від кількості сторінок, мов та інтеграцій і фіксується після брифу.

2. **Чому ціни вказані «від»?**

   Це мінімальна вартість тарифу з базовим набором робіт. Додаткові мови, оплата онлайн, CRM чи особистий кабінет збільшують обсяг. Усе це ми називаємо в кошторисі до старту.

3. **Хостинг і домен входять у ціну сайту?**

   Ні, хостинг і домен оплачуються окремо, напряму провайдеру, і оформлюються на вас. Ми допомагаємо обрати і все налаштовуємо.

4. **Як відбувається оплата?**

   Поетапно: 50% на старті, 50% після здачі проєкту. Для великих проєктів — оплата за окремими етапами.

5. **Скільки коштує підтримка після запуску?**

   Перший місяць підтримки входить у вартість сайту. Далі — від $150/міс або погодинно, за вашим вибором.

6. **Скільки коштує Telegram-бот?**

   Простий бот — від $300 (до 2 тижнів), бізнес-бот з оплатами і CRM — від $700, бот з Mini App і AI — від $1 500. Бот для продажів — від $500, для ресторану — від $600.

7. **Рекламний бюджет входить у ціну Google Ads чи Meta Ads?**

   Ні. Ми беремо оплату за налаштування (від $300 для Google Ads, від $250 для Meta Ads і TikTok Ads) та ведення. Бюджет на покази ви сплачуєте рекламній системі: радимо від $300/міс для Google і Meta, від $200/міс для TikTok.

8. **Чи можна отримати точну ціну без брифу?**

   Орієнтир дає таблиця вище. Точну суму назвемо після короткої розмови в Telegram чи телефоном — це безкоштовно, відповідаємо протягом 15 хвилин у робочий час.


#### Внутрішні посилання з контенту (22)

- «САЙТИ» → `/services/websites/` · блок 2
- «Лендінг» → `/services/websites-landing/` · блок 2
- «Корпоративний сайт» → `/services/websites-corporate/` · блок 2
- «Інтернет-магазин» → `/services/websites-shop/` · блок 2
- «Вебплатформа / SaaS» → `/services/platforms/` · блок 2
- «Цифрова екосистема» → `/services/ecosystems/` · блок 2
- «Telegram-бот» → `/services/bots/` · блок 2
- «Бот для продажів» → `/services/bots-sales/` · блок 2
- «Бот для ресторану» → `/services/bots-restaurant/` · блок 2
- «CRM-інтеграція бота» → `/services/bots-crm/` · блок 2
- «Google Ads» → `/services/google-ads/` · блок 2
- «Meta Ads (Facebook / Instagram)» → `/services/meta-ads/` · блок 2
- «TikTok Ads» → `/services/tiktok-ads/` · блок 2
- «SEO-просування» → `/services/seo/` · блок 2
- «SEO-аудит» → `/services/seo-audit/` · блок 2
- «Локальне SEO» → `/services/seo-local/` · блок 2
- «AI-конструкторі» → `/services/constructor/` · блок 2
- «SEO» → `/services/seo/` · блок 3
- ««Ціни на сайти у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 5
- «чек-листі вибору веб-студії» → `/blog/zamovyty-sayt-kharkiv/` · блок 5
- «портфоліо» → `/portfolio/` · блок 7
- «ЗАПОВНИТИ ФОРМУ» → `/#contact` · блок 9

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /en/pricing/ — Pricing

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/pricing/ |
| Мова | en |
| Пара | uk: `/pricing/` |
| Шаблон | **pricing** |
| Robots | index, follow |
| Title (59) | Website Development Cost in 2026 — Pricing \| Infinite Union |
| Description (155) | How much does a custom website cost? Landing page from $600, corporate site from $1,000, online store from $1,200, Telegram bot from $300. What's included. |
| Головний ключ | custom website development cost |
| H1 | Custom website development cost |
| Слів | 1331 |
| JSON | `design-content/en__pricing.json` |

**Хлібні крихти:** Home (`/en/`) › Pricing

#### Блоки (10)

**1. hero** — Custom website development cost · `<section .hero>`

- _[hero-label]_ PRICING · 2026 · USD
- **H1:** Custom website development cost
- Infinite Union is a web agency in Kharkiv, Ukraine, working with businesses in the EU and Ukraine. Below is our custom website development cost for 2026, plus prices for Telegram bots, web platforms, ads and SEO. All prices are starting prices in USD; the final quote is fixed after a short brief.
- _[hero-stat-num]_ $600
- _[hero-stat-label]_ LANDING PAGE, FROM
- _[hero-stat-num]_ $1,000
- _[hero-stat-label]_ CORPORATE SITE, FROM
- _[hero-stat-num]_ $1,200
- _[hero-stat-label]_ ONLINE STORE, FROM
- _[hero-stat-num]_ $300
- _[hero-stat-label]_ TELEGRAM BOT, FROM

**2. pricing-table** — How much does a website cost? · `<section .what>`

- _[sec-label]_ PRICE LIST
- **H2:** How much does a website cost?
- Таблиця:

  | Service | Tier | Price | Scope and timeline |
  | --- | --- | --- | --- |
  | Websites |  |  |  |
  | Landing page | Start | from $600 | 5–7 sections, up to 10 days |
  | Landing page | Pro | from $1,200 | 10+ sections, up to 3 weeks |
  | Landing page | Max | from $2,000 | Quoted per project |
  | Corporate website | Business | from $1,000 | 5–8 pages, about 3 weeks |
  | Corporate website | Pro | from $2,000 | 10–20 pages, 4–5 weeks |
  | Corporate website | Enterprise | from $4,000 | 50+ pages |
  | Online store | Start | from $1,200 | Up to 100 products, about 3 weeks |
  | Online store | Pro | from $2,500 | Unlimited products, about 5 weeks |
  | Online store | Marketplace | from $5,000 | Quoted per project |
  | Platforms and automation |  |  |  |
  | Web platform / SaaS | MVP | from $2,500 | 4–8 weeks |
  | Web platform / SaaS | Platform | from $6,000 | 2–4 months |
  | Web platform / SaaS | Enterprise | from $15,000 | Quoted per project |
  | Digital ecosystem | Website + bot + CRM | from $2,000 | One system for leads, sales and notifications |
  | Telegram bots |  |  |  |
  | Telegram bot | Starter | from $300 | Simple bot, up to 2 weeks |
  | Telegram bot | Business | from $700 | Payments, CRM, 1 month of support, up to 4 weeks |
  | Telegram bot | Enterprise | from $1,500 | Mini App, AI, 3 months of support |
  | Sales bot | Start / Pro / Max | from $500 / $1,200 / $2,500 | 7 days / 14 days / quoted |
  | Restaurant bot | Cafe / Restaurant / Chain | from $600 / $1,200 / $2,500 | Cafe: up to 50 menu items, 7 days; Restaurant: 14 days |
  | Bot + CRM integration | Start / Pro / Enterprise | from $800 / $1,500 / $3,000 | Start: 1 CRM, 7 days; Pro: 14 days |
  | Advertising (ad budget separate) |  |  |  |
  | Google Ads | Setup / Management | from $300 / $200 mo | Large budgets and e-commerce from $500/month; suggested ad budget from $300/month |
  | Meta Ads (Facebook, Instagram) | Setup / Management | from $250 / $200 mo | E-commerce from $400/month; suggested ad budget from $300/month |
  | TikTok Ads | Setup / Management | from $250 / $150 mo | Minimum ad budget from $200/month |
  | SEO |  |  |  |
  | SEO | Monthly | from $150 mo | First results usually in 3–6 months |
  | SEO audit | Basic / Full | from $100 / $300 | Basic: up to 50 pages, 3 days; Full: 5 days |
  | Local SEO | Start / Local Pro / Multi-location | from $200 / $150 mo / $400 mo | Start is one-off; Google Business Profile and local pages |
  | After launch |  |  |  |
  | Support and updates | Monthly or hourly | from $150 mo | Fixes, content updates, monitoring |


**3. included-cards** — What you get in every website · `<section>`

- _[sec-label]_ WHAT'S INCLUDED
- **H2:** What you get in every website
- _[what-num]_ 01
- **H3:** Custom design
- _[what-desc]_ A layout designed for your business and audience, not a purchased theme. You approve the prototype before development starts.
- _[what-num]_ 02
- **H3:** Responsive build
- _[what-desc]_ The site works on phones, tablets and desktops and is checked on real devices before launch.
- _[what-num]_ 03
- **H3:** Basic SEO
- _[what-desc]_ Titles and descriptions, clean structure, sitemap, robots.txt, structured data and fast loading from day one.
- _[what-num]_ 04
- **H3:** Telegram or CRM integration
- _[what-desc]_ Form enquiries go to Telegram or your CRM, so no lead sits unread in a mailbox.
- _[what-num]_ 05
- **H3:** One month of support
- _[what-desc]_ Fixes and small changes during the first month after launch are included in the price.
- _[what-num]_ 06
- **H3:** Source code and access
- _[what-desc]_ You receive the full source code and every account. The product belongs to you, not to the agency.

**4. not-included** — Paid separately, always · `<section>`

- _[sec-label]_ NOT INCLUDED
- **H2:** Paid separately, always
- **H3:** Hosting and domain
- _[extra-desc]_ Registered and paid in your name, so you never depend on us to keep the site online.
- _[extra-price]_ Paid to the provider
- **H3:** Ad budget
- _[extra-desc]_ Money for Google, Meta or TikTok ads is charged by the platform directly to your card. Our fee covers the work only.
- _[extra-price]_ Paid to the ad platform
- **H3:** Paid APIs and services
- _[extra-desc]_ Usage-based services such as AI models (for example, Claude API), SMS, paid plugins or a third-party CRM subscription.

**5. pricing-cards** — Why two websites cost differently · `<section>`

- _[sec-label]_ WHAT AFFECTS THE PRICE
- **H2:** Why two websites cost differently
- _[what-num]_ 01
- **H3:** Design
- _[what-desc]_ A clean layout costs less than custom illustrations, 3D or complex animation.
- _[what-num]_ 02
- **H3:** Number of pages
- _[what-desc]_ A 6-section landing page and a 20-page corporate site are different amounts of work.
- _[what-num]_ 03
- **H3:** Languages
- _[what-desc]_ Each extra language adds layout checks, translated metadata and separate SEO pages.
- _[what-num]_ 04
- **H3:** Integrations
- _[what-desc]_ Payments (Stripe, LiqPay, WayForPay, Monobank), CRM, delivery services or a custom admin panel.
- _[what-num]_ 05
- **H3:** Content
- _[what-desc]_ Ready texts and photos from you, or copywriting and product descriptions from us.
- _[what-num]_ 06
- **H3:** Support
- _[what-desc]_ One month is included; after that, support starts from $150/month or is billed hourly.

**6. process** — How long it takes · `<section .process>`

- _[sec-label]_ TIMELINES
- **H2:** How long it takes
- _[process-dot]_ 01
- **H3:** Briefing
- _[process-step-desc]_ Goals, audience, competitors, scope
- _[process-time]_ 1–2 days
- _[process-dot]_ 02
- **H3:** Prototype
- _[process-step-desc]_ Structure and key screens for approval
- _[process-time]_ 3–5 days
- _[process-dot]_ 03
- **H3:** Development
- _[process-step-desc]_ Design, build, integrations
- _[process-time]_ Depends on scope
- _[process-dot]_ 04
- **H3:** Testing
- _[process-step-desc]_ Devices, forms, speed, analytics
- _[process-time]_ 2–4 days
- _[process-dot]_ 05
- **H3:** Launch
- _[process-step-desc]_ Go live, then support
- _[process-time]_ 1 day
- In practice: a Start landing page takes up to 10 days, a business website about 3 weeks, an online store 3–5 weeks, a platform MVP 4–8 weeks. A simple Telegram bot is ready in up to 2 weeks.

**7. why-us** — A fixed quote, paid in stages · `<section>`

- _[sec-label]_ HOW WE ESTIMATE
- **H2:** A fixed quote, paid in stages
- You describe the task in a message or a short call. We ask what the site must do, which pages and languages you need and what integrations are involved, then send a written estimate with scope, timeline and price. The price is agreed before work starts.
- Payment is staged: we recommend 50% upfront and 50% after launch. Larger projects are split into milestones, so you only pay for work you have seen.

**8. why-us** — Ukrainian agency, EU standards · `<section>`

- _[sec-label]_ WHY THE PRICE IS LOWER
- **H2:** Ukrainian agency, EU standards
- Our prices are usually lower than Western European agency rates for one simple reason: salaries, rent and the cost of living in Ukraine are lower. That changes the price, not the tools or the result.
- We use the same stack as agencies in Berlin or Amsterdam — Next.js, React, TypeScript, Python, PostgreSQL, Cloudflare — and work remotely in a time zone one hour ahead of Central European Time. You get the source code and all access, staged payment and direct contact with the people building your project. See what we have built in our portfolio.

**9. faq** — Pricing questions · `<section .faq>`

- _[sec-label]_ FAQ
- **H2:** Pricing questions
- **Q:** How much does a website cost in 2026?
  **A:** With us, a landing page starts from $600, a corporate website from $1,000, an online store from $1,200 and a web platform MVP from $2,500. The exact price depends on pages, design, languages and integrations.
- **Q:** Why are your prices "from"?
  **A:** Because two projects of the same type can differ a lot in scope. The starting price covers the basic tier; after a brief we send a fixed quote that does not change unless the scope does.
- **Q:** Are hosting and domain included?
  **A:** No. Hosting and domain are paid separately and registered in your name. We help you choose and set them up.
- **Q:** Is the ad budget included in Google Ads or Meta Ads prices?
  **A:** No. Our fee covers setup and management. The ad budget is paid directly to Google, Meta or TikTok. We suggest starting from $300/month for Google and Meta and from $200/month for TikTok.
- **Q:** How does payment work?
  **A:** In stages. We recommend 50% upfront and 50% after launch; larger projects are split into milestones. Monthly services such as SEO or ad management are paid per month.
- **Q:** What happens after the first month of support?
  **A:** You can continue with support from $150/month, pay hourly for changes, or take the code and maintain it yourself — you own everything.
- **Q:** Do you work with clients outside Ukraine?
  **A:** Yes. We work with businesses in Ukraine and the EU, including Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Prices are in USD.

**10. cta** — Tell us about your project · `<section#contact .cta-final>`

- _[sec-label]_ GET A QUOTE
- **H2:** Tell us about your project
- Send a short description and get an estimate. We reply within 15 minutes during working hours.
- Посилання/кнопка: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WHATSAPP» → `https://wa.me/380688286969`
- Посилання/кнопка: «VIBER» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380 68 828 6969» → `tel:+380688286969`
- Посилання/кнопка: «FILL IN THE FORM» → `/en/#contact`

#### FAQ (7, дослівно)

1. **How much does a website cost in 2026?**

   With us, a landing page starts from $600, a corporate website from $1,000, an online store from $1,200 and a web platform MVP from $2,500. The exact price depends on pages, design, languages and integrations.

2. **Why are your prices "from"?**

   Because two projects of the same type can differ a lot in scope. The starting price covers the basic tier; after a brief we send a fixed quote that does not change unless the scope does.

3. **Are hosting and domain included?**

   No. Hosting and domain are paid separately and registered in your name. We help you choose and set them up.

4. **Is the ad budget included in Google Ads or Meta Ads prices?**

   No. Our fee covers setup and management. The ad budget is paid directly to Google, Meta or TikTok. We suggest starting from $300/month for Google and Meta and from $200/month for TikTok.

5. **How does payment work?**

   In stages. We recommend 50% upfront and 50% after launch; larger projects are split into milestones. Monthly services such as SEO or ad management are paid per month.

6. **What happens after the first month of support?**

   You can continue with support from $150/month, pay hourly for changes, or take the code and maintain it yourself — you own everything.

7. **Do you work with clients outside Ukraine?**

   Yes. We work with businesses in Ukraine and the EU, including Poland, Germany, the Netherlands, Czechia, Slovakia and the UK. Prices are in USD.


#### Внутрішні посилання з контенту (10)

- «Websites» → `/en/services/websites/` · блок 2
- «Platforms and automation» → `/en/services/platforms/` · блок 2
- «Digital ecosystem» → `/en/services/ecosystems/` · блок 2
- «Telegram bots» → `/en/services/bots/` · блок 2
- «Google Ads» → `/en/services/google-ads/` · блок 2
- «Meta Ads» → `/en/services/meta-ads/` · блок 2
- «TikTok Ads» → `/en/services/tiktok-ads/` · блок 2
- «SEO» → `/en/services/seo/` · блок 2
- «portfolio» → `/en/portfolio/` · блок 8
- «FILL IN THE FORM» → `/en/#contact` · блок 10

Зовнішні / контактні: «MESSAGE ON TELEGRAM» → `https://t.me/infiniteunion_manager`, «WHATSAPP» → `https://wa.me/380688286969`, «VIBER» → `viber://chat?number=%2B380688286969`, «+380 68 828 6969» → `tel:+380688286969`

---

## 7.5 Шаблон: portfolio

### /portfolio/ — Портфоліо

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/portfolio/ |
| Мова | uk |
| Пара | en: `/en/portfolio/` |
| Шаблон | **portfolio** |
| Robots | index, follow |
| Title (53) | Портфоліо Infinite Union — сайти, Telegram-боти, SaaS |
| Description (143) | Реальні проєкти Infinite Union: лендінг Transfer Kharkiv з конверсією 8.4%, бот КНЕУ на 3000+ користувачів, Respect Car, Parrot School та інші. |
| Головний ключ | портфоліо веб-студії |
| H1 | Портфоліо Infinite Union: сайти, боти та SaaS |
| Слів | 619 |
| JSON | `design-content/portfolio.json` |

**Хлібні крихти:** Головна (`/`) › Портфоліо

#### Блоки (4)

**1. hero** — Портфоліо Infinite Union: сайти, боти та SaaS · `<header .hero>`

- _[декор, aria-hidden]_ IU
- _[hero-coords]_ 49° 59′ N · 36° 14′ E · Kharkiv, Ukraine
- _[hero-label]_ Портфоліо · Infinite Union
- **H1:** Портфоліо Infinite Union: сайти, боти та SaaS
- Портфоліо веб-студії Infinite Union з Харкова: 8 проєктів, які працюють у продакшні. Лендінг Transfer Kharkiv з конверсією 8.4%, офіційний бот КНЕУ на 3 000+ користувачів, сайт автомайданчика Respect Car, екосистема школи Parrot School і власні інструменти. Скільки коштує схожий проєкт — на сторінці «Ціни».
- _[hero-stat-n]_ 8
- _[hero-stat-l]_ проєктів у продакшні
- _[hero-stat-n]_ 3 000+
- _[hero-stat-l]_ користувачів у ботах
- _[hero-stat-n]_ 8.4%
- _[hero-stat-l]_ конверсія Transfer Kharkiv
- _[hero-stat-n]_ 119+
- _[hero-stat-l]_ SEO-позицій в топі

**2. filters** · `<div .filters-wrap>`

- Кнопка: «Всі»
- Кнопка: «Сайти»
- Кнопка: «Боти»
- Кнопка: «AI»
- Кнопка: «SaaS»
- _[filter-total]_ 8 / 8 проєктів

**3. portfolio-grid** — Ad Tracker by Infinite Union · `<main .grid-wrap>`

- _[p-num]_ 01 / 08
- _[p-badge]_ SaaS · Флагман IU
- **H3:** Ad Tracker by Infinite Union
- _[p-tagline]_ Один дашборд замість трьох вкладок
- Власний дашборд аналітики реклами, який ми будуємо для клієнтів і використовуємо самі. Meta Ads, Google Ads і TikTok Ads — в одному вікні, дані оновлюються автоматично кожні 2 години, історія — 90 днів. Без ручного зведення звітів в Excel.
- _[p-stack]_ Next.js 14 · PostgreSQL · Meta API · Google API · TikTok API · Railway
- _[p-stat-n]_ 3
- _[p-stat-l]_ платформи в одному дашборді
- _[p-stat-n]_ 2 год
- _[p-stat-l]_ автооновлення даних
- _[p-stat-n]_ 5+ год
- _[p-stat-l]_ економії на звітах щотижня
- _[p-services]_ Послуги: Вебплатформи / SaaS · Google Ads · Meta Ads · TikTok Ads
- _[p-link]_ В розробці · Приватний проєкт
- _[p-num]_ 02 / 08
- _[p-badge]_ Автобізнес · Харків
- **H3:** Respect Car
- _[p-tagline]_ Повний цикл: від каталогу до угоди
- Сайт автомайданчика в Харкові з продажем, викупом та імпортом авто зі США. Живий каталог з фото, а адмінка — прямо в Telegram: власник керує сайтом з телефону, не чіпаючи жодного рядка коду.
- _[p-stack]_ Next.js 16 · React 19 · TypeScript · PostgreSQL · Redis · Cloudinary · Telegram Bot · Cloudflare
- _[p-stat-n]_ Фото
- _[p-stat-l]_ живий каталог авто
- _[p-stat-n]_ TG
- _[p-stat-l]_ адмінка в Telegram
- _[p-stat-n]_ CDN
- _[p-stat-l]_ захист Cloudflare
- _[p-services]_ Послуги: Корпоративний сайт · Telegram-бот (адмінка) · Сайти в Харкові
- Посилання/кнопка: «respectcar.com.ua» → `https://respectcar.com.ua/`
- _[p-num]_ 03 / 08
- _[p-badge]_ Освіта · Екосистема
- **H3:** Parrot School
- _[p-tagline]_ Сайт + бот для учня, батька і вчителя
- Сайт школи англійської мови в Харкові та повноцінна Telegram-екосистема навколо нього: учні бачать розклад і оцінки, батьки — прогрес дитини, вчителі — свій кабінет. Плюс окремий адмін-бот для команди школи.
- _[p-stack]_ Static HTML/CSS/JS · Python · aiogram · Railway
- _[p-stat-l]_ ролі в одному боті
- _[p-stat-n]_ +1
- _[p-stat-l]_ адмін-бот для команди
- _[p-stat-n]_ 24/7
- _[p-stat-l]_ сповіщення без дзвінків
- _[p-services]_ Послуги: Цифрова екосистема · Telegram-боти · Розробка сайтів
- Посилання/кнопка: «parrotschool.com.ua» → `https://parrotschool.com.ua/`
- _[p-num]_ 04 / 08
- _[p-badge]_ Флагман · SEO
- **H3:** Transfer Kharkiv
- _[p-tagline]_ Лендінг + SEO + бот для заявок
- Лендінг трансферної компанії з конверсією 8.4%. SEO вивело сайт у топ за 119+ запитами, а Telegram-бот приймає заявки 24/7 і одразу передає їх диспетчеру.
- _[p-stack]_ Static HTML/CSS/JS · Python-бот · SEO
- _[p-stat-n]_ 8.4%
- _[p-stat-l]_ конверсія лендінгу
- _[p-stat-n]_ 119+
- _[p-stat-l]_ SEO-позицій у топі
- _[p-stat-l]_ заявки без менеджера
- _[p-services]_ Послуги: Лендінг · SEO-просування · Telegram-бот
- Посилання/кнопка: «transferkharkiv.com.ua» → `https://transferkharkiv.com.ua/`
- _[p-num]_ 05 / 08
- _[p-badge]_ Університет · 3000+ юзерів
- **H3:** KNEU Bot
- _[p-tagline]_ Бот, яким користується цілий університет
- Офіційний Telegram-бот Київського національного економічного університету. Розклад, новини та сповіщення — у кишені кожного з понад 3 000 активних студентів, щодня.
- _[p-stack]_ Python · aiogram · PostgreSQL · Railway
- _[p-stat-n]_ 3 000+
- _[p-stat-l]_ активних користувачів
- _[p-stat-n]_ Live
- _[p-stat-l]_ розклад і новини
- _[p-stat-n]_ Push
- _[p-stat-l]_ миттєві сповіщення
- _[p-services]_ Послуги: Розробка Telegram-ботів
- _[p-link]_ Офіційний бот КНЕУ
- _[p-num]_ 06 / 08
- _[p-badge]_ Автоматизація · Бізнес
- **H3:** BizBot
- _[p-tagline]_ Бухгалтер, який не бере відпустку
- Telegram-бот, що автоматизує бухгалтерію малого бізнесу: зарплати, задачі, автозаповнення Excel. Власник економить понад 4 години рутини щотижня.
- _[p-stack]_ Python · aiogram · FastAPI · Excel API · Railway
- _[p-stat-n]_ 4+ год
- _[p-stat-l]_ економії щотижня
- _[p-stat-n]_ Задачі
- _[p-stat-l]_ і зарплати в одному боті
- _[p-stat-n]_ Auto
- _[p-stat-l]_ Excel автоматично
- _[p-services]_ Послуги: Telegram-боти · Інтеграції та автоматизація
- _[p-link]_ Приватний проєкт
- _[p-num]_ 07 / 08
- _[p-badge]_ AI · Автоматизація
- **H3:** InfinityCreo
- _[p-tagline]_ Від брифу до банера за ~3 хвилини
- AI-генерація рекламних креативів через n8n. Ви описуєте бриф — бот за ~3 хвилини повертає готовий банер у потрібному форматі, без окремого замовлення дизайнеру.
- _[p-stack]_ n8n · Claude API · Midjourney API · Telegram Bot
- _[p-stat-n]_ 3 хв
- _[p-stat-l]_ від брифу до банера
- _[p-stat-n]_ 10+
- _[p-stat-l]_ форматів креативів
- _[p-stat-n]_ n8n
- _[p-stat-l]_ автоматизація сценарію
- _[p-services]_ Послуги: Telegram-боти · Meta Ads
- Посилання/кнопка: «@infinitycreo_bot» → `https://t.me/infinitycreo_bot`
- _[p-num]_ 08 / 08
- _[p-badge]_ Internal · Автоматизація
- **H3:** IU Bot
- _[p-tagline]_ Квіз, кваліфікація ліда, передача в CRM
- Внутрішній lead-бот Infinite Union з квізом, що кваліфікує клієнта ще до першого дзвінка. FSM-сценарії ведуть діалог, а CRM отримує вже теплого ліда — повністю автоматично.
- _[p-stack]_ Python · aiogram · FastAPI · PostgreSQL · Redis · Railway
- _[p-stat-l]_ кваліфікація лідів
- _[p-stat-n]_ FSM
- _[p-stat-l]_ сценарії діалогу
- _[p-stat-n]_ CRM
- _[p-stat-l]_ інтеграція без ручних дій
- _[p-services]_ Послуги: Бот для продажів · CRM-інтеграція
- _[p-link]_ Внутрішній інструмент IU

**4. cta** — Обговоримо ваш проєкт? · `<section .cta-band>`

- _[cta-label]_ Ваш проєкт — наступний
- **H2:** Обговоримо ваш проєкт?
- Відповідаємо протягом 15 хвилин у робочий час і чесно кажемо, що варто робити, а що — ні.
- Посилання/кнопка: «Обговорити проєкт» → `/#contact`

#### Внутрішні посилання з контенту (22)

- ««Ціни»» → `/pricing/` · блок 1
- «Вебплатформи / SaaS» → `/services/platforms/` · блок 3
- «Google Ads» → `/services/google-ads/` · блок 3
- «Meta Ads» → `/services/meta-ads/` · блок 3
- «TikTok Ads» → `/services/tiktok-ads/` · блок 3
- «Корпоративний сайт» → `/services/websites-corporate/` · блок 3
- «Telegram-бот (адмінка)» → `/services/bots/` · блок 3
- «Сайти в Харкові» → `/services/websites-kharkiv/` · блок 3
- «Цифрова екосистема» → `/services/ecosystems/` · блок 3
- «Telegram-боти» → `/services/bots/` · блок 3
- «Розробка сайтів» → `/services/websites/` · блок 3
- «Лендінг» → `/services/websites-landing/` · блок 3
- «SEO-просування» → `/services/seo/` · блок 3
- «Telegram-бот» → `/services/bots/` · блок 3
- «Розробка Telegram-ботів» → `/services/bots/` · блок 3
- «Telegram-боти» → `/services/bots/` · блок 3
- «Інтеграції та автоматизація» → `/services/bots-crm/` · блок 3
- «Telegram-боти» → `/services/bots/` · блок 3
- «Meta Ads» → `/services/meta-ads/` · блок 3
- «Бот для продажів» → `/services/bots-sales/` · блок 3
- «CRM-інтеграція» → `/services/bots-crm/` · блок 3
- «Обговорити проєкт» → `/#contact` · блок 4

Зовнішні / контактні: «respectcar.com.ua» → `https://respectcar.com.ua/`, «parrotschool.com.ua» → `https://parrotschool.com.ua/`, «transferkharkiv.com.ua» → `https://transferkharkiv.com.ua/`, «@infinitycreo_bot» → `https://t.me/infinitycreo_bot`

---

### /en/portfolio/ — Portfolio

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/en/portfolio/ |
| Мова | en |
| Пара | uk: `/portfolio/` |
| Шаблон | **portfolio** |
| Robots | index, follow |
| Title (58) | Portfolio — Websites, Telegram Bots, SaaS \| Infinite Union |
| Description (151) | Real projects by Infinite Union: Transfer Kharkiv landing page with 8.4% conversion, a university Telegram bot with 3,000+ users, Respect Car and more. |
| Головний ключ | web agency portfolio |
| H1 | Our web agency portfolio. |
| Слів | 755 |
| JSON | `design-content/en__portfolio.json` |

**Хлібні крихти:** Home (`/en/`) › Portfolio

#### Блоки (4)

**1. hero** — Our web agency portfolio. · `<header .hero>`

- _[декор, aria-hidden]_ IU
- _[hero-coords]_ 49° 59′ N · 36° 14′ E · Kharkiv, Ukraine
- _[hero-label]_ Portfolio · Infinite Union
- **H1:** Our web agency portfolio.
- Real projects by Infinite Union, a web agency in Kharkiv, Ukraine, working with clients across the EU: websites, Telegram bots, SaaS dashboards and AI automation. From a landing page with 8.4% conversion to a university bot used by 3,000+ people. Looking for something similar? See website development, Telegram bots or SaaS development.
- _[hero-stat-n]_ 3000+
- _[hero-stat-l]_ active users of KNEU Bot
- _[hero-stat-n]_ 8.4%
- _[hero-stat-l]_ Transfer Kharkiv conversion
- _[hero-stat-n]_ 119+
- _[hero-stat-l]_ search positions in the top
- _[hero-stat-n]_ 3 min
- _[hero-stat-l]_ from brief to banner in InfinityCreo

**2. filters** · `<div .filters-wrap>`

- Кнопка: «All»
- Кнопка: «Websites»
- Кнопка: «Bots»
- Кнопка: «AI»
- Кнопка: «SaaS»
- _[filter-total]_ 8 / 8 projects

**3. portfolio-grid** — Ad Tracker by Infinite Union · `<main .grid-wrap>`

- _[p-num]_ 01 / 08
- _[p-badge]_ SaaS · IU product
- **H2:** Ad Tracker by Infinite Union
- _[p-tagline]_ One dashboard instead of three ad accounts
- An ad reporting portal that we are building for clients and already use ourselves. Meta Ads, Google Ads and TikTok Ads on one screen, refreshed automatically every 2 hours with 90 days of history, so nobody has to compile reports by hand in Excel.
- _[p-stack]_ Next.js 14 · PostgreSQL · Meta API · Google API · TikTok API · Railway
- _[p-stat-n]_ 3
- _[p-stat-l]_ ad platforms in one dashboard
- _[p-stat-n]_ 2 h
- _[p-stat-l]_ automatic data refresh
- _[p-stat-n]_ 5+ h
- _[p-stat-l]_ saved on reports every week
- _[p-link]_ In development · Private project
- _[p-num]_ 02 / 08
- _[p-badge]_ Car dealer · Kharkiv
- **H2:** Respect Car
- _[p-tagline]_ From catalogue to deal in one place
- Website for a car dealer in Kharkiv covering sales, buyback and car imports from the USA. A live catalogue with photos, and an admin panel that runs inside Telegram: the owner manages the site from a phone without touching any code.
- _[p-stack]_ Next.js 16 · React 19 · TypeScript · PostgreSQL · Redis · Cloudinary · Telegram Bot · Cloudflare
- _[p-stat-n]_ Photos
- _[p-stat-l]_ live car catalogue
- _[p-stat-n]_ TG
- _[p-stat-l]_ admin panel in Telegram
- _[p-stat-n]_ CDN
- _[p-stat-l]_ Cloudflare protection
- Посилання/кнопка: «respectcar.com.ua» → `https://respectcar.com.ua/`
- Картка-посилання → `https://parrotschool.com.ua/`:
  - _[p-num]_ 03 / 08
  - _[p-badge]_ Education · Website + bots
  - **H2:** Parrot School
  - _[p-tagline]_ A website and bots for students, parents and teachers
  - Website for an English language school in Kharkiv, plus a Telegram system built around it: students see their timetable and grades, parents follow their child's progress, and teachers have their own workspace. A separate admin bot serves the school team.
  - _[p-stack]_ Static HTML/CSS/JS · Python · aiogram · Railway
  - _[p-stat-n]_ 3
  - _[p-stat-l]_ roles in one bot
  - _[p-stat-n]_ +1
  - _[p-stat-l]_ admin bot for the team
  - _[p-stat-n]_ Online
  - _[p-stat-l]_ timetable and grades
  - _[p-link]_ parrotschool.com.ua
- Картка-посилання → `https://transferkharkiv.com.ua/`:
  - _[p-num]_ 04 / 08
  - _[p-badge]_ Flagship · SEO
  - **H2:** Transfer Kharkiv
  - _[p-tagline]_ A landing page that brings in bookings
  - Landing page for a transfer company with an 8.4% conversion rate. SEO work took the site into the top results for 119+ search queries, and a Telegram bot accepts booking requests 24/7, including outside office hours.
  - _[p-stack]_ Static HTML/CSS/JS · Python bot · SEO
  - _[p-stat-n]_ 8.4%
  - _[p-stat-l]_ landing page conversion
  - _[p-stat-n]_ 119+
  - _[p-stat-l]_ search positions in the top
  - _[p-stat-n]_ 24/7
  - _[p-stat-l]_ bookings via Telegram bot
  - _[p-link]_ transferkharkiv.com.ua
- _[p-num]_ 05 / 08
- _[p-badge]_ University · 3,000+ users
- **H2:** KNEU Bot
- _[p-tagline]_ A bot used across a whole university
- The official Telegram bot of Kyiv National Economic University (KNEU). Timetable, news and notifications, delivered every day to more than 3,000 active users.
- _[p-stack]_ Python · aiogram · PostgreSQL · Railway
- _[p-stat-n]_ 3,000+
- _[p-stat-l]_ active users
- _[p-stat-n]_ Live
- _[p-stat-l]_ timetable and news
- _[p-stat-n]_ Push
- _[p-stat-l]_ instant notifications
- _[p-link]_ Official KNEU bot
- _[p-num]_ 06 / 08
- _[p-badge]_ Automation · Small business
- **H2:** BizBot
- _[p-tagline]_ Bookkeeping help that never takes a day off
- A Telegram bot that automates bookkeeping for a small business: payroll, tasks and automatic Excel filling. The owner saves more than 4 hours of routine work every week and gets a report in one tap.
- _[p-stack]_ Python · aiogram · FastAPI · Excel API · Railway
- _[p-stat-n]_ 4+ h
- _[p-stat-l]_ saved every week
- _[p-stat-n]_ 1 tap
- _[p-stat-l]_ report instead of hours
- _[p-stat-n]_ Auto
- _[p-stat-l]_ Excel filled automatically
- _[p-link]_ Private project
- Картка-посилання → `https://t.me/infinitycreo_bot`:
  - _[p-num]_ 07 / 08
  - _[p-badge]_ AI · Automation
  - **H2:** InfinityCreo
  - _[p-tagline]_ From brief to banner in about 3 minutes
  - AI generation of ad creatives for media buyers, built on n8n. Send a brief and get a finished banner in a few minutes, in 10+ formats, without waiting for a designer or going through endless rounds of edits.
  - _[p-stack]_ n8n · Claude API · Midjourney API · Telegram Bot
  - _[p-stat-n]_ ~3 min
  - _[p-stat-l]_ from brief to banner
  - _[p-stat-n]_ 10+
  - _[p-stat-l]_ creative formats
  - _[p-stat-n]_ n8n
  - _[p-stat-l]_ automated pipeline
  - _[p-link]_ @infinitycreo_bot
- _[p-num]_ 08 / 08
- _[p-badge]_ Internal · Automation
- **H2:** IU Bot
- _[p-tagline]_ Lead qualification before the first call
- Infinite Union's own lead bot. A quiz qualifies the client before the first call, FSM flows guide the conversation, and the CRM receives a lead that is ready for a proper conversation, with no manual steps.
- _[p-stack]_ Python · aiogram · FastAPI · PostgreSQL · Redis · Railway
- _[p-stat-n]_ Quiz
- _[p-stat-l]_ lead qualification
- _[p-stat-n]_ FSM
- _[p-stat-l]_ conversation flows
- _[p-stat-n]_ CRM
- _[p-stat-l]_ handover without manual work
- _[p-link]_ Internal IU tool

**4. cta** — Want a project like these? · `<section .cta-band>`

- _[cta-label]_ Your project could be next
- **H2:** Want a project like these?
- Tell us what you need. We reply within 15 minutes during business hours and will tell you honestly what is worth building and what is not. Prices start at $600 for a website and $300 for a Telegram bot; see the pricing page, or read about business automation.
- Посилання/кнопка: «Message on Telegram» → `https://t.me/infiniteunion_manager`
- WhatsApp · Fill in the form

#### Внутрішні посилання з контенту (6)

- «website development» → `/en/services/websites/` · блок 1
- «Telegram bots» → `/en/services/bots/` · блок 1
- «SaaS development» → `/en/services/platforms/` · блок 1
- «pricing page» → `/en/pricing/` · блок 4
- «business automation» → `/en/services/ecosystems/` · блок 4
- «Fill in the form» → `/en/#contact` · блок 4

Зовнішні / контактні: «respectcar.com.ua» → `https://respectcar.com.ua/`, «03 / 08 Education · Website + bots Parrot School A website and bots for students, parents and teachers Website for an English language school in Kharkiv, plus a Telegram system built around it: students see their timetable and grades, parents follow their child's progress, and teachers have their own workspace. A separate admin bot serves the school team. Static HTML/CSS/JSPythonaiogramRailway 3 roles in one bot +1 admin bot for the team Online timetable and grades parrotschool.com.ua» → `https://parrotschool.com.ua/`, «04 / 08 Flagship · SEO Transfer Kharkiv A landing page that brings in bookings Landing page for a transfer company with an 8.4% conversion rate. SEO work took the site into the top results for 119+ search queries, and a Telegram bot accepts booking requests 24/7, including outside office hours. Static HTML/CSS/JSPython botSEO 8.4% landing page conversion 119+ search positions in the top 24/7 bookings via Telegram bot transferkharkiv.com.ua» → `https://transferkharkiv.com.ua/`, «07 / 08 AI · Automation InfinityCreo From brief to banner in about 3 minutes AI generation of ad creatives for media buyers, built on n8n. Send a brief and get a finished banner in a few minutes, in 10+ formats, without waiting for a designer or going through endless rounds of edits. n8nClaude APIMidjourney APITelegram Bot ~3 min from brief to banner 10+ creative formats n8n automated pipeline @infinitycreo_bot» → `https://t.me/infinitycreo_bot`, «Message on Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`

---

## 7.6 Шаблон: constructor

### /services/constructor/ — AI-конструктор

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/constructor/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **constructor** |
| Robots | index, follow |
| Title (53) | AI-конструктор сайтів — безкоштовне прев'ю за хвилину |
| Description (143) | Безкоштовний AI-конструктор: опишіть бізнес і отримайте прев'ю майбутнього сайту за хвилину. Сподобався концепт — зробимо з нього робочий сайт. |
| Головний ключ | AI конструктор сайтів |
| H1 | AI конструктор сайтів: прев'ю до замовлення |
| Слів | 625 |
| JSON | `design-content/services__constructor.json` |

**Хлібні крихти:** Головна (`/`) › AI-конструктор

#### Блоки (3)

**1. form** — AI конструктор сайтів: прев'ю до замовлення · `<div .app>`

- _[panel-badge]_ AI · КОНСТРУКТОР
- **H1:** AI конструктор сайтів: прев'ю до замовлення
- Опишіть бізнес — AI збере концепт головної сторінки. 3 безкоштовні генерації на день, без реєстрації. Це ескіз для обговорення, а не готовий сайт.
- _[examples-label]_ СПРОБУЙТЕ ПРИКЛАД
- _[chip]_ Барбершоп у Харкові, темний стиль
- _[chip]_ Ресторан з онлайн-бронюванням
- _[chip]_ IT-агенція, мінімалізм
- _[chip]_ Інтернет-магазин одягу
- _[chip]_ Стоматологічна клініка
- _[chip]_ Фітнес-клуб, яскравий стиль
- _[input-label]_ ОПИШІТЬ ВАШ ПРОЄКТ
- Поле форми: textarea `prompt` · placeholder «Наприклад: Хочу сайт для студії татуювань у Харкові. Темна атмосфера, червоні акценти, галерея робіт, форма запису. Стиль — андеграунд, жорсткий але елегантний...»
- СТИЛЬ
- Поле форми: select `style`
  - «Темний / Преміум» (value: dark)
  - «Світлий / Мінімал» (value: light)
  - «Яскравий / Сміливий» (value: bold)
  - «Корпоративний» (value: corporate)
  - «Творчий / Арт» (value: creative)
- ТИП САЙТУ
- Поле форми: select `type`
  - «Лендінг» (value: landing)
  - «Сайт-візитка» (value: business)
  - «Портфоліо» (value: portfolio)
  - «Інтернет-магазин» (value: shop)
  - «Сервісний сайт» (value: service)
- Кнопка: «Згенерувати сайт»
- Генерацій сьогодні
- Кнопка: «Замовити сайт за цим концептом»
- Відкриється форма заявки. Зробимо з концепту робочий сайт — лендінг від $600. Відповідаємо протягом 15 хвилин у робочий час.
- _[toolbar-url]_ infiniteunion.com.ua/services/constructor/
- _[empty-title]_ Прев'ю з'явиться тут
- _[empty-sub]_ Опишіть ваш проєкт зліва і натисніть "Згенерувати сайт"
- _[loading-text]_ АНАЛІЗУЄМО ЗАПИТ...
- _[loading-step]_ Підбираємо стиль і структуру
- _[watermark]_ INFINITE UNION · DEMO

**2. content** — AI конструктор сайтів від Infinite Union · `<section .faq-section.cx-text>`

- _[faq-label]_ Як це працює
- **H2:** AI конструктор сайтів від Infinite Union
- AI конструктор сайтів — безкоштовний інструмент веб-студії Infinite Union з Харкова. Ви описуєте бізнес кількома реченнями, обираєте стиль і тип сайту, а AI збирає одну сторінку: структуру, тексти-заготовки, кольори й типографіку. Прев'ю відкривається праворуч, у вікні браузера, і його можна показати партнеру чи команді.
- Мета інструмента — щоб ви побачили напрям до того, як платити за розробку. Замість абстрактного «хочу сучасний сайт» у вас є картинка, від якої можна відштовхуватися: що подобається, що прибрати, яких блоків бракує.
- **H2:** Концепт, а не готовий сайт
- Згенерована сторінка — це ескіз. У ній немає адмінки, справжньої форми з передачею заявок, підключеної аналітики, SEO-налаштувань, домену й хостингу. Тексти та цифри в прев'ю AI вигадує під вашу нішу — перед публікацією їх треба замінити на реальні. Тому код із конструктора не варто викладати в інтернет як є.
- Безкоштовно доступно 3 генерації на день. Лічильник зберігається у вашому браузері й обнуляється наступного дня. Реєстрація не потрібна.
- **H2:** Як отримати точніший результат
- Список:
  - Назвіть нішу і місто: «кав'ярня на Салтівці», «автосервіс у Харкові».
  - Перелічіть блоки, які мають бути: меню, ціни, галерея, відгуки, форма запису.
  - Опишіть настрій і кольори: «світлий, теплі відтінки», «темний, червоні акценти».
  - Вкажіть, яку дію має зробити відвідувач: подзвонити, записатися, замовити доставку.
- **H2:** Від прев'ю до робочого сайту
- Якщо концепт сподобався, натисніть «Замовити сайт за цим концептом» — відкриється форма заявки на головній. Ми проведемо бриф, покажемо прототип і зробимо з ескізу повноцінний сайт: з унікальним дизайном, адаптивною версткою, базовою SEO-оптимізацією та передачею заявок у Telegram або CRM. Код і доступи після запуску належать вам.
- Орієнтири за вартістю: лендінг — від $600 і до 10 днів роботи, корпоративний сайт — від $1 000, інтернет-магазин — від $1 200. Усі типи сайтів описані на сторінці розробка сайтів, повний прайс — у розділі ціни, а з чого складається бюджет, розбираємо в статті «Скільки коштує сайт у 2026». Приклади реальних проєктів — у портфоліо.

**3. faq** — Часті запитання · `<section .faq-section>`

- _[faq-label]_ FAQ
- **H2:** Часті запитання
- **Q:** Як працює AI конструктор сайтів?
  **A:** Ви описуєте бізнес і обираєте стиль та тип сайту. Запит іде на сервер Infinite Union, де модель Claude від Anthropic генерує HTML-сторінку. Щойно генерація завершиться, сторінка з'явиться у вікні прев'ю праворуч.
- **Q:** Скільки генерацій можна зробити безкоштовно?
  **A:** 3 генерації на день, без реєстрації й оплати. Лічильник зберігається в браузері та обнуляється наступного дня.
- **Q:** Чи можна опублікувати згенерований сайт одразу?
  **A:** Ні. Це концепт: без адмінки, робочої форми заявок, аналітики, SEO, домену й хостингу, а тексти й цифри в ньому вигадані AI. Він потрібен, щоб узгодити напрям дизайну перед розробкою.
- **Q:** Чи можна замовити повноцінний сайт після конструктора?
  **A:** Так. Натисніть «Замовити сайт за цим концептом» і залиште заявку. Ми візьмемо концепт за основу, проведемо бриф і зробимо робочий сайт з вашими текстами, формою заявок і базовою SEO-оптимізацією.
- **Q:** Скільки коштує сайт після конструктора?
  **A:** Так само, як без нього: лендінг від $600, корпоративний сайт від $1 000, інтернет-магазин від $1 200. Хостинг і домен оплачуються окремо. Деталі — на сторінці ціни.
- **Q:** Скільки часу займає розробка?
  **A:** Лендінг Start — до 10 днів, корпоративний сайт — близько 3 тижнів, інтернет-магазин — від 3 тижнів. Точний термін називаємо після брифу.

#### FAQ (6, дослівно)

1. **Як працює AI конструктор сайтів?**

   Ви описуєте бізнес і обираєте стиль та тип сайту. Запит іде на сервер Infinite Union, де модель Claude від Anthropic генерує HTML-сторінку. Щойно генерація завершиться, сторінка з'явиться у вікні прев'ю праворуч.

2. **Скільки генерацій можна зробити безкоштовно?**

   3 генерації на день, без реєстрації й оплати. Лічильник зберігається в браузері та обнуляється наступного дня.

3. **Чи можна опублікувати згенерований сайт одразу?**

   Ні. Це концепт: без адмінки, робочої форми заявок, аналітики, SEO, домену й хостингу, а тексти й цифри в ньому вигадані AI. Він потрібен, щоб узгодити напрям дизайну перед розробкою.

4. **Чи можна замовити повноцінний сайт після конструктора?**

   Так. Натисніть «Замовити сайт за цим концептом» і залиште заявку. Ми візьмемо концепт за основу, проведемо бриф і зробимо робочий сайт з вашими текстами, формою заявок і базовою SEO-оптимізацією.

5. **Скільки коштує сайт після конструктора?**

   Так само, як без нього: лендінг від $600, корпоративний сайт від $1 000, інтернет-магазин від $1 200. Хостинг і домен оплачуються окремо. Деталі — на сторінці ціни.

6. **Скільки часу займає розробка?**

   Лендінг Start — до 10 днів, корпоративний сайт — близько 3 тижнів, інтернет-магазин — від 3 тижнів. Точний термін називаємо після брифу.


#### Внутрішні посилання з контенту (6)

- «лендінг» → `/services/websites-landing/` · блок 2
- «розробка сайтів» → `/services/websites/` · блок 2
- «ціни» → `/pricing/` · блок 2
- ««Скільки коштує сайт у 2026»» → `/blog/skilky-koshtuye-sayt-2026/` · блок 2
- «портфоліо» → `/portfolio/` · блок 2
- «ціни» → `/pricing/` · блок 3

---

## 7.7 Шаблон: blog-list

### /blog/ — Блог

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-list** |
| Robots | index, follow |
| Title (49) | Блог Infinite Union — сайти, боти, SEO та реклама |
| Description (137) | Практичні статті від Infinite Union: скільки коштує сайт, як вибрати веб-студію, Telegram-боти для бізнесу, SEO-аудит, Google Ads чи SEO. |
| Головний ключ | блог про сайти та маркетинг |
| H1 | Блог Infinite Union: сайти, боти, SEO і реклама |
| Слів | 262 |
| JSON | `design-content/blog.json` |

**Хлібні крихти:** Головна (`/`) › Блог

#### Блоки (4)

**1. hero** — Блог Infinite Union: сайти, боти, SEO і реклама · `<div .hero>`

- _[hero-label]_ БЛОГ · INFINITE UNION · ХАРКІВ
- **H1:** Блог Infinite Union: сайти, боти, SEO і реклама
- Блог про сайти та маркетинг від веб-студії з Харкова. Пишемо про те, з чим приходять клієнти: скільки коштує сайт, як вибрати підрядника, коли потрібен Telegram-бот, що дає SEO-аудит і куди вкласти перший рекламний бюджет. Наші актуальні ціни — на сторінці «Ціни».

**2. filters** · `<div .filters>`

- Посилання/кнопка: «Ціни» → `/pricing/`
- Посилання/кнопка: «Розробка сайтів» → `/services/websites/`
- Посилання/кнопка: «Telegram-боти» → `/services/bots/`
- Посилання/кнопка: «SEO» → `/services/seo/`
- Посилання/кнопка: «Google Ads» → `/services/google-ads/`
- Посилання/кнопка: «Meta Ads» → `/services/meta-ads/`

**3. posts-list** · `<div .posts>`

- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - _[post-tag]_ РОЗРОБКА САЙТІВ
  - **H2:** Ціни на сайти у 2026: ринкові вилки в Україні
  - _[post-excerpt]_ Скільки коштують лендінг, корпоративний сайт, інтернет-магазин і SaaS на ринку: фриланс, студії, агенції. Від чого залежить вартість і як не переплатити.
  - _[post-meta]_ 30 липня 2026 · 9 хв читання
  - _[read-link]_ Читати статтю →
- Картка-посилання → `/blog/zamovyty-sayt-kharkiv/`:
  - _[post-tag]_ ВИБІР ПІДРЯДНИКА
  - **H2:** Як вибрати веб-студію і не помилитись: чек-лист 2026
  - _[post-excerpt]_ Що запитати у студії перед підписанням договору, на що звернути увагу в портфоліо та які червоні прапори вказують на проблемного виконавця.
  - _[post-meta]_ 30 липня 2026 · 7 хв читання
  - _[read-link]_ Читати статтю →
- _[section-label]_ НОВІ СТАТТІ
- Картка-посилання → `/blog/telegram-bot-dlya-biznesu/`:
  - _[post-tag]_ TELEGRAM-БОТИ
  - **H2:** Telegram-бот для бізнесу: що вміє, кому потрібен, ціна
  - _[post-excerpt]_ Які задачі закриває бот, для яких ніш підходить, з чого складається вартість і скільки триває розробка.
  - _[post-meta]_ 30 липня 2026 · 8 хв
  - _[read-link]_ Читати →
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[post-tag]_ РЕКЛАМА І SEO
  - **H2:** Google Ads чи SEO: що обрати бізнесу на старті
  - _[post-excerpt]_ Порівнюємо швидкість результату, вартість і довгостроковий ефект. Пояснюємо, коли варто поєднувати обидва канали.
  - _[post-meta]_ 30 липня 2026 · 8 хв
  - _[read-link]_ Читати →
- Картка-посилання → `/blog/seo-audit-shcho-tse/`:
  - _[post-tag]_ SEO
  - **H2:** Що таке SEO-аудит сайту і що в ньому перевіряють
  - _[post-excerpt]_ Індексація, швидкість, структура, контент, посилання: що саме перевіряють в аудиті і чому сайт може не виходити в топ Google.
  - _[post-meta]_ 30 липня 2026 · 7 хв
  - _[read-link]_ Читати →

**4. cta** — Є питання про ваш проєкт? · `<div .cta-section>`

- **H2:** Є питання про ваш проєкт?
- Напишіть нам — відповімо протягом 15 хвилин у робочий час і підкажемо, з чого почати.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`

#### Внутрішні посилання з контенту (7)

- ««Ціни»» → `/pricing/` · блок 1
- «Ціни» → `/pricing/` · блок 2
- «Розробка сайтів» → `/services/websites/` · блок 2
- «Telegram-боти» → `/services/bots/` · блок 2
- «SEO» → `/services/seo/` · блок 2
- «Google Ads» → `/services/google-ads/` · блок 2
- «Meta Ads» → `/services/meta-ads/` · блок 2

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

## 7.8 Шаблон: blog-post

### /blog/skilky-koshtuye-sayt-2026/ — Ринкові ціни на сайти 2026

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/skilky-koshtuye-sayt-2026/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-post** (батьківська: `/blog/`) |
| Robots | index, follow |
| Title (45) | Ціни на сайти у 2026: ринкові вилки в Україні |
| Description (150) | Ринкові ціни на розробку сайтів в Україні у 2026: лендінг, візитка, корпоративний сайт, магазин, SaaS. Від чого залежить вартість і як не переплатити. |
| Головний ключ | ціни на сайти 2026 |
| H1 | Ціни на сайти у 2026: ринкові вилки в Україні |
| Слів | 1169 |
| JSON | `design-content/blog__skilky-koshtuye-sayt-2026.json` |

**Хлібні крихти:** Головна (`/`) › Блог (`/blog/`) › Ринкові ціни на сайти 2026

#### Блоки (11)

**1. article-intro** · `<article>`

- Посилання/кнопка: «Головна» → `/`
- /
- Посилання/кнопка: «Блог» → `/blog/`
- Ринкові ціни на сайти 2026
- _[article-tag]_ РОЗРОБКА САЙТІВ
- _[article-date]_ 30 липня 2026
- _[article-read]_ 9 хвилин читання
- **H1:** Ціни на сайти у 2026: ринкові вилки в Україні
- Одне з найпоширеніших питань від клієнтів: «Скільки коштує зробити сайт?». Відповідь «залежить» — чесна, але не корисна. Ми зібрали ринкові ціни на сайти 2026 року в Україні — від фрилансу до агенцій, пояснили, від чого вони залежать і що саме ви отримуєте за ці гроші. Якщо потрібні саме наші ціни — вони на сторінці «Ціни Infinite Union».

**2. article-section** — Чому у всіх різні ціни на сайти? · `<article>`

- **H2:** Чому у всіх різні ціни на сайти?
- Перше що шокує клієнта — розкид цін. Один фрілансер пропонує лендінг за $150, студія просить $2000, а агентство виставляє рахунок на $8000. Хто правий? Усі. Просто йдеться про принципово різні продукти.
- Сайт — це не однорідний товар як картопля, де є одна ринкова ціна. Це послуга, результат якої залежить від досвіду команди, часу роботи, якості дизайну, функціоналу та підходу до SEO.
- Головне правило: дуже дешевий сайт майже завжди означає шаблон із мінімальними правками, відсутність SEO-оптимізації та відповідальності після здачі. Такий сайт не буде приносити клієнтів.

**3. article-section** — Ринкові ціни на різні типи сайтів у 2026 році · `<article>`

- **H2:** Ринкові ціни на різні типи сайтів у 2026 році
- Таблиця:

  | Тип сайту | Мінімум | Оптимально | Преміум | Терміни |
  | --- | --- | --- | --- | --- |
  | Лендінг (1 сторінка) | $300 | $600–900 | $1500+ | 7–14 днів |
  | Сайт-візитка (3–5 стор.) | $400 | $700–1200 | $2000+ | 10–21 день |
  | Корпоративний сайт | $800 | $1500–3000 | $5000+ | 3–6 тижнів |
  | Інтернет-магазин | $1200 | $2500–5000 | $15000+ | 4–12 тижнів |
  | Вебплатформа / SaaS | $5000 | $10000–30000 | $50000+ | 3–12 місяців |

- Ціни вказані в доларах — більшість студій в Україні виставляють рахунки саме в USD або EUR, навіть якщо отримують оплату в гривні за курсом НБУ.

**4. article-section** — Лендінг: від $300 до $1500+ · `<article>`

- **H2:** Лендінг: від $300 до $1500+
- Лендінг — одностронічний сайт з конкретною метою: зібрати заявки, продати продукт, записати на консультацію. Здавалося б, «одна сторінка» — це просто. Але саме від лендінгу залежить конверсія реклами. Як ми робимо такі сторінки — на сторінці розробки лендінгів.
- **H3:** За $300–400 ви отримаєте:
- Список:
  - Шаблонний дизайн з мінімальними правками під ваш бізнес
  - Без дослідження конкурентів та цільової аудиторії
  - Базова форма зворотного зв'язку
  - Без SEO-оптимізації
  - Фрілансер без гарантій та підтримки
- **H3:** За $600–900 ви отримаєте:
- Список:
  - Унікальний дизайн під ваш бренд та аудиторію
  - Аналіз конкурентів та УТП
  - Адаптивна верстка під мобільні пристрої
  - Базова SEO-оптимізація (title, description, швидкість)
  - Інтеграція з CRM або Telegram
  - 1 місяць підтримки після запуску
- _[tip-label]_ ПОРАДА
- Якщо ви запускаєте рекламу на лендінг — не економте на його розробці. Конверсія 2% vs 8% при бюджеті $500/місяць на рекламу дає різницю в 3 рази більше клієнтів за ті самі гроші.

**5. article-section** — Корпоративний сайт: від $800 до $5000+ · `<article>`

- **H2:** Корпоративний сайт: від $800 до $5000+
- Корпоративний сайт — це обличчя компанії в інтернеті. Він має переконати потенційного клієнта що вам можна довіряти, показати ваші послуги, команду, кейси та зробити так щоб клієнт зв'язався з вами.
- Ціна корпоративного сайту залежить від кількості сторінок, мов (один або декілька мов), наявності блогу, інтеграцій з CRM та складності дизайну. Наші тарифи і склад робіт — на сторінці корпоративного сайту.
- Таблиця:

  | Що входить | Базовий ($800–1500) | Оптимальний ($1500–3000) |
  | --- | --- | --- |
  | Кількість сторінок | 5–8 | 10–20+ |
  | Мови | 1 (укр) | 2–3 (укр/eng/рос) |
  | CMS (система управління) | Базова | Повнофункціональна |
  | SEO-оптимізація | Базова | Повна (schema, hreflang) |
  | Блог | — | ✓ |
  | Інтеграція з CRM | — | ✓ |
  | Підтримка | 1 місяць | 3 місяці |


**6. article-section** — Інтернет-магазин: від $1200 до $15000+ · `<article>`

- **H2:** Інтернет-магазин: від $1200 до $15000+
- Інтернет-магазин — найскладніший тип сайту з точки зору функціоналу. Каталог товарів, кошик, онлайн-оплата, особистий кабінет, управління замовленнями, інтеграція з 1С або CRM — кожна з цих функцій збільшує ціну. Деталі нашої розробки — на сторінці інтернет-магазину.
- **H3:** Базовий магазин ($1200–2500):
- Список:
  - До 100 товарів у каталозі
  - Онлайн-оплата (Wayforpay або LiqPay)
  - Адмінпанель для управління товарами
  - Базова SEO-оптимізація категорій
  - Адаптивний дизайн
- **H3:** Повноцінний ecommerce ($3000–8000):
- Список:
  - Необмежений каталог з фільтрами та пошуком
  - Кілька способів оплати та доставки
  - Особистий кабінет покупця
  - Інтеграція з Nova Poshta, CRM
  - Просунута SEO-оптимізація
  - Аналітика та воронки продажів

**7. article-section** — Від чого ще залежить ціна сайту · `<article>`

- **H2:** Від чого ще залежить ціна сайту
- Крім типу сайту, на вартість впливає ряд факторів які клієнти часто не враховують на старті:
- **H3:** 1. Дизайн: шаблон чи унікальний
- Шаблонний дизайн (готовий WordPress тема з правками) — дешевше в 2–3 рази, але виглядає як тисячі інших сайтів. Унікальний дизайн з нуля — дорожче, але виділяє вас серед конкурентів і підвищує конверсію.
- **H3:** 2. SEO-оптимізація з самого початку
- Якщо SEO не закладено в розробку — потім доведеться переробляти за окремі гроші. Якісна SEO-оптимізація при розробці включає: правильну структуру URL, schema.org розмітку, швидкість завантаження Core Web Vitals, hreflang для мультимовних сайтів. Подальше просування — окрема послуга SEO.
- **H3:** 3. Інтеграції
- CRM (Bitrix24, amoCRM), системи оплати, Telegram-бот, Google Analytics, API служб доставки — кожна інтеграція коштує додатково від $100 до $500+.
- **H3:** 4. Контент
- Не всі студії пишуть тексти в ціні. Уточнюйте заздалегідь: чи входять тексти, фото, відео у вартість. Написання якісних текстів для сайту — від $50 до $200 за сторінку.
- **H3:** 5. Підтримка після запуску
- Сайт потребує регулярного обслуговування: оновлення, правки, нові сторінки. Щомісячна підтримка коштує від $50 до $300/місяць залежно від обсягу робіт.
- Важливо: запитайте у студії — чи залишиться вам доступ до сайту після здачі? Деякі студії "прив'язують" клієнтів, роблячи їх залежними від себе. Ваш сайт має бути вашим активом, а не орендованим інструментом.

**8. article-section** — Як вибрати студію і не переплатити · `<article>`

- **H2:** Як вибрати студію і не переплатити
- **H3:** Що перевірити перед замовленням:
- Список:
  - Портфоліо — реальні живі сайти, а не макети в Figma
  - Відгуки — перевірте Google Maps та незалежні майданчики
  - Договір — без договору краще не починати
  - Що входить у ціну — уточніть деталі: тексти, хостинг, SEO, підтримка
  - Хто робить роботу — чи є своя команда чи студія передає на аутсорс
  - Терміни та поетапна оплата — 50% передоплата, 50% після здачі
- **H3:** Червоні прапори:
- Список:
  - Ціна значно нижча за ринкову без пояснень
  - Відмова від договору або NDA
  - 100% передоплата
  - Немає портфоліо або воно застаріле
  - Обіцяють "гарантований топ Google" за 2 тижні

**9. article-section** — Скільки коштує сайт у Infinite Union · `<article>`

- **H2:** Скільки коштує сайт у Infinite Union
- Наші ціни — на сторінці /pricing/. Там повний прайс на сайти, Telegram-боти, рекламу і SEO, що входить у вартість і що оплачується окремо.
- Коротко — стартові ціни на наші сайти:
- Таблиця:

  | Послуга | Ціна | Терміни |
  | --- | --- | --- |
  | Лендінг | від $600 | до 10 днів |
  | Корпоративний сайт | від $1 000 | ~3 тижні |
  | Інтернет-магазин | від $1 200 | ~3 тижні |
  | Вебплатформа / SaaS (MVP) | від $2 500 | 4–8 тижнів |

- У вартість входить: унікальний дизайн, адаптивна верстка, базова SEO-оптимізація, базова інтеграція з Telegram або CRM, 1 місяць підтримки після здачі. Хостинг і домен — окремо, допоможемо налаштувати. Подивитися, як це виглядає наживо, можна в портфоліо.
- **H3:** Хочете дізнатись точну ціну вашого сайту?
- Опишіть задачу в Telegram — відповімо протягом 15 хвилин з оцінкою вартості та термінів. Без зобов'язань.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`

**10. article-section** — Висновок · `<article>`

- **H2:** Висновок
- Вартість розробки сайту в Україні у 2026 році — від $300 за простий шаблонний лендінг до $50 000+ за складну вебплатформу. Реальний якісний сайт для малого бізнесу обходиться в $600–2000 залежно від типу та складності.
- Не женіться за найдешевшою ціною — дешевий сайт без SEO та конверсійного дизайну не приносить клієнтів. Це не економія, а витрачені гроші. Краще один раз зробити правильно.
- Якщо у вас є конкретне завдання — напишіть нам, і ми дамо чесну оцінку вашого проєкту з реальними цифрами.

**11. related-posts** — Читайте також · `<div .related>`

- **H2:** Читайте також
- Картка-посилання → `/blog/zamovyty-sayt-kharkiv/`:
  - _[tag]_ РОЗРОБКА САЙТІВ
  - **H3:** Як вибрати веб-студію і не помилитись: чек-лист 2026
  - Що перевірити в портфоліо, що запитати до договору і як розбити оплату на етапи.
- Картка-посилання → `/blog/telegram-bot-dlya-biznesu/`:
  - _[tag]_ TELEGRAM БОТИ
  - **H3:** Telegram-бот для бізнесу: що вміє, кому потрібен, ціна
  - Повний гід по Telegram ботам для підприємців: від вибору функцій до запуску.
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[tag]_ МАРКЕТИНГ
  - **H3:** Google Ads чи SEO: що обрати бізнесу на старті
  - Порівнюємо два підходи до залучення клієнтів з Google. Що обрати на старті.
- Картка-посилання → `/services/websites/`:
  - _[tag]_ ПОСЛУГИ
  - **H3:** Розробка сайтів від Infinite Union
  - Лендінги від $600, корпоративні сайти від $1 000, магазини від $1 200.

#### Внутрішні посилання з контенту (9)

- «Головна» → `/` · блок 1
- «Блог» → `/blog/` · блок 1
- ««Ціни Infinite Union»» → `/pricing/` · блок 1
- «розробки лендінгів» → `/services/websites-landing/` · блок 1
- «корпоративного сайту» → `/services/websites-corporate/` · блок 1
- «інтернет-магазину» → `/services/websites-shop/` · блок 1
- «SEO» → `/services/seo/` · блок 1
- «/pricing/» → `/pricing/` · блок 1
- «портфоліо» → `/portfolio/` · блок 1

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /blog/zamovyty-sayt-kharkiv/ — Як вибрати веб-студію

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/zamovyty-sayt-kharkiv/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-post** (батьківська: `/blog/`) |
| Robots | index, follow |
| Title (52) | Як вибрати веб-студію і не помилитись: чек-лист 2026 |
| Description (130) | Як вибрати веб-студію: що перевірити в портфоліо, які питання поставити до договору, червоні прапори і як розбити оплату на етапи. |
| Головний ключ | як вибрати веб-студію |
| H1 | Як вибрати веб-студію і не помилитись: чек-лист 2026 |
| Слів | 815 |
| JSON | `design-content/blog__zamovyty-sayt-kharkiv.json` |

**Хлібні крихти:** Головна (`/`) › Блог (`/blog/`) › Як вибрати веб-студію

#### Блоки (8)

**1. article-intro** · `<article>`

- Посилання/кнопка: «Головна» → `/`
- /
- Посилання/кнопка: «Блог» → `/blog/`
- Як вибрати веб-студію
- _[article-tag]_ РОЗРОБКА САЙТІВ
- _[article-date]_ 30 липня 2026
- _[article-read]_ 7 хвилин читання
- **H1:** Як вибрати веб-студію і не помилитись: чек-лист 2026
- Як вибрати веб-студію, якщо пропозицій десятки, а ціни відрізняються в рази? Нижче — чек-лист: що перевірити в портфоліо, які питання поставити до підписання договору, які червоні прапори насторожують і як розбити оплату на етапи.

**2. article-section** — Чи важливо де знаходиться студія? · `<article>`

- **H2:** Чи важливо де знаходиться студія?
- Коротка відповідь: ні, не важливо. Ми працюємо в Харкові, але з клієнтами по всій Україні та з ЄС. Усе обговорюється онлайн, результат однаковий.
- Але є ситуації де локація має значення: якщо вам важливо провести особисту зустріч, якщо у вас офлайн-бізнес і хочете щоб студія розуміла харківський ринок, або якщо вам потрібна локальна SEO-оптимізація під запити "Харків".
- Якщо це ваш випадок — подивіться, як ми робимо сайти для бізнесу в Харкові і локальне SEO. Приклад: лендінг Transfer Kharkiv має 119+ SEO-позицій у топі.

**3. article-section** — На що звертати увагу при виборі студії · `<article>`

- **H2:** На що звертати увагу при виборі студії
- **H3:** 1. Портфоліо з реальними результатами
- Красиві макети в Figma — не показник. Просіть посилання на живі сайти і перевіряйте їх в Google. Якщо сайт є а в Google його немає — значить SEO не робили.
- В ідеалі — студія показує не просто "ось наш сайт" а "ось сайт і ось які результати: X позицій в Google, Y% конверсія, Z нових клієнтів на місяць".
- **H3:** 2. Процес роботи та комунікація
- Уточніть заздалегідь: як відбувається комунікація? Чи є менеджер проєкту? Як часто будете отримувати апдейти? Хто відповідає за терміни?
- Студії що "зникають" на тижнями та не відповідають на повідомлення — класична проблема дешевих виконавців.
- **H3:** 3. Що конкретно входить у вартість
- Детальне ТЗ перед підписанням договору — must have. Уточніть:
- Список:
  - Чи входять тексти у вартість чи треба надавати самому?
  - Хто займається фото та відео контентом?
  - Чи включена SEO-оптимізація?
  - Яка підтримка після здачі і на який термін?
  - Чи залишиться доступ до сайту після завершення роботи?
- Порада: попросіть студію надати детальний список робіт що входять у ціну. Якщо студія відмовляється або каже "ми зробимо все що треба" без конкретики — це тривожний знак.

**4. article-section** — Питання що обов'язково треба поставити студії · `<article>`

- **H2:** Питання що обов'язково треба поставити студії
- Список (нумерований):
  - Хто безпосередньо робить роботу? Чи є власна команда дизайнерів та розробників, чи студія передає роботу на аутсорс фрілансерам? Аутсорс не означає погано, але впливає на контроль якості та терміни.
  - Чи будете ви власником сайту після здачі? Деякі студії роблять сайт на власному хостингу і якщо ви перестаєте платити — сайт зникає. Ваш сайт має бути на вашому хостингу з вашим доступом.
  - Як ви забезпечуєте SEO при розробці? Якщо студія каже "SEO це окремо" — значить сайт з технічної точки зору не буде готовий до просування. SEO має закладатись у структуру з першого дня.
  - Який термін гарантії та підтримки? Мінімум — 1 місяць безкоштовної підтримки після здачі для виправлення багів. Нормально — 3 місяці.
  - Як відбувається оплата? Нормальна схема: 50% передоплата на старті, 50% після здачі. 100% передоплата — ризик. Оплата тільки готівкою без договору — тікайте.

**5. article-section** — Як працюємо ми в Infinite Union · `<article>`

- **H2:** Як працюємо ми в Infinite Union
- Ми веб-студія з Харкова, робимо сайти для бізнесу по Україні та в ЄС. Нижче — що ми робимо і чого не робимо, щоб вам було з чим порівняти інші пропозиції. Ціни на всі послуги — на сторінці «Ціни», живі проєкти — у портфоліо.
- **H3:** Що ми робимо інакше:
- Список:
  - SEO закладається з першого дня розробки, а не "потім"
  - Унікальний дизайн під кожен проєкт без шаблонів
  - Повна технічна документація та передача всіх доступів
  - Базова інтеграція з Telegram або CRM у вартості сайту (детальніше — CRM-інтеграція бота)
  - Звітуємо по кожному етапу роботи
  - Середній термін відповіді — 15 хвилин у робочий час
- **H3:** Що ми НЕ робимо:
- Список:
  - Не прив'язуємо до власного хостингу
  - Не беремо 100% передоплату
  - Не обіцяємо "гарантований топ Google за місяць"
  - Не зникаємо після отримання оплати

**6. article-section** — Скільки часу займає розробка сайту · `<article>`

- **H2:** Скільки часу займає розробка сайту
- Реальні терміни розробки залежать від типу проєкту та зайнятості команди:
- Список:
  - Лендінг: 7–14 робочих днів від початку до здачі
  - Сайт-візитка: 10–21 день
  - Корпоративний сайт: 3–5 тижнів
  - Інтернет-магазин: 4–8 тижнів
- Якщо студія обіцяє зробити корпоративний сайт за 3 дні — або це шаблон, або вас обманюють щодо якості роботи.
- _[tip-label]_ ЛАЙФХАК
- Перш ніж замовляти сайт — визначте мету. "Хочу сайт" — не мета. "Хочу отримувати 20 заявок на місяць з органічного пошуку по запиту 'ремонт квартир харків'" — це мета. Від неї залежить структура, контент і SEO-стратегія сайту.
- **H3:** Хочете порівняти нашу пропозицію з іншими?
- Напишіть нам — проведемо безкоштовну консультацію, розберемо вашу задачу і дамо чесну оцінку вартості та термінів.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`

**7. article-section** — Підсумок · `<article>`

- **H2:** Підсумок
- Вибір веб-студії — не лотерея, якщо знати, на що дивитись. Перевіряйте реальні живі сайти в портфоліо, вимагайте детальне ТЗ до підписання договору, уточнюйте хто реально робить роботу і що входить у ціну.
- Якісний сайт — це інвестиція що окупається. Дешевий сайт без SEO та конверсійного дизайну — просто витрачені гроші.

**8. related-posts** — Читайте також · `<div .related>`

- **H2:** Читайте також
- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - _[tag]_ РОЗРОБКА САЙТІВ
  - **H3:** Ціни на сайти у 2026: ринкові вилки в Україні
  - Ринкові ціни на лендінги, корпоративні сайти та інтернет-магазини.
- Картка-посилання → `/blog/telegram-bot-dlya-biznesu/`:
  - _[tag]_ TELEGRAM БОТИ
  - **H3:** Telegram-бот для бізнесу: що вміє, кому потрібен, ціна
  - Повний гід по Telegram ботам: від вибору функцій до запуску.
- Картка-посилання → `/services/websites/`:
  - _[tag]_ ПОСЛУГИ
  - **H3:** Розробка сайтів від Infinite Union
  - Лендінги від $600, корпоративні сайти від $1 000, інтернет-магазини від $1 200.
- Картка-посилання → `/services/seo/`:
  - _[tag]_ SEO
  - **H3:** SEO-просування сайту
  - Технічне SEO, контент і посилання від $150/міс. Перші результати — за 3–6 місяців.

#### Внутрішні посилання з контенту (7)

- «Головна» → `/` · блок 1
- «Блог» → `/blog/` · блок 1
- «сайти для бізнесу в Харкові» → `/services/websites-kharkiv/` · блок 1
- «локальне SEO» → `/services/seo-local/` · блок 1
- ««Ціни»» → `/pricing/` · блок 1
- «портфоліо» → `/portfolio/` · блок 1
- «CRM-інтеграція бота» → `/services/bots-crm/` · блок 1

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /blog/telegram-bot-dlya-biznesu/ — Telegram-бот для бізнесу

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/telegram-bot-dlya-biznesu/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-post** (батьківська: `/blog/`) |
| Robots | index, follow |
| Title (54) | Telegram-бот для бізнесу: що вміє, кому потрібен, ціна |
| Description (133) | Telegram-бот для бізнесу простими словами: які задачі закриває, кому потрібен, з чого складається вартість і скільки триває розробка. |
| Головний ключ | telegram бот для бізнесу |
| H1 | Telegram-бот для бізнесу: що вміє, кому потрібен, ціна |
| Слів | 696 |
| JSON | `design-content/blog__telegram-bot-dlya-biznesu.json` |

**Хлібні крихти:** Головна (`/`) › Блог (`/blog/`) › Telegram-бот для бізнесу

#### Блоки (9)

**1. article-intro** · `<article>`

- Посилання/кнопка: «Головна» → `/`
- /
- Посилання/кнопка: «Блог» → `/blog/`
- Telegram-бот для бізнесу
- _[article-tag]_ TELEGRAM БОТИ
- _[article-date]_ 30 липня 2026
- _[article-read]_ 8 хвилин читання
- **H1:** Telegram-бот для бізнесу: що вміє, кому потрібен, ціна
- В Україні Telegram — не просто месенджер. Це основний канал комунікації для мільйонів людей. Telegram-бот для бізнесу — це автоматизований асистент що приймає замовлення, відповідає на запити і передає ліди менеджерам 24/7 без вихідних.

**2. article-section** — Що таке Telegram бот для бізнесу? · `<article>`

- **H2:** Що таке Telegram бот для бізнесу?
- Telegram бот — це програма що спілкується з користувачами через Telegram. Клієнт пише боту, бот відповідає, задає питання, приймає замовлення, бронює, оформляє оплату — і все це без участі живого менеджера.
- Головна відмінність від простого Telegram-каналу: бот це двостороння комунікація та автоматизація. Він не просто надсилає повідомлення — він виконує дії: записує, приймає оплату, передає дані в CRM, нагадує про запис.
- Факт: в Україні Telegram — один із найпопулярніших месенджерів. Більшість ваших потенційних клієнтів вже там — питання лише в тому, чи є у вас зручний спосіб з ними взаємодіяти.

**3. article-section** — Кому потрібен Telegram бот · `<article>`

- **H2:** Кому потрібен Telegram бот
- Telegram бот підходить не всім і не завжди. Ось де він дає максимальний ефект:
- _[use-case-icon]_ РЕСТОРАНИ
- **H4:** Доставка та заклади
- Меню в Telegram, онлайн-замовлення без комісії Glovo, сповіщення про готовність. Повертає клієнтів напряму.
- _[use-case-icon]_ ПРОДАЖІ
- **H4:** Інтернет-магазини та сервіси
- Воронка продажів, кваліфікація ліда, прийом оплати прямо в Telegram без переходу на сайт.
- _[use-case-icon]_ ПОСЛУГИ
- **H4:** Запис та бронювання
- Салони, лікарі, юристи, тренери — бот приймає записи 24/7 і надсилає нагадування клієнтам.
- _[use-case-icon]_ B2B
- **H4:** CRM та управління лідами
- Бот збирає заявки, кваліфікує їх і передає менеджерам у CRM. Жоден лід не загубиться.
- _[use-case-icon]_ ОСВІТА
- **H4:** Онлайн-школи та курси
- Розсилки уроків, домашні завдання, тести, прийом оплати за підписку або курс.
- _[use-case-icon]_ ПІДТРИМКА
- **H4:** Клієнтська підтримка
- Відповіді на FAQ, статуси замовлень, переключення на живого оператора у складних випадках.

**4. article-section** — Скільки коштує Telegram бот у 2026 році · `<article>`

- **H2:** Скільки коштує Telegram бот у 2026 році
- Таблиця:

  | Тип бота | Що включає | Ціна | Терміни |
  | --- | --- | --- | --- |
  | Простий бот | FAQ, контакти, форма заявки | від $300 | до 2 тижнів |
  | Бізнес-бот | Оплати, CRM, 1 місяць підтримки | від $700 | до 4 тижнів |
  | Бот для продажів | Воронка, кваліфікація, оплата | від $500 | від 7 днів |
  | Бот для ресторану | Меню (до 50 позицій), замовлення, кошик, оплата | від $600 | від 7 днів |
  | Бот з CRM-інтеграцією | 1 CRM, розподіл лідів | від $800 | від 7 днів |
  | Enterprise-бот | Mini App, AI, 3 місяці підтримки | від $1 500 | індивідуально |

- Ціни на боти поруч із цінами на сайти й рекламу — на сторінці «Ціни».

**5. article-section** — Що входить у вартість розробки бота · `<article>`

- **H2:** Що входить у вартість розробки бота
- Список:
  - Аналіз бізнес-процесів — розуміємо які задачі автоматизувати
  - Написання сценаріїв — всі діалоги та гілки розмов
  - Розробка та тестування — Python/aiogram, надійна архітектура
  - Адмін-панель — управляєте контентом бота без технічних знань
  - Інтеграції — CRM, оплата, Google Sheets, або ваша система
  - Деплой — розміщуємо на сервері, бот працює 24/7
  - Підтримка — 1–3 місяці після запуску

**6. article-section** — Telegram бот vs мобільний додаток: що краще · `<article>`

- **H2:** Telegram бот vs мобільний додаток: що краще
- Це часте питання. Порівняємо чесно:
- Таблиця:

  | Критерій | Telegram бот | Мобільний додаток |
  | --- | --- | --- |
  | Вартість розробки | від $300 | від $5000 |
  | Терміни | 1–3 тижні | 3–6 місяців |
  | Встановлення | Не потрібно | Потрібно |
  | Оновлення | Миттєво | Через App Store |
  | Аудиторія | Вже в Telegram | Потрібно залучати |
  | Push-сповіщення | Так | Так |

- Для більшості малого та середнього бізнесу в Україні Telegram бот — значно ефективніша інвестиція ніж мобільний додаток. Ваші клієнти вже в Telegram, не треба їх нікуди переводити.

**7. article-section** — Чому варто довіряти розробку Infinite Union · `<article>`

- **H2:** Чому варто довіряти розробку Infinite Union
- Ми розробляємо Telegram боти на Python з використанням aiogram — найнадійнішого фреймворку для серйозних ботів. Наприклад, офіційний бот КНЕУ, який ми зробили, має 3 000+ активних користувачів — більше проєктів у портфоліо.
- Список:
  - Деплой на Railway, PostgreSQL для даних
  - Оплати через LiqPay, WayForPay, Monobank, Stripe, Telegram Payments
  - Підключення до Bitrix24, amoCRM, Google Sheets
  - Адмін-панель прямо в Telegram — без технічних знань
  - Детальна аналітика: скільки людей прийшло, скільки купило
- **H3:** Потрібен Telegram бот для вашого бізнесу?
- Опишіть задачу — відповімо протягом 15 хвилин у робочий час з оцінкою вартості та термінів.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`

**8. article-section** — Висновок · `<article>`

- **H2:** Висновок
- Telegram бот для бізнесу — це не модний тренд, а реальний інструмент автоматизації що вже сьогодні заощаджує час менеджерів і збільшує конверсію лідів у продажі.
- Якщо ваш бізнес щодня отримує однакові запити від клієнтів — бот бере їх на себе, а менеджери займаються складними питаннями. Простий бот коштує від $300, бот для продажів — від $500.

**9. related-posts** — Читайте також · `<div .related>`

- **H2:** Читайте також
- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - _[tag]_ РОЗРОБКА
  - **H3:** Ціни на сайти у 2026: ринкові вилки в Україні
  - Ринкові ціни на лендінги, корпоративні сайти та інтернет-магазини.
- Картка-посилання → `/services/bots/`:
  - _[tag]_ ПОСЛУГИ
  - **H3:** Розробка Telegram ботів від Infinite Union
  - Боти для продажів, ресторанів, CRM-інтеграція. Від $300.
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[tag]_ МАРКЕТИНГ
  - **H3:** Google Ads чи SEO: що обрати бізнесу на старті
  - Порівнюємо два підходи до залучення клієнтів.
- Картка-посилання → `/services/bots-crm/`:
  - _[tag]_ CRM
  - **H3:** Telegram бот з CRM інтеграцією
  - Bitrix24, amoCRM, Pipedrive — ліди автоматично в CRM.

#### Внутрішні посилання з контенту (10)

- «Головна» → `/` · блок 1
- «Блог» → `/blog/` · блок 1
- «Простий бот» → `/services/bots/` · блок 1
- «Бізнес-бот» → `/services/bots/` · блок 1
- «Бот для продажів» → `/services/bots-sales/` · блок 1
- «Бот для ресторану» → `/services/bots-restaurant/` · блок 1
- «Бот з CRM-інтеграцією» → `/services/bots-crm/` · блок 1
- «Enterprise-бот» → `/services/bots/` · блок 1
- ««Ціни»» → `/pricing/` · блок 1
- «портфоліо» → `/portfolio/` · блок 1

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

### /blog/seo-audit-shcho-tse/ — Що таке SEO-аудит

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/seo-audit-shcho-tse/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-post** (батьківська: `/blog/`) |
| Robots | index, follow |
| Title (48) | Що таке SEO-аудит сайту і що в ньому перевіряють |
| Description (139) | Що таке SEO-аудит, які пункти перевіряють (індексація, швидкість, структура, контент, посилання) і чому сайт може не виходити в топ Google. |
| Головний ключ | що таке SEO аудит |
| H1 | Що таке SEO-аудит сайту і що в ньому перевіряють |
| Слів | 659 |
| JSON | `design-content/blog__seo-audit-shcho-tse.json` |

**Хлібні крихти:** Головна (`/`) › Блог (`/blog/`) › Що таке SEO-аудит

#### Блоки (8)

**1. article-intro** · `<article>`

- Посилання/кнопка: «Головна» → `/`
- /
- Посилання/кнопка: «Блог» → `/blog/`
- Що таке SEO-аудит
- _[article-tag]_ SEO
- _[article-date]_ 30 липня 2026
- _[article-read]_ 7 хвилин читання
- **H1:** Що таке SEO-аудит сайту і що в ньому перевіряють
- У вас є сайт але він не видно в Google? Або сайт є в пошуку але трафіку майже немає? Причину знайде SEO аудит — комплексна перевірка сайту що виявляє всі технічні та контентні помилки що заважають Google показувати вас вище.

**2. article-section** — Що таке SEO аудит простими словами · `<article>`

- **H2:** Що таке SEO аудит простими словами
- Що таке SEO-аудит? Це детальна перевірка вашого сайту за десятками параметрів, що впливають на позиції в Google: індексація, швидкість, структура, контент, посилання. За результатами аудиту ви отримуєте список конкретних помилок та план їх виправлення з пріоритизацією.
- Аналогія: SEO аудит для сайту — як технічний огляд для автомобіля. Ви можете їздити з незатягнутими болтами та брудним фільтром і не розуміти чому машина тягне гірше і витрачає більше пального. Технічний огляд показує де проблема.
- Важливо знати: багато сайтів, що "не ранжуються", мають технічні помилки, які можна виправити. Часто саме вони, а не нестача посилань, тримають сайт поза топом.

**3. article-section** — Що перевіряє SEO аудит · `<article>`

- **H2:** Що перевіряє SEO аудит
- _[audit-section-num]_ 01
- **H4:** Технічний SEO
- Список:
  - robots.txt та sitemap.xml
  - Canonical теги та дублі
  - hreflang для мультимовних
  - Редіректи 301/302
  - Статус-коди сторінок
  - Структура URL
- _[audit-section-num]_ 02
- **H4:** Core Web Vitals
- Список:
  - LCP (швидкість завантаження)
  - INP (реакція на взаємодію)
  - CLS (стабільність макету)
  - Загальна швидкість сайту
  - Мобільна оптимізація
  - PageSpeed Score
- _[audit-section-num]_ 03
- **H4:** Контент та мета-теги
- Список:
  - Title та description
  - H1-H6 заголовки
  - Унікальність контенту
  - Thin content сторінки
  - Канібалізація ключових слів
  - Внутрішня перелінковка
- _[audit-section-num]_ 04
- **H4:** Посилальний профіль
- Список:
  - Кількість та якість беклінків
  - Токсичні посилання
  - Анкорний профіль
  - Порівняння з конкурентами
  - Динаміка нарощування
  - Domain Authority

**4. article-section** — Коли потрібен SEO аудит · `<article>`

- **H2:** Коли потрібен SEO аудит
- Список:
  - ✓ Сайт є але трафіку немає — аудит покаже чому Google не показує вас
  - ✓ Різке падіння позицій — після апдейту Google або технічних змін на сайті
  - ✓ Перед початком SEO-просування — щоб не витрачати гроші на просування технічно несправного сайту
  - ✓ Після редизайну або міграції — нова версія сайту може зламати SEO-структуру
  - ✓ Планова перевірка раз на рік — навіть здоровий сайт потребує регулярного моніторингу

**5. article-section** — Core Web Vitals: чому це важливо у 2026 · `<article>`

- **H2:** Core Web Vitals: чому це важливо у 2026
- Google з 2021 року офіційно використовує Core Web Vitals як фактор ранжування. Якщо ваш сайт повільно завантажується або "стрибає" при завантаженні — Google знижує ваші позиції незалежно від якості контенту.
- **H3:** Три ключових показники:
- LCP (Largest Contentful Paint) — час завантаження головного контенту. Норма: до 2.5 секунд. Якщо більше — сторінка отримує негативну оцінку від Google.
- INP (Interaction to Next Paint) — як швидко сторінка реагує на дії користувача. З 2024 року замінив FID. Норма: до 200 мс.
- CLS (Cumulative Layout Shift) — наскільки елементи зсуваються при завантаженні. Норма: менше 0.1. Коли кнопка "стрибає" і ви натискаєте не туди — це поганий CLS.
- Порада: перевірте свій сайт у PageSpeed Insights на мобільному. Якщо LCP більше 4 секунд — це вже зона «погано» за оцінкою Google і привід почати з технічної частини.

**6. article-section** — Що ви отримаєте після SEO аудиту від Infinite Union · `<article>`

- **H2:** Що ви отримаєте після SEO аудиту від Infinite Union
- Ми не просто надаємо список помилок — ми пояснюємо, що кожна помилка означає для ваших позицій і як її виправити. Базовий аудит — від $100 (до 50 сторінок, 3 дні), повний — від $300 (5 днів). Детальніше — на сторінці SEO-аудиту.
- Таблиця:

  | Що входить | Базовий (від $100) | Повний (від $300) |
  | --- | --- | --- |
  | Core Web Vitals аналіз | ✓ | ✓ |
  | Технічні помилки | ✓ | ✓ |
  | Індексація та robots.txt | ✓ | ✓ |
  | Аналіз meta-тегів | ✓ | ✓ |
  | Семантичний аналіз | — | ✓ |
  | Посилальний профіль | — | ✓ |
  | Конкурентний аналіз | — | ✓ |
  | Пріоритизований план виправлень | Базовий | Детальний |
  | Терміни | 3 дні | 5 днів |

- **H3:** Дізнайтесь чому Google не бачить ваш сайт
- Замовте SEO аудит — отримаєте детальний звіт з конкретним планом виправлень.
- Посилання/кнопка: «ЗАМОВИТИ АУДИТ» → `https://t.me/infiniteunion_manager`

**7. article-section** — Висновок · `<article>`

- **H2:** Висновок
- SEO аудит — це не витрата, а інвестиція. Знаючи де саме проблема, ви не витрачаєте гроші на посилання та контент для технічно несправного сайту.
- Після аудиту помилки можна виправити самостійно або доручити нам — разом із подальшим SEO-просуванням (від $150/міс). Для бізнесу, що працює в одному місті, почніть з локального SEO. Усі ціни — на сторінці «Ціни».

**8. related-posts** — Читайте також · `<div .related>`

- **H2:** Читайте також
- Картка-посилання → `/blog/google-ads-chy-seo/`:
  - _[tag]_ МАРКЕТИНГ
  - **H3:** Google Ads чи SEO: що обрати бізнесу на старті
  - Порівнюємо два підходи та пояснюємо коли що використовувати.
- Картка-посилання → `/services/seo-audit/`:
  - _[tag]_ ПОСЛУГИ
  - **H3:** SEO аудит від Infinite Union
  - Детальний звіт і план виправлень. Базовий — від $100, повний — від $300.
- Картка-посилання → `/services/seo/`:
  - _[tag]_ SEO
  - **H3:** Комплексне SEO просування
  - Технічне SEO, контент, посилання. Від $150/міс, перші результати за 3–6 місяців.
- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - _[tag]_ РОЗРОБКА
  - **H3:** Ціни на сайти у 2026: ринкові вилки в Україні
  - Ринкові ціни 2026 року на всі типи сайтів.

#### Внутрішні посилання з контенту (6)

- «Головна» → `/` · блок 1
- «Блог» → `/blog/` · блок 1
- «SEO-аудиту» → `/services/seo-audit/` · блок 1
- «SEO-просуванням» → `/services/seo/` · блок 1
- «локального SEO» → `/services/seo-local/` · блок 1
- ««Ціни»» → `/pricing/` · блок 1

Зовнішні / контактні: «ЗАМОВИТИ АУДИТ» → `https://t.me/infiniteunion_manager`

---

### /blog/google-ads-chy-seo/ — Google Ads чи SEO

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/blog/google-ads-chy-seo/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **blog-post** (батьківська: `/blog/`) |
| Robots | index, follow |
| Title (46) | Google Ads чи SEO: що обрати бізнесу на старті |
| Description (132) | Google Ads чи SEO: порівнюємо швидкість результату, вартість, довгостроковий ефект і пояснюємо, коли варто поєднувати обидва канали. |
| Головний ключ | google ads чи seo |
| H1 | Google Ads чи SEO: що обрати бізнесу на старті |
| Слів | 761 |
| JSON | `design-content/blog__google-ads-chy-seo.json` |

**Хлібні крихти:** Головна (`/`) › Блог (`/blog/`) › Google Ads чи SEO

#### Блоки (9)

**1. article-intro** · `<article>`

- Посилання/кнопка: «Головна» → `/`
- /
- Посилання/кнопка: «Блог» → `/blog/`
- Google Ads чи SEO
- _[article-tag]_ DIGITAL МАРКЕТИНГ
- _[article-date]_ 30 липня 2026
- _[article-read]_ 8 хвилин читання
- **H1:** Google Ads чи SEO: що обрати бізнесу на старті
- Google Ads чи SEO — це питання задає кожен підприємець, що виходить в онлайн. Однозначної відповіді немає — все залежить від вашого бізнесу, бюджету та цілей. Але є чіткі правила коли що використовувати, щоб не витрачати гроші даремно.

**2. article-section** — Головна відмінність між Google Ads і SEO · `<article>`

- **H2:** Головна відмінність між Google Ads і SEO
- Google Ads (контекстна реклама) — ви платите за кожен клік. Вимкнули рекламу — трафік зупинився. Перевага: результат з першого дня.
- SEO (пошукова оптимізація) — ви інвестуєте в органічні позиції. Результат через 3-6 місяців, але потім трафік йде без щомісячних витрат на рекламу.
- _[compare-label]_ GOOGLE ADS
- **H3:** Платний трафік
- Список:
  - Результат з першого дня
  - Точний таргетинг по запитам
  - Легко масштабувати
  - A/B тести оголошень
  - Прозора аналітика ROI
- Список:
  - Платите за кожен клік
  - Зупинили рекламу — немає трафіку
  - Конкуренти можуть підвищити ставки
  - Частина аудиторії ігнорує рекламу
- _[compare-label]_ SEO
- **H3:** Органічний трафік
- Список:
  - Безкоштовний трафік після досягнення позицій
  - Вищий рівень довіри користувачів
  - Довгостроковий ефект
  - Накопичувальний результат
  - Не залежить від рекламного бюджету
- Список:
  - Результат через 3-6 місяців
  - Алгоритми Google змінюються
  - Потребує постійного контенту
  - Складніше в висококонкурентних нішах

**3. article-section** — Детальне порівняння: Google Ads vs SEO · `<article>`

- **H2:** Детальне порівняння: Google Ads vs SEO
- Таблиця:

  | Параметр | Google Ads | SEO |
  | --- | --- | --- |
  | Швидкість результату | 1–3 дні | 3–6 місяців |
  | Вартість (Infinite Union) | бюджет від $300/міс + ведення від $200/міс | від $150/міс |
  | Ціна кліку | залежить від ніші та конкуренції | безкоштовно |
  | Після зупинки | Трафік зникає | Позиції тримаються місяцями |
  | Довіра користувачів | Нижча (реклама) | Вища (органіка) |
  | CTR (клікабельність) | нижчий, частина людей пропускає рекламу | найвищий у перших позиціях органіки |
  | Підходить для | Швидкий старт, сезонність | Довгострокове зростання |


**4. article-section** — Коли використовувати Google Ads · `<article>`

- **H2:** Коли використовувати Google Ads
- Google Ads — правильний вибір в таких ситуаціях:
- **H3:** Новий бізнес або продукт
- SEO потребує часу. Якщо ви щойно запустились і вам потрібні клієнти вже зараз — Google Ads дасть трафік з першого дня поки SEO ще "розгойдується".
- **H3:** Сезонний бізнес
- Продаєте новорічні іграшки, кондиціонери влітку або зимові шини? Google Ads дозволяє включати рекламу саме в пік сезону і вимикати в міжсезоння.
- **H3:** Висококонкурентні ніші
- В деяких нішах (юридичні послуги, стоматологія, нерухомість) вийти в органічний топ дуже складно. Google Ads дозволяє з'явитись на першій сторінці незалежно від конкуренції. Як ми налаштовуємо такі кампанії — на сторінці пошукової реклами Google.
- **H3:** Тестування нових напрямків
- Хочете перевірити чи є попит на новий продукт? Запустіть рекламу на тиждень і побачите реальні цифри ще до того як інвестувати в SEO та контент.

**5. article-section** — Коли використовувати SEO · `<article>`

- **H2:** Коли використовувати SEO
- **H3:** Довгострокове зростання бізнесу
- Якщо ви плануєте бізнес на роки — SEO обов'язковий. Органічний трафік що ви нарощуєте сьогодні буде приносити клієнтів через 2-3 роки без додаткових вкладень.
- **H3:** Інформаційний контент та блог
- Статті, гіди, огляди — ідеальний формат для SEO. Правильно оптимізована стаття може приносити трафік роками.
- **H3:** Локальний бізнес
- Для запитів типу "стоматолог харків", "ресторан поруч зі мною" — локальне SEO + Google Business Profile дає добрі результати з відносно невеликими вкладеннями.

**6. article-section** — Оптимальна стратегія: поєднувати обидва інструменти · `<article>`

- **H2:** Оптимальна стратегія: поєднувати обидва інструменти
- Найефективніший підхід — використовувати Google Ads та SEO одночасно, але з різними цілями:
- **H3:** Рекомендована стратегія для українського бізнесу:
- _[verdict-label]_ Місяці 1–3
- _[verdict-val]_ Google Ads для швидкого трафіку + початок SEO робіт (технічна оптимізація, контент)
- _[verdict-label]_ Місяці 4–6
- _[verdict-val]_ SEO починає давати перші позиції, поступово знижуємо рекламний бюджет по тих запитах де є органіка
- _[verdict-label]_ Від місяця 6+
- _[verdict-val]_ SEO дає основний трафік, Google Ads — для сезонності та нових напрямків
- Як це виглядає на практиці: на старті реклама дає заявки, поки SEO нарощує позиції. Коли сайт виходить у топ за частиною запитів, рекламу за ними можна скоротити, а бюджет перекинути на нові напрямки чи сезонні кампанії. Приклад сайту з SEO від нас — лендінг Transfer Kharkiv зі 119+ позиціями в топі (портфоліо).

**7. article-section** — Скільки коштує Google Ads та SEO в Україні · `<article>`

- **H2:** Скільки коштує Google Ads та SEO в Україні
- Таблиця:

  | Послуга | Infinite Union | Що включає |
  | --- | --- | --- |
  | Налаштування Google Ads | від $300 | Семантика, оголошення, трекінг |
  | Ведення Google Ads | від $200/міс | Оптимізація, A/B тести, звіти. Рекламний бюджет — окремо, від $300/міс |
  | SEO-просування | від $150/міс | Технічна оптимізація, контент, посилання |
  | SEO-аудит | від $100 | Базовий: до 50 сторінок, 3 дні, план виправлень |

- Повний прайс на рекламу, SEO і розробку — на сторінці «Ціни».
- **H3:** Не знаєте що обрати для вашого бізнесу?
- Проведемо безкоштовну консультацію та запропонуємо оптимальну стратегію залучення клієнтів.
- Посилання/кнопка: «Telegram» → `https://t.me/infiniteunion_manager`
- Посилання/кнопка: «WhatsApp» → `https://wa.me/380688286969`
- Посилання/кнопка: «Viber» → `viber://chat?number=%2B380688286969`
- Посилання/кнопка: «+380688286969» → `tel:+380688286969`
- Посилання/кнопка: «GOOGLE ADS» → `/services/google-ads/`

**8. article-section** — Висновок · `<article>`

- **H2:** Висновок
- Google Ads vs SEO — це не вибір одного замість іншого. Це два різних інструменти для різних задач.
- Якщо вам потрібні клієнти вже зараз — запускайте Google Ads. Якщо будуєте бізнес на роки — інвестуйте в SEO з першого дня. Оптимально — поєднувати обидва підходи з поступовим збільшенням частки органічного трафіку.

**9. related-posts** — Читайте також · `<div .related>`

- **H2:** Читайте також
- Картка-посилання → `/blog/seo-audit-shcho-tse/`:
  - _[tag]_ SEO
  - **H3:** Що таке SEO-аудит сайту і що в ньому перевіряють
  - Що перевіряє SEO аудит і як він допомагає виправити причини низьких позицій.
- Картка-посилання → `/services/google-ads/`:
  - _[tag]_ ПОСЛУГИ
  - **H3:** Google Ads від Infinite Union
  - Налаштування від $300, ведення від $200/міс. Рекламний бюджет — окремо.
- Картка-посилання → `/services/seo/`:
  - _[tag]_ SEO
  - **H3:** SEO просування сайту
  - Комплексне SEO: аудит, семантика, контент, посилання. Від $150/місяць.
- Картка-посилання → `/blog/skilky-koshtuye-sayt-2026/`:
  - _[tag]_ РОЗРОБКА
  - **H3:** Ціни на сайти у 2026: ринкові вилки в Україні
  - Ринкові ціни на лендінги, магазини та корпоративні сайти.

#### Внутрішні посилання з контенту (11)

- «Головна» → `/` · блок 1
- «Блог» → `/blog/` · блок 1
- «пошукової реклами Google» → `/services/google-ads-search/` · блок 1
- «локальне SEO» → `/services/seo-local/` · блок 1
- «портфоліо» → `/portfolio/` · блок 1
- «Налаштування Google Ads» → `/services/google-ads/` · блок 1
- «Ведення Google Ads» → `/services/google-ads/` · блок 1
- «SEO-просування» → `/services/seo/` · блок 1
- «SEO-аудит» → `/services/seo-audit/` · блок 1
- ««Ціни»» → `/pricing/` · блок 1
- «GOOGLE ADS» → `/services/google-ads/` · блок 1

Зовнішні / контактні: «Telegram» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «Viber» → `viber://chat?number=%2B380688286969`, «+380688286969» → `tel:+380688286969`

---

## 7.9 Шаблон: privacy

### /services/privacy/ — Політика конфіденційності

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/services/privacy/ |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **privacy** |
| Robots | noindex, follow |
| Title (42) | Політика конфіденційності — Infinite Union |
| Description (123) | Політика конфіденційності Infinite Union: які дані ми збираємо через форми та месенджери, як їх використовуємо і захищаємо. |
| Головний ключ |  |
| H1 | Політика конфіденційності |
| Слів | 1413 |
| JSON | `design-content/services__privacy.json` |

**Хлібні крихти:** Головна (`/`) › Політика конфіденційності

#### Блоки (1)

**1. content** — Політика конфіденційності · `<div .wrap>`

- _[hero-label]_ ЮРИДИЧНИЙ ДОКУМЕНТ
- **H1:** Політика конфіденційності
- _[updated]_ Остання редакція: 15 липня 2026 року · Версія 2.0
- _[toc-title]_ ЗМІСТ
- Список (нумерований):
  - «Загальні положення» → `/services/privacy/#s1`
  - «Які дані ми отримуємо» → `/services/privacy/#s2`
  - «Правові підстави обробки» → `/services/privacy/#s3`
  - «Як ми використовуємо дані» → `/services/privacy/#s4`
  - «Зберігання та захист даних» → `/services/privacy/#s5`
  - «Передача даних та обробники» → `/services/privacy/#s6`
  - «Міжнародна передача даних» → `/services/privacy/#s7`
  - «Файли cookie та аналітика» → `/services/privacy/#s8`
  - «Telegram-бот» → `/services/privacy/#s9`
  - «Ваші права» → `/services/privacy/#s10`
  - «Діти та неповнолітні» → `/services/privacy/#s11`
  - «Зміни до політики» → `/services/privacy/#s12`
  - «Контакти» → `/services/privacy/#s13`
- **H2:** 01. Загальні положення
- Ця Політика конфіденційності («Політика») пояснює, як проєкт Infinite Union («ми», «нас», «наш») обробляє персональні дані, які надходять до нас від користувачів веб-сайту infiniteunion.com.ua, його піддоменів та пов'язаних сервісів, зокрема Telegram-бота @infiniteunion_bot (разом — «Сервіси»).
- Ми діємо як володілець (контролер) персональних даних та визначаємо мету і засоби їх обробки. Політику складено відповідно до Закону України «Про захист персональних даних» № 2297-VI та, у застосовних випадках, Загального регламенту ЄС про захист даних 2016/679 (GDPR).
- Користуючись Сервісами та надаючи нам свої дані, ви підтверджуєте, що ознайомилися з цією Політикою та розумієте, яким чином обробляються ваші дані. Якщо ви не погоджуєтесь з умовами — будь ласка, утримайтесь від надання даних та використання Сервісів.
- Ми обробляємо лише ті дані, які ви свідомо надаєте нам самостійно, або які технічно необхідні для функціонування Сервісів. Ми не купуємо бази даних, не збираємо дані з відкритих джерел та не формуємо профілі користувачів для перепродажу.
- **H2:** 02. Які дані ми отримуємо
- Ми обробляємо кілька категорій даних. Обсяг залежить від того, як саме ви взаємодієте з нами.
- 1. Дані, які ви надаєте нам добровільно
- Ці дані надходять до нас лише тоді, коли ви самостійно вносите їх у форму зворотного зв'язку на сайті або надсилаєте боту:
- Список:
  - Ім'я або назва компанії, яку ви представляєте
  - Контактні дані: номер телефону, email, Telegram username
  - Інформація про запит: тип проєкту, орієнтовний бюджет, бажаний строк
  - Опис завдання та будь-яка інша інформація, яку ви вирішили повідомити у зверненні
- Надання цих даних є добровільним. Однак без базових контактних даних ми не зможемо опрацювати ваше звернення та зв'язатися з вами.
- 2. Дані, що обробляються автоматично
- Під час відвідування сайту наша інфраструктура та інфраструктура наших постачальників може автоматично отримувати технічні дані, необхідні для доставки контенту та безпеки:
- Список:
  - IP-адреса та приблизне геарозташування (на рівні країни/міста)
  - Тип і версія браузера, операційна система, тип пристрою
  - Дата, час і тривалість відвідування, переглянуті сторінки
  - Джерело переходу (реферер) та технічні журнали сервера
- 3. Дані, що передаються під час надсилання форми
- Коли ви заповнюєте та надсилаєте форму на сайті, введені вами дані передаються захищеним з'єднанням (HTTPS/TLS) на наш сервер, розміщений на платформі Railway, де зберігаються у базі даних для подальшого опрацювання вашого звернення. Форма також містить технічний захист від автоматичних спам-надсилань (honeypot), який не збирає жодних додаткових персональних даних.
- 4. Дані з Telegram
- Список:
  - Ваш Telegram ID та username — надаються самим Telegram під час взаємодії з ботом
  - Відповіді, які ви надсилаєте боту в межах опитування (квізу)
  - Технічний час взаємодії з ботом
- **H2:** 03. Правові підстави обробки
- Ми обробляємо ваші дані лише за наявності законної підстави. Залежно від ситуації такими підставами є:
- Список:
  - Ваша згода — надана шляхом добровільного заповнення форми чи звернення до бота (ст. 6(1)(a) GDPR)
  - Виконання договору або вжиття заходів на ваш запит — обробка звернення, підготовка пропозиції, надання послуг (ст. 6(1)(b) GDPR)
  - Законний інтерес — забезпечення безпеки Сервісів, запобігання зловживанням, покращення якості (ст. 6(1)(f) GDPR)
  - Виконання юридичних зобов'язань — коли обробка вимагається законодавством (ст. 6(1)(c) GDPR)
- Ви можете відкликати надану згоду в будь-який момент, звернувшись до нас за контактами, вказаними в розділі 13. Відкликання згоди не впливає на законність обробки, здійсненої до її відкликання.
- **H2:** 04. Як ми використовуємо дані
- Отримані дані використовуються виключно для чітко визначених цілей:
- Список:
  - Опрацювання звернень — зв'язок із вами та обговорення вашого запиту
  - Надання послуг — виконання домовленостей та зобов'язань перед вами
  - Комунікація — відповіді на запитання, надсилання комерційних пропозицій на ваш запит
  - Безпека та стабільність — захист Сервісів від зловживань, шахрайства та технічних збоїв
  - Покращення якості — знеособлений аналіз використання Сервісів
  - Дотримання законодавства — виконання вимог чинного права
- Ми ніколи не продаємо, не здаємо в оренду та не передаємо ваші персональні дані третім особам з рекламною чи маркетинговою метою. Дані не використовуються для автоматизованого прийняття рішень, що мають юридичні наслідки для вас.
- **H2:** 05. Зберігання та захист даних
- Дані, які надходять через форму на сайті та Telegram-бота, зберігаються у базі даних на серверах платформи Railway із застосуванням шифрування під час передавання та зберігання.
- Технічні та організаційні заходи безпеки:
- Список:
  - Шифрування всіх з'єднань за протоколом HTTPS/TLS
  - Зберігання у захищеній базі даних PostgreSQL з обмеженим доступом
  - Секрети та ключі доступу зберігаються у захищених змінних середовища, а не в коді
  - Доступ до даних мають лише уповноважені особи, задіяні в опрацюванні звернень
  - Регулярне резервне копіювання та моніторинг безпеки
- Строки зберігання:
- Список:
  - Звернення та контактні дані — до 3 років з моменту останньої взаємодії або завершення співпраці
  - Знеособлені аналітичні дані — до 26 місяців
  - Резервні копії — до 90 днів
- Після завершення строку зберігання дані видаляються або знеособлюються безповоротно. Ви можете попросити видалити ваші дані раніше — див. розділ 10.
- **H2:** 06. Передача даних та обробники
- Для функціонування Сервісів ми залучаємо надійних постачальників послуг (обробників даних), які обробляють дані виключно за нашими вказівками та в межах наданих послуг. Передача даних цим постачальникам є технічно необхідною для роботи Сервісів:
- Список:
  - Railway — хмарний хостинг сервера, бази даних та застосунків, де зберігаються дані ваших звернень (інфраструктура на території США та ЄС)
  - Telegram Messenger — забезпечення роботи Telegram-бота та обмін повідомленнями
  - GitHub Pages — хостинг статичних сторінок веб-сайту
  - Cloudflare — забезпечення доставки контенту, захисту від атак та DNS (у разі підключення)
  - Google Analytics — знеособлена статистика відвідуваності (у разі підключення)
- Кожен постачальник обробляє дані відповідно до власної політики конфіденційності та застосовних стандартів захисту даних. Ми передаємо мінімально необхідний обсяг даних і лише в тому обсязі, який потрібен для надання відповідної послуги.
- Ми не передаємо ваші дані державним органам, за винятком випадків, коли це прямо вимагається чинним законодавством на підставі належно оформленого запиту.
- **H2:** 07. Міжнародна передача даних
- Оскільки частина наших постачальників (Railway, GitHub, Telegram, Cloudflare, Google) розміщує інфраструктуру за межами України та ЄС, зокрема у США, ваші дані можуть передаватися та оброблятися за кордоном.
- Такі передачі здійснюються за наявності належних гарантій захисту, передбачених застосовним законодавством, зокрема на підставі стандартних договірних положень (Standard Contractual Clauses) або участі постачальників у визнаних програмах захисту даних. Надаючи нам дані, ви розумієте та погоджуєтесь із такою міжнародною передачею в обсязі, необхідному для надання Сервісів.
- **H2:** 08. Файли cookie та аналітика
- Сайт використовує мінімально необхідний набір файлів cookie та подібних технологій:
- Список:
  - Технічно необхідні — забезпечують базову роботу сайту; не потребують згоди
  - Аналітичні — допомагають знеособлено зрозуміти, як відвідувачі користуються сайтом (у разі підключення аналітики)
- Ви можете керувати файлами cookie або вимкнути їх у налаштуваннях свого браузера. Вимкнення окремих cookie може вплинути на роботу деяких елементів сайту.
- Ми не використовуємо рекламні cookie та не передаємо дані рекламним мережам третіх сторін для показу націленої реклами.
- **H2:** 09. Telegram-бот
- Наш Telegram-бот @infiniteunion_bot обробляє дані виключно в межах опитування для оформлення звернення:
- Список:
  - Telegram ID та username — надаються Telegram і використовуються для ідентифікації та зворотного зв'язку
  - Відповіді на запитання опитування — для формування вашого звернення
  - Час взаємодії — для адміністративних і безпекових цілей
- Дані, надіслані через бота, передаються та зберігаються у захищеній базі даних на серверах Railway і доступні лише уповноваженим особам. Ви можете в будь-який момент попросити видалити свої дані, написавши нам.
- Взаємодія з ботом додатково регулюється Політикою конфіденційності Telegram.
- **H2:** 10. Ваші права
- Щодо своїх персональних даних ви маєте право:
- Список:
  - На доступ — отримати підтвердження обробки та копію ваших даних
  - На виправлення — виправити неточні чи неповні дані
  - На видалення — вимагати видалення даних («право бути забутим»)
  - На обмеження обробки — тимчасово обмежити обробку в передбачених законом випадках
  - На перенесення — отримати дані у структурованому, машиночитаному форматі
  - На заперечення — заперечити проти обробки, що ґрунтується на законному інтересі
  - На відкликання згоди — у будь-який час, без впливу на попередню законну обробку
  - На скаргу — звернутися до наглядового органу (в Україні — Уповноважений Верховної Ради з прав людини)
- Для реалізації будь-якого права напишіть нам на supportinfiniteunion@gmail.com або в Telegram @infiniteunion_manager / WhatsApp / +380688286969. Ми відповімо у розумний строк, але не пізніше 30 днів. Для захисту ваших даних ми можемо попросити підтвердити особу перед виконанням запиту.
- **H2:** 11. Діти та неповнолітні
- Сервіси призначені для осіб, які досягли віку, з якого за застосовним законодавством особа може самостійно надавати згоду на обробку персональних даних. Ми свідомо не збираємо дані дітей. Якщо ви вважаєте, що неповнолітня особа надала нам свої дані без згоди батьків або опікунів, зверніться до нас — ми видалимо такі дані.
- **H2:** 12. Зміни до політики
- Ми можемо періодично оновлювати цю Політику. Про суттєві зміни ми повідомимо шляхом:
- Список:
  - Публікації оновленої версії на сайті із зазначенням нової дати редакції
  - Повідомлення через Telegram-бот (для користувачів, які з ним взаємодіяли)
- Продовження користування Сервісами після набрання змінами чинності означає вашу згоду з оновленою Політикою. Радимо періодично переглядати цю сторінку.
- **H2:** 13. Контакти
- З усіх питань щодо обробки персональних даних та реалізації ваших прав звертайтесь до нас:
- **H3:** Infinite Union
- _[contact-row]_ Email · supportinfiniteunion@gmail.com
- _[contact-row]_ Telegram · @infiniteunion_manager / WhatsApp / +380688286969
- _[contact-row]_ Бот · @infiniteunion_bot
- _[contact-row]_ Час відповіді · До 30 днів

#### Внутрішні посилання з контенту (13)

- «Загальні положення» → `/services/privacy/#s1` · блок 1
- «Які дані ми отримуємо» → `/services/privacy/#s2` · блок 1
- «Правові підстави обробки» → `/services/privacy/#s3` · блок 1
- «Як ми використовуємо дані» → `/services/privacy/#s4` · блок 1
- «Зберігання та захист даних» → `/services/privacy/#s5` · блок 1
- «Передача даних та обробники» → `/services/privacy/#s6` · блок 1
- «Міжнародна передача даних» → `/services/privacy/#s7` · блок 1
- «Файли cookie та аналітика» → `/services/privacy/#s8` · блок 1
- «Telegram-бот» → `/services/privacy/#s9` · блок 1
- «Ваші права» → `/services/privacy/#s10` · блок 1
- «Діти та неповнолітні» → `/services/privacy/#s11` · блок 1
- «Зміни до політики» → `/services/privacy/#s12` · блок 1
- «Контакти» → `/services/privacy/#s13` · блок 1

Зовнішні / контактні: «Політикою конфіденційності Telegram» → `https://telegram.org/privacy`, «@infiniteunion_manager» → `https://t.me/infiniteunion_manager`, «WhatsApp» → `https://wa.me/380688286969`, «+380688286969» → `tel:+380688286969`, «supportinfiniteunion@gmail.com» → `mailto:supportinfiniteunion@gmail.com`, «@infiniteunion_bot» → `https://t.me/infiniteunion_bot`

---

## 7.10 Шаблон: 404

### /404.html — 404

| Поле | Значення |
|---|---|
| URL | https://infiniteunion.com.ua/404.html |
| Мова | uk |
| Пара | — (немає) |
| Шаблон | **404** |
| Robots | noindex, follow |
| Title (43) | 404 — Сторінку не знайдено \| Infinite Union |
| Description (114) | Сторінку не знайдено. Перейдіть на головну Infinite Union або оберіть послугу: сайти, Telegram-боти, реклама, SEO. |
| Головний ключ |  |
| H1 | Схоже, ця сторінка кудись пішла. |
| Слів | 38 |
| JSON | `design-content/404.html.json` |

**Хлібні крихти:** — (не показуються)

#### Блоки (1)

**1. content** — Схоже, ця сторінка кудись пішла. · `<body>`

- Посилання/кнопка: «INFINITE UNION» → `/`
- _[status]_ СТОРІНКУ НЕ ЗНАЙДЕНО
- _[декор, aria-hidden]_ 404
- **H1:** Схоже, ця сторінка кудись пішла.
- Можливо посилання застаріло або сторінку було переміщено. Поверніться на головну або оберіть послугу.
- Посилання/кнопка: «← НА ГОЛОВНУ» → `/`
- Посилання/кнопка: «ЗВ'ЯЗАТИСЬ З НАМИ» → `/#contact`
- Посилання/кнопка: «Сайти» → `/services/websites/`
- Посилання/кнопка: «Боти» → `/services/bots/`
- Посилання/кнопка: «SEO» → `/services/seo/`
- Посилання/кнопка: «Реклама» → `/services/google-ads/`
- Посилання/кнопка: «Ціни» → `/pricing/`
- Посилання/кнопка: «English» → `/en/`
- _[geo]_ ХАРКІВ · УКРАЇНА · ЄВРОПА

#### Внутрішні посилання з контенту (9)

- «INFINITE UNION» → `/` · блок 1
- «← НА ГОЛОВНУ» → `/` · блок 1
- «ЗВ'ЯЗАТИСЬ З НАМИ» → `/#contact` · блок 1
- «Сайти» → `/services/websites/` · блок 1
- «Боти» → `/services/bots/` · блок 1
- «SEO» → `/services/seo/` · блок 1
- «Реклама» → `/services/google-ads/` · блок 1
- «Ціни» → `/pricing/` · блок 1
- «English» → `/en/` · блок 1

---

## 8. Перевірка повноти

- Сторінок у `scripts/pages.json`: **41**; зібрано: **42** (+ 404.html).
- Пропущених сторінок із реєстру: **0**.
- HTML-файлів у репо поза брифом: **0**.
- JSON-файлів у `design-content/`: **42** + `_site.json`.
- Сторінок без H1: 0. Сторінок із <2 блоками: /services/privacy/, /404.html.
- Пари UA↔EN: 11. UA без EN-пари: 20.
- FAQ: 189 питань на 30 сторінках. Тарифних карток: 54.
- Слів усього: **37 238** (UA 25 509, EN 11 729).

| Сторінка | Шаблон | Мова | Блоків | FAQ | Тарифів | Слів |
|---|---|---|---|---|---|---|
| `/` | home | uk | 15 | 0 | 0 | 1161 |
| `/services/websites/` | service | uk | 9 | 7 | 3 | 1102 |
| `/services/websites-landing/` | cluster | uk | 10 | 7 | 3 | 859 |
| `/services/websites-shop/` | cluster | uk | 12 | 7 | 3 | 910 |
| `/services/websites-corporate/` | cluster | uk | 11 | 6 | 3 | 827 |
| `/services/websites-kharkiv/` | cluster | uk | 10 | 6 | 3 | 885 |
| `/pricing/` | pricing | uk | 9 | 8 | 0 | 1132 |
| `/services/bots/` | service | uk | 10 | 6 | 3 | 992 |
| `/services/bots-sales/` | cluster | uk | 12 | 6 | 3 | 905 |
| `/services/bots-restaurant/` | cluster | uk | 11 | 6 | 3 | 804 |
| `/services/bots-crm/` | cluster | uk | 11 | 6 | 3 | 790 |
| `/services/platforms/` | service | uk | 10 | 6 | 3 | 863 |
| `/services/ecosystems/` | service | uk | 9 | 6 | 0 | 895 |
| `/services/google-ads/` | service | uk | 11 | 6 | 0 | 900 |
| `/services/google-ads-search/` | cluster | uk | 10 | 6 | 3 | 800 |
| `/services/meta-ads/` | service | uk | 11 | 6 | 0 | 851 |
| `/services/meta-ads-instagram/` | cluster | uk | 10 | 6 | 3 | 721 |
| `/services/tiktok-ads/` | service | uk | 10 | 6 | 0 | 799 |
| `/services/seo/` | service | uk | 11 | 6 | 0 | 797 |
| `/services/seo-audit/` | cluster | uk | 10 | 6 | 3 | 749 |
| `/services/seo-local/` | cluster | uk | 10 | 6 | 3 | 710 |
| `/services/constructor/` | constructor | uk | 3 | 6 | 0 | 625 |
| `/portfolio/` | portfolio | uk | 4 | 0 | 0 | 619 |
| `/blog/` | blog-list | uk | 4 | 0 | 0 | 262 |
| `/blog/skilky-koshtuye-sayt-2026/` | blog-post | uk | 11 | 0 | 0 | 1169 |
| `/blog/zamovyty-sayt-kharkiv/` | blog-post | uk | 8 | 0 | 0 | 815 |
| `/blog/telegram-bot-dlya-biznesu/` | blog-post | uk | 9 | 0 | 0 | 696 |
| `/blog/seo-audit-shcho-tse/` | blog-post | uk | 8 | 0 | 0 | 659 |
| `/blog/google-ads-chy-seo/` | blog-post | uk | 9 | 0 | 0 | 761 |
| `/services/privacy/` | privacy | uk | 1 | 0 | 0 | 1413 |
| `/en/` | home | en | 11 | 0 | 0 | 955 |
| `/en/services/websites/` | service | en | 9 | 6 | 6 | 1169 |
| `/en/pricing/` | pricing | en | 10 | 7 | 0 | 1331 |
| `/en/services/bots/` | service | en | 10 | 6 | 3 | 1277 |
| `/en/services/platforms/` | service | en | 10 | 6 | 3 | 977 |
| `/en/services/ecosystems/` | service | en | 9 | 6 | 0 | 1039 |
| `/en/services/google-ads/` | service | en | 10 | 7 | 0 | 1133 |
| `/en/services/meta-ads/` | service | en | 10 | 7 | 0 | 1008 |
| `/en/services/tiktok-ads/` | service | en | 10 | 6 | 0 | 942 |
| `/en/services/seo/` | service | en | 10 | 7 | 0 | 1143 |
| `/en/portfolio/` | portfolio | en | 4 | 0 | 0 | 755 |
| `/404.html` | 404 | uk | 1 | 0 | 0 | 38 |
