/**
 * Tab - Navegação por Abas Horizontal
 * ======================================
 * Navegação horizontal com abas, sombras e estados ativos
 * 
 * @component Tab
 * @category Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/components/Tab.vue
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
