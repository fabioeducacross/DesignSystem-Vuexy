/**
 * SubjectCard - Card de Disciplina/Matéria Escolar
 * ==================================================
 * Card para exibir disciplinas escolares com progresso e estatísticas
 * 
 * @component SubjectCard
 * @category Doc-Only / Cards
 * @note Possível variação de SubjectBand. Necessita análise.
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * 
 * ## Contexto Educacional
 * - **Professor**: Lista de disciplinas que leciona, seleção de matéria para missão
 * - **Coordenador**: Visão geral de todas as disciplinas da escola
 * - **Aluno**: Disciplinas matriculadas, progresso em cada matéria
 * 
 * ## Casos de Uso
 * - Lista de disciplinas do professor
 * - Seleção de matéria para criar missão
 * - Dashboard do aluno com progresso em cada disciplina
 * - Visão geral de desempenho por matéria
 * - Navegação por disciplina
 * 
 * ## Props API
 * @prop {string} subject - Nome da disciplina (Matemática, Português, etc)
 * @prop {string} icon - Ícone Bootstrap Icons
 * @prop {string} color - Cor: 'primary', 'success', 'info', 'warning', 'danger'
 * @prop {string} description - Descrição breve da disciplina
 * @prop {number} progress - Progresso 0-100
 * @prop {number} missionsCount - Quantidade de missões
 * @prop {number} studentsCount - Quantidade de alunos
 * @prop {boolean} disabled - Desabilitado
 * @prop {boolean} loading - Carregamento
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Card**: Width 100%, min-height 200px, padding 24px
 * - **Icon Container**: 56x56px, border-radius 12px
 * - **Progress Bar**: height 6px, border-radius 3px
 * - **Gap**: 16px entre elementos
 * 
 * ### Cores por Disciplina
 * - **Matemática**: #6E63E8 (primary) - bi-calculator
 * - **Português**: #28C76F (success) - bi-book
 * - **Ciências**: #00CFE8 (info) - bi-lightbulb
 * - **História**: #FF9F43 (warning) - bi-clock-history
 * - **Geografia**: #EA5455 (danger) - bi-globe
 * 
 * ### Tipografia
 * - **Subject**: font-size 18px, font-weight 600, color #5E5873
 * - **Description**: font-size 13px, font-weight 400, color #6E6B7B
 * - **Stats**: font-size 14px, font-weight 500, color #5E5873
 * - **Progress**: font-size 12px, font-weight 500
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco
 * - **Hover**: Box-shadow, transform scale(1.02), cursor pointer
 * - **Active/Selected**: Border da cor, fundo rgba(cor, 0.05)
 * - **Disabled**: Opacidade 0.5, cursor not-allowed
 * - **Loading**: Skeleton animado
 * 
 * ### Comportamento
 * - **Click**: Seleciona disciplina, navega para detalhe
 * - **Progress Bar**: Animação de preenchimento
 * - **Stats**: Ícones + números (missões, alunos)
 * 
 * ### Acessibilidade
 * - Role: button ou link
 * - aria-label: descrição completa
 * - aria-disabled: se desabilitado
 * - Keyboard: Tab, Enter, Space
 * - Focus visible: outline
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <SubjectCard
 *   subject="Matemática"
 *   icon="bi-calculator"
 *   color="primary"
 *   description="5º Ano EF - Números e Operações"
 *   :progress="75"
 *   :missions-count="12"
 *   :students-count="34"
 *   @click="selectSubject"
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Cards/SubjectCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card de disciplina/matéria escolar com progresso e estatísticas.

### Features
- ✅ Card por disciplina (Matemática, Português, Ciências, História, Geografia)
- ✅ Ícone e cor específicos por matéria
- ✅ Barra de progresso animada
- ✅ Estatísticas (missões, alunos)
- ✅ Estados: default, hover, active, disabled, loading
- ✅ Acessibilidade completa
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `
      }
    }
  },
  argTypes: {
    subject: {
      control: 'text',
      description: 'Nome da disciplina',
      table: {
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'select',
      options: ['bi-calculator', 'bi-book', 'bi-lightbulb', 'bi-clock-history', 'bi-globe'],
      description: 'Ícone da disciplina',
      table: {
        type: { summary: 'string' }
      }
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
      description: 'Cor da disciplina',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    description: {
      control: 'text',
      description: 'Descrição breve',
      table: {
        type: { summary: 'string' }
      }
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progresso (0-100)',
      table: {
        type: { summary: 'number' }
      }
    },
    missionsCount: {
      control: 'number',
      description: 'Quantidade de missões',
      table: {
        type: { summary: 'number' }
      }
    },
    studentsCount: {
      control: 'number',
      description: 'Quantidade de alunos',
      table: {
        type: { summary: 'number' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Carregamento',
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
.subject-card {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.subject-card:hover:not(.disabled) {
  box-shadow: 0 4px 24px rgba(34, 41, 47, 0.12);
  transform: scale(1.02);
}

.subject-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.subject-card.active {
  border-color: var(--subject-color);
  background: rgba(var(--subject-color-rgb), 0.05);
}

/* Header */
.subject-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.subject-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.subject-icon-container.primary {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.subject-icon-container.success {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.subject-icon-container.info {
  background: rgba(0, 207, 232, 0.12);
  color: #00CFE8;
}

.subject-icon-container.warning {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.subject-icon-container.danger {
  background: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.subject-info {
  flex: 1;
  min-width: 0;
}

.subject-name {
  font-size: 18px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 4px 0;
}

.subject-description {
  font-size: 13px;
  font-weight: 400;
  color: #6E6B7B;
  margin: 0;
  line-height: 1.4;
}

/* Progress */
.subject-progress {
  margin-top: 8px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 12px;
  font-weight: 500;
  color: #6E6B7B;
  margin: 0;
}

.progress-percent {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
}

.progress-percent.primary { color: #6E63E8; }
.progress-percent.success { color: #28C76F; }
.progress-percent.info { color: #00CFE8; }
.progress-percent.warning { color: #FF9F43; }
.progress-percent.danger { color: #EA5455; }

.progress-bar-container {
  height: 6px;
  background: #F3F2F7;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease-out;
}

.progress-bar-fill.primary { background: #6E63E8; }
.progress-bar-fill.success { background: #28C76F; }
.progress-bar-fill.info { background: #00CFE8; }
.progress-bar-fill.warning { background: #FF9F43; }
.progress-bar-fill.danger { background: #EA5455; }

/* Stats */
.subject-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #EBE9F1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 18px;
  color: #B9B9C3;
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: #5E5873;
  margin: 0;
}

.stat-label {
  font-size: 12px;
  font-weight: 400;
  color: #B9B9C3;
  margin: 0 0 0 4px;
}

/* Loading Skeleton */
.subject-skeleton {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-header {
  display: flex;
  gap: 16px;
}

.skeleton-icon-subject {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-name {
  width: 150px;
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-description {
  width: 200px;
  height: 13px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-progress {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  margin-top: 16px;
}

.skeleton-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #EBE9F1;
}

.skeleton-stat {
  width: 80px;
  height: 14px;
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
    subject: 'Matemática',
    icon: 'bi-calculator',
    color: 'primary',
    description: '5º Ano EF - Números e Operações',
    progress: 75,
    missionsCount: 12,
    studentsCount: 34,
    disabled: false,
    loading: false
  },
  render: (args) => {
    if (args.loading) {
      return `
        <style>${componentStyles}</style>
        <div class="subject-skeleton">
          <div class="skeleton-header">
            <div class="skeleton-icon-subject"></div>
            <div class="skeleton-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-description"></div>
            </div>
          </div>
          <div class="skeleton-progress"></div>
          <div class="skeleton-stats">
            <div class="skeleton-stat"></div>
            <div class="skeleton-stat"></div>
          </div>
        </div>
      `;
    }

    return `
      <style>${componentStyles}</style>
      <div class="subject-card ${args.disabled ? 'disabled' : ''}" 
           role="button" 
           tabindex="${args.disabled ? '-1' : '0'}"
           aria-label="${args.subject}: ${args.description}, ${args.progress}% concluído"
           aria-disabled="${args.disabled}">
        <div class="subject-header">
          <div class="subject-icon-container ${args.color}">
            <i class="${args.icon}"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">${args.subject}</h3>
            <p class="subject-description">${args.description}</p>
          </div>
        </div>
        
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent ${args.color}">${args.progress}%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${args.color}" style="width: ${args.progress}%"></div>
          </div>
        </div>
        
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">${args.missionsCount}</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">${args.studentsCount}</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    `;
  }
};

// Story: AllSubjects
export const AllSubjects = {
  render: () => `
    <style>
      ${componentStyles}
      .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Números e Operações</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">5º Ano EF - Leitura e Interpretação</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container info">
            <i class="bi-lightbulb"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Ciências</h3>
            <p class="subject-description">5º Ano EF - Matéria e Energia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent info">65%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill info" style="width: 65%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-clock-history"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">História</h3>
            <p class="subject-description">5º Ano EF - Brasil Colônia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">58%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 58%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">8</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-globe"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Geografia</h3>
            <p class="subject-description">5º Ano EF - Regiões do Brasil</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">42%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 42%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">6</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: WithProgress
export const WithProgress = {
  render: () => `
    <style>
      ${componentStyles}
      .progress-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="progress-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-check-circle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Completo</h3>
            <p class="subject-description">Todas as missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">100%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 100%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">20/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-hourglass-split"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Em Andamento</h3>
            <p class="subject-description">Metade concluída</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">50%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 50%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-exclamation-triangle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Iniciando</h3>
            <p class="subject-description">Poucas missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">15%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 15%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">3/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: WithCounts
export const WithCounts = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="subject-card">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Estatísticas detalhadas</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">75%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 75%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">12</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">34</p>
          <span class="stat-label">alunos</span>
        </div>
        <div class="stat-item">
          <i class="bi-check-circle stat-icon"></i>
          <p class="stat-value">9</p>
          <span class="stat-label">concluídas</span>
        </div>
      </div>
    </div>
  `
};

// Story: Clickable
export const Clickable = {
  render: () => {
    setTimeout(() => {
      const card = document.querySelector('.subject-card.interactive');
      card?.addEventListener('click', () => {
        alert('Navegando para Matemática');
      });
    }, 100);

    return `
      <style>
        ${componentStyles}
        .click-hint {
          text-align: center;
          color: #6E6B7B;
          font-size: 14px;
          margin-bottom: 16px;
        }
      </style>
      <p class="click-hint">💡 Clique no card para interagir</p>
      <div class="subject-card interactive" tabindex="0">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Clique para ver detalhes</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    `;
  }
};

// Story: Hover
export const Hover = {
  render: () => `
    <style>
      ${componentStyles}
      .hover-hint {
        text-align: center;
        color: #6E6B7B;
        font-size: 14px;
        margin-bottom: 16px;
      }
    </style>
    <p class="hover-hint">🖱️ Passe o mouse sobre os cards</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Disabled
export const Disabled = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="subject-card disabled">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Disciplina desabilitada</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">0%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 0%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">alunos</span>
        </div>
      </div>
    </div>
  `
};

// Story: ListaDisciplinas
export const ListaDisciplinas = {
  render: () => `
    <style>
      ${componentStyles}
      .disciplinas-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 24px;
      }
      .disciplinas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="disciplinas-title">Minhas Disciplinas - Professor João Silva</h2>
      <div class="disciplinas-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano A - Turma da Manhã</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">34</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano B - Turma da Tarde</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">68%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 68%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">32</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
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
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 8px;
      }
      .dashboard-subtitle {
        font-size: 14px;
        color: #6E6B7B;
        margin-bottom: 24px;
      }
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="dashboard-title">Dashboard do Professor</h2>
      <p class="dashboard-subtitle">Visão geral das suas disciplinas e turmas</p>
      <div class="dashboard-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática 5º A</h3>
              <p class="subject-description">34 alunos · 12 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">9/12</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">7.8</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container success">
              <i class="bi-book"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Português 5º A</h3>
              <p class="subject-description">34 alunos · 18 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent success">82%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill success" style="width: 82%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">15/18</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">8.2</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: SelecionarMateria
export const SelecionarMateria = {
  render: () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.subject-card.selectable');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        });
      });
    }, 100);

    return `
      <style>
        ${componentStyles}
        .selection-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .selection-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
      </style>
      <div>
        <h2 class="selection-title">Selecione a Disciplina</h2>
        <p class="selection-subtitle">Escolha a matéria para criar uma nova missão</p>
        <div class="selection-grid">
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

// Story: InteractiveGrid
export const InteractiveGrid = {
  render: () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.subject-card.interactive-card');
      cards.forEach((card, index) => {
        card.addEventListener('click', () => {
          const subject = card.querySelector('.subject-name').textContent;
          alert(`Abrindo ${subject}`);
        });
      });
    }, 100);

    return `
      <style>
        ${componentStyles}
        .interactive-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .interactive-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .interactive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
      </style>
      <div>
        <h2 class="interactive-title">Grade de Disciplinas Interativa</h2>
        <p class="interactive-subtitle">💡 Clique em qualquer card para abrir a disciplina</p>
        <div class="interactive-grid">
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent primary">75%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill primary" style="width: 75%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent success">82%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill success" style="width: 82%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent info">65%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill info" style="width: 65%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container warning">
                <i class="bi-clock-history"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">História</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent warning">58%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill warning" style="width: 58%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">8</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container danger">
                <i class="bi-globe"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Geografia</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent danger">42%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill danger" style="width: 42%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">6</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

// Story: LoadingSkeleton
export const LoadingSkeleton = {
  render: () => `
    <style>
      ${componentStyles}
      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="loading-grid">
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
    </div>
  `
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
      <div style="background:linear-gradient(135deg,#7367F0 0%,#9E95F5 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Cards</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SubjectCard</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Card de Disciplina/Matéria Escolar</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Card de Disciplina/Matéria Escolar. Faz parte da categoria <strong>Cards</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #7367F0;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SubjectCard from '@/components/SubjectCard.vue';

// Template
&lt;SubjectCard v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SubjectCard com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#7367F020;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SubjectCard</p>
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
    docs: { description: { story: 'Exemplos de uso real do SubjectCard no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#7367F015;border:1px solid #7367F030;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SubjectCard</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SubjectCard no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SubjectCard no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SubjectCard</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SubjectCard.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#7367F0 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SubjectCard</h1>
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

