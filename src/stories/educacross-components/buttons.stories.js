/**
 * @file Buttons - Educacross Design System
 * @description Componentes de botões e ações
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Buttons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Buttons

Botões para ações e interações.

### Uso no Educacross
- **Ações primárias**: Salvar, Criar, Confirmar
- **Ações secundárias**: Cancelar, Voltar
- **Navegação**: Links de ação
- **Estados**: Loading, Disabled

### Variantes
- Solid / Outline / Text
- Tamanhos: sm, md, lg
- Com ícones
- Estados de loading
        `
      }
    }
  }
};

// Story: Variantes de cores
export const ColorVariants = {
  name: '🎨 Variantes de Cores',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Solid -->
      <div>
        <h6 class="text-muted mb-3">Solid</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-danger">Danger</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-dark">Dark</button>
          <button class="btn btn-light">Light</button>
        </div>
      </div>
      
      <!-- Outline -->
      <div>
        <h6 class="text-muted mb-3">Outline</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-primary">Primary</button>
          <button class="btn btn-outline-secondary">Secondary</button>
          <button class="btn btn-outline-success">Success</button>
          <button class="btn btn-outline-danger">Danger</button>
          <button class="btn btn-outline-warning">Warning</button>
          <button class="btn btn-outline-info">Info</button>
          <button class="btn btn-outline-dark">Dark</button>
        </div>
      </div>
      
      <!-- Text/Link -->
      <div>
        <h6 class="text-muted mb-3">Link/Text</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-link">Link Button</button>
          <button class="btn btn-link text-success">Success Link</button>
          <button class="btn btn-link text-danger">Danger Link</button>
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
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-primary btn-sm">Pequeno (sm)</button>
        <button class="btn btn-primary">Padrão</button>
        <button class="btn btn-primary btn-lg">Grande (lg)</button>
      </div>
      
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-outline-primary btn-sm">Pequeno</button>
        <button class="btn btn-outline-primary">Padrão</button>
        <button class="btn btn-outline-primary btn-lg">Grande</button>
      </div>
    </div>
  `
};

// Story: Com ícones
export const WithIcons = {
  name: '🔣 Com Ícones',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Ícone à esquerda -->
      <div>
        <h6 class="text-muted mb-3">Ícone à Esquerda</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary">
            <i class="bi bi-plus-lg me-1"></i> Adicionar
          </button>
          <button class="btn btn-success">
            <i class="bi bi-check-lg me-1"></i> Salvar
          </button>
          <button class="btn btn-danger">
            <i class="bi bi-trash me-1"></i> Excluir
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
        </div>
      </div>
      
      <!-- Ícone à direita -->
      <div>
        <h6 class="text-muted mb-3">Ícone à Direita</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary">
            Próximo <i class="bi bi-arrow-right ms-1"></i>
          </button>
          <button class="btn btn-outline-primary">
            Ver Mais <i class="bi bi-chevron-right ms-1"></i>
          </button>
          <button class="btn btn-link">
            Saiba Mais <i class="bi bi-box-arrow-up-right ms-1"></i>
          </button>
        </div>
      </div>
      
      <!-- Apenas ícone -->
      <div>
        <h6 class="text-muted mb-3">Icon Only</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary btn-icon">
            <i class="bi bi-plus-lg"></i>
          </button>
          <button class="btn btn-outline-secondary btn-icon">
            <i class="bi bi-gear"></i>
          </button>
          <button class="btn btn-outline-danger btn-icon">
            <i class="bi bi-trash"></i>
          </button>
          <button class="btn btn-light btn-icon">
            <i class="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <style>
          .btn-icon {
            width: 38px;
            height: 38px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </div>
    </div>
  `
};

// Story: Estados
export const States = {
  name: '🔄 Estados',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Normal vs Disabled -->
      <div>
        <h6 class="text-muted mb-3">Normal vs Desabilitado</h6>
        <div class="d-flex flex-wrap gap-3">
          <div class="d-flex flex-column align-items-center gap-2">
            <button class="btn btn-primary">Normal</button>
            <small class="text-muted">Clicável</small>
          </div>
          <div class="d-flex flex-column align-items-center gap-2">
            <button class="btn btn-primary" disabled>Disabled</button>
            <small class="text-muted">Desabilitado</small>
          </div>
        </div>
      </div>
      
      <!-- Loading -->
      <div>
        <h6 class="text-muted mb-3">Loading States</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Salvando...
          </button>
          <button class="btn btn-success" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Processando...
          </button>
          <button class="btn btn-outline-primary" disabled>
            <span class="spinner-grow spinner-grow-sm me-2" role="status"></span>
            Carregando...
          </button>
        </div>
      </div>
      
      <!-- Active -->
      <div>
        <h6 class="text-muted mb-3">Active</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary active">Ativo</button>
          <button class="btn btn-outline-primary active">Ativo</button>
        </div>
      </div>
    </div>
  `
};

// Story: Grupos de botões
export const ButtonGroups = {
  name: '👥 Button Groups',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Básico -->
      <div>
        <h6 class="text-muted mb-3">Básico</h6>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-primary active">Dia</button>
          <button type="button" class="btn btn-outline-primary">Semana</button>
          <button type="button" class="btn btn-outline-primary">Mês</button>
        </div>
      </div>
      
      <!-- Com ícones -->
      <div>
        <h6 class="text-muted mb-3">Com Ícones</h6>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <i class="bi bi-grid"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary active">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
      
      <!-- Vertical -->
      <div>
        <h6 class="text-muted mb-3">Vertical</h6>
        <div class="btn-group-vertical" role="group">
          <button type="button" class="btn btn-outline-primary">
            <i class="bi bi-house me-2"></i> Dashboard
          </button>
          <button type="button" class="btn btn-outline-primary active">
            <i class="bi bi-people me-2"></i> Alunos
          </button>
          <button type="button" class="btn btn-outline-primary">
            <i class="bi bi-bar-chart me-2"></i> Relatórios
          </button>
        </div>
      </div>
      
      <!-- Toolbar -->
      <div>
        <h6 class="text-muted mb-3">Toolbar</h6>
        <div class="btn-toolbar gap-2" role="toolbar">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-type-bold"></i></button>
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-type-italic"></i></button>
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-type-underline"></i></button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-text-left"></i></button>
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-text-center"></i></button>
            <button type="button" class="btn btn-outline-secondary"><i class="bi bi-text-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Botões Educacross
export const EducacrossActions = {
  name: '🎮 Ações Educacross',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Ações de aluno -->
      <div>
        <h6 class="text-muted mb-3">Ações de Aluno</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary">
            <i class="bi bi-person-plus me-1"></i> Adicionar Aluno
          </button>
          <button class="btn btn-outline-primary">
            <i class="bi bi-upload me-1"></i> Importar Alunos
          </button>
          <button class="btn btn-outline-success">
            <i class="bi bi-envelope me-1"></i> Enviar Credenciais
          </button>
        </div>
      </div>
      
      <!-- Ações de turma -->
      <div>
        <h6 class="text-muted mb-3">Ações de Turma</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-success">
            <i class="bi bi-plus-circle me-1"></i> Nova Turma
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i> Editar Turma
          </button>
          <button class="btn btn-outline-info">
            <i class="bi bi-people me-1"></i> Gerenciar Alunos
          </button>
        </div>
      </div>
      
      <!-- Relatórios -->
      <div>
        <h6 class="text-muted mb-3">Relatórios</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-info text-white">
            <i class="bi bi-bar-chart me-1"></i> Ver Relatório
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-file-earmark-pdf me-1"></i> Exportar PDF
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-file-earmark-excel me-1"></i> Exportar Excel
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-printer me-1"></i> Imprimir
          </button>
        </div>
      </div>
      
      <!-- Jogos -->
      <div>
        <h6 class="text-muted mb-3">Jogos e Atividades</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-success btn-lg">
            <i class="bi bi-play-fill me-1"></i> Jogar Agora
          </button>
          <button class="btn btn-warning">
            <i class="bi bi-arrow-repeat me-1"></i> Tentar Novamente
          </button>
          <button class="btn btn-outline-primary">
            <i class="bi bi-skip-forward me-1"></i> Próximo Jogo
          </button>
        </div>
      </div>
    </div>
  `
};

// Story: Split button dropdown
export const SplitButtons = {
  name: '🔽 Split Buttons',
  render: () => `
    <div class="d-flex flex-wrap gap-3">
      <!-- Primary -->
      <div class="btn-group">
        <button type="button" class="btn btn-primary">
          <i class="bi bi-download me-1"></i> Exportar
        </button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-pdf me-2"></i>PDF</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-excel me-2"></i>Excel</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-file-text me-2"></i>CSV</a></li>
        </ul>
      </div>
      
      <!-- Success -->
      <div class="btn-group">
        <button type="button" class="btn btn-success">
          <i class="bi bi-save me-1"></i> Salvar
        </button>
        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Salvar e continuar</a></li>
          <li><a class="dropdown-item" href="#">Salvar e fechar</a></li>
          <li><a class="dropdown-item" href="#">Salvar como rascunho</a></li>
        </ul>
      </div>
      
      <!-- Outline -->
      <div class="btn-group">
        <button type="button" class="btn btn-outline-secondary">
          <i class="bi bi-share me-1"></i> Compartilhar
        </button>
        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"><i class="bi bi-link-45deg me-2"></i>Copiar link</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-envelope me-2"></i>Enviar por e-mail</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-whatsapp me-2"></i>WhatsApp</a></li>
        </ul>
      </div>
    </div>
  `
};

// Story: Full width
export const FullWidth = {
  name: '↔️ Full Width',
  render: () => `
    <div class="d-flex flex-column gap-3" style="max-width: 400px;">
      <button class="btn btn-primary w-100">
        <i class="bi bi-box-arrow-in-right me-2"></i> Entrar
      </button>
      
      <button class="btn btn-outline-secondary w-100">
        <i class="bi bi-google me-2"></i> Entrar com Google
      </button>
      
      <button class="btn btn-success w-100 btn-lg">
        <i class="bi bi-play-fill me-2"></i> Começar a Jogar
      </button>
      
      <div class="d-grid gap-2 d-md-flex">
        <button class="btn btn-outline-secondary flex-fill">Cancelar</button>
        <button class="btn btn-primary flex-fill">Confirmar</button>
      </div>
    </div>
  `
};
