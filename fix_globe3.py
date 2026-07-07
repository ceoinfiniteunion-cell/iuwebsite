with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Переставити gs-globe-cell першим в DOM — grid сам розмістить по grid-column/row
old_order = '''      <div class="gs-globe-cell"><canvas id="gs-globe"></canvas></div>
      <div class="gs-card" id="gs-card-0">'''
new_order = '''      <div class="gs-card" id="gs-card-0">'''
html = html.replace(old_order, new_order)

# Вставити globe-cell після всіх карток — але з явним grid-area
old_end = '''      <div class="gs-card" id="gs-card-6"><div class="gs-num">02</div>'''
new_end = '''      <div class="gs-globe-cell"><canvas id="gs-globe"></canvas></div>
      <div class="gs-card" id="gs-card-6"><div class="gs-num">02</div>'''
html = html.replace(old_end, new_end)

# Помилка JS — PROJECTS має тільки 8 елементів але idx може бути -1
old_proj_err = '''    if(idx>=0 && idx!==currentCard){ targetPhi = PROJECTS[idx].phi; currentCard = idx; }'''
new_proj_err = '''    if(idx>=0 && idx!==currentCard && PROJECTS[idx]){ targetPhi = PROJECTS[idx].phi; currentCard = idx; }'''
html = html.replace(old_proj_err, new_proj_err)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Globe cell переміщено, JS fix")
