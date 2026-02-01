/**
 * @file Spinners - Educacross Design System
 * @description Indicadores de carregamento e processamento
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Spinners',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Spinners

Indicadores visuais de carregamento e processamento.

### Uso no Educacross
- **Carregamento de página**: Enquanto dados são buscados
- **Ações assíncronas**: Salvando, enviando
- **Botões**: Loading state em submits
- **Tabelas**: Carregando dados

### Variantes
- Border spinner (circular)
- Grow spinner (pulso)
- Cores semânticas
- Tamanhos (sm, default)
        `
      }
    }
  }
};

// Story: Spinners básicos
export const Basic = {
  name: '🔄 Básico',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Border spinner -->
      <div>
        <h6 class="text-muted mb-3">Border Spinner</h6>
        <div class="d-flex gap-3">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
      
      <!-- Grow spinner -->
      <div>
        <h6 class="text-muted mb-3">Grow Spinner</h6>
        <div class="d-flex gap-3">
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Tamanhos
export const Sizes = {
  name: '📐 Tamanhos',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Pequeno -->
      <div>
        <h6 class="text-muted mb-3">Pequeno (spinner-border-sm)</h6>
        <div class="d-flex align-items-center gap-3">
          <div class="spinner-border spinner-border-sm text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow spinner-grow-sm text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <span>16px - Ideal para botões e inline</span>
        </div>
      </div>
      
      <!-- Padrão -->
      <div>
        <h6 class="text-muted mb-3">Padrão</h6>
        <div class="d-flex align-items-center gap-3">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <span>32px - Uso geral</span>
        </div>
      </div>
      
      <!-- Grande (custom) -->
      <div>
        <h6 class="text-muted mb-3">Grande (custom)</h6>
        <div class="d-flex align-items-center gap-3">
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <span>48px - Carregamento de página</span>
        </div>
      </div>
    </div>
  `
};

// Story: Botões com loading
export const ButtonLoading = {
  name: '🔘 Botões com Loading',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Botões normais -->
      <div>
        <h6 class="text-muted mb-3">Estado Normal</h6>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary">
            <i class="bi bi-check me-1"></i> Salvar
          </button>
          <button class="btn btn-success">
            <i class="bi bi-send me-1"></i> Enviar
          </button>
          <button class="btn btn-danger">
            <i class="bi bi-trash me-1"></i> Excluir
          </button>
        </div>
      </div>
      
      <!-- Botões com loading -->
      <div>
        <h6 class="text-muted mb-3">Estado Loading</h6>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Salvando...
          </button>
          <button class="btn btn-success" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Enviando...
          </button>
          <button class="btn btn-danger" disabled>
            <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            Excluindo...
          </button>
        </div>
      </div>
      
      <!-- Botões outline -->
      <div>
        <h6 class="text-muted mb-3">Outline Loading</h6>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-primary" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Carregando...
          </button>
          <button class="btn btn-outline-secondary" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processando...
          </button>
        </div>
      </div>
      
      <!-- Apenas spinner -->
      <div>
        <h6 class="text-muted mb-3">Apenas Spinner</h6>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary" disabled style="width: 40px;">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          <button class="btn btn-success" disabled style="width: 40px;">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          <button class="btn btn-info" disabled style="width: 40px;">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  `
};

// Story: Loading de página
export const PageLoading = {
  name: '📄 Loading de Página',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Centralizado -->
      <div class="card" style="min-height: 200px;">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <h6 class="text-muted mb-1">Carregando dados...</h6>
          <small class="text-muted">Por favor, aguarde</small>
        </div>
      </div>
      
      <!-- Com logo -->
      <div class="card bg-light" style="min-height: 200px;">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <div class="position-relative mb-3">
            <img src="/vuexy/img/educacross/logos/Belinha.svg" 
                 alt="Educacross" 
                 style="width: 80px; height: 80px;"
                 onerror="this.outerHTML='<span class=\\'text-primary fs-1\\'>🦉</span>'">
            <div class="position-absolute bottom-0 end-0">
              <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>
          </div>
          <h6 class="text-muted">Preparando sua experiência...</h6>
        </div>
      </div>
    </div>
  `
};

// Story: Loading em cards
export const CardLoading = {
  name: '🃏 Loading em Cards',
  render: () => `
    <div class="row g-4">
      <!-- Card carregando -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex justify-content-center align-items-center" style="min-height: 150px;">
            <div class="text-center">
              <div class="spinner-border text-primary mb-2" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
              <div class="small text-muted">Carregando...</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card com dados parciais -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title">Pontos XP</h6>
            <div class="d-flex align-items-center gap-2">
              <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
              <span class="text-muted">Calculando...</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card carregado -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title">Pontos XP</h6>
            <h3 class="text-primary mb-0">1.250</h3>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Loading em tabela
export const TableLoading = {
  name: '📊 Loading em Tabela',
  render: () => `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Lista de Alunos</h6>
        <div class="spinner-border spinner-border-sm text-primary" role="status">
          <span class="visually-hidden">Atualizando...</span>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">
                <div class="d-flex justify-content-center align-items-center py-5">
                  <div class="spinner-border text-primary me-3" role="status">
                    <span class="visually-hidden">Carregando...</span>
                  </div>
                  <span class="text-muted">Carregando alunos...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

// Story: Loading inline
export const InlineLoading = {
  name: '📍 Loading Inline',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Em texto -->
      <div>
        <h6 class="text-muted mb-3">Em Texto</h6>
        <p class="mb-0">
          Verificando credenciais
          <span class="spinner-border spinner-border-sm text-primary ms-2" role="status">
            <span class="visually-hidden">Carregando...</span>
          </span>
        </p>
      </div>
      
      <!-- Em badge -->
      <div>
        <h6 class="text-muted mb-3">Em Badge</h6>
        <span class="badge bg-primary d-inline-flex align-items-center gap-2">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Sincronizando
        </span>
        <span class="badge bg-success d-inline-flex align-items-center gap-2 ms-2">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Processando
        </span>
      </div>
      
      <!-- Em input -->
      <div style="max-width: 300px;">
        <h6 class="text-muted mb-3">Em Input</h6>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Buscando..." disabled>
          <span class="input-group-text">
            <span class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Carregando...</span>
            </span>
          </span>
        </div>
      </div>
      
      <!-- Em select -->
      <div style="max-width: 300px;">
        <h6 class="text-muted mb-3">Carregando Opções</h6>
        <div class="position-relative">
          <select class="form-select" disabled>
            <option>Carregando turmas...</option>
          </select>
          <div class="position-absolute top-50 end-0 translate-middle-y me-4">
            <span class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Carregando...</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Skeleton vs Spinner
export const SkeletonVsSpinner = {
  name: '⚖️ Skeleton vs Spinner',
  render: () => `
    <div class="row g-4">
      <div class="col-md-6">
        <h6 class="text-muted mb-3">
          <i class="bi bi-arrow-repeat me-1"></i> Spinner
        </h6>
        <p class="small text-muted mb-3">
          Use para ações curtas onde o conteúdo não é previsível
        </p>
        <div class="card">
          <div class="card-body d-flex justify-content-center align-items-center" style="min-height: 150px;">
            <div class="text-center">
              <div class="spinner-border text-primary mb-2" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
              <div class="small text-muted">Carregando...</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <h6 class="text-muted mb-3">
          <i class="bi bi-square me-1"></i> Skeleton
        </h6>
        <p class="small text-muted mb-3">
          Use quando o layout do conteúdo é conhecido
        </p>
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="rounded-circle bg-secondary bg-opacity-25" style="width: 48px; height: 48px;"></div>
              <div class="flex-grow-1">
                <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 16px; width: 60%;"></div>
                <div class="bg-secondary bg-opacity-25 rounded" style="height: 12px; width: 40%;"></div>
              </div>
            </div>
            <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 14px; width: 100%;"></div>
            <div class="bg-secondary bg-opacity-25 rounded" style="height: 14px; width: 80%;"></div>
          </div>
        </div>
      </div>
    </div>
  `
};
