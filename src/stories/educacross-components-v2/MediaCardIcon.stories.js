/**
 * MediaCardIcon - Card de Métrica com Ícone Grande
 * ==================================================
 * Card de métrica com ícone destacado para dashboards educacionais
 * 
 * @component MediaCardIcon
 * @source educacross-frontoffice/src/components/card/MediaCardIcon.vue
 * @category Cards
 * @priority P1 - Core UI
 * 
 * ## Contexto Educacional
 * - **Professor**: Dashboard com métricas de alunos, missões aplicadas, concluídas
 * - **Coordenador**: Visão geral de turmas, aprovações, desempenho escolar
 * - **Aluno**: Estatísticas pessoais de progresso e conquistas
 * 
 * ## Casos de Uso
 * - Dashboard do professor com total de alunos
 * - Métricas de missões aplicadas/concluídas
 * - Taxa de aprovação e desempenho
 * - Indicadores com trend (crescimento/queda)
 * - KPIs educacionais em tempo real
 * 
 * ## Props API
 * @prop {string} icon - Ícone Bootstrap Icons (bi-people, bi-book, bi-check-circle, bi-trophy)
 * @prop {string} iconColor - Cor do ícone: 'primary', 'success', 'warning', 'danger', 'info'
 * @prop {string} title - Título da métrica (ex: "Total de Alunos")
 * @prop {string|number} value - Valor da métrica (ex: "148")
 * @prop {string} trend - Tendência: 'up', 'down', 'neutral'
 * @prop {string} trendValue - Valor da tendência (ex: "+12%")
 * @prop {string} backgroundColor - Cor de fundo do card
 * @prop {boolean} loading - Estado de carregamento
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Card**: Width 100%, min-height 160px, padding 24px
 * - **Icon Container**: 78x78px, border-radius 12px
 * - **Icon**: font-size 46px, centrado
 * - **Gap**: 16px entre icon e conteúdo
 * 
 * ### Cores
 * - **Primary**: #6E63E8 (alunos, geral)
 * - **Success**: #28C76F (missões concluídas, aprovações)
 * - **Warning**: #FF9F43 (em andamento, pendente)
 * - **Danger**: #EA5455 (reprovações, alertas)
 * - **Info**: #00CFE8 (informações, estatísticas)
 * - **Background**: white, border #EBE9F1
 * 
 * ### Tipografia
 * - **Title**: font-size 14px, font-weight 500, color #6E6B7B
 * - **Value**: font-size 32px, font-weight 600, color #5E5873
 * - **Trend**: font-size 13px, font-weight 500
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco, sombra sutil
 * - **Hover**: Box-shadow 0 4px 24px rgba(34, 41, 47, 0.12), transform scale(1.02)
 * - **Loading**: Skeleton com animação pulse
 * - **Interactive**: Cursor pointer, transição smooth
 * 
 * ### Comportamento
 * - **Trend Up**: Ícone bi-arrow-up, cor success
 * - **Trend Down**: Ícone bi-arrow-down, cor danger
 * - **Trend Neutral**: Sem ícone, cor secondary
 * - **Click**: Opcional navegação para detalhe
 * 
 * ### Acessibilidade
 * - Role: article
 * - aria-label: descrição completa da métrica
 * - Keyboard: focável se interativo
 * - Screen reader: anúncio de valor e trend
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <MediaCardIcon
 *   icon="bi-people"
 *   icon-color="primary"
 *   title="Total de Alunos"
 *   :value="148"
 *   trend="up"
 *   trend-value="+12%"
 *   @click="navigateToStudents"
 * />
 * 
 * <MediaCardIcon
 *   icon="bi-check-circle"
 *   icon-color="success"
 *   title="Missões Concluídas"
 *   :value="86"
 *   trend="up"
 *   trend-value="+5"
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Cards/MediaCardIcon',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card de métrica com ícone grande destacado para dashboards educacionais.

### Features
- ✅ Ícone grande destacado (78x78px)
- ✅ 5 cores de ícone (primary, success, warning, danger, info)
- ✅ Indicador de trend (crescimento/queda)
- ✅ Loading skeleton
- ✅ Estados: default, hover, loading
- ✅ Acessibilidade completa
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `
      }
    }
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['bi-people', 'bi-book', 'bi-check-circle', 'bi-trophy', 'bi-graph-up', 'bi-calendar-check'],
      description: 'Ícone Bootstrap Icons',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bi-people' }
      }
    },
    iconColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      description: 'Cor do ícone',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    title: {
      control: 'text',
      description: 'Título da métrica',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Valor da métrica',
      table: {
        type: { summary: 'string | number' }
      }
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
      description: 'Tendência da métrica',
      table: {
        type: { summary: 'string' }
      }
    },
    trendValue: {
      control: 'text',
      description: 'Valor da tendência',
      table: {
        type: { summary: 'string' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

// Estilos Figma CSS
const componentStyles = `
/* Card Container */
.media-card-icon {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 8px;
  padding: 24px;
  min-height: 160px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.2s ease;
}

.media-card-icon:hover {
  box-shadow: 0 4px 24px rgba(34, 41, 47, 0.12);
  transform: scale(1.02);
}

.media-card-icon.interactive {
  cursor: pointer;
}

/* Icon Container */
.media-card-icon-container {
  width: 78px;
  height: 78px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 46px;
}

.media-card-icon-container.primary {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.media-card-icon-container.success {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.media-card-icon-container.warning {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.media-card-icon-container.danger {
  background: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.media-card-icon-container.info {
  background: rgba(0, 207, 232, 0.12);
  color: #00CFE8;
}

/* Content */
.media-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-card-title {
  font-size: 14px;
  font-weight: 500;
  color: #6E6B7B;
  margin: 0;
}

.media-card-value {
  font-size: 32px;
  font-weight: 600;
  color: #5E5873;
  margin: 0;
  line-height: 1;
}

/* Trend */
.media-card-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 4px;
}

.media-card-trend.up {
  color: #28C76F;
}

.media-card-trend.down {
  color: #EA5455;
}

.media-card-trend.neutral {
  color: #6E6B7B;
}

.media-card-trend i {
  font-size: 16px;
}

/* Loading Skeleton */
.media-card-skeleton {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 8px;
  padding: 24px;
  min-height: 160px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.skeleton-icon {
  width: 78px;
  height: 78px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-title {
  width: 120px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-value {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-trend {
  width: 60px;
  height: 13px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;

// Story: Default
export const Default = {
  args: {
    icon: 'bi-people',
    iconColor: 'primary',
    title: 'Total de Alunos',
    value: '148',
    trend: 'up',
    trendValue: '+12%',
    loading: false
  },
  render: (args) => {
    if (args.loading) {
      return `
        <style>${componentStyles}</style>
        <div class="media-card-skeleton">
          <div class="skeleton-icon"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-value"></div>
            <div class="skeleton-trend"></div>
          </div>
        </div>
      `;
    }

    const trendHTML = args.trend !== 'neutral' ? `
      <div class="media-card-trend ${args.trend}">
        <i class="bi bi-arrow-${args.trend === 'up' ? 'up' : 'down'}"></i>
        <span>${args.trendValue}</span>
      </div>
    ` : '';

    return `
      <style>${componentStyles}</style>
      <div class="media-card-icon" role="article" aria-label="${args.title}: ${args.value}">
        <div class="media-card-icon-container ${args.iconColor}">
          <i class="${args.icon}"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">${args.title}</p>
          <h3 class="media-card-value">${args.value}</h3>
          ${trendHTML}
        </div>
      </div>
    `;
  }
};

// Story: AllIcons
export const AllIcons = {
  render: () => `
    <style>
      ${componentStyles}
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="grid-container">
      <div class="media-card-icon">
        <div class="media-card-icon-container primary">
          <i class="bi-people"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Total de Alunos</p>
          <h3 class="media-card-value">148</h3>
          <div class="media-card-trend up">
            <i class="bi bi-arrow-up"></i>
            <span>+12%</span>
          </div>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container info">
          <i class="bi-book"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Missões Aplicadas</p>
          <h3 class="media-card-value">32</h3>
          <div class="media-card-trend up">
            <i class="bi bi-arrow-up"></i>
            <span>+8</span>
          </div>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container success">
          <i class="bi-check-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Missões Concluídas</p>
          <h3 class="media-card-value">86</h3>
          <div class="media-card-trend up">
            <i class="bi bi-arrow-up"></i>
            <span>+5</span>
          </div>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container warning">
          <i class="bi-trophy"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Taxa de Aprovação</p>
          <h3 class="media-card-value">78%</h3>
          <div class="media-card-trend down">
            <i class="bi bi-arrow-down"></i>
            <span>-3%</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: AllColors
export const AllColors = {
  render: () => `
    <style>
      ${componentStyles}
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="grid-container">
      <div class="media-card-icon">
        <div class="media-card-icon-container primary">
          <i class="bi-people"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Primary Color</p>
          <h3 class="media-card-value">148</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container success">
          <i class="bi-check-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Success Color</p>
          <h3 class="media-card-value">86</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container warning">
          <i class="bi-trophy"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Warning Color</p>
          <h3 class="media-card-value">45</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container danger">
          <i class="bi-x-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Danger Color</p>
          <h3 class="media-card-value">12</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container info">
          <i class="bi-graph-up"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Info Color</p>
          <h3 class="media-card-value">234</h3>
        </div>
      </div>
    </div>
  `
};

// Story: WithTrend
export const WithTrend = {
  render: () => `
    <style>
      ${componentStyles}
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="grid-container">
      <div class="media-card-icon">
        <div class="media-card-icon-container success">
          <i class="bi-arrow-up-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Crescimento</p>
          <h3 class="media-card-value">+24%</h3>
          <div class="media-card-trend up">
            <i class="bi bi-arrow-up"></i>
            <span>+12% este mês</span>
          </div>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container danger">
          <i class="bi-arrow-down-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Queda</p>
          <h3 class="media-card-value">-8%</h3>
          <div class="media-card-trend down">
            <i class="bi bi-arrow-down"></i>
            <span>-5% este mês</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: TrendUp
export const TrendUp = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="media-card-icon">
      <div class="media-card-icon-container success">
        <i class="bi-people"></i>
      </div>
      <div class="media-card-content">
        <p class="media-card-title">Alunos Ativos</p>
        <h3 class="media-card-value">156</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+18 novos alunos</span>
        </div>
      </div>
    </div>
  `
};

// Story: TrendDown
export const TrendDown = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="media-card-icon">
      <div class="media-card-icon-container danger">
        <i class="bi-x-circle"></i>
      </div>
      <div class="media-card-content">
        <p class="media-card-title">Taxa de Evasão</p>
        <h3 class="media-card-value">5%</h3>
        <div class="media-card-trend down">
          <i class="bi bi-arrow-down"></i>
          <span>-2% este semestre</span>
        </div>
      </div>
    </div>
  `
};

// Story: DashboardProfessor
export const DashboardProfessor = {
  render: () => `
    <style>
      ${componentStyles}
      .dashboard-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 24px;
      }
    </style>
    <div>
      <h2 class="dashboard-title">Dashboard - Professor João Silva</h2>
      <div class="dashboard-container">
        <div class="media-card-icon">
          <div class="media-card-icon-container primary">
            <i class="bi-people"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Alunos na Turma</p>
            <h3 class="media-card-value">34</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+3 este bimestre</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container info">
            <i class="bi-book"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Missões Aplicadas</p>
            <h3 class="media-card-value">18</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+5 este mês</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container success">
            <i class="bi-check-circle"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Taxa de Conclusão</p>
            <h3 class="media-card-value">92%</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+7% este mês</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container warning">
            <i class="bi-trophy"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Média da Turma</p>
            <h3 class="media-card-value">7.8</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+0.5 pontos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: DashboardCoordenador
export const DashboardCoordenador = {
  render: () => `
    <style>
      ${componentStyles}
      .dashboard-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 24px;
      }
    </style>
    <div>
      <h2 class="dashboard-title">Dashboard - Coordenação Pedagógica</h2>
      <div class="dashboard-container">
        <div class="media-card-icon">
          <div class="media-card-icon-container primary">
            <i class="bi-people"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Total de Alunos</p>
            <h3 class="media-card-value">1.248</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+48 este ano</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container success">
            <i class="bi-trophy"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Taxa de Aprovação</p>
            <h3 class="media-card-value">87%</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+4% vs ano passado</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container info">
            <i class="bi-graph-up"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Proficiência Média</p>
            <h3 class="media-card-value">285</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+12 pontos</span>
            </div>
          </div>
        </div>
        
        <div class="media-card-icon">
          <div class="media-card-icon-container warning">
            <i class="bi-person-check"></i>
          </div>
          <div class="media-card-content">
            <p class="media-card-title">Professores Ativos</p>
            <h3 class="media-card-value">42</h3>
            <div class="media-card-trend up">
              <i class="bi bi-arrow-up"></i>
              <span>+3 contratados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: AllMetrics
export const AllMetrics = {
  render: () => `
    <style>
      ${componentStyles}
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
      }
    </style>
    <div class="metrics-grid">
      <div class="media-card-icon">
        <div class="media-card-icon-container primary">
          <i class="bi-people"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Alunos</p>
          <h3 class="media-card-value">148</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container info">
          <i class="bi-book"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Missões</p>
          <h3 class="media-card-value">32</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container success">
          <i class="bi-check-circle"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Concluídas</p>
          <h3 class="media-card-value">86</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container warning">
          <i class="bi-trophy"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Aprovações</p>
          <h3 class="media-card-value">78%</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container info">
          <i class="bi-graph-up"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Proficiência</p>
          <h3 class="media-card-value">285</h3>
        </div>
      </div>
      
      <div class="media-card-icon">
        <div class="media-card-icon-container primary">
          <i class="bi-calendar-check"></i>
        </div>
        <div class="media-card-content">
          <p class="media-card-title">Presença</p>
          <h3 class="media-card-value">94%</h3>
        </div>
      </div>
    </div>
  `
};

// Story: LoadingSkeleton
export const LoadingSkeleton = {
  render: () => `
    <style>
      ${componentStyles}
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="grid-container">
      <div class="media-card-skeleton">
        <div class="skeleton-icon"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-trend"></div>
        </div>
      </div>
      
      <div class="media-card-skeleton">
        <div class="skeleton-icon"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-trend"></div>
        </div>
      </div>
      
      <div class="media-card-skeleton">
        <div class="skeleton-icon"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-trend"></div>
        </div>
      </div>
      
      <div class="media-card-skeleton">
        <div class="skeleton-icon"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-trend"></div>
        </div>
      </div>
    </div>
  `
};

// Story: Interactive
export const Interactive = {
  render: () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.media-card-icon.interactive');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          alert(`Navegando para: ${card.querySelector('.media-card-title').textContent}`);
        });
      });
    }, 100);

    return `
      <style>
        ${componentStyles}
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .click-hint {
          text-align: center;
          color: #6E6B7B;
          font-size: 14px;
          margin-bottom: 16px;
          font-weight: 500;
        }
      </style>
      <div>
        <p class="click-hint">💡 Clique nos cards para interagir</p>
        <div class="grid-container">
          <div class="media-card-icon interactive" tabindex="0" role="button" aria-label="Ver detalhes de alunos">
            <div class="media-card-icon-container primary">
              <i class="bi-people"></i>
            </div>
            <div class="media-card-content">
              <p class="media-card-title">Total de Alunos</p>
              <h3 class="media-card-value">148</h3>
              <div class="media-card-trend up">
                <i class="bi bi-arrow-up"></i>
                <span>+12%</span>
              </div>
            </div>
          </div>
          
          <div class="media-card-icon interactive" tabindex="0" role="button" aria-label="Ver detalhes de missões">
            <div class="media-card-icon-container info">
              <i class="bi-book"></i>
            </div>
            <div class="media-card-content">
              <p class="media-card-title">Missões Aplicadas</p>
              <h3 class="media-card-value">32</h3>
              <div class="media-card-trend up">
                <i class="bi bi-arrow-up"></i>
                <span>+8</span>
              </div>
            </div>
          </div>
          
          <div class="media-card-icon interactive" tabindex="0" role="button" aria-label="Ver detalhes de conclusões">
            <div class="media-card-icon-container success">
              <i class="bi-check-circle"></i>
            </div>
            <div class="media-card-content">
              <p class="media-card-title">Missões Concluídas</p>
              <h3 class="media-card-value">86</h3>
              <div class="media-card-trend up">
                <i class="bi bi-arrow-up"></i>
                <span>+5</span>
              </div>
            </div>
          </div>
          
          <div class="media-card-icon interactive" tabindex="0" role="button" aria-label="Ver detalhes de aprovações">
            <div class="media-card-icon-container warning">
              <i class="bi-trophy"></i>
            </div>
            <div class="media-card-content">
              <p class="media-card-title">Taxa de Aprovação</p>
              <h3 class="media-card-value">78%</h3>
              <div class="media-card-trend down">
                <i class="bi bi-arrow-down"></i>
                <span>-3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};


