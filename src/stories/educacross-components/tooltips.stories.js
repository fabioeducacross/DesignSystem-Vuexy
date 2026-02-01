/**
 * @file Tooltips - Educacross Design System
 * @description Tooltips para dicas contextuais e informações adicionais
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Tooltips',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Tooltips

Tooltips exibem informações contextuais quando o usuário passa o mouse sobre um elemento.

### Uso no Educacross
- **Ícones de ajuda**: Explicações de funcionalidades
- **Campos de formulário**: Dicas de preenchimento
- **Métricas**: Detalhes sobre valores
- **Ações**: Descrição de botões

### Posições
- Top, Bottom, Left, Right
- Com seta indicadora
        `
      }
    }
  }
};

// Story: Posições básicas
export const Positions = {
  name: '📍 Posições',
  render: () => `
    <div class="d-flex justify-content-center align-items-center gap-5 py-5" style="min-height: 200px;">
      <!-- Top -->
      <div class="position-relative">
        <button class="btn btn-primary" id="tooltip-top">
          <i class="bi bi-arrow-up me-1"></i> Top
        </button>
        <div class="tooltip bs-tooltip-top show position-absolute" style="top: -45px; left: 50%; transform: translateX(-50%);">
          <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
          <div class="tooltip-inner">Tooltip no topo</div>
        </div>
      </div>
      
      <!-- Right -->
      <div class="position-relative">
        <button class="btn btn-success" id="tooltip-right">
          Right <i class="bi bi-arrow-right ms-1"></i>
        </button>
        <div class="tooltip bs-tooltip-end show position-absolute" style="top: 50%; right: -130px; transform: translateY(-50%);">
          <div class="tooltip-arrow" style="top: 50%; transform: translateY(-50%);"></div>
          <div class="tooltip-inner">Tooltip à direita</div>
        </div>
      </div>
      
      <!-- Bottom -->
      <div class="position-relative">
        <button class="btn btn-info" id="tooltip-bottom">
          <i class="bi bi-arrow-down me-1"></i> Bottom
        </button>
        <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -45px; left: 50%; transform: translateX(-50%);">
          <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
          <div class="tooltip-inner">Tooltip embaixo</div>
        </div>
      </div>
      
      <!-- Left -->
      <div class="position-relative">
        <button class="btn btn-warning" id="tooltip-left">
          <i class="bi bi-arrow-left me-1"></i> Left
        </button>
        <div class="tooltip bs-tooltip-start show position-absolute" style="top: 50%; left: -130px; transform: translateY(-50%);">
          <div class="tooltip-arrow" style="top: 50%; transform: translateY(-50%);"></div>
          <div class="tooltip-inner">Tooltip à esquerda</div>
        </div>
      </div>
    </div>
  `
};

// Story: Tooltip em ícones de ajuda
export const HelpIcons = {
  name: '❓ Ícones de Ajuda',
  render: () => `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4">Formulário de Configuração</h5>
        
        <div class="mb-4">
          <label class="form-label d-flex align-items-center gap-2">
            Tempo de Sessão
            <span class="position-relative d-inline-block">
              <i class="bi bi-question-circle text-muted" style="cursor: help;"></i>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -55px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">Tempo máximo de inatividade antes do logout</div>
              </div>
            </span>
          </label>
          <input type="number" class="form-control" value="30" style="max-width: 200px;">
        </div>
        
        <div class="mb-4">
          <label class="form-label d-flex align-items-center gap-2">
            Limite de Tentativas
            <span class="position-relative d-inline-block">
              <i class="bi bi-info-circle text-primary" style="cursor: help;"></i>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -55px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">Número de erros permitidos por questão</div>
              </div>
            </span>
          </label>
          <input type="number" class="form-control" value="3" style="max-width: 200px;">
        </div>
        
        <div class="mb-4">
          <label class="form-label d-flex align-items-center gap-2">
            Modo de Pontuação
            <span class="position-relative d-inline-block">
              <i class="bi bi-lightbulb text-warning" style="cursor: help;"></i>
              <div class="tooltip bs-tooltip-end show position-absolute" style="top: 50%; left: 25px; transform: translateY(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="top: 50%; transform: translateY(-50%);"></div>
                <div class="tooltip-inner">Padrão: 100 pontos por acerto</div>
              </div>
            </span>
          </label>
          <select class="form-select" style="max-width: 200px;">
            <option>Padrão</option>
            <option>Progressivo</option>
            <option>Personalizado</option>
          </select>
        </div>
      </div>
    </div>
  `
};

// Story: Tooltips em métricas
export const MetricTooltips = {
  name: '📊 Métricas',
  render: () => `
    <div class="row g-4">
      <!-- Card Pontos -->
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <div class="position-relative d-inline-block">
              <span class="badge bg-label-primary rounded-pill p-2 mb-3" style="cursor: help;">
                <i class="bi bi-star-fill fs-4"></i>
              </span>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">Pontos acumulados em jogos</div>
              </div>
            </div>
            <h3 class="mb-1">1.250</h3>
            <p class="text-muted mb-0">Pontos XP</p>
          </div>
        </div>
      </div>
      
      <!-- Card Acertos -->
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <div class="position-relative d-inline-block">
              <span class="badge bg-label-success rounded-pill p-2 mb-3" style="cursor: help;">
                <i class="bi bi-check-circle-fill fs-4"></i>
              </span>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">87% de acertos nos jogos</div>
              </div>
            </div>
            <h3 class="mb-1">87%</h3>
            <p class="text-muted mb-0">Taxa de Acerto</p>
          </div>
        </div>
      </div>
      
      <!-- Card Tempo -->
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <div class="position-relative d-inline-block">
              <span class="badge bg-label-info rounded-pill p-2 mb-3" style="cursor: help;">
                <i class="bi bi-clock-fill fs-4"></i>
              </span>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">Média: 2min por jogo</div>
              </div>
            </div>
            <h3 class="mb-1">45min</h3>
            <p class="text-muted mb-0">Tempo Total</p>
          </div>
        </div>
      </div>
      
      <!-- Card Ranking -->
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <div class="position-relative d-inline-block">
              <span class="badge bg-label-warning rounded-pill p-2 mb-3" style="cursor: help;">
                <i class="bi bi-trophy-fill fs-4"></i>
              </span>
              <div class="tooltip bs-tooltip-top show position-absolute" style="top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner">Top 5% da turma!</div>
              </div>
            </div>
            <h3 class="mb-1">#3</h3>
            <p class="text-muted mb-0">Ranking</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Tooltips em botões de ação
export const ActionTooltips = {
  name: '🔘 Botões de Ação',
  render: () => `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Lista de Alunos</h5>
      </div>
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
                <div class="progress" style="height: 6px; width: 100px;">
                  <div class="progress-bar bg-success" style="width: 85%"></div>
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-center gap-1">
                  <!-- Ver -->
                  <div class="position-relative d-inline-block">
                    <button class="btn btn-sm btn-icon btn-label-primary">
                      <i class="bi bi-eye"></i>
                    </button>
                    <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                      <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                      <div class="tooltip-inner">Ver perfil</div>
                    </div>
                  </div>
                  
                  <!-- Editar -->
                  <div class="position-relative d-inline-block">
                    <button class="btn btn-sm btn-icon btn-label-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                      <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                      <div class="tooltip-inner">Editar aluno</div>
                    </div>
                  </div>
                  
                  <!-- Relatório -->
                  <div class="position-relative d-inline-block">
                    <button class="btn btn-sm btn-icon btn-label-info">
                      <i class="bi bi-bar-chart"></i>
                    </button>
                    <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                      <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                      <div class="tooltip-inner">Ver relatório</div>
                    </div>
                  </div>
                  
                  <!-- Excluir -->
                  <div class="position-relative d-inline-block">
                    <button class="btn btn-sm btn-icon btn-label-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                    <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                      <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                      <div class="tooltip-inner">Excluir aluno</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

// Story: Tooltips com HTML
export const RichTooltips = {
  name: '📝 Tooltips Ricos',
  render: () => `
    <div class="row g-4">
      <!-- Tooltip com lista -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <div class="position-relative d-inline-block mb-3">
              <span class="badge bg-warning text-dark p-3" style="cursor: help;">
                <i class="bi bi-trophy-fill fs-3"></i>
              </span>
              <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -120px; left: 50%; transform: translateX(-50%); min-width: 180px;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner text-start">
                  <strong>Conquistas:</strong>
                  <ul class="mb-0 ps-3" style="font-size: 11px;">
                    <li>🥇 Primeiro lugar LP</li>
                    <li>🎯 100% em Matemática</li>
                    <li>⭐ 5 dias seguidos</li>
                  </ul>
                </div>
              </div>
            </div>
            <h5>Conquistas</h5>
            <p class="text-muted mb-0">3 troféus</p>
          </div>
        </div>
      </div>
      
      <!-- Tooltip com status -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <div class="position-relative d-inline-block mb-3">
              <span class="badge bg-success p-3" style="cursor: help;">
                <i class="bi bi-graph-up fs-3"></i>
              </span>
              <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -100px; left: 50%; transform: translateX(-50%); min-width: 160px;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner text-start">
                  <strong>Progresso Semanal</strong>
                  <div style="font-size: 11px;" class="mt-1">
                    <div>📈 +15% vs semana anterior</div>
                    <div>🎮 12 jogos completados</div>
                    <div>⏱️ 2h30min de estudo</div>
                  </div>
                </div>
              </div>
            </div>
            <h5>Evolução</h5>
            <p class="text-muted mb-0">+15% esta semana</p>
          </div>
        </div>
      </div>
      
      <!-- Tooltip com alerta -->
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <div class="position-relative d-inline-block mb-3">
              <span class="badge bg-danger p-3" style="cursor: help;">
                <i class="bi bi-exclamation-triangle-fill fs-3"></i>
              </span>
              <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -80px; left: 50%; transform: translateX(-50%); min-width: 180px;">
                <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                <div class="tooltip-inner text-start">
                  <strong>⚠️ Atenção Necessária</strong>
                  <div style="font-size: 11px;" class="mt-1">
                    3 alunos precisam de suporte em Matemática
                  </div>
                </div>
              </div>
            </div>
            <h5>Alertas</h5>
            <p class="text-muted mb-0">3 pendentes</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Casos de uso
export const UseCases = {
  name: '💡 Casos de Uso',
  render: () => `
    <div class="row g-4">
      <!-- Proficiência -->
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">Níveis de Proficiência com Tooltips</h6>
          </div>
          <div class="card-body">
            <div class="d-flex gap-4 flex-wrap">
              <!-- Avançado -->
              <div class="position-relative">
                <span class="badge bg-success px-3 py-2" style="cursor: help;">
                  <i class="bi bi-check-circle-fill me-1"></i> Avançado
                </span>
                <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -50px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">90-100% de aproveitamento</div>
                </div>
              </div>
              
              <!-- Proficiente -->
              <div class="position-relative">
                <span class="badge bg-primary px-3 py-2" style="cursor: help;">
                  <i class="bi bi-star-fill me-1"></i> Proficiente
                </span>
                <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -50px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">70-89% de aproveitamento</div>
                </div>
              </div>
              
              <!-- Básico -->
              <div class="position-relative">
                <span class="badge bg-warning text-dark px-3 py-2" style="cursor: help;">
                  <i class="bi bi-dash-circle me-1"></i> Básico
                </span>
                <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -50px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">50-69% de aproveitamento</div>
                </div>
              </div>
              
              <!-- Abaixo do Básico -->
              <div class="position-relative">
                <span class="badge bg-danger px-3 py-2" style="cursor: help;">
                  <i class="bi bi-x-circle me-1"></i> Abaixo do Básico
                </span>
                <div class="tooltip bs-tooltip-bottom show position-absolute" style="bottom: -50px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Menos de 50% de aproveitamento</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Toolbar com tooltips -->
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">Toolbar com Tooltips</h6>
          </div>
          <div class="card-body">
            <div class="btn-group" role="group">
              <div class="position-relative d-inline-block">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-zoom-in"></i>
                </button>
                <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Ampliar</div>
                </div>
              </div>
              
              <div class="position-relative d-inline-block">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-zoom-out"></i>
                </button>
                <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Reduzir</div>
                </div>
              </div>
              
              <div class="position-relative d-inline-block">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-fullscreen"></i>
                </button>
                <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Tela cheia</div>
                </div>
              </div>
              
              <div class="position-relative d-inline-block">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-printer"></i>
                </button>
                <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Imprimir</div>
                </div>
              </div>
              
              <div class="position-relative d-inline-block">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-download"></i>
                </button>
                <div class="tooltip bs-tooltip-top show position-absolute" style="top: -35px; left: 50%; transform: translateX(-50%); white-space: nowrap;">
                  <div class="tooltip-arrow" style="left: 50%; transform: translateX(-50%);"></div>
                  <div class="tooltip-inner">Download PDF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
