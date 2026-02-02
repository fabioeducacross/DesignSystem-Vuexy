/**
 * SimpleTab - Tabs Simples para Navegação
 * =========================================
 * Componente de tabs simples para navegação entre
 * diferentes visualizações em relatórios e perfis.
 * 
 * @component SimpleTab
 * @usage Relatórios de professor, perfil de aluno, filtros
 */

export default {
  title: 'Educacross Components V2/SimpleTab',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'boxed'],
      description: 'Estilo visual das tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação das tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho das tabs',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs simples para navegação entre seções, com suporte a ícones, orientação vertical/horizontal e navegação por teclado.',
      },
    },
  },
};

// Estilos Figma CSS
const componentStyles = `
/* Tabs container */
.simple-tabs {
  display: flex;
  flex-direction: column;
}

.simple-tabs.orientation-vertical {
  flex-direction: row;
  gap: 24px;
}

/* Tab list */
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid #ebe9f1;
  position: relative;
}

.simple-tabs.orientation-vertical .tab-list {
  flex-direction: column;
  border-bottom: none;
  border-right: 2px solid #ebe9f1;
  gap: 8px;
  min-width: 200px;
}

.tab-list.variant-pills {
  border-bottom: none;
  gap: 8px;
  background: #f8f8f8;
  padding: 4px;
  border-radius: 8px;
}

.tab-list.variant-underline {
  border-bottom: 1px solid #ebe9f1;
}

.tab-list.variant-boxed {
  border-bottom: none;
  gap: 8px;
}

/* Tab button */
.tab-button {
  padding: 12px 20px;
  background: none;
  border: none;
  color: #6e6b7b;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.tab-button:hover {
  color: #7367f0;
  background: rgba(115, 103, 240, 0.08);
}

.tab-button.active {
  color: #7367f0;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #7367f0;
}

.simple-tabs.orientation-vertical .tab-button.active::after {
  bottom: 0;
  right: -2px;
  left: auto;
  top: 0;
  width: 2px;
  height: 100%;
}

/* Variant: Pills */
.tab-list.variant-pills .tab-button {
  border-radius: 6px;
  padding: 8px 16px;
}

.tab-list.variant-pills .tab-button.active {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.tab-list.variant-pills .tab-button.active::after {
  display: none;
}

/* Variant: Underline */
.tab-list.variant-underline .tab-button {
  padding-bottom: 12px;
}

.tab-list.variant-underline .tab-button.active::after {
  height: 3px;
  border-radius: 2px 2px 0 0;
}

/* Variant: Boxed */
.tab-list.variant-boxed .tab-button {
  border: 1px solid #ebe9f1;
  border-radius: 6px;
  padding: 10px 16px;
  background: white;
}

.tab-list.variant-boxed .tab-button:hover {
  border-color: #7367f0;
}

.tab-list.variant-boxed .tab-button.active {
  background: #7367f0;
  color: white;
  border-color: #7367f0;
}

.tab-list.variant-boxed .tab-button.active::after {
  display: none;
}

/* Sizes */
.tab-button.size-sm {
  padding: 8px 16px;
  font-size: 13px;
}

.tab-button.size-lg {
  padding: 14px 24px;
  font-size: 15px;
}

/* Icons */
.tab-button .material-symbols-outlined {
  font-size: 18px;
}

.tab-button.size-sm .material-symbols-outlined {
  font-size: 16px;
}

.tab-button.size-lg .material-symbols-outlined {
  font-size: 20px;
}

/* Badge count */
.tab-badge {
  background: #ebe9f1;
  color: #6e6b7b;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 4px;
}

.tab-button.active .tab-badge {
  background: #7367f0;
  color: white;
}

.tab-list.variant-pills .tab-button.active .tab-badge {
  background: #7367f0;
  color: white;
}

.tab-list.variant-boxed .tab-button.active .tab-badge {
  background: white;
  color: #7367f0;
}

/* Tab panel */
.tab-panel {
  padding: 24px 0;
  display: none;
}

.tab-panel.active {
  display: block;
}

.simple-tabs.orientation-vertical .tab-panel {
  flex: 1;
  padding: 0;
}

/* Compact mode */
.simple-tabs.compact .tab-button {
  padding: 8px 12px;
  font-size: 13px;
}

.simple-tabs.compact .tab-panel {
  padding: 16px 0;
}

/* Focus styles for keyboard navigation */
.tab-button:focus {
  outline: 2px solid #7367f0;
  outline-offset: 2px;
}

.tab-button:focus:not(:focus-visible) {
  outline: none;
}
`;

// Helper: Render Tab Button
const renderTab = (label, active = false, icon = null, badge = null, size = 'md') => `
<button class="tab-button ${active ? 'active' : ''} size-${size}" role="tab" aria-selected="${active}">
  ${icon ? `<span class="material-symbols-outlined">${icon}</span>` : ''}
  <span>${label}</span>
  ${badge ? `<span class="tab-badge">${badge}</span>` : ''}
</button>
`;

// Helper: Render Tab Panel
const renderPanel = (content, active = false) => `
<div class="tab-panel ${active ? 'active' : ''}" role="tabpanel">
  ${content}
</div>
`;

// ========== STORIES ==========

export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${renderTab('Visão Geral', true)}
        ${renderTab('Desempenho', false)}
        ${renderTab('Atividades', false)}
        ${renderTab('Relatórios', false)}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>Visão Geral</h5>
            <p class="text-muted">Conteúdo da aba Visão Geral...</p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const Multiple = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${renderTab('Resumo', true)}
        ${renderTab('Matemática', false)}
        ${renderTab('Português', false)}
        ${renderTab('Ciências', false)}
        ${renderTab('História', false)}
        ${renderTab('Geografia', false)}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>Resumo Geral</h5>
            <div class="row">
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-primary mb-0">28</h3>
                <p class="text-muted mb-0">Alunos</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-success mb-0">85%</h3>
                <p class="text-muted mb-0">Aproveitamento</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-info mb-0">142</h3>
                <p class="text-muted mb-0">Atividades</p>
              </div>
            </div>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const WithIcons = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${renderTab('Dashboard', true, 'dashboard')}
        ${renderTab('Alunos', false, 'groups', '28')}
        ${renderTab('Missões', false, 'assignment', '12')}
        ${renderTab('Relatórios', false, 'bar_chart')}
        ${renderTab('Configurações', false, 'settings')}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>📊 Dashboard do Professor</h5>
            <p class="text-muted">Visão geral de todas as turmas e atividades...</p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const Vertical = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs orientation-vertical">
      <div class="tab-list" role="tablist">
        ${renderTab('Perfil', true, 'person')}
        ${renderTab('Segurança', false, 'lock')}
        ${renderTab('Notificações', false, 'notifications', '3')}
        ${renderTab('Privacidade', false, 'shield')}
        ${renderTab('Ajuda', false, 'help')}
      </div>
      <div>
        ${renderPanel(`
          <div class="card">
            <div class="card-body">
              <h5>Informações do Perfil</h5>
              <div class="mb-3">
                <label class="form-label">Nome Completo</label>
                <input type="text" class="form-control" value="Maria Silva Santos" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="maria@escola.edu.br" />
              </div>
              <button class="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        `, true)}
      </div>
    </div>
  `,
};

export const Compact = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs compact">
      <div class="tab-list" role="tablist">
        ${renderTab('Hoje', true, null, null, 'sm')}
        ${renderTab('Esta Semana', false, null, null, 'sm')}
        ${renderTab('Este Mês', false, null, null, 'sm')}
        ${renderTab('Este Ano', false, null, null, 'sm')}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <p class="text-muted mb-0">Atividades de hoje: <strong>12 concluídas</strong></p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const Pills = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-pills" role="tablist">
        ${renderTab('Todas', true, null, '24')}
        ${renderTab('Ativas', false, null, '8')}
        ${renderTab('Pendentes', false, null, '12')}
        ${renderTab('Concluídas', false, null, '4')}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>Todas as Missões (24)</h5>
            <p class="text-muted">Lista completa de missões...</p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const Underline = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-underline" role="tablist">
        ${renderTab('Turmas', true, 'groups')}
        ${renderTab('Disciplinas', false, 'menu_book')}
        ${renderTab('Alunos', false, 'person')}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>Gerenciar Turmas</h5>
            <p class="text-muted">Lista de todas as turmas...</p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const Boxed = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-boxed" role="tablist">
        ${renderTab('Proficiência', true, 'trending_up')}
        ${renderTab('Frequência', false, 'calendar_today')}
        ${renderTab('Ranking', false, 'emoji_events')}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>📊 Relatório de Proficiência</h5>
            <p class="text-muted">Análise de proficiência dos alunos...</p>
          </div>
        </div>
      `, true)}
    </div>
  `,
};

export const RelatorioProfessor = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 1000px;">
      <div class="card-header">
        <h5 class="mb-0">Relatórios - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list" role="tablist">
            ${renderTab('Desempenho', true, 'bar_chart')}
            ${renderTab('Proficiência', false, 'trending_up')}
            ${renderTab('Atividades', false, 'assignment', '142')}
            ${renderTab('Frequência', false, 'calendar_today')}
          </div>
          ${renderPanel(`
            <div class="row g-3">
              <div class="col-md-3">
                <div class="card bg-light-primary text-center">
                  <div class="card-body">
                    <h3 class="text-primary mb-1">85%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Média Geral</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-success text-center">
                  <div class="card-body">
                    <h3 class="text-success mb-1">28</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Alunos</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-info text-center">
                  <div class="card-body">
                    <h3 class="text-info mb-1">142</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Atividades</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-warning text-center">
                  <div class="card-body">
                    <h3 class="text-warning mb-1">92%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Frequência</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <div class="card-body">
                <h6 class="mb-3">Desempenho por Disciplina</h6>
                <p class="text-muted">Gráfico de desempenho...</p>
              </div>
            </div>
          `, true)}
        </div>
      </div>
    </div>
  `,
};

export const PerfilAluno = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 900px;">
      <div class="card-header">
        <h5 class="mb-0">Ana Carolina Silva - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list variant-underline" role="tablist">
            ${renderTab('Visão Geral', true, 'dashboard')}
            ${renderTab('Atividades', false, 'assignment', '24')}
            ${renderTab('Conquistas', false, 'emoji_events', '12')}
            ${renderTab('Relatórios', false, 'bar_chart')}
            ${renderTab('Histórico', false, 'history')}
          </div>
          ${renderPanel(`
            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-primary mb-1">985</h3>
                    <p class="mb-0 text-muted">Pontos XP</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-success mb-1">87%</h3>
                    <p class="mb-0 text-muted">Taxa de Acerto</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-info mb-1">1º</h3>
                    <p class="mb-0 text-muted">Ranking Turma</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h6 class="mb-3">Progresso Recente</h6>
                <p class="text-muted">Últimas atividades e conquistas...</p>
              </div>
            </div>
          `, true)}
        </div>
      </div>
    </div>
  `,
};

export const ComKeyboardNavigation = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${renderTab('Tab 1', true)}
        ${renderTab('Tab 2', false)}
        ${renderTab('Tab 3', false)}
        ${renderTab('Tab 4', false)}
      </div>
      ${renderPanel(`
        <div class="card">
          <div class="card-body">
            <h5>Navegação por Teclado</h5>
            <p class="text-muted mb-2">Use as teclas para navegar:</p>
            <ul class="text-muted">
              <li><kbd>←</kbd> <kbd>→</kbd> - Navegar entre tabs (horizontal)</li>
              <li><kbd>↑</kbd> <kbd>↓</kbd> - Navegar entre tabs (vertical)</li>
              <li><kbd>Home</kbd> - Primeira tab</li>
              <li><kbd>End</kbd> - Última tab</li>
              <li><kbd>Enter</kbd> ou <kbd>Space</kbd> - Ativar tab</li>
            </ul>
          </div>
        </div>
      `, true)}
    </div>
    <script>
      // Exemplo de keyboard navigation (não funcional no Storybook, apenas demonstração)
      document.addEventListener('keydown', (e) => {
        const tabs = document.querySelectorAll('.tab-button');
        const activeTab = document.querySelector('.tab-button.active');
        const activeIndex = Array.from(tabs).indexOf(activeTab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const nextIndex = (activeIndex + 1) % tabs.length;
          tabs[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].click();
        } else if (e.key === 'Home') {
          tabs[0].click();
        } else if (e.key === 'End') {
          tabs[tabs.length - 1].click();
        }
      });
    </script>
  `,
};


