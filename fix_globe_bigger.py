with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Глобус більший — 60vh
html = html.replace(
    'width:44vh !important;height:44vh !important;',
    'width:62vh !important;height:62vh !important;'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ Глобус збільшено до 62vh")
