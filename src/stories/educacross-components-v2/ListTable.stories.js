/**
 * ListTable Component - Pixel Perfect from educacross-frontoffice
 *
 * @component ListTable
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/table/ListTable.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Data Display/ListTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## ListTable - Tabela de Dados Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/table/ListTable.vue\`.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`dataTable\` | Array | [] | Dados da tabela |
| \`tableColumns\` | Array | [] | Configuração das colunas |
| \`perPage\` | Number | 10 | Itens por página |
| \`perPageOptions\` | Array | [10,25,50] | Opções de paginação |
| \`totalData\` | Number | 0 | Total de registros |
| \`currentPage\` | Number | 1 | Página atual |
| \`loading\` | Boolean | false | Estado de carregamento |
| \`showControls\` | Boolean | true | Mostra controles |
| \`showSearchQueryInput\` | Boolean | true | Mostra campo de busca |
| \`showViewSelection\` | Boolean | false | Toggle list/grid view |
| \`itemView\` | String | 'list-view' | Modo de visualização |
| \`exportToExcel\` | Function | null | Função de exportação |
| \`emptyText\` | String | 'noDataFound' | Texto quando vazio |
| \`stickyHeader\` | Boolean | false | Header fixo |
| \`sortBy\` | String | '' | Campo de ordenação |
| \`isSortDirDesc\` | Boolean | false | Ordenação descendente |
| \`border\` | Boolean | false | Borda no card |

### Events

- \`@sort-changed\` - Ordenação alterada
- \`@page-changed\` - Página alterada
- \`@per-page-changed\` - Items por página alterado

### Slots

- \`#header\` - Conteúdo acima dos controles
- \`#cell(fieldName)\` - Customização de célula
- \`#card\` - Template do card (grid view)
        `,
      },
    },
  },
};

// CSS do ListTable
const listTableStyles = `
<style>
  /* === ListTable - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --secondary: #82868b;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
    --body-color: #6e6b7b;
    --text-muted: #b9b9c3;
    --border-color: #ebe9f1;
    --table-hover-bg: #f8f8f8;
    --white: #fff;
  }

  /* Card container */
  .card {
    background-color: var(--white);
    border: none;
    border-radius: 0.428rem;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
    margin-bottom: 2rem;
  }

  .card.card-border {
    border: 1px solid var(--border-color);
  }

  .card-body {
    padding: 1.5rem;
  }

  /* Controles superiores */
  .list-table-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.5rem;
  }

  .per-page-selector {
    min-width: 75px;
  }

  .per-page-selector .vs__dropdown-toggle {
    padding: 0.3rem;
    border-color: var(--border-color);
  }

  /* Campo de busca */
  .search-input-group {
    max-width: 520px;
  }

  .search-input-group .input-group-text {
    background-color: transparent;
    border-right: none;
    padding: 0.438rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.357rem 0 0 0.357rem;
    color: var(--text-muted);
  }

  .search-input-group .form-control {
    border-left: none;
    padding-left: 0;
  }

  .search-input-group .form-control:focus {
    border-color: var(--border-color);
    box-shadow: none;
  }

  /* Botão de exportar */
  .btn-export {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 38px;
    white-space: nowrap;
  }

  /* Toggle view (list/grid) */
  .item-view-radio-group {
    opacity: 0.5;
  }

  .item-view-radio-group .btn {
    padding: 0.4rem 0.7rem;
  }

  /* Tabela */
  .table {
    width: 100%;
    margin-bottom: 0;
    color: var(--body-color);
    vertical-align: middle;
    border-color: var(--border-color);
  }

  .table thead th {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.857rem;
    letter-spacing: 0.5px;
    color: var(--body-color);
    background-color: #f3f2f7;
    border-bottom: 1px solid var(--border-color);
    padding: 0.72rem 1.5rem;
    vertical-align: middle;
  }

  .table thead th .head-icon-info {
    color: var(--text-muted);
    cursor: help;
  }

  .table tbody td {
    padding: 0.72rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }

  .table tbody tr:hover {
    background-color: var(--table-hover-bg);
  }

  .table-responsive {
    overflow-x: auto;
  }

  /* Skeleton loading */
  .skeleton-table {
    width: 100%;
  }

  .skeleton-row {
    display: flex;
    gap: 1rem;
    padding: 0.72rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .skeleton-cell {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.25rem;
    height: 1rem;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Paginação */
  .pagination-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
  }

  .pagination-info {
    color: var(--text-muted);
    font-size: 0.875rem;
  }

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.25rem;
  }

  .page-item .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25rem;
    height: 2.25rem;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    color: var(--body-color);
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 0.357rem;
    transition: all 0.15s ease;
  }

  .page-item .page-link:hover {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--white);
  }

  .page-item.active .page-link {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--white);
  }

  .page-item.disabled .page-link {
    color: var(--text-muted);
    pointer-events: none;
    opacity: 0.65;
  }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    text-align: center;
  }

  .empty-state img {
    max-width: 150px;
    margin-bottom: 1rem;
  }

  .empty-state span {
    color: var(--primary);
    font-weight: 600;
  }

  /* Grid view skeleton */
  .skeleton-card {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.428rem;
    height: 300px;
  }
</style>
`;

/**
 * Default - Tabela com dados
 */
export const Default = {
  render: () => `
    ${listTableStyles}
    <div class="card">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div class="search-input-group input-group" style="max-width: 520px;">
          <span class="input-group-text">
            <span class="material-symbols-outlined">search</span>
          </span>
          <input type="text" class="form-control" placeholder="Buscar...">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Nome
                </div>
              </th>
              <th>
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Turma
                </div>
              </th>
              <th>
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Desempenho
                  <span class="material-symbols-outlined head-icon-info" style="font-size: 16px;">info</span>
                </div>
              </th>
              <th>
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Silva</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-success">85%</span></td>
              <td><span class="badge bg-light-success text-success">Proficiente</span></td>
            </tr>
            <tr>
              <td>Bruno Santos</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-warning">62%</span></td>
              <td><span class="badge bg-light-warning text-warning">Básico</span></td>
            </tr>
            <tr>
              <td>Carla Oliveira</td>
              <td>5º Ano B</td>
              <td><span class="badge bg-success">91%</span></td>
              <td><span class="badge bg-light-primary text-primary">Avançado</span></td>
            </tr>
            <tr>
              <td>Daniel Costa</td>
              <td>5º Ano B</td>
              <td><span class="badge bg-danger">35%</span></td>
              <td><span class="badge bg-light-danger text-danger">Abaixo do Básico</span></td>
            </tr>
            <tr>
              <td>Elena Ferreira</td>
              <td>6º Ano A</td>
              <td><span class="badge bg-success">78%</span></td>
              <td><span class="badge bg-light-success text-success">Proficiente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-2 pt-2 mb-2">
        <div class="pagination-container">
          <div class="pagination-info">
            Mostrando 1 a 5 de 25 registros
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#">
                  <span class="material-symbols-outlined" style="font-size: 18px;">chevron_left</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">5</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `,
};

/**
 * Loading - Estado de carregamento com skeleton
 */
export const Loading = {
  render: () => `
    ${listTableStyles}
    <div class="card">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector" disabled>
            <option>10</option>
          </select>
        </div>
        <div class="search-input-group input-group" style="max-width: 520px;">
          <span class="input-group-text">
            <span class="material-symbols-outlined">search</span>
          </span>
          <input type="text" class="form-control" placeholder="Buscar..." disabled>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 30%"><div class="skeleton-cell" style="width: 60%;"></div></th>
              <th style="width: 20%"><div class="skeleton-cell" style="width: 50%;"></div></th>
              <th style="width: 25%"><div class="skeleton-cell" style="width: 70%;"></div></th>
              <th style="width: 25%"><div class="skeleton-cell" style="width: 40%;"></div></th>
            </tr>
          </thead>
          <tbody>
            ${Array(5).fill().map(() => `
              <tr>
                <td><div class="skeleton-cell" style="width: ${60 + Math.random() * 30}%;"></div></td>
                <td><div class="skeleton-cell" style="width: ${40 + Math.random() * 30}%;"></div></td>
                <td><div class="skeleton-cell" style="width: ${50 + Math.random() * 30}%;"></div></td>
                <td><div class="skeleton-cell" style="width: ${30 + Math.random() * 40}%;"></div></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * Empty - Sem dados
 */
export const Empty = {
  render: () => `
    ${listTableStyles}
    <div class="card">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector">
            <option>10</option>
          </select>
        </div>
        <div class="search-input-group input-group" style="max-width: 520px;">
          <span class="input-group-text">
            <span class="material-symbols-outlined">search</span>
          </span>
          <input type="text" class="form-control" placeholder="Buscar...">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Desempenho</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">
                <div class="empty-state">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#6e63e8" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                  <span class="text-primary font-bold">Nenhum dado encontrado</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * WithExport - Com botão de exportar Excel
 */
export const WithExport = {
  render: () => `
    ${listTableStyles}
    <div class="card">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="search-input-group input-group" style="max-width: 400px;">
            <span class="input-group-text">
              <span class="material-symbols-outlined">search</span>
            </span>
            <input type="text" class="form-control" placeholder="Buscar...">
          </div>
          <button class="btn btn-outline-primary btn-export">
            <span class="material-symbols-outlined" style="font-size: 22px;">ios_share</span>
            <span>Exportar em Excel</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Desempenho</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Silva</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-success">85%</span></td>
              <td><span class="badge bg-light-success text-success">Proficiente</span></td>
            </tr>
            <tr>
              <td>Bruno Santos</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-warning">62%</span></td>
              <td><span class="badge bg-light-warning text-warning">Básico</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * WithViewToggle - Com toggle list/grid view
 */
export const WithViewToggle = {
  render: () => `
    ${listTableStyles}
    <div class="card">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector">
            <option>10</option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="search-input-group input-group" style="max-width: 400px;">
            <span class="input-group-text">
              <span class="material-symbols-outlined">search</span>
            </span>
            <input type="text" class="form-control" placeholder="Buscar...">
          </div>
          <div class="btn-group item-view-radio-group" role="group">
            <input type="radio" class="btn-check" name="viewToggle" id="listView" checked>
            <label class="btn btn-outline-secondary btn-sm" for="listView">
              <span class="material-symbols-outlined" style="font-size: 18px;">format_list_bulleted</span>
            </label>
            <input type="radio" class="btn-check" name="viewToggle" id="gridView">
            <label class="btn btn-outline-secondary btn-sm" for="gridView">
              <span class="material-symbols-outlined" style="font-size: 18px;">grid_view</span>
            </label>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Desempenho</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Silva</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-success">85%</span></td>
            </tr>
            <tr>
              <td>Bruno Santos</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-warning">62%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * GridView - Visualização em cards
 */
export const GridView = {
  render: () => `
    ${listTableStyles}
    <div class="card mb-3">
      <div class="list-table-controls m-2">
        <div class="d-flex align-items-center">
          <label class="me-2">Mostrar</label>
          <select class="form-select per-page-selector">
            <option>10</option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="search-input-group input-group" style="max-width: 400px;">
            <span class="input-group-text">
              <span class="material-symbols-outlined">search</span>
            </span>
            <input type="text" class="form-control" placeholder="Buscar...">
          </div>
          <div class="btn-group item-view-radio-group" role="group">
            <input type="radio" class="btn-check" name="viewToggle2" id="listView2">
            <label class="btn btn-outline-secondary btn-sm" for="listView2">
              <span class="material-symbols-outlined" style="font-size: 18px;">format_list_bulleted</span>
            </label>
            <input type="radio" class="btn-check" name="viewToggle2" id="gridView2" checked>
            <label class="btn btn-outline-secondary btn-sm" for="gridView2">
              <span class="material-symbols-outlined" style="font-size: 18px;">grid_view</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Ana Silva</h5>
            <p class="card-text text-muted">5º Ano A</p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="badge bg-success">85%</span>
              <span class="badge bg-light-success text-success">Proficiente</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Bruno Santos</h5>
            <p class="card-text text-muted">5º Ano A</p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="badge bg-warning">62%</span>
              <span class="badge bg-light-warning text-warning">Básico</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Carla Oliveira</h5>
            <p class="card-text text-muted">5º Ano B</p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="badge bg-success">91%</span>
              <span class="badge bg-light-primary text-primary">Avançado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="pagination-container">
          <div class="pagination-info">
            Mostrando 1 a 3 de 25 registros
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#">
                  <span class="material-symbols-outlined" style="font-size: 18px;">chevron_left</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `,
};

/**
 * Sortable - Com ordenação
 */
export const Sortable = {
  render: () => `
    ${listTableStyles}
    <style>
      .sortable {
        cursor: pointer;
      }
      .sortable:hover {
        color: var(--primary);
      }
      .sort-icon {
        font-size: 16px;
        margin-left: 0.25rem;
        opacity: 0.5;
      }
      .sort-icon.active {
        opacity: 1;
        color: var(--primary);
      }
    </style>
    <div class="card">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="sortable">
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Nome
                  <span class="material-symbols-outlined sort-icon active">arrow_upward</span>
                </div>
              </th>
              <th class="sortable">
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Turma
                  <span class="material-symbols-outlined sort-icon">unfold_more</span>
                </div>
              </th>
              <th class="sortable">
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Desempenho
                  <span class="material-symbols-outlined sort-icon">unfold_more</span>
                </div>
              </th>
              <th>
                <div class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase">
                  Ações
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Silva</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-success">85%</span></td>
              <td>
                <button class="btn btn-sm btn-icon btn-light-primary me-1">
                  <span class="material-symbols-outlined" style="font-size: 18px;">visibility</span>
                </button>
                <button class="btn btn-sm btn-icon btn-light-secondary">
                  <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                </button>
              </td>
            </tr>
            <tr>
              <td>Bruno Santos</td>
              <td>5º Ano A</td>
              <td><span class="badge bg-warning">62%</span></td>
              <td>
                <button class="btn btn-sm btn-icon btn-light-primary me-1">
                  <span class="material-symbols-outlined" style="font-size: 18px;">visibility</span>
                </button>
                <button class="btn btn-sm btn-icon btn-light-secondary">
                  <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                </button>
              </td>
            </tr>
            <tr>
              <td>Carla Oliveira</td>
              <td>5º Ano B</td>
              <td><span class="badge bg-success">91%</span></td>
              <td>
                <button class="btn btn-sm btn-icon btn-light-primary me-1">
                  <span class="material-symbols-outlined" style="font-size: 18px;">visibility</span>
                </button>
                <button class="btn btn-sm btn-icon btn-light-secondary">
                  <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};
