const X={title:"Educacross Components V2/Content/MissionDetailsPlus",tags:["autodocs"],parameters:{docs:{description:{component:`
Visualização completa dos detalhes de uma Missão Plus com informações de turma, período, alunos e conteúdo por turno.

## Contexto de Uso

### Professor
- Visualiza detalhes antes de enviar missão
- Confirma turmas e alunos selecionados
- Revisa conteúdo de cada turno

### Coordenador
- Analisa missões criadas pelos professores
- Monitora distribuição de conteúdo
- Acompanha calendário de missões

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`missionName\` | String | - | Nome da missão |
| \`className\` | String | - | Nome da turma |
| \`startDate\` | String | - | Data de início |
| \`endDate\` | String | - | Data de término |
| \`studentsInfo\` | String | - | Info dos alunos (ex: "28 alunos") |
| \`rounds\` | Array | [] | Array de turnos com temática e imagem |
| \`loading\` | Boolean | false | Estado de carregamento |
        `}}},argTypes:{missionName:{control:"text"},className:{control:"text"},startDate:{control:"text"},endDate:{control:"text"},studentsInfo:{control:"text"},loading:{control:"boolean"}}},e=`
<style>
  :root {
    --primary: #6e63e8;
    --card-bg: #fff;
    --border-color: #dbdade;
    --text-color: #5d596c;
  }

  .mission-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .mission-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .mission-title {
    color: var(--primary);
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .mission-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(110, 99, 232, 0.12);
    color: var(--primary);
    padding: 0.35rem 1rem;
    border-radius: 50rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-card {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    box-shadow: none;
  }

  .info-label {
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .info-value {
    color: var(--primary);
    font-weight: 600;
    margin: 0;
  }

  .rounds-container {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
  }

  .rounds-title {
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .rounds-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .round-card {
    min-width: 150px;
    text-align: center;
    background: var(--card-bg);
    border: 2px solid var(--primary);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .round-number {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .round-image {
    width: 100px;
    height: 100px;
    margin: 0 auto 0.75rem;
    border-radius: 0.5rem;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .round-theme {
    font-size: 0.875rem;
    color: var(--text-color);
    word-wrap: break-word;
  }

  .loading-overlay {
    position: relative;
    opacity: 0.6;
  }
</style>
`,n=r=>{const{missionName:U="Aventura Matemática",className:_="5º Ano A",startDate:J="20/01/2026",endDate:W="27/01/2026",studentsInfo:H="28 alunos selecionados",rounds:K=[{number:1,theme:"Frações e Decimais",icon:"🔢"},{number:2,theme:"Geometria Plana",icon:"📐"},{number:3,theme:"Medidas e Grandezas",icon:"📏"}],loading:Q=!1}=r;return`
    <div class="mission-details ${Q?"loading-overlay":""}">
      <div class="mission-header">
        <h1 class="mission-title">${U}</h1>
        <span class="mission-badge">
          ✨ Missão Plus
        </span>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="info-label">Turma:</div>
          <p class="info-value">${_}</p>
        </div>
        <div class="info-card">
          <div class="info-label">Duração:</div>
          <p class="info-value">${J} a ${W}</p>
        </div>
      </div>

      <div class="info-card" style="margin-bottom:1.5rem;">
        <div class="info-label">Alunos:</div>
        <p class="info-value">${H}</p>
      </div>

      <div class="rounds-container">
        <div class="rounds-title">📚 Conteúdo por Turno</div>
        <div class="rounds-scroll">
          ${K.map(p=>`
            <div class="round-card">
              <div class="round-number">Turno ${p.number}</div>
              <div class="round-image">${p.icon}</div>
              <div class="round-theme">${p.theme}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `},a={args:{missionName:"Aventura Matemática",className:"5º Ano A",startDate:"20/01/2026",endDate:"27/01/2026",studentsInfo:"28 alunos selecionados",loading:!1},render:r=>`${e}${n(r)}`},o={render:()=>`${e}${n({missionName:"Exploradores da Língua Portuguesa",className:"6º Ano B",startDate:"15/02/2026",endDate:"22/02/2026",studentsInfo:"32 alunos selecionados",rounds:[{number:1,theme:"Verbos e Conjugações",icon:"📝"},{number:2,theme:"Interpretação de Textos",icon:"📖"},{number:3,theme:"Produção Textual",icon:"✍️"},{number:4,theme:"Gramática Aplicada",icon:"📚"}]})}`},s={render:()=>`${e}${n({missionName:"Descobrindo o Sistema Solar",className:"7º Ano C",startDate:"10/03/2026",endDate:"17/03/2026",studentsInfo:"25 alunos selecionados",rounds:[{number:1,theme:"Planetas Internos",icon:"🌍"},{number:2,theme:"Planetas Externos",icon:"🪐"},{number:3,theme:"Satélites e Asteroides",icon:"🌙"}]})}`},t={render:()=>`${e}${n({loading:!0})}`},i={render:()=>`
    ${e}
    <style>
      .context-container {
        background: #f8f7fa;
        padding: 2rem;
        min-height: 100vh;
      }
      .action-bar {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        display: flex;
        gap: 1rem;
      }
      .btn {
        padding: 0.5rem 1.5rem;
        border-radius: 0.357rem;
        font-weight: 500;
        border: 1px solid;
        cursor: pointer;
      }
      .btn-primary {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
      .btn-outline {
        background: transparent;
        color: var(--primary);
        border-color: var(--primary);
      }
    </style>
    <div class="context-container">
      <div class="action-bar">
        <button class="btn btn-outline">Editar</button>
        <button class="btn btn-primary">Enviar aos Alunos</button>
      </div>
      ${n({missionName:"Missão de Matemática - Frações",className:"5º Ano A, 5º Ano B",startDate:"20/01/2026",endDate:"27/01/2026",studentsInfo:"56 alunos em 2 turmas",rounds:[{number:1,theme:"Introdução às Frações",icon:"🔢"},{number:2,theme:"Operações com Frações",icon:"➗"},{number:3,theme:"Frações Equivalentes",icon:"⚖️"}]})}
    </div>
  `},d={render:()=>`
    ${e}
    <style>
      .coordinator-view {
        background: #f8f7fa;
        padding: 2rem;
      }
      .mission-stats {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
      }
      .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #ebe9f1;
      }
      .stat-row:last-child {
        border-bottom: none;
      }
    </style>
    <div class="coordinator-view">
      <div class="mission-stats">
        <h3 style="margin-bottom:1rem;">📊 Estatísticas</h3>
        <div class="stat-row">
          <span>Professor Responsável:</span>
          <strong>Maria Santos</strong>
        </div>
        <div class="stat-row">
          <span>Data de Criação:</span>
          <strong>15/01/2026</strong>
        </div>
        <div class="stat-row">
          <span>Status:</span>
          <strong style="color:#28c76f;">Agendada</strong>
        </div>
      </div>
      ${n({})}
    </div>
  `},m={render:()=>`${e}${n({missionName:"Jornada Completa de Matemática",className:"8º Ano A",startDate:"01/04/2026",endDate:"30/04/2026",studentsInfo:"30 alunos selecionados",rounds:[{number:1,theme:"Álgebra Básica",icon:"🔢"},{number:2,theme:"Equações 1º Grau",icon:"📊"},{number:3,theme:"Geometria Analítica",icon:"📐"},{number:4,theme:"Funções",icon:"📈"},{number:5,theme:"Trigonometria",icon:"📏"},{number:6,theme:"Revisão Geral",icon:"📚"}]})}`},c={render:()=>`${e}${n({missionName:"Missão Relâmpago",className:"9º Ano A",startDate:"20/01/2026",endDate:"21/01/2026",studentsInfo:"15 alunos selecionados",rounds:[{number:1,theme:"Revisão Expressa",icon:"⚡"}]})}`},l={parameters:{viewport:{defaultViewport:"mobile1"}},render:()=>`
    ${e}
    <style>
      .mission-details {
        padding: 1rem;
      }
      .info-grid {
        grid-template-columns: 1fr;
      }
      .round-card {
        min-width: 120px;
      }
    </style>
    ${n({})}
  `},u={args:{missionName:"Aventura Matemática",className:"5º Ano A",startDate:"20/01/2026",endDate:"27/01/2026",studentsInfo:"28 alunos selecionados",loading:!1},render:r=>`
    ${e}
    <div style="text-align:center;padding:1rem;margin-bottom:1rem;background:#f8f7fa;">
      <strong>Preview Interativo</strong>
      <p style="color:#666;font-size:0.875rem;">Use os controles acima</p>
    </div>
    ${n(r)}
  `};var g,b,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    missionName: 'Aventura Matemática',
    className: '5º Ano A',
    startDate: '20/01/2026',
    endDate: '27/01/2026',
    studentsInfo: '28 alunos selecionados',
    loading: false
  },
  render: args => \`\${styles}\${details(args)}\`
}`,...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var x,f,D;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`\${styles}\${details({
    missionName: 'Exploradores da Língua Portuguesa',
    className: '6º Ano B',
    startDate: '15/02/2026',
    endDate: '22/02/2026',
    studentsInfo: '32 alunos selecionados',
    rounds: [{
      number: 1,
      theme: 'Verbos e Conjugações',
      icon: '📝'
    }, {
      number: 2,
      theme: 'Interpretação de Textos',
      icon: '📖'
    }, {
      number: 3,
      theme: 'Produção Textual',
      icon: '✍️'
    }, {
      number: 4,
      theme: 'Gramática Aplicada',
      icon: '📚'
    }]
  })}\`
}`,...(D=(f=o.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};var h,y,A;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`\${styles}\${details({
    missionName: 'Descobrindo o Sistema Solar',
    className: '7º Ano C',
    startDate: '10/03/2026',
    endDate: '17/03/2026',
    studentsInfo: '25 alunos selecionados',
    rounds: [{
      number: 1,
      theme: 'Planetas Internos',
      icon: '🌍'
    }, {
      number: 2,
      theme: 'Planetas Externos',
      icon: '🪐'
    }, {
      number: 3,
      theme: 'Satélites e Asteroides',
      icon: '🌙'
    }]
  })}\`
}`,...(A=(y=s.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var E,$,w;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:"{\n  render: () => `${styles}${details({\n    loading: true\n  })}`\n}",...(w=($=t.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};var C,N,S;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .context-container {
        background: #f8f7fa;
        padding: 2rem;
        min-height: 100vh;
      }
      .action-bar {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        display: flex;
        gap: 1rem;
      }
      .btn {
        padding: 0.5rem 1.5rem;
        border-radius: 0.357rem;
        font-weight: 500;
        border: 1px solid;
        cursor: pointer;
      }
      .btn-primary {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
      .btn-outline {
        background: transparent;
        color: var(--primary);
        border-color: var(--primary);
      }
    </style>
    <div class="context-container">
      <div class="action-bar">
        <button class="btn btn-outline">Editar</button>
        <button class="btn btn-primary">Enviar aos Alunos</button>
      </div>
      \${details({
    missionName: 'Missão de Matemática - Frações',
    className: '5º Ano A, 5º Ano B',
    startDate: '20/01/2026',
    endDate: '27/01/2026',
    studentsInfo: '56 alunos em 2 turmas',
    rounds: [{
      number: 1,
      theme: 'Introdução às Frações',
      icon: '🔢'
    }, {
      number: 2,
      theme: 'Operações com Frações',
      icon: '➗'
    }, {
      number: 3,
      theme: 'Frações Equivalentes',
      icon: '⚖️'
    }]
  })}
    </div>
  \`
}`,...(S=(N=i.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var I,M,F;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .coordinator-view {
        background: #f8f7fa;
        padding: 2rem;
      }
      .mission-stats {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
      }
      .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #ebe9f1;
      }
      .stat-row:last-child {
        border-bottom: none;
      }
    </style>
    <div class="coordinator-view">
      <div class="mission-stats">
        <h3 style="margin-bottom:1rem;">📊 Estatísticas</h3>
        <div class="stat-row">
          <span>Professor Responsável:</span>
          <strong>Maria Santos</strong>
        </div>
        <div class="stat-row">
          <span>Data de Criação:</span>
          <strong>15/01/2026</strong>
        </div>
        <div class="stat-row">
          <span>Status:</span>
          <strong style="color:#28c76f;">Agendada</strong>
        </div>
      </div>
      \${details({})}
    </div>
  \`
}`,...(F=(M=d.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var P,k,B;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`\${styles}\${details({
    missionName: 'Jornada Completa de Matemática',
    className: '8º Ano A',
    startDate: '01/04/2026',
    endDate: '30/04/2026',
    studentsInfo: '30 alunos selecionados',
    rounds: [{
      number: 1,
      theme: 'Álgebra Básica',
      icon: '🔢'
    }, {
      number: 2,
      theme: 'Equações 1º Grau',
      icon: '📊'
    }, {
      number: 3,
      theme: 'Geometria Analítica',
      icon: '📐'
    }, {
      number: 4,
      theme: 'Funções',
      icon: '📈'
    }, {
      number: 5,
      theme: 'Trigonometria',
      icon: '📏'
    }, {
      number: 6,
      theme: 'Revisão Geral',
      icon: '📚'
    }]
  })}\`
}`,...(B=(k=m.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var z,R,T;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`\${styles}\${details({
    missionName: 'Missão Relâmpago',
    className: '9º Ano A',
    startDate: '20/01/2026',
    endDate: '21/01/2026',
    studentsInfo: '15 alunos selecionados',
    rounds: [{
      number: 1,
      theme: 'Revisão Expressa',
      icon: '⚡'
    }]
  })}\`
}`,...(T=(R=c.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var G,V,j;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => \`
    \${styles}
    <style>
      .mission-details {
        padding: 1rem;
      }
      .info-grid {
        grid-template-columns: 1fr;
      }
      .round-card {
        min-width: 120px;
      }
    </style>
    \${details({})}
  \`
}`,...(j=(V=l.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var q,L,O;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    missionName: 'Aventura Matemática',
    className: '5º Ano A',
    startDate: '20/01/2026',
    endDate: '27/01/2026',
    studentsInfo: '28 alunos selecionados',
    loading: false
  },
  render: args => \`
    \${styles}
    <div style="text-align:center;padding:1rem;margin-bottom:1rem;background:#f8f7fa;">
      <strong>Preview Interativo</strong>
      <p style="color:#666;font-size:0.875rem;">Use os controles acima</p>
    </div>
    \${details(args)}
  \`
}`,...(O=(L=u.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};const Y=["Default","PortugueseMission","ScienceMission","LoadingState","ProfessorContext","CoordinatorContext","WithManyRounds","ShortDuration","MobileView","Interactive"];export{d as CoordinatorContext,a as Default,u as Interactive,t as LoadingState,l as MobileView,o as PortugueseMission,i as ProfessorContext,s as ScienceMission,c as ShortDuration,m as WithManyRounds,Y as __namedExportsOrder,X as default};
