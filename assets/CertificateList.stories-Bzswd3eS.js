const L={title:"Educacross Components V2/Lists/CertificateList",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`CertificateList - Lista de Certificados
=========================================
Lista de certificados de conclusão de missões/cursos

@component CertificateList
@category Educacross Components V2 / Lists
@source educacross-frontoffice (perfil do aluno, conquistas)
@priority P2
@status PIXEL-PERFECT
@since 2.0.0`}}}},i=`.cert-list{max-width:1000px;margin:0 auto;padding:24px}.list-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px}.list-title{font-size:20px;font-weight:600;color:#3F3F46}.list-count{font-size:13px;color:#6E6B7B;margin-left:8px}.list-filters{display:flex;gap:8px}.filter-btn{padding:8px 16px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s}.filter-btn:hover{border-color:#6E63E8}.filter-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.cert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}.cert-item{background:#fff;border:1px solid #D8D6DE;border-radius:8px;overflow:hidden;transition:.2s;cursor:pointer}.cert-item:hover{border-color:#6E63E8;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}.cert-preview{width:100%;height:200px;background:linear-gradient(135deg,#6E63E8,#9F93F8);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.cert-preview::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');animation:float 20s linear infinite}.cert-icon{font-size:64px;position:relative;z-index:1}.cert-content{padding:16px}.cert-title{font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:8px}.cert-subtitle{font-size:13px;color:#6E6B7B;margin-bottom:12px}.cert-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#6E6B7B;padding-top:12px;border-top:1px solid #F3F2F7}.cert-date{display:flex;align-items:center;gap:6px}.cert-actions{display:flex;gap:8px}.icon-btn{width:32px;height:32px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s}.icon-btn:hover{background:#F3F2F7;border-color:#6E63E8;color:#6E63E8}@keyframes float{to{transform:translate(25%,25%)}}`,e={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados</span>
      <span class="list-count">(8 certificados)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">2026</button>
      <button class="filter-btn">2025</button>
    </div>
  </div>
  <div class="cert-grid">
    ${[{title:"Conclusão Matemática Avançada",student:"Ana Silva",date:"15/01/2026",color:"linear-gradient(135deg,#6E63E8,#9F93F8)",icon:"🏆"},{title:"Excelência em Português",student:"Bruno Costa",date:"20/01/2026",color:"linear-gradient(135deg,#00CFE8,#7EDEFF)",icon:"📚"},{title:"Cientista do Ano",student:"Diana Santos",date:"22/01/2026",color:"linear-gradient(135deg,#28C76F,#7EE5A8)",icon:"🔬"},{title:"Participação em Evento",student:"Eduardo Lima",date:"25/01/2026",color:"linear-gradient(135deg,#FF9F43,#FFCB8B)",icon:"🎉"}].map(t=>`
      <div class="cert-item">
        <div class="cert-preview" style="background:${t.color}">
          <div class="cert-icon">${t.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${t.title}</div>
          <div class="cert-subtitle">${t.student}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              ${t.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn" title="Visualizar"><i class="bi bi-eye"></i></button>
              <button class="icon-btn" title="Download"><i class="bi bi-download"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},n={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados - Ana Silva</span>
      <span class="list-count">(12 certificados)</span>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
    ${[{title:"Matemática - 1º Bimestre",grade:9.8,date:"15/01/2026",color:"linear-gradient(135deg,#6E63E8,#9F93F8)"},{title:"Português - 1º Bimestre",grade:9.5,date:"15/01/2026",color:"linear-gradient(135deg,#00CFE8,#7EDEFF)"},{title:"Ciências - 1º Bimestre",grade:10,date:"15/01/2026",color:"linear-gradient(135deg,#28C76F,#7EE5A8)"}].map(t=>`
      <div class="cert-item">
        <div class="cert-preview" style="background:${t.color}">
          <div style="text-align:center;color:#fff;position:relative;z-index:1">
            <div style="font-size:48px;font-weight:700">${t.grade}</div>
            <div style="font-size:14px;opacity:0.9">Nota Final</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${t.title}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              ${t.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-eye"></i></button>
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-share"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},s={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Feira de Ciências 2026</span>
  </div>
  <div class="cert-grid">
    ${[{name:"Ana Silva",project:"Energia Solar",award:"1º Lugar",color:"linear-gradient(135deg,#FFD700,#FFA500)",icon:"🥇"},{name:"Bruno Costa",project:"Reciclagem Criativa",award:"2º Lugar",color:"linear-gradient(135deg,#C0C0C0,#808080)",icon:"🥈"},{name:"Diana Santos",project:"Horta Sustentável",award:"3º Lugar",color:"linear-gradient(135deg,#CD7F32,#8B4513)",icon:"🥉"},{name:"Eduardo Lima",project:"Robótica Básica",award:"Participação",color:"linear-gradient(135deg,#6E63E8,#9F93F8)",icon:"🏆"}].map(t=>`
      <div class="cert-item">
        <div class="cert-preview" style="background:${t.color}">
          <div class="cert-icon">${t.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${t.name}</div>
          <div class="cert-subtitle">${t.project}</div>
          <div class="cert-meta">
            <div style="font-weight:600;color:#3F3F46">${t.award}</div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-printer"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},a={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Gerar Certificados</span>
      <span class="list-count">42 alunos - 8º Ano A</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn">Selecionar Todos</button>
      <button class="filter-btn active" style="background:#28C76F;border-color:#28C76F">Gerar Selecionados (12)</button>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
    ${[{name:"Ana Silva",grade:9.8,selected:!0},{name:"Bruno Costa",grade:9.5,selected:!0},{name:"Diana Santos",grade:9.3,selected:!1},{name:"Eduardo Lima",grade:9,selected:!0}].map(t=>`
      <div class="cert-item" style="${t.selected?"border-color:#6E63E8;background:#6E63E810":""}">
        <div style="padding:16px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <input type="checkbox" ${t.selected?"checked":""} style="width:20px;height:20px;cursor:pointer">
            <div style="flex:1">
              <div class="cert-title" style="margin:0">${t.name}</div>
              <div class="cert-subtitle" style="margin:0">Nota: ${t.grade}</div>
            </div>
          </div>
          <div style="height:4px;background:#F3F2F7;border-radius:2px;overflow:hidden">
            <div style="height:100%;background:#28C76F;width:${t.grade*10}%"></div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},o={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Modelos de Certificado</span>
  </div>
  <div class="cert-grid">
    ${[{name:"Modelo Clássico",desc:"Design tradicional elegante",color:"linear-gradient(135deg,#3F3F46,#6E6B7B)",popular:!0},{name:"Modelo Moderno",desc:"Minimalista e colorido",color:"linear-gradient(135deg,#6E63E8,#9F93F8)",popular:!1},{name:"Modelo Gamificação",desc:"Com badges e troféus",color:"linear-gradient(135deg,#FFD700,#FFA500)",popular:!0},{name:"Modelo Infantil",desc:"Cores vivas e divertido",color:"linear-gradient(135deg,#FF6B9D,#C44569)",popular:!1}].map(t=>`
      <div class="cert-item">
        <div class="cert-preview" style="background:${t.color}">
          ${t.popular?'<div style="position:absolute;top:12px;right:12px;background:#FFD700;color:#3F3F46;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;z-index:2">⭐ Popular</div>':""}
          <div style="color:#fff;text-align:center;position:relative;z-index:1">
            <div style="font-size:40px;margin-bottom:8px">📜</div>
            <div style="font-size:14px;opacity:0.9">Certificado de</div>
            <div style="font-size:18px;font-weight:600">Conclusão</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${t.name}</div>
          <div class="cert-subtitle">${t.desc}</div>
          <div class="cert-meta">
            <button class="filter-btn" style="width:100%;margin-top:8px;justify-content:center">
              <i class="bi bi-eye"></i> Visualizar
            </button>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},d={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Histórico de Certificados</span>
      <span class="list-count">(156 emitidos)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Este Ano</button>
      <button class="filter-btn">2025</button>
      <button class="filter-btn">2024</button>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px">
    ${[{month:"Janeiro 2026",count:42,type:"Conclusão de Bimestre"},{month:"Dezembro 2025",count:38,type:"Encerramento do Ano"},{month:"Novembro 2025",count:28,type:"Feira de Ciências"},{month:"Outubro 2025",count:32,type:"Conclusão de Bimestre"}].map(t=>`
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:4px">${t.month}</div>
          <div style="font-size:13px;color:#6E6B7B">${t.type}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:24px;font-weight:700;color:#6E63E8">${t.count}</div>
          <div style="font-size:12px;color:#6E6B7B">certificados</div>
        </div>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},r={render:()=>`
<div class="cert-list" style="max-width:600px;padding:16px">
  <div style="display:flex;flex-direction:column;gap:8px">
    ${[{title:"Matemática - 1º Bim",student:"Ana Silva",date:"15/01"},{title:"Português - 1º Bim",student:"Ana Silva",date:"15/01"},{title:"Ciências - 1º Bim",student:"Ana Silva",date:"15/01"}].map(t=>`
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:6px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,#6E63E8,#9F93F8);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px">
            🏆
          </div>
          <div>
            <div style="font-size:13px;font-weight:600;color:#3F3F46">${t.title}</div>
            <div style="font-size:11px;color:#6E6B7B">${t.date}</div>
          </div>
        </div>
        <button class="icon-btn" style="width:28px;height:28px"><i class="bi bi-download"></i></button>
      </div>
    `).join("")}
  </div>
</div>
<style>${i}</style>
`},l={render:()=>`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Certificados</span>
  </div>
  <div style="text-align:center;padding:80px 20px;color:#6E6B7B">
    <svg viewBox="0 0 24 24" fill="currentColor" style="width:100px;height:100px;opacity:0.3;margin-bottom:20px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6l-3 7h2l1 3 3-7h-2z"/>
    </svg>
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">Nenhum Certificado Ainda</div>
    <div style="font-size:14px;margin-bottom:20px">Gere certificados para seus alunos</div>
    <button class="filter-btn active"><i class="bi bi-plus-lg"></i> Gerar Certificado</button>
  </div>
</div>
<style>${i}</style>
`};var c,v,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados</span>
      <span class="list-count">(8 certificados)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">2026</button>
      <button class="filter-btn">2025</button>
    </div>
  </div>
  <div class="cert-grid">
    \${[{
    title: 'Conclusão Matemática Avançada',
    student: 'Ana Silva',
    date: '15/01/2026',
    color: 'linear-gradient(135deg,#6E63E8,#9F93F8)',
    icon: '🏆'
  }, {
    title: 'Excelência em Português',
    student: 'Bruno Costa',
    date: '20/01/2026',
    color: 'linear-gradient(135deg,#00CFE8,#7EDEFF)',
    icon: '📚'
  }, {
    title: 'Cientista do Ano',
    student: 'Diana Santos',
    date: '22/01/2026',
    color: 'linear-gradient(135deg,#28C76F,#7EE5A8)',
    icon: '🔬'
  }, {
    title: 'Participação em Evento',
    student: 'Eduardo Lima',
    date: '25/01/2026',
    color: 'linear-gradient(135deg,#FF9F43,#FFCB8B)',
    icon: '🎉'
  }].map(c => \`
      <div class="cert-item">
        <div class="cert-preview" style="background:\${c.color}">
          <div class="cert-icon">\${c.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">\${c.title}</div>
          <div class="cert-subtitle">\${c.student}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              \${c.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn" title="Visualizar"><i class="bi bi-eye"></i></button>
              <button class="icon-btn" title="Download"><i class="bi bi-download"></i></button>
            </div>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(p=(v=e.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var u,g,b;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados - Ana Silva</span>
      <span class="list-count">(12 certificados)</span>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
    \${[{
    title: 'Matemática - 1º Bimestre',
    grade: 9.8,
    date: '15/01/2026',
    color: 'linear-gradient(135deg,#6E63E8,#9F93F8)'
  }, {
    title: 'Português - 1º Bimestre',
    grade: 9.5,
    date: '15/01/2026',
    color: 'linear-gradient(135deg,#00CFE8,#7EDEFF)'
  }, {
    title: 'Ciências - 1º Bimestre',
    grade: 10.0,
    date: '15/01/2026',
    color: 'linear-gradient(135deg,#28C76F,#7EE5A8)'
  }].map(c => \`
      <div class="cert-item">
        <div class="cert-preview" style="background:\${c.color}">
          <div style="text-align:center;color:#fff;position:relative;z-index:1">
            <div style="font-size:48px;font-weight:700">\${c.grade}</div>
            <div style="font-size:14px;opacity:0.9">Nota Final</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">\${c.title}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              \${c.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-eye"></i></button>
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-share"></i></button>
            </div>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(b=(g=n.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var m,x,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Feira de Ciências 2026</span>
  </div>
  <div class="cert-grid">
    \${[{
    name: 'Ana Silva',
    project: 'Energia Solar',
    award: '1º Lugar',
    color: 'linear-gradient(135deg,#FFD700,#FFA500)',
    icon: '🥇'
  }, {
    name: 'Bruno Costa',
    project: 'Reciclagem Criativa',
    award: '2º Lugar',
    color: 'linear-gradient(135deg,#C0C0C0,#808080)',
    icon: '🥈'
  }, {
    name: 'Diana Santos',
    project: 'Horta Sustentável',
    award: '3º Lugar',
    color: 'linear-gradient(135deg,#CD7F32,#8B4513)',
    icon: '🥉'
  }, {
    name: 'Eduardo Lima',
    project: 'Robótica Básica',
    award: 'Participação',
    color: 'linear-gradient(135deg,#6E63E8,#9F93F8)',
    icon: '🏆'
  }].map(c => \`
      <div class="cert-item">
        <div class="cert-preview" style="background:\${c.color}">
          <div class="cert-icon">\${c.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">\${c.name}</div>
          <div class="cert-subtitle">\${c.project}</div>
          <div class="cert-meta">
            <div style="font-weight:600;color:#3F3F46">\${c.award}</div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-printer"></i></button>
            </div>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var y,E,F;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Gerar Certificados</span>
      <span class="list-count">42 alunos - 8º Ano A</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn">Selecionar Todos</button>
      <button class="filter-btn active" style="background:#28C76F;border-color:#28C76F">Gerar Selecionados (12)</button>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
    \${[{
    name: 'Ana Silva',
    grade: 9.8,
    selected: true
  }, {
    name: 'Bruno Costa',
    grade: 9.5,
    selected: true
  }, {
    name: 'Diana Santos',
    grade: 9.3,
    selected: false
  }, {
    name: 'Eduardo Lima',
    grade: 9.0,
    selected: true
  }].map(s => \`
      <div class="cert-item" style="\${s.selected ? 'border-color:#6E63E8;background:#6E63E810' : ''}">
        <div style="padding:16px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <input type="checkbox" \${s.selected ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer">
            <div style="flex:1">
              <div class="cert-title" style="margin:0">\${s.name}</div>
              <div class="cert-subtitle" style="margin:0">Nota: \${s.grade}</div>
            </div>
          </div>
          <div style="height:4px;background:#F3F2F7;border-radius:2px;overflow:hidden">
            <div style="height:100%;background:#28C76F;width:\${s.grade * 10}%"></div>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(F=(E=a.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var h,C,w;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Modelos de Certificado</span>
  </div>
  <div class="cert-grid">
    \${[{
    name: 'Modelo Clássico',
    desc: 'Design tradicional elegante',
    color: 'linear-gradient(135deg,#3F3F46,#6E6B7B)',
    popular: true
  }, {
    name: 'Modelo Moderno',
    desc: 'Minimalista e colorido',
    color: 'linear-gradient(135deg,#6E63E8,#9F93F8)',
    popular: false
  }, {
    name: 'Modelo Gamificação',
    desc: 'Com badges e troféus',
    color: 'linear-gradient(135deg,#FFD700,#FFA500)',
    popular: true
  }, {
    name: 'Modelo Infantil',
    desc: 'Cores vivas e divertido',
    color: 'linear-gradient(135deg,#FF6B9D,#C44569)',
    popular: false
  }].map(m => \`
      <div class="cert-item">
        <div class="cert-preview" style="background:\${m.color}">
          \${m.popular ? '<div style="position:absolute;top:12px;right:12px;background:#FFD700;color:#3F3F46;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;z-index:2">⭐ Popular</div>' : ''}
          <div style="color:#fff;text-align:center;position:relative;z-index:1">
            <div style="font-size:40px;margin-bottom:8px">📜</div>
            <div style="font-size:14px;opacity:0.9">Certificado de</div>
            <div style="font-size:18px;font-weight:600">Conclusão</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">\${m.name}</div>
          <div class="cert-subtitle">\${m.desc}</div>
          <div class="cert-meta">
            <button class="filter-btn" style="width:100%;margin-top:8px;justify-content:center">
              <i class="bi bi-eye"></i> Visualizar
            </button>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(w=(C=o.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var $,D,B;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Histórico de Certificados</span>
      <span class="list-count">(156 emitidos)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Este Ano</button>
      <button class="filter-btn">2025</button>
      <button class="filter-btn">2024</button>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px">
    \${[{
    month: 'Janeiro 2026',
    count: 42,
    type: 'Conclusão de Bimestre'
  }, {
    month: 'Dezembro 2025',
    count: 38,
    type: 'Encerramento do Ano'
  }, {
    month: 'Novembro 2025',
    count: 28,
    type: 'Feira de Ciências'
  }, {
    month: 'Outubro 2025',
    count: 32,
    type: 'Conclusão de Bimestre'
  }].map(h => \`
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:4px">\${h.month}</div>
          <div style="font-size:13px;color:#6E6B7B">\${h.type}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:24px;font-weight:700;color:#6E63E8">\${h.count}</div>
          <div style="font-size:12px;color:#6E6B7B">certificados</div>
        </div>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(B=(D=d.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var z,A,S;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list" style="max-width:600px;padding:16px">
  <div style="display:flex;flex-direction:column;gap:8px">
    \${[{
    title: 'Matemática - 1º Bim',
    student: 'Ana Silva',
    date: '15/01'
  }, {
    title: 'Português - 1º Bim',
    student: 'Ana Silva',
    date: '15/01'
  }, {
    title: 'Ciências - 1º Bim',
    student: 'Ana Silva',
    date: '15/01'
  }].map(c => \`
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:6px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,#6E63E8,#9F93F8);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px">
            🏆
          </div>
          <div>
            <div style="font-size:13px;font-weight:600;color:#3F3F46">\${c.title}</div>
            <div style="font-size:11px;color:#6E6B7B">\${c.date}</div>
          </div>
        </div>
        <button class="icon-btn" style="width:28px;height:28px"><i class="bi bi-download"></i></button>
      </div>
    \`).join('')}
  </div>
</div>
<style>\${css}</style>
\`
}`,...(S=(A=r.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var j,k,M;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Certificados</span>
  </div>
  <div style="text-align:center;padding:80px 20px;color:#6E6B7B">
    <svg viewBox="0 0 24 24" fill="currentColor" style="width:100px;height:100px;opacity:0.3;margin-bottom:20px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6l-3 7h2l1 3 3-7h-2z"/>
    </svg>
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">Nenhum Certificado Ainda</div>
    <div style="font-size:14px;margin-bottom:20px">Gere certificados para seus alunos</div>
    <button class="filter-btn active"><i class="bi bi-plus-lg"></i> Gerar Certificado</button>
  </div>
</div>
<style>\${css}</style>
\`
}`,...(M=(k=l.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};const P=["Default","PorAluno","PorEvento","EmLote","ComModelos","Historico","Compacto","Vazio"];export{o as ComModelos,r as Compacto,e as Default,a as EmLote,d as Historico,n as PorAluno,s as PorEvento,l as Vazio,P as __namedExportsOrder,L as default};
