/**
 * Status Indicator - Indicadores de status
 * 
 * Para exibir estado de usuários, itens, conexões
 */

export default {
  title: 'Educacross/Components/StatusIndicator',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Online/Offline - Status de conexão
 */
export const OnlineOffline = {
  render: () => `
    <div>
      <h5 class="mb-4">Status Online/Offline</h5>
      
      <div class="d-flex flex-column gap-4">
        <!-- Dot indicators -->
        <div>
          <h6 class="text-muted mb-3">Indicadores Simples</h6>
          <div class="d-flex gap-4">
            <div class="d-flex align-items-center gap-2">
              <span class="bg-success rounded-circle" style="width: 10px; height: 10px;"></span>
              <span>Online</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="bg-warning rounded-circle" style="width: 10px; height: 10px;"></span>
              <span>Ausente</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="bg-danger rounded-circle" style="width: 10px; height: 10px;"></span>
              <span>Ocupado</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="bg-secondary rounded-circle" style="width: 10px; height: 10px;"></span>
              <span>Offline</span>
            </div>
          </div>
        </div>
        
        <!-- Com pulso -->
        <div>
          <h6 class="text-muted mb-3">Com Animação de Pulso</h6>
          <style>
            @keyframes pulse-dot {
              0% { box-shadow: 0 0 0 0 rgba(40, 199, 111, 0.7); }
              70% { box-shadow: 0 0 0 8px rgba(40, 199, 111, 0); }
              100% { box-shadow: 0 0 0 0 rgba(40, 199, 111, 0); }
            }
            .pulse-online {
              animation: pulse-dot 2s infinite;
            }
          </style>
          <div class="d-flex gap-4">
            <div class="d-flex align-items-center gap-2">
              <span class="bg-success rounded-circle pulse-online" style="width: 10px; height: 10px;"></span>
              <span>Conectado agora</span>
            </div>
          </div>
        </div>
        
        <!-- Com avatar -->
        <div>
          <h6 class="text-muted mb-3">Avatar com Status</h6>
          <div class="d-flex gap-4">
            <div class="position-relative">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background-color: #7367F0;">
                <span class="text-white fw-semibold">JS</span>
              </div>
              <span class="position-absolute bg-success rounded-circle border border-2 border-white" style="width: 14px; height: 14px; bottom: 0; right: 0;"></span>
            </div>
            
            <div class="position-relative">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background-color: #28C76F;">
                <span class="text-white fw-semibold">MC</span>
              </div>
              <span class="position-absolute bg-warning rounded-circle border border-2 border-white" style="width: 14px; height: 14px; bottom: 0; right: 0;"></span>
            </div>
            
            <div class="position-relative">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background-color: #FF9F43;">
                <span class="text-white fw-semibold">AB</span>
              </div>
              <span class="position-absolute bg-danger rounded-circle border border-2 border-white" style="width: 14px; height: 14px; bottom: 0; right: 0;"></span>
            </div>
            
            <div class="position-relative">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background-color: #82868B;">
                <span class="text-white fw-semibold">LF</span>
              </div>
              <span class="position-absolute bg-secondary rounded-circle border border-2 border-white" style="width: 14px; height: 14px; bottom: 0; right: 0;"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * TaskStatus - Status de tarefas/atividades
 */
export const TaskStatus = {
  render: () => `
    <div>
      <h5 class="mb-4">Status de Tarefas</h5>
      
      <div class="d-flex flex-wrap gap-2 mb-4">
        <span class="badge d-flex align-items-center gap-2" style="background-color: rgba(40, 199, 111, 0.15); color: #28C76F;">
          <i class="bi bi-check-circle-fill"></i> Concluído
        </span>
        <span class="badge d-flex align-items-center gap-2" style="background-color: rgba(0, 207, 232, 0.15); color: #00CFE8;">
          <i class="bi bi-play-circle-fill"></i> Em Andamento
        </span>
        <span class="badge d-flex align-items-center gap-2" style="background-color: rgba(255, 159, 67, 0.15); color: #FF9F43;">
          <i class="bi bi-clock-fill"></i> Pendente
        </span>
        <span class="badge d-flex align-items-center gap-2" style="background-color: rgba(234, 84, 85, 0.15); color: #EA5455;">
          <i class="bi bi-x-circle-fill"></i> Cancelado
        </span>
        <span class="badge d-flex align-items-center gap-2" style="background-color: rgba(130, 134, 139, 0.15); color: #82868B;">
          <i class="bi bi-pause-circle-fill"></i> Pausado
        </span>
      </div>
      
      <!-- Lista de tarefas com status -->
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Atividades da Turma</h6>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-controller fs-5 text-primary"></i>
              <div>
                <span>Tabuada Ninja</span>
                <small class="text-muted d-block">Matemática</small>
              </div>
            </div>
            <span class="badge bg-success-subtle text-success">
              <i class="bi bi-check-circle-fill me-1"></i>Concluído
            </span>
          </li>
          <li class="list-group-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-controller fs-5 text-primary"></i>
              <div>
                <span>Caça Palavras</span>
                <small class="text-muted d-block">Português</small>
              </div>
            </div>
            <span class="badge bg-info-subtle text-info">
              <i class="bi bi-play-circle-fill me-1"></i>Em Andamento
            </span>
          </li>
          <li class="list-group-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-controller fs-5 text-primary"></i>
              <div>
                <span>Quiz de Frações</span>
                <small class="text-muted d-block">Matemática</small>
              </div>
            </div>
            <span class="badge bg-warning-subtle text-warning">
              <i class="bi bi-clock-fill me-1"></i>Pendente
            </span>
          </li>
        </ul>
      </div>
    </div>
  `,
};

/**
 * ConnectionStatus - Status de conexão/sistema
 */
export const ConnectionStatus = {
  render: () => `
    <div>
      <h5 class="mb-4">Status de Conexão/Sistema</h5>
      
      <!-- Alerts de status -->
      <div class="d-flex flex-column gap-3 mb-4">
        <div class="alert alert-success d-flex align-items-center gap-2 mb-0">
          <i class="bi bi-wifi fs-5"></i>
          <span>Conectado - Sincronização em tempo real ativa</span>
        </div>
        
        <div class="alert alert-warning d-flex align-items-center gap-2 mb-0">
          <i class="bi bi-exclamation-triangle fs-5"></i>
          <span>Conexão instável - Alguns recursos podem estar indisponíveis</span>
        </div>
        
        <div class="alert alert-danger d-flex align-items-center gap-2 mb-0">
          <i class="bi bi-wifi-off fs-5"></i>
          <span>Sem conexão - Modo offline ativado</span>
        </div>
      </div>
      
      <!-- Status bar -->
      <div class="card">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div class="d-flex align-items-center gap-2">
              <span class="bg-success rounded-circle pulse-online" style="width: 8px; height: 8px;"></span>
              <small class="text-muted">API</small>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="bg-success rounded-circle" style="width: 8px; height: 8px;"></span>
              <small class="text-muted">Database</small>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="bg-warning rounded-circle" style="width: 8px; height: 8px;"></span>
              <small class="text-muted">CDN</small>
            </div>
          </div>
          <small class="text-muted">Última atualização: há 2 min</small>
        </div>
      </div>
    </div>
  `,
};

/**
 * EventStatus - Status de eventos
 */
export const EventStatus = {
  render: () => `
    <div>
      <h5 class="mb-4">Status de Eventos</h5>
      
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card h-100 border-success">
            <div class="card-body">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-success">
                  <i class="bi bi-broadcast"></i> AO VIVO
                </span>
              </div>
              <h6>Olimpíada de Matemática</h6>
              <small class="text-muted">Iniciou há 30 minutos</small>
              <div class="mt-2">
                <small class="text-success">
                  <i class="bi bi-people-fill me-1"></i>127 participantes online
                </small>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-warning">
            <div class="card-body">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-warning text-dark">
                  <i class="bi bi-clock"></i> EM BREVE
                </span>
              </div>
              <h6>Desafio de Português</h6>
              <small class="text-muted">Começa em 2 horas</small>
              <div class="mt-2">
                <small class="text-warning">
                  <i class="bi bi-person-check-fill me-1"></i>85 inscritos
                </small>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-secondary">
            <div class="card-body">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-secondary">
                  <i class="bi bi-check-circle"></i> ENCERRADO
                </span>
              </div>
              <h6>Quiz da Semana</h6>
              <small class="text-muted">Encerrou ontem</small>
              <div class="mt-2">
                <small class="text-secondary">
                  <i class="bi bi-trophy-fill me-1"></i>45 completaram
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Sizes - Tamanhos diferentes
 */
export const Sizes = {
  render: () => `
    <div>
      <h5 class="mb-4">Tamanhos</h5>
      
      <div class="d-flex align-items-end gap-5">
        <!-- XS -->
        <div class="text-center">
          <div class="d-flex align-items-center gap-1 mb-2">
            <span class="bg-success rounded-circle" style="width: 6px; height: 6px;"></span>
            <small class="text-muted">Online</small>
          </div>
          <small class="text-muted d-block">XS (6px)</small>
        </div>
        
        <!-- SM -->
        <div class="text-center">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="bg-success rounded-circle" style="width: 8px; height: 8px;"></span>
            <small>Online</small>
          </div>
          <small class="text-muted d-block">SM (8px)</small>
        </div>
        
        <!-- MD -->
        <div class="text-center">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="bg-success rounded-circle" style="width: 10px; height: 10px;"></span>
            <span>Online</span>
          </div>
          <small class="text-muted d-block">MD (10px)</small>
        </div>
        
        <!-- LG -->
        <div class="text-center">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="bg-success rounded-circle" style="width: 14px; height: 14px;"></span>
            <span>Online</span>
          </div>
          <small class="text-muted d-block">LG (14px)</small>
        </div>
      </div>
    </div>
  `,
};

/**
 * UseCases - Casos de uso
 */
export const UseCases = {
  render: () => `
    <div style="max-width: 400px;">
      <h5 class="mb-4">Casos de Uso</h5>
      
      <!-- Lista de usuários online -->
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-people me-2"></i>Turma Online</span>
          <span class="badge bg-success">8 online</span>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex align-items-center gap-3">
            <div class="position-relative">
              <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                <span class="text-white small">JS</span>
              </div>
              <span class="position-absolute bg-success rounded-circle border border-2 border-white pulse-online" style="width: 12px; height: 12px; bottom: 0; right: 0;"></span>
            </div>
            <div>
              <span>João Silva</span>
              <small class="text-success d-block">Jogando agora</small>
            </div>
          </li>
          <li class="list-group-item d-flex align-items-center gap-3">
            <div class="position-relative">
              <div class="rounded-circle bg-info d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                <span class="text-white small">MA</span>
              </div>
              <span class="position-absolute bg-warning rounded-circle border border-2 border-white" style="width: 12px; height: 12px; bottom: 0; right: 0;"></span>
            </div>
            <div>
              <span>Maria Alves</span>
              <small class="text-warning d-block">Ausente há 5 min</small>
            </div>
          </li>
          <li class="list-group-item d-flex align-items-center gap-3">
            <div class="position-relative">
              <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                <span class="text-white small">LC</span>
              </div>
              <span class="position-absolute bg-secondary rounded-circle border border-2 border-white" style="width: 12px; height: 12px; bottom: 0; right: 0;"></span>
            </div>
            <div>
              <span>Lucas Costa</span>
              <small class="text-muted d-block">Offline</small>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Status do jogo -->
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="mb-0">
              <i class="bi bi-controller me-2"></i>Tabuada Ninja
            </h6>
            <span class="badge bg-success-subtle text-success d-flex align-items-center gap-1">
              <span class="bg-success rounded-circle pulse-online" style="width: 6px; height: 6px;"></span>
              Em progresso
            </span>
          </div>
          
          <div class="progress mb-2" style="height: 8px;">
            <div class="progress-bar bg-primary" style="width: 65%;"></div>
          </div>
          <small class="text-muted">65% concluído • 13 de 20 questões</small>
        </div>
      </div>
    </div>
  `,
};
