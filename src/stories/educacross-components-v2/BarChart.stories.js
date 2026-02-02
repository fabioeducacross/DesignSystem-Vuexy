export default {
  title: 'Educacross Components V2/Charts/BarChart',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.chart-container{width:100%;max-width:800px;background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:24px}.chart-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.chart-title{font-size:18px;font-weight:600;color:#3F3F46}.chart-subtitle{font-size:13px;color:#6E6B7B;margin-top:4px}.chart-filters{display:flex;gap:8px}.filter-btn{padding:6px 12px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s}.filter-btn:hover{border-color:#6E63E8;color:#6E63E8}.filter-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.chart-canvas{width:100%;height:300px}.chart-legend{display:flex;gap:20px;margin-top:16px;padding-top:16px;border-top:1px solid #F3F2F7;flex-wrap:wrap}.legend-item{display:flex;align-items:center;gap:8px;font-size:13px}.legend-color{width:12px;height:12px;border-radius:3px}.chart-empty{text-align:center;padding:60px 20px;color:#6E6B7B}.chart-empty svg{width:80px;height:80px;opacity:0.3;margin-bottom:16px}.chart-loading{display:flex;justify-content:center;align-items:center;height:300px}.spinner{width:40px;height:40px;border:4px solid #F3F2F7;border-top-color:#6E63E8;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`;

const base = (title, subtitle, data, labels, colors, showLegend = true) => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">${title}</div>
      ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
    </div>
  </div>
  <canvas class="chart-canvas" id="chart-${Math.random().toString(36).substr(2, 9)}"></canvas>
  ${showLegend ? `<div class="chart-legend">
    ${labels.map((label, i) => `
      <div class="legend-item">
        <div class="legend-color" style="background:${colors[i]}"></div>
        <span>${label}: ${data[i]}</span>
      </div>
    `).join('')}
  </div>` : ''}
</div>
<style>${css}</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const canvas = document.querySelector('#chart-${Math.random().toString(36).substr(2, 9).slice(0,5)}').previousElementSibling.querySelector('canvas');
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ${JSON.stringify(labels)},
      datasets: [{
        data: ${JSON.stringify(data)},
        backgroundColor: ${JSON.stringify(colors)},
        borderRadius: 6,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#3F3F46', padding: 12, titleFont: { size: 13 }, bodyFont: { size: 14, weight: 'bold' } } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F3F2F7' }, ticks: { color: '#6E6B7B', font: { size: 12 } } },
        x: { grid: { display: false }, ticks: { color: '#6E6B7B', font: { size: 12 } } }
      }
    }
  });
}, 200);
</script>
`;

export const Default = {
  render: () => base(
    'Desempenho por Matéria',
    'Média da turma 8º Ano A - Janeiro 2026',
    [9.2, 8.8, 9.5, 8.3, 9.0],
    ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
    ['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455']
  )
};

export const ComparacaoTurmas = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">Comparação entre Turmas</div>
      <div class="chart-subtitle">Média geral por turma - Janeiro 2026</div>
    </div>
  </div>
  <canvas class="chart-canvas" id="chart-comp"></canvas>
  <div class="chart-legend">
    <div class="legend-item"><div class="legend-color" style="background:#6E63E8"></div><span>8º Ano A: 9.1</span></div>
    <div class="legend-item"><div class="legend-color" style="background:#00CFE8"></div><span>8º Ano B: 8.7</span></div>
    <div class="legend-item"><div class="legend-color" style="background:#28C76F"></div><span>8º Ano C: 8.9</span></div>
  </div>
</div>
<style>${css}</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('chart-comp'), {
    type: 'bar',
    data: {
      labels: ['8º Ano A', '8º Ano B', '8º Ano C'],
      datasets: [{
        label: 'Média',
        data: [9.1, 8.7, 8.9],
        backgroundColor: ['#6E63E8', '#00CFE8', '#28C76F'],
        borderRadius: 6,
        barThickness: 60
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 10, grid: { color: '#F3F2F7' } }, x: { grid: { display: false } } }
    }
  });
}, 200);
</script>
`
};

export const EvoluçãoMensal = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">Evolução de Desempenho</div>
      <div class="chart-subtitle">Turma 8º Ano A - Matemática 2026</div>
    </div>
    <div class="chart-filters">
      <button class="filter-btn active">Mensal</button>
      <button class="filter-btn">Bimestral</button>
    </div>
  </div>
  <canvas class="chart-canvas" id="chart-evol"></canvas>
</div>
<style>${css}</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('chart-evol'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        data: [8.5, 8.7, 9.0, 8.8, 9.2, 9.4],
        backgroundColor: '#6E63E8',
        borderRadius: 6
      }]
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

export const FrequenciaPorDia = {
  render: () => base(
    'Frequência Semanal',
    'Presença dos alunos - Semana de 27/01 a 31/01',
    [28, 30, 29, 32, 27],
    ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    ['#28C76F', '#28C76F', '#28C76F', '#28C76F', '#FF9F43']
  )
};

export const MissoesCompletas = {
  render: () => base(
    'Missões Completadas',
    'Top 5 missões mais completadas - Janeiro 2026',
    [42, 38, 35, 32, 28],
    ['Frações Básicas', 'Verbos no Pretérito', 'Sistema Solar', 'Geometria Plana', 'Ciclo da Água'],
    ['#6E63E8', '#6E63E8', '#6E63E8', '#00CFE8', '#00CFE8']
  )
};

export const Horizontal = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div>
      <div class="chart-title">Ranking de Proficiência</div>
      <div class="chart-subtitle">Top 5 estudantes - Média geral</div>
    </div>
  </div>
  <canvas class="chart-canvas" id="chart-horiz"></canvas>
</div>
<style>${css}</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('chart-horiz'), {
    type: 'bar',
    data: {
      labels: ['Ana Silva', 'Bruno Costa', 'Diana Santos', 'Eduardo Lima', 'Fernanda Alves'],
      datasets: [{
        data: [9.8, 9.5, 9.3, 9.0, 8.8],
        backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32', '#6E63E8', '#6E63E8'],
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, max: 10 } }
    }
  });
}, 200);
</script>
`
};

export const Compacto = {
  render: () => `
<div class="chart-container" style="max-width:400px;padding:16px">
  <div class="chart-title" style="font-size:14px;margin-bottom:12px">Resumo de Notas</div>
  <canvas class="chart-canvas" id="chart-compact" style="height:200px"></canvas>
</div>
<style>${css}</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('chart-compact'), {
    type: 'bar',
    data: {
      labels: ['Mat', 'Port', 'Ciên'],
      datasets: [{ data: [9.2, 8.8, 9.5], backgroundColor: '#6E63E8', borderRadius: 4, barThickness: 30 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { display: false }, x: { ticks: { font: { size: 11 } } } }
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
    <div class="chart-title">Desempenho por Matéria</div>
  </div>
  <div class="chart-empty">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
    <div style="font-size:14px;font-weight:600;margin-bottom:8px">Nenhum Dado Disponível</div>
    <div style="font-size:13px">Aguardando atividades da turma para gerar estatísticas</div>
  </div>
</div>
<style>${css}</style>
`
};
