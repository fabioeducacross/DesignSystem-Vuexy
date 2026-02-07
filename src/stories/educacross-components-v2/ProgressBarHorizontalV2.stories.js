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
  title: 'Front-office/ProgressBarHorizontalV2',
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


