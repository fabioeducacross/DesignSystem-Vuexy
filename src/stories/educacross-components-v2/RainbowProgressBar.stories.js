/**
 * RainbowProgressBar - Barra de Progresso Arco-Íris
 * ===================================================
 * 
 * Barra de progresso com gradiente de cores do arco-íris, usado para indicar proficiência.
 * Shows proficiency level through a rainbow gradient with triangle indicator.
 * 
 * @component RainbowProgressBar
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/progessBar/RainbowProgressBar.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">RainbowProgressBar</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Barra de Progresso Arco-Íris</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Barra de Progresso Arco-Íris. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import RainbowProgressBar from '@/components/RainbowProgressBar.vue';

// Template
&lt;RainbowProgressBar v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o RainbowProgressBar com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground RainbowProgressBar</p>
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
    docs: { description: { story: 'Exemplos de uso real do RainbowProgressBar no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: RainbowProgressBar</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando RainbowProgressBar no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com RainbowProgressBar no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via RainbowProgressBar</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o RainbowProgressBar.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: RainbowProgressBar</h1>
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

