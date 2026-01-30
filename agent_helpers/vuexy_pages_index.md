# Índice de Páginas e Recursos do Template Vuexy v10.9.0

> **Fonte**: Template integrado em `packages/vuexy_theme/public/vuexy/`  
> **Tipo**: ASP.NET Core/HTML/Laravel Admin Dashboard  
> **Repo Original**: https://github.com/fabioaap/Design_System_Vuexy

## 📋 Estrutura do Template Integrado

```
packages/vuexy_theme/public/vuexy/
├── css/
│   ├── core.css (829KB - CSS principal)
│   └── pages/ (26 arquivos CSS específicos)
├── js/ (6 arquivos core)
├── fonts/ (553 arquivos - Boxicons, FontAwesome, Flags)
└── vendors/ (164 bibliotecas third-party)
```

---

## 🎯 Inventário de Páginas por CSS Files

| # | Arquivo CSS | Tema/Funcionalidade | Categoria Inferida | Componentes Esperados | Prioridade |
|---|-------------|---------------------|--------------------|-----------------------|------------|
| 1 | **ui-carousel.css** | Carrosséis/Sliders | UI Components | Carousel (organism) | P1 |
| 2 | **cards-advance.css** | Cards avançados | UI Components | Card variations (molecule/organism) | P0 |
| 3 | **page-icons.css** | Biblioteca de ícones | Foundations | Icon display grid (page) | P1 |
| 4 | **page-auth.css** | Autenticação (Login/Register) | Templates | Auth forms, Social buttons (template) | P1 |
| 5 | **page-faq.css** | FAQ/Accordion | UI Components | Accordion (organism), FAQ layout (template) | P1 |
| 6 | **page-misc.css** | Páginas de erro (404, 500) | Templates | Error pages (template) | P2 |
| 7 | **page-pricing.css** | Tabelas de preços | Templates | Pricing cards (organism/template) | P1 |
| 8 | **page-profile.css** | Perfil de usuário | Templates | Profile header, tabs, connections (organism/template) | P1 |
| 9 | **page-user-view.css** | Visualização de usuário | Templates | User details, activity timeline (organism) | P1 |
| 10 | **app-academy.css** | Academia/Cursos | App Pages | Course cards, filters (organism) | P2 |
| 11 | **app-academy-details.css** | Detalhes do curso | App Pages | Course detail layout (template) | P2 |
| 12 | **app-calendar.css** | Calendário | App Pages | Calendar (organism), Event modal (molecule) | P1 |
| 13 | **app-chat.css** | Chat/Mensagens | App Pages | Chat interface (organism/template) | P1 |
| 14 | **app-email.css** | Email client | App Pages | Email list, compose (organism/template) | P2 |
| 15 | **app-ecommerce.css** | E-commerce | App Pages | Product cards, filters, cart (organism) | P2 |
| 16 | **app-invoice.css** | Faturas | App Pages | Invoice list, details (organism/template) | P2 |
| 17 | **app-invoice-print.css** | Impressão de fatura | App Pages | Print layout (template) | P2 |
| 18 | **app-kanban.css** | Kanban board | App Pages | Kanban columns, cards (organism) | P2 |
| 19 | **app-logistics-dashboard.css** | Dashboard logística | Dashboards | Charts, stats cards (organism) | P2 |
| 20 | **app-logistics-fleet.css** | Gestão de frota | App Pages | Fleet table, map (organism) | P2 |
| 21 | **front-page.css** | Landing page | Front Pages | Hero, features, footer (template) | P2 |
| 22 | **front-page-help-center.css** | Central de ajuda | Front Pages | Help search, articles (template) | P2 |
| 23 | **front-page-landing.css** | Landing específica | Front Pages | Landing sections (template) | P2 |
| 24 | **front-page-payment.css** | Página de pagamento | Front Pages | Payment form, cards (organism) | P2 |
| 25 | **front-page-pricing.css** | Preços (front) | Front Pages | Pricing table (organism) | P1 |
| 26 | **wizard-ex-checkout.css** | Wizard checkout | UI Components | Stepper, wizard steps (organism) | P1 |

---

## 🧩 Categorias de Componentes do Vuexy (Documentação Conhecida)

### **UI Components** (Prioritários)
- **Alerts** - Notificações inline (P0)
- **Badges** - Status indicators (P0)
- **Buttons** - Todas variações ✅ *já criado* (P0)
- **Cards** - Container básico + variações (P0)
- **Dropdowns** - Menus suspensos (P0)
- **Modals** - Diálogos/popups (P0)
- **Tabs** - Navegação por abas (P0)
- **Tooltips** - Dicas flutuantes (P1)
- **Popovers** - Popups informativos (P1)
- **Progress** - Barras de progresso (P1)
- **Spinners** - Loading indicators (P1)
- **Toasts** - Notificações flutuantes (P0)
- **Carousel** - Sliders de conteúdo (P1)
- **Accordion** - FAQ colapsável (P1)

### **Forms** (Prioritários)
- **Inputs** - Text, email, password, number (P0)
- **Textarea** - Multi-line input (P0)
- **Select** - Dropdown selection (P0)
- **Checkbox** - Multiple selection (P0)
- **Radio** - Single selection (P0)
- **Switch** - Toggle on/off (P0)
- **Input Group** - Input com prefixo/sufixo (P0)
- **Form Validation** - Mensagens de erro (P0)
- **Datepicker** - Seleção de data (P1)
- **Timepicker** - Seleção de hora (P1)
- **File Upload** - Upload de arquivos (P1)
- **Range Slider** - Slider numérico (P1)
- **Tags Input** - Input com tags (P1)
- **Color Picker** - Seleção de cor (P2)
- **WYSIWYG Editor** - Editor rico (P2)

### **Tables** (Prioritários)
- **Basic Table** - Tabela simples (P0)
- **DataTable** - Tabela com features ✅ *já criado* (P0)
- **Striped/Bordered** - Variações visuais (P0)
- **Responsive Table** - Mobile friendly (P0)
- **Fixed Columns** - Colunas fixas (P1)
- **Expandable Rows** - Linhas expansíveis (P1)

### **Navigation** (Prioritários)
- **Navbar** - Barra de navegação (P0)
- **Sidebar** - Menu lateral (P0)
- **Breadcrumb** - Navegação hierárquica (P0)
- **Pagination** - Paginação de conteúdo (P0)
- **Menu** - Menu dropdown/mega menu (P0)

### **Data Display**
- **Avatar** - Imagens de perfil (P0)
- **List Group** - Listas estilizadas (P1)
- **Timeline** - Linha do tempo (P1)
- **Tree View** - Visualização hierárquica (P2)

### **Charts** (Baixa prioridade)
- **Line Chart** - Gráfico de linhas (P2)
- **Bar Chart** - Gráfico de barras (P2)
- **Pie/Donut Chart** - Gráficos circulares (P2)
- **Area Chart** - Gráfico de área (P2)

### **Maps** (Baixa prioridade)
- **Google Maps** - Integração Google Maps (P2)
- **Leaflet Maps** - Mapas open source (P2)

---

## 📊 Estatísticas do Inventário

- **Total de CSS Pages**: 26 arquivos
- **Categorias principais**: 
  - UI Components: ~30 componentes identificados
  - Forms: ~15 componentes identificados
  - Tables: ~6 componentes identificados
  - Navigation: ~5 componentes identificados
  - App Pages: 12 páginas complexas
  - Templates: 9 layouts completos

- **Prioridade P0** (críticos): ~25 componentes
- **Prioridade P1** (importantes): ~20 componentes
- **Prioridade P2** (nice-to-have): ~15 componentes

**Total estimado**: ~60 componentes a catalogar

---

## 🔍 Observações

1. **Fonte HTML não disponível**: Template original é ASP.NET Core Razor Pages, não HTML estático
2. **Estratégia de catalogação**: Baseada em:
   - CSS files de páginas disponíveis
   - JS files de aplicativos
   - Documentação padrão do Vuexy template
   - Análise das classes CSS no `core.css`
3. **Assets já integrados**:
   - ✅ core.css (829KB)
   - ✅ 26 page-specific CSS
   - ✅ 553 font files
   - ✅ 164 vendor libraries
   - ✅ 6 core JS files
4. **Próximo passo**: Mapear cada componente identificado para classificação Atomic Design

---

**Última atualização**: 30/01/2026
