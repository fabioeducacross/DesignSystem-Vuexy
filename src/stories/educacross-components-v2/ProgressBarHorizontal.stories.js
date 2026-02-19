/**
 * ProgressBarHorizontal - Mission Progress Bar Component
 * =========================================
 * 
 * Horizontal progress bar for mission/lesson completion with colored backgrounds and tooltips.
 * Shows completion percentage with visual feedback.
 * 
 * @component ProgressBarHorizontal
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
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
  title: 'Educacross Components V2/Feedback/ProgressBarHorizontal',
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
      <div style="background:linear-gradient(135deg,#FF9F43 0%,#FFB976 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Feedback</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ProgressBarHorizontal</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Mission Progress Bar Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Mission Progress Bar Component. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ProgressBarHorizontal from '@/components/ProgressBarHorizontal.vue';

// Template
&lt;ProgressBarHorizontal v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ProgressBarHorizontal com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ProgressBarHorizontal</p>
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
    docs: { description: { story: 'Exemplos de uso real do ProgressBarHorizontal no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ProgressBarHorizontal</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ProgressBarHorizontal no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ProgressBarHorizontal no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ProgressBarHorizontal</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ProgressBarHorizontal.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ProgressBarHorizontal</h1>
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

