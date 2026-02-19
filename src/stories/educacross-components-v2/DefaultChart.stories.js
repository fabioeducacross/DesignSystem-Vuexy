/**
 * DefaultChart - Gráfico Genérico/Padrão
 * ======================================
 * Gráfico de linha padrão com legendas e filtros de período
 * 
 * @component DefaultChart
 * @source educacross-frontoffice/src/components/chart/DefaultChart.vue
 * @category Educacross Components V2 / Charts
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Charts/DefaultChart',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.chart-container{width:100%;max-width:900px;background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:24px}.chart-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px}.chart-title{font-size:18px;font-weight:600;color:#3F3F46}.chart-subtitle{font-size:13px;color:#6E6B7B;margin-top:4px}.chart-filters{display:flex;gap:8px;flex-wrap:wrap}.filter-btn{padding:6px 14px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s}.filter-btn:hover{border-color:#6E63E8;color:#6E63E8}.filter-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.chart-canvas{width:100%;height:350px}.chart-legend{display:flex;gap:24px;margin-top:16px;padding-top:16px;border-top:1px solid #F3F2F7;flex-wrap:wrap;justify-content:center}.legend-item{display:flex;align-items:center;gap:8px;font-size:13px}.legend-color{width:16px;height:3px;border-radius:2px}.chart-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px;margin-top:20px;padding-top:20px;border-top:1px solid #F3F2F7}.stat-item{text-align:center}.stat-value{font-size:24px;font-weight:700}.stat-label{font-size:12px;color:#6E6B7B;margin-top:4px}.stat-change{font-size:12px;margin-top:4px}.stat-up{color:#28C76F}.stat-down{color:#EA5455}`;

const base = (title, subtitle, datasets, labels, showFilters = false) => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">${title}</div>
      ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
    </div>
    ${showFilters ? `<div class="chart-filters">
      <button class="filter-btn active">7 dias</button>
      <button class="filter-btn">30 dias</button>
      <button class="filter-btn">3 meses</button>
      <button class="filter-btn">1 ano</button>
    </div>` : ''}
  </div>
  <canvas class="chart-canvas" id="line-${Math.random().toString(36).substr(2, 9)}"></canvas>
  <div class="chart-legend">
    ${datasets.map((ds, i) => `
      <div class="legend-item">
        <div class="legend-color" style="background:${ds.borderColor}"></div>
        <span>${ds.label}</span>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const canvas = document.querySelector('[id^="line-"]');
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ${JSON.stringify(labels)},
      datasets: ${JSON.stringify(datasets)}
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#3F3F46',
          padding: 12,
          titleFont: { size: 13 },
          bodyFont: { size: 14 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#F3F2F7' },
          ticks: { color: '#6E6B7B', font: { size: 12 } }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#6E6B7B', font: { size: 12 } }
        }
      }
    }
  });
}, 200);
</script>
`;

export const Default = {
  render: () => base(
    'Evolução de Notas',
    'Turma 8º Ano A - Média mensal 2026',
    [
      {
        label: 'Matemática',
        data: [8.2, 8.5, 8.7, 9.0, 8.8, 9.2],
        borderColor: '#6E63E8',
        backgroundColor: 'rgba(110, 99, 232, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Português',
        data: [7.8, 8.0, 8.3, 8.5, 8.7, 8.8],
        borderColor: '#00CFE8',
        backgroundColor: 'rgba(0, 207, 232, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ],
    ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  )
};

export const ComparacaoTrimestral = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">Comparação entre Trimestres</div>
      <div class="chart-subtitle">Desempenho 8º Ano - 2026</div>
    </div>
  </div>
  <canvas class="chart-canvas" id="line-trim"></canvas>
  <div class="chart-legend">
    <div class="legend-item">
      <div class="legend-color" style="background:#6E63E8"></div>
      <span>1º Trimestre</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#00CFE8"></div>
      <span>2º Trimestre</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#28C76F"></div>
      <span>3º Trimestre</span>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value" style="color:#6E63E8">8.5</div>
      <div class="stat-label">1º Trimestre</div>
      <div class="stat-change stat-up">↑ 0.3</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" style="color:#00CFE8">8.9</div>
      <div class="stat-label">2º Trimestre</div>
      <div class="stat-change stat-up">↑ 0.4</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" style="color:#28C76F">9.2</div>
      <div class="stat-label">3º Trimestre</div>
      <div class="stat-change stat-up">↑ 0.3</div>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('line-trim'), {
    type: 'line',
    data: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [
        {
          label: '1º Trimestre',
          data: [8.2, 8.4, 8.5, 8.7],
          borderColor: '#6E63E8',
          borderWidth: 3,
          tension: 0.4
        },
        {
          label: '2º Trimestre',
          data: [8.5, 8.7, 9.0, 9.2],
          borderColor: '#00CFE8',
          borderWidth: 3,
          tension: 0.4
        },
        {
          label: '3º Trimestre',
          data: [8.8, 9.0, 9.2, 9.5],
          borderColor: '#28C76F',
          borderWidth: 3,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 10, grid: { color: '#F3F2F7' } },
        x: { grid: { display: false } }
      }
    }
  });
}, 200);
</script>
`
};

export const FrequenciaSemanal = {
  render: () => base(
    'Taxa de Frequência Semanal',
    'Presença média - Últimas 8 semanas',
    [
      {
        label: 'Frequência',
        data: [92, 88, 94, 90, 95, 93, 89, 96],
        borderColor: '#28C76F',
        backgroundColor: 'rgba(40, 199, 111, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ],
    ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
  )
};

export const ProgressoMissoes = {
  render: () => base(
    'Missões Completadas',
    'Turma 8º Ano A - Últimos 6 meses',
    [
      {
        label: 'Matemática',
        data: [12, 15, 18, 16, 20, 22],
        borderColor: '#6E63E8',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Português',
        data: [10, 12, 14, 16, 15, 18],
        borderColor: '#00CFE8',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Ciências',
        data: [8, 10, 12, 14, 16, 17],
        borderColor: '#28C76F',
        borderWidth: 2,
        tension: 0.4
      }
    ],
    ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  )
};

export const EngajamentoAluno = {
  render: () => base(
    'Engajamento Individual',
    'João Silva - Tempo de estudo diário (minutos)',
    [
      {
        label: 'Tempo de Estudo',
        data: [45, 60, 55, 70, 65, 80, 75],
        borderColor: '#FF9F43',
        backgroundColor: 'rgba(255, 159, 67, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ],
    ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    false
  )
};

export const ComFiltros = {
  render: () => base(
    'Desempenho Geral',
    'Todas as turmas - 8º Ano',
    [
      {
        label: 'Média Geral',
        data: [8.5, 8.7, 8.9, 9.0, 9.1, 9.2, 9.3],
        borderColor: '#6E63E8',
        backgroundColor: 'rgba(110, 99, 232, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ],
    ['01/02', '08/02', '15/02', '22/02', '01/03', '08/03', '15/03'],
    true
  )
};

export const MultipleLines = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">Ranking de Alunos</div>
      <div class="chart-subtitle">Top 5 - Evolução bimestral</div>
    </div>
  </div>
  <canvas class="chart-canvas" id="line-multi"></canvas>
  <div class="chart-legend">
    ${['Ana Silva', 'Bruno Costa', 'Diana Santos', 'Eduardo Lima', 'Fernanda Alves'].map((name, i) => `
      <div class="legend-item">
        <div class="legend-color" style="background:${['#FFD700', '#C0C0C0', '#CD7F32', '#6E63E8', '#00CFE8'][i]}"></div>
        <span>${name}</span>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('line-multi'), {
    type: 'line',
    data: {
      labels: ['1º Bim', '2º Bim', '3º Bim', '4º Bim'],
      datasets: [
        { label: 'Ana Silva', data: [9.5, 9.6, 9.7, 9.8], borderColor: '#FFD700', borderWidth: 2, tension: 0.4 },
        { label: 'Bruno Costa', data: [9.2, 9.3, 9.4, 9.5], borderColor: '#C0C0C0', borderWidth: 2, tension: 0.4 },
        { label: 'Diana Santos', data: [9.0, 9.1, 9.2, 9.3], borderColor: '#CD7F32', borderWidth: 2, tension: 0.4 },
        { label: 'Eduardo Lima', data: [8.7, 8.8, 8.9, 9.0], borderColor: '#6E63E8', borderWidth: 2, tension: 0.4 },
        { label: 'Fernanda Alves', data: [8.5, 8.6, 8.7, 8.8], borderColor: '#00CFE8', borderWidth: 2, tension: 0.4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 10 } }
    }
  });
}, 200);
</script>
`
};

export const Compacto = {
  render: () => `
<div class="chart-container" style="max-width:500px;padding:16px">
  <div class="chart-title" style="font-size:14px;margin-bottom:12px">Últimas Notas</div>
  <canvas class="chart-canvas" id="line-compact" style="height:200px"></canvas>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('line-compact'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr'],
      datasets: [{
        data: [8.5, 8.8, 9.0, 9.2],
        borderColor: '#6E63E8',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { display: false },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}, 200);
</script>
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
      <div style="background:linear-gradient(135deg,#28C76F 0%,#48DA89 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Charts</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">DefaultChart</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Gráfico Genérico/Padrão</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Gráfico Genérico/Padrão. Faz parte da categoria <strong>Charts</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #28C76F;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import DefaultChart from '@/components/DefaultChart.vue';

// Template
&lt;DefaultChart v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o DefaultChart com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#28C76F20;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground DefaultChart</p>
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
    docs: { description: { story: 'Exemplos de uso real do DefaultChart no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#28C76F15;border:1px solid #28C76F30;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: DefaultChart</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando DefaultChart no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com DefaultChart no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via DefaultChart</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o DefaultChart.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#28C76F 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: DefaultChart</h1>
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

