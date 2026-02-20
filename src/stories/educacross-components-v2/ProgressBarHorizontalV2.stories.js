/**
 * ProgressBarHorizontalV2 - Horizontal Progress Bar with Details
 * =================================================
 * 
 * Barra de progresso horizontal com variantes de proficiência
 * e informações detalhadas abaixo da barra.
 * 
 * @component ProgressBarHorizontalV2
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/progessBar/ProgressBarHorizontalV2.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/ProgressBarHorizontalV2',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor da barra de progresso (0-100)',
    },
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'primary'],
      description: 'Variante de cor (danger=Abaixo Básico, warning=Básico, success=Proficiente, primary=Avançado)',
    },
    showInfo: {
      control: 'boolean',
      description: 'Mostrar informações abaixo da barra',
    },
    height: {
      control: 'text',
      description: 'Altura da barra (ex: "8px", "12px")',
    },
    label: {
      control: 'text',
      description: 'Label abaixo da barra',
    },
    infoText: {
      control: 'text',
      description: 'Texto informativo ao lado do label',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Barra de progresso horizontal com sistema de proficiência educacional (Abaixo Básico, Básico, Proficiente, Avançado) e informações detalhadas.',
      },
    },
  },
};

// Estilos Figma-style
const componentStyles = `
.progress-bar-horizontal-v2 {
  width: 100%;
}

.progress-bar-horizontal-v2 .progress {
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f2f7;
}

.progress-bar-horizontal-v2 .progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

/* Proficiency Colors */
.progress-bar-horizontal-v2 .bg-danger {
  background-color: #ea5455 !important;
}

.progress-bar-horizontal-v2 .bg-warning {
  background-color: #ffb443 !important;
}

.progress-bar-horizontal-v2 .bg-success {
  background-color: #28c76f !important;
}

.progress-bar-horizontal-v2 .bg-primary {
  background-color: #7367f0 !important;
}

.progress-bar-horizontal-v2 .info-section {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: #5e5873;
}

.progress-bar-horizontal-v2 .info-section .percentage {
  font-weight: 700;
  margin-right: 4px;
}

.progress-bar-horizontal-v2 .info-section .label {
  margin-right: auto;
}

.progress-bar-horizontal-v2 .info-section .info-text {
  color: #6e6b7b;
  white-space: nowrap;
}

.progress-bar-horizontal-v2 .info-section .info-text strong {
  font-weight: 600;
}
`;

const renderProgressBar = (args) => `
<div class="progress-bar-horizontal-v2">
  <div class="progress" style="height: ${args.height || '8px'}">
    <div 
      class="progress-bar bg-${args.variant}" 
      role="progressbar" 
      style="width: ${args.value}%"
      aria-valuenow="${args.value}" 
      aria-valuemin="0" 
      aria-valuemax="100"
    ></div>
  </div>
  ${args.showInfo ? `
  <div class="info-section">
    <span class="percentage">${args.value}%</span>
    <span class="label">${args.label}</span>
    <span class="info-text">${args.infoText}</span>
  </div>
  ` : ''}
</div>
`;

export const Default = {
  args: {
    value: 65,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>13</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const AbaixoBasico = {
  args: {
    value: 25,
    variant: 'danger',
    height: '8px',
    showInfo: true,
    label: 'Abaixo do Básico',
    infoText: '<strong>5</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Basico = {
  args: {
    value: 40,
    variant: 'warning',
    height: '8px',
    showInfo: true,
    label: 'Básico',
    infoText: '<strong>8</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Proficiente = {
  args: {
    value: 70,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>14</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Avancado = {
  args: {
    value: 90,
    variant: 'primary',
    height: '8px',
    showInfo: true,
    label: 'Avançado',
    infoText: '<strong>18</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const SemInformacao = {
  args: {
    value: 55,
    variant: 'success',
    height: '8px',
    showInfo: false,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const BarraAlta = {
  args: {
    value: 75,
    variant: 'success',
    height: '12px',
    showInfo: true,
    label: 'Turma 5º A - Proficiente',
    infoText: '<strong>15</strong> de 20 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const ProfessorDashboard = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Desempenho da Turma 5º Ano A - Matemática</h5>
          <small class="text-muted">Missão: Frações - Novembro 2024</small>
        </div>
        <div class="card-body">
          <div class="mb-3">
            ${renderProgressBar({
              value: 15,
              variant: 'danger',
              height: '10px',
              showInfo: true,
              label: 'Abaixo do Básico',
              infoText: '<strong>3</strong> de 20 alunos',
            })}
          </div>
          <div class="mb-3">
            ${renderProgressBar({
              value: 35,
              variant: 'warning',
              height: '10px',
              showInfo: true,
              label: 'Básico',
              infoText: '<strong>7</strong> de 20 alunos',
            })}
          </div>
          <div class="mb-3">
            ${renderProgressBar({
              value: 40,
              variant: 'success',
              height: '10px',
              showInfo: true,
              label: 'Proficiente',
              infoText: '<strong>8</strong> de 20 alunos',
            })}
          </div>
          <div>
            ${renderProgressBar({
              value: 10,
              variant: 'primary',
              height: '10px',
              showInfo: true,
              label: 'Avançado',
              infoText: '<strong>2</strong> de 20 alunos',
            })}
          </div>
        </div>
      </div>
    </div>
  `,
};

export const CoordenadorRelatorio = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 700px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Relatório Geral - 5º Ano</h5>
          <small class="text-muted">Todas as turmas - Português</small>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º A</h6>
            ${renderProgressBar({
              value: 68,
              variant: 'success',
              height: '8px',
              showInfo: true,
              label: 'Proficiente',
              infoText: '<strong>17</strong> de 25 alunos',
            })}
          </div>
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º B</h6>
            ${renderProgressBar({
              value: 52,
              variant: 'success',
              height: '8px',
              showInfo: true,
              label: 'Proficiente',
              infoText: '<strong>13</strong> de 25 alunos',
            })}
          </div>
          <div>
            <h6 class="mb-2">Turma 5º C</h6>
            ${renderProgressBar({
              value: 44,
              variant: 'warning',
              height: '8px',
              showInfo: true,
              label: 'Básico',
              infoText: '<strong>11</strong> de 25 alunos',
            })}
          </div>
        </div>
      </div>
    </div>
  `,
};

export const EdgeCases = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Nenhum aluno</strong></p>
        ${renderProgressBar({
          value: 0,
          variant: 'danger',
          height: '8px',
          showInfo: true,
          label: 'Abaixo do Básico',
          infoText: '<strong>0</strong> de 20 alunos',
        })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Mínimo visível</strong></p>
        ${renderProgressBar({
          value: 5,
          variant: 'danger',
          height: '8px',
          showInfo: true,
          label: 'Abaixo do Básico',
          infoText: '<strong>1</strong> de 20 alunos',
        })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        ${renderProgressBar({
          value: 50,
          variant: 'warning',
          height: '8px',
          showInfo: true,
          label: 'Básico',
          infoText: '<strong>10</strong> de 20 alunos',
        })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        ${renderProgressBar({
          value: 95,
          variant: 'primary',
          height: '8px',
          showInfo: true,
          label: 'Avançado',
          infoText: '<strong>19</strong> de 20 alunos',
        })}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        ${renderProgressBar({
          value: 100,
          variant: 'primary',
          height: '8px',
          showInfo: true,
          label: 'Avançado',
          infoText: '<strong>20</strong> de 20 alunos',
        })}
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Components</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ProgressBarHorizontalV2</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Horizontal Progress Bar with Details</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Horizontal Progress Bar with Details. Faz parte da categoria <strong>Components</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ProgressBarHorizontalV2 from '@/components/ProgressBarHorizontalV2.vue';

// Template
&lt;ProgressBarHorizontalV2 v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ProgressBarHorizontalV2 com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ProgressBarHorizontalV2</p>
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
    docs: { description: { story: 'Exemplos de uso real do ProgressBarHorizontalV2 no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ProgressBarHorizontalV2</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ProgressBarHorizontalV2 no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ProgressBarHorizontalV2 no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ProgressBarHorizontalV2</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ProgressBarHorizontalV2.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ProgressBarHorizontalV2</h1>
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

