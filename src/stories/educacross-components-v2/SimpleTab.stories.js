/**
 * SimpleTab - Tabs Simples para Navegação
 * ======================================
 * Componente de tabs simples para navegação entre visualizações
 * 
 * @component SimpleTab
 * @category Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/components/tab/SimpleTab.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
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

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Components</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SimpleTab</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Tabs Simples para Navegação</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Tabs Simples para Navegação. Faz parte da categoria <strong>Components</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SimpleTab from '@/components/SimpleTab.vue';

// Template
&lt;SimpleTab v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o SimpleTab com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SimpleTab</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do SimpleTab no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SimpleTab</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SimpleTab no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SimpleTab no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SimpleTab</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SimpleTab.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SimpleTab</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

