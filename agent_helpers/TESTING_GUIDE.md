# 🧪 Guia de Testes - Interactive Stories

**Última Atualização**: 31 de janeiro de 2026  
**Loaders Implementados**: 13/13 (100%)  
**Interactive Stories**: 25 implementadas

---

## 📚 Índice

1. [Como Testar](#como-testar)
2. [Bootstrap JS Loaders (6)](#bootstrap-js-loaders)
3. [Vendor Libraries Loaders (7)](#vendor-libraries-loaders)
4. [Checklist de Validação](#checklist-de-validação)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Como Testar

### Pré-requisitos
```bash
# Iniciar Storybook
npm run storybook

# Acesse: http://localhost:6006
```

### Navegação no Storybook
1. Menu lateral: expanda categorias (Atoms, Molecules, Organisms, Templates)
2. Encontre o componente desejado
3. Selecione a story "Interactive" ou "InteractiveBootstrap"
4. Console do navegador (F12) mostrará logs de carregamento

---

## 🔌 Bootstrap JS Loaders

### 1. Dropdown (molecules/navigation)

**Caminho**: `Molecules > Navigation > Dropdown > Interactive`

**O que testar**:
- ✅ Clicar em cada botão dropdown abre o menu
- ✅ Clicar fora fecha o menu
- ✅ Clicar em item dentro do menu executa ação
- ✅ Split button funciona separadamente
- ✅ Right aligned mostra menu à direita
- ✅ Active/Disabled estados corretos

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Dropdown: 6 instâncias inicializadas
```

---

### 2. Tooltip (molecules/overlays)

**Caminho**: `Molecules > Overlays > Tooltip > Interactive`

**O que testar**:
- ✅ Hover em botões mostra tooltip na posição correta (top, right, bottom, left)
- ✅ HTML content renderiza corretamente (bold, cores)
- ✅ Trigger "click" requer clique, "focus" requer foco
- ✅ Tooltip desaparece ao sair do elemento

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Tooltip: 8 instâncias inicializadas
```

---

### 3. Popover (molecules/overlays)

**Caminho**: `Molecules > Overlays > Popover > Interactive`

**O que testar**:
- ✅ Click em botões mostra popover com título + conteúdo
- ✅ 4 placements funcionam (top, right, bottom, left)
- ✅ Rich content renderiza (listas, botões, badges)
- ✅ Dismissible popover fecha ao clicar fora
- ✅ HTML content com ícones e cores funciona

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Popover: 6 instâncias inicializadas
```

---

### 4. Modal (organisms/feedback)

**Caminho**: `Organisms > Feedback > Modal > InteractiveBootstrap`

**O que testar**:
- ✅ Botões abrem modais de tamanhos diferentes (sm, default, lg, xl, fullscreen)
- ✅ ESC key fecha modal
- ✅ Clicar no backdrop fecha modal (se enabled)
- ✅ Scrollable long content funciona
- ✅ Vertically centered modal aparece no centro
- ✅ Botões Save/Close dentro do modal funcionam

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Modal: 6 instâncias Bootstrap inicializadas
```

---

### 5. Offcanvas (organisms/navigation)

**Caminho**: `Organisms > Navigation > Offcanvas > Interactive`

**O que testar**:
- ✅ Botões abrem offcanvas nas 4 direções (start, end, top, bottom)
- ✅ ESC key fecha offcanvas (quando keyboard=true)
- ✅ Backdrop modes: true (fecha ao clicar), false (sem backdrop), static (não fecha)
- ✅ Close button (X) fecha offcanvas
- ✅ Links dentro do offcanvas funcionam

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Offcanvas: 7 instâncias inicializadas
```

---

### 6. Accordion (organisms/content)

**Caminho**: `Organisms > Content > Accordion > Interactive`

**O que testar**:
- ✅ Clicar no header expande/colapsa item
- ✅ Default mode: apenas 1 item aberto por vez
- ✅ Always open mode: múltiplos itens abertos simultaneamente
- ✅ Flush style: sem bordas externas
- ✅ Ícones de expand/collapse mudam corretamente

**Console esperado**:
```
✅ Bootstrap JS carregado globalmente
✅ Accordion: 3 instâncias inicializadas
```

---

## 📦 Vendor Libraries Loaders

### 7. Flatpickr (molecules/forms/Datepicker)

**Caminho**: `Molecules > Forms > Datepicker > Interactive`

**O que testar**:
- ✅ Basic: clicar abre calendário, selecionar data preenche input
- ✅ Range: selecionar 2 datas (check-in/check-out)
- ✅ Time: seletor de horário (HH:mm)
- ✅ DateTime: calendário + horário juntos
- ✅ Inline: calendário sempre visível
- ✅ Min/Max: datas fora do range desabilitadas
- ✅ No Weekends: sábados/domingos desabilitados
- ✅ Hotel form: check-out minDate atualiza baseado em check-in

**Console esperado**:
```
✅ Flatpickr CSS + JS carregados
✅ Flatpickr: 7 instâncias com locale pt-BR
```

**Locale pt-BR**:
- Meses em português (Janeiro, Fevereiro...)
- Dias da semana em português (Dom, Seg...)
- Formato DD/MM/YYYY

---

### 8. FullCalendar (organisms/productivity)

**Caminho**: `Organisms > Productivity > Calendar > Interactive`

**O que testar**:
- ✅ Botões de view mudam visualização (month, week, day, list)
- ✅ Arrastar evento muda data (drag & drop)
- ✅ Redimensionar evento ajusta duração
- ✅ Clicar em evento abre modal com detalhes
- ✅ Delete button no modal remove evento
- ✅ Clicar em data vazia cria novo evento (prompt)
- ✅ Categorias com cores corretas (Reunião=roxo, Cliente=verde, etc)
- ✅ Today button volta para data atual

**Console esperado**:
```
✅ FullCalendar CSS + JS carregados
✅ FullCalendar inicializado com 7 eventos
```

**Locale pt-BR**:
- Botões em português (Hoje, Mês, Semana, Dia)
- Nomes de meses e dias em português

---

### 9. Select2 (atoms/forms/Select)

**Caminho**: `Atoms > Forms > Select > InteractiveSelect2`

**O que testar**:
- ✅ Basic: digitar no campo pesquisa países
- ✅ Multi-select: selecionar múltiplas categorias, badges aparecem
- ✅ Tags: digitar e pressionar Enter cria tag customizada
- ✅ Optgroups: cidades agrupadas por região
- ✅ Disabled: opções "Basic" e "Enterprise" não selecionáveis
- ✅ Custom templates: ícones de marcas aparecem ao lado das opções
- ✅ Ajax: digitar nome busca usuários (500ms delay), mostra email

**Console esperado**:
```
✅ jQuery carregado globalmente
✅ Select2 CSS + JS carregados
✅ Select2: 7 instâncias inicializadas
```

**Dependências**:
- jQuery (carregado primeiro automaticamente)

---

### 10. Quill (organisms/forms/WysiwygEditor)

**Caminho**: `Organisms > Forms > WysiwygEditor > Interactive`

**O que testar**:
- ✅ Full toolbar: todos os botões de formatação funcionam (bold, italic, headers, lists, align, links, images, colors, blockquote, code-block)
- ✅ Essential: apenas bold, italic, underline, lists, links, clean
- ✅ Bubble: toolbar aparece ao selecionar texto
- ✅ Character/word counter atualiza em tempo real
- ✅ "Ver HTML" button abre modal com código HTML
- ✅ "Copiar" button copia HTML para clipboard

**Console esperado**:
```
✅ Quill CSS + JS carregados
✅ Quill: 3 editores inicializados (full, essential, bubble)
```

**Testes avançados**:
- Inserir imagem via URL
- Criar link (selecionar texto, clicar link button)
- Usar color picker para mudar cor de texto/fundo
- Blockquote e code-block

---

### 11. ApexCharts (organisms/charts/LineChart)

**Caminho**: `Organisms > Charts > LineChart > Interactive`

**O que testar**:
- ✅ Line chart: 2 séries (2024 vs 2025), zoom com mouse, pan arrastando, reset zoom
- ✅ Bar chart: barras com valores no topo, hover mostra tooltip
- ✅ Pie chart: 5 fatias com legenda, clicar na legenda esconde/mostra fatia
- ✅ Donut chart: centro mostra total (1890), hover atualiza centro com valor
- ✅ Area chart: gradiente de cor, 2 séries (Visitantes, Pageviews)
- ✅ Mixed chart: coluna + linha juntos, 2 eixos Y, tooltip formata R$ e %

**Console esperado**:
```
✅ ApexCharts JS carregado
✅ ApexCharts: 6 charts renderizados
```

**Toolbar**:
- Zoom in/out
- Pan (arrastar)
- Download (PNG, SVG, CSV)
- Reset

**Cores Vuexy**:
- Primary: #696cff (roxo)
- Success: #71dd37 (verde)
- Warning: #ffab00 (amarelo)
- Danger: #ff3e1d (vermelho)
- Secondary: #8592a3 (cinza)

---

### 12. DataTables (organisms/data-display)

**Caminho**: `Organisms > Data Display > DataTable > Interactive`

**O que testar**:
- ✅ Main table:
  - Digitar no search busca em todas as colunas
  - Clicar em header de coluna ordena (asc/desc)
  - Pagination: mudar entre 10/25/50 por página
  - "Exibir X por página" em português
  - "Mostrando 1 a 10 de 50 registros" correto
  
- ✅ Column search table:
  - Digitar em cada input filtra apenas aquela coluna
  - Combinação de filtros funciona (nome + departamento)
  - Badges de status com cores: Ativo=verde, Inativo=vermelho, Férias=amarelo

**Console esperado**:
```
✅ jQuery carregado globalmente
✅ DataTables CSS + JS carregados
✅ DataTables: 2 tabelas inicializadas com 50 registros
```

**Locale pt-BR**:
- "Buscar" (não "Search")
- "Exibir X por página" (não "Show X entries")
- "Mostrando X a Y de Z registros"
- "Nenhum registro encontrado"

---

### 13. BS Stepper (molecules/navigation)

**Caminho**: `Molecules > Navigation > Stepper > Interactive`

**O que testar**:
- ✅ Linear mode:
  - Tentar clicar na etapa 3 (não funciona - precisa seguir ordem)
  - Preencher etapa 1, clicar "Próximo"
  - Tentar clicar "Próximo" sem preencher (alerta aparece)
  - Clicar "Voltar" retorna etapa anterior
  - Completar 3 etapas, clicar "Finalizar" (alert com resumo)
  - Ícones user/home/check nas etapas
  - States: ativo=azul, completo=verde, pendente=cinza
  
- ✅ Non-linear mode:
  - Clicar direto na etapa 3 (funciona!)
  - Navegar livremente entre etapas
  - Planos com cards (Free, Pro, Enterprise)

**Console esperado**:
```
✅ BS Stepper CSS + JS carregados
✅ BS Stepper: 2 instâncias inicializadas
```

**Validação**:
- Campos obrigatórios na etapa 1: Nome, Email
- Campos obrigatórios na etapa 2: Endereço, Cidade

---

## ✅ Checklist de Validação

Use este checklist para validar cada loader sistematicamente:

### Para cada Interactive story:

- [ ] **Console Logs**
  - [ ] CSS carregado (se aplicável)
  - [ ] JS carregado
  - [ ] Instâncias inicializadas com contagem correta
  - [ ] Nenhum erro no console (F12)

- [ ] **Funcionalidade Básica**
  - [ ] Interações principais funcionam (click, hover, etc)
  - [ ] Visual feedback correto (hover states, active states)
  - [ ] Transições e animações suaves

- [ ] **Edge Cases**
  - [ ] Testar múltiplas instâncias na mesma página
  - [ ] Testar interação rápida (spam clicks)
  - [ ] Testar com DevTools aberto (performance)

- [ ] **Acessibilidade**
  - [ ] Keyboard navigation funciona onde aplicável
  - [ ] ESC key fecha overlays (modals, dropdowns, etc)
  - [ ] Focus states visíveis

- [ ] **Responsividade**
  - [ ] Redimensionar janela (testar mobile widths)
  - [ ] Comportamento em viewports pequenos

- [ ] **Locale pt-BR** (onde aplicável)
  - [ ] Meses/dias em português
  - [ ] Formato DD/MM/YYYY
  - [ ] Textos de UI traduzidos

---

## 🔧 Troubleshooting

### Problema: Console mostra "already loaded"

**Causa**: Library já foi carregada por outra story.  
**Solução**: Normal! O loader tem singleton check. Library não será recarregada.

---

### Problema: Loader não inicializa (sem logs)

**Passos**:
1. Verificar se arquivos existem em `/vuexy/vendors/libs/[library]`
2. Abrir Network tab (F12) e verificar se arquivos carregaram (status 200)
3. Verificar Console por erros de JavaScript
4. Recarregar página (Ctrl+R) e tentar novamente

---

### Problema: Bootstrap JS conflito

**Causa**: Bootstrap JS já carregado por múltiplas stories.  
**Solução**: Normal! Bootstrap JS é singleton. Primeira story carrega, demais reutilizam.

---

### Problema: jQuery não encontrado (Select2 ou DataTables)

**Causa**: jQuery não foi carregado antes da library.  
**Solução**: Loaders já tratam isso! jQuery carregado automaticamente antes de Select2/DataTables.

---

### Problema: Locale pt-BR não funciona

**Verificar**:
1. Flatpickr: `locale: Portuguese` configurado?
2. FullCalendar: `locale: 'pt-br'` e `buttonText` traduzidos?
3. DataTables: objeto `language` com todas as strings?

---

### Problema: Storybook não inicia

**Passos**:
```bash
# Matar processos Node
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Limpar cache
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Reinstalar dependências
npm install

# Iniciar novamente
npm run storybook
```

---

## 📊 Cobertura de Testes

### Status Atual: 25/25 Interactive Stories (100%)

**Bootstrap JS (6)**:
- [x] Dropdown
- [x] Tooltip
- [x] Popover
- [x] Modal
- [x] Offcanvas
- [x] Accordion

**Vendor Libraries (7)**:
- [x] Flatpickr (Datepicker)
- [x] FullCalendar (Calendar)
- [x] Select2 (Select Advanced)
- [x] Quill (WYSIWYG)
- [x] ApexCharts (Charts)
- [x] DataTables
- [x] BS Stepper

**Outras Interactive Stories (12)**:
- [x] Button (atoms)
- [x] Input (atoms)
- [x] Checkbox (atoms)
- [x] Alert (molecules)
- [x] Toast (molecules)
- [x] Modal (organisms - versão custom)
- [x] Tabs (organisms)
- [x] Sidebar (organisms)
- [x] Pagination (organisms)
- [x] FormValidation (organisms)
- [x] Navbar (organisms)
- [x] KanbanBoard (organisms)

---

## 🎯 Próximos Passos

1. **Testes Manuais**: Use este guia para testar todos os 25 Interactive stories
2. **Documentar Issues**: Anotar qualquer bug ou comportamento inesperado
3. **Performance**: Medir tempo de carregamento de loaders
4. **Automated Tests**: Considerar Playwright ou Cypress para testes E2E
5. **Accessibility Audit**: Usar ferramentas como axe DevTools

---

**Dúvidas?** Consulte a documentação oficial:
- Bootstrap: https://getbootstrap.com/docs/5.3/
- Flatpickr: https://flatpickr.js.org/
- FullCalendar: https://fullcalendar.io/docs
- Select2: https://select2.org/
- Quill: https://quilljs.com/docs/
- ApexCharts: https://apexcharts.com/docs/
- DataTables: https://datatables.net/manual/
- BS Stepper: https://github.com/Johann-S/bs-stepper
