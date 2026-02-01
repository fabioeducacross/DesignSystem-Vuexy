/**
 * @file Breadcrumbs - Educacross Design System
 * @description Navegação hierárquica para orientação do usuário
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Breadcrumbs',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Breadcrumbs

Navegação hierárquica que mostra o caminho até a página atual.

### Uso no Educacross
- **Navegação profunda**: Turma > Aluno > Relatório
- **Filtros aplicados**: Dashboard > Matemática > 5º Ano
- **Administração**: Configurações > Usuários > Editar

### Variantes
- Padrão (com /)
- Com setas
- Com ícones
- Responsivo (truncado)
        `
      }
    }
  }
};

// Story: Breadcrumb básico
export const Basic = {
  name: '📍 Básico',
  render: () => `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Início</a></li>
        <li class="breadcrumb-item"><a href="#">Turmas</a></li>
        <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
        <li class="breadcrumb-item active" aria-current="page">Alunos</li>
      </ol>
    </nav>
  `
};

// Story: Com ícones
export const WithIcons = {
  name: '🏠 Com Ícones',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Com ícone home -->
      <div>
        <h6 class="text-muted mb-2">Com Ícone Home</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
      </div>
      
      <!-- Com ícones em cada item -->
      <div>
        <h6 class="text-muted mb-2">Ícones em Cada Item</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house me-1"></i> Início</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-people me-1"></i> Turmas</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-folder me-1"></i> 5º Ano A</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <i class="bi bi-person me-1"></i> Alunos
            </li>
          </ol>
        </nav>
      </div>
    </div>
  `
};

// Story: Variantes de separador
export const Separators = {
  name: '➡️ Separadores',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Padrão (/) -->
      <div>
        <h6 class="text-muted mb-2">Padrão (/)</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Seta (>) -->
      <div>
        <h6 class="text-muted mb-2">Seta (>)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Chevron (›) -->
      <div>
        <h6 class="text-muted mb-2">Chevron (›)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '›';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Bullet (•) -->
      <div>
        <h6 class="text-muted mb-2">Bullet (•)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '•';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
    </div>
  `
};

// Story: Em contexto de página
export const InPageHeader = {
  name: '📄 No Cabeçalho',
  render: () => `
    <div class="card">
      <div class="card-body">
        <!-- Breadcrumb + título -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
        
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4 class="mb-1">Lista de Alunos</h4>
            <p class="text-muted mb-0">Gerencie os alunos da turma 5º Ano A</p>
          </div>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-1"></i> Novo Aluno
          </button>
        </div>
      </div>
    </div>
  `
};

// Story: Breadcrumb com dropdown
export const WithDropdown = {
  name: '📂 Com Dropdown',
  render: () => `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#"><i class="bi bi-house"></i></a>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              Turmas
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%;">
              <li><a class="dropdown-item" href="#">Todas as Turmas</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">5º Ano A</a></li>
              <li><a class="dropdown-item" href="#">5º Ano B</a></li>
              <li><a class="dropdown-item" href="#">6º Ano A</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              5º Ano A
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%; left: 0;">
              <li><a class="dropdown-item active" href="#">Alunos</a></li>
              <li><a class="dropdown-item" href="#">Jogos</a></li>
              <li><a class="dropdown-item" href="#">Relatórios</a></li>
              <li><a class="dropdown-item" href="#">Configurações</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Maria Silva</li>
      </ol>
    </nav>
  `
};

// Story: Casos de uso Educacross
export const UseCases = {
  name: '💡 Casos de Uso',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Perfil de aluno -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Turmas</a></li>
              <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
              <li class="breadcrumb-item active">Maria Silva</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Relatório -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Relatórios</a></li>
              <li class="breadcrumb-item"><a href="#">Desempenho</a></li>
              <li class="breadcrumb-item active">Matemática - Janeiro 2024</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Jogo -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Jogos</a></li>
              <li class="breadcrumb-item"><a href="#">Matemática</a></li>
              <li class="breadcrumb-item active">Aventura dos Números</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Configurações -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Configurações</a></li>
              <li class="breadcrumb-item"><a href="#">Escola</a></li>
              <li class="breadcrumb-item active">Dados Gerais</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  `
};
