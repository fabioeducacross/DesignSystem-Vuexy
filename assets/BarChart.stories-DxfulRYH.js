const q={title:"Educacross Components V2/Charts/BarChart",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`BarChart - Gráfico de Barras
=============================
Gráfico de barras para dashboards e relatórios educacionais

@component BarChart
@category Educacross Components V2 / Charts
@source educacross-frontoffice (dashboards, relatórios)
@priority P2
@status PIXEL-PERFECT
@since 2.0.0`}}}},u=`
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
`,V=(a,s,r)=>`
<div class="chart-card">
  <div class="chart-header">
    <div>
      <div class="chart-title">${s}</div>
      ${r?`<div class="chart-subtitle">${r}</div>`:""}
    </div>
  </div>
  <canvas class="chart-canvas" id="${a}"></canvas>
</div>
`,G=(a,s)=>`
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
  setTimeout(() => {
    const ctx = document.getElementById('${a}');
    if (!ctx) return;
    new Chart(ctx, ${s});
  }, 120);
<\/script>
`,e=(a,s,r)=>{const g=`chart-${Math.random().toString(36).slice(2,8)}`;return`
    ${V(g,a,s)}
    <style>${u}</style>
    ${G(g,r)}
  `},n={render:()=>e("Desempenho por Matéria","Média da turma 8º Ano A - Janeiro 2026",`{
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
  }`)},t={render:()=>e("Comparação entre Turmas","Média geral por turma - Janeiro 2026",`{
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
  }`)},i={render:()=>e("Evolução de Desempenho","Turma 8º Ano A - Matemática 2026",`{
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
  }`)},o={render:()=>e("Frequência Semanal","Presença dos alunos - Semana 27/01 a 31/01",`{
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
  }`)},d={render:()=>e("Missões Completadas","Top 5 missões mais completadas - Janeiro 2026",`{
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
  }`)},l={render:()=>e("Ranking de Proficiência","Top 5 estudantes - Média geral",`{
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
  }`)},c={render:()=>{const a=`chart-${Math.random().toString(36).slice(2,8)}`;return`
      <div class="chart-card" style="max-width:420px;padding:14px 16px;">
        <div class="chart-title" style="font-size:14px;">Resumo de Notas</div>
        <canvas class="chart-canvas" id="${a}" style="height:200px"></canvas>
      </div>
      <style>${u}</style>
      ${G(a,`{
        type: 'bar',
        data: { labels: ['Mat', 'Port', 'Ciên'], datasets: [{ data: [9.2, 8.8, 9.5], backgroundColor: '#6E63E8', borderRadius: 6, barThickness: 28 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { font: { size: 11 } } } } }
      }`)}
    `}},p={render:()=>`
    <div class="chart-card">
      <div class="chart-header"><div><div class="chart-title">Desempenho por Matéria</div></div></div>
      <div class="empty">
        <div style="font-size:40px;">📊</div>
        <div style="font-weight:800;">Nenhum dado disponível</div>
        <div style="font-size:13px;">Aguardando atividades da turma para gerar estatísticas.</div>
      </div>
    </div>
    <style>${u}</style>
  `};var m,x,b;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => renderChart('Desempenho por Matéria', 'Média da turma 8º Ano A - Janeiro 2026', \`{
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
  }\`)
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,y,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => renderChart('Comparação entre Turmas', 'Média geral por turma - Janeiro 2026', \`{
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
  }\`)
}`,...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var v,E,C;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => renderChart('Evolução de Desempenho', 'Turma 8º Ano A - Matemática 2026', \`{
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
  }\`)
}`,...(C=(E=i.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var F,A,k;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => renderChart('Frequência Semanal', 'Presença dos alunos - Semana 27/01 a 31/01', \`{
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
  }\`)
}`,...(k=(A=o.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};var R,M,S;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => renderChart('Missões Completadas', 'Top 5 missões mais completadas - Janeiro 2026', \`{
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
  }\`)
}`,...(S=(M=d.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var B,T,z;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => renderChart('Ranking de Proficiência', 'Top 5 estudantes - Média geral', \`{
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
  }\`)
}`,...(z=(T=l.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var D,w,$;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const id = \`chart-\${Math.random().toString(36).slice(2, 8)}\`;
    return \`
      <div class="chart-card" style="max-width:420px;padding:14px 16px;">
        <div class="chart-title" style="font-size:14px;">Resumo de Notas</div>
        <canvas class="chart-canvas" id="\${id}" style="height:200px"></canvas>
      </div>
      <style>\${styles}</style>
      \${script(id, \`{
        type: 'bar',
        data: { labels: ['Mat', 'Port', 'Ciên'], datasets: [{ data: [9.2, 8.8, 9.5], backgroundColor: '#6E63E8', borderRadius: 6, barThickness: 28 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { font: { size: 11 } } } } }
      }\`)}
    \`;
  }
}`,...($=(w=c.parameters)==null?void 0:w.docs)==null?void 0:$.source}}};var P,Z,J;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    <div class="chart-card">
      <div class="chart-header"><div><div class="chart-title">Desempenho por Matéria</div></div></div>
      <div class="empty">
        <div style="font-size:40px;">📊</div>
        <div style="font-weight:800;">Nenhum dado disponível</div>
        <div style="font-size:13px;">Aguardando atividades da turma para gerar estatísticas.</div>
      </div>
    </div>
    <style>\${styles}</style>
  \`
}`,...(J=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:J.source}}};const H=["Default","ComparacaoTurmas","EvolucaoMensal","FrequenciaPorDia","MissoesCompletas","HorizontalRanking","Compacto","Vazio"];export{c as Compacto,t as ComparacaoTurmas,n as Default,i as EvolucaoMensal,o as FrequenciaPorDia,l as HorizontalRanking,d as MissoesCompletas,p as Vazio,H as __namedExportsOrder,q as default};
