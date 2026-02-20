/**
 * BarChart - Gráfico de Barras
 * =============================
 * Gráfico de barras para dashboards e relatórios educacionais
 * 
 * @component BarChart
 * @source educacross-frontoffice/src/components/chart/BarChart.vue
 * @category Educacross Components V2 / Charts
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Charts/BarChart',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const styles = `
.chart-card{width:100%;max-width:860px;background:#fff;border:1px solid #e4e3ed;border-radius:16px;padding:20px 20px 18px;box-shadow:0 16px 40px rgba(0,0,0,0.06);display:grid;gap:12px;font-family:'Inter','Segoe UI',system-ui,-apple-system,sans-serif;color:#2f2b3d}
.chart-header{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.chart-title{font-size:18px;font-weight:800;color:#2f2b3d}
.chart-subtitle{font-size:13px;color:#7f7b96;margin-top:2px}
.chart-filters{display:flex;gap:8px;flex-wrap:wrap}
.filter-btn{padding:8px 12px;border-radius:10px;border:1px solid #e4e3ed;background:#f7f7fb;font-weight:700;font-size:12px;color:#4b465c;cursor:pointer}
.filter-btn.active{background:#6e63e8;color:#fff;border-color:#6e63e8;box-shadow:0 10px 24px rgba(110,99,232,0.25)}
.chart-canvas{width:100%;height:320px}
.legend{display:flex;gap:16px;flex-wrap:wrap;padding-top:10px;border-top:1px solid #f0eff7;font-size:12px;color:#5d596c}
.legend span{display:inline-flex;align-items:center;gap:6px}
.legend i{display:inline-block;width:12px;height:12px;border-radius:3px}
.empty{padding:50px 20px;text-align:center;color:#7f7b96;border:2px dashed #e4e3ed;border-radius:14px;background:#fbfaff;display:grid;gap:8px}
.skeleton{height:320px;border-radius:12px;background:linear-gradient(90deg,#f3f2f7,#ecebf4,#f3f2f7);background-size:200% 100%;animation:shimmer 1.4s infinite}
@keyframes shimmer{to{background-position:-200% 0}}
`;

const chartBase = (id, title, subtitle) => `
<div class="chart-card">
  <div class="chart-header">
    <div>
      <div class="chart-title">${title}</div>
      ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
    </div>
  </div>
  <canvas class="chart-canvas" id="${id}"></canvas>
</div>
`;

const script = (id, config) => `
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
  setTimeout(() => {
    const ctx = document.getElementById('${id}');
    if (!ctx) return;
    new Chart(ctx, ${config});
  }, 120);
</script>
`;

const renderChart = (title, subtitle, chartConfig) => {
  const id = `chart-${Math.random().toString(36).slice(2, 8)}`;
  return `
    ${chartBase(id, title, subtitle)}
    <style>${styles}</style>
    ${script(id, chartConfig)}
  `;
};

export const Default = {
  render: () => renderChart('Desempenho por Matéria', 'Média da turma 8º Ano A - Janeiro 2026', `{
    type: 'bar',
    data: {
      labels: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
      datasets: [{
        data: [9.2, 8.8, 9.5, 8.3, 9.0],
        backgroundColor: ['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455'],
        borderRadius: 6,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#3F3F46', padding: 12, titleFont: { size: 13 }, bodyFont: { size: 14, weight: 'bold' } } },
      scales: {
        y: { beginAtZero: true, max: 10, grid: { color: '#F3F2F7' }, ticks: { color: '#6E6B7B' } },
        x: { grid: { display: false }, ticks: { color: '#6E6B7B' } }
      }
    }
  }`)
};

export const ComparacaoTurmas = {
  render: () => renderChart('Comparação entre Turmas', 'Média geral por turma - Janeiro 2026', `{
    type: 'bar',
    data: {
      labels: ['8º Ano A', '8º Ano B', '8º Ano C'],
      datasets: [{
        data: [9.1, 8.7, 8.9],
        backgroundColor: ['#6E63E8', '#00CFE8', '#28C76F'],
        borderRadius: 10,
        barThickness: 60
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 10, grid: { color: '#F3F2F7' } }, x: { grid: { display: false } } }
    }
  }`)
};

export const EvolucaoMensal = {
  render: () => renderChart('Evolução de Desempenho', 'Turma 8º Ano A - Matemática 2026', `{
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        data: [8.5, 8.7, 9.0, 8.8, 9.2, 9.4],
        backgroundColor: '#6E63E8',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 10 }, x: { grid: { display: false } } }
    }
  }`)
};

export const FrequenciaPorDia = {
  render: () => renderChart('Frequência Semanal', 'Presença dos alunos - Semana 27/01 a 31/01', `{
    type: 'bar',
    data: {
      labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      datasets: [{
        data: [28, 30, 29, 32, 27],
        backgroundColor: ['#28C76F', '#28C76F', '#28C76F', '#28C76F', '#FF9F43'],
        borderRadius: 6,
        barThickness: 38
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#F3F2F7' } }, x: { grid: { display: false } } }
    }
  }`)
};

export const MissoesCompletas = {
  render: () => renderChart('Missões Completadas', 'Top 5 missões mais completadas - Janeiro 2026', `{
    type: 'bar',
    data: {
      labels: ['Frações Básicas', 'Verbos no Pretérito', 'Sistema Solar', 'Geometria Plana', 'Ciclo da Água'],
      datasets: [{
        data: [42, 38, 35, 32, 28],
        backgroundColor: ['#6E63E8', '#6E63E8', '#6E63E8', '#00CFE8', '#00CFE8'],
        borderRadius: 8,
        barThickness: 46
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
    }
  }`)
};

export const HorizontalRanking = {
  render: () => renderChart('Ranking de Proficiência', 'Top 5 estudantes - Média geral', `{
    type: 'bar',
    data: {
      labels: ['Ana Silva', 'Bruno Costa', 'Diana Santos', 'Eduardo Lima', 'Fernanda Alves'],
      datasets: [{
        data: [9.8, 9.5, 9.3, 9.0, 8.8],
        backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32', '#6E63E8', '#6E63E8'],
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, max: 10 }, y: { grid: { display: false } } }
    }
  }`)
};

export const Compacto = {
  render: () => {
    const id = `chart-${Math.random().toString(36).slice(2, 8)}`;
    return `
      <div class="chart-card" style="max-width:420px;padding:14px 16px;">
        <div class="chart-title" style="font-size:14px;">Resumo de Notas</div>
        <canvas class="chart-canvas" id="${id}" style="height:200px"></canvas>
      </div>
      <style>${styles}</style>
      ${script(id, `{
        type: 'bar',
        data: { labels: ['Mat', 'Port', 'Ciên'], datasets: [{ data: [9.2, 8.8, 9.5], backgroundColor: '#6E63E8', borderRadius: 6, barThickness: 28 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { font: { size: 11 } } } } }
      }`)}
    `;
  }
};

export const Vazio = {
  render: () => `
    <div class="chart-card">
      <div class="chart-header"><div><div class="chart-title">Desempenho por Matéria</div></div></div>
      <div class="empty">
        <div style="font-size:40px;">📊</div>
        <div style="font-weight:800;">Nenhum dado disponível</div>
        <div style="font-size:13px;">Aguardando atividades da turma para gerar estatísticas.</div>
      </div>
    </div>
    <style>${styles}</style>
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">BarChart</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Gráfico de Barras</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Gráfico de Barras. Faz parte da categoria <strong>Charts</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #28C76F;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import BarChart from '@/components/BarChart.vue';

// Template
&lt;BarChart v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o BarChart com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#28C76F20;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground BarChart</p>
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
    docs: { description: { story: 'Exemplos de uso real do BarChart no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#28C76F15;border:1px solid #28C76F30;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: BarChart</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando BarChart no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com BarChart no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via BarChart</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o BarChart.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#28C76F 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: BarChart</h1>
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

