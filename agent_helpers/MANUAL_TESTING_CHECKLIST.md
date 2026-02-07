# 📋 Checklist - Testes Manuais Interativos

**Objetivo**: Validar 25 componentes interativos que requerem validação humana  
**Acesso**: http://localhost:6006  
**Data**: 2025-01-XX

---

## 🎯 Instruções de Teste

Para cada componente, verifique:
1. ✅ **Renderização**: Componente aparece corretamente
2. ✅ **Interatividade**: Cliques/hover funcionam
3. ✅ **Estados**: Transições visuais corretas
4. ✅ **Responsividade**: Layout adapta em diferentes viewports
5. ✅ **Assets**: Imagens/ícones carregam corretamente

Anote bugs encontrados no final de cada seção.

---

## 1. Bootstrap JS Components (6 componentes)

### Modal
**Path**: `Molecules/Overlays/Modal`

- [ ] **Default Modal**
  - [ ] Clique no botão abre modal
  - [ ] Overlay (backdrop) aparece
  - [ ] ESC fecha modal
  - [ ] Clique fora fecha modal
  - [ ] Animação de fade funciona

- [ ] **All Variants**
  - [ ] Default, Vertically Centered, Scrollable
  - [ ] Static Backdrop funciona
  - [ ] Tamanhos (sm, lg, xl, fullscreen)

- [ ] **Interactive Story**
  - [ ] Botões Primary, Secondary, Success abrem modais
  - [ ] Cada modal tem backdrop correto

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Dropdown
**Path**: `Atoms/Navigation/Dropdown`

- [ ] **Default Dropdown**
  - [ ] Clique no botão abre menu
  - [ ] Itens do menu visíveis
  - [ ] Clique em item fecha dropdown
  - [ ] Clique fora fecha dropdown

- [ ] **All Variants**
  - [ ] Directions (up, down, start, end)
  - [ ] Split Button funciona
  - [ ] Dividers aparecem
  - [ ] Disabled items não clicam

- [ ] **Interactive Story**
  - [ ] Múltiplos dropdowns independentes
  - [ ] Auto-close funciona

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Tooltip
**Path**: `Molecules/Overlays/Tooltip`

- [ ] **Default Tooltip**
  - [ ] Hover exibe tooltip
  - [ ] Posicionamento correto (top)
  - [ ] Tooltip some ao sair do hover

- [ ] **All Placements**
  - [ ] Top, Right, Bottom, Left funcionam
  - [ ] Tooltip não ultrapassa viewport
  - [ ] Animação suave

- [ ] **Interactive Story**
  - [ ] 8 tooltips diferentes aparecem
  - [ ] Não há sobreposição

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Popover
**Path**: `Molecules/Overlays/Popover`

- [ ] **Default Popover**
  - [ ] Clique exibe popover
  - [ ] Título e conteúdo visíveis
  - [ ] Seta de posicionamento aparece

- [ ] **All Placements**
  - [ ] Top, Right, Bottom, Left funcionam
  - [ ] Auto-posicionamento funciona
  - [ ] Dismiss on next click funciona

- [ ] **Interactive Story**
  - [ ] Popovers não conflitam entre si

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Offcanvas
**Path**: `Molecules/Overlays/Offcanvas`

- [ ] **Default Offcanvas**
  - [ ] Clique abre sidebar
  - [ ] Overlay aparece
  - [ ] Botão X fecha
  - [ ] ESC fecha
  - [ ] Clique fora fecha

- [ ] **All Variants**
  - [ ] Placements (start, end, top, bottom)
  - [ ] Backdrop funciona
  - [ ] Scroll behavior correto
  - [ ] Animação slide funciona

- [ ] **Interactive Story**
  - [ ] Múltiplos offcanvas independentes

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Accordion
**Path**: `Molecules/Data Display/Accordion`

- [ ] **Default Accordion**
  - [ ] Clique expande/colapsa itens
  - [ ] Somente 1 item aberto por vez
  - [ ] Animação smooth

- [ ] **All Variants**
  - [ ] Flush (sem bordas) funciona
  - [ ] Always open permite múltiplos
  - [ ] Ícones (+/-) mudam corretamente

- [ ] **Interactive Story**
  - [ ] Accordion aninhado funciona

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 2. Vendor Libraries (7 componentes)

### Flatpickr (Date Picker)
**Path**: `Molecules/Forms/Datepicker`

- [ ] **Default Datepicker**
  - [ ] Clique abre calendário
  - [ ] Seleção de data funciona
  - [ ] Input exibe data selecionada
  - [ ] Formato da data correto

- [ ] **All Variants**
  - [ ] Date Range funciona
  - [ ] Time Picker funciona
  - [ ] DateTime funciona
  - [ ] Inline calendar visível

- [ ] **Interactive Story**
  - [ ] Múltiplos pickers independentes
  - [ ] Locale (pt-BR) funciona

**Bugs encontrados**:
```
(anotar aqui)
```

---

### FullCalendar
**Path**: `Organisms/Productivity/Calendar`

- [ ] **Default Calendar**
  - [ ] Calendário renderiza
  - [ ] Navegação mês anterior/próximo funciona
  - [ ] Eventos aparecem nas datas corretas
  - [ ] Clique em evento abre detalhes

- [ ] **All Views**
  - [ ] Month view funciona
  - [ ] Week view funciona
  - [ ] Day view funciona
  - [ ] List view funciona

- [ ] **Interactive Story**
  - [ ] Drag & drop de eventos funciona
  - [ ] Resize de eventos funciona
  - [ ] Criação de novos eventos

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Select2 (Advanced Select)
**Path**: `Molecules/Forms/Select`

- [ ] **Default Select**
  - [ ] Clique abre dropdown
  - [ ] Seleção de opção funciona
  - [ ] Search/filter funciona
  - [ ] Placeholder visível

- [ ] **All Variants**
  - [ ] Multiple select funciona
  - [ ] Tagging (criação de tags) funciona
  - [ ] Ajax loading funciona
  - [ ] Grouped options aparecem

- [ ] **Interactive Story**
  - [ ] Múltiplos selects independentes

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Quill (Rich Text Editor)
**Path**: `Molecules/Forms/TextEditor`

- [ ] **Default Editor**
  - [ ] Editor renderiza com toolbar
  - [ ] Digitação funciona
  - [ ] Formatação (bold, italic, etc) funciona
  - [ ] Toolbar responsivo

- [ ] **All Variants**
  - [ ] Snow theme funciona
  - [ ] Bubble theme funciona
  - [ ] Full toolbar funciona
  - [ ] Minimal toolbar funciona

- [ ] **Interactive Story**
  - [ ] Inserção de links funciona
  - [ ] Inserção de imagens funciona
  - [ ] Listas (ordered/unordered) funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### ApexCharts (Charts Library)
**Path**: `Organisms/Charts/ApexChart`

- [ ] **Default Chart**
  - [ ] Gráfico renderiza
  - [ ] Animação de entrada funciona
  - [ ] Tooltips aparecem no hover
  - [ ] Legend funciona

- [ ] **All Variants**
  - [ ] Line chart funciona
  - [ ] Area chart funciona
  - [ ] Bar chart funciona
  - [ ] Pie chart funciona
  - [ ] Donut chart funciona

- [ ] **Interactive Story**
  - [ ] Zoom/pan funciona (se aplicável)
  - [ ] Click em série toggle visibilidade
  - [ ] Animações suaves

**Bugs encontrados**:
```
(anotar aqui)
```

---

### DataTables (Advanced Tables)
**Path**: `Organisms/Data Display/DataTable`

- [ ] **Default DataTable**
  - [ ] Tabela renderiza com dados
  - [ ] Paginação funciona
  - [ ] Search global funciona
  - [ ] Ordenação por coluna funciona

- [ ] **All Variants**
  - [ ] Responsive table funciona
  - [ ] Fixed columns funcionam
  - [ ] Fixed header funciona
  - [ ] Row grouping funciona

- [ ] **Interactive Story**
  - [ ] Export (CSV, Excel, PDF) funciona
  - [ ] Column visibility toggle funciona
  - [ ] Select rows funciona

**Bugs encontrados**:
```
(anotar aqui)
```

---

### BS Stepper (Multi-step Forms)
**Path**: `Molecules/Navigation/Stepper`

- [ ] **Default Stepper**
  - [ ] Steps visíveis
  - [ ] Next button avança step
  - [ ] Previous button volta step
  - [ ] Validação de step funciona

- [ ] **All Variants**
  - [ ] Horizontal stepper funciona
  - [ ] Vertical stepper funciona
  - [ ] Linear (sequencial) funciona
  - [ ] Non-linear (livre) funciona

- [ ] **Interactive Story**
  - [ ] Form validation entre steps
  - [ ] Step indicators atualizam
  - [ ] Conclusão exibe sucesso

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 3. Chart Components (4 componentes)

### BarChart
**Path**: `Educacross Components V2/Charts/BarChart`

- [ ] **Default Bar Chart**
  - [ ] Gráfico renderiza com Chart.js local
  - [ ] Barras visíveis
  - [ ] Hover exibe tooltip
  - [ ] Labels legíveis

- [ ] **All Variants**
  - [ ] Horizontal bars funcionam
  - [ ] Stacked bars funcionam
  - [ ] Grouped bars funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### DefaultChart
**Path**: `Educacross Components V2/Charts/DefaultChart`

- [ ] **Default Chart**
  - [ ] Gráfico renderiza (Chart.js local)
  - [ ] Tipo padrão (line/bar/pie) funciona
  - [ ] Interações (hover/click) funcionam

- [ ] **All Variants**
  - [ ] Todos os tipos suportados renderizam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### PieChart
**Path**: `Educacross Components V2/Charts/PieChart`

- [ ] **Default Pie Chart**
  - [ ] Gráfico renderiza (Chart.js local)
  - [ ] Fatias proporcionais aos valores
  - [ ] Hover exibe tooltip
  - [ ] Legend funciona

- [ ] **All Variants**
  - [ ] Donut chart funciona
  - [ ] Cores customizadas funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### RadialBar
**Path**: `Educacross Components V2/Charts/RadialBar`

- [ ] **Default Radial Bar**
  - [ ] Gráfico radial renderiza (Chart.js local)
  - [ ] Animação de preenchimento funciona
  - [ ] Valor central visível

- [ ] **All Variants**
  - [ ] Múltiplas barras radiais funcionam
  - [ ] Cores customizadas funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 4. Navigation Components (4 componentes)

### AppNavbar
**Path**: `Educacross Components V2/Navigation/AppNavbar`

- [ ] **Default Navbar**
  - [ ] Navbar renderiza
  - [ ] Logo carrega de /educacross-assets/
  - [ ] Links de navegação visíveis
  - [ ] Dropdowns funcionam (se existir)

- [ ] **All Variants**
  - [ ] Desktop navbar funciona
  - [ ] Mobile navbar (hamburger) funciona
  - [ ] User menu funciona

- [ ] **Interactive Story**
  - [ ] Clique em links navega (ou simula)
  - [ ] Active state correto

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Sidebar
**Path**: `Molecules/Navigation/Sidebar`

- [ ] **Default Sidebar**
  - [ ] Sidebar visível
  - [ ] Items clicáveis
  - [ ] Collapse/expand funciona
  - [ ] Sub-menus abrem/fecham

- [ ] **All Variants**
  - [ ] Fixed sidebar funciona
  - [ ] Collapsible sidebar funciona
  - [ ] Icons aparecem

- [ ] **Interactive Story**
  - [ ] Navegação multi-nível funciona
  - [ ] Active state atualiza

**Bugs encontrados**:
```
(anotar aqui)
```

---

### Tab
**Path**: `Molecules/Navigation/Tab`

- [ ] **Default Tab**
  - [ ] Tabs renderizam
  - [ ] Clique troca conteúdo
  - [ ] Active state visível
  - [ ] Animação de transição funciona

- [ ] **All Variants**
  - [ ] Tabs (horizontal) funcionam
  - [ ] Pills funcionam
  - [ ] Vertical tabs funcionam
  - [ ] Justified tabs funcionam

- [ ] **Interactive Story**
  - [ ] Múltiplos grupos de tabs independentes

**Bugs encontrados**:
```
(anotar aqui)
```

---

### TabRouter
**Path**: `Educacross Components V2/Navigation/TabRouter`

- [ ] **Default TabRouter**
  - [ ] Tabs renderizam
  - [ ] Clique navega (ou simula routing)
  - [ ] Active state baseado em rota
  - [ ] Transições funcionam

- [ ] **All Variants**
  - [ ] Diferentes estilos de tabs funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 5. Mascot Components (3 componentes)

### DeleteGuide
**Path**: `Educacross Components V2/Mascots/DeleteGuide`

- [ ] **Default DeleteGuide**
  - [ ] Componente renderiza
  - [ ] Imagem Belinha carrega de /educacross-assets/
  - [ ] Texto de guia visível
  - [ ] Botões de ação funcionam (se existir)

- [ ] **All Variants**
  - [ ] Diferentes estados/mensagens funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### CopyLink
**Path**: `Educacross Components V2/Actions/CopyLink`

- [ ] **Default CopyLink**
  - [ ] Componente renderiza
  - [ ] Imagem Belinha carrega de /educacross-assets/
  - [ ] Botão "Copiar" funciona
  - [ ] Feedback de sucesso aparece

- [ ] **All Variants**
  - [ ] Diferentes textos de link funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

### QuestionAlternative
**Path**: `Educacross Components V2/Forms/QuestionAlternative`

- [ ] **Default QuestionAlternative**
  - [ ] Alternativa renderiza
  - [ ] Imagem Belinha carrega (se aplicável)
  - [ ] Seleção/hover funciona
  - [ ] Estados (correta/incorreta) visíveis

- [ ] **All Variants**
  - [ ] Diferentes tipos de alternativas funcionam

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 6. Other Components (1 componente)

### FilterChip
**Path**: `Educacross Components V2/Forms/FilterChip`

- [ ] **Default FilterChip**
  - [ ] Chips renderizam
  - [ ] Clique seleciona/deseleciona
  - [ ] Active state visível
  - [ ] Múltiplos chips selecionáveis

- [ ] **All Variants**
  - [ ] Diferentes estilos (outline, filled) funcionam
  - [ ] Tamanhos (sm, md, lg) funcionam

- [ ] **Interactive Story**
  - [ ] Seleção de tópicos funciona
  - [ ] Deselect funciona

**Bugs encontrados**:
```
(anotar aqui)
```

---

## 📊 Resumo Final

**Total de componentes testados**: ___/25

**Por categoria**:
- Bootstrap JS (6): ___/6
- Vendor Libraries (7): ___/7
- Charts (4): ___/4
- Navigation (4): ___/4
- Mascots (3): ___/3
- Other (1): ___/1

**Bugs encontrados (total)**: ___

**Bugs críticos (P0)**: ___  
**Bugs importantes (P1)**: ___  
**Bugs menores (P2)**: ___

---

## 🚨 Issues Prioritários

### P0 - Crítico (bloqueia uso)
```
(listar aqui)
```

### P1 - Importante (afeta UX)
```
(listar aqui)
```

### P2 - Menor (melhorias)
```
(listar aqui)
```

---

## ✅ Próximos Passos

Após completar esta checklist:

1. **Corrigir bugs P0** imediatamente
2. **Documentar issues** no GitHub (se aplicável)
3. **Atualizar baselines** do Playwright (se houve fixes)
4. **Re-rodar testes automatizados** para validar fixes
5. **Criar relatório final** de testes

---

**Testador**: _________________  
**Data de conclusão**: _________________  
**Tempo total de teste**: _________________
