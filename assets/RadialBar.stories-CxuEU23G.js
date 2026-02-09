const N={title:"Educacross Components V2/Charts/RadialBar",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`RadialBar - Gráfico de Barra Radial
=====================================
Gráfico circular tipo "gauge" para percentuais

@component RadialBar
@category Educacross Components V2 / Charts
@source educacross-frontoffice (métricas de desempenho)
@priority P2
@status PIXEL-PERFECT
@since 2.0.0`}}}},a=".chart-container{width:100%;max-width:500px;background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:24px}.chart-header{text-align:center;margin-bottom:20px}.chart-title{font-size:18px;font-weight:600;color:#3F3F46}.chart-subtitle{font-size:13px;color:#6E6B7B;margin-top:4px}.chart-canvas{width:100%;max-width:280px;height:280px;margin:0 auto;position:relative}.radial-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.radial-value{font-size:48px;font-weight:700;color:#3F3F46;line-height:1}.radial-label{font-size:13px;color:#6E6B7B;margin-top:8px}.chart-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:16px;margin-top:24px;padding-top:20px;border-top:1px solid #F3F2F7}.stat-item{text-align:center}.stat-value{font-size:20px;font-weight:700;color:#6E63E8}.stat-label{font-size:12px;color:#6E6B7B;margin-top:4px}.chart-group{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}.radial-small .chart-canvas{max-width:160px;height:160px}.radial-small .radial-value{font-size:32px}.radial-small .radial-label{font-size:11px}",v=(s,t,p,G,W,u,J=`${p}%`)=>`
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">${s}</div>
    ${t?`<div class="chart-subtitle">${t}</div>`:""}
  </div>
  <div class="chart-canvas">
    <canvas id="radial-${Math.random().toString(36).substr(2,9)}"></canvas>
    <div class="radial-center">
      <div class="radial-value">${J}</div>
      ${u?`<div class="radial-label">${u}</div>`:""}
    </div>
  </div>
</div>
<style>${a}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  const canvas = document.querySelector('[id^="radial-"]');
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [${p}, ${G-p}],
        backgroundColor: ['${W}', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%',
        circumference: 360,
        rotation: -90
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
`,e={render:()=>v("Progresso da Turma","8º Ano A - Matemática - Janeiro 2026",78,100,"#6E63E8","Missões Completas")},i={render:()=>v("Taxa de Frequência","Presença média - Janeiro 2026",92,100,"#28C76F","Alunos Presentes","92%")},n={render:()=>`
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Desempenho Individual</div>
    <div class="chart-subtitle">Ana Silva - 8º Ano A</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-desempenho"></canvas>
    <div class="radial-center">
      <div class="radial-value">9.8</div>
      <div class="radial-label">Média Geral</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">42</div>
      <div class="stat-label">Missões</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">98%</div>
      <div class="stat-label">Frequência</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">2850</div>
      <div class="stat-label">XP</div>
    </div>
  </div>
</div>
<style>${a}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-desempenho'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [98, 2],
        backgroundColor: ['#28C76F', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
`},r={render:()=>v("Progresso da Missão","Frações Básicas - 32 alunos participando",24,32,"#00CFE8","Alunos Concluíram","24/32")},d={render:()=>`
<div style="padding:24px">
  <div style="margin-bottom:24px;text-align:center">
    <div style="font-size:18px;font-weight:600;color:#3F3F46">Visão Geral por Matéria</div>
    <div style="font-size:13px;color:#6E6B7B;margin-top:4px">8º Ano A - Janeiro 2026</div>
  </div>
  <div class="chart-group">
    ${[{title:"Matemática",value:85,color:"#6E63E8"},{title:"Português",value:72,color:"#00CFE8"},{title:"Ciências",value:90,color:"#28C76F"},{title:"História",value:68,color:"#FF9F43"}].map((s,t)=>`
      <div class="chart-container radial-small">
        <div class="chart-header">
          <div class="chart-title" style="font-size:15px">${s.title}</div>
        </div>
        <div class="chart-canvas">
          <canvas id="radial-multi-${t}"></canvas>
          <div class="radial-center">
            <div class="radial-value">${s.value}%</div>
            <div class="radial-label">Completo</div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${a}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  const data = [
    { value: 85, color: '#6E63E8' },
    { value: 72, color: '#00CFE8' },
    { value: 90, color: '#28C76F' },
    { value: 68, color: '#FF9F43' }
  ];
  data.forEach((item, i) => {
    new Chart(document.getElementById('radial-multi-' + i), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [item.value, 100 - item.value],
          backgroundColor: [item.color, '#F3F2F7'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  });
}, 200);
<\/script>
`},l={render:()=>`
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Nível de Gamificação</div>
    <div class="chart-subtitle">João Silva - 3200 XP</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-nivel"></canvas>
    <div class="radial-center">
      <div class="radial-value">12</div>
      <div class="radial-label">Nível Atual</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">3200</div>
      <div class="stat-label">XP Atual</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">3500</div>
      <div class="stat-label">Próximo Nível</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">300</div>
      <div class="stat-label">Faltam</div>
    </div>
  </div>
</div>
<style>${a}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-nivel'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [3200, 300],
        backgroundColor: ['#FFD700', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
`},c={render:()=>v("Taxa de Aprovação","Turma 8º Ano B - Risco de Reprovação",58,100,"#EA5455","Alunos em Risco","58%")},o={render:()=>`
<div class="chart-container radial-small" style="max-width:250px;padding:16px">
  <div class="chart-title" style="font-size:14px;text-align:center;margin-bottom:12px">Progresso</div>
  <div class="chart-canvas">
    <canvas id="radial-compact"></canvas>
    <div class="radial-center">
      <div class="radial-value">85%</div>
    </div>
  </div>
</div>
<style>${a}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-compact'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#6E63E8', '#F3F2F7'],
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
`};var m,h,x;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => base('Progresso da Turma', '8º Ano A - Matemática - Janeiro 2026', 78, 100, '#6E63E8', 'Missões Completas')
}`,...(x=(h=e.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,F,b;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => base('Taxa de Frequência', 'Presença média - Janeiro 2026', 92, 100, '#28C76F', 'Alunos Presentes', '92%')
}`,...(b=(F=i.parameters)==null?void 0:F.docs)==null?void 0:b.source}}};var E,y,f;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Desempenho Individual</div>
    <div class="chart-subtitle">Ana Silva - 8º Ano A</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-desempenho"></canvas>
    <div class="radial-center">
      <div class="radial-value">9.8</div>
      <div class="radial-label">Média Geral</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">42</div>
      <div class="stat-label">Missões</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">98%</div>
      <div class="stat-label">Frequência</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">2850</div>
      <div class="stat-label">XP</div>
    </div>
  </div>
</div>
<style>\${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-desempenho'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [98, 2],
        backgroundColor: ['#28C76F', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
\`
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var A,C,B;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => base('Progresso da Missão', 'Frações Básicas - 32 alunos participando', 24, 32, '#00CFE8', 'Alunos Concluíram', '24/32')
}`,...(B=(C=r.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var $,P,R;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
<div style="padding:24px">
  <div style="margin-bottom:24px;text-align:center">
    <div style="font-size:18px;font-weight:600;color:#3F3F46">Visão Geral por Matéria</div>
    <div style="font-size:13px;color:#6E6B7B;margin-top:4px">8º Ano A - Janeiro 2026</div>
  </div>
  <div class="chart-group">
    \${[{
    title: 'Matemática',
    value: 85,
    color: '#6E63E8'
  }, {
    title: 'Português',
    value: 72,
    color: '#00CFE8'
  }, {
    title: 'Ciências',
    value: 90,
    color: '#28C76F'
  }, {
    title: 'História',
    value: 68,
    color: '#FF9F43'
  }].map((item, i) => \`
      <div class="chart-container radial-small">
        <div class="chart-header">
          <div class="chart-title" style="font-size:15px">\${item.title}</div>
        </div>
        <div class="chart-canvas">
          <canvas id="radial-multi-\${i}"></canvas>
          <div class="radial-center">
            <div class="radial-value">\${item.value}%</div>
            <div class="radial-label">Completo</div>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  const data = [
    { value: 85, color: '#6E63E8' },
    { value: 72, color: '#00CFE8' },
    { value: 90, color: '#28C76F' },
    { value: 68, color: '#FF9F43' }
  ];
  data.forEach((item, i) => {
    new Chart(document.getElementById('radial-multi-' + i), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [item.value, 100 - item.value],
          backgroundColor: [item.color, '#F3F2F7'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  });
}, 200);
<\/script>
\`
}`,...(R=(P=d.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var w,M,T;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Nível de Gamificação</div>
    <div class="chart-subtitle">João Silva - 3200 XP</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-nivel"></canvas>
    <div class="radial-center">
      <div class="radial-value">12</div>
      <div class="radial-label">Nível Atual</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">3200</div>
      <div class="stat-label">XP Atual</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">3500</div>
      <div class="stat-label">Próximo Nível</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">300</div>
      <div class="stat-label">Faltam</div>
    </div>
  </div>
</div>
<style>\${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-nivel'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [3200, 300],
        backgroundColor: ['#FFD700', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
\`
}`,...(T=(M=l.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var z,D,S;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => base('Taxa de Aprovação', 'Turma 8º Ano B - Risco de Reprovação', 58, 100, '#EA5455', 'Alunos em Risco', '58%')
}`,...(S=(D=c.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var j,I,k;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="chart-container radial-small" style="max-width:250px;padding:16px">
  <div class="chart-title" style="font-size:14px;text-align:center;margin-bottom:12px">Progresso</div>
  <div class="chart-canvas">
    <canvas id="radial-compact"></canvas>
    <div class="radial-center">
      <div class="radial-value">85%</div>
    </div>
  </div>
</div>
<style>\${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"><\/script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-compact'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#6E63E8', '#F3F2F7'],
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
<\/script>
\`
}`,...(k=(I=o.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};const q=["Default","FrequenciaGeral","DesempenhoAluno","ProgressoMissao","MultipleRadials","ComNiveis","ComAlerta","Compacto"];export{c as ComAlerta,l as ComNiveis,o as Compacto,e as Default,n as DesempenhoAluno,i as FrequenciaGeral,d as MultipleRadials,r as ProgressoMissao,q as __namedExportsOrder,N as default};
