const q={title:"Educacross Components V2/ProgressBarVertical",tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"Valor da barra de progresso (0-100)"},variant:{control:"select",options:["danger","warning","success","primary"],description:"Variante de cor (danger=Abaixo Básico, warning=Básico, success=Proficiente, primary=Avançado)"},height:{control:"text",description:'Altura da barra (ex: "8px", "10px")'},showPercentage:{control:"boolean",description:"Mostrar porcentagem ao lado"}},parameters:{layout:"padded",docs:{description:{component:"Barra de progresso vertical com porcentagem ao lado, usada em contextos onde o espaço vertical é restrito (tabelas, cards compactos)."}}}},s=`
.progress-bar-vertical {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.progress-bar-vertical .percentage {
  font-weight: 800;
  font-size: 14px;
  color: #5e5873;
  min-width: 40px;
  white-space: nowrap;
}

.progress-bar-vertical .progress {
  flex: 1;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f2f7;
}

.progress-bar-vertical .progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

/* Proficiency Colors */
.progress-bar-vertical .bg-danger {
  background-color: #ea5455 !important;
}

.progress-bar-vertical .bg-warning {
  background-color: #ffb443 !important;
}

.progress-bar-vertical .bg-success {
  background-color: #28c76f !important;
}

.progress-bar-vertical .bg-primary {
  background-color: #7367f0 !important;
}
`,e=r=>`
<div class="progress-bar-vertical">
  ${r.showPercentage?`<span class="percentage">${r.value}%</span>`:""}
  <div class="progress" style="height: ${r.height||"8px"}">
    <div 
      class="progress-bar bg-${r.variant}" 
      role="progressbar" 
      style="width: ${r.value}%"
      aria-valuenow="${r.value}" 
      aria-valuemin="0" 
      aria-valuemax="100"
    ></div>
  </div>
</div>
`,a={args:{value:65,variant:"success",height:"8px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},t={args:{value:25,variant:"danger",height:"8px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},n={args:{value:45,variant:"warning",height:"8px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},o={args:{value:72,variant:"success",height:"8px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},i={args:{value:88,variant:"primary",height:"8px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},d={args:{value:60,variant:"success",height:"8px",showPercentage:!1},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},c={args:{value:78,variant:"success",height:"12px",showPercentage:!0},render:r=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      ${e(r)}
    </div>
  `},l={render:()=>`
    <style>${s}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Progresso dos Alunos - 5º Ano A</h5>
          <small class="text-muted">Missão: Operações Matemáticas</small>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th style="width: 250px;">Progresso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana Silva</td>
                <td>${e({value:85,variant:"primary",height:"8px",showPercentage:!0})}</td>
              </tr>
              <tr>
                <td>Bruno Santos</td>
                <td>${e({value:68,variant:"success",height:"8px",showPercentage:!0})}</td>
              </tr>
              <tr>
                <td>Carla Oliveira</td>
                <td>${e({value:42,variant:"warning",height:"8px",showPercentage:!0})}</td>
              </tr>
              <tr>
                <td>Daniel Costa</td>
                <td>${e({value:28,variant:"danger",height:"8px",showPercentage:!0})}</td>
              </tr>
              <tr>
                <td>Eduarda Lima</td>
                <td>${e({value:75,variant:"success",height:"8px",showPercentage:!0})}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `},p={render:()=>`
    <style>${s}</style>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px;">
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 1</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Frações</p>
          ${e({value:92,variant:"primary",height:"8px",showPercentage:!0})}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 2</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Decimais</p>
          ${e({value:78,variant:"success",height:"8px",showPercentage:!0})}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 3</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Porcentagem</p>
          ${e({value:55,variant:"success",height:"8px",showPercentage:!0})}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 4</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Proporção</p>
          ${e({value:38,variant:"warning",height:"8px",showPercentage:!0})}
        </div>
      </div>
    </div>
  `},g={render:()=>`
    <style>${s}</style>
    <div style="max-width: 400px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Não iniciado</strong></p>
        ${e({value:0,variant:"danger",height:"8px",showPercentage:!0})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Início</strong></p>
        ${e({value:5,variant:"danger",height:"8px",showPercentage:!0})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        ${e({value:50,variant:"warning",height:"8px",showPercentage:!0})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        ${e({value:95,variant:"primary",height:"8px",showPercentage:!0})}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        ${e({value:100,variant:"primary",height:"8px",showPercentage:!0})}
      </div>
    </div>
  `};var v,h,u;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    value: 65,
    variant: 'success',
    height: '8px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(u=(h=a.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var m,x,y;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 25,
    variant: 'danger',
    height: '8px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var b,w,P;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 45,
    variant: 'warning',
    height: '8px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(P=(w=n.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var $,B,f;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    value: 72,
    variant: 'success',
    height: '8px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(f=(B=o.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var S,A,E;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 88,
    variant: 'primary',
    height: '8px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(E=(A=i.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var M,C,z;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    value: 60,
    variant: 'success',
    height: '8px',
    showPercentage: false
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(z=(C=d.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var D,k,O;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    value: 78,
    variant: 'success',
    height: '12px',
    showPercentage: true
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(O=(k=c.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var V,F,T;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Progresso dos Alunos - 5º Ano A</h5>
          <small class="text-muted">Missão: Operações Matemáticas</small>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th style="width: 250px;">Progresso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana Silva</td>
                <td>\${renderProgressBar({
    value: 85,
    variant: 'primary',
    height: '8px',
    showPercentage: true
  })}</td>
              </tr>
              <tr>
                <td>Bruno Santos</td>
                <td>\${renderProgressBar({
    value: 68,
    variant: 'success',
    height: '8px',
    showPercentage: true
  })}</td>
              </tr>
              <tr>
                <td>Carla Oliveira</td>
                <td>\${renderProgressBar({
    value: 42,
    variant: 'warning',
    height: '8px',
    showPercentage: true
  })}</td>
              </tr>
              <tr>
                <td>Daniel Costa</td>
                <td>\${renderProgressBar({
    value: 28,
    variant: 'danger',
    height: '8px',
    showPercentage: true
  })}</td>
              </tr>
              <tr>
                <td>Eduarda Lima</td>
                <td>\${renderProgressBar({
    value: 75,
    variant: 'success',
    height: '8px',
    showPercentage: true
  })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  \`
}`,...(T=(F=l.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var _,I,L;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px;">
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 1</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Frações</p>
          \${renderProgressBar({
    value: 92,
    variant: 'primary',
    height: '8px',
    showPercentage: true
  })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 2</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Decimais</p>
          \${renderProgressBar({
    value: 78,
    variant: 'success',
    height: '8px',
    showPercentage: true
  })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 3</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Porcentagem</p>
          \${renderProgressBar({
    value: 55,
    variant: 'success',
    height: '8px',
    showPercentage: true
  })}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="mb-2">Missão 4</h6>
          <p class="text-muted mb-2" style="font-size: 12px;">Proporção</p>
          \${renderProgressBar({
    value: 38,
    variant: 'warning',
    height: '8px',
    showPercentage: true
  })}
        </div>
      </div>
    </div>
  \`
}`,...(L=(I=p.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var N,Q,j;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 400px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Não iniciado</strong></p>
        \${renderProgressBar({
    value: 0,
    variant: 'danger',
    height: '8px',
    showPercentage: true
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Início</strong></p>
        \${renderProgressBar({
    value: 5,
    variant: 'danger',
    height: '8px',
    showPercentage: true
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        \${renderProgressBar({
    value: 50,
    variant: 'warning',
    height: '8px',
    showPercentage: true
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        \${renderProgressBar({
    value: 95,
    variant: 'primary',
    height: '8px',
    showPercentage: true
  })}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        \${renderProgressBar({
    value: 100,
    variant: 'primary',
    height: '8px',
    showPercentage: true
  })}
      </div>
    </div>
  \`
}`,...(j=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:j.source}}};const G=["Default","AbaixoBasico","Basico","Proficiente","Avancado","SemPorcentagem","BarraAlta","TabelaAlunos","CardCompacto","EdgeCases"];export{t as AbaixoBasico,i as Avancado,c as BarraAlta,n as Basico,p as CardCompacto,a as Default,g as EdgeCases,o as Proficiente,d as SemPorcentagem,l as TabelaAlunos,G as __namedExportsOrder,q as default};
