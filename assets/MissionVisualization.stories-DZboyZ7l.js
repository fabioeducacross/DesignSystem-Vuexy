const I={title:"Educacross Components V2/Missions/MissionVisualization",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`MissionVisualization - Visualização de Missão
================================================
Template completo de visualização de missão com detalhes, progresso e áreas

@component MissionVisualization
@category Educacross Components V2 / Missions
@source educacross-frontoffice (visualização de missões)
@priority P2
@status PIXEL-PERFECT
@since 2.0.0`}}}},T=`
:root {
  --primary: #6e63e8;
  --accent: #00cfe8;
  --success: #28c76f;
  --warning: #ff9f43;
  --muted: #6e6b7b;
  --text: #2f2b3d;
  --border: #e4e3f0;
  --card: #ffffff;
  --bg: #f6f6fb;
}

.mission-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 30%, rgba(110, 99, 232, 0.08), transparent 32%),
    radial-gradient(circle at 80% 10%, rgba(0, 207, 232, 0.08), transparent 30%), var(--bg);
  padding: 32px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.mission-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 22px;
}

.mission-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px 22px;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.06);
  display: grid;
  gap: 16px;
}

.mission-header {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.mission-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
}

.badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
.pill { padding: 8px 12px; border-radius: 999px; background: #f0eeff; color: #4331d3; font-weight: 700; font-size: 12px; }
.pill.secondary { background: #e8f8fb; color: #0f6e7a; }

.toolbar { display: flex; gap: 10px; flex-wrap: wrap; }
.toolbar button { border: 1px solid var(--border); background: #fff; padding: 10px 14px; border-radius: 12px; font-weight: 700; color: #3f3f46; cursor: pointer; display: inline-flex; gap: 8px; align-items: center; }
.toolbar button.active { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 8px 26px rgba(110, 99, 232, 0.3); }

.progress {
  display: grid;
  gap: 10px;
}

.progress-bar { height: 10px; border-radius: 999px; background: #e3e1f3; overflow: hidden; }
.progress-bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); }

.insights { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.insight { border: 1px solid var(--border); border-radius: 14px; padding: 14px; background: #faf9ff; display: grid; gap: 6px; }
.insight .label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
.insight .value { font-size: 26px; font-weight: 800; color: var(--primary); }

.timeline-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.timeline-card { border: 1px solid var(--border); border-radius: 14px; padding: 16px; display: grid; gap: 8px; position: relative; overflow: hidden; }
.timeline-card::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 6px; background: linear-gradient(180deg, var(--primary), var(--accent)); }
.timeline-label { font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.06em; }

.kanban { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.kanban-col { border: 1px solid var(--border); border-radius: 14px; background: #fafbff; padding: 14px; display: grid; gap: 10px; }
.kanban-head { display: flex; align-items: center; justify-content: space-between; font-weight: 800; }
.kanban-card { border: 1px solid var(--border); background: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.04); display: grid; gap: 8px; }
.kanban-meta { font-size: 12px; color: var(--muted); display: flex; justify-content: space-between; }

.checklist { display: grid; gap: 10px; }
.check-item { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: grid; gap: 6px; background: #fff; }
.check-item .status { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
.status.success { background: rgba(40, 199, 111, 0.12); color: #1b8c53; }
.status.warning { background: rgba(255, 159, 67, 0.14); color: #9a5b04; }
.status.info { background: rgba(0, 207, 232, 0.12); color: #0f6e7a; }

.empty-card { border: 2px dashed var(--border); border-radius: 16px; padding: 48px 20px; text-align: center; color: var(--muted); display: grid; gap: 12px; background: #fff; }

.compact-board { display: grid; gap: 12px; max-width: 760px; margin: 0 auto; }
.compact-row { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center; background: #fff; }
.progress-mini { width: 110px; height: 6px; background: #e3e1f3; border-radius: 999px; overflow: hidden; }
.progress-mini span { display: block; height: 100%; background: var(--primary); }

@media (max-width: 720px) {
  .mission-shell { padding: 18px; }
  .mission-header { align-items: flex-start; }
  .toolbar { width: 100%; }
}
`,i=e=>`
<div class="mission-shell">
  <div class="mission-wrapper">
    ${e}
  </div>
</div>
<style>${T}</style>
`,L=(e,a=[])=>`
  <div class="mission-card">
    <div class="mission-header">
      <div>
        <div class="mission-title">${e}</div>
        <div style="color: var(--muted); font-size: 13px;">Acompanhamento pedagógico com evidências, etapas e feedback.</div>
      </div>
      <div class="badge-row">
        ${a.map(s=>`<span class="pill">${s}</span>`).join("")}
      </div>
    </div>
    <div class="toolbar">
      <button class="active"><i class="bi bi-diagram-3"></i> Workflow</button>
      <button><i class="bi bi-kanban"></i> Kanban</button>
      <button><i class="bi bi-graph-up"></i> Métricas</button>
      <button><i class="bi bi-map"></i> Trilhas</button>
    </div>
  </div>
`,B=()=>`
  <div class="mission-card">
    <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;justify-content:space-between">
      <div class="progress">
        <div style="font-size:12px;color:var(--muted); text-transform:uppercase;">Progresso geral</div>
        <div class="progress-bar"><span style="width:74%"></span></div>
        <div style="font-size:13px;color:var(--muted);">23 de 32 alunos enviaram todas as etapas. 5 aguardam revisão da coordenação.</div>
      </div>
      <div class="insights" style="flex:1; min-width:260px;">
        ${[{value:"74%",label:"Concluído pela turma"},{value:"18",label:"Evidências com feedback"},{value:"12h",label:"Tempo médio de conclusão"}].map(e=>`
          <div class="insight">
            <div class="label">${e.label}</div>
            <div class="value">${e.value}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
`,V=e=>`
  <div class="mission-card">
    <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-clock-history" style="color:var(--primary);"></i> Linha do tempo</div>
    <div class="timeline-grid">
      ${e.map(a=>`
        <div class="timeline-card">
          <div class="timeline-label">${a.label}</div>
          <div style="font-weight:800;color:var(--text);">${a.title}</div>
          <div style="font-size:13px;color:var(--muted);">${a.desc}</div>
          <div class="progress-bar" style="background:#ecebf6"><span style="width:${a.progress}%;background:${a.color};"></span></div>
        </div>
      `).join("")}
    </div>
  </div>
`,N=e=>`
  <div class="mission-card">
    <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-kanban" style="color:var(--primary);"></i> Kanban das equipes</div>
    <div class="kanban">
      ${e.map(a=>`
        <div class="kanban-col">
          <div class="kanban-head">
            <span>${a.title}</span>
            <span style="color:var(--muted); font-size:12px;">${a.count} cards</span>
          </div>
          ${a.items.map(s=>`
            <div class="kanban-card">
              <div style="font-weight:800;color:var(--text);">${s.title}</div>
              <div class="kanban-meta">
                <span>${s.team}</span>
                <span>${s.people} alunos</span>
              </div>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  </div>
`,o={render:()=>i(`
    ${L("Visão geral da missão: Investigadores da Água",["32 alunos","4 fases","Evidências multimídia"])}
    ${B()}
    ${V([{label:"Etapa 1",title:"Explorar o problema",desc:"Introdução e debate sobre consumo consciente de água.",progress:100,color:"#28c76f"},{label:"Etapa 2",title:"Pesquisa de campo",desc:"Entrevistas e coleta de dados na comunidade.",progress:68,color:"#6e63e8"},{label:"Etapa 3",title:"Protótipo de solução",desc:"Construção de dispositivos para reaproveitamento.",progress:12,color:"#ff9f43"}])}
  `)},r={render:()=>i(V([{label:"Semana 1",title:"Sensibilização",desc:"Cocriação de mural digital.",progress:100,color:"#28c76f"},{label:"Semana 2",title:"Coleta de dados",desc:"Questionário e fotos de campo.",progress:70,color:"#6e63e8"},{label:"Semana 3",title:"Prototipação",desc:"Modelos em sala maker.",progress:25,color:"#ff9f43"},{label:"Semana 4",title:"Apresentação",desc:"Pitch final para comunidade.",progress:5,color:"#00cfe8"}]))},t={render:()=>i(N([{title:"Planejamento",count:3,items:[{title:"Definir objetivos da missão",team:"Equipe Azul",people:"4"},{title:"Selecionar líderes",team:"Equipe Verde",people:"3"},{title:"Preparar checklist",team:"Equipe Laranja",people:"2"}]},{title:"Em execução",count:4,items:[{title:"Coleta de água de chuva",team:"Equipe Azul",people:"3"},{title:"Registro fotográfico",team:"Equipe Roxa",people:"2"},{title:"Entrevistas",team:"Equipe Verde",people:"4"},{title:"Mapa de riscos",team:"Equipe Laranja",people:"3"}]},{title:"Revisão",count:2,items:[{title:"Feedback coordenador",team:"Coordenação",people:"1"},{title:"Aprovar relatórios",team:"Coordenação",people:"2"}]}]))},n={render:()=>i(`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-clipboard-data" style="color:var(--primary);"></i> Relatório para coordenação</div>
      <div class="insights">
        ${[{label:"Participação ativa",value:"87%"},{label:"Feedbacks respondidos",value:"92%"},{label:"Competência destaque",value:"Colaboração"},{label:"Uso de tecnologia",value:"74 evidências"}].map(e=>`
          <div class="insight">
            <div class="label">${e.label}</div>
            <div class="value">${e.value}</div>
            <div style="font-size:12px;color:var(--muted);">Atualizado há 2h</div>
          </div>
        `).join("")}
      </div>
    </div>
  `)},d={render:()=>i(N([{title:"Equipe Aurora",count:3,items:[{title:"Podcast histórico",team:"Aurora",people:"4"},{title:"Roteiro final",team:"Aurora",people:"4"},{title:"Publicar no mural",team:"Aurora",people:"4"}]},{title:"Equipe Orion",count:2,items:[{title:"Protótipo maker",team:"Orion",people:"3"},{title:"Teste em campo",team:"Orion",people:"3"}]}]))},l={render:()=>i(`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-ui-checks-grid" style="color:var(--primary);"></i> Checklist de evidências • Equipe Aurora</div>
      <div class="checklist">
        ${[{title:"Pesquisa teórica",desc:"Documentos anexados • versão 1.2",status:"Concluído",className:"success"},{title:"Experimento prático",desc:"Feedback do professor registrado em 08/02",status:"Em revisão",className:"warning"},{title:"Relato audiovisual",desc:"Enviar vídeo curto de até 2 minutos",status:"Pendente",className:"info"}].map(e=>`
          <div class="check-item">
            <div style="font-weight:800;">${e.title}</div>
            <div class="status ${e.className}">${e.status}</div>
            <div style="font-size:12px;color:var(--muted);">${e.desc}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `)},p={render:()=>i(`
    <div class="mission-card" style="gap:12px;">
      <div style="font-weight:800;color:var(--text);">Resumo compacto</div>
      <div class="compact-board">
        ${[{name:"Missão Ambiental",progress:86,due:"Entrega 14/02 • 8º Ano B"},{name:"Missão Empreendedorismo",progress:42,due:"Entrega 20/02 • 9º Ano A"},{name:"Missão Ciências na Praça",progress:65,due:"Entrega 28/02 • 7º Ano B"}].map(e=>`
          <div class="compact-row">
            <div style="display:grid;gap:4px;">
              <div style="font-weight:800;color:var(--text);">${e.name}</div>
              <div style="font-size:12px;color:var(--muted);">${e.due}</div>
              <div class="progress-mini"><span style="width:${e.progress}%;"></span></div>
            </div>
            <span class="pill" style="background:#e0f2fe;color:#0c7181;">${e.progress}% concluído</span>
          </div>
        `).join("")}
      </div>
    </div>
  `)},c={render:()=>i(`
    <div class="mission-card empty-card">
      <div style="font-size:46px;">🗂️</div>
      <div style="font-weight:800;color:var(--text);">Nenhuma missão selecionada</div>
      <div style="font-size:13px;color:var(--muted);">Crie uma visualização para acompanhar o progresso das missões.</div>
      <button class="toolbar active" style="justify-self:center; border:none; padding:12px 16px; border-radius:12px; background:var(--primary); color:#fff;">Criar visualização</button>
    </div>
  `)};var m,u,v;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => layout(\`
    \${header('Visão geral da missão: Investigadores da Água', ['32 alunos', '4 fases', 'Evidências multimídia'])}
    \${progressSection()}
    \${timeline([{
    label: 'Etapa 1',
    title: 'Explorar o problema',
    desc: 'Introdução e debate sobre consumo consciente de água.',
    progress: 100,
    color: '#28c76f'
  }, {
    label: 'Etapa 2',
    title: 'Pesquisa de campo',
    desc: 'Entrevistas e coleta de dados na comunidade.',
    progress: 68,
    color: '#6e63e8'
  }, {
    label: 'Etapa 3',
    title: 'Protótipo de solução',
    desc: 'Construção de dispositivos para reaproveitamento.',
    progress: 12,
    color: '#ff9f43'
  }])}
  \`)
}`,...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var g,x,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => layout(timeline([{
    label: 'Semana 1',
    title: 'Sensibilização',
    desc: 'Cocriação de mural digital.',
    progress: 100,
    color: '#28c76f'
  }, {
    label: 'Semana 2',
    title: 'Coleta de dados',
    desc: 'Questionário e fotos de campo.',
    progress: 70,
    color: '#6e63e8'
  }, {
    label: 'Semana 3',
    title: 'Prototipação',
    desc: 'Modelos em sala maker.',
    progress: 25,
    color: '#ff9f43'
  }, {
    label: 'Semana 4',
    title: 'Apresentação',
    desc: 'Pitch final para comunidade.',
    progress: 5,
    color: '#00cfe8'
  }]))
}`,...(b=(x=r.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,y,E;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => layout(kanban([{
    title: 'Planejamento',
    count: 3,
    items: [{
      title: 'Definir objetivos da missão',
      team: 'Equipe Azul',
      people: '4'
    }, {
      title: 'Selecionar líderes',
      team: 'Equipe Verde',
      people: '3'
    }, {
      title: 'Preparar checklist',
      team: 'Equipe Laranja',
      people: '2'
    }]
  }, {
    title: 'Em execução',
    count: 4,
    items: [{
      title: 'Coleta de água de chuva',
      team: 'Equipe Azul',
      people: '3'
    }, {
      title: 'Registro fotográfico',
      team: 'Equipe Roxa',
      people: '2'
    }, {
      title: 'Entrevistas',
      team: 'Equipe Verde',
      people: '4'
    }, {
      title: 'Mapa de riscos',
      team: 'Equipe Laranja',
      people: '3'
    }]
  }, {
    title: 'Revisão',
    count: 2,
    items: [{
      title: 'Feedback coordenador',
      team: 'Coordenação',
      people: '1'
    }, {
      title: 'Aprovar relatórios',
      team: 'Coordenação',
      people: '2'
    }]
  }]))
}`,...(E=(y=t.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var h,k,w;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => layout(\`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-clipboard-data" style="color:var(--primary);"></i> Relatório para coordenação</div>
      <div class="insights">
        \${[{
    label: 'Participação ativa',
    value: '87%'
  }, {
    label: 'Feedbacks respondidos',
    value: '92%'
  }, {
    label: 'Competência destaque',
    value: 'Colaboração'
  }, {
    label: 'Uso de tecnologia',
    value: '74 evidências'
  }].map(item => \`
          <div class="insight">
            <div class="label">\${item.label}</div>
            <div class="value">\${item.value}</div>
            <div style="font-size:12px;color:var(--muted);">Atualizado há 2h</div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`)
}`,...(w=(k=n.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var $,z,A;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => layout(kanban([{
    title: 'Equipe Aurora',
    count: 3,
    items: [{
      title: 'Podcast histórico',
      team: 'Aurora',
      people: '4'
    }, {
      title: 'Roteiro final',
      team: 'Aurora',
      people: '4'
    }, {
      title: 'Publicar no mural',
      team: 'Aurora',
      people: '4'
    }]
  }, {
    title: 'Equipe Orion',
    count: 2,
    items: [{
      title: 'Protótipo maker',
      team: 'Orion',
      people: '3'
    }, {
      title: 'Teste em campo',
      team: 'Orion',
      people: '3'
    }]
  }]))
}`,...(A=(z=d.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var C,P,q;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => layout(\`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-ui-checks-grid" style="color:var(--primary);"></i> Checklist de evidências • Equipe Aurora</div>
      <div class="checklist">
        \${[{
    title: 'Pesquisa teórica',
    desc: 'Documentos anexados • versão 1.2',
    status: 'Concluído',
    className: 'success'
  }, {
    title: 'Experimento prático',
    desc: 'Feedback do professor registrado em 08/02',
    status: 'Em revisão',
    className: 'warning'
  }, {
    title: 'Relato audiovisual',
    desc: 'Enviar vídeo curto de até 2 minutos',
    status: 'Pendente',
    className: 'info'
  }].map(item => \`
          <div class="check-item">
            <div style="font-weight:800;">\${item.title}</div>
            <div class="status \${item.className}">\${item.status}</div>
            <div style="font-size:12px;color:var(--muted);">\${item.desc}</div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`)
}`,...(q=(P=l.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var j,S,R;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => layout(\`
    <div class="mission-card" style="gap:12px;">
      <div style="font-weight:800;color:var(--text);">Resumo compacto</div>
      <div class="compact-board">
        \${[{
    name: 'Missão Ambiental',
    progress: 86,
    due: 'Entrega 14/02 • 8º Ano B'
  }, {
    name: 'Missão Empreendedorismo',
    progress: 42,
    due: 'Entrega 20/02 • 9º Ano A'
  }, {
    name: 'Missão Ciências na Praça',
    progress: 65,
    due: 'Entrega 28/02 • 7º Ano B'
  }].map(item => \`
          <div class="compact-row">
            <div style="display:grid;gap:4px;">
              <div style="font-weight:800;color:var(--text);">\${item.name}</div>
              <div style="font-size:12px;color:var(--muted);">\${item.due}</div>
              <div class="progress-mini"><span style="width:\${item.progress}%;"></span></div>
            </div>
            <span class="pill" style="background:#e0f2fe;color:#0c7181;">\${item.progress}% concluído</span>
          </div>
        \`).join('')}
      </div>
    </div>
  \`)
}`,...(R=(S=p.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var M,D,F;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => layout(\`
    <div class="mission-card empty-card">
      <div style="font-size:46px;">🗂️</div>
      <div style="font-weight:800;color:var(--text);">Nenhuma missão selecionada</div>
      <div style="font-size:13px;color:var(--muted);">Crie uma visualização para acompanhar o progresso das missões.</div>
      <button class="toolbar active" style="justify-self:center; border:none; padding:12px 16px; border-radius:12px; background:var(--primary); color:#fff;">Criar visualização</button>
    </div>
  \`)
}`,...(F=(D=c.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};const O=["Default","LinhaDoTempo","Kanban","RelatorioRapido","TrilhaEquipe","Checklist","Compacto","Vazio"];export{l as Checklist,p as Compacto,o as Default,t as Kanban,r as LinhaDoTempo,n as RelatorioRapido,d as TrilhaEquipe,c as Vazio,O as __namedExportsOrder,I as default};
