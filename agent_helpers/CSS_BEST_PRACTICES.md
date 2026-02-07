# 🎨 CSS Best Practices - DesignSystem Vuexy

## ⚠️ Problemas Comuns e Soluções

### 1. **NUNCA use CDN externo para recursos já disponíveis**

❌ **ERRADO:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
```

✅ **CORRETO:**
```javascript
// Já está carregado globalmente em .storybook/preview.js
// Apenas use as classes diretamente:
<i class="bi bi-heart"></i>
```

**Motivo:** 
- Tracking Prevention bloqueia CDNs externos
- Performance pior (requisição extra)
- Duplicação de recursos

---

### 2. **Assets devem estar em `/public/` com caminho absoluto**

❌ **ERRADO:**
```html
<img src="./images/qr-code.png" alt="QR Code" />
<img src="../assets/qr-code.png" alt="QR Code" />
```

✅ **CORRETO:**
```html
<img src="/qr-code.svg" alt="QR Code" />
<img src="/educacross-assets/belinha/belinha-school-copy_link.png" alt="Belinha" />
```

**Estrutura de diretórios:**
```
packages/vuexy_theme/public/
├── vuexy/                           → Servido em /vuexy/
│   ├── css/core.css                 → /vuexy/css/core.css
│   ├── fonts/bootstrap-icons.css    → /vuexy/fonts/bootstrap-icons.css
│   └── js/bootstrap.js              → /vuexy/js/bootstrap.js
├── educacross-assets/               → Servido em /educacross-assets/
│   └── belinha/                     → /educacross-assets/belinha/
│       └── *.png
└── qr-code.svg                      → /qr-code.svg
```

---

### 3. **CSS inline só para valores dinâmicos**

❌ **ERRADO (CSS estático inline):**
```html
<button style="padding: 10px 20px; background: #6E63E8; border: none; border-radius: 6px; color: #fff;">
  Botão
</button>
```

✅ **CORRETO (use classes Bootstrap/Vuexy):**
```html
<button class="btn btn-primary">Botão</button>
```

✅ **ACEITÁVEL (valores dinâmicos de argTypes):**
```javascript
render: (args) => `
  <div style="width: ${args.width}px; background: ${args.color};">
    Conteúdo dinâmico
  </div>
`
```

**Classes Bootstrap disponíveis:**
```html
<!-- Botões -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>

<!-- Spacing -->
<div class="p-4 m-3">padding: 1.5rem, margin: 1rem</div>
<div class="mt-2 mb-4">margin-top: 0.5rem, margin-bottom: 1.5rem</div>

<!-- Cores -->
<div class="bg-primary text-white">Fundo primário</div>
<div class="text-danger">Texto vermelho</div>

<!-- Layout -->
<div class="d-flex justify-content-between align-items-center">
  Flexbox
</div>
```

---

### 4. **Imagens devem ter alt text descritivo**

❌ **ERRADO:**
```html
<img src="/belinha.png" alt="" />
<img src="/icon.png" />
```

✅ **CORRETO:**
```html
<img src="/educacross-assets/belinha/belinha-school-copy_link.png" alt="Belinha - mascote compartilhando link" />
<img src="/qr-code.svg" alt="QR Code para compartilhamento" style="width: 200px; height: 200px;" />
```

---

### 5. **Recursos globais vão em `.storybook/preview.js`**

Se um CSS/JS é usado em **múltiplos stories** (3+), carregue globalmente:

```javascript
// .storybook/preview.js
if (typeof window !== 'undefined') {
  const cssFiles = [
    '/vuexy/css/core.css',                    // Vuexy base styles
    '/vuexy/fonts/bootstrap-icons.css',        // Bootstrap Icons
    // '/vuexy/vendors/libs/flatpickr/flatpickr.css' // Se usado em 3+ components
  ];

  cssFiles.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}
```

**Quando usar loaders locais:**
- Biblioteca usada em APENAS 1-2 components
- JavaScript que precisa inicializar (Flatpickr, Select2, etc.)

---

## 🔍 Checklist de Validação

Antes de commitar um story:

- [ ] Nenhum `https://cdn.jsdelivr.net` ou CDN externo
- [ ] Assets usam caminhos absolutos (`/vuexy/...` ou `/educacross-assets/...`)
- [ ] CSS inline só para valores dinâmicos de `args`
- [ ] Classes Bootstrap/Vuexy usadas sempre que possível
- [ ] Imagens têm `alt` text descritivo
- [ ] Nenhum `404` no console do navegador
- [ ] Nenhum erro de "Tracking Prevention blocked"

---

## 🚨 Como Detectar Violações

### PowerShell:
```powershell
# Detectar CDNs externos
Select-String -Path "src\stories\**\*.stories.js" -Pattern "https?://cdn\." | Select-Object Filename, LineNumber

# Detectar imagens sem alt
Select-String -Path "src\stories\**\*.stories.js" -Pattern '<img[^>]+(?<!alt=")>' -AllMatches

# CSS inline excessivo (>100 caracteres)
Select-String -Path "src\stories\**\*.stories.js" -Pattern 'style\s*=\s*["'\''][^"'\'']{100,}' | Select-Object Filename, LineNumber
```

### VS Code Find:
```regex
# CDNs externos
https?://cdn\.

# Imagens sem alt
<img[^>]+src=["'][^"']+["'][^>]*(?<!alt=["'][^"']*["'])>

# style inline longo
style\s*=\s*["'][^"']{100,}
```

---

## 📚 Recursos Adicionais

- **Bootstrap 5 Docs**: https://getbootstrap.com/docs/5.3/
- **Bootstrap Icons**: https://icons.getbootstrap.com/
- **Vuexy Template**: `packages/vuexy_theme/public/vuexy/`
- **Storybook Best Practices**: [agent_helpers/LOADER_PATTERNS.md](./LOADER_PATTERNS.md)

---

## 🛠️ Como Corrigir Violações Existentes

### 1. Remover CDNs de Bootstrap Icons:
```powershell
$files = Get-ChildItem "src\stories\**\*.stories.js"
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $content = $content -replace '<link rel="stylesheet" href="https://cdn\.jsdelivr\.net/npm/bootstrap-icons@[\d\.]+/font/bootstrap-icons\.css">\s*', ''
  $content | Out-File $file.FullName -Encoding utf8 -NoNewline
}
```

### 2. Substituir CSS inline por classes:
```javascript
// ANTES:
style="padding: 10px 20px; background: #6E63E8; color: #fff; border-radius: 6px;"

// DEPOIS:
class="btn btn-primary"
```

### 3. Adicionar alt text:
```html
<!-- ANTES -->
<img src="/icon.png" />

<!-- DEPOIS -->
<img src="/icon.png" alt="Descrição do ícone para acessibilidade" />
```

---

**Última atualização:** 06/02/2026  
**Responsável:** Pente-fino CSS após fix de mascotes
