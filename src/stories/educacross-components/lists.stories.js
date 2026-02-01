/**
 * @file Lists - Educacross Design System
 * @description Listas para exibição de itens e dados
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Lists',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Lists

Listas para exibir coleções de itens de forma organizada.

### Uso no Educacross
- **Alunos**: Lista de alunos com avatares
- **Atividades**: Histórico de ações recentes
- **Notificações**: Lista de alertas e mensagens
- **Rankings**: Classificação de jogadores

### Variantes
- List Group (bordas)
- Flush (sem bordas)
- Com ícones/avatares
- Interativa (clicável)
        `
      }
    }
  }
};

// Story: List Group básico
export const Basic = {
  name: '📋 Básico',
  render: () => `
    <ul class="list-group" style="max-width: 400px;">
      <li class="list-group-item">Primeiro item</li>
      <li class="list-group-item">Segundo item</li>
      <li class="list-group-item">Terceiro item</li>
      <li class="list-group-item">Quarto item</li>
      <li class="list-group-item">Quinto item</li>
    </ul>
  `
};

// Story: Lista de Alunos
export const StudentList = {
  name: '🎓 Lista de Alunos',
  render: () => `
    <div class="card" style="max-width: 450px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Alunos da Turma</h6>
        <span class="badge bg-primary">45</span>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-primary">MS</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Maria Silva</h6>
            <small class="text-muted">1.250 XP</small>
          </div>
          <span class="badge bg-success">Avançado</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-info">JO</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">João Oliveira</h6>
            <small class="text-muted">980 XP</small>
          </div>
          <span class="badge bg-primary">Proficiente</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-warning">AC</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Ana Costa</h6>
            <small class="text-muted">750 XP</small>
          </div>
          <span class="badge bg-warning text-dark">Básico</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-secondary">PS</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Pedro Santos</h6>
            <small class="text-muted">520 XP</small>
          </div>
          <span class="badge bg-danger">Atenção</span>
        </li>
      </ul>
      <div class="card-footer text-center">
        <a href="#" class="text-primary">Ver todos os alunos →</a>
      </div>
    </div>
  `
};

// Story: Lista de Atividades
export const ActivityList = {
  name: '📊 Atividades Recentes',
  render: () => `
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h6 class="mb-0">
          <i class="bi bi-clock-history me-2"></i>
          Atividades Recentes
        </h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="d-flex">
            <div class="flex-shrink-0">
              <span class="badge bg-success rounded-circle p-2">
                <i class="bi bi-check-lg"></i>
              </span>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="mb-1">Maria Silva completou um jogo</h6>
              <p class="text-muted mb-0 small">Aventura Matemática - 95% de acertos</p>
              <small class="text-muted">Há 5 minutos</small>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex">
            <div class="flex-shrink-0">
              <span class="badge bg-warning rounded-circle p-2">
                <i class="bi bi-trophy"></i>
              </span>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="mb-1">João Oliveira ganhou um troféu</h6>
              <p class="text-muted mb-0 small">Conquistou "Mestre da Adição"</p>
              <small class="text-muted">Há 15 minutos</small>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex">
            <div class="flex-shrink-0">
              <span class="badge bg-primary rounded-circle p-2">
                <i class="bi bi-person-plus"></i>
              </span>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="mb-1">Novo aluno cadastrado</h6>
              <p class="text-muted mb-0 small">Pedro Santos foi adicionado ao 5º Ano A</p>
              <small class="text-muted">Há 1 hora</small>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex">
            <div class="flex-shrink-0">
              <span class="badge bg-danger rounded-circle p-2">
                <i class="bi bi-exclamation"></i>
              </span>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="mb-1">Alerta de desempenho</h6>
              <p class="text-muted mb-0 small">3 alunos com taxa de acerto abaixo de 50%</p>
              <small class="text-muted">Há 2 horas</small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
};

// Story: Lista de Ranking
export const RankingList = {
  name: '🏆 Ranking',
  render: () => `
    <div class="card" style="max-width: 400px;">
      <div class="card-header bg-warning bg-opacity-10">
        <h6 class="mb-0 d-flex align-items-center">
          <i class="bi bi-trophy-fill text-warning me-2"></i>
          Top 5 da Semana
        </h6>
      </div>
      <ul class="list-group list-group-flush">
        <!-- 1º lugar -->
        <li class="list-group-item d-flex align-items-center bg-warning bg-opacity-10">
          <span class="badge bg-warning text-dark me-3 fs-6" style="width: 28px;">1º</span>
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-primary">MS</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Maria Silva</h6>
          </div>
          <span class="fw-bold text-warning">1.250 XP</span>
        </li>
        
        <!-- 2º lugar -->
        <li class="list-group-item d-flex align-items-center">
          <span class="badge bg-secondary me-3 fs-6" style="width: 28px;">2º</span>
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-success">JO</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">João Oliveira</h6>
          </div>
          <span class="fw-bold">1.180 XP</span>
        </li>
        
        <!-- 3º lugar -->
        <li class="list-group-item d-flex align-items-center">
          <span class="badge bg-danger bg-opacity-75 me-3 fs-6" style="width: 28px;">3º</span>
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-info">AC</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Ana Costa</h6>
          </div>
          <span class="fw-bold">1.050 XP</span>
        </li>
        
        <!-- 4º lugar -->
        <li class="list-group-item d-flex align-items-center">
          <span class="badge bg-light text-dark me-3 fs-6" style="width: 28px;">4º</span>
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-warning">PS</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Pedro Santos</h6>
          </div>
          <span class="text-muted">980 XP</span>
        </li>
        
        <!-- 5º lugar -->
        <li class="list-group-item d-flex align-items-center">
          <span class="badge bg-light text-dark me-3 fs-6" style="width: 28px;">5º</span>
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded-circle bg-danger">LM</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0">Lucas Martins</h6>
          </div>
          <span class="text-muted">920 XP</span>
        </li>
      </ul>
    </div>
  `
};

// Story: Lista de Notificações
export const NotificationList = {
  name: '🔔 Notificações',
  render: () => `
    <div class="card" style="max-width: 400px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">
          <i class="bi bi-bell me-2"></i>
          Notificações
        </h6>
        <a href="#" class="small">Marcar todas como lidas</a>
      </div>
      <ul class="list-group list-group-flush">
        <!-- Não lida -->
        <li class="list-group-item list-group-item-action bg-primary bg-opacity-10 border-start border-primary border-3">
          <div class="d-flex">
            <span class="badge bg-success rounded-circle p-2 me-3">
              <i class="bi bi-trophy-fill"></i>
            </span>
            <div>
              <h6 class="mb-1">Nova conquista!</h6>
              <p class="text-muted mb-0 small">Maria Silva ganhou o troféu "Mestre"</p>
              <small class="text-muted">Há 5 min</small>
            </div>
          </div>
        </li>
        
        <!-- Não lida -->
        <li class="list-group-item list-group-item-action bg-primary bg-opacity-10 border-start border-primary border-3">
          <div class="d-flex">
            <span class="badge bg-warning rounded-circle p-2 me-3">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </span>
            <div>
              <h6 class="mb-1">Alerta de atenção</h6>
              <p class="text-muted mb-0 small">3 alunos precisam de suporte</p>
              <small class="text-muted">Há 30 min</small>
            </div>
          </div>
        </li>
        
        <!-- Lida -->
        <li class="list-group-item list-group-item-action">
          <div class="d-flex">
            <span class="badge bg-info rounded-circle p-2 me-3">
              <i class="bi bi-info"></i>
            </span>
            <div>
              <h6 class="mb-1 text-muted">Relatório disponível</h6>
              <p class="text-muted mb-0 small">Relatório semanal gerado</p>
              <small class="text-muted">Ontem</small>
            </div>
          </div>
        </li>
        
        <!-- Lida -->
        <li class="list-group-item list-group-item-action">
          <div class="d-flex">
            <span class="badge bg-secondary rounded-circle p-2 me-3">
              <i class="bi bi-gear-fill"></i>
            </span>
            <div>
              <h6 class="mb-1 text-muted">Configurações atualizadas</h6>
              <p class="text-muted mb-0 small">Preferências da turma salvas</p>
              <small class="text-muted">2 dias atrás</small>
            </div>
          </div>
        </li>
      </ul>
      <div class="card-footer text-center">
        <a href="#">Ver todas as notificações</a>
      </div>
    </div>
  `
};

// Story: Lista com Checkboxes
export const CheckboxList = {
  name: '☑️ Com Checkboxes',
  render: () => `
    <div class="card" style="max-width: 400px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Selecionar Alunos</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="selectAll">
          <label class="form-check-label" for="selectAll">Todos</label>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="form-check d-flex align-items-center gap-3">
            <input class="form-check-input" type="checkbox" id="student1" checked>
            <div class="avatar avatar-sm">
              <span class="avatar-initial rounded-circle bg-primary">MS</span>
            </div>
            <label class="form-check-label flex-grow-1" for="student1">
              <span class="d-block">Maria Silva</span>
              <small class="text-muted">5º Ano A</small>
            </label>
          </div>
        </li>
        <li class="list-group-item">
          <div class="form-check d-flex align-items-center gap-3">
            <input class="form-check-input" type="checkbox" id="student2" checked>
            <div class="avatar avatar-sm">
              <span class="avatar-initial rounded-circle bg-info">JO</span>
            </div>
            <label class="form-check-label flex-grow-1" for="student2">
              <span class="d-block">João Oliveira</span>
              <small class="text-muted">5º Ano A</small>
            </label>
          </div>
        </li>
        <li class="list-group-item">
          <div class="form-check d-flex align-items-center gap-3">
            <input class="form-check-input" type="checkbox" id="student3">
            <div class="avatar avatar-sm">
              <span class="avatar-initial rounded-circle bg-warning">AC</span>
            </div>
            <label class="form-check-label flex-grow-1" for="student3">
              <span class="d-block">Ana Costa</span>
              <small class="text-muted">5º Ano B</small>
            </label>
          </div>
        </li>
        <li class="list-group-item">
          <div class="form-check d-flex align-items-center gap-3">
            <input class="form-check-input" type="checkbox" id="student4">
            <div class="avatar avatar-sm">
              <span class="avatar-initial rounded-circle bg-success">PS</span>
            </div>
            <label class="form-check-label flex-grow-1" for="student4">
              <span class="d-block">Pedro Santos</span>
              <small class="text-muted">5º Ano B</small>
            </label>
          </div>
        </li>
      </ul>
      <div class="card-footer">
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-check-lg me-1"></i> Aplicar Seleção (2)
        </button>
      </div>
    </div>
  `
};

// Story: Lista de Jogos
export const GameList = {
  name: '🎮 Lista de Jogos',
  render: () => `
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h6 class="mb-0">
          <i class="bi bi-controller me-2"></i>
          Jogos de Matemática
        </h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-action d-flex align-items-center">
          <span class="badge bg-primary p-2 me-3">
            <i class="bi bi-calculator fs-5"></i>
          </span>
          <div class="flex-grow-1">
            <h6 class="mb-0">Aventura dos Números</h6>
            <small class="text-muted">Adição e Subtração</small>
          </div>
          <div class="text-end">
            <div class="text-warning mb-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
            <small class="text-muted">250 jogadores</small>
          </div>
        </li>
        
        <li class="list-group-item list-group-item-action d-flex align-items-center">
          <span class="badge bg-success p-2 me-3">
            <i class="bi bi-puzzle fs-5"></i>
          </span>
          <div class="flex-grow-1">
            <h6 class="mb-0">Quebra-cabeça Matemático</h6>
            <small class="text-muted">Multiplicação</small>
          </div>
          <div class="text-end">
            <div class="text-warning mb-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <small class="text-muted">180 jogadores</small>
          </div>
        </li>
        
        <li class="list-group-item list-group-item-action d-flex align-items-center">
          <span class="badge bg-warning text-dark p-2 me-3">
            <i class="bi bi-lightning-fill fs-5"></i>
          </span>
          <div class="flex-grow-1">
            <h6 class="mb-0">Desafio Relâmpago</h6>
            <small class="text-muted">Operações Mistas</small>
          </div>
          <div class="text-end">
            <div class="text-warning mb-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star"></i>
            </div>
            <small class="text-muted">320 jogadores</small>
          </div>
        </li>
      </ul>
    </div>
  `
};
