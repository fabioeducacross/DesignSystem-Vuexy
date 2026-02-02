/**
 * RainbowProgressBar - Barra de Progresso Arco-Íris
 * ===================================================
 * Barra de progresso com gradiente de cores do arco-íris, usado para indicar proficiência.
 *
 * @component RainbowProgressBar
 * @source educacross-frontoffice/src/components/progessBar/RainbowProgressBar.vue
 */

export default {
  title: 'Educacross Components V2/Feedback/RainbowProgressBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Barra de progresso com gradiente arco-íris que indica nível de proficiência através de um triângulo posicionado.

## Contexto de Uso

### Professor
- Visualiza progresso médio da turma
- Acompanha evolução de proficiência
- Identifica nível geral rapidamente

### Coordenador
- Analisa desempenho agregado
- Compara turmas visualmente
- Monitora tendências de aprendizagem

### Aluno
- Visualiza sua proficiência atual
- Entende onde está no espectro
- Acompanha evolução

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`value\` | Number | 0 | Valor de 0-100 indicando posição |
| \`showLegend\` | Boolean | false | Exibe legenda de cores |

## Cores do Gradiente

- **Vermelho** (0-25%): Abaixo do Básico
- **Amarelo** (25-50%): Básico
- **Verde** (50-75%): Proficiente
- **Roxo** (75-100%): Avançado

O gradiente correto é:
\`linear-gradient(90deg, #ea5455 -1.31%, #ffb443 34.59%, #28c76f 66.8%, #7367f0 100.06%)\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor de 0 a 100',
    },
    showLegend: {
      control: 'boolean',
      description: 'Exibir legenda de cores',
    },
  },
};

const styles = `
<style>
  :root {
    --rainbow-red: #ea5455;
    --rainbow-yellow: #ffb443;
    --rainbow-green: #28c76f;
    --rainbow-purple: #7367f0;
  }

  .rainbow-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .rainbow-bar {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      90deg,
      #ea5455 -1.31%,
      #ffb443 34.59%,
      #28c76f 66.8%,
      #7367f0 100.06%
    );
  }

  .triangle-bar {
    margin-top: 3px;
    position: relative;
    height: 8px;
    background: linear-gradient(
      90deg,
      #ea5455 -1.31%,
      #ffb443 34.59%,
      #28c76f 66.8%,
      #7367f0 100.06%
    );
  }

  .legend {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 0.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .legend-red { background: var(--rainbow-red); }
  .legend-yellow { background: var(--rainbow-yellow); }
  .legend-green { background: var(--rainbow-green); }
  .legend-purple { background: var(--rainbow-purple); }

  .progress-info {
    text-align: center;
    margin-bottom: 1rem;
    color: #5d596c;
  }

  .progress-value {
    font-size: 2rem;
    font-weight: 600;
    color: var(--rainbow-purple);
  }

  .progress-label {
    font-size: 0.875rem;
    color: #82868b;
  }
</style>
`;

const calculateTrianglePosition = (value) => {
  let v = Math.max(0, Math.min(100, value));
  let offset = 0;
  
  if (v < 4) offset = 4;
  else if (v > 96) offset = -4;
  
  return `clip-path: polygon(
    calc(${v}% + ${offset}px) 0%,
    calc(${v}% + ${offset - 4}px) 100%,
    calc(${v}% + ${offset + 4}px) 100%
  );`;
};

const getLevelLabel = (value) => {
  if (value < 25) return 'Abaixo do Básico';
  if (value < 50) return 'Básico';
  if (value < 75) return 'Proficiente';
  return 'Avançado';
};

const bar = (value = 60, showLegend = false, showInfo = false) => `
  <div class="rainbow-container">
    ${showInfo ? `
      <div class="progress-info">
        <div class="progress-value">${value}%</div>
        <div class="progress-label">${getLevelLabel(value)}</div>
      </div>
    ` : ''}
    <div class="rainbow-bar"></div>
    <div class="triangle-bar" style="${calculateTrianglePosition(value)}"></div>
    ${showLegend ? `
      <div class="legend">
        <div class="legend-item">
          <span class="legend-dot legend-red"></span>
          <span>Abaixo do Básico</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot legend-yellow"></span>
          <span>Básico</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot legend-green"></span>
          <span>Proficiente</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot legend-purple"></span>
          <span>Avançado</span>
        </div>
      </div>
    ` : ''}
  </div>
`;

export const Default = {
  args: { value: 60, showLegend: false },
  render: (args) => `${styles}<div style="padding:2rem;">${bar(args.value, args.showLegend)}</div>`,
};

export const WithLegend = {
  render: () => `${styles}<div style="padding:2rem;">${bar(60, true)}</div>`,
};

export const WithInfo = {
  render: () => `${styles}<div style="padding:2rem;">${bar(75, true, true)}</div>`,
};

export const AllLevels = {
  render: () => `
    ${styles}
    <div style="padding:2rem;display:flex;flex-direction:column;gap:2rem;">
      <div>
        <h4 style="margin-bottom:0.5rem;color:#ea5455;">Abaixo do Básico (15%)</h4>
        ${bar(15, false, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;color:#ffb443;">Básico (40%)</h4>
        ${bar(40, false, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;color:#28c76f;">Proficiente (65%)</h4>
        ${bar(65, false, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;color:#7367f0;">Avançado (90%)</h4>
        ${bar(90, false, true)}
      </div>
    </div>
  `,
};

export const EdgeCases = {
  render: () => `
    ${styles}
    <div style="padding:2rem;display:flex;flex-direction:column;gap:2rem;">
      <div>
        <h4 style="margin-bottom:0.5rem;">Mínimo (0%)</h4>
        ${bar(0, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;">Baixo (5%)</h4>
        ${bar(5, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;">Alto (95%)</h4>
        ${bar(95, true)}
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem;">Máximo (100%)</h4>
        ${bar(100, true)}
      </div>
    </div>
  `,
};

export const ProfessorContext = {
  render: () => `
    ${styles}
    <style>
      .class-progress {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .class-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #5d596c;
        margin-bottom: 1.5rem;
      }
      .progress-item {
        margin-bottom: 2rem;
      }
      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .student-name {
        font-weight: 500;
        color: #5d596c;
      }
      .progress-percent {
        font-size: 0.875rem;
        color: #82868b;
      }
    </style>
    <div class="class-progress">
      <div class="class-title">📊 Progresso da Turma - 5º Ano A</div>
      ${[
        { name: 'Maria Silva', value: 92 },
        { name: 'João Santos', value: 78 },
        { name: 'Ana Costa', value: 45 },
        { name: 'Pedro Oliveira', value: 25 },
      ].map(s => `
        <div class="progress-item">
          <div class="progress-header">
            <span class="student-name">${s.name}</span>
            <span class="progress-percent">${s.value}% - ${getLevelLabel(s.value)}</span>
          </div>
          ${bar(s.value)}
        </div>
      `).join('')}
    </div>
  `,
};

export const CoordinatorContext = {
  render: () => `
    ${styles}
    <style>
      .school-report {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .report-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #5d596c;
        margin-bottom: 2rem;
      }
      .class-comparison {
        display: grid;
        gap: 1.5rem;
      }
      .class-card {
        padding: 1.5rem;
        background: #f8f7fa;
        border-radius: 0.5rem;
        border-left: 4px solid var(--rainbow-purple);
      }
      .class-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .class-name {
        font-weight: 600;
        color: #5d596c;
      }
      .class-avg {
        color: #82868b;
        font-size: 0.875rem;
      }
    </style>
    <div class="school-report">
      <div class="report-title">📈 Relatório de Proficiência - Escola Municipal</div>
      <div class="class-comparison">
        ${[
          { name: '5º Ano A', avg: 72, color: '#28c76f' },
          { name: '5º Ano B', avg: 65, color: '#28c76f' },
          { name: '6º Ano A', avg: 58, color: '#28c76f' },
          { name: '6º Ano B', avg: 42, color: '#ffb443' },
        ].map(c => `
          <div class="class-card" style="border-left-color:${c.color};">
            <div class="class-header">
              <span class="class-name">${c.name}</span>
              <span class="class-avg">Média: ${c.avg}%</span>
            </div>
            ${bar(c.avg, false)}
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

export const StudentContext = {
  render: () => `
    ${styles}
    <style>
      .student-dashboard {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
      }
      .dashboard-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #5d596c;
        margin-bottom: 2rem;
      }
      .subject-progress {
        margin-bottom: 2rem;
        text-align: left;
      }
      .subject-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .subject-icon {
        font-size: 1.5rem;
      }
      .subject-name {
        font-weight: 500;
        color: #5d596c;
      }
    </style>
    <div class="student-dashboard">
      <div class="dashboard-title">🎯 Meu Desempenho</div>
      ${[
        { icon: '📐', name: 'Matemática', value: 85 },
        { icon: '📖', name: 'Português', value: 70 },
        { icon: '🌍', name: 'Geografia', value: 62 },
        { icon: '🔬', name: 'Ciências', value: 48 },
      ].map(s => `
        <div class="subject-progress">
          <div class="subject-header">
            <span class="subject-icon">${s.icon}</span>
            <span class="subject-name">${s.name}</span>
            <span style="margin-left:auto;font-size:0.875rem;color:#82868b;">${s.value}%</span>
          </div>
          ${bar(s.value)}
        </div>
      `).join('')}
    </div>
  `,
};

export const CompactMode = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <p style="margin-bottom:1rem;color:#5d596c;">Modo compacto para tabelas:</p>
      <div style="display:flex;flex-direction:column;gap:0.5rem;">
        ${bar(85)}
        ${bar(70)}
        ${bar(55)}
        ${bar(30)}
      </div>
    </div>
  `,
};

export const GradientShowcase = {
  render: () => `
    ${styles}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:2rem;color:#5d596c;">🌈 Gradiente de Cores Correto</h3>
      <div style="margin-bottom:1rem;">
        ${bar(50, true)}
      </div>
      <div style="margin-top:2rem;padding:1rem;background:#f8f7fa;border-radius:0.5rem;">
        <p style="margin:0;font-size:0.875rem;color:#82868b;">
          Gradiente: <code style="background:#e8e8e8;padding:0.25rem 0.5rem;border-radius:0.25rem;">
            #ea5455 → #ffb443 → #28c76f → #7367f0
          </code>
        </p>
      </div>
    </div>
  `,
};

export const Interactive = {
  args: { value: 60, showLegend: false },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;text-align:center;">
      <div style="margin-bottom:2rem;">
        <strong>Preview Interativo</strong>
        <p style="color:#666;font-size:0.875rem;margin:0.5rem 0;">Use o slider acima para ajustar o valor</p>
      </div>
      ${bar(args.value, args.showLegend, true)}
    </div>
  `,
};
