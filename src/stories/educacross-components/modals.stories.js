/**
 * @file Modals - Educacross Design System
 * @description Modais para confirmações, alertas e formulários
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Modals',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Modals

Modais são janelas sobrepostas para ações que requerem atenção do usuário.

### Uso no Educacross
- **Confirmações**: Exclusão, logout, ações irreversíveis
- **Alertas**: Avisos importantes, erros, sucessos
- **Formulários**: Cadastro rápido, edição inline
- **Visualizações**: Detalhes, relatórios, previews

### Tamanhos
- Small (sm): Confirmações simples
- Default: Formulários médios
- Large (lg): Formulários complexos
- Extra Large (xl): Dashboards, relatórios
        `
      }
    }
  }
};

// Story: Modal de Confirmação
export const Confirmation = {
  name: '⚠️ Confirmação',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center pt-0">
            <div class="mb-4">
              <span class="badge bg-label-warning rounded-circle p-3">
                <i class="bi bi-exclamation-triangle fs-1"></i>
              </span>
            </div>
            <h4 class="mb-2">Confirmar Exclusão?</h4>
            <p class="text-muted mb-0">
              Você está prestes a excluir o aluno <strong>João Silva</strong>.<br>
              Esta ação não pode ser desfeita.
            </p>
          </div>
          <div class="modal-footer border-0 justify-content-center gap-2 pb-4">
            <button type="button" class="btn btn-outline-secondary px-4">Cancelar</button>
            <button type="button" class="btn btn-danger px-4">
              <i class="bi bi-trash me-1"></i> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal de Sucesso
export const Success = {
  name: '✅ Sucesso',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-body text-center py-5">
            <div class="mb-4">
              <span class="badge bg-success rounded-circle p-3">
                <i class="bi bi-check-lg fs-1 text-white"></i>
              </span>
            </div>
            <h4 class="mb-2 text-success">Sucesso!</h4>
            <p class="text-muted mb-4">
              O aluno foi cadastrado com sucesso.
            </p>
            <button type="button" class="btn btn-success px-5">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal de Erro
export const Error = {
  name: '❌ Erro',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-body text-center py-5">
            <div class="mb-4">
              <span class="badge bg-danger rounded-circle p-3">
                <i class="bi bi-x-lg fs-1 text-white"></i>
              </span>
            </div>
            <h4 class="mb-2 text-danger">Ops! Algo deu errado</h4>
            <p class="text-muted mb-4">
              Não foi possível salvar as alterações.<br>
              Por favor, tente novamente.
            </p>
            <button type="button" class="btn btn-danger px-4">
              <i class="bi bi-arrow-clockwise me-1"></i> Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal de Formulário
export const Form = {
  name: '📝 Formulário',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-person-plus me-2 text-primary"></i>
              Novo Aluno
            </h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" placeholder="Digite o nome do aluno">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Data de Nascimento</label>
                  <input type="date" class="form-control">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Turma <span class="text-danger">*</span></label>
                  <select class="form-select">
                    <option value="">Selecione...</option>
                    <option>5º Ano A</option>
                    <option>5º Ano B</option>
                    <option>5º Ano C</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">E-mail do Responsável</label>
                  <input type="email" class="form-control" placeholder="email@exemplo.com">
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="sendCredentials">
                    <label class="form-check-label" for="sendCredentials">
                      Enviar credenciais de acesso por e-mail
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary">Cancelar</button>
            <button type="button" class="btn btn-primary">
              <i class="bi bi-check-lg me-1"></i> Salvar Aluno
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal Grande (Relatório)
export const LargeReport = {
  name: '📊 Relatório (Large)',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-bar-chart-line me-2 text-primary"></i>
              Relatório de Desempenho - Maria Silva
            </h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Resumo -->
            <div class="row g-3 mb-4">
              <div class="col-md-3">
                <div class="card bg-label-primary">
                  <div class="card-body text-center py-3">
                    <h4 class="mb-1">1.250</h4>
                    <small>Pontos XP</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-label-success">
                  <div class="card-body text-center py-3">
                    <h4 class="mb-1">87%</h4>
                    <small>Taxa de Acerto</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-label-info">
                  <div class="card-body text-center py-3">
                    <h4 class="mb-1">45</h4>
                    <small>Jogos Completos</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-label-warning">
                  <div class="card-body text-center py-3">
                    <h4 class="mb-1">#3</h4>
                    <small>Ranking Turma</small>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Tabela de desempenho -->
            <h6 class="mb-3">Desempenho por Disciplina</h6>
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Disciplina</th>
                  <th>Jogos</th>
                  <th>Acertos</th>
                  <th>Tempo Médio</th>
                  <th>Proficiência</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <i class="bi bi-calculator me-2 text-primary"></i>
                    Matemática
                  </td>
                  <td>25</td>
                  <td>92%</td>
                  <td>3min 20s</td>
                  <td><span class="badge bg-success">Avançado</span></td>
                </tr>
                <tr>
                  <td>
                    <i class="bi bi-book me-2 text-info"></i>
                    Língua Portuguesa
                  </td>
                  <td>20</td>
                  <td>78%</td>
                  <td>4min 10s</td>
                  <td><span class="badge bg-primary">Proficiente</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary">
              <i class="bi bi-printer me-1"></i> Imprimir
            </button>
            <button type="button" class="btn btn-outline-primary">
              <i class="bi bi-download me-1"></i> Exportar PDF
            </button>
            <button type="button" class="btn btn-primary">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal de Loading
export const Loading = {
  name: '⏳ Loading',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-body text-center py-5">
            <div class="spinner-border text-primary mb-4" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
            <h5 class="mb-2">Processando...</h5>
            <p class="text-muted mb-0">
              Por favor, aguarde enquanto<br>salvamos as alterações.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Modal de Conquista
export const Achievement = {
  name: '🏆 Conquista',
  render: () => `
    <div class="modal d-block position-relative" style="z-index: 1;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body text-center py-5" style="background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);">
            <div class="mb-3">
              <img src="/vuexy/img/educacross/gamification/Trofeu-Ouro.svg" 
                   alt="Troféu de Ouro" 
                   style="width: 120px; height: 120px;"
                   onerror="this.outerHTML='<i class=\\'bi bi-trophy-fill text-warning\\' style=\\'font-size: 80px;\\'></i>'">
            </div>
            <h3 class="mb-2 text-dark">🎉 Parabéns!</h3>
            <h5 class="text-dark mb-3">Você conquistou um troféu!</h5>
            <div class="badge bg-dark text-warning px-4 py-2 mb-4">
              <i class="bi bi-star-fill me-1"></i>
              Mestre da Matemática
            </div>
            <p class="text-dark mb-4">
              Você completou todos os desafios de<br>
              Matemática com mais de 90% de acertos!
            </p>
            <button type="button" class="btn btn-dark px-5">
              <i class="bi bi-share me-1"></i> Compartilhar
            </button>
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
      <!-- Small -->
      <div>
        <h6 class="text-muted mb-2">Small (modal-sm)</h6>
        <div class="modal d-block position-relative" style="z-index: 1;">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">Modal Pequeno</h6>
                <button type="button" class="btn-close btn-close-sm"></button>
              </div>
              <div class="modal-body">
                <p class="mb-0">Ideal para confirmações simples e alertas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Default -->
      <div>
        <h6 class="text-muted mb-2">Default</h6>
        <div class="modal d-block position-relative" style="z-index: 1;">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">Modal Padrão</h6>
                <button type="button" class="btn-close"></button>
              </div>
              <div class="modal-body">
                <p class="mb-0">Tamanho padrão para formulários e conteúdo médio. Funciona bem na maioria dos casos de uso.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Large -->
      <div>
        <h6 class="text-muted mb-2">Large (modal-lg)</h6>
        <div class="modal d-block position-relative" style="z-index: 1;">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">Modal Grande</h6>
                <button type="button" class="btn-close"></button>
              </div>
              <div class="modal-body">
                <p class="mb-0">Para formulários complexos, tabelas e conteúdo extenso. Use quando precisar de mais espaço horizontal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
