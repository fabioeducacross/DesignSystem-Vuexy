# Violações REAIS de Política Bootstrap JS (Atualizado)

**Data**: 2025-01-XX  
**Status**: Verificação manual executada

---

## ✅ DESCOBERTA: Maioria JÁ Corrigida!

Após verificação manual dos arquivos, **a maioria das violações listadas no audit anterior JÁ FORAM CORRIGIDAS** com onclick:

### ✅ JÁ CORRIGIDOS (False Positives no Audit)
1. **Alert** - onclick="this.parentElement.remove()" (linha 120) ✅
2. **Toast** - onclick fadeOut (linha 77) ✅
3. **Navbar** - onclick toggle dropdowns (linhas 103, 106, 108) ✅
4. **Tabs** - onclick switchTab (linhas 118-126) ✅
5. **Calendar** - data-bs-dismiss é dentro de Modal (PERMITIDO) ✅

---

## 🚨 VIOLAÇÕES REAIS CONFIRMADAS (2-3 arquivos)

### 1. **Carousel.stories.js** - Overview Story (CRÍTICO)
**Problema**: Story "Overview" usa data-bs-* mas createCarousel() está correto

**Violações** (linhas 137-370):
- `data-bs-ride="carousel"` (linhas 137, 167, 209, 234, 314)
- `data-bs-target="#carouselX"` (múltiplas linhas)
- `data-bs-slide="prev/next"` (linhas 154, 158, 196, 200, etc)
- `data-bs-slide-to="0/1/2"` (linhas 139-141, 169-171, 236-238)

**Solução**: Overview story deve usar createCarousel() que JÁ tem onclick implementado

**Exemplo correto** (do createCarousel, linha 84-86):
```javascript
const indicatorsHtml = indicators ? `<div class="carousel-indicators">
  <button type="button" onclick="const carousel = this.closest('.carousel'); ..." class="active"></button>
  ...
</div>` : '';
```

**Ação**: Remover data-bs-* de TODAS as sections no Overview (Default, Captions, Fade, Testimonials, Product)

---

### 2. **FAQ.stories.js** - Accordion Sections (MÉDIO)
**Problema**: Usa data-bs-toggle="collapse" em FAQs quando deveria usar onclick

**Violações** (linhas 150-300):
- `data-bs-toggle="collapse"` (linhas 156, 174, 196, 219, 236, 253, 276, 294)
- `data-bs-target="#faq-X"` (linhas 157, 175, 197, 220, 237, 254, 277, 295)
- `data-bs-parent="#faqAccordionX"` (linhas 161, 179, 201, 224, 241, 258, 281, 299)

**Solução**: Substituir por onclick + classes toggle
```javascript
onclick="const target = document.getElementById('faq-1'); 
        target.classList.toggle('show'); 
        this.classList.toggle('collapsed');"
```

**Ação**: Replace all data-bs-* nos accordions de FAQ com state controlado

---

### 3. **Charts (BarChart, LineChart, PieChart)** - NÃO CONFIRMADO
**Status**: Precisa verificação (audit mencionou dropdown data-bs-* mas não encontrado na busca)

---

## 📊 RESUMO FINAL

| Status | Quantidade | Componentes |
|--------|-----------|-------------|
| ✅ JÁ CORRETO | 5 | Alert, Toast, Navbar, Tabs, Calendar (Modal OK) |
| 🚨 VIOLAÇÃO REAL | 2 | **Carousel (Overview)**, **FAQ (Accordions)** |
| ❓ VERIFICAR | 3 | Charts (BarChart, LineChart, PieChart) |
| ✅ 6 PERMITIDOS | 6 | Dropdown, Tooltip, Popover, Modal, Offcanvas, Accordion |

**Meta**: Corrigir 2 arquivos confirmados + verificar 3 charts = **5 arquivos máximo**

---

## 🎯 AÇÃO IMEDIATA

**Prioridade 1** (CRÍTICO):
1. Carousel Overview - remover ~30 ocorrências de data-bs-* nas stories de demonstração

**Prioridade 2** (MÉDIO):
2. FAQ - substituir 20+ ocorrências de data-bs-* nos accordions

**Prioridade 3** (BAIXO):
3. Verificar Charts - buscar dropdowns com data-bs-* (se houver)

**Estimativa**: 30-40 substituições totais vs 200+ mencionadas no audit inicial

---

## ✅ 8 MISSING INTERACTIVE STORIES

Componentes SEM story Interactive (confirmado):
1. Typography (foundations)
2. HelpText (atoms/forms)
3. ChatInterface (organisms/apps)
4. EmailList (organisms/apps)
5. PricingTable (organisms/commerce)
6. Vuexy Button (vuexy/)
7. Vuexy Card (vuexy/)
8. Vuexy Input (vuexy/)
9. Vuexy Table (vuexy/)

**Ação**: Adicionar export const Interactive para cada um
