const _={title:"Educacross Components V2/Cards/MediaCardIcon",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
Card de métrica com ícone grande centralizado para dashboards educacionais.

---

## Contexto
- **Professor**: Dashboard com métricas visuais (alunos, missões, aprovações)
- **Coordenador**: Visão geral escola (turmas, professores, desempenho)

## Props
| Prop | Type | Default |
|------|------|---------|
| icon | String | - |
| iconColor | String | 'primary' |
| title | String | - |
| value | String/Number | - |
| trend | String | null |
| backgroundColor | String | '#fff' |
        `}}},argTypes:{iconColor:{control:"select",options:["primary","success","warning","danger","info"]},trend:{control:"select",options:[null,"up","down"]}}},a=`
<style>
  .media-card-icon {
    background: var(--bg, #fff);
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    padding: 24px;
    width: 240px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  .media-card-icon:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
  .media-card-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    background: var(--icon-bg);
  }
  .media-card-icon-wrapper i {
    font-size: 32px;
    color: var(--icon-color);
  }
  .media-card-title {
    font-size: 14px;
    color: #6E6B7B;
    margin: 0 0 8px;
  }
  .media-card-value {
    font-size: 28px;
    font-weight: 600;
    color: #5E5873;
    margin: 0 0 8px;
  }
  .media-card-trend {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .media-card-trend.up { color: #28C76F; }
  .media-card-trend.down { color: #EA5455; }
  .color-primary { --icon-color: #6E63E8; --icon-bg: rgba(110, 99, 232, 0.12); }
  .color-success { --icon-color: #28C76F; --icon-bg: rgba(40, 199, 111, 0.12); }
  .color-warning { --icon-color: #FF9F43; --icon-bg: rgba(255, 159, 67, 0.12); }
  .color-danger { --icon-color: #EA5455; --icon-bg: rgba(234, 84, 85, 0.12); }
  .color-info { --icon-color: #00CFE8; --icon-bg: rgba(0, 207, 232, 0.12); }
</style>
`,s={args:{icon:"bi-people",iconColor:"primary",title:"Total Alunos",value:"1.234",trend:null},render:i=>`
    ${a}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-${i.iconColor}">
        <i class="bi ${i.icon}"></i>
      </div>
      <p class="media-card-title">${i.title}</p>
      <h3 class="media-card-value">${i.value}</h3>
      ${i.trend?`<div class="media-card-trend ${i.trend}">
        <i class="bi bi-arrow-${i.trend==="up"?"up":"down"}"></i>
        <span>12% este mês</span>
      </div>`:""}
    </div>
  `},e={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Ativas</p>
        <h3 class="media-card-value">89</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">5.678</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Aprovações</p>
        <h3 class="media-card-value">92%</h3>
      </div>
    </div>
  `},d={render:()=>`
    ${a}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-success">
        <i class="bi bi-graph-up"></i>
      </div>
      <p class="media-card-title">Aprovações</p>
      <h3 class="media-card-value">92%</h3>
      <div class="media-card-trend up">
        <i class="bi bi-arrow-up"></i>
        <span>+15% este mês</span>
      </div>
    </div>
  `},c={render:()=>`
    ${a}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-danger">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <p class="media-card-title">Missões Pendentes</p>
      <h3 class="media-card-value">23</h3>
      <div class="media-card-trend down">
        <i class="bi bi-arrow-down"></i>
        <span>-8% este mês</span>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Meus Alunos</p>
        <h3 class="media-card-value">156</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+3 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Aplicadas</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Taxa Conclusão</p>
        <h3 class="media-card-value">87%</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+5% este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média Geral</p>
        <h3 class="media-card-value">8.2</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard da Professora Mariana Silva - 5º ano Matemática.
    </p>
  `},n={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-building"></i>
        </div>
        <p class="media-card-title">Total Turmas</p>
        <h3 class="media-card-value">24</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-person-badge"></i>
        </div>
        <p class="media-card-title">Professores</p>
        <h3 class="media-card-value">32</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+45 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-bar-chart"></i>
        </div>
        <p class="media-card-title">Desempenho Médio</p>
        <h3 class="media-card-value">85%</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard do Coordenador João Carlos - Escola Municipal Vista Alegre.
    </p>
  `},l={render:()=>`
    ${a}
    <style>
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
      }
    </style>
    <div class="media-card-icon" style="cursor: default;">
      <div class="media-card-icon-wrapper skeleton"></div>
      <div class="skeleton" style="height: 14px; width: 80px; margin: 0 auto 12px;"></div>
      <div class="skeleton" style="height: 28px; width: 100px; margin: 0 auto;"></div>
    </div>
  `},o={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon" onclick="alert('Ver detalhes dos alunos')">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Alunos Ativos</p>
        <h3 class="media-card-value">156</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver missões')">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver relatório')">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver ranking')">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média</p>
        <h3 class="media-card-value">8.5</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Cards clicáveis que navegam para detalhes. Clique para testar.
    </p>
  `},t={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-star"></i>
        </div>
        <p class="media-card-title">Primary</p>
        <h3 class="media-card-value">100</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Success</p>
        <h3 class="media-card-value">200</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p class="media-card-title">Warning</p>
        <h3 class="media-card-value">50</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-danger">
          <i class="bi bi-x-circle"></i>
        </div>
        <p class="media-card-title">Danger</p>
        <h3 class="media-card-value">10</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-info-circle"></i>
        </div>
        <p class="media-card-title">Info</p>
        <h3 class="media-card-value">75</h3>
      </div>
    </div>
  `},p={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;">
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-people" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Alunos</p>
        <h3 class="media-card-value" style="font-size: 20px;">156</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-success" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-book" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Missões</p>
        <h3 class="media-card-value" style="font-size: 20px;">45</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-info" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-check" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">OK</p>
        <h3 class="media-card-value" style="font-size: 20px;">98%</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-warning" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-trophy" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Média</p>
        <h3 class="media-card-value" style="font-size: 20px;">8.5</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-danger" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-clock" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Pendentes</p>
        <h3 class="media-card-value" style="font-size: 20px;">12</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-calendar" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Hoje</p>
        <h3 class="media-card-value" style="font-size: 20px;">8</h3>
      </div>
    </div>
  `};var m,v,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    icon: 'bi-people',
    iconColor: 'primary',
    title: 'Total Alunos',
    value: '1.234',
    trend: null
  },
  render: args => \`
    \${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-\${args.iconColor}">
        <i class="bi \${args.icon}"></i>
      </div>
      <p class="media-card-title">\${args.title}</p>
      <h3 class="media-card-value">\${args.value}</h3>
      \${args.trend ? \`<div class="media-card-trend \${args.trend}">
        <i class="bi bi-arrow-\${args.trend === 'up' ? 'up' : 'down'}"></i>
        <span>12% este mês</span>
      </div>\` : ''}
    </div>
  \`
}`,...(h=(v=s.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var u,x,b;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Ativas</p>
        <h3 class="media-card-value">89</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">5.678</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Aprovações</p>
        <h3 class="media-card-value">92%</h3>
      </div>
    </div>
  \`
}`,...(b=(x=e.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var g,y,w;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-success">
        <i class="bi bi-graph-up"></i>
      </div>
      <p class="media-card-title">Aprovações</p>
      <h3 class="media-card-value">92%</h3>
      <div class="media-card-trend up">
        <i class="bi bi-arrow-up"></i>
        <span>+15% este mês</span>
      </div>
    </div>
  \`
}`,...(w=(y=d.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var f,k,z;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-danger">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <p class="media-card-title">Missões Pendentes</p>
      <h3 class="media-card-value">23</h3>
      <div class="media-card-trend down">
        <i class="bi bi-arrow-down"></i>
        <span>-8% este mês</span>
      </div>
    </div>
  \`
}`,...(z=(k=c.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var C,A,E;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Meus Alunos</p>
        <h3 class="media-card-value">156</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+3 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Aplicadas</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Taxa Conclusão</p>
        <h3 class="media-card-value">87%</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+5% este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média Geral</p>
        <h3 class="media-card-value">8.2</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard da Professora Mariana Silva - 5º ano Matemática.
    </p>
  \`
}`,...(E=(A=r.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var $,M,D;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-building"></i>
        </div>
        <p class="media-card-title">Total Turmas</p>
        <h3 class="media-card-value">24</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-person-badge"></i>
        </div>
        <p class="media-card-title">Professores</p>
        <h3 class="media-card-value">32</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+45 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-bar-chart"></i>
        </div>
        <p class="media-card-title">Desempenho Médio</p>
        <h3 class="media-card-value">85%</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard do Coordenador João Carlos - Escola Municipal Vista Alegre.
    </p>
  \`
}`,...(D=(M=n.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var S,T,B;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
      }
    </style>
    <div class="media-card-icon" style="cursor: default;">
      <div class="media-card-icon-wrapper skeleton"></div>
      <div class="skeleton" style="height: 14px; width: 80px; margin: 0 auto 12px;"></div>
      <div class="skeleton" style="height: 28px; width: 100px; margin: 0 auto;"></div>
    </div>
  \`
}`,...(B=(T=l.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var F,P,V;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon" onclick="alert('Ver detalhes dos alunos')">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Alunos Ativos</p>
        <h3 class="media-card-value">156</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver missões')">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver relatório')">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver ranking')">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média</p>
        <h3 class="media-card-value">8.5</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Cards clicáveis que navegam para detalhes. Clique para testar.
    </p>
  \`
}`,...(V=(P=o.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var I,W,j;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-star"></i>
        </div>
        <p class="media-card-title">Primary</p>
        <h3 class="media-card-value">100</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Success</p>
        <h3 class="media-card-value">200</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p class="media-card-title">Warning</p>
        <h3 class="media-card-value">50</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-danger">
          <i class="bi bi-x-circle"></i>
        </div>
        <p class="media-card-title">Danger</p>
        <h3 class="media-card-value">10</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-info-circle"></i>
        </div>
        <p class="media-card-title">Info</p>
        <h3 class="media-card-value">75</h3>
      </div>
    </div>
  \`
}`,...(j=(W=t.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var q,G,O;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;">
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-people" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Alunos</p>
        <h3 class="media-card-value" style="font-size: 20px;">156</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-success" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-book" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Missões</p>
        <h3 class="media-card-value" style="font-size: 20px;">45</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-info" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-check" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">OK</p>
        <h3 class="media-card-value" style="font-size: 20px;">98%</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-warning" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-trophy" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Média</p>
        <h3 class="media-card-value" style="font-size: 20px;">8.5</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-danger" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-clock" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Pendentes</p>
        <h3 class="media-card-value" style="font-size: 20px;">12</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-calendar" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Hoje</p>
        <h3 class="media-card-value" style="font-size: 20px;">8</h3>
      </div>
    </div>
  \`
}`,...(O=(G=p.parameters)==null?void 0:G.docs)==null?void 0:O.source}}};const H=["Default","AllIcons","WithTrendUp","WithTrendDown","DashboardProfessor","DashboardCoordenador","LoadingSkeleton","Interactive","AllColors","CompactGrid"];export{t as AllColors,e as AllIcons,p as CompactGrid,n as DashboardCoordenador,r as DashboardProfessor,s as Default,o as Interactive,l as LoadingSkeleton,c as WithTrendDown,d as WithTrendUp,H as __namedExportsOrder,_ as default};
