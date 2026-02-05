/**
 * @component ProgressBarHorizontal
 * @description Horizontal progress bar for mission/lesson completion with colored backgrounds and tooltips
 * @source educacross-frontoffice/src/components/ProgressBarHorizontal.vue
 * @generated 2026-02-03
 */

const componentStyles = `
<style>
.progress-container {
  padding: 16px;
  background: white;
  border: 1px solid #DBDADE;
  border-radius: 8px;
  margin-bottom: 16px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #5D596C;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-title {
  flex-grow: 1;
}

.bg-progress-bar-danger {
  background: rgba(234, 84, 85, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.bg-progress-bar-warning {
  background: rgba(250, 184, 74, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.bg-progress-bar-success {
  background: rgba(40, 199, 111, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.progress {
  height: 5px;
  border-radius: 4px;
  background-color: #F3F2F7;
  overflow: visible;
  position: relative;
}

.progress-bar {
  border-radius: 4px;
  transition: width 0.3s ease;
  height: 100%;
}

.progress-bar.bg-primary {
  background-color: #6E63E8;
}

.progress-bar.bg-danger {
  background-color: #EA5455;
}

.progress-bar.bg-warning {
  background-color: #FAB84A;
}

.progress-bar.bg-success {
  background-color: #28C76F;
}

.progress-percentage {
  font-size: 14px;
  font-weight: 700;
  color: #5D596C;
}

.progress-grid {
  display: grid;
  gap: 16px;
  max-width: 600px;
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

.progress-tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}

.progress-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: #5D596C;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -110px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-weight: 400;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #5D596C transparent transparent transparent;
}

.subject-icon {
  font-size: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

.mobile-viewport {
  max-width: 375px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .progress-container {
    padding: 12px;
  }

  .progress-label {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .progress-percentage {
    font-size: 13px;
  }

  .subject-icon {
    font-size: 16px;
  }
}
</style>
`;

export default {
  title: 'Front-office/Feedback/ProgressBarHorizontal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal progress bar for mission/lesson completion with colored backgrounds and tooltips. Supports danger, warning, and success states with right-content slot for percentages.',
      },
    },
  },
};

/**
 * Basic 50% progress bar with "Progresso" label, neutral color
 */
export const Default = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Barra de Progresso Padrão</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">Progresso da Missão</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Low progress (15%) with danger red bg, "Apenas 3 de 20 questões" label
 */
export const Danger = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Estado de Alerta - Progresso Baixo</div>
      <div class="bg-progress-bar-danger">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-exclamation-triangle subject-icon"></i>
              Apenas 3 de 20 questões respondidas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Medium progress (45%) with warning orange bg, "9 de 20 alunos concluíram"
 */
export const Warning = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Estado de Atenção - Progresso Médio</div>
      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clock-history subject-icon"></i>
              9 de 20 alunos concluíram a atividade
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * High progress (85%) with success green bg, "17 de 20 missões completas"
 */
export const Success = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Estado de Sucesso - Progresso Alto</div>
      <div class="bg-progress-bar-success">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-check-circle subject-icon"></i>
              17 de 20 missões completas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 85%;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Progress with right-content slot showing "75%" percentage
 */
export const WithRightContent = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Barra com Porcentagem à Direita</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-book subject-icon"></i>
            Lições Completadas
          </span>
          <span class="progress-percentage">75%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Progress bar with v-b-tooltip showing detailed stats on hover
 */
export const WithTooltip = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Barra com Tooltip Informativo</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title progress-tooltip">
            <i class="bi bi-graph-up subject-icon"></i>
            Desempenho Geral do Aluno
            <span class="tooltip-text">32 questões corretas de 40 tentadas. Média de acerto: 80%</span>
          </span>
          <span class="progress-percentage">80%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Grid with 3 progress bars (Math 90%, Portuguese 65%, Science 40%)
 */
export const MultipleProgress = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container">
      <div class="demo-label">Múltiplas Barras de Progresso por Disciplina</div>
      <div class="progress-grid">
        <div class="bg-progress-bar-success">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-calculator subject-icon"></i>
                Matemática - 18 de 20 exercícios
              </span>
              <span class="progress-percentage">90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-warning">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-journal-text subject-icon"></i>
                Língua Portuguesa - 13 de 20 exercícios
              </span>
              <span class="progress-percentage">65%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-danger">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-atom subject-icon"></i>
                Ciências - 8 de 20 exercícios
              </span>
              <span class="progress-percentage">40%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 375px responsive layout with stacked label and bar
 */
export const MobileView = {
  render: () => `
    ${componentStyles}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="demo-container mobile-viewport">
      <div class="demo-label">Visualização Mobile (375px)</div>
      
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-trophy subject-icon"></i>
            Missões Completadas
          </span>
          <span class="progress-percentage">72%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clipboard-check subject-icon"></i>
              Atividades Entregues
            </span>
            <span class="progress-percentage">55%</span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};
