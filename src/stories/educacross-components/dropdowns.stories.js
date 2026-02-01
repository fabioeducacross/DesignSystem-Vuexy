/**
 * @file Dropdowns - Educacross Design System
 * @description Menus dropdown para ações e navegação
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Dropdowns',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Dropdowns

Menus suspensos para exibir listas de opções e ações.

### Uso no Educacross
- **Filtros**: Seleção de turmas, disciplinas, períodos
- **Ações**: Menu de contexto em tabelas e cards
- **Navegação**: Submenus e opções adicionais
- **Perfil**: Menu do usuário logado

### Variantes
- Com ícones
- Com dividers
- Com headers
- Alinhamento (start, end, center)
        `
      }
    }
  }
};

// Story: Dropdown básico
export const Basic = {
  name: '📋 Básico',
  render: () => `
    <div class="d-flex gap-4 flex-wrap">
      <!-- Dropdown simples -->
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button">
          Dropdown Básico
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Opção 1</a></li>
          <li><a class="dropdown-item" href="#">Opção 2</a></li>
          <li><a class="dropdown-item" href="#">Opção 3</a></li>
        </ul>
      </div>
      
      <!-- Dropdown com ícones -->
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button">
          <i class="bi bi-gear me-1"></i> Configurações
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> Perfil</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-bell me-2"></i> Notificações</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-shield me-2"></i> Privacidade</a></li>
        </ul>
      </div>
    </div>
  `
};

// Story: Dropdown com dividers e headers
export const WithDividers = {
  name: '📑 Com Dividers',
  render: () => `
    <div class="d-flex gap-4 flex-wrap">
      <!-- Com divider -->
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button">
          Ações
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i> Visualizar</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i> Editar</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-files me-2"></i> Duplicar</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i> Excluir</a></li>
        </ul>
      </div>
      
      <!-- Com header -->
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button">
          Exportar
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><h6 class="dropdown-header">Formato</h6></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-pdf me-2 text-danger"></i> PDF</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-excel me-2 text-success"></i> Excel</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-text me-2 text-primary"></i> CSV</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><h6 class="dropdown-header">Outros</h6></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-printer me-2"></i> Imprimir</a></li>
        </ul>
      </div>
    </div>
  `
};

// Story: Dropdown de Filtros
export const Filters = {
  name: '🔍 Filtros',
  render: () => `
    <div class="card">
      <div class="card-header d-flex gap-3 flex-wrap">
        <!-- Filtro Turma -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button">
            <i class="bi bi-people me-1"></i> Turma
          </button>
          <ul class="dropdown-menu show position-relative" style="display: block;">
            <li><a class="dropdown-item active" href="#"><i class="bi bi-check me-2"></i> Todas as turmas</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">5º Ano A</a></li>
            <li><a class="dropdown-item" href="#">5º Ano B</a></li>
            <li><a class="dropdown-item" href="#">5º Ano C</a></li>
            <li><a class="dropdown-item" href="#">6º Ano A</a></li>
            <li><a class="dropdown-item" href="#">6º Ano B</a></li>
          </ul>
        </div>
        
        <!-- Filtro Disciplina -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button">
            <i class="bi bi-book me-1"></i> Disciplina
          </button>
          <ul class="dropdown-menu show position-relative" style="display: block;">
            <li><a class="dropdown-item" href="#">Todas</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <span class="badge bg-primary me-2">MT</span> Matemática
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <span class="badge bg-info me-2">LP</span> Língua Portuguesa
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Filtro Período -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button">
            <i class="bi bi-calendar me-1"></i> Período
          </button>
          <ul class="dropdown-menu show position-relative" style="display: block;">
            <li><a class="dropdown-item" href="#">Hoje</a></li>
            <li><a class="dropdown-item active" href="#"><i class="bi bi-check me-2"></i> Esta semana</a></li>
            <li><a class="dropdown-item" href="#">Este mês</a></li>
            <li><a class="dropdown-item" href="#">Este bimestre</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-calendar-range me-2"></i> Personalizado...</a></li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <p class="text-muted mb-0">Conteúdo filtrado aparece aqui...</p>
      </div>
    </div>
  `
};

// Story: Menu de Perfil
export const ProfileMenu = {
  name: '👤 Menu de Perfil',
  render: () => `
    <div class="d-flex justify-content-end">
      <div class="dropdown">
        <button class="btn btn-link p-0" type="button">
          <div class="d-flex align-items-center gap-2">
            <div class="text-end d-none d-md-block">
              <div class="fw-semibold">Prof. João Silva</div>
              <small class="text-muted">Coordenador</small>
            </div>
            <div class="avatar">
              <span class="avatar-initial rounded-circle bg-primary">JS</span>
            </div>
          </div>
        </button>
        <ul class="dropdown-menu dropdown-menu-end show position-relative" style="display: block; min-width: 220px;">
          <li class="px-3 py-2">
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-lg">
                <span class="avatar-initial rounded-circle bg-primary">JS</span>
              </div>
              <div>
                <div class="fw-semibold">Prof. João Silva</div>
                <small class="text-muted">joao.silva@escola.com</small>
              </div>
            </div>
          </li>
          <li><hr class="dropdown-divider my-2"></li>
          <li>
            <a class="dropdown-item" href="#">
              <i class="bi bi-person me-2"></i> Meu Perfil
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <i class="bi bi-gear me-2"></i> Configurações
            </a>
          </li>
          <li>
            <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
              <span><i class="bi bi-bell me-2"></i> Notificações</span>
              <span class="badge bg-danger rounded-pill">3</span>
            </a>
          </li>
          <li><hr class="dropdown-divider my-2"></li>
          <li>
            <a class="dropdown-item" href="#">
              <i class="bi bi-question-circle me-2"></i> Ajuda
            </a>
          </li>
          <li>
            <a class="dropdown-item text-danger" href="#">
              <i class="bi bi-box-arrow-right me-2"></i> Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  `
};

// Story: Dropdown de Ações em Tabela
export const TableActions = {
  name: '📊 Ações em Tabela',
  render: () => `
    <div class="card">
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-primary">MS</span>
                  </div>
                  <span>Maria Silva</span>
                </div>
              </td>
              <td>5º Ano A</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="height: 6px; width: 100px;">
                    <div class="progress-bar bg-success" style="width: 85%"></div>
                  </div>
                  <small>85%</small>
                </div>
              </td>
              <td class="text-center">
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon btn-outline-secondary" type="button">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end show position-absolute" style="right: 20px; top: 0;">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i> Ver perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i> Relatório</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i> Editar</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-envelope me-2"></i> Enviar mensagem</a></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i> Excluir</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

// Story: Dropdown com Checkboxes
export const WithCheckboxes = {
  name: '☑️ Com Checkboxes',
  render: () => `
    <div class="d-flex gap-4">
      <!-- Seleção múltipla -->
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button">
          <i class="bi bi-funnel me-1"></i> Filtrar Colunas
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block; min-width: 200px;">
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="col1" checked>
              <label class="form-check-label" for="col1">Nome do Aluno</label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="col2" checked>
              <label class="form-check-label" for="col2">Turma</label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="col3" checked>
              <label class="form-check-label" for="col3">Progresso</label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="col4">
              <label class="form-check-label" for="col4">Pontos XP</label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="col5">
              <label class="form-check-label" for="col5">Último Acesso</label>
            </div>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li class="px-3 py-2">
            <button class="btn btn-sm btn-primary w-100">Aplicar</button>
          </li>
        </ul>
      </div>
      
      <!-- Status múltiplo -->
      <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button">
          Status: <span class="badge bg-label-primary ms-1">2</span>
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block; min-width: 180px;">
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="status1" checked>
              <label class="form-check-label d-flex align-items-center gap-2" for="status1">
                <span class="badge bg-success">&nbsp;</span> Ativos
              </label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="status2" checked>
              <label class="form-check-label d-flex align-items-center gap-2" for="status2">
                <span class="badge bg-warning">&nbsp;</span> Pendentes
              </label>
            </div>
          </li>
          <li class="px-3 py-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="status3">
              <label class="form-check-label d-flex align-items-center gap-2" for="status3">
                <span class="badge bg-secondary">&nbsp;</span> Inativos
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
};

// Story: Variantes de botão
export const ButtonVariants = {
  name: '🎨 Variantes',
  render: () => `
    <div class="d-flex gap-3 flex-wrap align-items-start">
      <!-- Primary -->
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button">Primary</button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Ação 1</a></li>
          <li><a class="dropdown-item" href="#">Ação 2</a></li>
        </ul>
      </div>
      
      <!-- Success -->
      <div class="dropdown">
        <button class="btn btn-success dropdown-toggle" type="button">Success</button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Ação 1</a></li>
          <li><a class="dropdown-item" href="#">Ação 2</a></li>
        </ul>
      </div>
      
      <!-- Warning -->
      <div class="dropdown">
        <button class="btn btn-warning dropdown-toggle" type="button">Warning</button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Ação 1</a></li>
          <li><a class="dropdown-item" href="#">Ação 2</a></li>
        </ul>
      </div>
      
      <!-- Danger -->
      <div class="dropdown">
        <button class="btn btn-danger dropdown-toggle" type="button">Danger</button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Ação 1</a></li>
          <li><a class="dropdown-item" href="#">Ação 2</a></li>
        </ul>
      </div>
      
      <!-- Split button -->
      <div class="btn-group">
        <button type="button" class="btn btn-primary">Ação Principal</button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu show position-relative" style="display: block;">
          <li><a class="dropdown-item" href="#">Ação Alternativa</a></li>
          <li><a class="dropdown-item" href="#">Outra Ação</a></li>
        </ul>
      </div>
    </div>
  `
};
