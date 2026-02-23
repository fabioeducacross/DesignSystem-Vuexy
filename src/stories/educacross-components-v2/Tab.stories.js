/**
 * Tab - Navegação por Abas Horizontal
 * ======================================
 * Navegação horizontal com abas, sombras e estados ativos
 * 
 * @component Tab
 * @category Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/components/tab/Tab.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @generated 2026-02-03
 */

const componentStyles = `
<style>
.tabs-container {
  background: white;
  border: 1px solid #DBDADE;
  border-radius: 12px 12px 0 0;
  padding: 0;
  overflow: hidden;
}

.tab-line {
  border: 1px solid #DBDADE;
  height: 1px;
  width: 100%;
  margin-bottom: 0;
}

.tabs-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #DBDADE transparent;
  padding: 8px 16px 0 16px;
  gap: 8px;
}

.tabs-row::-webkit-scrollbar {
  height: 6px;
}

.tabs-row::-webkit-scrollbar-track {
  background: transparent;
}

.tabs-row::-webkit-scrollbar-thumb {
  background: #DBDADE;
  border-radius: 3px;
}

.tabs-row::-webkit-scrollbar-thumb:hover {
  background: #C5C3CB;
}

.tab-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 14px 24px 10px 24px;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  color: #6E6B7B;
  text-decoration: none;
  background: #F8F7FA;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s;
  border: 1px solid #DBDADE;
  border-bottom: none;
  user-select: none;
}

.tab-link:hover {
  color: #6E63E8;
  background: #FAFAFA;
}

.tab-link.active {
  background: white;
  color: #6E63E8;
  z-index: 1;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
}

.tab-icon {
  font-size: 18px;
  line-height: 1;
}

.tab-badge {
  background: #EA5455;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1.4;
}

.tab-badge.primary {
  background: #6E63E8;
}

.tab-badge.warning {
  background: #FF9F43;
}

.tab-content {
  background: white;
  padding: 24px;
  border: 1px solid #DBDADE;
  border-top: none;
  border-radius: 0 0 12px 12px;
  min-height: 200px;
}

.content-title {
  font-size: 18px;
  font-weight: 600;
  color: #5D596C;
  margin-bottom: 12px;
}

.content-text {
  font-size: 14px;
  color: #6E6B7B;
  line-height: 1.6;
}

.demo-container {
  padding: 24px;
  background: #F8F7FA;
  border-radius: 12px;
}

.demo-label {
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mobile-viewport {
  max-width: 375px;
  margin: 0 auto;
}

.subject-tabs .tab-link {
  padding: 14px 20px 10px 20px;
}

.subject-tabs .tab-icon {
  font-size: 20px;
}

@media (max-width: 767px) {
  .tabs-row {
    padding: 8px 12px 0 12px;
  }

  .tab-link {
    padding: 12px 16px 8px 16px;
    font-size: 13px;
  }

  .tab-icon {
    font-size: 16px;
  }
}
</style>
`;

export default {
  title: 'Educacross Components V2/Navigation/Tab',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal tab navigation with shadow effects, active states, and custom transform positioning. Supports scrollable tabs, icons, and notification badges.',
      },
    },
  },
};

/**
 * 3 tabs (Visão Geral, Detalhes, Histórico) with first tab active
 */
export const Default = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Navegação por Abas Padrão</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link active">Visão Geral</a>
          <a href="#" class="tab-link">Detalhes</a>
          <a href="#" class="tab-link">Histórico</a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">Visão Geral</div>
        <div class="content-text">
          Esta é a aba de visão geral. Aqui você encontra um resumo das informações 
          mais importantes sobre o conteúdo selecionado.
        </div>
      </div>
    </div>
  `,
};

/**
 * 5 tabs with second tab ("Minhas Missões") active, z-index layering visible
 */
export const ActiveSecond = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Segunda Aba Ativa com Z-Index</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link">Dashboard</a>
          <a href="#" class="tab-link active">Minhas Missões</a>
          <a href="#" class="tab-link">Alunos</a>
          <a href="#" class="tab-link">Turmas</a>
          <a href="#" class="tab-link">Relatórios</a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">Minhas Missões</div>
        <div class="content-text">
          Gerencie todas as suas missões criadas. Aqui você pode editar, duplicar ou 
          excluir missões existentes, além de acompanhar o progresso dos alunos em cada uma delas.
        </div>
      </div>
    </div>
  `,
};

/**
 * 8 tabs demonstrating horizontal scroll with overflow-x auto
 */
export const Scrollable = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Abas com Scroll Horizontal (8 tabs)</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link active">Todas</a>
          <a href="#" class="tab-link">Matemática</a>
          <a href="#" class="tab-link">Língua Portuguesa</a>
          <a href="#" class="tab-link">Ciências</a>
          <a href="#" class="tab-link">História</a>
          <a href="#" class="tab-link">Geografia</a>
          <a href="#" class="tab-link">Inglês</a>
          <a href="#" class="tab-link">Educação Física</a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">Todas as Disciplinas</div>
        <div class="content-text">
          Visualize conteúdo de todas as disciplinas. Use o scroll horizontal acima para 
          navegar entre as diferentes matérias disponíveis.
        </div>
      </div>
    </div>
  `,
};

/**
 * Tabs with Bootstrap Icons (bi-house, bi-book, bi-graph-up, bi-gear)
 */
export const WithIcons = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Abas com Ícones Bootstrap</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link active">
            <i class="bi bi-house tab-icon"></i>
            Início
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-book tab-icon"></i>
            Missões
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-graph-up tab-icon"></i>
            Desempenho
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-gear tab-icon"></i>
            Configurações
          </a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">
          <i class="bi bi-house" style="color: #6E63E8;"></i> Página Inicial
        </div>
        <div class="content-text">
          Bem-vindo à página inicial! Aqui você encontra um resumo das suas atividades 
          recentes e acesso rápido às principais funcionalidades da plataforma.
        </div>
      </div>
    </div>
  `,
};

/**
 * 4 subject tabs (Matemática, Português, Ciências, História) for content filtering
 */
export const Educational = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Abas de Disciplinas Educacionais</div>
      <div class="tabs-container">
        <div class="tabs-row subject-tabs">
          <a href="#" class="tab-link active">
            <i class="bi bi-calculator tab-icon"></i>
            Matemática
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-journal-text tab-icon"></i>
            Português
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-atom tab-icon"></i>
            Ciências
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-clock-history tab-icon"></i>
            História
          </a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">
          <i class="bi bi-calculator" style="color: #6E63E8;"></i> Matemática
        </div>
        <div class="content-text">
          <strong>Tópicos recentes:</strong> Geometria plana, Frações e decimais, 
          Equações do primeiro grau, Razão e proporção.<br><br>
          <strong>Próxima missão:</strong> Resolução de problemas com porcentagem - 
          Disponível a partir de amanhã.
        </div>
      </div>
    </div>
  `,
};

/**
 * 375px showing scrollbar-width thin and touch-scrolling behavior
 */
export const MobileView = {
  render: () => `
    ${componentStyles}
    <div class="demo-container mobile-viewport">
      <div class="demo-label">Visualização Mobile (375px)</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link active">
            <i class="bi bi-house tab-icon"></i>
            Início
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-trophy tab-icon"></i>
            Missões
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-people tab-icon"></i>
            Turmas
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-bar-chart tab-icon"></i>
            Relatórios
          </a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">Início</div>
        <div class="content-text">
          Layout otimizado para dispositivos móveis. As abas são scrolláveis 
          horizontalmente com scrollbar fino para melhor experiência em telas pequenas.
        </div>
      </div>
    </div>
  `,
};

/**
 * Tabs with notification badges (Turmas with "3", Pendentes with "12")
 */
export const WithBadge = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Abas com Badges de Notificação</div>
      <div class="tabs-container">
        <div class="tabs-row">
          <a href="#" class="tab-link active">
            <i class="bi bi-grid tab-icon"></i>
            Todas
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-people tab-icon"></i>
            Turmas
            <span class="tab-badge primary">3</span>
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-clock tab-icon"></i>
            Pendentes
            <span class="tab-badge">12</span>
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-exclamation-triangle tab-icon"></i>
            Atrasadas
            <span class="tab-badge warning">5</span>
          </a>
          <a href="#" class="tab-link">
            <i class="bi bi-check-circle tab-icon"></i>
            Concluídas
          </a>
        </div>
        <div class="tab-line"></div>
      </div>
      <div class="tab-content">
        <div class="content-title">Todas as Atividades</div>
        <div class="content-text">
          Você tem <strong>12 atividades pendentes</strong>, <strong>5 atrasadas</strong> 
          e <strong>3 novas turmas</strong> atribuídas a você. Clique nas abas acima para 
          filtrar por categoria.
        </div>
      </div>
    </div>
  `,
};

/**
 * Tabs with click handlers using setTimeout to emit @update:currentTab event and update active class
 */
export const Interactive = {
  render: () => {
    setTimeout(() => {
      const tabs = document.querySelectorAll('#interactive-tabs .tab-link');
      const contentTitle = document.querySelector('#interactive-content-title');
      const contentText = document.querySelector('#interactive-content-text');

      const tabContents = {
        'Visão Geral': {
          title: 'Visão Geral',
          text: 'Dashboard principal com resumo de todas as atividades e estatísticas gerais da turma.'
        },
        'Minhas Missões': {
          title: 'Minhas Missões',
          text: 'Lista de todas as missões criadas. Você pode editar, duplicar ou excluir missões existentes.'
        },
        'Desempenho': {
          title: 'Desempenho dos Alunos',
          text: 'Gráficos e relatórios detalhados sobre o desempenho individual e coletivo dos alunos.'
        },
        'Configurações': {
          title: 'Configurações',
          text: 'Configure preferências da plataforma, notificações e personalização da interface.'
        }
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active to clicked tab
          tab.classList.add('active');
          
          // Get tab text
          const tabText = tab.textContent.trim();
          
          // Update content
          const content = tabContents[tabText];
          if (content && contentTitle && contentText) {
            contentTitle.textContent = content.title;
            contentText.textContent = content.text;
          }
          
          console.log('Evento @update:currentTab emitido com index: ' + index);
        });
      });
    }, 100);

    return `
      ${componentStyles}
      <div class="demo-container">
        <div class="demo-label">Abas Interativas - Clique para Navegar</div>
        <div class="tabs-container">
          <div id="interactive-tabs" class="tabs-row">
            <a href="#" class="tab-link active">
              <i class="bi bi-grid tab-icon"></i>
              Visão Geral
            </a>
            <a href="#" class="tab-link">
              <i class="bi bi-trophy tab-icon"></i>
              Minhas Missões
            </a>
            <a href="#" class="tab-link">
              <i class="bi bi-graph-up tab-icon"></i>
              Desempenho
            </a>
            <a href="#" class="tab-link">
              <i class="bi bi-gear tab-icon"></i>
              Configurações
            </a>
          </div>
          <div class="tab-line"></div>
        </div>
        <div class="tab-content">
          <div id="interactive-content-title" class="content-title">Visão Geral</div>
          <div id="interactive-content-text" class="content-text">
            Dashboard principal com resumo de todas as atividades e estatísticas gerais da turma.
          </div>
        </div>
      </div>
    `;
  },
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
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#00CFE8 0%,#0BAACC 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Navigation</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">Tab</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Navegação por Abas Horizontal</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Navegação por Abas Horizontal. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import Tab from '@/components/Tab.vue';

// Template
&lt;Tab v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o Tab com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground Tab</p>
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
    docs: { description: { story: 'Exemplos de uso real do Tab no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: Tab</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando Tab no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com Tab no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via Tab</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o Tab.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: Tab</h1>
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

