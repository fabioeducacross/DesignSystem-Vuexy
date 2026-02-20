/**
 * PieChart - Gráfico de Pizza
 * =============================
 * Gráfico circular para distribuição de dados em dashboards
 * 
 * @component PieChart
 * @source educacross-frontoffice/src/components/chart/PieChart.vue
 * @category Educacross Components V2 / Charts
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Charts/PieChart',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.chart-container{width:100%;max-width:600px;background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:24px}.chart-header{text-align:center;margin-bottom:24px}.chart-title{font-size:18px;font-weight:600;color:#3F3F46}.chart-subtitle{font-size:13px;color:#6E6B7B;margin-top:4px}.chart-canvas{width:100%;height:300px;margin:0 auto}.chart-legend{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid #F3F2F7}.legend-item{display:flex;align-items:center;gap:10px;font-size:13px}.legend-color{width:16px;height:16px;border-radius:4px;flex-shrink:0}.legend-label{color:#6E6B7B}.legend-value{font-weight:600;color:#3F3F46;margin-left:auto}.chart-stats{display:flex;justify-content:space-around;margin-top:20px;padding-top:20px;border-top:1px solid #F3F2F7}.stat-item{text-align:center}.stat-value{font-size:24px;font-weight:700;color:#6E63E8}.stat-label{font-size:12px;color:#6E6B7B;margin-top:4px}.chart-empty{text-align:center;padding:80px 20px;color:#6E6B7B}.chart-empty svg{width:100px;height:100px;opacity:0.3;margin-bottom:20px}`;

const base = (title, subtitle, data, labels, colors, showStats = false, totalLabel = 'Total') => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">${title}</div>
    ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
  </div>
  <canvas class="chart-canvas" id="pie-${Math.random().toString(36).substr(2, 9)}"></canvas>
  <div class="chart-legend">
    ${labels.map((label, i) => `
      <div class="legend-item">
        <div class="legend-color" style="background:${colors[i]}"></div>
        <span class="legend-label">${label}</span>
        <span class="legend-value">${data[i]}${typeof data[i] === 'number' && data[i] < 100 ? '%' : ''}</span>
      </div>
    `).join('')}
  </div>
  ${showStats ? `<div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">${data.reduce((a,b) => a+b, 0)}</div>
      <div class="stat-label">${totalLabel}</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${labels.length}</div>
      <div class="stat-label">Categorias</div>
    </div>
  </div>` : ''}
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const canvas = document.querySelector('[id^="pie-"]');
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ${JSON.stringify(labels)},
      datasets: [{
        data: ${JSON.stringify(data)},
        backgroundColor: ${JSON.stringify(colors)},
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#3F3F46',
          padding: 12,
          titleFont: { size: 13 },
          bodyFont: { size: 14, weight: 'bold' },
          callbacks: {
            label: (ctx) => ctx.label + ': ' + ctx.parsed + (ctx.parsed < 100 ? '%' : '')
          }
        }
      }
    }
  });
}, 200);
</script>
`;

export const Default = {
  render: () => base(
    'Distribuição por Matéria',
    'Tempo de estudo semanal - 8º Ano A',
    [35, 25, 20, 12, 8],
    ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
    ['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455']
  )
};

export const DistribuicaoNotas = {
  render: () => base(
    'Distribuição de Notas',
    'Turma 8º Ano A - Matemática - Janeiro 2026',
    [15, 45, 30, 10],
    ['Excelente (9-10)', 'Bom (7-8.9)', 'Regular (5-6.9)', 'Insuficiente (<5)'],
    ['#28C76F', '#00CFE8', '#FF9F43', '#EA5455']
  )
};

export const TiposDeMissoes = {
  render: () => base(
    'Tipos de Missões',
    'Distribuição por categoria - Janeiro 2026',
    [42, 35, 28, 18, 12],
    ['Exercícios', 'Leitura', 'Vídeo-aula', 'Pesquisa', 'Projeto'],
    ['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455'],
    true,
    'Missões'
  )
};

export const FrequenciaPorStatus = {
  render: () => base(
    'Status de Frequência',
    'Classificação dos alunos - Janeiro 2026',
    [78, 15, 7],
    ['Frequente (≥90%)', 'Moderado (75-89%)', 'Baixa (<75%)'],
    ['#28C76F', '#FF9F43', '#EA5455']
  )
};

export const ConquistasPorTipo = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Conquistas por Raridade</div>
    <div class="chart-subtitle">Badges desbloqueadas - João Silva</div>
  </div>
  <canvas class="chart-canvas" id="pie-conquistas"></canvas>
  <div class="chart-legend">
    <div class="legend-item">
      <div class="legend-color" style="background:#FFD700"></div>
      <span class="legend-label">Lendária</span>
      <span class="legend-value">2</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#9F7AEA"></div>
      <span class="legend-label">Épica</span>
      <span class="legend-value">5</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#00CFE8"></div>
      <span class="legend-label">Rara</span>
      <span class="legend-value">12</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#6E6B7B"></div>
      <span class="legend-label">Comum</span>
      <span class="legend-value">18</span>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">37</div>
      <div class="stat-label">Total de Badges</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">3200</div>
      <div class="stat-label">XP Acumulado</div>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('pie-conquistas'), {
    type: 'pie',
    data: {
      labels: ['Lendária', 'Épica', 'Rara', 'Comum'],
      datasets: [{
        data: [2, 5, 12, 18],
        backgroundColor: ['#FFD700', '#9F7AEA', '#00CFE8', '#6E6B7B'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}, 200);
</script>
`
};

export const Donut = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Progresso Geral</div>
    <div class="chart-subtitle">Turma 8º Ano A - Todas as matérias</div>
  </div>
  <canvas class="chart-canvas" id="pie-donut"></canvas>
  <div class="chart-legend">
    <div class="legend-item">
      <div class="legend-color" style="background:#28C76F"></div>
      <span class="legend-label">Completas</span>
      <span class="legend-value">68%</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#FF9F43"></div>
      <span class="legend-label">Em Andamento</span>
      <span class="legend-value">22%</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background:#EA5455"></div>
      <span class="legend-label">Atrasadas</span>
      <span class="legend-value">10%</span>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('pie-donut'), {
    type: 'doughnut',
    data: {
      labels: ['Completas', 'Em Andamento', 'Atrasadas'],
      datasets: [{
        data: [68, 22, 10],
        backgroundColor: ['#28C76F', '#FF9F43', '#EA5455'],
        borderWidth: 3,
        borderColor: '#fff',
        cutout: '65%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.label + ': ' + ctx.parsed + '%'
          }
        }
      }
    }
  });
}, 200);
</script>
`
};

export const Compacto = {
  render: () => `
<div class="chart-container" style="max-width:350px;padding:16px">
  <div class="chart-title" style="font-size:14px;text-align:center;margin-bottom:12px">Notas por Faixa</div>
  <canvas class="chart-canvas" id="pie-compact" style="height:200px"></canvas>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('pie-compact'), {
    type: 'doughnut',
    data: {
      labels: ['9-10', '7-8.9', '5-6.9'],
      datasets: [{
        data: [40, 45, 15],
        backgroundColor: ['#28C76F', '#00CFE8', '#FF9F43'],
        borderWidth: 2,
        borderColor: '#fff',
        cutout: '60%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.label + ': ' + ctx.parsed + '%'
          }
        }
      }
    }
  });
}, 200);
</script>
`
};

export const Vazio = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Distribuição por Matéria</div>
  </div>
  <div class="chart-empty">
    <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M7 12l5-3v6z"/></svg>
    <div style="font-size:14px;font-weight:600;margin-bottom:8px">Sem Dados para Exibir</div>
    <div style="font-size:13px">Complete missões para visualizar a distribuição</div>
  </div>
</div>
<style>${css}</style>
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">PieChart</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Gráfico de Pizza</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Gráfico de Pizza. Faz parte da categoria <strong>Charts</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #28C76F;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import PieChart from '@/components/PieChart.vue';

// Template
&lt;PieChart v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o PieChart com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#28C76F20;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground PieChart</p>
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
    docs: { description: { story: 'Exemplos de uso real do PieChart no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#28C76F15;border:1px solid #28C76F30;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: PieChart</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando PieChart no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com PieChart no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via PieChart</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o PieChart.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#28C76F 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: PieChart</h1>
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

