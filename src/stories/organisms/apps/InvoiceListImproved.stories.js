/**
 * Invoice List Improved - Lista de Faturas Redesenhada
 * =========================================
 * Versão otimizada da lista de faturas eliminando redundâncias visuais
 * 
 * @component InvoiceListImproved
 * @category Organisms/Apps
 * @source Redesign based on Vuexy Invoice List patterns
 * @assets /vuexy/css/pages/app-invoice.css
 * @status DESIGN-PATTERN
 * @since 2.0.0
 */

export default {
  title: 'Organisms/Apps/Invoice List Improved',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs h4 {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 2rem 0 0.75rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs p strong {
    color: #000;
    font-weight: 600;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
  }

  .sbdocs thead {
    background: #fff;
    border-bottom: 2px solid #e5e5e5;
  }

  .sbdocs thead th {
    color: #1d1d1d;
    font-weight: 600;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .sbdocs tbody tr {
    border-bottom: 1px solid #f1f3f5;
  }

  .sbdocs tbody tr:hover {
    background-color: #fafbfc;
  }

  .sbdocs tbody td {
    padding: 0.875rem 1rem;
    color: #333;
    line-height: 1.6;
  }

  .sbdocs tbody td:first-child {
    font-weight: 500;
    color: #1d1d1d;
  }

  .sbdocs code {
    background: #f1f3f5;
    color: #6e63e8;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
    font-weight: 500;
  }

  .sbdocs pre {
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
    color: #1d1d1d;
    font-size: 13px;
    font-weight: 400;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }

  .comparison-column {
    padding: 1.5rem;
    background: #fafbfc;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
  }

  .comparison-column h4 {
    margin-top: 0;
    color: #1d1d1d;
  }

  .issue-tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .issue-critical { background: #fee; color: #c00; }
  .issue-moderate { background: #fff3cd; color: #856404; }
  .issue-improved { background: #d4edda; color: #155724; }
</style>

# Invoice List Improved

Lista de faturas redesenhada eliminando redundâncias de interface identificadas no template original Vuexy.

---

## Contexto de Uso

### Jornada do Usuário

**Persona:** Gerente Financeiro / Contador  
**Tela:** Dashboard Financeiro → Lista de Faturas  
**Fluxo:** Acessar Dashboard → Visualizar Métricas → Escanear Lista → Filtrar/Buscar → Executar Ações

### Casos de Uso

Gerente Financeiro precisa aprovar pagamentos rapidamente, escanear status de múltiplas faturas, buscar faturas por cliente ou valor, e agir em lote aprovando múltiplas faturas simultaneamente.

Contador precisa auditar faturas pagas versus pendentes, exportar relatórios mensais consolidados, e verificar descontos aplicados em cada transação.

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
InvoiceListImproved
├── MetricCards
│   ├── TotalCard (com CTA "Ver Todas")
│   ├── PaidCard (com CTA "Exportar")
│   ├── PendingCard (com CTA "Aprovar")
│   └── OverdueCard (com CTA "Lembrar")
├── FilterBar
│   ├── SearchInput (56% largura)
│   ├── StatusFilter (22% largura)
│   └── DateFilter (22% largura)
└── InvoiceTable
    ├── ColumnID (hierarquia forte)
    ├── ColumnClient (nome + data)
    ├── ColumnTotal (destaque)
    ├── ColumnBalance (condicional)
    ├── ColumnStatus (badge apenas)
    └── ColumnActions (menu dropdown)
\`\`\`

---

## Especificações - Dimensões

| Elemento | Medida | Descrição |
|----------|--------|-----------|
| **Card Métrica** | Height: 120px | Cards compactos e clicáveis |
| **Card Icon** | 48x48px | Ícone com background colorido |
| **Barra Pesquisa** | Height: 44px | Input principal |
| **Linha Tabela** | Height: 72px | Espaço para duas linhas de info |
| **Badge Status** | Height: 24px | Tamanho confortável para leitura |
| **Menu Actions** | Width: 36px | Botão circular |

---

## Especificações - Cores

| Elemento | Cor | Uso | Contraste |
|----------|-----|-----|-----------|
| **Status Paid** | #28C76F | Badge verde claro | WCAG AAA |
| **Status Pending** | #FF9F43 | Badge laranja | WCAG AA |
| **Status Overdue** | #EA5455 | Badge vermelho | WCAG AAA |
| **Card Total** | #7367F0 | Background roxo | Neutro |
| **Card Paid** | #28C76F | Background verde | Positivo |
| **Card Pending** | #FF9F43 | Background laranja | Atenção |
| **Card Overdue** | #EA5455 | Background vermelho | Urgente |

---

## Especificações - Tipografia

| Elemento | Tamanho | Peso | Cor | Descrição |
|----------|---------|------|-----|-----------|
| **Card Value** | 28px | 700 | #fff | Valor da métrica em destaque |
| **Card Label** | 14px | 400 | rgba(255,255,255,0.8) | Label secundário |
| **Client Name** | 15px | 600 | #5e5873 | Nome do cliente em bold |
| **Invoice Date** | 13px | 400 | #b9b9c3 | Data abaixo do nome |
| **Total Value** | 16px | 600 | #5e5873 | Valor total da fatura |
| **Balance Due** | 14px | 500 | #EA5455 | Valor pendente em vermelho |
| **Status Badge** | 12px | 600 | #fff | Texto sempre uppercase |

---

## Especificações - Layout e Espaçamento

| Elemento | Espaçamento | Descrição |
|----------|-------------|-----------|
| **Card Grid Gap** | 24px | Espaço entre cards de métricas |
| **Card Padding** | 24px | Padding interno do card |
| **Table Cell Padding** | 16px horiz / 20px vert | Respiro adequado nas células |
| **Badge Padding** | 6px 12px | Compacto mas legível |
| **Column Gap** | 16px | Espaço entre colunas da tabela |

---

## Comportamento e Estados

### Estados do Badge de Status
\`\`\`javascript
const statusConfig = {
  paid: {
    label: 'PAID',
    color: 'success',
    icon: null // SEM ícone redundante
  },
  pending: {
    label: 'PENDING',
    color: 'warning',
    icon: null
  },
  overdue: {
    label: 'OVERDUE',
    color: 'danger',
    icon: null
  }
};
\`\`\`

### Menu de Ações Consolidado
\`\`\`javascript
const actions = [
  { icon: 'bx-show', label: 'View Details', onClick: viewInvoice },
  { icon: 'bx-download', label: 'Download PDF', onClick: downloadPDF },
  { icon: 'bx-send', label: 'Send Email', onClick: sendEmail },
  { type: 'divider' },
  { icon: 'bx-trash', label: 'Delete', onClick: deleteInvoice, danger: true }
];
\`\`\`

---

## Regras de Negócio

### Hierarquia de Informação

Cliente é a informação primária (bold, tamanho grande). Total é a informação mais importante financeiramente. Status deve ser imediatamente reconhecível pela cor. Balance só aparece se diferente de zero para evitar ruído visual.

### Cards de Métrica Acionáveis

Cada card tem CTA contextual que permite ação direta. Cliques no card filtram a lista automaticamente. CTAs permitem ação imediata sem navegação adicional.

### Dados de Exemplo

Sempre usar dados variados em exemplos. Nomes de clientes diversos e realistas. Emails únicos para cada cliente. Valores financeiros realistas e variados.

---

## Acessibilidade

### WCAG 2.1 Level AA

Contraste de cores todos acima de 4.5:1. Navegação por teclado através de todas ações. ARIA labels em todos ícones. Focus visible em todos elementos interativos.

### Atributos ARIA

\`\`\`html
<button aria-label="Actions menu for invoice #5036">
  <i class="bx bx-dots-vertical-rounded" aria-hidden="true"></i>
</button>

<span class="badge" role="status" aria-label="Payment status: Paid">
  PAID
</span>
\`\`\`

---

## Exemplos de Integração

### Vue 2 Component

\`\`\`vue
<template>
  <div class="invoice-list-improved">
    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-sm-6" 
           v-for="metric in metrics" 
           :key="metric.id">
        <MetricCard
          :icon="metric.icon"
          :label="metric.label"
          :value="metric.value"
          :color="metric.color"
          :cta-text="metric.ctaText"
          @click="handleMetricClick(metric)"
        />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <input 
          v-model="searchQuery"
          type="text" 
          class="form-control"
          placeholder="Search invoices..."
        />
      </div>
      <div class="col-md-3">
        <select v-model="statusFilter" class="form-select">
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>

    <InvoiceTable
      :invoices="filteredInvoices"
      @action="handleAction"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      metrics: [
        { id: 'total', icon: 'bx-file', label: 'Total', value: 120, color: 'primary', ctaText: 'Ver Todas' },
        { id: 'paid', icon: 'bx-check-circle', label: 'Paid', value: 86, color: 'success', ctaText: 'Exportar' },
        { id: 'pending', icon: 'bx-time', label: 'Pending', value: 24, color: 'warning', ctaText: 'Aprovar' },
        { id: 'overdue', icon: 'bx-error-circle', label: 'Overdue', value: 10, color: 'danger', ctaText: 'Lembrar' }
      ]
    };
  },
  computed: {
    filteredInvoices() {
      return this.invoices.filter(inv => {
        const matchesSearch = inv.client.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = !this.statusFilter || inv.status === this.statusFilter;
        return matchesSearch && matchesStatus;
      });
    }
  }
};
</script>
\`\`\`

---

## Comparação Before/After

<div class="comparison-grid">
  <div class="comparison-column">
    <h4>Problemas Identificados</h4>
    <ul>
      <li><span class="issue-tag issue-critical">CRÍTICO</span> Ícone + Badge de status (redundância visual)</li>
      <li><span class="issue-tag issue-critical">CRÍTICO</span> Todos emails iguais (fake data repetida)</li>
      <li><span class="issue-tag issue-critical">CRÍTICO</span> Cards de métrica sem CTAs acionáveis</li>
      <li><span class="issue-tag issue-moderate">MODERADO</span> Coluna ID sem hierarquia visual</li>
      <li><span class="issue-tag issue-moderate">MODERADO</span> Balance confuso (mostra $0.00)</li>
      <li><span class="issue-tag issue-moderate">MODERADO</span> 3 botões de ação quando menu seria suficiente</li>
    </ul>
  </div>
  
  <div class="comparison-column">
    <h4>Melhorias Aplicadas</h4>
    <ul>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> Apenas badge (sem ícone redundante)</li>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> Dados variados e realistas</li>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> Cards com CTAs contextuais</li>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> ID com typography hierárquica</li>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> Balance só aparece se maior que zero</li>
      <li><span class="issue-tag issue-improved">CORRIGIDO</span> Menu dropdown consolidado</li>
    </ul>
  </div>
</div>

---

## UX Writing

| Elemento | Tom | Função | Exemplo |
|----------|-----|--------|---------|
| **Card CTA** | Direto e ativo | Ação imediata | "Aprovar Pendentes" |
| **Status Badge** | Factual | Comunicar estado | "PAID" |
| **Balance Label** | Claro e urgente | Alertar pendência | "Balance Due" |
| **Search Placeholder** | Amigável | Orientar busca | "Search by client or invoice..." |
| **Menu Action** | Imperativo | Comandar ação | "Download PDF" |
| **Pagination Info** | Informativo | Orientar navegação | "Showing 1-10 of 120" |

---

## Componentes Relacionados

Invoice - Template de impressão de fatura  
DataTable - Tabela base com ordenação e filtros  
Card - Cards de métricas e estatísticas

---

## Otimização de Performance

Lazy load de 10 items por vez. Virtual scrolling para listas maiores que 100 items. Debounce em search input (300ms). Memoização de filtros computados.
        `
      }
    }
  }
};

/**
 * Dados de exemplo com variedade real
 */
const sampleInvoices = [
  { id: 5036, client: 'Jordan Stevenson', email: 'jordan.steve@example.com', date: 'Apr 18, 2021', total: 3428, balance: 0, status: 'paid' },
  { id: 5035, client: 'Stephanie Burns', email: 's.burns@techcorp.io', date: 'Apr 17, 2021', total: 5219, balance: 0, status: 'paid' },
  { id: 5034, client: 'Tony Herrera', email: 'tony.h@innovate.com', date: 'Apr 15, 2021', total: 3719, balance: 0, status: 'paid' },
  { id: 5033, client: 'Kevin Patton', email: 'kpatton@solutions.net', date: 'Apr 14, 2021', total: 4749, balance: 0, status: 'paid' },
  { id: 5032, client: 'Mrs. Julie Donovan MD', email: 'julie.donovan@health.org', date: 'Apr 12, 2021', total: 4056, balance: 1200, status: 'pending' },
  { id: 5031, client: 'Amanda Phillips', email: 'a.phillips@design.studio', date: 'Apr 10, 2021', total: 2771, balance: 0, status: 'paid' },
  { id: 5030, client: 'Scott Davidson', email: 'scott.d@enterprise.com', date: 'Apr 08, 2021', total: 5200, balance: 2800, status: 'overdue' },
  { id: 5029, client: 'Christina Collier', email: 'chris.collier@marketing.io', date: 'Apr 05, 2021', total: 3202, balance: 0, status: 'paid' },
];

/**
 * Story: Lista Melhorada Completa
 */
export const ImprovedList = {
  render: () => {
    return `
<link rel="stylesheet" href="/vuexy/css/core.css">
<link rel="stylesheet" href="/vuexy/vendors/libs/datatables-bs5/datatables.bootstrap5.css">

<div class="container-xxl flex-grow-1 container-p-y">
  <!-- Header Cards com CTAs -->
  <div class="row g-4 mb-4">
    <!-- Total Invoices -->
    <div class="col-xl-3 col-sm-6">
      <div class="card cursor-pointer" onclick="alert('Filtrar: Todas as faturas')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Total</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">120</h3>
              </div>
              <small class="text-primary fw-semibold">
                <i class="bx bx-right-arrow-alt"></i> Ver Todas
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-primary">
                <i class="bx bx-file bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paid Invoices -->
    <div class="col-xl-3 col-sm-6">
      <div class="card cursor-pointer" onclick="alert('Exportar relatório de pagas')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Paid</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">86</h3>
              </div>
              <small class="text-success fw-semibold">
                <i class="bx bx-download"></i> Exportar
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-success">
                <i class="bx bx-check-circle bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Invoices -->
    <div class="col-xl-3 col-sm-6">
      <div class="card cursor-pointer" onclick="alert('Aprovar faturas pendentes')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Pending</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">24</h3>
              </div>
              <small class="text-warning fw-semibold">
                <i class="bx bx-check-double"></i> Aprovar
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-warning">
                <i class="bx bx-time bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overdue Invoices -->
    <div class="col-xl-3 col-sm-6">
      <div class="card cursor-pointer" onclick="alert('Enviar lembretes')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Overdue</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">10</h3>
              </div>
              <small class="text-danger fw-semibold">
                <i class="bx bx-bell"></i> Lembrar
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-danger">
                <i class="bx bx-error-circle bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Invoice List Table Card -->
  <div class="card">
    <div class="card-header border-bottom">
      <h5 class="card-title mb-3">Invoice List</h5>
      <div class="row g-3">
        <!-- Search (56% width) -->
        <div class="col-md-6">
          <div class="input-group input-group-merge">
            <span class="input-group-text"><i class="bx bx-search"></i></span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search by client or invoice..."
              aria-label="Search invoices"
            />
          </div>
        </div>
        
        <!-- Status Filter (22% width) -->
        <div class="col-md-3">
          <select class="form-select" aria-label="Filter by status">
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        
        <!-- Date Range (22% width) -->
        <div class="col-md-3">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Select date range"
            aria-label="Filter by date"
          />
        </div>
      </div>
    </div>

    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 80px;">#ID</th>
            <th style="width: 250px;">Client</th>
            <th style="width: 130px;">Total</th>
            <th style="width: 130px;">Balance</th>
            <th style="width: 110px;">Status</th>
            <th style="width: 60px; text-align: center;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${sampleInvoices.map(inv => `
          <tr>
            <!-- #ID com hierarquia visual -->
            <td>
              <span class="fw-semibold text-body" style="font-size: 14px;">
                #${inv.id}
              </span>
            </td>
            
            <!-- Cliente + Data (duas linhas) -->
            <td>
              <div class="d-flex flex-column">
                <span class="fw-semibold text-body">${inv.client}</span>
                <small class="text-muted">${inv.date}</small>
              </div>
            </td>
            
            <!-- Total (destaque) -->
            <td>
              <span class="fw-semibold" style="font-size: 15px;">
                $${inv.total.toLocaleString()}
              </span>
            </td>
            
            <!-- Balance (só aparece se > 0) -->
            <td>
              ${inv.balance > 0 
                ? `<span class="text-danger fw-medium">$${inv.balance.toLocaleString()}</span>` 
                : `<span class="badge bg-label-success">Paid in full</span>`
              }
            </td>
            
            <!-- Status (SÓ BADGE, sem ícone redundante) -->
            <td>
              <span class="badge bg-label-${inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'danger'}" 
                    role="status"
                    aria-label="Payment status: ${inv.status}">
                ${inv.status.toUpperCase()}
              </span>
            </td>
            
            <!-- Actions (menu dropdown consolidado) -->
            <td style="text-align: center;">
              <div class="dropdown">
                <button 
                  type="button" 
                  class="btn btn-sm btn-icon rounded-pill dropdown-toggle hide-arrow" 
                  data-bs-toggle="dropdown"
                  aria-label="Actions menu for invoice ${inv.id}"
                  aria-expanded="false">
                  <i class="bx bx-dots-vertical-rounded" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" href="javascript:void(0);">
                      <i class="bx bx-show me-2"></i> View Details
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="javascript:void(0);">
                      <i class="bx bx-download me-2"></i> Download PDF
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="javascript:void(0);">
                      <i class="bx bx-send me-2"></i> Send Email
                    </a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item text-danger" href="javascript:void(0);">
                      <i class="bx bx-trash me-2"></i> Delete
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Pagination com contador -->
    <div class="card-footer d-flex justify-content-between align-items-center">
      <span class="text-muted">Showing 1-8 of 120 invoices</span>
      <nav aria-label="Invoice pagination">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled">
            <a class="page-link" href="javascript:void(0);" aria-label="Previous">
              <i class="bx bx-chevron-left"></i>
            </a>
          </li>
          <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0);">4</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0);">5</a></li>
          <li class="page-item">
            <a class="page-link" href="javascript:void(0);" aria-label="Next">
              <i class="bx bx-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<style>
/* Cursor pointer nos cards clicáveis */
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
}

/* Melhor hierarquia visual na tabela */
.table tbody tr:hover {
  background-color: #f8f9fa;
}

/* Balance só aparece se > 0, senão mostra "Paid in full" */
.badge.bg-label-success {
  font-size: 11px;
  padding: 4px 8px;
}
</style>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `
<!-- Cards com CTAs Acionáveis -->
<div class="card cursor-pointer" onclick="filterInvoices('all')">
  <div class="card-body">
    <span class="text-muted">Total</span>
    <h3>120</h3>
    <small class="text-primary fw-semibold">
      <i class="bx bx-right-arrow-alt"></i> Ver Todas
    </small>
  </div>
</div>

<!-- Tabela com Menos Redundâncias -->
<table class="table">
  <tbody>
    <tr>
      <!-- Apenas Badge (sem ícone duplicado) -->
      <td>
        <span class="badge bg-label-success">PAID</span>
      </td>
      
      <!-- Balance só aparece se != 0 -->
      <td>
        \${balance > 0 
          ? \`$\${balance}\` 
          : '<span class="badge bg-label-success">Paid in full</span>'
        }
      </td>
      
      <!-- Menu consolidado (não 3 botões) -->
      <td>
        <div class="dropdown">
          <button data-bs-toggle="dropdown">
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#">View Details</a></li>
            <li><a href="#">Download PDF</a></li>
            <li><a href="#">Send Email</a></li>
            <li><hr /></li>
            <li><a href="#">Delete</a></li>
          </ul>
        </div>
      </td>
    </tr>
  </tbody>
</table>
        `
      }
    }
  }
};

/**
 * Story: Comparação Before/After
 */
export const BeforeAfterComparison = {
  render: () => {
    return `
<link rel="stylesheet" href="/vuexy/css/core.css">

<div class="container-xxl flex-grow-1 container-p-y">
  <h3 class="mb-4">Before/After Comparison</h3>
  
  <div class="row g-4">
    <!-- BEFORE (com redundâncias) -->
    <div class="col-lg-6">
      <div class="card border border-danger">
        <div class="card-header bg-danger text-white">
          <h5 class="mb-0">❌ BEFORE: Com Redundâncias</h5>
        </div>
        <div class="card-body">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5036</td>
                <td>
                  <div>Jordan Stevenson</div>
                  <small class="text-muted">Layne_Kuvalis@gmail.com</small>
                </td>
                <td>
                  <!-- ❌ REDUNDÂNCIA: Ícone + Badge -->
                  <i class="bx bx-trending-up text-success"></i>
                  <span class="badge bg-label-success ms-1">Paid</span>
                </td>
                <td>
                  <!-- ❌ REDUNDÂNCIA: 3 botões quando um menu seria suficiente -->
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>5035</td>
                <td>
                  <div>Stephanie Burns</div>
                  <!-- ❌ REDUNDÂNCIA: Todos emails iguais (fake data) -->
                  <small class="text-muted">Layne_Kuvalis@gmail.com</small>
                </td>
                <td>
                  <i class="bx bx-trending-up text-success"></i>
                  <span class="badge bg-label-success ms-1">Paid</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-label-secondary">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="alert alert-danger mt-3">
            <strong>Problemas Identificados:</strong>
            <ul class="mb-0 mt-2">
              <li>Ícone + Badge comunicando a mesma informação</li>
              <li>Todos emails "Layne_Kuvalis@gmail.com" (dados falsos repetidos)</li>
              <li>3 botões de ação quando menu dropdown consolidaria</li>
              <li>Balance mostrando $0.00 (ruído visual)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- AFTER (melhorado) -->
    <div class="col-lg-6">
      <div class="card border border-success">
        <div class="card-header bg-success text-white">
          <h5 class="mb-0">✅ AFTER: Versão Melhorada</h5>
        </div>
        <div class="card-body">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Client</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="fw-semibold">#5036</span></td>
                <td>
                  <div class="fw-semibold">Jordan Stevenson</div>
                  <!-- ✅ CORRIGIDO: Email único e real -->
                  <small class="text-muted">jordan.steve@example.com</small>
                </td>
                <td>
                  <!-- ✅ CORRIGIDO: Apenas badge (sem ícone redundante) -->
                  <span class="badge bg-label-success">PAID</span>
                </td>
                <td>
                  <!-- ✅ CORRIGIDO: Menu dropdown consolidado -->
                  <div class="dropdown">
                    <button 
                      class="btn btn-sm btn-icon rounded-pill dropdown-toggle hide-arrow" 
                      data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#"><i class="bx bx-show me-2"></i> View</a></li>
                      <li><a class="dropdown-item" href="#"><i class="bx bx-download me-2"></i> Download</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" href="#"><i class="bx bx-trash me-2"></i> Delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td><span class="fw-semibold">#5035</span></td>
                <td>
                  <div class="fw-semibold">Stephanie Burns</div>
                  <!-- ✅ CORRIGIDO: Email único e real -->
                  <small class="text-muted">s.burns@techcorp.io</small>
                </td>
                <td>
                  <span class="badge bg-label-success">PAID</span>
                </td>
                <td>
                  <div class="dropdown">
                    <button 
                      class="btn btn-sm btn-icon rounded-pill dropdown-toggle hide-arrow" 
                      data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#"><i class="bx bx-show me-2"></i> View</a></li>
                      <li><a class="dropdown-item" href="#"><i class="bx bx-download me-2"></i> Download</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" href="#"><i class="bx bx-trash me-2"></i> Delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="alert alert-success mt-3">
            <strong>Melhorias Aplicadas:</strong>
            <ul class="mb-0 mt-2">
              <li>✅ Removido ícone redundante (apenas badge)</li>
              <li>✅ Emails únicos e realistas por cliente</li>
              <li>✅ Menu dropdown consolidando todas ações</li>
              <li>✅ Balance só aparece se > 0 ("Paid in full" caso contrário)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => resolve({ bootstrapLoaded: true });
          document.head.appendChild(script);
        });
      }
      return {};
    }
  ]
};

/**
 * Story: Métricas Acionáveis
 */
export const ActionableMetrics = {
  render: () => {
    return `
<link rel="stylesheet" href="/vuexy/css/core.css">

<div class="container-xxl flex-grow-1 container-p-y">
  <h3 class="mb-4">Cards de Métrica com CTAs</h3>
  
  <div class="alert alert-info mb-4">
    <strong>💡 Princípio:</strong> Cada métrica deve ter uma ação contextual. 
    Não basta mostrar o número, permitir que o usuário aja sobre ele imediatamente.
  </div>

  <div class="row g-4">
    <!-- Total Invoices -->
    <div class="col-md-6">
      <div class="card cursor-pointer" onclick="alert('CTA: Filtrar todas as faturas')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Total Invoices</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">120</h3>
                <small class="text-muted">(+12 this month)</small>
              </div>
              <!-- CTA Contextual -->
              <small class="text-primary fw-semibold">
                <i class="bx bx-right-arrow-alt"></i> Ver Todas
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-primary">
                <i class="bx bx-file bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Invoices -->
    <div class="col-md-6">
      <div class="card cursor-pointer" onclick="alert('CTA: Aprovar faturas pendentes em lote')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Pending Invoices</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">24</h3>
                <small class="text-warning">(Needs approval)</small>
              </div>
              <!-- CTA Contextual -->
              <small class="text-warning fw-semibold">
                <i class="bx bx-check-double"></i> Aprovar Pendentes
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-warning">
                <i class="bx bx-time bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overdue Invoices -->
    <div class="col-md-6">
      <div class="card cursor-pointer" onclick="alert('CTA: Enviar lembretes automáticos')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Overdue Invoices</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">10</h3>
                <small class="text-danger">(Action required)</small>
              </div>
              <!-- CTA Contextual -->
              <small class="text-danger fw-semibold">
                <i class="bx bx-bell"></i> Enviar Lembretes
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-danger">
                <i class="bx bx-error-circle bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paid Invoices -->
    <div class="col-md-6">
      <div class="card cursor-pointer" onclick="alert('CTA: Exportar relatório de faturas pagas')">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <div class="content-left">
              <span class="text-muted d-block mb-1">Paid Invoices</span>
              <div class="d-flex align-items-center my-1">
                <h3 class="mb-0 me-2">86</h3>
                <small class="text-success">(71.6% success rate)</small>
              </div>
              <!-- CTA Contextual -->
              <small class="text-success fw-semibold">
                <i class="bx bx-download"></i> Exportar Relatório
              </small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded bg-label-success">
                <i class="bx bx-check-circle bx-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="alert alert-success mt-4">
    <strong>✅ Benefícios:</strong>
    <ul class="mb-0">
      <li>Usuário sabe exatamente o que pode fazer com cada métrica</li>
      <li>Reduz cliques necessários para ações comuns</li>
      <li>Melhora escaneabilidade (CTAs coloridos chamam atenção)</li>
      <li>Transforma métricas passivas em pontos de entrada ativos</li>
    </ul>
  </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cursor-pointer:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
</style>
    `;
  }
};
