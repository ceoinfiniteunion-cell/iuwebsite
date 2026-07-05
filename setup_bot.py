import os

files = {}

# ── .gitignore ────────────────────────────────────────────────
files[".gitignore"] = """.env
__pycache__/
*.pyc
*.pyo
.DS_Store
*.log
.venv/
venv/
"""

# ── requirements.txt ──────────────────────────────────────────
files["requirements.txt"] = """aiogram==3.15.0
asyncpg==0.30.0
redis[asyncio]==5.2.1
"""

# ── Procfile ──────────────────────────────────────────────────
files["Procfile"] = "worker: python -m bot.main\n"

# ── railway.toml ──────────────────────────────────────────────
files["railway.toml"] = """[build]
builder = "NIXPACKS"

[deploy]
startCommand = "python -m bot.main"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
"""

# ── bot/__init__.py ───────────────────────────────────────────
files["bot/__init__.py"] = ""

# ── bot/config.py ─────────────────────────────────────────────
files["bot/config.py"] = """import os

BOT_TOKEN  = os.environ["BOT_TOKEN"]
DB_URL     = os.environ["DATABASE_URL"]
REDIS_URL  = os.environ["REDIS_URL"]
ADMIN_IDS  = [int(x) for x in os.environ.get("ADMIN_IDS", "8589737416,1065496907,1106261803").split(",") if x]
"""

# ── bot/database.py ───────────────────────────────────────────
files["bot/database.py"] = """import asyncpg
from bot.config import DB_URL

pool = None

async def init_db():
    global pool
    pool = await asyncpg.create_pool(DB_URL)
    await pool.execute(\"\"\"
        CREATE TABLE IF NOT EXISTS leads (
            id          SERIAL PRIMARY KEY,
            user_id     BIGINT,
            username    TEXT,
            name        TEXT,
            service     TEXT,
            budget      TEXT,
            timeline    TEXT,
            contact     TEXT,
            status      TEXT DEFAULT 'new',
            created_at  TIMESTAMPTZ DEFAULT NOW()
        )
    \"\"\")

async def add_lead(user_id, username, name, service, budget, timeline, contact):
    return await pool.fetchval(
        \"\"\"INSERT INTO leads (user_id, username, name, service, budget, timeline, contact)
           VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id\"\"\",
        user_id, username, name, service, budget, timeline, contact
    )

async def get_leads(status: str):
    return await pool.fetch(
        "SELECT * FROM leads WHERE status=$1 ORDER BY created_at DESC LIMIT 30", status
    )

async def get_lead(lead_id: int):
    return await pool.fetchrow("SELECT * FROM leads WHERE id=$1", lead_id)

async def set_status(lead_id: int, status: str):
    await pool.execute("UPDATE leads SET status=$1 WHERE id=$2", status, lead_id)

async def get_stats():
    return await pool.fetchrow(\"\"\"
        SELECT
            COUNT(*)                                      AS total,
            COUNT(*) FILTER (WHERE status='new')          AS new,
            COUNT(*) FILTER (WHERE status='in_progress')  AS in_progress,
            COUNT(*) FILTER (WHERE status='closed')       AS closed
        FROM leads
    \"\"\")
"""

# ── bot/states/__init__.py ────────────────────────────────────
files["bot/states/__init__.py"] = ""

# ── bot/states/quiz.py ────────────────────────────────────────
files["bot/states/quiz.py"] = """from aiogram.fsm.state import State, StatesGroup

class Quiz(StatesGroup):
    service  = State()
    budget   = State()
    timeline = State()
    name     = State()
    contact  = State()
    confirm  = State()
"""

# ── bot/keyboards/__init__.py ─────────────────────────────────
files["bot/keyboards/__init__.py"] = ""

# ── bot/keyboards/client_kb.py ────────────────────────────────
files["bot/keyboards/client_kb.py"] = """from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton as Btn

def start_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text="🚀 Залишити заявку", callback_data="quiz:start")],
    ])

def service_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text="🌐 Сайт",                    callback_data="s:site")],
        [Btn(text="🤖 Telegram-бот",             callback_data="s:bot")],
        [Btn(text="⚡ Екосистема (сайт + бот)",  callback_data="s:ecosystem")],
        [Btn(text="💬 Інше",                     callback_data="s:other")],
    ])

def budget_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text="💵 до $500",         callback_data="b:lt500")],
        [Btn(text="💵 $500 – $1 000",   callback_data="b:500_1k")],
        [Btn(text="💵 $1 000 – $3 000", callback_data="b:1k_3k")],
        [Btn(text="💵 $3 000+",         callback_data="b:3kplus")],
    ])

def timeline_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text="🔥 Терміново (до тижня)", callback_data="t:urgent")],
        [Btn(text="📅 1–2 тижні",            callback_data="t:twoweeks")],
        [Btn(text="🗓 Не поспішаю",          callback_data="t:nohurry")],
    ])

def confirm_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text="✅ Підтвердити і надіслати", callback_data="c:yes")],
        [Btn(text="🔄 Почати знову",            callback_data="c:restart")],
    ])
"""

# ── bot/keyboards/admin_kb.py ─────────────────────────────────
files["bot/keyboards/admin_kb.py"] = """from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton as Btn

def admin_main_kb(counts: dict):
    return InlineKeyboardMarkup(inline_keyboard=[
        [Btn(text=f"🆕 Нові ({counts.get('new',0)})",          callback_data="al:new")],
        [Btn(text=f"🔄 В роботі ({counts.get('in_progress',0)})", callback_data="al:in_progress")],
        [Btn(text=f"✅ Закриті ({counts.get('closed',0)})",     callback_data="al:closed")],
        [Btn(text="📊 Статистика",                              callback_data="a:stats")],
    ])

def lead_kb(lead_id: int, status: str):
    rows = []
    if status != "in_progress":
        rows.append([Btn(text="🔄 В роботу", callback_data=f"ls:{lead_id}:in_progress")])
    if status != "closed":
        rows.append([Btn(text="✅ Закрити",  callback_data=f"ls:{lead_id}:closed")])
    if status != "new":
        rows.append([Btn(text="🆕 Новий",    callback_data=f"ls:{lead_id}:new")])
    rows.append([Btn(text="◀️ Назад",        callback_data="a:back")])
    return InlineKeyboardMarkup(inline_keyboard=rows)
"""

# ── bot/handlers/__init__.py ──────────────────────────────────
files["bot/handlers/__init__.py"] = ""

# ── bot/handlers/client.py ────────────────────────────────────
files["bot/handlers/client.py"] = """from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from bot.states.quiz import Quiz
from bot.keyboards.client_kb import start_kb, service_kb, budget_kb, timeline_kb, confirm_kb
from bot.config import ADMIN_IDS
from bot import database as db

router = Router()

SERVICE_LABELS = {
    "site": "🌐 Сайт", "bot": "🤖 Telegram-бот",
    "ecosystem": "⚡ Екосистема", "other": "💬 Інше",
}
BUDGET_LABELS = {
    "lt500": "до $500", "500_1k": "$500–$1 000",
    "1k_3k": "$1 000–$3 000", "3kplus": "$3 000+",
}
TIMELINE_LABELS = {
    "urgent": "🔥 Терміново", "twoweeks": "📅 1–2 тижні", "nohurry": "🗓 Не поспішаю",
}

@router.message(CommandStart())
async def cmd_start(msg: Message, state: FSMContext):
    await state.clear()
    await msg.answer(
        "👋 Привіт! Я бот <b>Infinite Union</b>\\n\\n"
        "Розробляємо сайти, Telegram-боти та цифрові екосистеми під ключ.\\n\\n"
        "Натисни кнопку нижче — я допоможу оформити заявку за 1 хвилину 🚀",
        parse_mode="HTML",
        reply_markup=start_kb()
    )

@router.callback_query(F.data == "quiz:start")
async def quiz_start(cb: CallbackQuery, state: FSMContext):
    await state.set_state(Quiz.service)
    await cb.message.edit_text("Що потрібно зробити? 👇", reply_markup=service_kb())

@router.callback_query(Quiz.service, F.data.startswith("s:"))
async def quiz_service(cb: CallbackQuery, state: FSMContext):
    val = cb.data.split(":")[1]
    await state.update_data(service=SERVICE_LABELS.get(val, val))
    await state.set_state(Quiz.budget)
    await cb.message.edit_text("Який бюджет на проект? 💵", reply_markup=budget_kb())

@router.callback_query(Quiz.budget, F.data.startswith("b:"))
async def quiz_budget(cb: CallbackQuery, state: FSMContext):
    val = cb.data.split(":")[1]
    await state.update_data(budget=BUDGET_LABELS.get(val, val))
    await state.set_state(Quiz.timeline)
    await cb.message.edit_text("Коли потрібно? ⏰", reply_markup=timeline_kb())

@router.callback_query(Quiz.timeline, F.data.startswith("t:"))
async def quiz_timeline(cb: CallbackQuery, state: FSMContext):
    val = cb.data.split(":")[1]
    await state.update_data(timeline=TIMELINE_LABELS.get(val, val))
    await state.set_state(Quiz.name)
    await cb.message.edit_text("Як тебе звати? ✍️\\n\\nНапиши ім'я або назву компанії:")

@router.message(Quiz.name)
async def quiz_name(msg: Message, state: FSMContext):
    await state.update_data(name=msg.text.strip())
    await state.set_state(Quiz.contact)
    await msg.answer("Як з тобою зв'язатись? 📞\\n\\nНапиши Telegram @username або номер телефону:")

@router.message(Quiz.contact)
async def quiz_contact(msg: Message, state: FSMContext):
    await state.update_data(contact=msg.text.strip())
    data = await state.get_data()
    await state.set_state(Quiz.confirm)
    await msg.answer(
        f"📋 <b>Перевір заявку:</b>\\n\\n"
        f"📦 Послуга: {data['service']}\\n"
        f"💵 Бюджет: {data['budget']}\\n"
        f"⏰ Терміни: {data['timeline']}\\n"
        f"👤 Ім'я: {data['name']}\\n"
        f"📞 Контакт: {data['contact']}",
        parse_mode="HTML",
        reply_markup=confirm_kb()
    )

@router.callback_query(Quiz.confirm, F.data == "c:yes")
async def quiz_confirm(cb: CallbackQuery, state: FSMContext, bot: Bot):
    data = await state.get_data()
    user = cb.from_user
    lead_id = await db.add_lead(
        user.id, user.username,
        data["name"], data["service"],
        data["budget"], data["timeline"], data["contact"]
    )
    await state.clear()
    await cb.message.edit_text(
        f"✅ <b>Заявку #{lead_id} надіслано!</b>\\n\\n"
        "Наша команда зв'яжеться з тобою протягом 15 хвилин 🚀",
        parse_mode="HTML"
    )
    notify = (
        f"🔔 <b>Нова заявка #{lead_id}</b>\\n\\n"
        f"👤 {data['name']} (@{user.username or '—'})\\n"
        f"📦 {data['service']}\\n"
        f"💵 {data['budget']}\\n"
        f"⏰ {data['timeline']}\\n"
        f"📞 {data['contact']}"
    )
    for admin_id in ADMIN_IDS:
        try:
            from bot.keyboards.admin_kb import lead_kb
            await bot.send_message(admin_id, notify, parse_mode="HTML", reply_markup=lead_kb(lead_id, "new"))
        except Exception:
            pass

@router.callback_query(Quiz.confirm, F.data == "c:restart")
async def quiz_restart(cb: CallbackQuery, state: FSMContext):
    await state.clear()
    await state.set_state(Quiz.service)
    await cb.message.edit_text("Що потрібно зробити? 👇", reply_markup=service_kb())
"""

# ── bot/handlers/admin.py ─────────────────────────────────────
files["bot/handlers/admin.py"] = """from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command

from bot.config import ADMIN_IDS
from bot.keyboards.admin_kb import admin_main_kb, lead_kb
from bot import database as db

router = Router()

def is_admin(user_id: int) -> bool:
    return user_id in ADMIN_IDS

STATUS_UA = {"new": "🆕 Нова", "in_progress": "🔄 В роботі", "closed": "✅ Закрита"}

@router.message(Command("admin"))
async def cmd_admin(msg: Message):
    if not is_admin(msg.from_user.id):
        return
    stats = await db.get_stats()
    counts = {
        "new": stats["new"],
        "in_progress": stats["in_progress"],
        "closed": stats["closed"],
    }
    await msg.answer(
        "🎛 <b>Адмін-панель Infinite Union</b>\\n\\nВибери розділ:",
        parse_mode="HTML",
        reply_markup=admin_main_kb(counts)
    )

@router.callback_query(F.data.startswith("al:"))
async def leads_list(cb: CallbackQuery):
    if not is_admin(cb.from_user.id):
        return
    status = cb.data.split(":")[1]
    leads = await db.get_leads(status)
    if not leads:
        await cb.answer("Немає заявок у цьому статусі", show_alert=True)
        return
    text = f"<b>{STATUS_UA.get(status, status)} заявки:</b>\\n\\n"
    for l in leads:
        text += (
            f"#{l['id']} | {l['name']} | {l['service']}\\n"
            f"📞 {l['contact']} | 💵 {l['budget']}\\n"
            f"🕐 {l['created_at'].strftime('%d.%m %H:%M')}\\n\\n"
        )
    await cb.message.edit_text(text, parse_mode="HTML", reply_markup=lead_kb(0, status))

@router.callback_query(F.data.startswith("ls:"))
async def lead_set_status(cb: CallbackQuery):
    if not is_admin(cb.from_user.id):
        return
    _, lead_id, new_status = cb.data.split(":")
    lead_id = int(lead_id)
    await db.set_status(lead_id, new_status)
    lead = await db.get_lead(lead_id)
    await cb.answer(f"Статус змінено → {STATUS_UA.get(new_status)}", show_alert=True)
    await cb.message.edit_reply_markup(reply_markup=lead_kb(lead_id, new_status))

@router.callback_query(F.data == "a:stats")
async def admin_stats(cb: CallbackQuery):
    if not is_admin(cb.from_user.id):
        return
    s = await db.get_stats()
    await cb.message.edit_text(
        f"📊 <b>Статистика</b>\\n\\n"
        f"Всього заявок: <b>{s['total']}</b>\\n"
        f"🆕 Нових: {s['new']}\\n"
        f"🔄 В роботі: {s['in_progress']}\\n"
        f"✅ Закрито: {s['closed']}",
        parse_mode="HTML",
        reply_markup=None
    )

@router.callback_query(F.data == "a:back")
async def admin_back(cb: CallbackQuery):
    if not is_admin(cb.from_user.id):
        return
    stats = await db.get_stats()
    counts = {"new": stats["new"], "in_progress": stats["in_progress"], "closed": stats["closed"]}
    await cb.message.edit_text(
        "🎛 <b>Адмін-панель Infinite Union</b>\\n\\nВибери розділ:",
        parse_mode="HTML",
        reply_markup=admin_main_kb(counts)
    )
"""

# ── bot/main.py ───────────────────────────────────────────────
files["bot/main.py"] = """import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.redis import RedisStorage

from bot.config import BOT_TOKEN, REDIS_URL
from bot.database import init_db
from bot.handlers.client import router as client_router
from bot.handlers.admin import router as admin_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

async def main():
    await init_db()
    bot = Bot(token=BOT_TOKEN)
    storage = RedisStorage.from_url(REDIS_URL)
    dp = Dispatcher(storage=storage)
    dp.include_router(admin_router)
    dp.include_router(client_router)
    logging.info("Bot started")
    await dp.start_polling(bot, allowed_updates=["message", "callback_query"])

if __name__ == "__main__":
    asyncio.run(main())
"""

# ─────────────────────────────────────────────────────────────
# Write all files
# ─────────────────────────────────────────────────────────────
for path, content in files.items():
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else ".", exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(f"✓ {path}")

print("\n✅ Project structure created!")
