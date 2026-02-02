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
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
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
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
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
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
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
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
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
