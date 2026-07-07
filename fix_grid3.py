with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Фікс grid позицій — card-2 не може бути на col3 (там глобус)
old_positions = '''/* grid positions: порядок появи 1-9 */
#gs-card-0{ grid-column:1; grid-row:1; } /* 1 */
#gs-card-7{ grid-column:5; grid-row:2; } /* 2 */
#gs-card-2{ grid-column:3; grid-row:2; } /* 3 — під глобусом, але глобус col3 row1/2, тому окремо */
#gs-card-3{ grid-column:1; grid-row:2; } /* 4 */
#gs-card-4{ grid-column:4; grid-row:1; } /* 5 */
#gs-card-5{ grid-column:2; grid-row:1; } /* 6 */
#gs-card-6{ grid-column:4; grid-row:2; } /* 7 */
#gs-card-1{ grid-column:2; grid-row:2; } /* 8 */
#gs-card-8{ grid-column:5; grid-row:1; } /* 9 */'''

new_positions = '''/* grid positions: порядок появи 1-8, глобус займає col3 row1+2 */
#gs-card-0{ grid-column:1; grid-row:1; } /* 1 — верх ліво */
#gs-card-5{ grid-column:2; grid-row:1; } /* 6 — верх ліво-центр */
#gs-card-4{ grid-column:4; grid-row:1; } /* 5 — верх право-центр */
#gs-card-7{ grid-column:5; grid-row:1; } /* 9 — верх право */
#gs-card-3{ grid-column:1; grid-row:2; } /* 4 — низ ліво */
#gs-card-1{ grid-column:2; grid-row:2; } /* 8 — низ ліво-центр */
#gs-card-2{ grid-column:4; grid-row:2; } /* 7 — низ право-центр */
#gs-card-6{ grid-column:5; grid-row:2; } /* 2 — низ право */'''

html = html.replace(old_positions, new_positions)

# Фікс .gs-globe-cell — grid-row має бути 1/3
old_cell = '''.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
}'''
new_cell = '''.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
  min-height:0;
}'''
html = html.replace(old_cell, new_cell)

# Фікс .gs-card — прибрати position:absolute якщо лишилось
import re
# active стан
if '.gs-card.active{opacity:1;pointer-events:auto;transform:scale(1);}' not in html:
    html = html.replace(
        '.gs-card{\n  background:linear-gradient',
        '.gs-card.active{opacity:1;pointer-events:auto;transform:scale(1);}\n.gs-card{\n  background:linear-gradient'
    )

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Grid позиції виправлено — 8 карток навколо глобуса col3")
