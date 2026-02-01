/**
 * Empty State - Estados vazios
 * 
 * Para quando não há dados para exibir
 * Inspirado nos padrões do sistema Educacross
 */

export default {
  title: 'Educacross/Components/EmptyState',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Default - Estado vazio básico
 */
export const Default = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-inbox text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum item encontrado</h5>
          <p class="text-muted mb-4">
            Não há dados para exibir no momento.
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-2"></i>Adicionar Novo
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * NoStudents - Sem alunos
 */
export const NoStudents = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhum aluno cadastrado</h5>
          <p class="text-muted mb-4">
            Esta turma ainda não possui alunos matriculados.<br>
            Comece adicionando o primeiro aluno.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-primary">
              <i class="bi bi-person-plus me-2"></i>Adicionar Aluno
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-upload me-2"></i>Importar Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * NoActivities - Sem atividades
 */
export const NoActivities = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/metrics/Jogos.svg" alt="Jogos" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhuma atividade realizada</h5>
          <p class="text-muted mb-4">
            O aluno ainda não completou nenhuma atividade.<br>
            Incentive-o a começar sua jornada de aprendizado!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-controller me-2"></i>Ver Jogos Disponíveis
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * NoResults - Sem resultados de busca
 */
export const NoResults = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-search text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum resultado encontrado</h5>
          <p class="text-muted mb-4">
            Não encontramos resultados para "<strong>matemática 5º ano</strong>".<br>
            Tente usar termos diferentes ou remover filtros.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-outline-primary">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Limpar Filtros
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-question-circle me-2"></i>Ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * NoTrophies - Sem troféus/conquistas
 */
export const NoTrophies = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféu" style="width: 80px; height: 80px; opacity: 0.3; filter: grayscale(100%);">
          </div>
          <h5 class="text-muted mb-2">Nenhum troféu conquistado</h5>
          <p class="text-muted mb-4">
            Continue jogando e completando atividades<br>
            para ganhar seus primeiros troféus!
          </p>
          <div class="d-flex justify-content-center gap-3">
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Ouro</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Prata</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Bronze</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * NoEvents - Sem eventos
 */
export const NoEvents = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-calendar-x text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum evento programado</h5>
          <p class="text-muted mb-4">
            Não há eventos agendados para este período.<br>
            Crie um novo evento para engajar seus alunos!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-calendar-plus me-2"></i>Criar Evento
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * ErrorState - Estado de erro
 */
export const ErrorState = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card border-danger">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-exclamation-triangle text-danger" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-danger mb-2">Algo deu errado</h5>
          <p class="text-muted mb-4">
            Não foi possível carregar os dados.<br>
            Por favor, tente novamente.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-danger">
              <i class="bi bi-arrow-clockwise me-2"></i>Tentar Novamente
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-headset me-2"></i>Suporte
            </button>
          </div>
          <div class="mt-4">
            <small class="text-muted">Código do erro: ERR_NETWORK_500</small>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * OfflineState - Estado offline
 */
export const OfflineState = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="border-color: #6c757d;">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-wifi-off text-secondary" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Você está offline</h5>
          <p class="text-muted mb-4">
            Verifique sua conexão com a internet<br>
            para acessar este conteúdo.
          </p>
          <button class="btn btn-secondary">
            <i class="bi bi-arrow-clockwise me-2"></i>Verificar Conexão
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * ComingSoon - Em breve
 */
export const ComingSoon = {
  render: () => `
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="background: linear-gradient(135deg, #f8f9fa, #e9ecef);">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-rocket-takeoff" style="font-size: 64px; color: var(--edu-primary, #0C5257);"></i>
          </div>
          <h5 style="color: var(--edu-primary);" class="mb-2">Em Breve!</h5>
          <p class="text-muted mb-4">
            Estamos trabalhando em algo incrível.<br>
            Fique ligado para novidades!
          </p>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <img src="/vuexy/img/educacross/logos/Belinha.svg" alt="Belinha" style="width: 50px;">
            <span class="text-muted">A Belinha está preparando tudo para você!</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * InlineEmpty - Estado vazio inline (para tabelas)
 */
export const InlineEmpty = {
  render: () => `
    <div>
      <h5 class="mb-4">Estado Vazio Inline (para tabelas)</h5>
      
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Lista de Alunos</h6>
        </div>
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-inbox text-muted fs-1 d-block mb-2"></i>
                <span class="text-muted">Nenhum aluno encontrado</span>
                <button class="btn btn-sm btn-link">Adicionar aluno</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Resultados da Busca</h6>
          <span class="badge bg-secondary">0 resultados</span>
        </div>
        <div class="card-body text-center py-4">
          <div class="d-flex align-items-center justify-content-center gap-2 text-muted">
            <i class="bi bi-search"></i>
            <span>Nenhum resultado para "algebra avançada"</span>
          </div>
        </div>
      </div>
    </div>
  `,
};
