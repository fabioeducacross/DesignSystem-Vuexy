/**
 * ProgressBarVertical - Vertical Progress Bar
 * ===========================================
 * Barra de progresso vertical com porcentagem e
 * sistema de cores de proficiência.
 * 
 * @component ProgressBarVertical
 * @source educacross-frontoffice/src/components/progessBar/ProgressBarVertical.vue
 */

export default {
  title: 'Educacross Components V2/ProgressBarVertical',
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
    height: {
      control: 'text',
      description: 'Altura da barra (ex: "8px", "10px")',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Mostrar porcentagem ao lado',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Barra de progresso vertical com porcentagem ao lado, usada em contextos onde o espaço vertical é restrito (tabelas, cards compactos).',
      },
    },
  },
};

// Estilos Figma-style
const componentStyles = `
.progress-bar-vertical {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.progress-bar-vertical .percentage {
  font-weight: 800;
  font-size: 14px;
  color: #5e5873;
  min-width: 40px;
  white-space: nowrap;
}

.progress-bar-vertical .progress {
  flex: 1;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f2f7;
}

.progress-bar-vertical .progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

/* Proficiency Colors */
.progress-bar-vertical .bg-danger {
  background-color: #ea5455 !important;
}

.progress-bar-vertical .bg-warning {
  background-color: #ffb443 !important;
}

.progress-bar-vertical .bg-success {
  background-color: #28c76f !important;
}

.progress-bar-vertical .bg-primary {
  background-color: #7367f0 !important;
}
`;

const renderProgressBar = (args) => `
<div class="progress-bar-vertical">
  ${args.showPercentage ? `<span class="percentage">${args.value}%</span>` : ''}
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
</div>
`;

export const Default = {
  args: {
    value: 65,
    variant: 'success',
    height: '8px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const AbaixoBasico = {
  args: {
    value: 25,
    variant: 'danger',
    height: '8px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Basico = {
  args: {
    value: 45,
    variant: 'warning',
    height: '8px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Proficiente = {
  args: {
    value: 72,
    variant: 'success',
    height: '8px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Avancado = {
  args: {
    value: 88,
    variant: 'primary',
    height: '8px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const SemPorcentagem = {
  args: {
    value: 60,
    variant: 'success',
    height: '8px',
    showPercentage: false,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const BarraAlta = {
  args: {
    value: 78,
    variant: 'success',
    height: '12px',
    showPercentage: true,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const TabelaAlunos = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Progresso dos Alunos - 5º Ano A</h5>
          <small class="text-muted">Missão: Operações Matemáticas</small>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th style="width: 250px;">Progresso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana Silva</td>
                <td>${renderProgressBar({ value: 85, variant: 'primary', height: '8px', showPercentage: true })}</td>
              </tr>
              <tr>
                <td>Bruno Santos</td>
                <td>${renderProgressBar({ value: 68, variant: 'success', height: '8px', showPercentage: true })}</td>
              </tr>
              <tr>
                <td>Carla Oliveira</td>
                <td>${renderProgressBar({ value: 42, variant: 'warning', height: '8px', showPercentage: true })}</td>
              </tr>
              <tr>
                <td>Daniel Costa</td>
                <td>${renderProgressBar({ value: 28, variant: 'danger', height: '8px', showPercentage: true })}</td>
              </tr>
              <tr>
                <td>Eduarda Lima</td>
                <td>${renderProgressBar({ value: 75, variant: 'success', height: '8px', showPercentage: true })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
};

export const CardCompacto = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px;">
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 1</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Frações</p>
          ${renderProgressBar({ value: 92, variant: 'primary', height: '8px', showPercentage: true })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 2</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Decimais</p>
          ${renderProgressBar({ value: 78, variant: 'success', height: '8px', showPercentage: true })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 3</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Porcentagem</p>
          ${renderProgressBar({ value: 55, variant: 'success', height: '8px', showPercentage: true })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 4</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Proporção</p>
          ${renderProgressBar({ value: 38, variant: 'warning', height: '8px', showPercentage: true })}
        </div>
      </div>
    </div>
  `,
};

export const EdgeCases = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Não iniciado</strong></p>
        ${renderProgressBar({ value: 0, variant: 'danger', height: '8px', showPercentage: true })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Início</strong></p>
        ${renderProgressBar({ value: 5, variant: 'danger', height: '8px', showPercentage: true })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        ${renderProgressBar({ value: 50, variant: 'warning', height: '8px', showPercentage: true })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        ${renderProgressBar({ value: 95, variant: 'primary', height: '8px', showPercentage: true })}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        ${renderProgressBar({ value: 100, variant: 'primary', height: '8px', showPercentage: true })}
      </div>
    </div>
  `,
};


